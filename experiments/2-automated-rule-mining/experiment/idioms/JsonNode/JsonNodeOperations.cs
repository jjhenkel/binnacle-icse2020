using Algorithms.Common;
using Algorithms.TreeCommon;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace idioms
{
    public static class JsonNodeOperations
    {
        public static JsonNode ConvertToJsonNode(ICommonTreeNode node)
        {
            string name = null;

            JsonNodeKind kind;
            if (!Enum.TryParse(node.Value, out kind))
            {
                kind = JsonNodeKind.Identifier;
                name = node.Value;
            }

            JsonNode jNode = new JsonNode(kind, "unknown", name);

            node.Children.ForEach(c => jNode.AddChild(ConvertToJsonNode(c)));

            return jNode;
        }

        /* remove a singleton path of parents and also and subtrees that don't contain identifiers 
         return the root of the new tree */
        public static JsonNode TrimJsonNodeTree(JsonNode root)
        {
            JsonNode newRoot = GetFirstNodeWithMultipleChildren(root);
            RemoveEmptyControlFlowNodes(newRoot);
            return newRoot;
        }

        public static JsonNode GetFirstNodeWithMultipleChildren(JsonNode root)
        {
            int numChildren = root.children.Count();

            if (numChildren == 0 || numChildren > 1) return root;
            return GetFirstNodeWithMultipleChildren(root.children[0]);
        }

        public static void RemoveCallAndPropertyAccessNodes(JsonNode node)
        {
            int i = 0;
            while (i < node.children.Count)
            {
                if (node.children[i].kind == JsonNodeKind.Call || node.children[i].kind == JsonNodeKind.PropertyAccess || node.children[i].kind == JsonNodeKind.MethodName)
                {
                    Debug.Assert(node.children[i].children.Count <= 1);
                    if (node.children[i].children.Count > 0)
                    {
                        var grandChild = node.children[i].children[0];
                        node.children[i].children.Clear();
                        node.children[i] = grandChild;
                        i++;
                    }
                    else
                    {
                        node.children.RemoveAt(i);
                    }
                }
                else
                {
                    RemoveCallAndPropertyAccessNodes(node.children[i]);
                    i++;
                }

            }
        }


        public static void FilterByPrefix(JsonNode node, string prefix)
        {
            int i = 0;
            while (i < node.children.Count)
            {
                if (node.children[i].kind == JsonNodeKind.Identifier && !node.children[i].name.StartsWith(prefix))
                {
                    node.children.RemoveAt(i);
                }
                else
                {
                    FilterByPrefix(node.children[i], prefix);
                    i++;
                }
            }
        }

        // we consider IDisposable.Dispose to be a something we should remove
        public static void RemoveEmptyControlFlowNodes(JsonNode node)
        {
            int i = 0;
            while (i < node.children.Count)
            {
                if (!ContainsInterestingIdentifierInSubtree(node.children[i]))
                {
                    node.children.RemoveAt(i);
                }
                else
                {
                    RemoveEmptyControlFlowNodes(node.children[i]);
                    i++;
                }
            }
        }

        private static bool ContainsInterestingIdentifierInSubtree(JsonNode node)
        {
            if (node.kind == JsonNodeKind.Identifier && !node.name.Contains("IDisposable"))
            {
                return true;
            }
            foreach (var child in node.children)
            {
                if (ContainsInterestingIdentifierInSubtree(child))
                {
                    return true;
                }
            }
            return false;
        }
    }
}
