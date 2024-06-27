export default function markdownItAbc(md) {
  const defaultRender = md.renderer.rules.fence || ((tokens, idx, options, env, self) => {
    return self.renderToken(tokens, idx, options);
  });

  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    if (token.info.trim() === 'abc') {
      const content = encodeURIComponent(token.content);
      return `<AbcNotation content="${content}"></AbcNotation>`;
    }
    return defaultRender(tokens, idx, options, env, self);
  };
};
