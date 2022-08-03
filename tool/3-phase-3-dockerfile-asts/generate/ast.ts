export type DopsNode =
    AsString
  | BashAndIf
  | BashAndMem
  | BashArray
  | BashAssign
  | BashAssignLhs
  | BashAssignRhs
  | BashBackgrounded
  | BashBackticked
  | BashBanged
  | BashBraceExpansion
  | BashBraceGroup
  | BashCaseExpCase
  | BashCaseExpCases
  | BashCaseExpression
  | BashCaseExpressions
  | BashCaseExpTarget
  | BashCaseKind
  | BashCaseLabels
  | BashCommandArgs
  | BashCommandCommand
  | BashCommandPrefix
  | BashConcat
  | BashCondition
  | BashConditionAnd
  | BashConditionAndLhs
  | BashConditionAndRhs
  | BashConditionBinary
  | BashConditionBinaryLhs
  | BashConditionBinaryOp
  | BashConditionBinaryRhs
  | BashConditionEmpty
  | BashConditionExp
  | BashConditionNullary
  | BashConditionOp
  | BashConditionOr
  | BashConditionOrLhs
  | BashConditionOrRhs
  | BashConditionUnary
  | BashConditionUnaryExp
  | BashConditionUnaryOp
  | BashDollarArithmetic
  | BashDollarParens
  | BashDollarSingleQuoted
  | BashDoubleQuoted
  | BashExtGlob
  | BashForIn
  | BashForInBody
  | BashForInItems
  | BashForInVariable
  | BashFunction
  | BashGlob
  | BashIfCondition
  | BashIfElse
  | BashIfElseIfExpCheck
  | BashIfElseIfExpression
  | BashIfExpression
  | BashIfThen
  | BashIoDupeStderr
  | BashIoDupeStdout
  | BashLiteral
  | BashOp
  | BashOrIf
  | BashOrMem
  | BashPath
  | BashPipeline
  | BashProcSub
  | BashProcSubBody
  | BashProcSubOp
  | BashRedirect
  | BashRedirectAppend
  | BashRedirectCommand
  | BashRedirectOverwrite
  | BashRedirectRedirects
  | BashRedirectStdin
  | BashScript
  | BashSingleQuoted
  | BashSubshell
  | BashUntilBody
  | BashUntilCondition
  | BashUntilExpression
  | BashVariable
  | BashWhileExpression
  | DockerAdd
  | DockerAddSource
  | DockerAddTarget
  | DockerArg
  | DockerCmd
  | DockerCmdArg
  | DockerCopy
  | DockerCopySource
  | DockerCopyTarget
  | DockerEntrypoint
  | DockerEntrypointArg
  | DockerEntrypointExecutable
  | DockerEnv
  | DockerExpose
  | DockerFile
  | DockerFrom
  | DockerImageName
  | DockerImageRepo
  | DockerImageTag
  | DockerLiteral
  | DockerName
  | DockerPath
  | DockerPort
  | DockerRun
  | DockerShell
  | DockerShellArg
  | DockerShellExecutable
  | DockerUser
  | DockerVolume
  | DockerWorkdir
  | MaybeSemanticCommand
  | SemanticCommand
  | Unknown
  | BashArithmeticSequence
  | BashArithmeticExpansion
  | BashArithmeticVariable
  | BashArithmeticBinary
  | BashArithmeticBinaryOp
  | BashArithmeticBinaryLhs
  | BashArithmeticBinaryRhs
  ;

