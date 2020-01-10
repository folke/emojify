# Emojify :sparkles:

Command line tool to convert emojis in text from `:smile:` to 😀

```
Usage: emojify [options] [text]

Options:
  -V, --version  output the version number
  -h, --help     output usage information
```

I mainly created this to properly see [Gitmoji](https://gitmoji.carloscuesta.me/) emojis in git logs.
```
git log --color | emojify | less -rXF
```
