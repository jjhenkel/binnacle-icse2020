using System;
using System.Collections.Generic;
using System.Text;
using System.Linq;
using System.Diagnostics;
using Algorithms.Common;
using Algorithms.TreeCommon;

namespace Algorithms.CMOrderedTreeMiner
{
    public class Main
    {

        public int Support { get; set; }
        public static bool DoDebug { get; set; } = false;

        public void Run(IEnumerable<string> treeStrings)
        {
            var trees = treeStrings.Select(ts => TextTree.ReadFromString(ts));
            TreeCollector treeCollector = new TreeCollector();
            Run(trees, treeCollector);
        }

        public void Run(IEnumerable<ICommonTree> trees, TreeCollector treeCollector)
        {
            var treeConverter = new TreeConverter();
            var cmTrees = trees.Select(t => treeConverter.ConvertToCMOrderedTreeMinerTree(t)).ToList();
            Run(cmTrees, treeCollector);
        }

        public void Run(IEnumerable<TextTree> trees, TreeCollector treeCollector)
        {
            List<TextTree> database = trees.Where(t => treeCollector.IsTreeInteresting(t)).ToList();


            if (database.Count == 0)
            {
                throw new Exception("No trees are interesting... Check TreeCollector.IsTreeInteresting filter function");
            }

            List<int> frequency = Util.CreateListAndFillWithValue(1000, 0);
            List<int> @checked = Util.CreateListAndFillWithValue(1000, 0);
            List<int> closed = Util.CreateListAndFillWithValue(1000, 0);
            List<int> maximal = Util.CreateListAndFillWithValue(1000, 0);

            PatternTree.currentPatternTree.initialSize();

            foreach (TextTree tree in database)
            {
                Globals.MAX_VERTEX = Math.Max(tree.vLabel.Max(), Globals.MAX_VERTEX);
                Globals.MIN_VERTEX = Math.Min(tree.vLabel.Min(), Globals.MIN_VERTEX);
            }

            /******************************************************************
	        step2.1: scan the database once, find frequent node labels
	        ******************************************************************/
            List<bool> isFrequent = Util.CreateListAndFillWithValue(Globals.MAX_VERTEX - Globals.MIN_VERTEX + 1, false);
            AutoCreateDictionary<Int32, int> count = new AutoCreateDictionary<Int32, int>();

            foreach (var curTree in database)
            {
                if (DoDebug)
                {
                    Debug.WriteLine("Tree");
                    Debug.WriteLine(curTree.OutputToString());
                }

                List<bool> isVisited = Util.CreateListAndFillWithValue(Globals.MAX_VERTEX - Globals.MIN_VERTEX + 1, false);
                for (Int32 j = 0; j < curTree.vNumber; j++)
                {
                    Int32 temp = (Int32)(curTree.vLabel[j] - Globals.MIN_VERTEX);
                    if (!isVisited[temp])
                    {
                        isVisited[temp] = true;
                        if (count.ContainsKey(temp))
                        {
                            count[temp]++;
                        } else
                        {
                            count[temp] = 1;
                        }
                    }
                }
            }
            for (Int32 i = 0; i < isFrequent.Count; i++)
            {
                if (count[i] >= Support) isFrequent[i] = true;
            }

            /******************************************************************
	        step2.2: scan the database another time, to get occurrenceList for all 
	        frequent nodes 
	        ******************************************************************/
            AutoCreateDictionary<Int32, OccLongList> occLongList =  new AutoCreateDictionary<Int32, OccLongList>();
            List<Int32> dummy = new List<Int32>();

            for (int i = 0; i < database.Count; i++)
            {
                for (Int32 j = 0; j < database[i].vNumber; j++)
                {
                    if (isFrequent[database[i].vLabel[j] - Globals.MIN_VERTEX] == true)
                    {
                        occLongList[(Int32)(database[i].vLabel[j] - Globals.MIN_VERTEX)].Insert(i, dummy, j);
                    }
                }
            }

            /******************************************************************
            step2.3: explore each frequent item 
            ******************************************************************/

            foreach (var kvp in occLongList)
            {
                if (kvp.Value.mySupport >= Support)
                {
                    PatternTree.currentPatternTree.addRightmost((Int32)(kvp.Key + Globals.MIN_VERTEX), 0);
                    kvp.Value.Explore(isFrequent, database, Support, @checked, closed, maximal, 1, treeCollector);
                    PatternTree.currentPatternTree.deleteRightmost();
                }
            }

            //stop_time = time(0);

            /******************************************************************
            step2.4: output the results 
            ******************************************************************/
            var sb = new StringBuilder();
            for (Int32 j = 0; j < 1000; j++)
            {
                if (@checked[j] > 0) {
                    sb.AppendLine($"number of checked {j} trees: {@checked[j]}");
                }
            }
            sb.AppendLine("\n************************");
            for (Int32 j = 0; j < 1000; j++)
            {
                if (closed[j] > 0)
                {
                    sb.AppendLine($"number of closed {j} trees: {closed[j]}");
                }
            }
            sb.AppendLine("\n************************");
            for (Int32 j = 0; j < 1000; j++)
            {
                if (maximal[j] > 0)
                {
                    sb.AppendLine($"number of maximal {j} trees: {maximal[j]}");
                }
            }

            foreach (var pattern in treeCollector.ClosedTrees.OrderBy(p => p.MatchLocations.Count()))
            {
                //Debug.WriteLine($"Tree with support {pattern.MatchLocations.Count()}\n{TreeUtil.StringRepresentation(pattern.Pattern)}");
                //Debug.WriteLine(string.Join("\n", pattern.MatchLocations.Select(treeId => "    " + treeId)));
            }

            Debug.WriteLine(sb.ToString());
            // Console.WriteLine(sb.ToString());
        }
    }
}
