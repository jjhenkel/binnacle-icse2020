using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text;
using System.Linq;
using Algorithms.Common;
using Algorithms.TreeCommon;

namespace Algorithms.CMOrderedTreeMiner
{


    public class OccLongList
    {
        private List<Tuple<int, List<Int32>>> occurrenceLong;
        int lastTid;
        public int mySupport;

        public string GetOccurrenceLongString()
        {
            var sb = new StringBuilder();
            sb.AppendLine($"occurrenceLong has {occurrenceLong.Count} members");
            foreach (var item in occurrenceLong)
            {
                sb.AppendLine($"  item: {item.Item1}, List: {{{string.Join(", ", item.Item2) }}}");
            }
            return sb.ToString();
        }

        public OccLongList()
        {
            lastTid = -1;
            mySupport = 0;
            occurrenceLong = new List<Tuple<int, List<Int32>>>();
        }

        public void Insert(int newTid, List<Int32> oldLocations, Int32 newLocation)
        {
            occurrenceLong.Add(Tuple.Create(newTid, oldLocations.ToList()));
            occurrenceLong.Back().Item2.Add(newLocation);
            if (lastTid != newTid)
            { //if comes from a new transaction
                lastTid = newTid;
                mySupport++;
            }
        }

        public bool CombineList(OccLongList mother, OccList newNodes)
        {
            occurrenceLong.Clear();
            int nodeId = 0;
            int motherId = 0;

            //check if the extension is a occurrenceMatch
            bool occurrenceMatch = true;
            int newNodeId = 0;
            motherId = -1;
            while (newNodeId < newNodes.occurrence.Count)
            {
                if (newNodes.occurrence[newNodeId].Item1 == (motherId + 1))
                    motherId++;
                else if (newNodes.occurrence[newNodeId].Item1 != motherId)
                {
                    occurrenceMatch = false;
                    break;
                }
                newNodeId++;
            }

            if (occurrenceMatch)
            { //have to pass the last test, i.e., if the last one
              //in newNodes has the greatest motherId
                if (newNodes.occurrence[newNodeId - 1].Item1 != (mother.occurrenceLong.Count - 1))
                    occurrenceMatch = false;
            }

            nodeId = 0;
            motherId = 0;
            mySupport = 0;
            int tempTid = -1;
            while (nodeId < newNodes.occurrence.Count)
            {
                //first, find the correct mother
                while (motherId != newNodes.occurrence[nodeId].Item1) motherId++;
                var motherRef = mother.occurrenceLong[motherId];
                occurrenceLong.Add(Tuple.Create(motherRef.Item1, motherRef.Item2.ToList()));
                occurrenceLong.Back().Item2.Add(newNodes.occurrence[nodeId].Item2);
                if (tempTid != mother.occurrenceLong[motherId].Item1)
                {
                    tempTid = mother.occurrenceLong[motherId].Item1;
                    mySupport++;
                }
                while ((nodeId + 1) < newNodes.occurrence.Count
                    && (newNodes.occurrence[nodeId].Item1 == newNodes.occurrence[nodeId + 1].Item1))
                {
                    nodeId++;
                    var item = mother.occurrenceLong[motherId];
                    occurrenceLong.Add(Tuple.Create(item.Item1, item.Item2.ToList()));
                    occurrenceLong.Back().Item2.Add(newNodes.occurrence[nodeId].Item2);
                }
                nodeId++;
            }
            return occurrenceMatch;
        }

