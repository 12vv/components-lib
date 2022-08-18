// export default {
//   // more father 4 config: https://github.com/umijs/father-next/blob/master/docs/config.md
//   esm: 'babel', // 通过 babel 编译相关组件即可，而无需打包在一个文件中，实现在使用时可按需加载。
//   cjs: 'babel',
//   lessInBabelMode: true, // less 转 css
//   // 打包的产物若需引入 antd ，则通过按需加载形式引入。
//   extraBabelPlugins: [
//     [
//       'babel-plugin-import',
//       {
//         libraryName: 'antd',
//         libraryDirectory: 'es',
//         style: true,
//       },
//     ],
//   ],
// };

import { readdirSync } from 'fs';
import { join } from 'path';
// utils must build before core
// runtime must build before renderer-react
// components dependencies order: form -> table -> list
// const headPkgs: string[] = ['button', 'tag']; // add to button and tag
// const tailPkgs = readdirSync(join(__dirname, 'packages')).filter(
//   (pkg) => pkg.charAt(0) !== '.' && !headPkgs.includes(pkg),
// );
const type = process.env.BUILD_TYPE;
let config = {};
if (type === 'lib') {
  config = {
    cjs: { type: 'babel', lazy: true },
    esm: false,
    runtimeHelpers: true,
    // pkgs: [...headPkgs, ...tailPkgs],
    extraBabelPlugins: [
      ['babel-plugin-import', { libraryName: 'antd', libraryDirectory: 'es', style: true }, 'antd'],
    ],
  };
}
if (type === 'es') {
  config = {
    cjs: false,
    esm: {
      type: 'babel',
    },
    runtimeHelpers: true,
    // pkgs: [...headPkgs, ...tailPkgs],
    extraBabelPlugins: [
      [require('./scripts/replaceLib')],
      ['babel-plugin-import', { libraryName: 'antd', libraryDirectory: 'es', style: true }, 'antd'],
    ],
  };
}
export default config;
