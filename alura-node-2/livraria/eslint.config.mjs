import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";


export default defineConfig([
  {
    files: ["**/*.{js,mjs,cjs}"], plugins: { js },
    extends: ["js/recommended"],
    rules: {
      "no-unused-vars": "error",
      "no-undef": "error",
      semi: ["error", "always"],
      "no-console": "error",
      "quotes": ["error", "double"],
      "indent": ["error", 2],
    }
  },
  { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.browser } },
]);
