import { nodeResolve } from '@rollup/plugin-node-resolve';
import image from 'rollup-plugin-img';


export default {
    watch: true,
    input: 'src/index.js',
    output: {
        dir: 'dist',
        format: 'cjs'
    },
    plugins: [nodeResolve(),
        image({
        output: `dist/images`,
            limit: 10000000
    })]
};