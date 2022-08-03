import { IdentityPass, DopsNode, stringifyBash, BashLiteral, Edit } from "../ast";
import { createEnrichers } from "./commands";

const COMMAND_MAP = createEnrichers();

export class EnrichPass extends IdentityPass {

  walkBashCommandCommand(parents: DopsNode[], current: DopsNode): Edit<DopsNode> {
    const _getCommandArgs = (parents: DopsNode[]) => {
      const parent = parents[parents.length - 2];
      if (parent.type !== 'MAYBE-SEMANTIC-COMMAND') {
        console.log('ERROR BAD PARENT TYPE: ' + parent.type);
        return [];
      } else {
        const args = parent.children.filter(
          x => x.type === 'BASH-COMMAND-ARGS'
        )[0].children;
        return [ args.map(stringifyBash), args ];
      }
    };

    if (current.children.length === 1 && current.children[0].type === 'BASH-LITERAL') {
      const command = (current.children[0] as BashLiteral).value;
      if (COMMAND_MAP[command]) {

        try {
          const args = _getCommandArgs(parents);
          const payload = COMMAND_MAP[command](
            args[0], args[1]
          ) as DopsNode;
  
          // console.log(JSON.stringify(payload, null, 2));

          return {
            type: 'EDIT-REPLACE-PARENT',
            at_level: 1,
            payload: payload
          };
        } catch (ex) {
          return {
            type: 'EDIT-REPLACE-PARENT',
            at_level: 1,
            payload: {
              type: 'UNKNOWN',
              children: []
            }
          };
        }
      }
    }

    return {
      type: 'EDIT-REPLACE-PARENT',
      at_level: 1,
      payload: {
        type: 'UNKNOWN', children: []
      } as DopsNode
    };
  }

}
