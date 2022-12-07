# Usage
```
import RemarkableSpoiler from '@quochuync/remarkable-spoiler';
import '@quochuync/remarkable-spoiler/styles.css';

const md = new Remarkable();
md.use(RemarkableSpoiler);
```

## Markdown
### Basic
The plugin will convert blockquote markdown with specified prefix into a `<details>` and `<summary>` block:
```
>! This is a spoiler content.
> This is a second line
```

### Custom reveal text
```
>! [Click to reveal] This is a spoiler content.
> This is a second line
```

## Options
### Prefix
By default the prefix is '! ' (exclamation mark followed by a space), to change the prefix:
```
md.use(RemarkableSpoiler, { prefix: '@ ' });
```

### Reveal text
If the user does not provide the reveal text, it will defaul to "Reveal spoiler". to change this default value:
```
md.use(RemarkableSpoiler, { defaultRevealText: 'Reveal content' });
```

### Max length for reveal text
By default, the max length for reveal text is 50 characters. If the reveal text provided by the user is longer than this,
it will be ignored and be part of the spoiler content.

To change this:
md.use(RemarkableSpoiler, { revealTextMaxLength: 100 });