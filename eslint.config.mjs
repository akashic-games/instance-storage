import eslintConfig from "@akashic/eslint-config";
import prettier, { rules } from "eslint-config-prettier";

export default [
  ...eslintConfig,
  prettier,
  {
    files: ["src/**/*.ts"],
    languageOptions: {
      sourceType: "module",
      parserOptions: {
        project: "tsconfig.eslint.json"
      }
    },
    rules: {
      "@typescript-eslint/explicit-function-return-type": "off"
    }
  }
];
