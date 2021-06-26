import resolve from "rollup-plugin-node-resolve"
import commonjs from "rollup-plugin-commonjs"
import { uglify } from "rollup-plugin-uglify"
import html from '@rollup/plugin-html'

const cdn = '//cdn.jsdelivr.net/gh'
const username = 'saber2pr'
const repo = 'react'
const pages_branch = 'gh-pages'

const publicPath = process.env.NODE_ENV === 'production'
  ? `${cdn}/${username}/${repo}@${pages_branch}/`
  : './'

const fileName = `bundle.${Date.now()}.js`

export default {
  input: "./lib/__test__/Test.js",
  output: {
    file: `./build/${fileName}`,
    format: "iife",
    name: "react",
    exports: "named"
  },
  watch: {
    include: "lib/**"
  },
  plugins: [commonjs(), resolve(), uglify(), html({
    template: () => `<!DOCTYPE html>
    <html>
      <head>
        <title>@saber2pr/react</title>
      </head>
      <body>
        <div id="root"></div>
        <script src=${`${publicPath}${fileName}`}></script>
      </body>
    </html>`
  })]
}
