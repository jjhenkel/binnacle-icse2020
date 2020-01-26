using Algorithms.Common;
using System;
using System.Collections.Generic;
using System.Text;

namespace Algorithms.CMOrderedTreeMiner
{
    class PatternTree : TextTree
    {
        public static PatternTree currentPatternTree = new PatternTree();

        PatternTree() : base() { }
        PatternTree(string t) : base(t) { }
        PatternTree(string t, Int32 v) : base(t, v) { }
        
        public List<Int32> previousSibling = new List<Int32>();

        public void initialSize()
        {
            tid = "empty_tid";
            vNumber = 0;
            vLabel.Resize(1000, -1);
            firstChild.Resize(1000, -1);
            nextSibling.Resize(1000, -1);
            previousSibling.Resize(1000, -1);
            parent.Resize(1000, -1);

        }

        public void deleteRightmost()
        {
            if (vNumber == 0) return;
            else if (vNumber == 1)
            {
                vNumber = 0;
            }
            else
            {
                if (firstChild[parent[vNumber - 1]] == vNumber - 1)
                {
                    firstChild[parent[vNumber - 1]] = -1;
                    vNumber--;
                }
                else
                {
                    Int32 k = firstChild[parent[vNumber - 1]];
                    while (nextSibling[k] != vNumber - 1) k = nextSibling[k];
                    nextSibling[k] = -1;
                    vNumber--;
                }
            }
            return;
        }

        public void addRightmost(Int32 vertexLabel, Int32 position)
        {
            if (vNumber == 0)
            {
                vLabel[0] = vertexLabel;
                firstChild[0] = -1;
                nextSibling[0] = -1;
                previousSibling[0] = -1;
                parent[0] = -1;
                vNumber = 1;
            }
            else if (position == vNumber)
            { //a speical flag, means adding as the child of current rightmost node
                firstChild[vNumber - 1] = vNumber;
                firstChild[vNumber] = -1;
                nextSibling[vNumber] = -1;
                previousSibling[vNumber] = -1;
                parent[vNumber] = (Int32)(vNumber - 1);
                vLabel[vNumber] = vertexLabel;
                vNumber++;
            }
            else
            { //assuming position is always on the rightmost path, and != 0
                firstChild[vNumber] = -1;
                nextSibling[vNumber] = -1;
                parent[vNumber] = parent[position];
                nextSibling[position] = vNumber;
                previousSibling[vNumber] = position;
                vLabel[vNumber] = vertexLabel;
                vNumber++;
            }
        }
    }
}
