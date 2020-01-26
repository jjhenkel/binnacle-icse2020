using Algorithms.Common;
using Algorithms.TreeCommon;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Algorithms.CMOrderedTreeMiner
{
    public class TreeConverter
    {
        TextTree textTree;
        Int32 lastIndex;
        ItemMapping<int> itemMapping;

        public TreeConverter()
        {
            itemMapping = new ItemMapping<int>();
        }

        public GenericTree ConvertToGenericTree(TextTree tree)
        {
            var gTree = new GenericTree(tree.tid);
            gTree.root = ConvertToGenericNode(tree, 0);
            return gTree;
        }

        public GenericNode ConvertToGenericNode(TextTree tree, int nodeIndex)
        {
            var node = new GenericNode(TextTree.LabelMapping[tree.vLabel[nodeIndex]]);

            int childIndex = tree.firstChild[nodeIndex];
            while (childIndex != -1)
            {
                node.AddChild(ConvertToGenericNode(tree, childIndex));
                childIndex = tree.nextSibling[childIndex];
            }
            return node;
        }

        public TextTree ConvertToCMOrderedTreeMinerTree(ICommonTree tree)
        {
            ICommonTreeNode root = tree.Root;
            Int32 size = (Int32) TreeUtil.SizeOfTree(root);
            textTree = new TextTree(tree.SourceTag, size);

            lastIndex = -1;
            VisitChild(root);

            return textTree;
        }

        private Int32 VisitChild(ICommonTreeNode node)
        {
            Int32 nodeIndex = ++lastIndex;
            textTree.vLabel[nodeIndex] = (Int32) TextTree.LabelMapping[node.Value];
            Int32 lastChildIndex = -1;

            foreach (var child in node.Children)
            {
                Int32 childIndex = VisitChild(child);

                // set the parent of the child node to this node
                textTree.parent[childIndex] = nodeIndex;

                // set the first child of this node to the first node in the list of children
                if (lastChildIndex == -1)
                {
                    textTree.firstChild[nodeIndex] = childIndex;
                } else  // connect siblings to each other (if this is not the first child)
                {
                    textTree.nextSibling[lastChildIndex] = childIndex;
                }
                lastChildIndex = childIndex;
            }            
            return nodeIndex;
        }
    }
}
