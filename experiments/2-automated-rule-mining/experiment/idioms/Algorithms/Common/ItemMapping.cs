using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Algorithms.Common
{
    public class ItemMapping<T>
    {
        private int ApiIndex = 0;
        private Dictionary<T, int> ItemToInt = new Dictionary<T, int>();
        private Dictionary<int, T> IntToItem = new Dictionary<int, T>();

        public int GetIntForTargetType(T key)
        {
            if (!ItemToInt.ContainsKey(key))
            {
                ItemToInt[key] = ++ApiIndex;
                IntToItem[ApiIndex] = key;
            }

            return ItemToInt[key];
        }

        public T GetTargetTypeForInt(int key) => IntToItem[key];


        public int this[T key]
        {
            get
            {
                if (!ItemToInt.ContainsKey(key))
                {
                    ItemToInt[key] = ++ApiIndex;
                    IntToItem[ApiIndex] = key;
                }

                return ItemToInt[key];
            }
        }

        public T this[int key]
        {
            get { return IntToItem[key]; }
        }

        public string ToString(IEnumerable<int> itemSet)
        {
            return string.Join(", ", itemSet.Select(i => IntToItem[i]));
        }

    }
}
