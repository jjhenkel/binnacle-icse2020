using Algorithms.Common;
using Algorithms.TreeCommon;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Algorithms.CMOrderedTreeMiner
{
    public class TreeCollector
    {
        public List<TreePatternMatches> ClosedTrees { get; }
        public List<TreePatternMatches> MaximalTrees { get; }

        public Func<TextTree, bool> TreeFilter { get; set; }

        public TreeCollector()
        {
            ClosedTrees = new List<TreePatternMatches>();
            MaximalTrees = new List<TreePatternMatches>();
        }

        public void AddClosedTree(TextTree tree, int support, IEnumerable<string> treeIDs)
        {
            if (TreeFilter(tree))
            {
                var clone = tree.Clone();
                clone.support = support;
                ClosedTrees.Add(new TreePatternMatches(clone, treeIDs));
            }
        }

        public void AddMaximalTree(TextTree tree, int support, IEnumerable<string> treeIDs)
        {

            if (TreeFilter(tree))
            {
                var clone = tree.Clone();
                clone.support = support;
                MaximalTrees.Add(new TreePatternMatches(clone, treeIDs));
            }
        }

        public bool IsTreeInteresting(TextTree tree) => TreeFilter(tree);

    }
}
