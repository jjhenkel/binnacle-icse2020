import * as fs from 'fs';
import * as yaml from 'js-yaml';
import { stringifyBash } from '../../ast';

const YAML_DIR = '/app/enrich/commands';

const getArgsFromList = (list) => {
  return (list || []).map(arg => {
    if (arg.indexOf(',') === -1) {
      return [ arg.trim().replace(/^--?/, '') ];
    }
    
    const parts = arg.split(',');
    const short = parts[0].trim().replace(/^--?/, '');
    const long = parts[1].trim().replace(/^--?/, '');
    return [ short, long ];
  }).flat();
};

const addToYargs = (arg, adder) => {
  if (arg.indexOf(',') === -1) {
    return adder(arg.trim().replace(/^--?/, ''));
  }
  
  const parts = arg.split(',');
  const short = parts[0].trim().replace(/^--?/, '');
  const long = parts[1].trim().replace(/^--?/, '');
  return adder(short).alias(short, long);
};

const getOptions = (scenario) => {
  if (scenario.options.merge) {
    let options = { 
      booleans: [],
      strings: [],
      paths: [],
      arrays: [],
      counts: []
    };

    options.booleans = scenario.options.merge.map(
      opt => opt.booleans || []
    ).flat();
    options.strings = scenario.options.merge.map(
      opt => opt.strings || []
    ).flat();
    options.paths = scenario.options.merge.map(
      opt => opt.paths || []
    ).flat();
    options.arrays = scenario.options.merge.map(
      opt => opt.arrays || []
    ).flat();
    options.counts = scenario.options.merge.map(
      opt => opt.counts || []
    ).flat();

    return options;
  }

  return scenario.options;
};

const getValuedOptions = (yargs) => {
  const theOpts = yargs.getOptions();

  return theOpts.string.concat(theOpts.array).map(
    opt => theOpts.alias[opt] ? theOpts.alias[opt].concat([ opt ]) : opt
  ).flat();
};

const matchFlag = (flag, args) => {
  if (args.indexOf(flag.trim()) !== -1) {
    return true;
  }

  // Support -axfsfsdg style
  for (let i = 0; i < args.length; i++) {
    if (/^-\w/.test(args[i]) && flag.replace('-', '').trim().length === 1) {
      if (args[i].indexOf(flag.replace('-', '').trim()) !== -1) {
        return true;
      }
    }
  }

  return false;
};

