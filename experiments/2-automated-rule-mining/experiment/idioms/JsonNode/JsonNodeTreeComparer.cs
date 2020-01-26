using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace idioms
{
    public class JsonNodeTreeComparer
    {
        public static bool TreeContainsOtherTree(JsonNode superTree, JsonNode subTree)
        {
            


            return true;
        }

        static bool SubTreeMatch(JsonNode superNode, JsonNode subNode)
        {
            if (!SingleMatch(superNode, subNode)) return false;

            int superNodeChildIndex = 0;

            /* for every child subtree of subNode (in order), see if that subtree is found in one of the supernodes child subtrees (in order) */
            foreach (var subChild in subNode.children)
            {
                bool found = false;
                while (!found)
                {
                    if (superNodeChildIndex  >= superNode.children.Count)
                    {
                        return false;
                    }
                    if (SubTreeMatch(superNode.children[superNodeChildIndex], subChild))
                    {
                        found = true;
                    }
                    superNodeChildIndex++;
                }
            }
            return true;
        }

        static bool SingleMatch(JsonNode node1, JsonNode node2)
        {
            return node1.kind == node2.kind && node1.name == node2.name;
        }
    }
}
