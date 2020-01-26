using Algorithms.Common;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Algorithms.TreeCommon
{
    public class TreePatternMatches
    {
        public ICommonTree Pattern;
        public HashSet<string> MatchLocations = new HashSet<string>();
        public HashSet<string> SubtreeMatchLocations = new HashSet<string>();
        public int TotalLocationCount => AllMatchLocations.Count();
        public IEnumerable<string> AllMatchLocations => (MatchLocations.Union(SubtreeMatchLocations));

        public TreePatternMatches(ICommonTree pattern, IEnumerable<string> locations)
        {
            Pattern = pattern;
            MatchLocations.UnionWith(locations);
        }
    }
}
