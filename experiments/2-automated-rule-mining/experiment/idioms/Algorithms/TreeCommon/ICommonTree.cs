using Algorithms.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Algorithms.TreeCommon
{
    public interface ICommonTree
    {
        ICommonTreeNode Root { get; }

        string SourceTag { get; }
    }

    public interface ICommonTreeNode
    {
        IEnumerable<ICommonTreeNode> Children { get; }
        string Value { get; }
    }

    public static class TreeUtil
    {
        //TODO this implementation is probably horribly inefficient.  Could just pass a list along
        //or better yet use my own stack to handle the traversal
        public static IEnumerable<ICommonTreeNode> PreOrderNodeTraversal(ICommonTreeNode node)
        {
            yield return node;
            foreach (var child in node.Children)
            {
                foreach (var childNode in PreOrderNodeTraversal(child))
                {
                    yield return childNode;
                }
            }
        }

        public static int SizeOfTree(ICommonTree tree) => SizeOfTree(tree.Root);
        public static int SizeOfTree(ICommonTreeNode node)
        {
            return 1 + node.Children.Select(c => SizeOfTree(c)).Sum();
        }

        public static int NumberOfNodesContainingSubstring(ICommonTree tree, string substring) => NumberOfNodesContainingSubstring(tree.Root, substring);

        public static int NumberOfNodesContainingSubstring(ICommonTreeNode node, string substring)
        {
            return (node.Value.Contains(substring) ? 1 : 0) + node.Children.Sum(child => NumberOfNodesContainingSubstring(child, substring));
        }

        public static int NumberOfNodesStartingWithSubstring(ICommonTree tree, string substring) => NumberOfNodesStartingWithSubstring(tree.Root, substring);

        public static int NumberOfNodesStartingWithSubstring(ICommonTreeNode node, string substring)
        {
            return (node.Value.StartsWith(substring) ? 1 : 0) + node.Children.Sum(child => NumberOfNodesStartingWithSubstring(child, substring));
        }

        public static string StringRepresentation(this ICommonTree tree, bool includeSourceTag = true)
        {
            if (tree == null)
            {
                throw new ArgumentNullException(nameof(tree));
            }

            var sb = new StringBuilder();
            if (includeSourceTag) sb.AppendLine($"Tree: {tree.SourceTag}");
            StringRepresentationRec(sb, tree.Root);
            sb.Length -= 1;
            return sb.ToString();
        }

        public static string StringRepresentation(this ICommonTreeNode node)
        {
            if (node == null)
            {
                throw new ArgumentNullException(nameof(node));
            }

            var sb = new StringBuilder();
            StringRepresentationRec(sb, node);
            sb.Length -= 1;
            return sb.ToString();
        }

        private static void StringRepresentationRec(StringBuilder sb, ICommonTreeNode node, string indent = "")
        {
            sb.Append("{ \"type\": \""); 
            sb.Append(node.Value);
            sb.Append("\", \"children\": [");

            node.Children.ForEach(c => StringRepresentationRec(sb, c, indent));
            if (node.Children.Count() > 0) {
                sb.Length -= 1;
            }

            sb.Append("] },");
        }

        public static bool IsTreeSubtreeOfTree(ICommonTreeNode subtree, ICommonTreeNode superTree)
        {
            // find all nodes in the supertree that match the root of the subtree
            if (subtree.Value == superTree.Value)
            {
                if (IsTreeSubtreeOfTreeRec(subtree, superTree))
                {
                    return true;
                }
            }

            foreach (var child in superTree.Children)
            {
                if (IsTreeSubtreeOfTree(subtree, child))
                {
                    return true;
                }
            }
            return false;
        }

        private static bool IsTreeSubtreeOfTreeRec(ICommonTreeNode subtree, ICommonTreeNode supertree)
        {
            // this is wrong because it bails if the roots aren't the same
            // but the root of the subtree may be somewhere deep in the subtree
            if (subtree.Value != supertree.Value) return false;

            var enumerator = supertree.Children.GetEnumerator();
            bool hasNext = enumerator.MoveNext();

            // if the values of the nodes match and the subtree has no children, then it's a match
            if (subtree.Children == null) return true;

            foreach (var child in subtree.Children)
            {
                // if we run out of children in the supertree, then subtree is not a subtree
                while (true)
                {
                    // if we ever run out of nodes in the supertree, then subtree is not a true subtree
                    if (!hasNext) return false;
                    // if it's a match, then great!  break out and move to the next child
                    if (IsTreeSubtreeOfTreeRec(child, enumerator.Current))
                    {
                        break;
                    }
                    hasNext = enumerator.MoveNext();
                }
            }
            // we found a match for every child in subtree, so it must be a match
            return true;
        }

        public static bool IsEqual(ICommonTree tree1, ICommonTree tree2) => IsEqual(tree1.Root, tree2.Root);

        public static bool IsEqual(ICommonTreeNode node1, ICommonTreeNode node2)
        {
            // if the values in the nodes differ, they're different
            if (node1.Value != node2.Value)
            {
                return false;
            }

            // if neither has a child, then they're equal
            if (node1.Children == null && node2.Children == null) return true;
            // if one has children and the other does not, they're different
            if (node1.Children == null || node2.Children == null) return false;

            var enum1 = node1.Children.GetEnumerator();
            var enum2 = node2.Children.GetEnumerator();

            bool hasNext1;
            bool hasNext2;
            while (true)
            {
                hasNext1 = enum1.MoveNext();
                hasNext2 = enum2.MoveNext();
                //if one has a next child and the other doesn't, then they are different
                if (hasNext1 != hasNext2) return false;

                // if they both are out of chilren, then they are the same
                if (hasNext1 == false) return true;

                // if any of their children differ, then they are different
                if (!IsEqual(enum1.Current, enum2.Current))
                {
                    return false;
                }
            }
        }
    }

    public class GenericTree: ICommonTree
    {
        public string SourceTag { get; }

        public GenericNode root;
        public ICommonTreeNode Root { get => root; }

        public GenericTree(string sourceTag)
        {
            SourceTag = sourceTag;
        }
    }

    public class GenericNode : ICommonTreeNode
    {
        public string Value { get; }

        public List<GenericNode> children = new List<GenericNode>();
        public IEnumerable<ICommonTreeNode> Children { get => children; }

        public GenericNode(string value)
        {
            Value = value;
        }

        public void AddChild(GenericNode child)
        {
            children.Add(child);
        }

    }
}
