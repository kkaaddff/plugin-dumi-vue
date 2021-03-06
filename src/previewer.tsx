import React, { useRef, useEffect } from 'react';
import Vue from 'vue';

const VUE_COMPONENT_NAME = 'fta-internal-component-name';

export default function VueContainer(props: { demoPath: string }) {
  const vueInstance = useRef<any>();

  const init = async () => {
    const demoPath = props.demoPath;

    let fetchResult = await import(/* webpackIgnore: true */ demoPath);
    // @ts-ignore

    if (fetchResult.default) {
      vueInstance.current = new Vue(fetchResult.default).$mount(
        '#' + VUE_COMPONENT_NAME,
      );
      // vueInstance.current = new Vue({
      //   template: `
      //     <div id="app">
      //       {{ message }}
      //       <van-button>按钮</van-button>
      //     </div>`,
      //   data: {
      //     message: 'Hello Vue!',
      //   },
      // }).$mount('#' + VUE_COMPONENT_NAME);
    }
  };

  useEffect(() => {
    init();
    return () => {
      vueInstance.current?.$destroy();
    };
  }, []);

  return <div id={VUE_COMPONENT_NAME}></div>;
}
