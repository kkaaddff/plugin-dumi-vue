# @zhangqc/plugin-dumi-vue

[![NPM version](https://img.shields.io/npm/v/@zhangqc/plugin-dumi-vue.svg?style=flat)](https://www.npmjs.com/package/@zhangqc/plugin-dumi-vue)

> @zhangqc/plugin-dumi-vue  
> dumi 插件 用于展示 vue sfc 组件

## Install

```bash
# or yarn
$ npm install @zhangqc/plugin-dumi-vue
```

**_ 目前只支持 vue @2.6.14 _**

```bash
$ npm run build --watch
$ npm run start
```

## Usage

Configure in `.umirc.js`,

```js
export default {
  plugins: ['@zhangqc/plugin-dumi-vue'],
};
```

使用 markdown 的 `html` 标签做为标识使用 `preview` 告诉 `dumi` 需要渲染这部分代码

```html ｜ preview
<template>
  <div id="app">my-vue-app</div>
</template>

<script>
  export default {
    name: 'app',
    components: {},
  };
</script>

<style>
  #app {
    text-align: center;
    color: #2c3e50;
  }
</style>
```

## Options

TODO

## LICENSE

MIT
