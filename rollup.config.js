import autoExternal from 'rollup-plugin-auto-external';
import tsPlugin from '@rollup/plugin-typescript';
import resolve from "@rollup/plugin-node-resolve";
import { terser } from 'rollup-plugin-terser';
import json from '@rollup/plugin-json';
import pkg from "./package.json";
import tsconfig from './tsconfig.json';

export default [
    {
        input: "src/index.ts",
        output: [
            {
                inlineDynamicImports: true,
                file: pkg.main,
                format: 'cjs',
                sourcemap: true,
            },
            {
                inlineDynamicImports: true,
                file: pkg.module,
                format: 'es',
                sourcemap: true,
            },
            {
                inlineDynamicImports: true,
                name: pkg.name,
                file: pkg.browser,
                format: "umd",
                sourcemap: true,
            },
        ],
        plugins: [
            autoExternal(),
            resolve({
                preferBuiltins: true
            }),
            json(),
            tsPlugin(tsconfig),
            terser()
        ],
    },
];