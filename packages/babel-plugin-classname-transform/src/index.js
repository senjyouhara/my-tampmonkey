/*
PS：变量不用记忆，只是react组件在AST中的称呼。需要手撸babel插件时打开https://astexplorer.net/ 对照即可。
types: https://babeljs.io/docs/en/babel-types
*/

// babel部分 对外暴露了一个函数，接受参数types。
function babelPlugin({ types: t }) {
  return {
    // 在babel里称为访问者
    visitor: {
      Program: {
        enter(path, state) {
          const propertyName = state.opts.propertyName || "locals";
          state.propertyName = propertyName;
        },
      },
      JSXAttribute(path, state) {
        let { node } = path;
        const propertyName = state.propertyName;
        if (
          node.name.type === "JSXIdentifier" &&
          node.name.name === "className"
        ) {
          if (
            node.value.type === "JSXExpressionContainer" &&
            node.value.expression.type === "MemberExpression"
          ) {
            const value = node.value;
            const expression = node.value.expression;
            const expressionObject = expression.object;
            const expressionProperty = expression.property;
            const o = t.identifier(expressionObject.name);
            const p = t.identifier(expressionProperty.name);
            const member = t.memberExpression(o, p);

            const logicalExpression = t.logicalExpression(
              "||",
              t.logicalExpression(
                "&&",
                t.memberExpression(o, t.identifier(propertyName)),
                t.memberExpression(
                  t.memberExpression(o, t.identifier(propertyName)),
                  p,
                ),
              ),
              member,
            );

            const newContainer = t.jsxExpressionContainer(logicalExpression);
            const newJsx = t.jsxAttribute(
              t.jsxIdentifier("className"),
              newContainer,
            );

            path.replaceWith(newJsx);
          }
        }
      },
    },
  };
}

exports = module.exports = babelPlugin;
exports.default = babelPlugin;
Object.defineProperty(exports, "__esModule", {
  value: true,
});
