import * as fs from 'fs';
import * as process from 'process';
import { EnrichPass } from './enrich';
import { IdentityPass, DopsNode, stringifyBash, Edit } from './ast';

const DEBUG = true;

// Prints in a format graphviz accepts for debugging!
const vizify = (root: any, id: number = 0) => {
  if (!root || !root.children) {
    return -1;
  }
  
  const first = id === 0;
  const gvesc = (x) => {
    if (x.replace) {
      return x.replace(/"/g, '\\"').replace(/\n/g, '\\n').replace(/\r/g, '\\r');
    }
    return x;
  };

  if (first) {
    process.stdout.write(`digraph G { `);
  }

  process.stdout.write(`${id}  [label="${root.value ? gvesc(root.value) : root.type}"]; `);

  const oid = id;
  root.children.forEach((c) => {
    process.stdout.write(`"${oid}" -> "${id + 1}"; `);
    id = vizify(c, id + 1);
  });

  if (first) {
    console.log(` };`);
  }

  return id;
};

const hasMaybeSemanticCommand = (cur) => {
  if (!cur) {
    return false;
  }

  if (cur.type === 'MAYBE-SEMANTIC-COMMAND') {
    return true;
  }

  return cur.children.some(x => hasMaybeSemanticCommand(x));
};

class UnparsePass extends IdentityPass {
  walkBashScript(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { 
      type: 'EDIT-REPLACE-SELF',
      payload: {
        type: 'MAYBE-BASH',
        value: stringifyBash(current),
        children: []
      }
    } as unknown as Edit<DopsNode>;
  }
};

const enrich = new EnrichPass();

fs.readFileSync(0, 'utf8')
  .toString()
  .split('\n')
  .forEach(line => {
    if (line.trim().length === 0) {
      return;
    }

    try {
      let result = enrich.walk(JSON.parse(line));

      while (hasMaybeSemanticCommand(result)) {
        result = enrich.walk(result);
      }

      console.log(JSON.stringify(result));
    } catch (ex) {
      if (DEBUG) {
        console.log(JSON.stringify({ type: 'UNKNOWN', children: [{ type: 'DEBUG', value: ex.toString(), children: [] }]}));
      } else {
        console.log(JSON.stringify({ type: 'UNKNOWN', children: [] }));
      }
    }
  });
