using System;
using System.Collections.Generic;
using System.Linq;
using System.Diagnostics;
using System.Collections;
using System.Threading;
using Algorithms.TreeCommon;
using Algorithms.CMOrderedTreeMiner;

using Newtonsoft.Json.Linq;

namespace idioms
{
    class Program
    {

        static int tidx = 0;

        static void Main(string[] args)
        {   
            // Collect trees from stdin
            string line;
            var inputs = new List<JObject>();
            while ((line = Console.ReadLine()) != null && line != "") {
                inputs.Add(JObject.Parse(line));
            }
            
            var trees = inputs.Select(x  => toGenericTree(x)).ToList();

            if (trees.Count <= 50) {
                return;
            }
            // Console.WriteLine(Newtonsoft.Json.JsonConvert.SerializeObject(trees[0]));

            try {
                var idioms = FindIdiomsInTrees(trees);

                foreach (var idiom in idioms) {
                    if (TreeUtil.SizeOfTree(idiom.Pattern) <= 1) {
                        continue;
                    }
                    Console.WriteLine(TreeUtil.StringRepresentation(idiom.Pattern, false));
                }
            } catch (Exception) {

            }
        }

        private static GenericTree toGenericTree(JObject input)
        {
            tidx += 1;

            var tree = new GenericTree(
                $"INPUT-TREE-#{tidx}"
            );

            tree.root = toGenericNode(input);

            return tree;
        }

        private static GenericNode toGenericNode(JObject input) 
        {
            GenericNode theNode = null;
            if (input.ContainsKey("value")) 
            {
                try {
                    theNode = new GenericNode(input["value"].Value<string>());
                } catch (Exception) {
                    theNode = new GenericNode("UNKNOWN");
                }
            } 
            else 
            {
                theNode = new GenericNode(input["type"].Value<string>());
            }

            foreach (var child in input["children"])
            {
                theNode.AddChild(toGenericNode(child as JObject));
            }

            return theNode;
        }

        public class IdiomProviderConfig
        {
            // magic numbers from experimentation
            private IdiomProviderConfig()
            {
                MaxTreesToAnalyze = 300;
                MaxTreeSize = 50;
                MinTreeCountForAnalysis = 20;
                MinSupportPercentage = 75;
                MinSupportCount = 3;
            }

            public static IdiomProviderConfig GetDefaultConfig() => new IdiomProviderConfig();

            public int MaxTreesToAnalyze { get; set; }
            public int MaxTreeSize { get; set; }
            public int MinTreeCountForAnalysis { get; set; }
            public int MinSupportPercentage { get; set; }
            public int MinSupportCount { get; set; }
        }

         private static List<TreePatternMatches> FindIdiomsInTrees(IEnumerable<ICommonTree> treeCollection)
         {
            Stopwatch watch = Stopwatch.StartNew();

            var treeCollector = FindFrequentSubtrees(treeCollection, IdiomProviderConfig.GetDefaultConfig().MinSupportPercentage);

            Debug.WriteLine($"\n\nFound frequent trees from {treeCollection.Count()} trees in {watch.ElapsedMilliseconds} milliseconds");
            Debug.WriteLine($"There are {treeCollector.ClosedTrees.Count} closed trees\n and {treeCollector.MaximalTrees.Count} maximal trees");
           
            Debug.WriteLine("\n\n\n*** MERGING CLOSED TREES ***");
            var closedTrees = CanonicalizeFrequentTrees(treeCollector.ClosedTrees).ToList();

            Debug.WriteLine("\n\n\n*** MERGING MAXIMAL TREES ***");
            var maximalTrees = CanonicalizeFrequentTrees(treeCollector.MaximalTrees).ToList();

            Debug.WriteLine($"After merging, there are {closedTrees.Count} closed trees\n and {maximalTrees.Count} maximal trees");
            closedTrees = SubsumeFrequentTrees(closedTrees);
            maximalTrees = SubsumeFrequentTrees(maximalTrees);

            Debug.WriteLine($"After subsumption, there are {closedTrees.Count} closed trees\n and {maximalTrees.Count} maximal trees");
            var orderedSubsumedMaximalTrees = maximalTrees.OrderByDescending(tup => tup.AllMatchLocations.Count()).ToList();
            // var mergedIdiomPatterns = MergeFrequentIdiomTrees(orderedSubsumedMaximalTrees);


            // Debug.WriteLine($"\n\ndone with frequent trees in {watch.ElapsedMilliseconds} milliseconds");
            // return mergedIdiomPatterns;
            return orderedSubsumedMaximalTrees;
        }

