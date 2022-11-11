# Usage
```
import RemarkableSpoiler from '@quochuync/remarkable-spoiler';
import '@quochuync/remarkable-spoiler/styles.css';

const md = new Remarkable();
md.use(RemarkableSpoiler);
```

## Markdown
The plugin will convert blockquote markdown with specified prefix into a `<details>` and `<summary>` block:
```
>! This is a spoiler content.
> This is a second line
```

By default the prefix is '! ' (exclamation mark followed by a space), to change the prefix:
```
md.use(RemarkableSpoiler, { prefix: '@ ' });
```