export interface AsString { type: 'AS-STRING'; children: DopsNode[]; value: string; };
export interface BashAndIf { type: 'BASH-AND-IF'; children: DopsNode[]; };
export interface BashAndMem { type: 'BASH-AND-MEM'; children: DopsNode[]; };
export interface BashArray { type: 'BASH-ARRAY'; children: DopsNode[]; };
export interface BashAssign { type: 'BASH-ASSIGN'; children: DopsNode[]; };
export interface BashAssignLhs { type: 'BASH-ASSIGN-LHS'; children: DopsNode[]; };
export interface BashAssignRhs { type: 'BASH-ASSIGN-RHS'; children: DopsNode[]; };
export interface BashBackgrounded { type: 'BASH-BACKGROUNDED'; children: DopsNode[]; };
export interface BashBackticked { type: 'BASH-BACKTICKED'; children: DopsNode[]; };
export interface BashBanged { type: 'BASH-BANGED'; children: DopsNode[]; };
export interface BashBraceExpansion { type: 'BASH-BRACE-EXPANSION'; children: DopsNode[]; };
export interface BashBraceGroup { type: 'BASH-BRACE-GROUP'; children: DopsNode[]; };
export interface BashCaseExpCase { type: 'BASH-CASE-EXP-CASE'; children: DopsNode[]; };
export interface BashCaseExpCases { type: 'BASH-CASE-EXP-CASES'; children: DopsNode[]; };
export interface BashCaseExpression { type: 'BASH-CASE-EXPRESSION'; children: DopsNode[]; };
export interface BashCaseExpressions { type: 'BASH-CASE-EXPRESSIONS'; children: DopsNode[]; };
export interface BashCaseExpTarget { type: 'BASH-CASE-EXP-TARGET'; children: DopsNode[]; };
export interface BashCaseKind { type: 'BASH-CASE-KIND'; children: DopsNode[]; value: string; };
export interface BashCaseLabels { type: 'BASH-CASE-LABELS'; children: DopsNode[]; };
export interface BashCommandArgs { type: 'BASH-COMMAND-ARGS'; children: DopsNode[]; };
export interface BashCommandCommand { type: 'BASH-COMMAND-COMMAND'; children: DopsNode[]; };
export interface BashCommandPrefix { type: 'BASH-COMMAND-PREFIX'; children: DopsNode[]; };
export interface BashConcat { type: 'BASH-CONCAT'; children: DopsNode[]; };
export interface BashCondition { type: 'BASH-CONDITION'; children: DopsNode[]; };
export interface BashConditionAnd { type: 'BASH-CONDITION-AND'; children: DopsNode[]; };
export interface BashConditionAndLhs { type: 'BASH-CONDITION-AND-LHS'; children: DopsNode[]; };
export interface BashConditionAndRhs { type: 'BASH-CONDITION-AND-RHS'; children: DopsNode[]; };
export interface BashConditionBinary { type: 'BASH-CONDITION-BINARY'; children: DopsNode[]; };
export interface BashConditionBinaryLhs { type: 'BASH-CONDITION-BINARY-LHS'; children: DopsNode[]; };
export interface BashConditionBinaryOp { type: 'BASH-CONDITION-BINARY-OP'; children: DopsNode[]; };
export interface BashConditionBinaryRhs { type: 'BASH-CONDITION-BINARY-RHS'; children: DopsNode[]; };
export interface BashConditionEmpty { type: 'BASH-CONDITION-EMPTY'; children: DopsNode[]; };
export interface BashConditionExp { type: 'BASH-CONDITION-EXP'; children: DopsNode[]; };
export interface BashConditionNullary { type: 'BASH-CONDITION-NULLARY'; children: DopsNode[]; };
export interface BashConditionOp { type: 'BASH-CONDITION-OP'; children: DopsNode[]; };
export interface BashConditionOr { type: 'BASH-CONDITION-OR'; children: DopsNode[]; };
export interface BashConditionOrLhs { type: 'BASH-CONDITION-OR-LHS'; children: DopsNode[]; };
export interface BashConditionOrRhs { type: 'BASH-CONDITION-OR-RHS'; children: DopsNode[]; };
export interface BashConditionUnary { type: 'BASH-CONDITION-UNARY'; children: DopsNode[]; };
export interface BashConditionUnaryExp { type: 'BASH-CONDITION-UNARY-EXP'; children: DopsNode[]; };
export interface BashConditionUnaryOp { type: 'BASH-CONDITION-UNARY-OP'; children: DopsNode[]; };
export interface BashDollarArithmetic { type: 'BASH-DOLLAR-ARITHMETIC'; children: DopsNode[]; };
export interface BashDollarParens { type: 'BASH-DOLLAR-PARENS'; children: DopsNode[]; };
export interface BashDollarSingleQuoted { type: 'BASH-DOLLAR-SINGLE-QUOTED'; children: DopsNode[]; value: string; }
export interface BashDoubleQuoted { type: 'BASH-DOUBLE-QUOTED'; children: DopsNode[]; };
export interface BashExtGlob { type: 'BASH-EXT-GLOB'; children: DopsNode[]; value: string; };
export interface BashForIn { type: 'BASH-FOR-IN'; children: DopsNode[]; };
export interface BashForInBody { type: 'BASH-FOR-IN-BODY'; children: DopsNode[]; };
export interface BashForInItems { type: 'BASH-FOR-IN-ITEMS'; children: DopsNode[]; };
export interface BashForInVariable { type: 'BASH-FOR-IN-VARIABLE'; children: DopsNode[]; value: string; };
export interface BashFunction { type: 'BASH-FUNCTION'; children: DopsNode[]; };
export interface BashGlob { type: 'BASH-GLOB'; children: DopsNode[]; value: string; };
export interface BashIfCondition { type: 'BASH-IF-CONDITION'; children: DopsNode[]; };
export interface BashIfElse { type: 'BASH-IF-ELSE'; children: DopsNode[]; };
export interface BashIfElseIfExpCheck { type: 'BASH-IF-ELSE-IF-EXP-CHECK'; children: DopsNode[]; };
export interface BashIfElseIfExpression { type: 'BASH-IF-ELSE-IF-EXPRESSION'; children: DopsNode[]; };
export interface BashIfExpression { type: 'BASH-IF-EXPRESSION'; children: DopsNode[]; };
export interface BashIfThen { type: 'BASH-IF-THEN'; children: DopsNode[]; };
export interface BashIoDupeStderr { type: 'BASH-IO-DUPE-STDERR'; children: DopsNode[]; };
export interface BashIoDupeStdout { type: 'BASH-IO-DUPE-STDOUT'; children: DopsNode[]; };
export interface BashLiteral { type: 'BASH-LITERAL'; children: DopsNode[]; value: string; };
export interface BashOp { type: 'BASH-OP'; children: DopsNode[]; value: string; }
export interface BashOrIf { type: 'BASH-OR-IF'; children: DopsNode[]; };
export interface BashOrMem { type: 'BASH-OR-MEM'; children: DopsNode[]; };
export interface BashPath { type: 'BASH-PATH'; children: DopsNode[]; };
export interface BashPipeline { type: 'BASH-PIPELINE'; children: DopsNode[]; };
export interface BashProcSub { type: 'BASH-PROC-SUB'; children: DopsNode[]; };
export interface BashProcSubBody { type: 'BASH-PROC-SUB-BODY'; children: DopsNode[]; };
export interface BashProcSubOp { type: 'BASH-PROC-SUB-OP'; children: DopsNode[]; value: string; };
export interface BashRedirect { type: 'BASH-REDIRECT'; children: DopsNode[]; };
export interface BashRedirectAppend { type: 'BASH-REDIRECT-APPEND'; children: DopsNode[]; };
export interface BashRedirectCommand { type: 'BASH-REDIRECT-COMMAND'; children: DopsNode[]; };
export interface BashRedirectOverwrite { type: 'BASH-REDIRECT-OVERWRITE'; children: DopsNode[]; };
export interface BashRedirectRedirects { type: 'BASH-REDIRECT-REDIRECTS'; children: DopsNode[]; };
export interface BashRedirectStdin { type: 'BASH-REDIRECT-STDIN'; children: DopsNode[]; };
export interface BashScript { type: 'BASH-SCRIPT'; children: DopsNode[]; };
export interface BashSingleQuoted { type: 'BASH-SINGLE-QUOTED'; children: DopsNode[]; value: string; };
export interface BashSubshell { type: 'BASH-SUBSHELL'; children: DopsNode[]; };
export interface BashUntilBody { type: 'BASH-UNTIL-BODY'; children: DopsNode[]; };
export interface BashUntilCondition { type: 'BASH-UNTIL-CONDITION'; children: DopsNode[]; };
export interface BashUntilExpression { type: 'BASH-UNTIL-EXPRESSION'; children: DopsNode[]; };
export interface BashVariable { type: 'BASH-VARIABLE'; children: DopsNode[]; value: string; };
export interface BashWhileExpression { type: 'BASH-WHILE-EXPRESSION'; children: DopsNode[]; };
export interface DockerAdd { type: 'DOCKER-ADD'; children: DopsNode[]; };
export interface DockerAddSource { type: 'DOCKER-ADD-SOURCE'; children: DopsNode[]; };
export interface DockerAddTarget { type: 'DOCKER-ADD-TARGET'; children: DopsNode[]; };
export interface DockerArg { type: 'DOCKER-ARG'; children: DopsNode[]; };
export interface DockerCmd { type: 'DOCKER-CMD'; children: DopsNode[]; };
export interface DockerCmdArg { type: 'DOCKER-CMD-ARG'; children: DopsNode[]; };
export interface DockerCopy { type: 'DOCKER-COPY'; children: DopsNode[]; };
export interface DockerCopySource { type: 'DOCKER-COPY-SOURCE'; children: DopsNode[]; };
export interface DockerCopyTarget { type: 'DOCKER-COPY-TARGET'; children: DopsNode[]; };
export interface DockerEntrypoint { type: 'DOCKER-ENTRYPOINT'; children: DopsNode[]; };
export interface DockerEntrypointArg { type: 'DOCKER-ENTRYPOINT-ARG'; children: DopsNode[]; };
export interface DockerEntrypointExecutable { type: 'DOCKER-ENTRYPOINT-EXECUTABLE'; children: DopsNode[]; };
export interface DockerEnv { type: 'DOCKER-ENV'; children: DopsNode[]; };
export interface DockerExpose { type: 'DOCKER-EXPOSE'; children: DopsNode[]; };
export interface DockerFile { type: 'DOCKER-FILE'; children: DopsNode[]; };
export interface DockerFrom { type: 'DOCKER-FROM'; children: DopsNode[]; };
export interface DockerImageName { type: 'DOCKER-IMAGE-NAME'; children: DopsNode[]; };
export interface DockerImageRepo { type: 'DOCKER-IMAGE-REPO'; children: DopsNode[]; };
export interface DockerImageTag { type: 'DOCKER-IMAGE-TAG'; children: DopsNode[]; };
export interface DockerLiteral { type: 'DOCKER-LITERAL'; children: DopsNode[]; };
export interface DockerName { type: 'DOCKER-NAME'; children: DopsNode[]; };
export interface DockerPath { type: 'DOCKER-PATH'; children: DopsNode[]; };
export interface DockerPort { type: 'DOCKER-PORT'; children: DopsNode[]; };
export interface DockerRun { type: 'DOCKER-RUN'; children: DopsNode[]; };
export interface DockerShell { type: 'DOCKER-SHELL'; children: DopsNode[]; };
export interface DockerShellArg { type: 'DOCKER-SHELL-ARG'; children: DopsNode[]; };
export interface DockerShellExecutable { type: 'DOCKER-SHELL-EXECUTABLE'; children: DopsNode[]; };
export interface DockerUser { type: 'DOCKER-USER'; children: DopsNode[]; };
export interface DockerVolume { type: 'DOCKER-VOLUME'; children: DopsNode[]; };
export interface DockerWorkdir { type: 'DOCKER-WORKDIR'; children: DopsNode[]; };
export interface MaybeSemanticCommand { type: 'MAYBE-SEMANTIC-COMMAND'; children: DopsNode[]; };
export interface SemanticCommand { type: 'SEMANTIC-COMMAND'; children: DopsNode[]; };
export interface Unknown { type: 'UNKNOWN'; children: DopsNode[]; };
export interface BashArithmeticSequence { type: 'BASH-ARITHMETIC-SEQUENCE'; children: DopsNode[]; }
export interface BashArithmeticExpansion { type: 'BASH-ARITHMETIC-EXPANSION'; children: DopsNode[]; }
export interface BashArithmeticVariable { type: 'BASH-ARITHMETIC-VARIABLE'; children: DopsNode[]; }
export interface BashArithmeticBinary { type: 'BASH-ARITHMETIC-BINARY'; children: DopsNode[]; }
export interface BashArithmeticBinaryOp { type: 'BASH-ARITHMETIC-BINARY-OP'; children: DopsNode[]; }
export interface BashArithmeticBinaryLhs { type: 'BASH-ARITHMETIC-BINARY-LHS'; children: DopsNode[]; }
export interface BashArithmeticBinaryRhs { type: 'BASH-ARITHMETIC-BINARY-RHS'; children: DopsNode[]; }

// Allow for more complex tree updates
export interface EditDeleteSelf {
  type: 'EDIT-DELETE-SELF';
}
export interface EditDeleteParent {
  type: 'EDIT-DELETE-PARENT';
  at_level: number;
}
export interface EditReplaceSelf<X> {
  type: 'EDIT-REPLACE-SELF';
  payload: X;
}
export interface EditReplaceParent<X> { 
  type: 'EDIT-REPLACE-PARENT';
  payload: X;
  at_level: number;
}
export type Edit<X> = 
    EditDeleteSelf
  | EditDeleteParent
  | EditReplaceSelf<X>
  | EditReplaceParent<X>
;

// ----------------------------------------------------------------------------

interface ITransformerPass {

