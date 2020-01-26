using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;



namespace idioms
{
    public interface IJsonNodeTreeTransform
    {
        void TransformTree(JsonNode node);
    }

    public class JsonNodeTransforms : IJsonNodeTreeTransform
    {
        public void TransformTree(JsonNode root)
        {
            AddBodyNodes(root);
            AddStatementNodes(root);
            BinarizeStatementList(root);
        }

        public static void AddStatementNodes(JsonNode node)
        {
            
            for (int i=0; i < node.children.Count; i++)
            {
                JsonNode child = node.children[i];
                if (ShouldAddStatementParent(child.kind) && node.kind != JsonNodeKind.Statement)
                {
                    var stmtNode = new JsonNode(JsonNodeKind.Statement, child.location);
                    stmtNode.children.Add(child);
                    node.children[i] = stmtNode;
                }

                AddStatementNodes(child);
            }
        }

        public static void AddBodyNodes(JsonNode node)
        {
            if (ShouldAddBody(node.kind))
            {
                var bodyNode = new JsonNode(JsonNodeKind.Body, node.location)
                {
                    children = node.children
                };
                node.children = new List<JsonNode>();
                node.AddChild(bodyNode);
            }

            foreach (var child in node.children) AddBodyNodes(child);
        }

        public static void BinarizeStatementList(JsonNode node)
        {
            if (node.kind == JsonNodeKind.Body)
            {
                var statementNodes = node.children;

                var stmtListNode = new JsonNode(JsonNodeKind.StatementList, Guid.NewGuid().ToString());
                stmtListNode.AddChild(
                    JsonNode.Create(JsonNodeKind.Statement, Guid.NewGuid().ToString())
                        .AddChild(new JsonNode(JsonNodeKind.Empty, Guid.NewGuid().ToString()))
                );

                for (int i = statementNodes.Count-1; i >= 0; i--)
                {
                    var newStmtListNode = new JsonNode(JsonNodeKind.StatementList, Guid.NewGuid().ToString());
                    newStmtListNode.AddChild(statementNodes[i]);
                    newStmtListNode.AddChild(stmtListNode);
                    stmtListNode = newStmtListNode;
                }

                node.children = new List<JsonNode>();
                node.AddChild(stmtListNode);
            }

            foreach (var child in node.children)
            {
                BinarizeStatementList(child);
            }
        }

        static readonly HashSet<JsonNodeKind> AddStatementParentKinds = new HashSet<JsonNodeKind>(new []
        {
            JsonNodeKind.IfStatement,
            JsonNodeKind.Call,
            JsonNodeKind.ForStatement,
            JsonNodeKind.DoWhileStatement,
            JsonNodeKind.ForeachStatement,
            JsonNodeKind.UsingStatement,
            JsonNodeKind.WhileStatement,
            JsonNodeKind.PropertyAccess
        });

        public static bool ShouldAddStatementParent(JsonNodeKind kind)
        {
            return AddStatementParentKinds.Contains(kind);
        }

        private static readonly HashSet<JsonNodeKind> AddBodyKinds = new HashSet<JsonNodeKind>(new[]
        {
            JsonNodeKind.DoWhileBody,
            JsonNodeKind.ForBody,
            JsonNodeKind.ForEachBody,
            JsonNodeKind.IfFalseBody,
            JsonNodeKind.IfTrueBody,
            JsonNodeKind.WhileBody,
            JsonNodeKind.UsingBody,
            JsonNodeKind.MethodBody
        });

        public static bool ShouldAddBody(JsonNodeKind kind)
        {
            return AddBodyKinds.Contains(kind);
        }
    }

}