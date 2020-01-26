import * as fs from 'fs';
import * as os from 'os';
import * as events from 'events';

events.EventEmitter.defaultMaxListeners = 2*os.cpus().length;

import { spawn, Pool, Worker } from "threads"

let all_lines = fs.readFileSync(0, 'utf8').toString().split(/\r?\n/) // 0 is stdin

const pool = Pool(() => spawn(new Worker("./checker")), os.cpus().length);

Promise.all(all_lines.filter(
  x => x.trim().length > 0
).reduce((all,one,i) => {
  const ch = Math.floor(i/500); 
  all[ch] = [].concat((all[ch]||[]),one); 
  return all
}, []).map((lines) => {
  return pool.queue(async checker => {
    return checker.check(lines);
  });
})).then((violations) => {
  violations.flat().forEach((violation) => {
    console.log(JSON.stringify(violation));
  });
  pool.terminate();
}).catch((err) => {
  console.log(err);
});