const buildScenarioParser = (scenario) => {
  return (args) => {
    // Save these
    const originalArgs = args;

    // Dirty require.cache trickery
    delete require.cache['/usr/local/lib/node_modules/yargs/index.js'];
    let yargs = require('yargs');

    // Look at scenario.cmd and do some checking
    const checkScenarioValidity = (args) => {
      const parts = scenario.cmd.split(/ /g);

      // Check early rejection
      if (scenario.rejectIf) {
        if (scenario.rejectIf.some(a => args.indexOf(a) !== -1)) {
          return false;
        }
      }

      let valid = true;

      if (parts.length > 1 && !parts[1].trim().startsWith('<') && !parts[1].trim().startsWith('[')) {
        valid = valid && (args.indexOf(parts[1].trim()) !== -1);
      }

      if (scenario.mustHave && scenario.mustHave.length > 0) {
        valid = valid && scenario.mustHave.every(flag => matchFlag(flag, args));
      }

      return valid;
    };

    // Set all of these properties up so we have controllable
    // behavior from yargs
    yargs = yargs
      .help(false)
      .version(false)
      .exitProcess(false)
      .showHelpOnFail(false)
      .parserConfiguration({ 'boolean-negation': false, 'camel-case-expansion': false })
      .fail((a,b,c) => { throw new Error('Arg parsing failed.') })
      .command(scenario.cmd);

    // Go through and add the info in the yaml to the parser
    const options = getOptions(scenario);

    if (options.booleans && options.booleans.length >= 1) {
      yargs = options.booleans.reduce(
        (yargs, arg) => addToYargs(arg, yargs.boolean), yargs
      );
    }
    if (options.strings && options.strings.length >= 1) {
      yargs = options.strings.reduce(
        (yargs, arg) => addToYargs(arg, yargs.string), yargs
      );
    }
    if (options.paths && options.paths.length >= 1) {
      yargs = options.paths.reduce(
        (yargs, arg) => addToYargs(arg, yargs.string), yargs
      );
    }
    if (options.arrays && options.arrays.length >= 1) {
      yargs = options.arrays.reduce(
        (yargs, arg) => addToYargs(arg, yargs.array), yargs
      );
    }
    if (options.counts && options.counts.length >= 1) {
      yargs = options.counts.reduce(
        (yargs, arg) => addToYargs(arg, yargs.count), yargs
      );
    }

    const valuedOpts = getValuedOptions(yargs).map(opt => [
      `-${opt}`, `--${opt}`
    ]).flat();
    
    // Sometimes we have a default arg if we are passed none (like cd ...)
    if (scenario.replaceEmptyArgsWith && args.length === 0) {
      args = scenario.replaceEmptyArgsWith;
    }

    // Sometimes args have no spaces... (like cmade -DTHIS_OPTION=FALSE)
    // UGH: -buildmode=pie ... this mixes bad long names and fixupNonSpace
    // WHY WHY WHY
    if (scenario.fixupNonSpacedArgs) {
      args = args.map(arg => {
        let selections = getValuedOptions(yargs);

        for (let i = 0; i < selections.length; i++) {
          const matches = 
            arg !== selections[i] && (
              arg.startsWith(`-${selections[i]}`) || arg.startsWith(`--${selections[i]}`)
            );

          if (matches) {
            let leftovers = arg.replace(new RegExp(`^--?${selections[i]}\=?`), '');

            if (leftovers.length === 0) {
              return [ arg ];
            }

            return [ 
              arg.slice(0, arg.indexOf(leftovers)),
              leftovers
            ];
          }
        }

        return [ arg ];
      }).flat();
    }

    // Handle this (might want to feature gate this, remains to be seen)
    args = args.map(x => x.startsWith('-') ? x.replace(/\=$/, '') : x);

    // Some commands have bad long names (like find -name '*.foo')
    if (scenario.fixBadLongNames) {
      args = args.map(arg => {
        return scenario.fixBadLongNames.indexOf(arg) === -1 ? arg : `-${arg}`;
      });
    }

    let captures = [];
    let captureAfterN = (
      scenario.captureAfterFirstNonOption ||
      scenario.captureAfterSecondNonOption ||
      scenario.captureAfterThirdNonOption
    );

    // Some commands have flags that start a capture of all the rest 
    // of the arguments (like find -exec ...)
    if (scenario.captureAllAfter) {
      let capturing = false;
      let newargs = [];
      
      for (let i = 0; i < args.length; i++) {
        if (capturing) {
          captures.push(args[i]);
          continue;
        } 

        if (scenario.captureAllAfter.match.indexOf(args[i]) !== -1) {
          capturing = true;
        } 

        newargs.push(args[i]);
      }

      args = newargs;
    } else if (captureAfterN) {
      captureAfterN = captureAfterN.trim();

      let capturing = false;
      let skipNext = false;
      let newargs = [];

      for (let i = 0; i < args.length; i++) {
        if (capturing) {
          captures.push(args[i]);
          continue;
        }

        if (skipNext) {
          newargs.push(args[i]);
          skipNext = false;
          continue;
        }

        if (!args[i].startsWith('-')) {
          capturing = true;
          captures.push(args[i]);
          continue;
        }
        
        skipNext = valuedOpts.indexOf(args[i]) !== -1;
        newargs.push(args[i]);
      }

      args = newargs;
    }

    // Possibly reclaim on or two args
    if (scenario.captureAfterSecondNonOption && captures.length >= 1) {
      args.push(captures.shift());
    } else if (scenario.captureAfterThirdNonOption && captures.length >= 2) {
      args.push(captures.shift());
      args.push(captures.shift());
    }

    // Sometimes we don't want to run a given scenario for 
    // many possible reasons
    if (!checkScenarioValidity(args)) {
      throw new Error('Scenario not applicable.');
    }

    let saveLastNonOption = undefined;

    if (scenario.saveLastNonOption && args.length > 0) {
      if (!args[args.length - 1].startsWith('-') && valuedOpts.indexOf(args[args.length - 2]) === -1) {
        saveLastNonOption = args[args.length - 1];
        args.pop();
      }
    }

    // console.log(JSON.stringify(yargs.getOptions(), null, 2));
    const results = yargs.parse(args);

    // This validity predicate can't be checked until after we've tried the parse
    if (scenario.rejectIfIs) {
      if (results[scenario.rejectIfIs.name]) {
        if (scenario.rejectIfIs.values.indexOf(results[scenario.rejectIfIs.name]) !== -1) {
          throw new Error('Scenario not applicable');
        }
      }
    }

    // Array in yargs is too greedy sometimes
    if (scenario.stealFromArrayFor && results[scenario.stealFromArrayFor.array] && results[scenario.stealFromArrayFor.array].length > 0) {
      if (!results[scenario.stealFromArrayFor.for]) {
        results[scenario.stealFromArrayFor.for] = results[scenario.stealFromArrayFor.array].pop();
      } else if (results[scenario.stealFromArrayFor.for].length === 0) {
        results[scenario.stealFromArrayFor.for].push(results[scenario.stealFromArrayFor.array].pop());
      }
    }

    const failedCommandValidation = scenario.cmd
      .split(' ')
      .filter(
        x => !x.startsWith('$') && !x.startsWith('[') && !x.startsWith('<')
      ).some(
        x => results[x.trim()] !== true && results[x.trim()] != x.trim()
      )
    ;

    // Another check that we have to do AFTER parsing
    if (failedCommandValidation) {
      throw new Error('Scenario not applicable');
    }

    // Add back special capture-after arguments
    if (scenario.captureAllAfter && captures && captures.length > 0) {
      if (!results[scenario.captureAllAfter.name.trim()]) {
        results[scenario.captureAllAfter.name.trim()] = captures;
      } else {
        results[scenario.captureAllAfter.name.trim()].push(...captures);
      }
    } else if (captureAfterN && captures && captures.length > 0) {
      if (!results[captureAfterN]) {
        results[captureAfterN] = captures;
      } else {
        results[captureAfterN].push(...captures);
      }
    }

    if (saveLastNonOption) {
      results[scenario.saveLastNonOption] = saveLastNonOption;
    }

    // Capture this for post processing
    results['$'] = {
      args,
      captures,
      originalArgs,
      paths: getArgsFromList(options.paths),
      counts: getArgsFromList(options.counts),
      options: yargs.getOptions(),
      name: scenario.name,
      cmd: scenario.cmd
    };
    
    return results;
  };
};

