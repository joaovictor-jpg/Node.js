import js from "@eslint/js";
import globals from "globals";
import { defineConfig } from "eslint/config";


export default defineConfig([
  { files: ['**/*.{js,mjs,cjs}'],
    plugins: { js },
    extends: ['js/recommended'],
    env: {
        "es2021": true,
        "node": true
    },
    parserOptions: {
        "ecmaVersion": "latest",
        "sourceType": "module"
    },
    rules: {
        "no-console":"off"
    }
  },
  { files: ["**/*.{js,mjs,cjs}"], languageOptions: { globals: globals.node } },
]);
