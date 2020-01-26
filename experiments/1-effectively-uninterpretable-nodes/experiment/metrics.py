import os
import sys
import json


def metric1(parent, current):
  if parent is not None and parent['type'] == 'DOCKER-RUN':
    return (1, 1) # 1 because it's a leaf, 1 because its effectively uninterpretable
  return (1, 0)


def metric2(parent, current):
  if current['type'] == 'MAYBE-SEMANTIC-COMMAND':
    return (1, 1) # 1 because it's a leaf, 1 because its effectively uninterpretable
  return (1, 0)


def metric3(parent, current):
  if current['type'].startswith('SC-'):
    return (1,0)
  if current['type'] == 'UNKNOWN':
    return (1,1)
  return (1, 0)


def metric4(parent, current):
  if current['type'] == 'MAYBE-SEMANTIC-COMMAND':
    cmd = current['children'][1]['children'][0]['value']
    if cmd.endswith('.sh'):
      return (1, 1)
  
  return (1, 0)


def metric5(parent, current):
  if current['type'] == 'UNKNOWN':
    return (1,1)
  return (1, 0)


def metric6(parent, current):
  if current['type'] == 'MAYBE-SEMANTIC-COMMAND':
    cmd = current['children'][1]['children'][0]['value']
    if cmd.endswith('.py'):
      return (1, 1)
    elif 'python' in cmd.lower():
      args = current['children'][2]
      for arg in args:
        if arg['type'] == 'BASH-LITERAL' and arg['value'].endswith('.py'):
          return (1, 1)

  return (1, 0)


def compute_metric(metric, flag):
  def _worker(parent, current):
    try:
      quasi_leaf = (
        flag and (current['type'] == 'MAYBE-SEMANTIC-COMMAND' or current['type'].startswith('SC-'))
      )
      if len(current['children']) == 0 or quasi_leaf:
        return metric(parent, current)
      else:
        retval = (0, 0)
        for child in current['children']:
          a, b = _worker(current, child)
          retval = (retval[0] + a, retval[1] + b)
      
        return retval
      
      assert False, 'Impossible!?!'
    except Exception as ex:
      return (0,0)

  results = []
  for line in sys.stdin:
    as_json = json.loads(line)
    results.append(_worker(None, as_json))
  
  return results


def main():
  if len(sys.argv) < 2:
    assert False, 'Please specify a metric to run (either --m1,--m2, or --m3)'

  results = []
  if sys.argv[1] == '--m1':
    results = compute_metric(metric1, True)
  elif sys.argv[1] == '--m2':
    results = compute_metric(metric2, True)
  elif sys.argv[1] == '--m3':
    results = compute_metric(metric3, True)
  elif sys.argv[1] == '--m4':
    results = compute_metric(metric4, True)
  elif sys.argv[1] == '--m5':
    results = compute_metric(metric5, False)
  elif sys.argv[1] == '--m6':
    results = compute_metric(metric6, True)
  else:
    assert False, 'Please specify a valid metric to run (either --m1,--m2, or --m3)'

  total_eus = 0
  total_lines = 0
  for total, eus in results:
    total_eus += eus
    if (eus > 0):
      total_lines += 1
    percent = float(eus)/float(total)*100.0
    print(percent)
  # print(total_eus, total_lines)

if __name__ == '__main__':
  main()
