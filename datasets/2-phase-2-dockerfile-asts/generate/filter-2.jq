def flatten: reduce .[] as $i ([]; if $i | type == "array" then . + ($i | flatten) else . + [$i] end);
def upgrade:
  if .type? == "COMMAND" then (
    if .command == null then 
      if .prefix|length == 1 then
        if .prefix[0].type? == "ASSIGN" then
          .prefix[0]|upgrade
        else {
          type: "MAYBE-SEMANTIC-COMMAND",
          children: [{
            type: "BASH-COMMAND-PREFIX",
            children: .prefix|map(upgrade)
          }, {
            type: "BASH-COMMAND-COMMAND",
            children: [ .command|upgrade ]
          }, {
            type: "BASH-COMMAND-ARGS",
            children: .arguments|map(upgrade)
          }]
        }
        end
      else {
        type: "MAYBE-SEMANTIC-COMMAND",
        children: [{
          type: "BASH-COMMAND-PREFIX",
          children: .prefix|map(upgrade)
        }, {
          type: "BASH-COMMAND-COMMAND",
          children: [ ]
        }, {
          type: "BASH-COMMAND-ARGS",
          children: .arguments|map(upgrade)
        }]
      }
      end
    else {
      type: "MAYBE-SEMANTIC-COMMAND",
      children: [{
        type: "BASH-COMMAND-PREFIX",
        children: .prefix|map(upgrade)
      }, {
        type: "BASH-COMMAND-COMMAND",
        children: [ .command|upgrade ]
      }, {
        type: "BASH-COMMAND-ARGS",
        children: .arguments|map(upgrade)
      }]
    }
    end
  )
  elif .type? == "FD_REDIRECT" then (
    if .value.type? == "IO_FILE" then
      if .value.op.type? == "GREATER" then
        { 
          type: "BASH-REDIRECT-OVERWRITE",
          children: [{
            type: "BASH-PATH",
            children: [ .value.file|upgrade ]
          }]
        }
      elif .value.op.type? == "DOUBLE_GREATER" then
        { 
          type: "BASH-REDIRECT-APPEND",
          children: [{
            type: "BASH-PATH",
            children: [ .value.file|upgrade ]
          }]
        }
      elif .value.op.type? = "LESS" then
        { 
          type: "BASH-REDIRECT-STDIN",
          children: [{
            type: "BASH-PATH",
            children: [ .value.file|upgrade ]
          }]
        }
      else
        { type: "UNKNOWN", children: [] }
      end
    elif .value.type? == "IO_DUPLICATE" then
      if .value.op.type? == "GREAT_AND" then
        if .value.num == "2" then
          { type: "BASH-IO-DUPE-STDERR", children: [] }
        elif .value.num == "1" then
          { type: "BASH-IO-DUPE-STDOUT", children: [] }
        else
          { type: "UNKNOWN", children: [] }
        end
      else
        { type: "UNKNOWN", children: [] }
      end
    else
      { type: "UNKNOWN", children: [] }
    end
  )
  elif .type? == "SCRIPT" then {
    type: "BASH-SCRIPT",
    children: .statements|map(upgrade)
  }
  elif .type? == "VARIABLE" then {
    type: "BASH-VARIABLE",
    value: .name,
    children: []
  }
  elif .type? == "FOR_IN" then {
    type: "BASH-FOR-IN",
    children: [{
      type: "BASH-FOR-IN-VARIABLE",
      children: [{
        type: "BASH-VARIABLE",
        value: .variable,
        children: []
      }] 
    }, {
      type: "BASH-FOR-IN-ITEMS",
      children: .items|map(upgrade)
    }, {
      type: "BASH-FOR-IN-BODY",
      children: .body|map(upgrade)
    }]
  }
  elif .type? == "AND_IF" then {
    type: "BASH-AND-IF",
    children: ([ 
      { type: "BASH-AND-MEM", children: [ .left|upgrade ] }
    ] + [
      { type: "BASH-AND-MEM", children: [ .right|upgrade ] }
    ]) | map(upgrade) | flatten
  }
  elif .type? == "BASH-AND-MEM" then (
    if .children[0].type? == "BASH-AND-IF" then
      .children[0].children
    else
      .
    end
  )
  elif .type? == "OR_IF" then {
    type: "BASH-OR-IF",
    children: ([ 
      { type: "BASH-OR-MEM", children: [ .left|upgrade ] }
    ] + [
      { type: "BASH-OR-MEM", children: [ .right|upgrade ] }
    ]) | map(upgrade) | flatten
  }
  elif .type? == "BASH-OR-MEM" then (
    if .children[0].type? == "BASH-OR-IF" then
      .children[0].children
    else
      .
    end
  )
  elif .type? == "CONCAT" then {
    type: "BASH-CONCAT",
    children: .parts|map(upgrade)
  }
  elif .type? == "SINGLE_QUOTED" then {
    type: "BASH-SINGLE-QUOTED",
    value: .value,
    children: []
  }
  elif .type? == "EXT_GLOB" then {
    type: "BASH-EXT-GLOB",
    value: .pattern,
    children: []
  }
  elif .type? == "GLOB" then {
    type: "BASH-GLOB",
    value: .pattern,
    children: []
  }
  elif .type? == "ASSIGN" then {
    type: "BASH-ASSIGN",
    children: [{
      type: "BASH-ASSIGN-LHS",
      children: [ { type: "BASH-VARIABLE", value: .left, children: [] } ]
    }, {
      type: "BASH-ASSIGN-RHS",
      children: [ .right|upgrade ]
    }]
  }
  elif .type? == "CONDITION" then {
    type: "BASH-CONDITION",
    children: [{
      type: "BASH-CONDITION-OP",
      children: [ { type: "BASH-OP", value: .op, children: [] } ] 
    }, {
      type: "BASH-CONDITION-EXP",
      children: [ .expression|upgrade ]
    }]
  }
  elif .type? == "LITERAL" then {
    type: "BASH-LITERAL",
    value: .value,
    children: []
  }
  elif .type? == "ARITHMETIC_SEQUENCE" then {
    type: "BASH-ARITHMETIC-SEQUENCE",
    children: .items|map(upgrade)
  }
  elif .type? == "ARITHMETIC_EXPANSION" then {
    type: "BASH-ARITHMETIC-EXPANSION",
    children: .items|map(upgrade)
  }
  elif .type? == "ARITHMETIC_VARIABLE" then {
    type: "BASH-ARITHMETIC-VARIABLE",
    children: [{
      type: "BASH-VARIABLE",
      value: .name,
      children: []
    }]
  }
  elif .type? == "ARITHMETIC_BINARY" then {
    type: "BASH-ARITHMETIC-BINARY",
    children: [{
      type: "BASH-ARITHMETIC-BINARY-OP",
      children: [{
        type: "BASH-OP",
        value: .op,
        children: []
      }]
    }, {
      type: "BASH-ARITHMETIC-BINARY-LHS",
      children: [ .left|upgrade ]
    }, {
      type: "BASH-ARITHEMTIC-BINARY-RHS",
      children: [ .right|upgrade ]
    }]
  }
  elif .type? == "DOLLAR_PARENS" then {
    type: "BASH-DOLLAR-PARENS",
    children: .expressions|map(upgrade)
  }
  elif .type? == "DOLLAR_ARITHMETIC" then {
    type: "BASH-DOLLAR-ARITHMETIC",
    children: .expression|upgrade
  }
  elif .type? == "UNTIL_EXPRESSION" then {
    type: "BASH-UNTIL-EXPRESSION",
    children: [{
      type: "BASH-UNTIL-CONDITION",
      children: .condition|map(upgrade)
    }, {
      type: "BASH-UNTIL-BODY",
      children: .statements|map(upgrade)
    }]
  }
  elif .type? == "PROC_SUB" then {
    type: "BASH-PROC-SUB",
    children: [{
      type: "BASH-PROC-SUB-OP",
      value: .op,
      children: []
    }, {
      type: "BASH-PROC-SUB-BODY",
      children: .statements|map(upgrade)
    }]
  }
  elif .type? == "DOUBLE_QUOTED" then {
    type: "BASH-DOUBLE-QUOTED",
    children: .pieces|map(upgrade)
  }
  elif .type? == "REDIRECT" then {
    type: "BASH-REDIRECT",
    children: [{
      type: "BASH-REDIRECT-COMMAND",
      children: [ .command|upgrade ]
    }, {
      type: "BASH-REDIRECT-REDIRECTS",
      children: .redirects|map(upgrade)
    }]
  }
  elif .type? == "PIPELINE" then {
    type: "BASH-PIPELINE",
    children: .commands|map(upgrade)
  }
  elif .type? == "FUNCTION" then {
    type: "BASH-FUNCTION",
    children: []
  }
  elif .type? == "CONDITION_EMPTY" then {
    type: "BASH-CONDITION-EMPTY",
    children: []
  }
  elif .type? == "CONDITION_UNARY" then {
    type: "BASH-CONDITION-UNARY",
    children: [{
      type: "BASH-CONDITION-UNARY-OP",
      children: [ { type: "BASH-OP", value: .op, children: [] } ] 
    }, {
      type: "BASH-CONDITION-UNARY-EXP",
      children: [ .expr|upgrade ]
    }]
  }
  elif .type? == "DOLLAR_SINGLE_QUOTED" then {
    type: "BASH-DOLLAR-SINGLE-QUOTED",
    value: .value,
    children: []
  }
  elif .type? == "CONDITION_BINARY" then {
    type: "BASH-CONDITION-BINARY",
    children: [{
      type: "BASH-CONDITION-BINARY-OP",
      children: [ { type: "BASH-OP", value: .op, children: [] } ] 
    }, {
      type: "BASH-CONDITION-BINARY-LHS",
      children: [ .lhs|upgrade ]
    }, {
      type: "BASH-CONDITION-BINARY-RHS",
      children: [ .rhs|upgrade ]
    }]
  }
  elif .type? == "CONDITION_NULLARY" then {
    type: "BASH-CONDITION-NULLARY",
    children: [ .expr|upgrade ]
  }
  elif .type? == "IF_EXPRESSION" then {
    type: "BASH-IF-EXPRESSION",
    children: [{
      type: "BASH-IF-CONDITION",
      children: .condition|map(upgrade)
    }, {
      type: "BASH-IF-THEN",
      children: .the_then|map(upgrade)
    }, {
      type: "BASH-IF-ELSE",
      children: .the_else|map(upgrade) 
    }]
  }
  elif .type? == "BRACE_EXPANSION" then {
    type: "BASH-BRACE-EXPANSION",
    children: .items|map(upgrade)
  }
  elif .type? == "BRACE_GROUP" then {
    type: "BASH-BRACE-GROUP",
    children: .items|map(upgrade)
  }
  elif .type? == "BACKGROUNDED" then {
    type: "BASH-BACKGROUNDED",
    children: [ .expression|upgrade ]
  }
  elif .type? == "BACKTICKED" then {
    type: "BASH-BACKTICKED",
    children: .expressions|map(upgrade)
  }
  elif .type? == "BANGED" then {
    type: "BASH-BANGED",
    children: [ .expression|upgrade ]
  }
  elif .type? == "SUBSHELL" then {
    type: "BASH-SUBSHELL",
    children: .expressions|map(upgrade)
  }
  elif .type? == "CASE_EXPRESSION" then {
    type: "BASH-CASE-EXPRESSION",
    children: [{
      type: "BASH-CASE-EXP-TARGET",
      children: [ .target|upgrade ]
    }, {
      type: "BASH-CASE-EXP-CASES",
      children: .cases|map({
        type: "BASH-CASE-EXP-CASE",
        children: [{
          type: "BASH-CASE-KIND",
          value: .kind,
          children: []
        }, {
          type: "BASH-CASE-LABELS",
          children: .labels|map(upgrade)
        }, {
          type: "BASH-CASE-EXPRESSIONS",
          children: .expressions|map(upgrade)
        }]
      })
    }]
  }
  elif .type? == "IF_ELSE_IF_EXPRESSION" then {
    type: "BASH-IF-ELSE-IF-EXPRESSION",
    children: ([ { type: "BASH-IF-ELSE", children: .the_else|map(upgrade) } ] + (.checks|map({
      type: "BASH-IF-ELSE-IF-EXP-CHECK",
      children: [{
        type: "BASH-IF-CONDITION",
        children: .condition|map(upgrade)
      }, {
        type: "BASH-IF-THEN",
        children: .the_then|map(upgrade)
      }] 
    })))
  }
  elif .type? == "WHILE_EXPRESSION" then {
    type: "BASH-WHILE-EXPRESSION",
    children: []
  }
  elif .type? == "CONDITION_AND" then {
    type: "BASH-CONDITION-AND",
    children: [{
      type: "BASH-CONDITION-AND-LHS",
      children: [ .lhs|upgrade ]
    }, {
      type: "BASH-CONDITION-AND-RHS",
      children: [ .rhs|upgrade ]
    }]
  }
  elif .type? == "CONDITION_OR" then {
    type: "BASH-CONDITION-OR",
    children: [{
      type: "BASH-CONDITION-OR-LHS",
      children: [ .lhs|upgrade ]
    }, {
      type: "BASH-CONDITION-OR-RHS",
      children: [ .rhs|upgrade ]
    }]
  }
  elif .type? == "ARRAY" then {
    type: "BASH-ARRAY",
    children: .items|map(upgrade)
  }
  elif .type? == "UNKNOWN" then {
    type: "UNKNOWN",
    children: []
  }
  else
    .
  end
;
# Actually do the upgrade
upgrade