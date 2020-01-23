if __name__ == '__main__':
  import os
  import sys
  import json
  import lzma
  import subprocess


  def parse_within(bash_str):
    parsed = { 'type': 'UNKNOWN', 'children': [] } # Start with nothing
    phase = 0
    step1 = None
    step2 = None
    step3 = None
    try:
      # Try and do real parse
      step1 = subprocess.check_output(
        '/build/app',
        stderr=subprocess.DEVNULL,
        input=bash_str.encode('utf-8')
      )
      phase = 1
      # print(json.dumps(json.loads(step1.decode('utf-8'))), flush=True)
      step2 = subprocess.check_output(
        ['jq', '-c', '--from-file', '/filters/filter-1.jq'],
        stderr=subprocess.DEVNULL,
        input=step1
      )
      phase = 2
      # print(json.dumps(json.loads(step2.decode('utf-8'))), flush=True)
      step3 = subprocess.check_output(
        ['jq', '-c', '--from-file', '/filters/filter-2.jq'],
        stderr=subprocess.DEVNULL,
        input=step2
      )
      phase = 3
      parsed = json.loads(step3.decode('utf-8'))
    except Exception as ex:
      return { 'type': 'UNKNOWN', 'children': [] }
    return parsed


  def parse_embedded_bash(node):
    if node is None or 'type' not in node:
      return node
    
    if node['type'] == 'MAYBE-BASH':
      # Send this over to our haskell parser
      return parse_within(node['value'])
    
    new_children = []
    for child in node['children']:
      new_children.append(parse_embedded_bash(child))
    
    node['children'] = new_children
    return node


  with lzma.open('/mnt/outputs/dataset.jsonl.xz', mode='wt') as out_file:
    with lzma.open('/mnt/inputs/dataset.jsonl.xz', mode='rt') as file:
      for line in file:
        out_file.write('{}\n'.format(json.dumps(parse_embedded_bash(
          json.loads(line.strip())
        ))))
