const remarkableSpoiler = (md, config = { prefix: '! '}) => {
  const { prefix } = config;
  let isSpoiler = false;
  const originalOpenRenderer = md.renderer.rules.blockquote_open;
  const originalCloseRenderer = md.renderer.rules.blockquote_close;
  const originalInline = md.renderer.rules.text;

  const isSpoilerMd = (tokens, idx) => {
    for (let ti = idx; ti < tokens.length; ti += 1) {
      const token = tokens[ti];

      if (token.type === 'blockquote_close') {
        return false;
      }

      if (token.type === 'inline' && token.content.indexOf(prefix) === 0) {
        isSpoiler = true;
        return isSpoiler;
      }
    }
  };

  md.renderer.rules.blockquote_open = (tokens, idx, options, env) => {
    if (isSpoilerMd(tokens, idx)) {
      return '<details><summary>Reveal spoiler</summary>';
    }

    return originalOpenRenderer(tokens, idx, options, env);
  };

  md.renderer.rules.blockquote_close = (tokens, idx, options, env) => {
    if (isSpoiler) {
      isSpoiler = false;
      return '</details>';
    }

    return originalCloseRenderer(tokens, idx, options, env);
  };

  md.renderer.rules.text = (tokens, idx, options, env) => {
    if (isSpoiler) {
      return tokens[idx].content.replace(new RegExp(`^${prefix}`), '');
    }
    return originalInline(tokens, idx, options, env);
  }
};

export default remarkableSpoiler;
