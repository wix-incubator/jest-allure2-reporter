export default function articleHeaderPlugin(_options) {
  function directiveTransformer(ast, vfile) {
    const h1 = ast.children.findIndex((node) => node.type === 'heading');
    if (h1 > -1) {
      ast.children.splice(h1 + 1, 0, createMDX('ArticleHeader'));
    }
  }

  return directiveTransformer;
}

function createMDX(name) {
  return {
    type: 'mdxJsxFlowElement',
    name,
    attributes: [],
  };
}
