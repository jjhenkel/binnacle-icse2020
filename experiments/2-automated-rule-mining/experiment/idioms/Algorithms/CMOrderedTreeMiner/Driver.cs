using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.IO;
using System.Diagnostics;

namespace Algorithms.CMOrderedTreeMiner
{
    class Driver
    {
        public static void Main(String[] args)
        {
            string filename = @"C:\Users\cbird\source\repos\TestDLL\Output\CMOrderedTreeMinerTextTrees2.cmtrees";

            var trees = new List<TextTree>();

            foreach (var line in File.ReadAllLines(filename))
            {
                var tree = TextTree.ReadFromString(line);
                trees.Add(tree);
            }


            var watch = Stopwatch.StartNew();

            var main = new Main();
            main.Support = 10;
            var treeCollector = new TreeCollector();
            main.Run(trees, treeCollector);

            Console.WriteLine($"elapsed time is {watch.Elapsed.TotalSeconds} seconds");
            Debug.WriteLine($"elapsed time is {watch.Elapsed.TotalSeconds} seconds");
            Console.ReadKey();

        }
    }
}
