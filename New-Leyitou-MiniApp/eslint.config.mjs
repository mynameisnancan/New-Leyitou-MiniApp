// eslint.config.mjs

import globals from 'globals';
import pluginJs from '@eslint/js';
import { configs, parser } from 'typescript-eslint';
import pluginVue from 'eslint-plugin-vue';
import eslintPluginImportX from 'eslint-plugin-import-x';
import tsParser from '@typescript-eslint/parser';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

/** @type {import('eslint').Linter.Config[]} */
export default [
  // ignores 提升为全局忽略项
  {
    ignores: ['node_modules', 'uni_modules/', 'static/', '.vscode']
  },
  // 全局 files 指定 ESlint 匹配的文件
  {
    files: ['**/*.{js,mjs,cjs,jsx,mjsx,ts,tsx,mtsx,vue}']
  },
  // 基础配置
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
      parser: tsParser,
      ecmaVersion: 'latest',
      sourceType: 'module'
    }
  },
  pluginJs.configs.recommended,
  ...configs.recommended,
  ...pluginVue.configs['flat/essential'],
  // eslint-plugin-import-x 扩展插件
  eslintPluginImportX.flatConfigs.recommended,
  eslintPluginImportX.flatConfigs.typescript,
  // prettier 扩展插件
  eslintPluginPrettierRecommended,
  // 仅对所有 vue 文件的自定义配置
  {
    files: ['**/*.vue'],
    languageOptions: { parserOptions: { parser: parser } }
  },
  // 自定义 rules
  {
    rules: {
      'prefer-const': 'off', // 允许使用 `let` 关键字
      '@typescript-eslint/no-empty-function': 'off', // 允许空函数
      '@typescript-eslint/no-this-alias': 'off', // 允许使用 `this` 别名
      '@typescript-eslint/no-shadow': 'off', // 允许变量遮蔽
      '@typescript-eslint/no-explicit-any': 'off', // 允许使用 `any` 类型
      '@typescript-eslint/no-unused-vars': 'error', // 禁止未使用的变量
      '@typescript-eslint/ban-ts-comment': 'off', // 允许使用 `@ts-ignore` 等注释（ts文件）
      '@typescript-eslint/indent': 'off', // 关闭缩进规则（ts文件）
      '@typescript-eslint/no-empty-object-type': 'off', // 允许空对象类型（ts文件）
      '@typescript-eslint/no-unused-expressions': 'off', // 允许未使用的表达式

      // vue
      'vue/multi-word-component-names': 'off', // 允许多个单词的组件名
      'vue/valid-define-props': 'error', // 定义 props 时必须使用对象形式
      'vue/no-v-model-argument': 'off', // 允许 v-model 不带参数
      'prefer-rest-params': 'off', // 允许使用 rest 参数
      'vue/singleline-html-element-content-newline': 'off', // 允许单行组件内容换行
      'vue/max-attributes-per-line': [
        // 允许单行组件属性超过5个 但是多行属性不超过1个
        'off',
        {
          'singleline': {
            'max': 4
          },
          'multiline': {
            'max': 1
          }
        }
      ],
      // html标签自闭合规则
      'vue/html-self-closing': [
        'error',
        {
          'html': {
            'void': 'always', // 空元素必须自闭合，如 <br />、<img />
            'normal': 'never', // 普通元素禁止自闭合，如 <div></div>
            'component': 'always' // Vue 组件标签必须自闭合，如 <MyComponent />
          },
          'svg': 'always', // SVG 标签必须自闭合，如 <circle />
          'math': 'always' // MathML 标签必须自闭合，如 <math />
        }
      ],
      // prettier
      'prettier/prettier': 'error'
    }
  }
];
