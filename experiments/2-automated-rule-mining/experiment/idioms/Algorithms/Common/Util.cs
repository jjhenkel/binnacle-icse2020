using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Algorithms.Common
{
    public static class Util
    {
        public static List<T> CreateListAndFillWithValue<T>(int size, T valueToFillWith)
        {
            var list = new List<T>(size);
            for (int i = 0; i < size; i++)
            {
                list.Add(valueToFillWith);
            }
            return list;
        }

        public static TValue GetOrDefault<TKey, TValue>(this Dictionary<TKey, TValue> dict, TKey key) where TValue : class, new()
        {
            if (dict.TryGetValue(key, out TValue value))
            {
                return value;
            }

            TValue newValue = new TValue();
            dict[key] = newValue;
            return newValue;
        }

        public static void Resize<T>(this List<T> list, int sz, T c)
        {
            int cur = list.Count;
            if (sz < cur)
                list.RemoveRange(sz, cur - sz);
            else if (sz > cur)
            {
                if (sz > list.Capacity)//this bit is purely an optimisation, to avoid multiple automatic capacity changes.
                    list.Capacity = sz;
                list.AddRange(Enumerable.Repeat(c, sz - cur));
            }
        }
        public static void Resize<T>(this List<T> list, int sz)
        {
            Resize(list, sz, default(T));
        }

        public static void SetSizeAndFill<T>(this List<T> list, int size, Func<int, T> creationFunc)
        {
            list.Clear();
            for (int i = 0; i < size; i++)
            {
                list.Add(creationFunc(i));
            }
        }

        public static T Back<T>(this List<T> list)
        {
            return list[list.Count - 1];
        }

        public static void ForEach<T>(this IEnumerable<T> enumerable, Action<T> action)
        {
            foreach (var item in enumerable)
            {
                action(item);
            }
        }

        public static HashSet<T> ToHashSet<T>(this IEnumerable<T> enumerable) => new HashSet<T>(enumerable);
    }
}
