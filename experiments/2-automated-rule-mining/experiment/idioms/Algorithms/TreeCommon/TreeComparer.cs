using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Algorithms.TreeCommon
{
    public class TreeComparer
    {

        public static bool TreesAreExactMatch(ICommonTreeNode tree1, ICommonTreeNode tree2)
        {
            if (tree1.Value != tree2.Value) return false;

            var child1Enumerator = tree1.Children.GetEnumerator();
            var child2Enumerator = tree2.Children.GetEnumerator();

            while (true)
            {
                bool hasNext1 = child1Enumerator.MoveNext();
                bool hasNext2 = child2Enumerator.MoveNext();
                if (hasNext1 != hasNext2)
                {
                    return false;
                }
                if (hasNext2 == false)
                {
                    return true;
                }
                if (!TreesAreExactMatch(child1Enumerator.Current, child2Enumerator.Current))
                {
                    return false;
                }
            }
        }

        public static bool TreeContainsOtherTree(ICommonTreeNode superTree, ICommonTreeNode subTree)
        {
            var matchingRoots = MatchRoots(superTree, subTree);
            return matchingRoots.Count > 0;
        }

        /* look for match of the root of the subtree against all nodes in the superTree */
        static List<ICommonTreeNode> MatchRoots(ICommonTreeNode superTree, ICommonTreeNode subRoot)
        {
            var stack = new Stack<ICommonTreeNode>();
            stack.Push(superTree);

            var matchingNodes = new List<ICommonTreeNode>();

            while (stack.Count > 0)
            {
                var potentialMatchNode = stack.Pop();
                if (SubTreeMatch(potentialMatchNode, subRoot))
                {
                    matchingNodes.Add(potentialMatchNode);
                }
                foreach (var child in potentialMatchNode.Children) stack.Push(child);
            }
            return matchingNodes;
        }

        static bool SubTreeMatch(ICommonTreeNode superNode, ICommonTreeNode subNode)
        {
            if (superNode.Value != subNode.Value) return false;

            var superChildEnumerator = superNode.Children.GetEnumerator();
            bool hasNext = superChildEnumerator.MoveNext();

            /* for every child subtree of subNode (in order), see if that subtree is found in one of the supernodes child subtrees (in order) */
            foreach (var subChild in subNode.Children)
            {
                bool found = false;
                while (!found)
                {
                    if (!hasNext) return false;
                    if (SubTreeMatch(superChildEnumerator.Current, subChild)) found = true;
                    hasNext = superChildEnumerator.MoveNext();
                }
            }
            return true;
        }
    }
}
