if __name__ == '__main__':
  import os
  import sys
  import json
  import tqdm

  import abstractions


  def abstract_tree(tree, parent={'type':'UNKNOWN'}):
    def _check_virtual_apk(x):
      if x['type'] != 'SC-APK-PACKAGE' or len(x['children']) != 1:
        return
      
      if 'value' in x['children'][0] and x['children'][0]['value'].startswith('.'):
        x['type'] = 'SC-APK-VIRTUAL:{}'.format(x['children'][0]['value'])
        x['children'] = []

    KEEP_TYPES = [
      'SC-APT-GET-PACKAGE',
      'SC-APT-PACKAGE',
      'SC-APK-PACKAGE',
      'SC-YUM-PACKAGE',
      'SC-DNF-PACKAGE',
      'SC-NPM-PACKAGE',
      'SC-PIP-PACKAGE',
      'DOCKER-IMAGE-NAME',
      'DOCKER-IMAGE-REPO',
      'DOCKER-IMAGE-TAG',
      'DOCKER-PORT',
      'DOCKER-NAME',
      'BASH-VARIABLE'
    ]

    KEEP_PARENTS = [
      'SC-APK-VIRTUAL'
    ]

    CUSTOMS = [
      _check_virtual_apk
    ]

    def _abstract_value(node):
      value = str(node['value'])

      children = set()
      for test, conditional_type in abstractions.ABSTRACTIONS:
        if re.search(test, value):
          children.add(conditional_type)

      return [ { 'type': t, 'children': [] } for t in children ]

    for custom in CUSTOMS:
      custom(tree)
    
    if tree['type'] in KEEP_TYPES:
      if len(tree['children']) == 1 and 'value' in tree['children'][0]:
        tree['type'] += ':{}'.format(tree['children'][0]['value'].upper())
      elif 'value' in tree:
        tree['type'] += ':{}'.format(tree['value'])

      if 'value' in tree:
        del tree['value']
      tree['children'] = []
      return
    elif parent['type'] in KEEP_PARENTS and 'value' in tree:
      parent['type'] += ':{}'.format(tree['value'])
      parent['children'] = []
      return
    elif 'value' in tree:
      tree['children'].extend(_abstract_value(tree))
      del tree['value']
    
    for child in tree['children']:
      abstract_tree(child, tree)


  def abstract(as_str):
    tree = json.loads(as_str)
    return json.dumps(tree)


  with lzma.open('/mnt/outputs/dataset.jsonl.xz', mode='wt') as out_file:
    with lzma.open('/mnt/inputs/dataset.jsonl.xz', mode='rt') as file:
      pool = multiprocessing.Pool()
      
      all_lines = file.readlines()
      length = len(all_lines)

      results = pool.imap(abstract, all_lines, chunksize=500)

      for result in tqdm.tqdm(results, total=length, desc="Generating: "):
        out_file.write('{}\n'.format(result))
