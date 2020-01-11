# Emojify :sparkles:

Command line tool to convert emojis in text from `:smile:` to 😀

```
Usage: emojify [options] [text]

Options:
  -V, --version  output the version number
  -h, --help     output usage information
```

Install with `npm` or `yarn`

```sh
npm install -g emojify-cli
yarn global install emojify-cli
```

I mainly created this to properly see [Gitmoji](https://gitmoji.carloscuesta.me/) emojis in git logs.

```sh
git log --color | emojify | less -rXF
```
