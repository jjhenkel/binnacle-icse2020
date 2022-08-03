def upgrade:
  if .tag? == "TA_Assignment" then {
    type: "ARITHMETIC_ASSIGN",
    op: .contents[1],
    left: .contents[2] | upgrade,
    right: .contents[3] | upgrade
  }
  elif .tag? == "TA_Variable" then {
    type: "ARITHMETIC_VARIABLE",
    name: .contents[1],
    others: .contents[2] | map(upgrade)
  }
  elif .tag? == "TA_Expansion" then {
    type: "ARITHMETIC_EXPANSION",
    items: .contents[1] | map(upgrade)
  }
  elif .tag? == "TA_Sequence" then {
    type: "ARITHMETIC_SEQUENCE",
    items: .contents[1] | map(upgrade)
  }
  elif .tag? == "TA_Trinary" then {
    type: "ARITHMETIC_TRINARY",
    op1: .contents[1] | upgrade,
    op2: .contents[2] | upgrade,
    op3: .contents[3] | upgrade
  }
  elif .tag? == "TA_Binary" then {
    type: "ARITHMETIC_BINARY",
    op: .contents[1],
    left: .contents[2] | upgrade,
    right: .contents[3] | upgrade
  }
  elif .tag? == "TA_Unary" then {
    type: "ARITHMETIC_UNARY",
    op: .contents[1],
    expr: .contents[2] | upgrade
  }
  elif .tag? == "TC_And" then {
    type: "CONDITION_AND",
    lhs: .contents[2] | upgrade,
    rhs: .contents[3] | upgrade
  }
  elif .tag? == "TC_Binary" then {
    type: "CONDITION_BINARY",
    op: .contents[2],
    lhs: .contents[3] | upgrade,
    rhs: .contents[4] | upgrade
  }
  elif .tag? == "TC_Group" then {
    type: "CONDITION_GROUP"
  }
  elif .tag? == "TC_Nullary" then {
    type: "CONDITION_NULLARY",
    expr: .contents[2] | upgrade
  }
  elif .tag? == "TC_Or" then {
    type: "CONDITION_OR",
    lhs: .contents[3] | upgrade,
    rhs: .contents[4] | upgrade
  }
  elif .tag? == "TC_Unary" then {
    type: "CONDITION_UNARY", op: .contents[2], expr: .contents[3] | upgrade
  }
  elif .tag? == "TC_Empty" then {
    type: "CONDITION_EMPTY"
  }
  elif .tag? == "T_AndIf" then {
    type: "AND_IF",
    left: .contents[1] | upgrade,
    right: .contents[2] | upgrade
  }
  elif .tag? == "T_Arithmetic" then {
    type: "ARITHMETIC"
  }
  elif .tag? == "T_Array" then {
    type: "ARRAY",
    items: .contents[1] | map(upgrade)
  }
  elif .tag? == "T_IndexedElement" then {
    type: "INDEXED_ELEMENT"
  }
  elif .tag? == "T_UnparsedIndex" then {
    type: "UNPARSED_INDEX"
  }
  elif .tag? == "T_Assignment" then {
    type: "ASSIGN",
    left: .contents[2],
    right: .contents[4] | upgrade,
    indices: .contents[3] | map(upgrade)
  }
  elif .tag? == "T_Backgrounded" then {
    type: "BACKGROUNDED",
    expression: .contents[1] | upgrade
  }
  elif .tag? == "T_Backticked" then {
    type: "BACKTICKED",
    expressions: .contents[1] | map(upgrade)
  }
  elif .tag? == "T_Bang" then {
    type: "BANG"
  }
  elif .tag? == "T_Banged" then {
    type: "BANGED",
    expression: .contents[1] | upgrade
  }
  elif .tag? == "T_BraceExpansion" then {
    type: "BRACE_EXPANSION",
    items: .contents[1]|map(upgrade)
  }
  elif .tag? == "T_BraceGroup" then {
    type: "BRACE_GROUP",
    items: .contents[1]|map(upgrade)
  }
  elif .tag? == "T_CLOBBER" then {
    type: "CLOBBER"
  }
  elif .tag? == "T_Case" then {
    type: "CASE"
  }
  elif .tag? == "T_CaseExpression" then {
    type: "CASE_EXPRESSION",
    target: .contents[1] | upgrade,
    cases: .contents[2] | map( { kind: .[0], labels: .[1] | map(upgrade), expressions: .[2] | map(upgrade) } ) 
  }
  elif .tag? == "T_Condition" then {
    type: "CONDITION", op: .contents[1], expression: .contents[2] | upgrade
  }
  elif .tag? == "T_DGREAT" then {
    type: "DOUBLE_GREATER"
  }
  elif .tag? == "T_DLESS" then {
    type: "DOUBLE_LESS"
  }
  elif .tag? == "T_DLESSDASH" then {
    type: "DLESSDASH"
  }
  elif .tag? == "T_DSEMI" then {
    type: "DSEMI"
  }
  elif .tag? == "T_Do" then {
    type: "DO"
  }
  elif .tag? == "T_DollarArithmetic" then {
    type: "DOLLAR_ARITHMETIC",
    expression: .contents[1] | upgrade
  }
  elif .tag? == "T_DollarBraced" then (
    if .contents[2].tag? == "T_NormalWord" then
      if .contents[2].contents[1][0].tag? == "T_Literal" then
        { type: "VARIABLE", name: .contents[2].contents[1][0].contents[1] }
      else
        . + { type: "UNKNOWN" }
      end
    else
        . + { type: "UNKNOWN" }
    end
  )
  elif .tag? == "T_DollarBracket" then {
    type: "DOLLAR_BRACKET"
  }
  elif .tag? == "T_DollarDoubleQuoted" then {
    type: "DOLLAR_DOUBLE_QUOTED"
  }
  elif .tag? == "T_DollarExpansion" then {
      type: "DOLLAR_PARENS", expressions: .contents[1] | map(upgrade)
  }
  elif .tag? == "T_DollarSingleQuoted" then {
    type: "DOLLAR_SINGLE_QUOTED",
    value: .contents[1]
  }
  elif .tag? == "T_DollarBraceCommandExpansion" then {
    type: "DOLLAR_BRACE_COMMAND_EXPANSION"
  }
  elif .tag? == "T_Done" then {
    type: "DONE"
  }
  elif .tag? == "T_DoubleQuoted" then {
    type: "DOUBLE_QUOTED",
    pieces: .contents[1] | map(upgrade)
  }
  elif .tag? == "T_EOF" then {
    type: "EOF"
  }
  elif .tag? == "T_Elif" then {
    type: "ELSE_IF"
  }
  elif .tag? == "T_Else" then {
    type: "ELSE"
  }
  elif .tag? == "T_Esac" then {
    type: "ESAC"
  }
  elif .tag? == "T_Extglob" then {
    type: "EXT_GLOB"
  }
  elif .tag? == "T_FdRedirect" then {
    type: "FD_REDIRECT", name: .contents[1], value: .contents[2] | upgrade
  }
  elif .tag? == "T_Fi" then {
    type: "FI"
  }
  elif .tag? == "T_For" then {
    type: "FOR"
  }
  elif .tag? == "T_ForArithmetic" then {
    type: "FOR_ARITHMETIC"
  }
  elif .tag? == "T_ForIn" then {
    type: "FOR_IN",
    variable: .contents[1],
    items: .contents[2]|map(upgrade),
    body: .contents[3]|map(upgrade)
  }
  elif .tag? == "T_Function" then {
    type: "FUNCTION"
  }
  elif .tag? == "T_GREATAND" then {
    type: "GREAT_AND"
  }
  elif .tag? == "T_Glob" then {
    type: "GLOB", pattern: .contents[1]
  }
  elif .tag? == "T_Greater" then {
    type: "GREATER"
  }
  elif .tag? == "T_HereDoc" then {
    type: "HERE_DOC"
  }
  elif .tag? == "T_HereString" then {
    type: "HERE_STRING"
  }
  elif .tag? == "T_If" then {
    type: "IF"
  }
  elif .tag? == "T_IfExpression" then (
    if .contents[1]|length == 1 then {
      type: "IF_EXPRESSION",
      condition: .contents[1][0][0] | map(upgrade),
      the_then: .contents[1][0][1] | map(upgrade),
      the_else: .contents[2] | map(upgrade)
    } else {
      type: "IF_ELSE_IF_EXPRESSION",
      checks: .contents[1] | map({ condition: .[0] | map(upgrade), the_then: .[1] | map(upgrade) }),
      the_else: .contents[2] | map(upgrade)
    } end
  )
  elif .tag? == "T_In" then {
    type: "IN"
  }
  elif .tag? == "T_IoFile" then {
    type: "IO_FILE", op: .contents[1] | upgrade, file: .contents[2] | upgrade
  }
  elif .tag? == "T_IoDuplicate" then {
    type: "IO_DUPLICATE", op: .contents[1] | upgrade, num: .contents[2]
  }
  elif .tag? == "T_LESSAND" then {
    type: "LESS_AND"
  }
  elif .tag? == "T_LESSGREAT" then {
    type: "LESS_GREAT"
  }
  elif .tag? == "T_Lbrace" then {
    type: "L_BRACE"
  }
  elif .tag? == "T_Less" then {
    type: "LESS"
  }
  elif .tag? == "T_Literal" then {
    type: "LITERAL",
    value: .contents[1]
  }
  elif .tag? == "T_Lparen" then {
    type: "L_PAREN"
  }
  elif .tag? == "T_NEWLINE" then {
    type: "NEWLINE"
  }
  elif .tag? == "T_NormalWord" then (
    if .contents[1]|length == 1 then
      .contents[1][0] | upgrade
    else
      { type: "CONCAT", parts: .contents[1] | map(upgrade) }
    end
  )
  elif .tag? == "T_OR_IF" then {
    type: "OTHER_OR_IF"
  }
  elif .tag? == "T_OrIf" then {
    type: "OR_IF",
    left: .contents[1] | upgrade,
    right: .contents[2] | upgrade
  }
  elif .tag? == "T_ParamSubSpecialChar" then {
    type: "PARAM_SUB_SPECIAL_CHAR"
  }
  elif .tag? == "T_Pipeline" then (
    if .contents[1] == [] then
      .contents[2][0] | upgrade
    else {
      type: "PIPELINE",
      pipes: .contents[1] | map(upgrade),
      commands: .contents[2] | map(upgrade)
    } end
  )
  elif .tag? == "T_ProcSub" then {
    type: "PROC_SUB",
    op: .contents[1],
    statements: .contents[2] | map(upgrade)
  }
  elif .tag? == "T_Rbrace" then {
    type: "R_BRACE"
  }
  elif .tag? == "T_Redirecting" then (
    if .contents[1] == [] then
      .contents[2] | upgrade
    else {
      type: "REDIRECT",
      redirects: .contents[1] | map(upgrade),
      command: .contents[2] | upgrade
    } end
  )
  elif .tag? == "T_Rparen" then {
    type: "R_PAREN"
  }
  elif .tag? == "T_Script" then {
    type: "SCRIPT", statements: .contents[2] | map(upgrade)
  }
  elif .tag? == "T_Select" then {
    type: "SELECT"
  }
  elif .tag? == "T_SelectIn" then {
    type: "SELECT_IN"
  }
  elif .tag? == "T_Semi" then {
    type: "SEMI"
  }
  elif .tag? == "T_SimpleCommand" then {
    type: "COMMAND",
    prefix: .contents[1] | map(upgrade),
    command: .contents[2][0] | upgrade,
    arguments: .contents[2][1:] | map(upgrade)
  }
  elif .tag? == "T_SingleQuoted" then {
    type: "SINGLE_QUOTED",
    value: .contents[1]
  }
  elif .tag? == "T_Subshell" then {
    type: "SUBSHELL",
    expressions: .contents[1] | map(upgrade)
  }
  elif .tag? == "T_Then" then {
    type: "THEN"
  }
  elif .tag? == "T_Until" then {
    type: "UNTIL"
  }
  elif .tag? == "T_UntilExpression" then {
    type: "UNTIL_EXPRESSION",
    condition: .contents[1] | map(upgrade),
    statements: .contents[2] | map(upgrade)
  }
  elif .tag? == "T_While" then {
    type: "WHILE"
  }
  elif .tag? == "T_WhileExpression" then {
    type: "WHILE_EXPRESSION"
  }
  elif .tag? == "T_Pipe" then {
    type: "PIPE"
  }
  elif .tag? == "T_CoProc" then {
    type: "CO_PROC"
  }
  elif .tag? == "T_CoProcBody" then {
    type: "CO_PROC_BODY"
  }
  elif .tag? == "T_Include" then {
    type: "INCLUDE"
  }
  elif .tag? == "T_SourceCommand" then {
    type: "SOURCE_COMMAND"
  }
  elif .tag? == "T_BatsTest" then {
    type: "BATS_TEST"
  }
  elif .tag? == "T_Annotation" then
    .contents[2] | upgrade
  else
    .
  end
;
# Actually do the upgrade
upgrade