  _walkGeneric(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;

  _walkAsString(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashAndIf(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashAndMem(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashArray(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashAssign(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashAssignLhs(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashAssignRhs(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashBackgrounded(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashBackticked(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashBanged(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashBraceExpansion(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashBraceGroup(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashCaseExpCase(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashCaseExpCases(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashCaseExpression(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashCaseExpressions(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashCaseExpTarget(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashCaseKind(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashCaseLabels(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashCommandArgs(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashCommandCommand(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashCommandPrefix(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashConcat(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashCondition(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashConditionAnd(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashConditionAndLhs(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashConditionAndRhs(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashConditionBinary(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashConditionBinaryLhs(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashConditionBinaryOp(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashConditionBinaryRhs(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashConditionEmpty(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashConditionExp(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashConditionNullary(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashConditionOp(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashConditionOr(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashConditionOrLhs(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashConditionOrRhs(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashConditionUnary(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashConditionUnaryExp(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashConditionUnaryOp(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashDollarArithmetic(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashDollarParens(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashDollarSingleQuoted(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashDoubleQuoted(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashForIn(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashForInBody(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashForInItems(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashForInVariable(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashFunction(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashGlob(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashIfCondition(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashIfElse(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashIfElseIfExpCheck(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashIfElseIfExpression(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashIfExpression(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashIfThen(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashIoDupeStderr(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashIoDupeStdout(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashLiteral(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashOp(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashOrIf(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashOrMem(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashPath(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashPipeline(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashProcSub(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashProcSubBody(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashProcSubOp(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashRedirect(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashRedirectAppend(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashRedirectCommand(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashRedirectOverwrite(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashRedirectRedirects(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashRedirectStdin(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashScript(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashSingleQuoted(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashSubshell(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashUntilBody(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashUntilCondition(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashUntilExpression(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashVariable(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashWhileExpression(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkDockerAdd(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkDockerAddSource(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkDockerAddTarget(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkDockerArg(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkDockerCmd(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkDockerCmdArg(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkDockerCopy(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkDockerCopySource(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkDockerCopyTarget(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkDockerEntrypoint(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkDockerEntrypointArg(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkDockerEntrypointExecutable(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkDockerEnv(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkDockerExpose(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkDockerFile(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkDockerFrom(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkDockerImageName(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkDockerImageRepo(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkDockerImageTag(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkDockerLiteral(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkDockerName(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkDockerPath(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkDockerPort(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkDockerRun(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkDockerShell(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkDockerShellArg(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkDockerShellExecutable(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkDockerUser(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkDockerVolume(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkDockerWorkdir(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkMaybeSemanticCommand(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkSemanticCommand(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkUnknown(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashArithmeticSequence(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashArithmeticExpansion(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashArithmeticVariable(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashArithmeticBianry(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashArithmeticBinaryOp(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashArithmeticBianryLhs(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  _walkBashArithmeticBianryRhs(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
};

// ----------------------------------------------------------------------------

abstract class BaseTransformerPass implements ITransformerPass {

  abstract walkGeneric(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;

  abstract walkAsString(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashAndIf(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashAndMem(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashAssign(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashAssignLhs(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashAssignRhs(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashBackgrounded(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashBackticked(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashBanged(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashBraceExpansion(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashBraceGroup(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashCaseExpCase(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashCaseExpCases(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashCaseExpression(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashCaseExpressions(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashCaseExpTarget(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashCaseKind(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashCaseLabels(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashCommandArgs(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashCommandCommand(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashCommandPrefix(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashConcat(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashCondition(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashConditionExp(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashConditionOp(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashConditionUnary(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashConditionUnaryExp(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashConditionUnaryOp(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashDollarArithmetic(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashDollarParens(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashDoubleQuoted(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashForIn(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashForInBody(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashForInItems(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashForInVariable(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashGlob(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashIfCondition(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashIfElse(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashIfElseIfExpCheck(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashIfElseIfExpression(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashIfExpression(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashIfThen(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashIoDupeStderr(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashIoDupeStdout(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashLiteral(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashOrIf(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashOrMem(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashPath(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashPipeline(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashRedirect(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashRedirectAppend(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashRedirectCommand(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashRedirectOverwrite(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashRedirectRedirects(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashRedirectStdin(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashScript(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashSingleQuoted(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashSubshell(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkDockerAdd(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkDockerAddSource(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkDockerAddTarget(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkDockerArg(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkDockerCmd(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkDockerCmdArg(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkDockerCopy(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkDockerCopySource(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkDockerCopyTarget(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkDockerEntrypoint(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkDockerEntrypointArg(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkDockerEntrypointExecutable(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkDockerEnv(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkDockerExpose(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkDockerFile(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkDockerFrom(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkDockerImageName(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkDockerImageRepo(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkDockerImageTag(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkDockerLiteral(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkDockerName(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkDockerPath(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkDockerPort(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkDockerRun(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkDockerShell(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkDockerShellArg(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkDockerShellExecutable(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkDockerUser(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkDockerVolume(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkDockerWorkdir(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkMaybeSemanticCommand(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkSemanticCommand(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashArray(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashConditionAnd(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashConditionAndLhs(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashConditionAndRhs(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashConditionBinary(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashConditionBinaryLhs(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashConditionBinaryOp(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashConditionBinaryRhs(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashConditionEmpty(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashConditionNullary(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashConditionOr(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashConditionOrLhs(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashConditionOrRhs(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashDollarSingleQuoted(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashFunction(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashOp(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashProcSub(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashProcSubBody(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashProcSubOp(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashUntilBody(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashUntilCondition(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashUntilExpression(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashVariable(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashWhileExpression(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkUnknown(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashArithmeticSequence(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashArithmeticExpansion(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashArithmeticVariable(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashArithmeticBianry(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashArithmeticBinaryOp(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashArithmeticBianryLhs(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;
  abstract walkBashArithmeticBianryRhs(parents: DopsNode[], current: DopsNode): Edit<DopsNode>;

  _walk(parents: DopsNode[]): (current: DopsNode) => Edit<DopsNode> {
    return (current: DopsNode) => {
      // console.log(current.type);
      // console.log(current.children);
      const new_parents = parents.concat([ current ]);
      switch (current.type) {
        case 'AS-STRING': return this._walkAsString(new_parents, current);
        case 'BASH-AND-IF': return this._walkBashAndIf(new_parents, current);
        case 'BASH-AND-MEM': return this._walkBashAndMem(new_parents, current);
        case 'BASH-ASSIGN': return this._walkBashAssign(new_parents, current);
        case 'BASH-ASSIGN-LHS': return this._walkBashAssignLhs(new_parents, current);
        case 'BASH-ASSIGN-RHS': return this._walkBashAssignRhs(new_parents, current);
        case 'BASH-BACKGROUNDED': return this._walkBashBackgrounded(new_parents, current);
        case 'BASH-BACKTICKED': return this._walkBashBackticked(new_parents, current);
        case 'BASH-BANGED': return this._walkBashBanged(new_parents, current);
        case 'BASH-BRACE-EXPANSION': return this._walkBashBraceExpansion(new_parents, current);
        case 'BASH-BRACE-GROUP': return this._walkBashBraceGroup(new_parents, current);
        case 'BASH-CASE-EXP-CASE': return this._walkBashCaseExpCase(new_parents, current);
        case 'BASH-CASE-EXP-CASES': return this._walkBashCaseExpCases(new_parents, current);
        case 'BASH-CASE-EXPRESSION': return this._walkBashCaseExpression(new_parents, current);
        case 'BASH-CASE-EXPRESSIONS': return this._walkBashCaseExpressions(new_parents, current);
        case 'BASH-CASE-EXP-TARGET': return this._walkBashCaseExpTarget(new_parents, current);
        case 'BASH-CASE-KIND': return this._walkBashCaseKind(new_parents, current);
        case 'BASH-CASE-LABELS': return this._walkBashCaseLabels(new_parents, current);
        case 'BASH-COMMAND-ARGS': return this._walkBashCommandArgs(new_parents, current);
        case 'BASH-COMMAND-COMMAND': return this._walkBashCommandCommand(new_parents, current);
        case 'BASH-COMMAND-PREFIX': return this._walkBashCommandPrefix(new_parents, current);
        case 'BASH-CONCAT': return this._walkBashConcat(new_parents, current);
        case 'BASH-CONDITION': return this._walkBashCondition(new_parents, current);
        case 'BASH-CONDITION-EXP': return this._walkBashConditionExp(new_parents, current);
        case 'BASH-CONDITION-OP': return this._walkBashConditionOp(new_parents, current);
        case 'BASH-CONDITION-UNARY': return this._walkBashConditionUnary(new_parents, current);
        case 'BASH-CONDITION-UNARY-EXP': return this._walkBashConditionUnaryExp(new_parents, current);
        case 'BASH-CONDITION-UNARY-OP': return this._walkBashConditionUnaryOp(new_parents, current);
        case 'BASH-DOLLAR-ARITHMETIC': return this._walkBashDollarArithmetic(new_parents, current);
        case 'BASH-DOLLAR-PARENS': return this._walkBashDollarParens(new_parents, current);
        case 'BASH-DOUBLE-QUOTED': return this._walkBashDoubleQuoted(new_parents, current);
        case 'BASH-FOR-IN': return this._walkBashForIn(new_parents, current);
        case 'BASH-FOR-IN-BODY': return this._walkBashForInBody(new_parents, current);
        case 'BASH-FOR-IN-ITEMS': return this._walkBashForInItems(new_parents, current);
        case 'BASH-FOR-IN-VARIABLE': return this._walkBashForInVariable(new_parents, current);
        case 'BASH-GLOB': return this._walkBashGlob(new_parents, current);
        case 'BASH-IF-CONDITION': return this._walkBashIfCondition(new_parents, current);
        case 'BASH-IF-ELSE': return this._walkBashIfElse(new_parents, current);
        case 'BASH-IF-ELSE-IF-EXP-CHECK': return this._walkBashIfElseIfExpCheck(new_parents, current);
        case 'BASH-IF-ELSE-IF-EXPRESSION': return this._walkBashIfElseIfExpression(new_parents, current);
        case 'BASH-IF-EXPRESSION': return this._walkBashIfExpression(new_parents, current);
        case 'BASH-IF-THEN': return this._walkBashIfThen(new_parents, current);
        case 'BASH-IO-DUPE-STDERR': return this._walkBashIoDupeStderr(new_parents, current);
        case 'BASH-IO-DUPE-STDOUT': return this._walkBashIoDupeStdout(new_parents, current);
        case 'BASH-LITERAL': return this._walkBashLiteral(new_parents, current);
        case 'BASH-OR-IF': return this._walkBashOrIf(new_parents, current);
        case 'BASH-OR-MEM': return this._walkBashOrMem(new_parents, current);
        case 'BASH-PATH': return this._walkBashPath(new_parents, current);
        case 'BASH-PIPELINE': return this._walkBashPipeline(new_parents, current);
        case 'BASH-REDIRECT': return this._walkBashRedirect(new_parents, current);
        case 'BASH-REDIRECT-APPEND': return this._walkBashRedirectAppend(new_parents, current);
        case 'BASH-REDIRECT-COMMAND': return this._walkBashRedirectCommand(new_parents, current);
        case 'BASH-REDIRECT-OVERWRITE': return this._walkBashRedirectOverwrite(new_parents, current);
        case 'BASH-REDIRECT-REDIRECTS': return this._walkBashRedirectRedirects(new_parents, current);
        case 'BASH-REDIRECT-STDIN': return this._walkBashRedirectStdin(new_parents, current);
        case 'BASH-SCRIPT': return this._walkBashScript(new_parents, current);
        case 'BASH-SINGLE-QUOTED': return this._walkBashSingleQuoted(new_parents, current);
        case 'BASH-SUBSHELL': return this._walkBashSubshell(new_parents, current);
        case 'DOCKER-ADD': return this._walkDockerAdd(new_parents, current);
        case 'DOCKER-ADD-SOURCE': return this._walkDockerAddSource(new_parents, current);
        case 'DOCKER-ADD-TARGET': return this._walkDockerAddTarget(new_parents, current);
        case 'DOCKER-ARG': return this._walkDockerArg(new_parents, current);
        case 'DOCKER-CMD': return this._walkDockerCmd(new_parents, current);
        case 'DOCKER-CMD-ARG': return this._walkDockerCmdArg(new_parents, current);
        case 'DOCKER-COPY': return this._walkDockerCopy(new_parents, current);
        case 'DOCKER-COPY-SOURCE': return this._walkDockerCopySource(new_parents, current);
        case 'DOCKER-COPY-TARGET': return this._walkDockerCopyTarget(new_parents, current);
        case 'DOCKER-ENTRYPOINT': return this._walkDockerEntrypoint(new_parents, current);
        case 'DOCKER-ENTRYPOINT-ARG': return this._walkDockerEntrypointArg(new_parents, current);
        case 'DOCKER-ENTRYPOINT-EXECUTABLE': return this._walkDockerEntrypointExecutable(new_parents, current);
        case 'DOCKER-ENV': return this._walkDockerEnv(new_parents, current);
        case 'DOCKER-EXPOSE': return this._walkDockerExpose(new_parents, current);
        case 'DOCKER-FILE': return this._walkDockerFile(new_parents, current);
        case 'DOCKER-FROM': return this._walkDockerFrom(new_parents, current);
        case 'DOCKER-IMAGE-NAME': return this._walkDockerImageName(new_parents, current);
        case 'DOCKER-IMAGE-REPO': return this._walkDockerImageRepo(new_parents, current);
        case 'DOCKER-IMAGE-TAG': return this._walkDockerImageTag(new_parents, current);
        case 'DOCKER-LITERAL': return this._walkDockerLiteral(new_parents, current);
        case 'DOCKER-NAME': return this._walkDockerName(new_parents, current);
        case 'DOCKER-PATH': return this._walkDockerPath(new_parents, current);
        case 'DOCKER-PORT': return this._walkDockerPort(new_parents, current);
        case 'DOCKER-RUN': return this._walkDockerRun(new_parents, current);
        case 'DOCKER-SHELL': return this._walkDockerShell(new_parents, current);
        case 'DOCKER-SHELL-ARG': return this._walkDockerShellArg(new_parents, current);
        case 'DOCKER-SHELL-EXECUTABLE': return this._walkDockerShellExecutable(new_parents, current);
        case 'DOCKER-USER': return this._walkDockerUser(new_parents, current);
        case 'DOCKER-VOLUME': return this._walkDockerVolume(new_parents, current);
        case 'DOCKER-WORKDIR': return this._walkDockerWorkdir(new_parents, current);
        case 'MAYBE-SEMANTIC-COMMAND': return this._walkMaybeSemanticCommand(new_parents, current);
        case 'SEMANTIC-COMMAND': return this._walkSemanticCommand(new_parents, current);
        case 'BASH-ARRAY': return this._walkBashArray(new_parents, current);
        case 'BASH-CONDITION-AND': return this._walkBashConditionAnd(new_parents, current);
        case 'BASH-CONDITION-AND-LHS': return this._walkBashConditionAndLhs(new_parents, current);
        case 'BASH-CONDITION-AND-RHS': return this._walkBashConditionAndRhs(new_parents, current);
        case 'BASH-CONDITION-BINARY': return this._walkBashConditionBinary(new_parents, current);
        case 'BASH-CONDITION-BINARY-LHS': return this._walkBashConditionBinaryLhs(new_parents, current);
        case 'BASH-CONDITION-BINARY-OP': return this._walkBashConditionBinaryOp(new_parents, current);
        case 'BASH-CONDITION-BINARY-RHS': return this._walkBashConditionBinaryRhs(new_parents, current);
        case 'BASH-CONDITION-EMPTY': return this._walkBashConditionEmpty(new_parents, current);
        case 'BASH-CONDITION-NULLARY': return this._walkBashConditionNullary(new_parents, current);
        case 'BASH-CONDITION-OR': return this._walkBashConditionOr(new_parents, current);
        case 'BASH-CONDITION-OR-LHS': return this._walkBashConditionOrLhs(new_parents, current);
        case 'BASH-CONDITION-OR-RHS': return this._walkBashConditionOrRhs(new_parents, current);
        case 'BASH-DOLLAR-SINGLE-QUOTED': return this._walkBashDollarSingleQuoted(new_parents, current);
        case 'BASH-FUNCTION': return this._walkBashFunction(new_parents, current);
        case 'BASH-OP': return this._walkBashOp(new_parents, current);
        case 'BASH-PROC-SUB': return this._walkBashProcSub(new_parents, current);
        case 'BASH-PROC-SUB-BODY': return this._walkBashProcSubBody(new_parents, current);
        case 'BASH-PROC-SUB-OP': return this._walkBashProcSubOp(new_parents, current);
        case 'BASH-UNTIL-BODY': return this._walkBashUntilBody(new_parents, current);
        case 'BASH-UNTIL-CONDITION': return this._walkBashUntilCondition(new_parents, current);
        case 'BASH-UNTIL-EXPRESSION': return this._walkBashUntilExpression(new_parents, current);
        case 'BASH-VARIABLE': return this._walkBashVariable(new_parents, current);
        case 'BASH-WHILE-EXPRESSION': return this._walkBashWhileExpression(new_parents, current);
        case 'UNKNOWN': return this._walkUnknown(new_parents, current);
        case 'BASH-ARITHMETIC-SEQUENCE': return this._walkBashArithmeticSequence(new_parents, current);
        case 'BASH-ARITHMETIC-EXPANSION':return this._walkBashArithmeticExpansion(new_parents, current);
        case 'BASH-ARITHMETIC-VARIABLE': return this._walkBashArithmeticVariable(new_parents, current);
        case 'BASH-ARITHMETIC-BINARY': return this._walkBashArithmeticBianry(new_parents, current);
        case 'BASH-ARITHMETIC-BINARY-OP': return this._walkBashArithmeticBinaryOp(new_parents, current);
        case 'BASH-ARITHMETIC-BINARY-LHS': return this._walkBashArithmeticBianryLhs(new_parents, current);
        case 'BASH-ARITHMETIC-BINARY-RHS': return this._walkBashArithmeticBianryRhs(new_parents, current);
        default: {
          return this._walkGeneric(new_parents, current);
        }
      }
    };
  }

  _processEdits(
    current: DopsNode, parents: DopsNode[], edits: Edit<DopsNode>[],
    process: (parents: DopsNode[], current: DopsNode) => Edit<DopsNode>
  ): Edit<DopsNode> {
    // First lets check for a delete parent (could really error if there are two?)
    const indexOfDel = edits.findIndex(x => x.type == 'EDIT-DELETE-PARENT');
    if (indexOfDel !== -1) {
      if ((edits[indexOfDel] as EditDeleteParent).at_level === 1) {
        return {
          type: 'EDIT-DELETE-SELF'
        };
      } else {
        return {
          type: 'EDIT-DELETE-PARENT',
          at_level: (edits[indexOfDel] as EditDeleteParent).at_level - 1
        };
      }
    }

    // Next lets check for a replace parent
    const indexOfRep = edits.findIndex(x => x.type == 'EDIT-REPLACE-PARENT');
    if (indexOfRep !== -1) {
      if ((edits[indexOfRep] as EditReplaceParent<DopsNode>).at_level === 1) {
        return {
          type: 'EDIT-REPLACE-SELF',
          payload: (edits[indexOfRep] as EditReplaceParent<DopsNode>).payload
        };
      } else {
        return {
          type: 'EDIT-REPLACE-PARENT',
          at_level: (edits[indexOfRep] as EditReplaceParent<DopsNode>).at_level - 1,
          payload: (edits[indexOfRep] as EditReplaceParent<DopsNode>).payload
        };
      }
    }

    // Now return process on our new current node where the children have
    // been updated (by taking them from edits to concrete DopsNode's)
    return process(
      parents,
      Object.assign(
        (current as any).value ? { value: (current as any).value } : {},
        {
          type: current.type,
          children: edits.map(
            x => x.type != 'EDIT-REPLACE-SELF' ? null : x.payload
          ).filter(x => x !== null)
        }
      ) as DopsNode
    );
  }

  _walkGeneric(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkGeneric
    );
  }

  _walkAsString(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkAsString
    );
  }
  _walkBashAndIf(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashAndIf
    );
  }
  _walkBashAndMem(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashAndMem
    );
  }
  _walkBashAssign(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashAssign
    );
  }
  _walkBashAssignLhs(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashAssignLhs
    );
  }
  _walkBashAssignRhs(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashAssignRhs
    );
  }
  _walkBashBackgrounded(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashBackgrounded
    );
  }
  _walkBashBackticked(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashBackticked
    );
  }
  _walkBashBanged(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashBanged
    );
  }
  _walkBashBraceExpansion(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashBraceExpansion
    );
  }
  _walkBashBraceGroup(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashBraceGroup
    );
  }
  _walkBashCaseExpCase(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashCaseExpCase
    );
  }
  _walkBashCaseExpCases(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashCaseExpCases
    );
  }
  _walkBashCaseExpression(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashCaseExpression
    );
  }
  _walkBashCaseExpressions(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashCaseExpressions
    );
  }
  _walkBashCaseExpTarget(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashCaseExpTarget
    );
  }
  _walkBashCaseKind(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashCaseKind
    );
  }
  _walkBashCaseLabels(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashCaseLabels
    );
  }
  _walkBashCommandArgs(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashCommandArgs
    );
  }
  _walkBashCommandCommand(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashCommandCommand
    );
  }
  _walkBashCommandPrefix(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashCommandPrefix
    );
  }
  _walkBashConcat(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashConcat
    );
  }
  _walkBashCondition(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashCondition
    );
  }
  _walkBashConditionExp(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashConditionExp
    );
  }
  _walkBashConditionOp(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashConditionOp
    );
  }
  _walkBashConditionUnary(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashConditionUnary
    );
  }
  _walkBashConditionUnaryExp(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashConditionUnaryExp
    );
  }
  _walkBashConditionUnaryOp(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashConditionUnaryOp
    );
  }
  _walkBashDollarArithmetic(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashDollarArithmetic
    );
  }
  _walkBashDollarParens(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashDollarParens
    );
  }
  _walkBashDoubleQuoted(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashDoubleQuoted
    );
  }
  _walkBashForIn(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashForIn
    );
  }
  _walkBashForInBody(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashForInBody
    );
  }
  _walkBashForInItems(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashForInItems
    );
  }
  _walkBashForInVariable(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashForInVariable
    );
  }
  _walkBashGlob(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashGlob
    );
  }
  _walkBashIfCondition(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashIfCondition
    );
  }
  _walkBashIfElse(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashIfElse
    );
  }
  _walkBashIfElseIfExpCheck(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashIfElseIfExpCheck
    );
  }
  _walkBashIfElseIfExpression(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashIfElseIfExpression
    );
  }
  _walkBashIfExpression(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashIfExpression
    );
  }
  _walkBashIfThen(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashIfThen
    );
  }
  _walkBashIoDupeStderr(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashIoDupeStderr
    );
  }
  _walkBashIoDupeStdout(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashIoDupeStdout
    );
  }
  _walkBashLiteral(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashLiteral
    );
  }
  _walkBashOrIf(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashOrIf
    );
  }
  _walkBashOrMem(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashOrMem
    );
  }
  _walkBashPath(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashPath
    );
  }
  _walkBashPipeline(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashPipeline
    );
  }
  _walkBashRedirect(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashRedirect
    );
  }
  _walkBashRedirectAppend(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashRedirectAppend
    );
  }
  _walkBashRedirectCommand(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashRedirectCommand
    );
  }
  _walkBashRedirectOverwrite(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashRedirectOverwrite
    );
  }
  _walkBashRedirectRedirects(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashRedirectRedirects
    );
  }
  _walkBashRedirectStdin(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashRedirectStdin
    );
  }
  _walkBashScript(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashScript
    );
  }
  _walkBashSingleQuoted(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashSingleQuoted
    );
  }
  _walkBashSubshell(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashSubshell
    );
  }
  _walkDockerAdd(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkDockerAdd
    );
  }
  _walkDockerAddSource(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkDockerAddSource
    );
  }
  _walkDockerAddTarget(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkDockerAddTarget
    );
  }
  _walkDockerArg(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkDockerArg
    );
  }
  _walkDockerCmd(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkDockerCmd
    );
  }
  _walkDockerCmdArg(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkDockerCmdArg
    );
  }
  _walkDockerCopy(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkDockerCopy
    );
  }
  _walkDockerCopySource(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkDockerCopySource
    );
  }
  _walkDockerCopyTarget(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkDockerCopyTarget
    );
  }
  _walkDockerEntrypoint(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkDockerEntrypoint
    );
  }
  _walkDockerEntrypointArg(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkDockerEntrypointArg
    );
  }
  _walkDockerEntrypointExecutable(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkDockerEntrypointExecutable
    );
  }
  _walkDockerEnv(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkDockerEnv
    );
  }
  _walkDockerExpose(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkDockerExpose
    );
  }
  _walkDockerFile(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkDockerFile
    );
  }
  _walkDockerFrom(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkDockerFrom
    );
  }
  _walkDockerImageName(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkDockerImageName
    );
  }
  _walkDockerImageRepo(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkDockerImageRepo
    );
  }
  _walkDockerImageTag(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkDockerImageTag
    );
  }
  _walkDockerLiteral(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkDockerLiteral
    );
  }
  _walkDockerName(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkDockerName
    );
  }
  _walkDockerPath(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkDockerPath
    );
  }
  _walkDockerPort(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkDockerPort
    );
  }
  _walkDockerRun(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkDockerRun
    );
  }
  _walkDockerShell(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkDockerShell
    );
  }
  _walkDockerShellArg(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkDockerShellArg
    );
  }
  _walkDockerShellExecutable(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkDockerShellExecutable
    );
  }
  _walkDockerUser(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkDockerUser
    );
  }
  _walkDockerVolume(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkDockerVolume
    );
  }
  _walkDockerWorkdir(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkDockerWorkdir
    );
  }
  _walkMaybeSemanticCommand(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkMaybeSemanticCommand
    );
  }
  _walkSemanticCommand(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkSemanticCommand
    );
  }
  _walkBashArray(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashArray
    );
  }
  _walkBashConditionAnd(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashConditionAnd
    );
  }
  _walkBashConditionAndLhs(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashConditionAndLhs
    );
  }
  _walkBashConditionAndRhs(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashConditionAndRhs
    );
  }
  _walkBashConditionBinary(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashConditionBinary
    );
  }
  _walkBashConditionBinaryLhs(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashConditionBinaryLhs
    );
  }
  _walkBashConditionBinaryOp(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashConditionBinaryOp
    );
  }
  _walkBashConditionBinaryRhs(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashConditionBinaryRhs
    );
  }
  _walkBashConditionEmpty(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashConditionEmpty
    );
  }
  _walkBashConditionNullary(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashConditionNullary
    );
  }
  _walkBashConditionOr(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashConditionOr
    );
  }
  _walkBashConditionOrLhs(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashConditionOrLhs
    );
  }
  _walkBashConditionOrRhs(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashConditionOrRhs
    );
  }
  _walkBashDollarSingleQuoted(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashDollarSingleQuoted
    );
  }
  _walkBashFunction(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashFunction
    );
  }
  _walkBashOp(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashOp
    );
  }
  _walkBashProcSub(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashProcSub
    );
  }
  _walkBashProcSubBody(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashProcSubBody
    );
  }
  _walkBashProcSubOp(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashProcSubOp
    );
  }
  _walkBashUntilBody(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashUntilBody
    );
  }
  _walkBashUntilCondition(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashUntilCondition
    );
  }
  _walkBashUntilExpression(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashUntilExpression
    );
  }
  _walkBashVariable(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashVariable
    );
  }
  _walkBashWhileExpression(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashWhileExpression
    );
  }
  _walkUnknown(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkUnknown
    );
  }
  _walkBashArithmeticSequence(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashArithmeticSequence
    );
  }
  _walkBashArithmeticExpansion(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashArithmeticExpansion
    );
  }
  _walkBashArithmeticVariable(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashArithmeticVariable
    );
  }
  _walkBashArithmeticBianry(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashArithmeticBianry
    );
  }
  _walkBashArithmeticBinaryOp(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashArithmeticBinaryOp
    );
  }
  _walkBashArithmeticBianryLhs(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashArithmeticBianryLhs
    );
  }
  _walkBashArithmeticBianryRhs(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return this._processEdits(
      current, parents,
      current.children.map(x => this._walk(parents)(x)),
      this.walkBashArithmeticBianryRhs
    );
  }

  walk(root: DopsNode): DopsNode | null {
    const finalEdit = this._walk([])(root);

    if (finalEdit.type == 'EDIT-REPLACE-SELF' || finalEdit.type == 'EDIT-REPLACE-PARENT') {
      return finalEdit.payload;
    } else {
      return null;
    }
  }
}

export class IdentityPass extends BaseTransformerPass {
  walkGeneric(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkAsString(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashAndIf(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashAndMem(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashAssign(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashAssignLhs(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashAssignRhs(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashBackgrounded(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashBackticked(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashBanged(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashBraceExpansion(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashBraceGroup(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashCaseExpCase(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashCaseExpCases(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashCaseExpression(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashCaseExpressions(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashCaseExpTarget(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashCaseKind(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashCaseLabels(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashCommandArgs(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashCommandCommand(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashCommandPrefix(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashConcat(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashCondition(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashConditionExp(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashConditionOp(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashConditionUnary(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashConditionUnaryExp(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashConditionUnaryOp(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashDollarArithmetic(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashDollarParens(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashDoubleQuoted(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashForIn(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashForInBody(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashForInItems(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashForInVariable(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashGlob(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashIfCondition(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashIfElse(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashIfElseIfExpCheck(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashIfElseIfExpression(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashIfExpression(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashIfThen(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashIoDupeStderr(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashIoDupeStdout(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashLiteral(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashOrIf(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashOrMem(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashPath(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashPipeline(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashRedirect(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashRedirectAppend(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashRedirectCommand(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashRedirectOverwrite(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashRedirectRedirects(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashRedirectStdin(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashScript(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashSingleQuoted(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashSubshell(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkDockerAdd(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkDockerAddSource(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkDockerAddTarget(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkDockerArg(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkDockerCmd(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkDockerCmdArg(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkDockerCopy(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkDockerCopySource(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkDockerCopyTarget(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkDockerEntrypoint(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkDockerEntrypointArg(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkDockerEntrypointExecutable(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkDockerEnv(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkDockerExpose(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkDockerFile(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkDockerFrom(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkDockerImageName(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkDockerImageRepo(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkDockerImageTag(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkDockerLiteral(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkDockerName(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkDockerPath(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkDockerPort(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkDockerRun(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkDockerShell(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkDockerShellArg(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkDockerShellExecutable(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkDockerUser(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkDockerVolume(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkDockerWorkdir(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkMaybeSemanticCommand(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkSemanticCommand(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashArray(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashConditionAnd(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashConditionAndLhs(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashConditionAndRhs(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashConditionBinary(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashConditionBinaryLhs(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashConditionBinaryOp(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashConditionBinaryRhs(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashConditionEmpty(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashConditionNullary(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashConditionOr(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashConditionOrLhs(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashConditionOrRhs(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashDollarSingleQuoted(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashFunction(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashOp(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashProcSub(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashProcSubBody(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashProcSubOp(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashUntilBody(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashUntilCondition(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashUntilExpression(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashVariable(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashWhileExpression(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkUnknown(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashArithmeticSequence(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashArithmeticExpansion(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashArithmeticVariable(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashArithmeticBianry(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashArithmeticBinaryOp(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashArithmeticBianryLhs(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
  walkBashArithmeticBianryRhs(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    return { type: 'EDIT-REPLACE-SELF' as const, payload: current };
  }
}

// ----------------------------------------------------------------------------

export class DisplaySemanticCommands extends IdentityPass {
  // TODO: maybe fix this up? If needed.
  // walkBashSemanticCommand(parents: BashNode[], current: BashSemanticCommand) {
  //   console.log(JSON.stringify(current, null, 2));
  //   return current;
  // }
}

export const stringifyBash = (node: DopsNode) => {
  const _justValue = <X extends { value: string } & DopsNode>(
    current: X, pre: string = '', post: string = ''
  ) => {
    return {
      type: 'EDIT-REPLACE-SELF',
      payload: { type: 'AS-STRING', value: `${pre}${current.value || ''}${post}`, children: [] }
    } as Edit<DopsNode>;
  };

  const _concatChildren = (
    current: DopsNode, sep: string, pre: string = '', post: string = ''
  ) => {
    return {
      type: 'EDIT-REPLACE-SELF',
      payload: {
        type: 'AS-STRING',
        value: `${pre}${current.children.map((c: DopsNode) => (c as AsString).value).join(sep)}${post}`,
        children: []
      }
    } as Edit<DopsNode>;
  };

  class StringifyPass extends IdentityPass {
    walkAsString(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      return _justValue(current as AsString);
    }
    walkBashAndIf(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      return _concatChildren(current, ' && ');
    }
    walkBashAndMem(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      return _concatChildren(current, ' ');
    }
    walkBashAssign(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      return _concatChildren(current, '=');
    }
    walkBashAssignLhs(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      return _concatChildren(current, ' ');
    }
    walkBashAssignRhs(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      return _concatChildren(current, ' ');
    }
    walkBashBackgrounded(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      return _concatChildren(current, ' ', '', ' &');
    }
    walkBashBackticked(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      return _concatChildren(current, ' ', '`', '`');
    }
    walkBashBanged(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      return _concatChildren(current, ' ', ' ! ');
    }
    walkBashBraceExpansion(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      return _concatChildren(current, ',', '{', '}');
    }
    walkBashBraceGroup(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      return _concatChildren(current, ' ; ', '{', '}');
    }
    walkBashCaseExpCase(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      const casted = current as any;
      if (casted.children[0].value === "CaseBreak") {
        return {
          type: 'EDIT-REPLACE-SELF',
          payload: {
            type: 'AS-STRING',
            value: `${casted.children[1].value}) ${casted.children[2].value} ;;`,
            children: []
          }
        };
      }
      process.stderr.write(JSON.stringify(current, null, 2));
      process.stderr.write('\nunimplemented in stringifyBash\n');
      process.exit(1); throw new Error();
    }
    walkBashCaseExpCases(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      return _concatChildren(current, '\t');
    }
    walkBashCaseExpression(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      const casted = current as any;
      return {
        type: 'EDIT-REPLACE-SELF',
        payload: {
          type: 'AS-STRING',
          value: `case ${casted.children[0].value} in ${casted.children[1].value} esac`,
          children: []
        }
      };
    }
    walkBashCaseExpressions(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      return _concatChildren(current, ' ; ');
    }
    walkBashCaseExpTarget(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      return _concatChildren(current, ' ');
    }
    walkBashCaseKind(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      return _justValue(current as BashCaseKind);
    }
    walkBashCaseLabels(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      return _concatChildren(current, ' ');
    }
    walkBashCommandArgs(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      return _concatChildren(current, ' ');
    }
    walkBashCommandCommand(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      return _concatChildren(current, ' ');
    }
    walkBashCommandPrefix(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      return _concatChildren(current, ' ');
    }
    walkBashConcat(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      return _concatChildren(current, '');
    }
    walkBashCondition(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      const casted = current as any;
      if (casted.children[0].value === "SingleBracket") {
        return {
          type: 'EDIT-REPLACE-SELF',
          payload: {
            type: 'AS-STRING',
            value: `[ ${casted.children[1].value} ]`,
            children: []
          }
        };
      } else if (casted.children[0].value === "DoubleBracket") {
        return {
          type: 'EDIT-REPLACE-SELF',
          payload: {
            type: 'AS-STRING',
            value: `[[ ${casted.children[1].value} ]]`,
            children: []
          }
        };
      }
      process.stderr.write(JSON.stringify(current, null, 2));
      process.stderr.write('\nunimplemented in stringifyBash\n');
      process.exit(1); throw new Error();
    }
    walkBashConditionExp(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      return _concatChildren(current, ' ');
    }
    walkBashConditionOp(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      return _concatChildren(current, ' ');
    }
    walkBashConditionUnary(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      return _concatChildren(current, ' ');
    }
    walkBashConditionUnaryExp(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      return _concatChildren(current, ' ');
    }
    walkBashConditionUnaryOp(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      return _concatChildren(current, ' ');
    }
    walkBashDollarArithmetic(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      process.stderr.write(JSON.stringify(current, null, 2));
      process.stderr.write('\nunimplemented in stringifyBash\n');
      process.exit(1); throw new Error();
    }
    walkBashDollarParens(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      return _concatChildren(current, '', '$(', ')');
    }
    walkBashDoubleQuoted(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      return _concatChildren(current, '', '"', '"');
    }
    walkBashForIn(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      const casted = current as any;
      const loopvar = casted.children[0].value.replace('${', '').replace('}', '');
      return {
        type: 'EDIT-REPLACE-SELF',
        payload: {
          type: 'AS-STRING',
          value: `for ${loopvar} in ${casted.children[1].value}; do ${casted.children[2].value}; done`,
          children: []
        }
      };
    }
    walkBashForInBody(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      if (current.children.length === 0) {
        return { type: 'EDIT-DELETE-SELF' };
      }
      return _concatChildren(current, ' ; ', '{', '}');
    }
    walkBashForInItems(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      return _concatChildren(current, ' ');
    }
    walkBashForInVariable(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      return _concatChildren(current, ' ');
    }
    walkBashGlob(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      return _justValue(current as BashGlob);
    }
    walkBashIfCondition(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      return _concatChildren(current, ' ', 'if ');
    }
    walkBashIfElse(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      if (current.children.length == 0) {
        return { type: 'EDIT-DELETE-SELF' };
      }
      return _concatChildren(current, ' ; ', 'else ');
    }
    walkBashIfElseIfExpCheck(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      return _concatChildren(current, ' ; ');
    }
    walkBashIfElseIfExpression(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      return _concatChildren(current, ' ; el', '', '; fi');
    }
    walkBashIfExpression(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      return _concatChildren(current, ' ; ', '', 'fi');
    }
    walkBashIfThen(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      return _concatChildren(current, ' ; ', 'then ');
    }
    walkBashIoDupeStderr(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      return { type: 'EDIT-REPLACE-SELF', payload: { type: 'AS-STRING', value: '&2', children: [] }};
    }
    walkBashIoDupeStdout(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      return { type: 'EDIT-REPLACE-SELF', payload: { type: 'AS-STRING', value: '&1', children: [] }};
    }
    walkBashLiteral(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      return _justValue(current as BashLiteral);
    }
    walkBashOrIf(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      return _concatChildren(current, ' || ');
    }
    walkBashOrMem(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      return _concatChildren(current, ' ');
    }
    walkBashPath(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      return _concatChildren(current, ' ');
    }
    walkBashPipeline(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      return _concatChildren(current, ' | ');
    }
    walkBashRedirect(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      return _concatChildren(current, ' ');
    }
    walkBashRedirectAppend(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      return _concatChildren(current, ' ', '>> ');
    }
    walkBashRedirectCommand(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      return _concatChildren(current, ' ');
    }
    walkBashRedirectOverwrite(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      return _concatChildren(current, ' ', '> ');
    }
    walkBashRedirectRedirects(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      return _concatChildren(current, ' ');
    }
    walkBashRedirectStdin(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      return _concatChildren(current, ' ', '< ');
    }
    walkBashScript(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      return _concatChildren(current, ' ; ');
    }
    walkBashSingleQuoted(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      return _justValue(current as BashSingleQuoted, "'", "'");
    }
    walkBashSubshell(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      return _concatChildren(current, ' ; ', '$(', ')');
    }
    walkDockerAdd(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      process.stderr.write(JSON.stringify(current, null, 2));
      process.stderr.write('\nunimplemented in stringifyBash\n');
      process.exit(1); throw new Error();
    }
    walkDockerAddSource(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      process.stderr.write(JSON.stringify(current, null, 2));
      process.stderr.write('\nunimplemented in stringifyBash\n');
      process.exit(1); throw new Error();
    }
    walkDockerAddTarget(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      process.stderr.write(JSON.stringify(current, null, 2));
      process.stderr.write('\nunimplemented in stringifyBash\n');
      process.exit(1); throw new Error();
    }
    walkDockerArg(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      process.stderr.write(JSON.stringify(current, null, 2));
      process.stderr.write('\nunimplemented in stringifyBash\n');
      process.exit(1); throw new Error();
    }
    walkDockerCmd(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      process.stderr.write(JSON.stringify(current, null, 2));
      process.stderr.write('\nunimplemented in stringifyBash\n');
      process.exit(1); throw new Error();
    }
    walkDockerCmdArg(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      process.stderr.write(JSON.stringify(current, null, 2));
      process.stderr.write('\nunimplemented in stringifyBash\n');
      process.exit(1); throw new Error();
    }
    walkDockerCopy(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      process.stderr.write(JSON.stringify(current, null, 2));
      process.stderr.write('\nunimplemented in stringifyBash\n');
      process.exit(1); throw new Error();
    }
    walkDockerCopySource(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      process.stderr.write(JSON.stringify(current, null, 2));
      process.stderr.write('\nunimplemented in stringifyBash\n');
      process.exit(1); throw new Error();
    }
    walkDockerCopyTarget(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      process.stderr.write(JSON.stringify(current, null, 2));
      process.stderr.write('\nunimplemented in stringifyBash\n');
      process.exit(1); throw new Error();
    }
    walkDockerEntrypoint(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      process.stderr.write(JSON.stringify(current, null, 2));
      process.stderr.write('\nunimplemented in stringifyBash\n');
      process.exit(1); throw new Error();
    }
    walkDockerEntrypointArg(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      process.stderr.write(JSON.stringify(current, null, 2));
      process.stderr.write('\nunimplemented in stringifyBash\n');
      process.exit(1); throw new Error();
    }
    walkDockerEntrypointExecutable(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      process.stderr.write(JSON.stringify(current, null, 2));
      process.stderr.write('\nunimplemented in stringifyBash\n');
      process.exit(1); throw new Error();
    }
    walkDockerEnv(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      process.stderr.write(JSON.stringify(current, null, 2));
      process.stderr.write('\nunimplemented in stringifyBash\n');
      process.exit(1); throw new Error();
    }
    walkDockerExpose(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      process.stderr.write(JSON.stringify(current, null, 2));
      process.stderr.write('\nunimplemented in stringifyBash\n');
      process.exit(1); throw new Error();
    }
    walkDockerFile(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      process.stderr.write(JSON.stringify(current, null, 2));
      process.stderr.write('\nunimplemented in stringifyBash\n');
      process.exit(1); throw new Error();
    }
    walkDockerFrom(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      process.stderr.write(JSON.stringify(current, null, 2));
      process.stderr.write('\nunimplemented in stringifyBash\n');
      process.exit(1); throw new Error();
    }
    walkDockerImageName(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      process.stderr.write(JSON.stringify(current, null, 2));
      process.stderr.write('\nunimplemented in stringifyBash\n');
      process.exit(1); throw new Error();
    }
    walkDockerImageRepo(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      process.stderr.write(JSON.stringify(current, null, 2));
      process.stderr.write('\nunimplemented in stringifyBash\n');
      process.exit(1); throw new Error();
    }
    walkDockerImageTag(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      process.stderr.write(JSON.stringify(current, null, 2));
      process.stderr.write('\nunimplemented in stringifyBash\n');
      process.exit(1); throw new Error();
    }
    walkDockerLiteral(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      process.stderr.write(JSON.stringify(current, null, 2));
      process.stderr.write('\nunimplemented in stringifyBash\n');
      process.exit(1); throw new Error();
    }
    walkDockerName(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      process.stderr.write(JSON.stringify(current, null, 2));
      process.stderr.write('\nunimplemented in stringifyBash\n');
      process.exit(1); throw new Error();
    }
    walkDockerPath(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      process.stderr.write(JSON.stringify(current, null, 2));
      process.stderr.write('\nunimplemented in stringifyBash\n');
      process.exit(1); throw new Error();
    }
    walkDockerPort(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      process.stderr.write(JSON.stringify(current, null, 2));
      process.stderr.write('\nunimplemented in stringifyBash\n');
      process.exit(1); throw new Error();
    }
    walkDockerRun(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      process.stderr.write(JSON.stringify(current, null, 2));
      process.stderr.write('\nunimplemented in stringifyBash\n');
      process.exit(1); throw new Error();
    }
    walkDockerShell(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      process.stderr.write(JSON.stringify(current, null, 2));
      process.stderr.write('\nunimplemented in stringifyBash\n');
      process.exit(1); throw new Error();
    }
    walkDockerShellArg(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      process.stderr.write(JSON.stringify(current, null, 2));
      process.stderr.write('\nunimplemented in stringifyBash\n');
      process.exit(1); throw new Error();
    }
    walkDockerShellExecutable(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      process.stderr.write(JSON.stringify(current, null, 2));
      process.stderr.write('\nunimplemented in stringifyBash\n');
      process.exit(1); throw new Error();
    }
    walkDockerUser(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      process.stderr.write(JSON.stringify(current, null, 2));
      process.stderr.write('\nunimplemented in stringifyBash\n');
      process.exit(1); throw new Error();
    }
    walkDockerVolume(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      process.stderr.write(JSON.stringify(current, null, 2));
      process.stderr.write('\nunimplemented in stringifyBash\n');
      process.exit(1); throw new Error();
    }
    walkDockerWorkdir(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      process.stderr.write(JSON.stringify(current, null, 2));
      process.stderr.write('\nunimplemented in stringifyBash\n');
      process.exit(1); throw new Error();
    }
    walkMaybeSemanticCommand(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      return _concatChildren(current, ' ');
    }
    walkSemanticCommand(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      return _concatChildren(current, ' ');
    }
    walkBashArray(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      return _concatChildren(current, ' ', '( ', ' )');
    }
    walkBashConditionAnd(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      return _concatChildren(current, ' && ');
    }
    walkBashConditionAndLhs(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      return _concatChildren(current, ' ');
    }
    walkBashConditionAndRhs(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      return _concatChildren(current, ' ');
    }
    walkBashConditionBinary(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      return _concatChildren(current, ' ');
    }
    walkBashConditionBinaryLhs(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      return _concatChildren(current, ' ');
    }
    walkBashConditionBinaryOp(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      return _concatChildren(current, ' ');
    }
    walkBashConditionBinaryRhs(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      return _concatChildren(current, ' ');
    }
    walkBashConditionEmpty(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      process.stderr.write(JSON.stringify(current, null, 2));
      process.stderr.write('\nunimplemented in stringifyBash\n');
      process.exit(1); throw new Error();
    }
    walkBashConditionNullary(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      return _concatChildren(current, ' ');
    }
    walkBashConditionOr(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      return _concatChildren(current, ' || ');
    }
    walkBashConditionOrLhs(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      return _concatChildren(current, ' ');
    }
    walkBashConditionOrRhs(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      return _concatChildren(current, ' ');
    }
    walkBashDollarSingleQuoted(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      return _justValue(current as BashDollarSingleQuoted, "$'", "'");
    }
    walkBashFunction(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      return {
        type: 'EDIT-REPLACE-SELF',
        payload: {
          type: 'AS-STRING',
          value: 'bashFunction() { }',
          children: []
        }
      }; // TODO: we don't actually support bash functions...
    }
    walkBashOp(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      // this.lastOp = (current as BashOp).value;
      return _justValue(current as BashOp);
    }
    walkBashProcSub(parents: DopsNode[], current: DopsNode) {
      const theOp = (current.children.filter(
        x => x.type === 'BASH-PROC-SUB-OP'
      )[0] as BashProcSubOp).value;
      
      const theBody = current.children.filter(
        x => x.type !== 'BASH-PROC-SUB-OP'
      ).map(c => (c as AsString).value).join(' ');

      return {
        type: 'EDIT-REPLACE-SELF',
        payload: {
          type: 'AS-STRING',
          value: `${theOp.trim()}(${theBody.trim()})`,
          children: []
        }
      } as Edit<DopsNode>;
    }
    walkBashProcSubBody(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      return _concatChildren(current, ' ');
    }
    walkBashProcSubOp(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      return _justValue(current as BashProcSubOp);
    }
    walkBashUntilBody(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      process.stderr.write(JSON.stringify(current, null, 2));
      process.stderr.write('\nunimplemented in stringifyBash\n');
      process.exit(1); throw new Error();
    }
    walkBashUntilCondition(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      process.stderr.write(JSON.stringify(current, null, 2));
      process.stderr.write('\nunimplemented in stringifyBash\n');
      process.exit(1); throw new Error();
    }
    walkBashUntilExpression(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      process.stderr.write(JSON.stringify(current, null, 2));
      process.stderr.write('\nunimplemented in stringifyBash\n');
      process.exit(1); throw new Error();
    }
    walkBashVariable(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      return _justValue(current as BashVariable, '${', '}');
    }
    walkBashWhileExpression(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      if (current.children.length === 0) {
        return { type: 'EDIT-DELETE-SELF' };
      }
      return _concatChildren(current, ' ; ', '{', '}');
    }
    walkUnknown(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      return { type: 'EDIT-DELETE-SELF' }; // TODO: this whas we want?
    }
    walkBashArithmeticSequence(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      process.stderr.write(JSON.stringify(current, null, 2));
      process.stderr.write('\nunimplemented in stringifyBash\n');
      process.exit(1); throw new Error();
    }
    walkBashArithmeticExpansion(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      process.stderr.write(JSON.stringify(current, null, 2));
      process.stderr.write('\nunimplemented in stringifyBash\n');
      process.exit(1); throw new Error();
    }
    walkBashArithmeticVariable(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      process.stderr.write(JSON.stringify(current, null, 2));
      process.stderr.write('\nunimplemented in stringifyBash\n');
      process.exit(1); throw new Error();
    }
    walkBashArithmeticBianry(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      process.stderr.write(JSON.stringify(current, null, 2));
      process.stderr.write('\nunimplemented in stringifyBash\n');
      process.exit(1); throw new Error();
    }
    walkBashArithmeticBinaryOp(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      process.stderr.write(JSON.stringify(current, null, 2));
      process.stderr.write('\nunimplemented in stringifyBash\n');
      process.exit(1); throw new Error();
    }
    walkBashArithmeticBianryLhs(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      process.stderr.write(JSON.stringify(current, null, 2));
      process.stderr.write('\nunimplemented in stringifyBash\n');
      process.exit(1); throw new Error();
    }
    walkBashArithmeticBianryRhs(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
      process.stderr.write(JSON.stringify(current, null, 2));
      process.stderr.write('\nunimplemented in stringifyBash\n');
      process.exit(1); throw new Error();
    }
    
    // Handle more speciailized cases here...

    walkGeneric(parents: DopsNode[], current: DopsNode) {
      const DEBUG_MAP = {
        'SC-APT-GET': 'apt-get ',
        'SC-APT-GET-INSTALL': 'install ',
        'SC-APT-GET-UPDATE': 'update ',
        'SC-APT-GET-F-YES': '-y',
        'SC-APT-GET-F-QUIET': '-q',
        'SC-APT-GET-F-NOINSTALLRECOMMENDS': '--no-install-recommends',
        'SC-APK': 'apk ',
        'SC-APK-ADD': 'add ',
        'SC-APK-DEL': 'del ',
        'SC-APK-F-NOCACHE': '--no-cache',
        'SC-APK-F-VIRTUAL': '--virtual '
      };

      const decoded = DEBUG_MAP[current.type] || '';

      if ((current as any).value) {
        return _justValue(current as any, decoded);
      } else {
        return _concatChildren(current, ' ', decoded);
      }
    }
  };

  const transformed = (new StringifyPass()).walk(node); 

  if (!transformed || transformed.type != 'AS-STRING') {
    console.log('FAILED TO STRINGIFY:');
    console.log(JSON.stringify(transformed, null, 2));
    return '';
  } else {
    return transformed.value.trim();
  }
};
