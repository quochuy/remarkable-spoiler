const remarkableSpoiler = (md, config = {}) => {
  const { prefix = '!' , defaultRevealText = 'Reveal spoiler', revealTextMaxLength = 50 } = config;
  const originalOpenRenderer = md.renderer.rules.blockquote_open;
  const originalCloseRenderer = md.renderer.rules.blockquote_close;
  const originalInline = md.renderer.rules.text;
  let spoilerMetadata;

  const extractSpoilerMetadata = (tokens, idx) => {
    for (let ti = idx; ti < tokens.length; ti += 1) {
      const token = tokens[ti];

      if (token.type === 'blockquote_close') {
        return null;
      }

      if (token.type === 'inline' && token.content.indexOf(prefix) === 0) {
        const regex = new RegExp(`${prefix} {0,1}\\\[([A-Za-z0-9 ?!]{1,${revealTextMaxLength}}?)\\\] {0,1}`);
        const match = token.content.match(regex);

        if (match) {
          return { revealText: match[1] };
        }

        return { revealText: defaultRevealText };
      }
    }

    return null;
  };

  md.renderer.rules.blockquote_open = (tokens, idx, options, env) => {
    if (!spoilerMetadata) {
      spoilerMetadata = extractSpoilerMetadata(tokens, idx);
      if (spoilerMetadata) {
        return `<details><summary>${spoilerMetadata.revealText}</summary>`;
      }
    }

    return originalOpenRenderer(tokens, idx, options, env);
  };

  md.renderer.rules.blockquote_close = (tokens, idx, options, env) => {
    if (spoilerMetadata) {
      spoilerMetadata = undefined;
      return '</details>';
    }

    return originalCloseRenderer(tokens, idx, options, env);
  };

  md.renderer.rules.text = (tokens, idx, options, env) => {
    if (spoilerMetadata) {
      return tokens[idx].content
        .replace(new RegExp(`^${prefix} {0,1}\\\[${spoilerMetadata.revealText}\\\] {0,1}`), '')
        .replace(new RegExp(`^${prefix}`), '');
    }
    return originalInline(tokens, idx, options, env);
  }
};

module.exports = remarkableSpoiler;
