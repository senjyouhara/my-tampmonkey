!function(e){var r={};function t(n){if(r[n])return r[n].exports;var o=r[n]={i:n,l:!1,exports:{}};return e[n].call(o.exports,o,o.exports,t),o.l=!0,o.exports}t.m=e,t.c=r,t.d=function(e,r,n){t.o(e,r)||Object.defineProperty(e,r,{enumerable:!0,get:n})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,r){if(1&r&&(e=t(e)),8&r)return e;if(4&r&&"object"==typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(t.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&r&&"string"!=typeof e)for(var o in e)t.d(n,o,function(r){return e[r]}.bind(null,o));return n},t.n=function(e){var r=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(r,"a",r),r},t.o=function(e,r){return Object.prototype.hasOwnProperty.call(e,r)},t.p="",t(t.s=0)}([function(e,r){function t({types:e}){return{visitor:{Program:{enter(e,r){const t=r.opts.propertyName||"locals";r.propertyName=t}},JSXAttribute(r,t){let{node:n}=r;const o=t.propertyName;if("JSXIdentifier"===n.name.type&&"className"===n.name.name&&"JSXExpressionContainer"===n.value.type&&"MemberExpression"===n.value.expression.type){n.value;const t=n.value.expression,i=t.object,s=t.property,u=e.identifier(i.name),a=e.identifier(s.name),p=e.memberExpression(u,a),l=e.logicalExpression("||",e.logicalExpression("&&",e.memberExpression(u,e.identifier(o)),e.memberExpression(e.memberExpression(u,e.identifier(o)),a)),p),f=e.jsxExpressionContainer(l),c=e.jsxAttribute(e.jsxIdentifier("className"),f);r.replaceWith(c)}}}}}(r=e.exports=t).default=t,Object.defineProperty(r,"__esModule",{value:!0})}]);