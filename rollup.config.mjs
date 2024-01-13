import { nodeResolve } from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';

import image from 'rollup-plugin-img';


export default {
    watch: true,
    input: 'src/index.js',
    output: {
        dir: 'dist',
        format: 'cjs'
    },
    plugins: [nodeResolve(),commonjs(),
        image({
        output: `dist/images`,
            limit: 10000000
    })]
};
