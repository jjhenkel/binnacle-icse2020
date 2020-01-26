import { RULES as ALL_RULES } from './rules';

type Subtree = any;

export const RULES = [
  ...ALL_RULES
] as Array<{
  scope: 'INTRA-DIRECTIVE' | 'INTER-DIRECTIVE',
  kind: 'CONSEQUENT-FOLLOWS-ANTECEDENT' | 'CONSEQUENT-FLAG-OF-ANTECEDENT' | 'CONSEQUENT-PRECEDES-ANTECEDENT',
  name: string,
  description: string,
  antecedent: Subtree,
  consequent: { matchAnyBound: Subtree },
  source: string,
  notes: string|undefined
}>;
