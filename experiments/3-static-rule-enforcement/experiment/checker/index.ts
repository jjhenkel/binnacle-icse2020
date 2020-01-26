import { DopsNode, IdentityPass, stringifyBash } from "../ast";
import { RULES } from "./rules";
import * as events from 'events';
import * as os from 'os';

events.EventEmitter.defaultMaxListeners = 2*os.cpus().length;

import { expose } from "threads/worker"

const _tryMatch = (current: any, toMatch: any, env: any) => {
  if (current.type !== toMatch.type) {
    if (!current.children) {
      return false;
    } else {
      return current.children.some(
        (currentChild) => _tryMatch(currentChild, toMatch, env)
      );
    }
  }

  if (toMatch.bindHere) {
    env.bound = current.children;
  }

  if (toMatch.value) {
    if (!current.value || current.value !== toMatch.value) {
      return false;
    }
  }

  if (toMatch.children) {
    return toMatch.children.every( 
      (toMatchChild) => current.children.some(
        (currentChild) => _tryMatch(currentChild, toMatchChild, env)
      )
    )
  }

  return true;
};

const _bindBeforeOrAfter = (parents: DopsNode[], before: boolean, intra: boolean) => {
  let current = parents.length - 1; // This is us 
  let candidates = [];

  let STOPPER = intra ? 'BASH-SCRIPT' : 'DOCKER-FILE';

  while (current > 0 && parents[current].type !== STOPPER) {
    current -= 1;
    if (parents[current].children.length > 1) {
      const idx = parents[current].children.indexOf(parents[current + 1]);
      parents[current].children.filter((_, i) => before ? i < idx : i > idx).forEach(
        x => candidates.push(x)
      );
    }
  }

  return candidates;
};

export const checkIntraDirectiveFollowsAntecedent = (rule: any, root: DopsNode, intra: boolean) => {
  const violations = [];
  const rule_stats = {};
  rule_stats[rule.name] = { matches:0, confirmations:0, violations:0 };

  class Pass extends IdentityPass {
    walkGeneric(parents: DopsNode[], current: DopsNode) {
      let env = { bound: [] };

      if (_tryMatch(current, rule.antecedent, env)) {
        rule_stats[rule.name].matches += 1;
   
        env.bound = _bindBeforeOrAfter(parents, false, intra);
            
        if (rule.consequent.matchAnyBound) {
          if (!env.bound.some(candidate => _tryMatch(candidate, rule.consequent.matchAnyBound, env))) {
            rule_stats[rule.name].violations += 1;
            // console.log('HERE');
            // console.log(JSON.stringify(env.bound, null, 2));
            // console.log(JSON.stringify(current, null, 2));
            violations.push({
              description: rule.description,
              matched: {
                antecedent: current,
                missing: rule.consequent.matchAnyBound
              },
              // debug: {
              //   antecedent: stringifyBash(current)
              // }
            });
          } else {
            rule_stats[rule.name].confirmations += 1;
          }
        }
      }

      return {
        type: 'EDIT-REPLACE-SELF' as const,
        payload: current
      };
    }  
  }

  (new Pass()).walk(root);

  return rule_stats;
};

export const checkIntraDirectiveFlagOfAntecedent = (rule: any, root: DopsNode) => {
  const violations = [];
  const rule_stats = {};
  rule_stats[rule.name] = { matches:0, confirmations:0, violations:0 };

  class Pass extends IdentityPass {
    walkGeneric(parents: DopsNode[], current: DopsNode) {
      let env = { bound: [] };

      if (_tryMatch(current, rule.antecedent, env)) {
        rule_stats[rule.name].matches += 1;
        if (rule.consequent.matchAnyBound) {
          if (!env.bound.some(candidate => _tryMatch(candidate, rule.consequent.matchAnyBound, env))) {
            rule_stats[rule.name].violations += 1;
            violations.push({
              description: rule.description,
              matched: {
                antecedent: current,
                missing: rule.consequent.matchAnyBound
              },
              // debug: {
              //   antecedent: stringifyBash(current)
              // }
            });
          } else {
            rule_stats[rule.name].confirmations += 1;
          }
        }
      }

      return {
        type: 'EDIT-REPLACE-SELF' as const,
        payload: current
      };
    }  
  }

  (new Pass()).walk(root);

  return rule_stats;
};

export const checkIntraDirectivePrecedesAntecedent = (rule: any, root: DopsNode, intra: boolean) => {
  const violations = [];
  const rule_stats = {};
  rule_stats[rule.name] = { matches:0, confirmations:0, violations:0 };

  class Pass extends IdentityPass {
    walkGeneric(parents: DopsNode[], current: DopsNode) {
      let env = { bound: [] };

      if (_tryMatch(current, rule.antecedent, env)) {
        rule_stats[rule.name].matches += 1;

        env.bound = _bindBeforeOrAfter(parents, true, intra);
            
        if (rule.consequent.matchAnyBound) {
          if (!env.bound.some(candidate => _tryMatch(candidate, rule.consequent.matchAnyBound, env))) {
            rule_stats[rule.name].violations += 1;
            violations.push({
              description: rule.description,
              matched: {
                antecedent: current,
                missing: rule.consequent.matchAnyBound
              },
              // debug: {
              //   antecedent: stringifyBash(current)
              // }
            });
          } else {
            rule_stats[rule.name].confirmations += 1;
          }
        }
      }

      return {
        type: 'EDIT-REPLACE-SELF' as const,
        payload: current
      };
    }  
  }

  (new Pass()).walk(root);

  return rule_stats;
};

export const check = (rule: any, root: DopsNode) => {
  if (rule.kind === 'CONSEQUENT-FOLLOWS-ANTECEDENT') {
    return checkIntraDirectiveFollowsAntecedent(rule, root, rule.scope === 'INTRA-DIRECTIVE');
  } else if (rule.kind === 'CONSEQUENT-FLAG-OF-ANTECEDENT') {
    return checkIntraDirectiveFlagOfAntecedent(rule, root);
  } else if (rule.kind === 'CONSEQUENT-PRECEDES-ANTECEDENT') {
    return checkIntraDirectivePrecedesAntecedent(rule, root, rule.scope === 'INTRA-DIRECTIVE');
  } else {
    throw new Error(`UNSUPPORTED RULE KIND: ${rule.kind}`);
  }
};

expose({
  check(lines: Array<string>) {
    return lines.map(line => {
      let all_violations = {};
      RULES.forEach(rule => {
        all_violations = {
          ...check(rule, JSON.parse(line) as DopsNode),
          ...all_violations
        };
      });
      return all_violations;
    });
  }
});