        private static TreeCollector FindFrequentSubtrees(IEnumerable<ICommonTree> treeCollection, int minSupportPercentage)
        {
            Func<ICommonTree, bool> idiomFilter = (ICommonTree x) => true;

            var treeConverter = new TreeConverter();
            List<TextTree> textTrees = treeCollection.Select(tree => treeConverter.ConvertToCMOrderedTreeMinerTree(tree)).ToList();

            var main = new Main();
            main.Support = (int)((minSupportPercentage / 100.0) * textTrees.Count());
            main.Support = Math.Max(main.Support, IdiomProviderConfig.GetDefaultConfig().MinSupportCount);
            Debug.WriteLine($"Minimum Support is {main.Support}");
            var treeCollector = new TreeCollector();
            treeCollector.TreeFilter = idiomFilter;

            main.Run(textTrees, treeCollector);

            return treeCollector;
        }

        private static List<TreePatternMatches> SubsumeFrequentTrees(List<TreePatternMatches> treeCollection)
        {
            List<TreePatternMatches> subsumedTreePatterns = new List<TreePatternMatches>();
            foreach (var patternMatches1 in treeCollection.OrderByDescending(x => TreeUtil.SizeOfTree(x.Pattern)))
            {
                var tree1 = patternMatches1.Pattern;
                var matchingMethods = patternMatches1.MatchLocations;
                //Debug.WriteLine("Looking at tree:\n" + TreeUtil.StringRepresentation(tree1));

                bool foundMatchingTree = false;
                foreach (var patternMatches2 in subsumedTreePatterns.OrderByDescending(x => TreeUtil.SizeOfTree(x.Pattern)))
                {
                    var tree2 = patternMatches2.Pattern;
                    if (TreeUtil.IsTreeSubtreeOfTree(tree1.Root, tree2.Root))
                    {
                        //Debug.WriteLine($"subsumed by tree:\n{TreeUtil.StringRepresentation(tree2)}");
                        patternMatches2.SubtreeMatchLocations.UnionWith(patternMatches1.AllMatchLocations);
                        foundMatchingTree = true;
                        // it can only be merged with one tree, so skip out of the loop
                        break;
                    }
                }

                if (!foundMatchingTree)
                {
                    //Debug.WriteLine("did not merge with any tree");
                    subsumedTreePatterns.Add(new TreePatternMatches(tree1, matchingMethods));
                }
            }
            return subsumedTreePatterns;
        }

        private static List<TreePatternMatches> CanonicalizeFrequentTrees(List<TreePatternMatches> treeCollection)
        {
            var minimizedTreePatternMatches = new List<TreePatternMatches>();
            foreach (var treeMatches in treeCollection)
            {
                var jsonTree = JsonNodeOperations.ConvertToJsonNode(treeMatches.Pattern.Root);
                var origRepresentation = TreeUtil.StringRepresentation((ICommonTree)jsonTree);
                //Debug.WriteLine("Looking at tree:\n" + origRepresentation);

                var minimizedTree = JsonNodeOperations.TrimJsonNodeTree(jsonTree);
                var newRepresentation = TreeUtil.StringRepresentation((ICommonTree)minimizedTree);

                if (origRepresentation != newRepresentation)
                {
                    //Debug.WriteLine("minimized tree to:");
                    //Debug.WriteLine(newRepresentation);
                }

                bool foundMatchingTree = false;
                foreach (var treeMatches2 in minimizedTreePatternMatches)
                {
                    if (TreeUtil.IsEqual(minimizedTree, treeMatches2.Pattern))
                    {
                        //Debug.WriteLine($"merging with tree:\n{TreeUtil.StringRepresentation(treeMatches2.Pattern)}");
                        treeMatches.MatchLocations.UnionWith(treeMatches.MatchLocations);
                        foundMatchingTree = true;
                        // it can only be merged with one tree, so skip out of the loop
                        break;
                    }
                }

                if (!foundMatchingTree)
                {
                    //Debug.WriteLine("did not merge with any tree");
                    minimizedTreePatternMatches.Add(new TreePatternMatches(minimizedTree, treeMatches.MatchLocations));
                }
            }
            return minimizedTreePatternMatches;
        }

    }
}
