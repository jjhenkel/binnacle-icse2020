using System;
using System.Collections.Generic;
using System.Text;

namespace Algorithms.CMOrderedTreeMiner
{
    public class OccList
    {
        //the occurrence list for the FREQT, i.e., Asai's algorithm

        public static Int32 currentVertexNumber = 0;
        

        public List<Tuple<int, Int32>> occurrence;
        int lastTid;
        public int mySupport;

        public OccList()
        {
            lastTid = -1;
            mySupport = 0;
            occurrence = new List<Tuple<int, Int32>>();
        }

        //public void insert(int& newTid, const short& newLocation)
        public void insert(int newTid, Int32 newLocation)
        {
            occurrence.Add(Tuple.Create(newTid, newLocation));
            if (lastTid != newTid)
            {
                lastTid = newTid;
                mySupport++;
            }
        }

        //void insert(int& newTid, const short& newLocation, int& motherId) {}
	    public void insert(int newTid, Int32 newLocation, int motherId)
        {
            occurrence.Add(Tuple.Create(motherId, newLocation));
            if (lastTid != newTid)
            {
                lastTid = newTid;
                mySupport++;
            }
        }

        //void explore(const vector<bool>& isFrequent, 
        //    const vector<TextTree>& database,
        //    const int& support,
        //    vector<int>& frequency,
        //    const short level)

        void explore(List<bool> isFrequent,
            List<TextTree> database,
            int support,
            List<int> frequency,
            Int32 level)
        {
            frequency[currentVertexNumber]++;

            //first, explore the children of the rightmost node
            AutoCreateDictionary<Int32, OccList> potentialChildren = new AutoCreateDictionary<Int32, OccList>();

            HashSet<Int32> buffer = new HashSet<Int32>();
            for (int i = 0; i < occurrence.Count; i++)
            {
                int myTid = occurrence[i].Item1;
                Int32 myLocation = occurrence[i].Item2;
                Int32 k = database[myTid].firstChild[myLocation];
                while (k != -1)
                {
                    if (isFrequent[database[myTid].vLabel[k] - Globals.MIN_VERTEX] == true)
                    {
                        buffer.Add(k);
                    }
                    k = database[myTid].nextSibling[k];
                }

                while ((i + 1) < occurrence.Count && myTid == occurrence[i + 1].Item1)
                {
                    i++;
                    myLocation = occurrence[i].Item2;
                    k = database[myTid].firstChild[myLocation];
                    while (k != -1)
                    {
                        if (isFrequent[database[myTid].vLabel[k] - Globals.MIN_VERTEX] == true)
                        {
                            buffer.Add(k);
                        }
                        k = database[myTid].nextSibling[k];
                    }
                }

                foreach (Int32 pos2 in buffer)
                {
                    potentialChildren[(Int32)(database[myTid].vLabel[pos2] - Globals.MIN_VERTEX)].insert(myTid, pos2);
                }
                buffer.Clear();
            }

            /*
            for (pos = potentialChildren.begin(); pos != potentialChildren.end(); ++pos)
            {
                if (pos->second.mySupport >= support)
                { //a frequent extension!
                    currentVertexNumber++;
                    pos->second.explore(isFrequent, database, support, frequency, level + 1);
                    currentVertexNumber--;
                }
            }
            */
            foreach (var kvp in potentialChildren)
            {
                if (kvp.Value.mySupport >= support)
                {
                    currentVertexNumber++;
                    kvp.Value.explore(isFrequent, database, support, frequency, (Int32)(level + 1));
                    currentVertexNumber--;
                }
            }

            //second, explore the right siblings of all the ancestors of the rightmost node
            Int32 myLevel = level; //how many backtracks needed to go from the rightmost node to this node on the rightmost path
            while (myLevel != 0)
            {
                potentialChildren.Clear();
                for (int i = 0; i < occurrence.Count; i++)
                {
                    int myTid = occurrence[i].Item1;
                    Int32 myLocation = occurrence[i].Item2;
                    //find the location of the current node, the location is derived from the location of the rightmost node
                    for (Int32 m = level; m > myLevel; m--) myLocation = database[myTid].parent[myLocation];
                    Int32 k = database[myTid].nextSibling[myLocation];
                    while (k != -1)
                    {
                        if (isFrequent[database[myTid].vLabel[k] - Globals.MIN_VERTEX] == true)
                        {
                            buffer.Add(k);
                        }
                        k = database[myTid].nextSibling[k];
                    }

                    while ((i + 1) < occurrence.Count && myTid == occurrence[i + 1].Item1)
                    {
                        i++;
                        myLocation = occurrence[i].Item2;
                        for (Int32 m = level; m > myLevel; m--) myLocation = database[myTid].parent[myLocation];
                        k = database[myTid].nextSibling[myLocation];
                        while (k != -1)
                        {
                            if (isFrequent[database[myTid].vLabel[k] - Globals.MIN_VERTEX] == true)
                            {
                                buffer.Add(k);
                            }
                            k = database[myTid].nextSibling[k];
                        }
                    }

                    
                    //for (pos2 = buffer.begin(); pos2 != buffer.end(); ++pos2)
                    //{
                    //    potentialChildren[database[myTid].vLabel[*pos2] - MIN_VERTEX].insert(myTid, *pos2);
                    //}
                    foreach (Int32 pos2 in buffer)
                    {
                        potentialChildren[(Int32)(database[myTid].vLabel[pos2] - Globals.MIN_VERTEX)].insert(myTid, pos2);
                    }
                    buffer.Clear();
                }

                foreach (var kvp in potentialChildren)
                {
                    if (kvp.Value.mySupport >= support)
                    {
                        //a frequent extension!
                        currentVertexNumber++;
                        kvp.Value.explore(isFrequent, database, support, frequency, myLevel);
                        currentVertexNumber--;
                    }
                }
                myLevel--; //backtrack
            }
        }
    }
}
