import resolve from "rollup-plugin-node-resolve"
import commonjs from "rollup-plugin-commonjs"
import { uglify } from "rollup-plugin-uglify"

export default {
  input: "./lib/__test__/Test.js",
  output: {
    file: "./build/bundle.js",
    format: "iife",
    name: "react",
    exports: "named"
  },
  watch: {
    include: "lib/**"
  },
  plugins: [commonjs(), resolve()]
}
