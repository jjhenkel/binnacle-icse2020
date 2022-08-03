if __name__ == '__main__':
  import os
  import sys
  import json
  import lzma
  import tqdm
  import subprocess
  import multiprocessing
  import traceback


  def enrich(ast_str):
    as_json = json.loads(ast_str)
    parsed = { 'type': 'UNKNOWN', 'children': [] } # Start with nothing
    try:
      # Try and do real parse
      parsed = json.loads(subprocess.check_output(
        [ 'node', '/build/app.js' ],
        input=ast_str.encode('utf-8')
      ).decode('utf-8'))
    except Exception:
      print(traceback.format_exc())
      pass
    
    parsed['file_sha'] = as_json['file_sha']
    return json.dumps(parsed)


  with open('/mnt/outputs/blobs_asts_p3.jsonl', mode='wt') as out_file:
    with open('/mnt/inputs/blobs_asts_p2.jsonl', mode='rt') as file:
      pool = multiprocessing.Pool()
      
      all_lines = file.readlines()
      length = len(all_lines)

      results = pool.imap(enrich, all_lines, chunksize=500)

      for result in tqdm.tqdm(results, total=length, desc="Generating"):
        out_file.write('{}\n'.format(result))
  