const buildParser = (prefix, scenarios) => (args) => {
  const parsers = scenarios.map(buildScenarioParser);

  for (let i = 0; i < parsers.length; i++) {
    try {
      const result = parsers[i](args);
      result['$']['prefix'] = prefix;
      return { scenario: scenarios[i], result };
    } catch (_) {
      continue;
    }
  }

  return { scenario: null, result: { type: 'UNKNOWN', children: [] } };
};

const nodify = (prefix, type, key, value, opts, paths, oargs) => {

  const reify = (v, def) => {
    return oargs[v] ? [ oargs[v] ] : (def || []);
  };

  if (paths.indexOf(key) !== -1) {
    return { type: `${prefix}-${type}`, children: [{
      type: `BASH-PATH`, children: reify(value, [{
        type: `BASH-LITERAL`, value, children: []
      }])
    }]};
  } else if (opts.boolean.indexOf(key) !== -1) {
    return { type: `${prefix}-F-${type}`, children: [] };
  } else if (Array.isArray(value)) {
    if (value.length === 0) {
      return null;
    }
    if (!type.endsWith('S')) {
      type = type + 'S';
    }
    let children = value.map(x => ({
      type: `${prefix}-${type.slice(0, -1)}`, children: reify(x, [{
        type: `BASH-LITERAL`, value: x, children: []
      }])
    }));
    return { type: `${prefix}-${type}`, children };
  } else if (opts.string.indexOf(key) !== -1) {
    return { type: `${prefix}-${type}`, children: reify(value, [{
      type: `BASH-LITERAL`, value, children: []
    }])};
  } else if (typeof value === 'string' || typeof value === 'number') {
    return { type: `${prefix}-${type}`, children: reify(value, [{
      type: `BASH-LITERAL`, value: value.toString(), children: []
    }])};
  }
  
  return { type: `${prefix}-${type}`, children: [] };
};

