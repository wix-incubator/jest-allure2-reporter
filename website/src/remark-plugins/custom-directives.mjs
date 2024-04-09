import { visit } from "unist-util-visit";

export default function customDirectivesPlugin(_options) {
  function directiveTransformer(ast, vfile) {
    visit(ast, (node) => {
      if (
        node.type !== 'leafDirective' &&
        node.type !== 'containerDirective' &&
        node.type !== 'tableDirective' &&
        node.type !== 'textDirective'
      ) {
        return;
      }

      switch (node.name) {
        case 'details':
          return details(node);
        case 'summary':
          return summary(node);
        case 'component':
          return component(node);
      }
    });
  }

  return directiveTransformer;
};

function prepareNode(node) {
  const data = node.data = node.data ?? {};
  const hName = pickTagName(node);
  data.hName = hName;
  return node;
}

function pickTagName(node) {
  switch (node.type) {
    case 'textDirective':
      return 'span';
    case 'inlineCode':
      return 'code';
    default:
      return 'div';
  }
}

function details(node) {
  prepareNode(node).data.hName = 'details';
}

function summary(node) {
  prepareNode(node).data.hName = 'summary';
}

function component(node) {
  const { name: hName, ...hProperties } = node.attributes || {};
  if (hName) {
    Object.assign(prepareNode(node).data, {hName, hProperties});
  }
}