        public void Explore(List<bool> isFrequent,
            List<TextTree> database,
            int support,
            List<int> @checked,
            List<int> closed,
            List<int> maximal,
            int depth,
            TreeCollector treeCollector)
        {
            //for debug
            //Debug.WriteLine($"depth {depth} support of current pattern tree is: {mySupport}");
            /*
            if (Main.DoDebug && PatternTree.currentPatternTree.NumberOfNodesContainingSubstring("Azure") >= 2)
            {
                Debug.WriteLine($"depth {depth} support of current pattern tree is: {mySupport}");
                Debug.WriteLine(PatternTree.currentPatternTree.OutputToString());
                Debug.WriteLine(GetOccurrenceLongString());

                foreach (var id in occurrenceLong.Select(kvp => kvp.Item1).Distinct())
                {
                    Debug.WriteLine($"  {database[id].tid}");

                }
            }
            */


            Int32 tempV = PatternTree.currentPatternTree.vNumber;
            @checked[tempV]++; //update the number of checked trees

            List<bool> rightPath = Util.CreateListAndFillWithValue(tempV, false);
            Int32 temp = (Int32)(tempV - 1);
            while (temp != -1)
            {
                rightPath[temp] = true;
                temp = PatternTree.currentPatternTree.parent[temp];
            }

            HashSet<Tuple<Int32, Int32>> occurrenceMatch = new HashSet<Tuple<Int32, Int32>>(); //(short,short) = (position,label)
            //HashSet<Tuple<short, short>>::iterator pos2;

            //step 1, do the occurrence match check
            int currentIndex; //current index of the occurrenceLong
            int myTid;
            int myLocation;

            //step 1.1, construct the base for occurrenceMatch
            //look at the root (0-th vertex) of the pattern tree
            currentIndex = 0;
            myTid = occurrenceLong[currentIndex].Item1;
            myLocation = occurrenceLong[currentIndex].Item2[0];
            if (myLocation != 0)
            { //the rooted of the pattern tree is not the root of the transaction
                occurrenceMatch.Add(Tuple.Create((Int32)0, database[myTid].vLabel[database[myTid].parent[myLocation]]));
            }

            //step 1.2, construct the base for occurrenceMatch
            //look at the "left","below", and "right" of all other nodes (not below the rightmost node)
            for (Int32 i = 1; i < tempV; i++)
            {
                myLocation = occurrenceLong[currentIndex].Item2[i];
                Int32 j;

                //record left occurrences
                if (PatternTree.currentPatternTree.previousSibling[i] == -1) //I have no left sibling
                {
                    j = database[myTid].firstChild[database[myTid].parent[myLocation]];
                }
                else
                {
                    j = occurrenceLong[currentIndex].Item2[PatternTree.currentPatternTree.previousSibling[i]];
                    j = database[myTid].nextSibling[j];
                }

                while (j != myLocation)
                {
                    occurrenceMatch.Add(Tuple.Create(i, database[myTid].vLabel[j]));
                    j = database[myTid].nextSibling[j];
                }

                //record below occurrences
                if (PatternTree.currentPatternTree.firstChild[i] == -1 && i != (tempV - 1))
                {
                    //I have no children
                    //and I am not the rightmost node
                    j = database[myTid].firstChild[myLocation];
                    while (j != -1)
                    {
                        occurrenceMatch.Add(Tuple.Create((Int32)(i + tempV), database[myTid].vLabel[j]));
                        j = database[myTid].nextSibling[j];
                    }
                }

                //record right occurrences
                if (PatternTree.currentPatternTree.nextSibling[i] == -1 && !rightPath[i])
                {
                    //I have no right sibling
                    //and I am not on the rightmost path
                    j = database[myTid].nextSibling[myLocation];
                    while (j != -1)
                    {
                        occurrenceMatch.Add(Tuple.Create((Int32)(i + 2 * tempV), database[myTid].vLabel[j]));
                        j = database[myTid].nextSibling[j];
                    }
                }
            }

            //step 1.3, check the occurrence match
            currentIndex++;
            
            while (occurrenceMatch.Count != 0 && currentIndex < occurrenceLong.Count)
            {
                myTid = occurrenceLong[currentIndex].Item1;
                var pos2 = occurrenceMatch.GetEnumerator();
                bool pos2HasNext = pos2.MoveNext();

                var toRemoveFromOccurrenceMatch = new HashSet<Tuple<Int32, Int32>>();
                while (pos2HasNext)
                {
                    Int32 j;

                    if (pos2.Current.Item1 == 0)
                    { //root occurrence
                        myLocation = occurrenceLong[currentIndex].Item2[pos2.Current.Item1];
                        bool isFound = false;

                        if (pos2.Current.Item2 == database[myTid].vLabel[database[myTid].parent[myLocation]])
                        {
                            isFound = true;
                        }

                        if (!isFound)
                        {
                            //occurrenceMatch.Remove(pos2.Current);
                            toRemoveFromOccurrenceMatch.Add(pos2.Current);
                            pos2HasNext = pos2.MoveNext();
                        }
                        else
                        {
                            pos2HasNext = pos2.MoveNext();
                        }
                    }
                    else if (pos2.Current.Item1 < tempV)
                    { //a left occurrence
                        myLocation = occurrenceLong[currentIndex].Item2[pos2.Current.Item1];
                        bool isFound = false;

                        if (PatternTree.currentPatternTree.previousSibling[pos2.Current.Item1] == -1) //I have no left sibling
                        {
                            j = database[myTid].firstChild[database[myTid].parent[myLocation]];
                        }
                        else
                        {
                            j = occurrenceLong[currentIndex].Item2[PatternTree.currentPatternTree.previousSibling[pos2.Current.Item1]];
                            j = database[myTid].nextSibling[j];
                        }

                        while (j != myLocation)
                        {
                            if (database[myTid].vLabel[j] == pos2.Current.Item2)
                            { //found it!
                                isFound = true;
                                break;
                            }
                            j = database[myTid].nextSibling[j];
                        }

                        if (!isFound)
                        {
                            //occurrenceMatch.Remove(pos2.Current);
                            toRemoveFromOccurrenceMatch.Add(pos2.Current);
                            pos2HasNext = pos2.MoveNext();
                        }
                        else
                        {
                            pos2HasNext = pos2.MoveNext();
                        }
                    }
                    else if (tempV < pos2.Current.Item1 && pos2.Current.Item1 < 2 * tempV)
                    { //a below occurrence
                        myLocation = occurrenceLong[currentIndex].Item2[pos2.Current.Item1 - tempV];
                        bool isFound = false;

                        j = database[myTid].firstChild[myLocation];
                        while (j != -1)
                        {
                            if (database[myTid].vLabel[j] == pos2.Current.Item2)
                            { //found it!
                                isFound = true;
                                break;
                            }
                            j = database[myTid].nextSibling[j];
                        }

                        if (!isFound)
                        {
                            //occurrenceMatch.Remove(pos2.Current);
                            toRemoveFromOccurrenceMatch.Add(pos2.Current);
                            pos2HasNext = pos2.MoveNext();
                        }
                        else
                        {
                            pos2HasNext = pos2.MoveNext();
                        }
                    }
                    else
                    { //a right occurrence
                        myLocation = occurrenceLong[currentIndex].Item2[pos2.Current.Item1 - 2 * tempV];
                        bool isFound = false;

                        j = database[myTid].nextSibling[myLocation];
                        while (j != -1)
                        {
                            if (database[myTid].vLabel[j] == pos2.Current.Item2)
                            { //found it!
                                isFound = true;
                                break;
                            }
                            j = database[myTid].nextSibling[j];
                        }

                        if (!isFound)
                        {
                            //occurrenceMatch.Remove(pos2.Current);
                            toRemoveFromOccurrenceMatch.Add(pos2.Current);
                            pos2HasNext = pos2.MoveNext();
                        }
                        else
                        {
                            pos2HasNext = pos2.MoveNext();
                        }
                    }
                }

                foreach (var match in toRemoveFromOccurrenceMatch)
                {
                    occurrenceMatch.Remove(match);
                }
                currentIndex++;
            }

            //step 1.4 prune, if there is occurrence match
            if (occurrenceMatch.Count != 0) return;

            //step 2, do transaction match checking
            bool isClosed = true; //innocent until proven guilty
            bool isMaximal = true;
            HashSet<Tuple<Int32, Int32>> transactionMatch = new HashSet<Tuple<Int32, Int32>>();

            currentIndex = 0;
            int startIndex = 0; //the lower bound of a range
            int stopIndex = 0; //the upper bound of a range

            myTid = occurrenceLong[0].Item1;
            while ((stopIndex + 1) < occurrenceLong.Count
                && myTid == occurrenceLong[stopIndex + 1].Item1)
            {
                stopIndex++;
            }

            for (currentIndex = startIndex; currentIndex <= stopIndex; currentIndex++)
            {
                myLocation = occurrenceLong[currentIndex].Item2[0];

                //step 2.1, construct the base for transactionMatch
                //look at the root (0-th vertex) of the pattern tree
                if (myLocation != 0)
                { //the rooted of the pattern tree is not the root of the transaction
                    transactionMatch.Add(Tuple.Create((Int32)0, database[myTid].vLabel[database[myTid].parent[myLocation]]));
                }

                //step 2.2, construct the base for transactionMatch
                //look at the "left", "below", and "right" of all other nodes (not below the rightmost node)
                for (Int32 i = 1; i < tempV; i++)
                {
                    myLocation = occurrenceLong[currentIndex].Item2[i];
                    Int32 j;

                    //record left occurrences
                    if (PatternTree.currentPatternTree.previousSibling[i] == -1) //I have no left sibling
                        j = database[myTid].firstChild[database[myTid].parent[myLocation]];
                    else
                    {
                        j = occurrenceLong[currentIndex].Item2[PatternTree.currentPatternTree.previousSibling[i]];
                        j = database[myTid].nextSibling[j];
                    }
                    while (j != myLocation)
                    {
                        transactionMatch.Add(Tuple.Create(i, database[myTid].vLabel[j]));
                        j = database[myTid].nextSibling[j];
                    }

                    //record below occurrences
                    if (PatternTree.currentPatternTree.firstChild[i] == -1 && i != (tempV - 1))
                    {
                        //I have no children
                        //and I am not the rightmost node
                        j = database[myTid].firstChild[myLocation];
                        while (j != -1)
                        {
                            transactionMatch.Add(Tuple.Create((Int32)(i + tempV), database[myTid].vLabel[j]));
                            j = database[myTid].nextSibling[j];
                        }
                    }

                    //record right occurrences
                    if (PatternTree.currentPatternTree.nextSibling[i] == -1 && !rightPath[i])
                    {
                        //I have no right sibling
                        //and I am not on the rightmost path
                        j = database[myTid].nextSibling[myLocation];
                        while (j != -1)
                        {
                            occurrenceMatch.Add(Tuple.Create((Int32)(i + 2 * tempV), database[myTid].vLabel[j]));
                            j = database[myTid].nextSibling[j];
                        }
                    }

                }
            }

            //step 2.3, check the transaction match
            startIndex = stopIndex + 1;
            while (transactionMatch.Count != 0 && startIndex < occurrenceLong.Count)
            {
                stopIndex = startIndex;
                myTid = occurrenceLong[startIndex].Item1;

                while ((stopIndex + 1) < occurrenceLong.Count
                    && myTid == occurrenceLong[stopIndex + 1].Item1)
                {
                    stopIndex++;
                }

                // pos2 = transactionMatch.begin();
                var pos2 = transactionMatch.GetEnumerator();
                var pos2HasNext = pos2.MoveNext();

                var toRemoveFromTransactionMatch = new HashSet<Tuple<Int32, Int32>>();
                while (pos2HasNext)
                {
                    Int32 j;

                    if (pos2.Current.Item1 == 0)
                    { //root occurrence
                        bool isFound = false;
                        currentIndex = startIndex;

                        while (!isFound && currentIndex <= stopIndex)
                        {
                            myLocation = occurrenceLong[currentIndex].Item2[pos2.Current.Item1];

                            if (pos2.Current.Item2 == database[myTid].vLabel[database[myTid].parent[myLocation]])
                            {
                                isFound = true;
                            }

                            currentIndex++;
                        }

                        if (!isFound)
                        {
                            //transactionMatch.erase(pos2++);
                            //transactionMatch.Remove(pos2.Current);
                            toRemoveFromTransactionMatch.Add(pos2.Current);
                            pos2HasNext = pos2.MoveNext();
                        }
                        else
                        {
                            pos2HasNext = pos2.MoveNext();
                        }
                    }
                    else if (pos2.Current.Item1 < tempV)
                    { //a left occurrence
                        bool isFound = false;
                        currentIndex = startIndex;

                        while (!isFound && currentIndex <= stopIndex)
                        {
                            myLocation = occurrenceLong[currentIndex].Item2[pos2.Current.Item1];
                            if (PatternTree.currentPatternTree.previousSibling[pos2.Current.Item1] == -1) //I have no left sibling
                                j = database[myTid].firstChild[database[myTid].parent[myLocation]];
                            else
                            {
                                j = occurrenceLong[currentIndex].Item2[PatternTree.currentPatternTree.previousSibling[pos2.Current.Item1]];
                                j = database[myTid].nextSibling[j];
                            }

                            while (j != myLocation)
                            {
                                if (database[myTid].vLabel[j] == pos2.Current.Item2)
                                { //found it!
                                    isFound = true;
                                    break;
                                }
                                j = database[myTid].nextSibling[j];
                            }
                            currentIndex++;
                        }

                        if (!isFound)
                        {
                            //transactionMatch.erase(pos2++);
                            //transactionMatch.Remove(pos2.Current);
                            toRemoveFromTransactionMatch.Add(pos2.Current);
                            pos2HasNext = pos2.MoveNext();
                        }
                        else
                        {
                            pos2HasNext = pos2.MoveNext();
                        }
                    }
                    else if (tempV < pos2.Current.Item1 && pos2.Current.Item1 < 2 * tempV)
                    { //a below occurrence
                        bool isFound = false;
                        currentIndex = startIndex;

                        while (!isFound && currentIndex <= stopIndex)
                        {
                            myLocation = occurrenceLong[currentIndex].Item2[pos2.Current.Item1 - tempV];

                            j = database[myTid].firstChild[myLocation];
                            while (j != -1)
                            {
                                if (database[myTid].vLabel[j] == pos2.Current.Item2)
                                { //found it!
                                    isFound = true;
                                    break;
                                }
                                j = database[myTid].nextSibling[j];
                            }
                            currentIndex++;
                        }

                        if (!isFound)
                        {
                            //transactionMatch.erase(pos2++);
                            //
                            //transactionMatch.Remove(pos2.Current);
                            toRemoveFromTransactionMatch.Add(pos2.Current);
                            pos2HasNext = pos2.MoveNext();
                        }
                        else
                        {
                            pos2HasNext = pos2.MoveNext();
                        }
                    }
                    else
                    { //a right occurrence
                        bool isFound = false;
                        currentIndex = startIndex;

                        while (!isFound && currentIndex <= stopIndex)
                        {
                            myLocation = occurrenceLong[currentIndex].Item2[pos2.Current.Item1 - 2 * tempV];

                            j = database[myTid].nextSibling[myLocation];
                            while (j != -1)
                            {
                                if (database[myTid].vLabel[j] == pos2.Current.Item2)
                                { //found it!
                                    isFound = true;
                                    break;
                                }
                                j = database[myTid].nextSibling[j];
                            }
                        }
                    }
                }

                foreach (var transaction in toRemoveFromTransactionMatch)
                {
                    transactionMatch.Remove(transaction);
                }

                startIndex = stopIndex + 1;
            }

            //step 2.4 not closed or maximal, if there is transaction match
            if (transactionMatch.Count != 0)
            {
                isClosed = false;
                isMaximal = false;
            }

            //step 3, explore all the right expansions
            bool isRightOccurrenceMatch = false;

            //step 3.1, explore the children of the rightmost node 
            AutoCreateDictionary<Int32, OccList> potentialChildren = new AutoCreateDictionary<Int32, OccList>();

            for (int i = 0; i < occurrenceLong.Count; i++)
            {
                myTid = occurrenceLong[i].Item1;
                myLocation = occurrenceLong[i].Item2[tempV - 1];
                Int32 k = database[myTid].firstChild[myLocation];
                //here, redundancy must be recorded also.
                while (k != -1)
                {
                    if (isFrequent[database[myTid].vLabel[k] - Globals.MIN_VERTEX] == true)
                    {
                        potentialChildren[(Int32)(database[myTid].vLabel[k] - Globals.MIN_VERTEX)].insert(myTid, k, i);
                    }
                    k = database[myTid].nextSibling[k];
                }
            }

            //for (pos = potentialChildren.begin(); pos != potentialChildren.end(); ++pos )
            foreach (var pos in potentialChildren)
            {

                if (pos.Value.mySupport >= support)
                { //a frequent extension!
                    if (pos.Value.mySupport == mySupport)
                    {
                        isClosed = false;
                    }
                    isMaximal = false;
                    PatternTree.currentPatternTree.addRightmost((Int32)(pos.Key + Globals.MIN_VERTEX), PatternTree.currentPatternTree.vNumber);
                    OccLongList newLongList = new OccLongList();
                    if (newLongList.CombineList(this, pos.Value))
                    {
                        isRightOccurrenceMatch = true;
                        isClosed = false;
                        isMaximal = false;
                    }
                    //Debug.WriteLine($"depth {depth} calling explore in 3.1");
                    newLongList.Explore(isFrequent, database, support, @checked, closed, maximal, depth+1, treeCollector);
                    //Debug.WriteLine($"depth {depth} returning from explore in 3.1");
                    PatternTree.currentPatternTree.deleteRightmost();
                }
            }

            //step 3.2, explore the right siblings of all the ancestors of the rightmost node
            Int32 tempNode = (Int32)(PatternTree.currentPatternTree.vNumber - 1);
            while (tempNode != 0 && !isRightOccurrenceMatch)
            {
                potentialChildren.Clear();
                for (int i = 0; i < occurrenceLong.Count; i++)
                {
                    myTid = occurrenceLong[i].Item1;
                    myLocation = occurrenceLong[i].Item2[tempNode];
                    Int32 k = database[myTid].nextSibling[myLocation];
                    while (k != -1)
                    {
                        if (isFrequent[database[myTid].vLabel[k] - Globals.MIN_VERTEX] == true)
                        {
                            potentialChildren[(Int32)(database[myTid].vLabel[k] - Globals.MIN_VERTEX)].insert(myTid, k, i);
                            //Debug.WriteLine($"depth {depth} adding potential child: tid: {myTid} k: {k} i: {i}");
                        }
                        k = database[myTid].nextSibling[k];
                    }
                }

                foreach (var kvp in potentialChildren)
                {
                    //Debug.WriteLine($"depth {depth} in 3.2 looking at potential child {kvp.Key} with label {PatternTree.currentPatternTree.vLabel[kvp.Key]}");
                    if (kvp.Value.mySupport >= support)
                    { //a frequent extension!
                        if (kvp.Value.mySupport == mySupport)
                        {
                            isClosed = false;
                        }
                        isMaximal = false;
                        PatternTree.currentPatternTree.addRightmost((Int32)(kvp.Key + Globals.MIN_VERTEX), tempNode);
                        OccLongList newLongList = new OccLongList();
                        if (newLongList.CombineList(this, kvp.Value))
                        {
                            isRightOccurrenceMatch = true;
                            isClosed = false;
                            isMaximal = false;
                        }
                        //Debug.WriteLine($"depth {depth} calling explore in 3.2");
                        newLongList.Explore(isFrequent, database, support, @checked, closed, maximal, depth+1, treeCollector);
                        //Debug.WriteLine($"depth {depth} returning from explore in 3.2");
                        PatternTree.currentPatternTree.deleteRightmost();
                    }
                }
                tempNode = PatternTree.currentPatternTree.parent[tempNode];
            }

            //step 4, the worst case, need to check left blanket to see if maximal
            Dictionary<Tuple<Int32, Int32>, Tuple<int, int>> potentialBlanket = new Dictionary<Tuple<Int32, Int32>, Tuple<int, int>>();
            //(short,short) = (position,label)
            //(int, int) = (lastTid,count)

            Tuple<int, int> pos3;

            currentIndex = 0;
            while (isMaximal && currentIndex < occurrenceLong.Count)
            {
                myTid = occurrenceLong[currentIndex].Item1;

                //step 4.1, look at the root (0-th vertex) of the pattern tree
                myLocation = occurrenceLong[currentIndex].Item2[0];
                if (myLocation != 0)
                { //the rooted of the pattern tree is not the root of the transaction
                  //pos3 = potentialBlanket.find(Tuple.Create(0,database[myTid].vLabel[database[myTid].parent[myLocation]]));

                    var key = Tuple.Create((Int32)0, database[myTid].vLabel[database[myTid].parent[myLocation]]);
                    if (potentialBlanket.TryGetValue(key, out pos3))
                    {
                        if (pos3.Item1 != myTid)
                        {
                            //pos3.Item1 = myTid;
                            //pos3.Item2++;
                            pos3 = Tuple.Create(myTid, pos3.Item2 + 1);
                            potentialBlanket[key] = pos3;
                            if (pos3.Item2 >= support) isMaximal = false;
                        }
                    }
                    else
                    {
                        potentialBlanket.Add(key, Tuple.Create(myTid, 1));
                    }
                }

                //step 4.2, look at the "left", "below", and "right" of all other nodes (not below the rightmost node)
                for (Int32 i = 1; i < tempV && isMaximal; i++)
                {
                    myLocation = occurrenceLong[currentIndex].Item2[i];
                    Int32 j;

                    //record left occurrences
                    if (PatternTree.currentPatternTree.previousSibling[i] == -1) //I have no left sibling
                        j = database[myTid].firstChild[database[myTid].parent[myLocation]];
                    else
                    {
                        j = occurrenceLong[currentIndex].Item2[PatternTree.currentPatternTree.previousSibling[i]];
                        j = database[myTid].nextSibling[j];
                    }
                    while (j != myLocation)
                    {

                        var key = Tuple.Create(i, database[myTid].vLabel[j]);

                        if (potentialBlanket.TryGetValue(key, out pos3))
                        {
                            if (pos3.Item1 != myTid)
                            {
                                //pos3.Item1 = myTid;
                                //pos3.Item2++;
                                pos3 = Tuple.Create(myTid, pos3.Item2 + 1);
                                potentialBlanket[key] = pos3;
                                if (pos3.Item2 >= support) isMaximal = false;
                            }
                        }
                        else
                        {
                            potentialBlanket.Add(key, Tuple.Create(myTid, 1));
                        }

                        j = database[myTid].nextSibling[j];
                    }

                    //record below occurrences
                    if (isMaximal && (PatternTree.currentPatternTree.firstChild[i] == -1 && i != (tempV - 1)))
                    {
                        //I have no children and I am not the rightmost node
                        j = database[myTid].firstChild[myLocation];
                        while (j != -1)
                        {

                            var key = Tuple.Create((Int32)(i + tempV), database[myTid].vLabel[j]);
                            if (potentialBlanket.TryGetValue(key, out pos3))
                            {
                                if (pos3.Item1 != myTid)
                                {
                                    pos3 = Tuple.Create(myTid, pos3.Item2 + 1);
                                    if (pos3.Item2 >= support) isMaximal = false;
                                }
                            }
                            else
                            {
                                potentialBlanket.Add(key, Tuple.Create(myTid, 1));
                            }
                            j = database[myTid].nextSibling[j];
                        }
                    }

                    //record right occurrence
                    if (isMaximal && (PatternTree.currentPatternTree.nextSibling[i] == -1 && !rightPath[i]))
                    {
                        //I have no right sibling and I am not on the right path
                        j = database[myTid].nextSibling[myLocation];
                        while (j != -1)
                        {
                            var key = Tuple.Create((Int32)(i + 2 * tempV), database[myTid].vLabel[j]);

                            if (potentialBlanket.TryGetValue(key, out pos3))
                            {
                                if (pos3.Item1 != myTid)
                                {
                                    pos3 = Tuple.Create(myTid, pos3.Item2 + 1);
                                    if (pos3.Item2 >= support) isMaximal = false;
                                }
                            }
                            else
                            {
                                potentialBlanket.Add(key, Tuple.Create(myTid, 1));
                            }
                            j = database[myTid].nextSibling[j];
                        }
                    }

                }

                if (!isMaximal) break;
                currentIndex++;
            }

            if (isClosed && treeCollector.IsTreeInteresting(PatternTree.currentPatternTree))
            {
                closed[tempV]++;

                var treeIDs = occurrenceLong.Select(kvp => database[kvp.Item1].tid).Distinct();

                treeCollector.AddClosedTree(PatternTree.currentPatternTree, mySupport, treeIDs);
                //Debug.WriteLine($"closed with support {mySupport}:  ");
                //Debug.WriteLine(PatternTree.currentPatternTree.OutputToString());
                
            }
            if (isMaximal && treeCollector.IsTreeInteresting(PatternTree.currentPatternTree))
            {
                maximal[tempV]++;

                var treeIDs = occurrenceLong.Select(kvp => database[kvp.Item1].tid).Distinct();

                treeCollector.AddMaximalTree(PatternTree.currentPatternTree, mySupport, treeIDs);
                //Debug.WriteLine($"closed with support {mySupport}:  ");
                //Debug.WriteLine(PatternTree.currentPatternTree.OutputToString());
         
            }
        }
    }
}