const buildPostProcessor = (parser) => (args, oargs) => {
  const output = parser(args);

  if (!output.scenario) {
    return output.result;
  }

  oargs = oargs.map(
    arg => ({ [stringifyBash(arg)]: arg })
  ).reduce((obj, cur) => ({ ...obj, ...cur }), {});

  const details = output.result['$'];

  let aliases = details.options.alias;

  Object.keys(aliases).forEach(k1 => {
    Object.keys(aliases).forEach(k2 => {
      if (k1 === k2) {
        return;
      }
      if (aliases[k1].length === aliases[k2].length && aliases[k1].every((x, i) => x === aliases[k2][i])) {
        aliases[k1].push(k2);
        aliases[k2].push(k1);
      }
    });
  });

  Object.keys(aliases).forEach(k => aliases[k] = aliases[k].sort((a, b) => b.length - a.length));

  const subtree = { type: details.name, children: [] };
 
  let ignores = details.cmd.split(' ').filter(
    x => !x.startsWith('[') && !x.startsWith('<')
  ).concat([ '$', '_' ]);

  ignores.push(
    ...details.counts.filter(c => output.result[c] === 0)
  );

  subtree.children = Object.keys(output.result).map((k) => {
    // Maybe we've already processed or want to ignore this 
    // key
    if (ignores.indexOf(k) !== -1) {
      return null;
    }

    // Okay, get a "good" name for this key
    // Then remove all possible aliases
    if (aliases[k] ) {
      ignores.push(...aliases[k]);
      return nodify(
        details.prefix,
        aliases[k][0].toUpperCase(),
        k,
        output.result[k],
        details.options,
        details.paths,
        oargs
      );
    } else if (Object.keys(aliases).some(x => aliases[x].indexOf(k) !== -1 && output.result[x])) {
      return null; // Just skip, we'll hit this later
    } else {
      ignores.push(k);
      return nodify(
        details.prefix,
        k.toUpperCase(),
        k,
        output.result[k],
        details.options,
        details.paths,
        oargs
      );
    }

  }).filter(x => x);

  return subtree;
};

export const createEnrichers = () => {
  return fs.readdirSync(`${YAML_DIR}`)
    .filter(x => x.endsWith('.yml'))
    .map((fname) => {
      const command = yaml.load(
        fs.readFileSync(`${YAML_DIR}/${fname}`, "utf8")
      ).command;
      return command.providerFor.map((name) => ({
        [name]: buildPostProcessor(
          buildParser(command.prefix, command.scenarios)
        )
      }));
    })
    .reduce(
      (obj, cur) => cur.reduce(
        (obj, cur) => ({ ...obj, ...cur }), obj
      ), {}
    );
};