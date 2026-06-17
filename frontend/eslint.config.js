import js from "@eslint/js";
import globals from "globals";
import tseslint from "typescript-eslint";
import pluginReact from "eslint-plugin-react";
import eslintConfigPrettier from "eslint-config-prettier/flat";

import { defineConfig } from "eslint/config";

export default defineConfig([
  {
    ignores: ["dist/**", "node_modules/**"],
  },
  {
    files: ["**/*.{js,mjs,cjs,ts,jsx,tsx}"],
    plugins: {
      js,
      react: pluginReact,
    },
    languageOptions: { globals: globals.browser },
    extends: [
      js.configs.recommended,
      ...tseslint.configs.recommended,
      pluginReact.configs.flat.recommended,
      eslintConfigPrettier,
    ],
    rules: {
      "react/react-in-jsx-scope": "off",
      // All backend calls must go through apiFetch (src/api/client.ts) so the
      // 401 / X-Authenticated auth teardown is applied uniformly. Ban bare fetch.
      // See docs/adr/0001.
      "no-restricted-syntax": [
        "error",
        {
          selector: "CallExpression[callee.name='fetch']",
          message:
            "Do not call fetch directly. Use apiFetch from src/api/client.ts so auth teardown is applied (see docs/adr/0001).",
        },
      ],
    },
  },
  {
    // The api client is the one place allowed to call fetch directly.
    files: ["**/api/client.ts"],
    rules: {
      "no-restricted-syntax": "off",
    },
  },
]);
