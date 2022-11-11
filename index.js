const remarkablePluginSpoiler = (md) => {
  const originalOpenRenderer = md.renderer.rules.blockquote_open;
  const originalCloseRenderer = md.renderer.rules.blockquote_close;

  const isSpoilerMd = (tokens) => {
    for (let ti = 0; ti < tokens.length; ti += 1) {
      const token = tokens[ti];
      if (token.type === 'inline' && token.content.indexOf('!') === 0) {
        return true;
      }
    }
  };

  md.renderer.rules.blockquote_open = (tokens, idx, options, env) => {
    if (isSpoilerMd(tokens)) {
      return '<details><summary>Reveal spoiler</summary>';
    }

    return originalOpenRenderer(tokens, idx, options, env);
  };

  md.renderer.rules.blockquote_close = (tokens, idx, options, env) => {
    if (isSpoilerMd(tokens)) {
      return '</details>';
    }

    return originalCloseRenderer(tokens, idx, options, env);
  };
};

export default remarkablePluginSpoiler;
