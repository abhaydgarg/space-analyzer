# Space analyzer

[Space analyzer](https://abhaydgarg.github.io/space-analyzer/) is a tool that visualizes disk or directory usage.

![Screen Shot](https://github.com/abhaydgarg/space-analyzer/blob/master/screenshot.png)

## How to use

1. Install [directory-tree](https://github.com/abhaydgarg/directory-tree) CLI tool in your system. Here is a [installation instruction](https://github.com/abhaydgarg/directory-tree#installation).

2. Creates a JSON file of any directory of your system by directory-tree CLI tool using command `$ directory-tree -s /root /some-output-dir/tree.json`. Check the [usage here](https://github.com/abhaydgarg/directory-tree#usage).

3. Visit [Space analyzer website](https://abhaydgarg.github.io/space-analyzer/) or open link `http://localhost:5000/` if space analyzer is installed locally using `npm install`.

4. Now drop the JSON file created in second step into space analyzer.

## Installation and running

```bash
# To install.
npm install

# To run.
npm start
```
