using Algorithms.TreeCommon;
using Newtonsoft.Json;
using Newtonsoft.Json.Converters;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace idioms
{

    public enum JsonNodeKind
    {
        Root, Class, Method, MethodName, Call, Identifier, PropertyAccess,
        IfStatement, IfCondition, IfTrueBody, IfFalseBody,
        DoWhileStatement, DoWhileCondition, DoWhileBody,
        WhileStatement, WhileCondition, WhileBody,
        ForStatement, ForInitializers, ForCondition, ForIterators, ForBody,
        ForeachStatement, ForeachInExpression, ForEachBody,
        UsingStatement, UsingResource, UsingBody,
        Body, Statement, StatementList, Empty, MethodBody,
        Any
    };

    [Serializable]
    public class JsonNode : ICommonTreeNode, ICommonTree
    {

        #region ICommonTree Implementation
        // the root of the ICommonTree interface for this node is itself.
        [JsonIgnore]
        ICommonTreeNode ICommonTree.Root => this;
        [JsonIgnore]
        string ICommonTree.SourceTag => location;

        [JsonIgnore]
        IEnumerable<ICommonTreeNode> ICommonTreeNode.Children => children;
        #endregion

        [JsonConverter(typeof(StringEnumConverter))]
        public JsonNodeKind kind;
        public string name;
        public string location = "unknown";
        public List<JsonNode> children = new List<JsonNode>();

        public IEnumerable<JsonNode> FindAllDescendents(JsonNodeKind kind)
        {
            if (this.kind == kind)
                yield return this;
            foreach (var child in children)
            {
                foreach (var match in child.FindAllDescendents(kind))
                {
                    yield return match;
                }
            }
        }

        public static JsonNode Create(JsonNodeKind kind, string location, String name = null)
        {
            return new JsonNode(kind, location, name);
        }

        /* this exists solely for deserialization */
        public JsonNode() { }

        public JsonNode(JsonNodeKind kind, string location, String name = null)
        {
            this.kind = kind;
            this.name = name == null ? kind.ToString() : name;
            this.location = location;
        }

        /* implementation of IFreqtTreeConvertibleNode interface */

        public string Value { get => name; }


        public override string ToString()
        {
            return $"JsonNode: {kind} ({name})";
        }

        public string TreeString()
        {
            var sb = new StringBuilder();
            TreeStringRec(this, sb, "  ");
            return sb.ToString();

        }

        private void TreeStringRec(JsonNode node, StringBuilder sb, string indent)
        {
            sb.AppendLine(indent + node.ToString());
            string newIndent = indent + "  ";
            foreach (var child in node.children)
            {
                TreeStringRec(child, sb, newIndent);
            }
        }

        public JsonNode AddChild(JsonNode child)
        {
            this.children.Add(child);
            return this;
        }

        private static readonly HashSet<string> BinarizableNodes = new HashSet<string>()
        {
            "SyntaxList"
        };

        private static (bool, string) ParseName(string name)
        {
            if (!name.StartsWith("$")) return (false, name);
            return (true, name.Substring(0, name.LastIndexOf("$")));
        }

    
    }
}
