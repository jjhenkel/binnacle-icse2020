using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Algorithms.CMOrderedTreeMiner
{
    using System;
    using System.Collections.Generic;
    using System.IO;
    using System.Text;
    using System.Linq;
    using Algorithms.Common;
    using Algorithms.TreeCommon;

    public class TextTreeNode: ICommonTreeNode
    {
        private TextTree Tree;
        private int Index;
        internal TextTreeNode (TextTree tree, int index)
        {
            Tree = tree;
            Index = index;
        }

        public IEnumerable<ICommonTreeNode> Children
        {
            get
            {
                int childIndex = Tree.firstChild[Index];
                while (childIndex != -1)
                {
                    // not the most efficient here, as we generate new nodes during each call to children...
                    // We could cache these as well so we don't keep creating them, but then each instance takes 
                    // only like 8 bytes...
                    yield return new TextTreeNode(Tree, childIndex);
                    childIndex = Tree.nextSibling[childIndex];
                }
            }
        }

        public string Value => TextTree.LabelMapping[Tree.vLabel[Index]];
    }

    public class TextTree : ICommonTree
    {

        #region Implement ICommonTree
        public ICommonTreeNode Root => new TextTreeNode(this, 0);

        public string SourceTag => tid;
        #endregion

        /* this is bad, should pass in the label mapping when creating it... */
        public static ItemMapping<string> LabelMapping = new ItemMapping<string>();

        public TextTree() : this("None")
        {
        }

        public TextTree(string t)
        {
            tid = t;
            vLabel = new List<Int32>();
            firstChild = new List<Int32>();
            nextSibling = new List<Int32>();
            parent = new List<Int32>();
        }

        public TextTree(string t, Int32 v)
        {
            tid = t;
            vNumber = v;
            vLabel = Util.CreateListAndFillWithValue(v, -1);
            firstChild = Util.CreateListAndFillWithValue(v, -1);
            nextSibling = Util.CreateListAndFillWithValue(v, -1);
            parent = Util.CreateListAndFillWithValue(v, -1);
        }

        public TextTree Clone()
        {
            var tree = new TextTree()
            {
                tid = tid,
                vNumber = vNumber,
                vLabel = vLabel.Take(vNumber).ToList(),
                firstChild = firstChild.Take(vNumber).ToList(),
                nextSibling = nextSibling.Take(vNumber).ToList(),
                parent = parent.Take(vNumber).ToList(),
                support = support
            };

            return tree;
        }

        public int NumberOfNodesContainingSubstring(string substring)
        {
            // linq is amazingly awesome
            return vLabel.Take(vNumber).Select(v => LabelMapping[v]).Distinct().Where(l => l.Contains(substring)).Count();
        }

        //public string sourceTag;
        public string tid;
        public Int32 vNumber;
        public List<Int32> vLabel;
        public List<Int32> firstChild;
        public List<Int32> nextSibling;
        public List<Int32> parent;
        public int support = 1;

        static string[] delimiters = { " " };

        public static TextTree ReadFromString(string treeString)
        {
            int total;
            Int32 temp;
            Stack<Int32> tempK = new Stack<Int32>();
            int index = 0;

            TextTree tree = new TextTree();
            var array = treeString.Split(delimiters, StringSplitOptions.RemoveEmptyEntries).ToArray();

            tree.tid = array[index++];
            index++; // the transaction id is included twice.  who knows why...
            total = int.Parse(array[index++]);
            temp = (Int32) LabelMapping[array[index++]];

            tree.vLabel.Add(temp);
            tree.firstChild.Add(-1);
            tree.nextSibling.Add(-1);
            tree.parent.Add(-1);
            tree.vNumber = 1;

            tempK.Push(0);

            for (int i = 0; i < total - 1; i++)
            {
                string label = array[index++];
                temp = (Int32) LabelMapping[label];
                if (label == "-1")
                {
                    tempK.Pop();
                    continue;
                }

                tree.vLabel.Add(temp);

                if (tree.firstChild[tempK.Peek()] == -1)
                {
                    tree.firstChild[tempK.Peek()] = tree.vNumber;
                }
                else
                {
                    Int32 j = tempK.Peek();
                    j = tree.firstChild[j];
                    while (tree.nextSibling[j] != -1) j = tree.nextSibling[j];
                    tree.nextSibling[j] = tree.vNumber;
                }

                tree.firstChild.Add(-1);
                tree.nextSibling.Add(-1);
                tree.parent.Add(tempK.Peek());
                tempK.Push(tree.vNumber);
                tree.vNumber++;
            }
            return tree;
        }

        public string OutputToString()
        {
            var sb = new StringBuilder();
            OutputToStringRec(sb, 0, "  ");
            return sb.ToString();
        }

        public void OutputToStringRec(StringBuilder sb, Int32 v, string indent)
        {
            sb.AppendLine(indent + LabelMapping[vLabel[v]]);
            if (firstChild[v] != -1) OutputToStringRec(sb, firstChild[v], indent + "  ");
            if (nextSibling[v] != -1) OutputToStringRec(sb, nextSibling[v], indent);
        }

        public string GetInInputFormat(string transactionId = null)
        {
            var items = new List<string>();
            tid = transactionId == null ? tid : transactionId;
            GetInInputFormatRec(items, 0);
            string formatString = $"{tid} {tid} {items.Count} {string.Join(" ", items)}";
            return formatString;
        }

        public void GetInInputFormatRec(List<string> items, Int32 v)
        {
            items.Add(TextTree.LabelMapping[vLabel[v]]);
            if (firstChild[v] != -1) GetInInputFormatRec(items, firstChild[v]);
            if (v != 0) items.Add("-1");
            if (nextSibling[v] != -1) GetInInputFormatRec(items, nextSibling[v]);
        }


    };


}
