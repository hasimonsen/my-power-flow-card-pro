import { terser } from "rollup-plugin-terser";

export default {
  input: "src/my-power-flow-card-pro.js",
  output: {
    file: "dist/my-power-flow-card-pro.js",
    format: "es",
  },
  plugins: [terser()],
};
