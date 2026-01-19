import type { Rule } from '../../types.js';
import { getJSXElementName } from '../../utils.js';
import type { NodePath } from '@babel/traverse';
import type * as t from '@babel/types';

/**
 * Detects TouchableWithoutFeedback usage (bad for UX)
 *
 * Bad:
 * <TouchableWithoutFeedback onPress={handlePress}>
 *
 * Good:
 * <Pressable onPress={handlePress}>
 * // or
 * <TouchableOpacity onPress={handlePress}>
 */
export const touchableMissingFeedback: Rule = {
  name: 'a11y/touchable-missing-feedback',
  description: 'Avoid TouchableWithoutFeedback - it provides no visual feedback',
  severity: 'warning',
  category: 'a11y',

  create(context) {
    return {
      JSXOpeningElement(path: NodePath<t.JSXOpeningElement>) {
        const elementName = getJSXElementName(path.node);

        if (elementName !== 'TouchableWithoutFeedback') return;

        const loc = path.node.loc;
        const line = loc?.start.line ?? 0;
        const column = loc?.start.column ?? 0;

        context.report({
          rule: 'a11y/touchable-missing-feedback',
          severity: 'warning',
          message: 'TouchableWithoutFeedback provides no visual feedback to users',
          line,
          column,
          code: context.getSource(path.node),
          fix: 'Use <Pressable> or <TouchableOpacity> instead',
          docs: 'https://reactnative.dev/docs/pressable',
        });
      },
    };
  },
};
