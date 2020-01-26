if __name__ == '__main__':
  import sys
  import numpy

  numpy.set_printoptions(precision=3)

  num_bins = int(sys.argv[1])
 
  inputs = []

  for line in sys.stdin:
    inputs.append(float(line.strip()))

  histo, bin_edges = numpy.histogram(inputs, bins=num_bins, density=True)
  
  q25 = numpy.percentile(inputs, 25)

  if q25 <= 0.05:
    q25 -= 0.5 # Adjust for rendering clarity

  print("Median:={:.1f}".format(numpy.median(inputs)))
  print("Mean:={:.1f}".format(numpy.mean(inputs)))
  print("Q25:={:.5f}".format(q25))
  print("Q75:={:.5f}".format(numpy.percentile(inputs, 75)))

  print('X\tDensity')
  for i,v in enumerate(histo):
    print('{}\t{:.8f}'.format(
      int(bin_edges[i]),
      v*(100.0/float(num_bins))
    ))
