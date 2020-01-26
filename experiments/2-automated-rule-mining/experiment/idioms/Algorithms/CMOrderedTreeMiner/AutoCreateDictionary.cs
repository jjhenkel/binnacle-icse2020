using System;
using System.Collections.Generic;
using System.Text;

namespace Algorithms.CMOrderedTreeMiner
{
    public class AutoCreateDictionary<TKey, TValue> : Dictionary<TKey, TValue> where TValue : new()
    {
        public new TValue this[TKey key]
        {
            get
            {
                TValue value;
                if (base.TryGetValue(key, out value))
                {
                    return value;
                }
                var item = new TValue();
                base.Add(key, item);
                return item;
            }

            set
            {
                base[key] = value;
            }
        }
    }
}
