var __awaiter =
  (this && this.__awaiter) ||
  function(thisArg, _arguments, P, generator) {
    function adopt(value) {
      return value instanceof P
        ? value
        : new P(function(resolve) {
            resolve(value);
          });
    }
    return new (P || (P = Promise))(function(resolve, reject) {
      function fulfilled(value) {
        try {
          step(generator.next(value));
        } catch (e) {
          reject(e);
        }
      }
      function rejected(value) {
        try {
          step(generator['throw'](value));
        } catch (e) {
          reject(e);
        }
      }
      function step(result) {
        result.done
          ? resolve(result.value)
          : adopt(result.value).then(fulfilled, rejected);
      }
      step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
  };
import React, { useRef, useEffect } from 'react';
import Vue from 'vue';
const VUE_COMPONENT_NAME = 'fta-internal-component-name';
export default function VueContainer(props) {
  const vueInstance = useRef();
  const init = () =>
    __awaiter(this, void 0, void 0, function*() {
      const demoPath = props.demoPath;
      let fetchResult = yield import(/* webpackIgnore: true */ demoPath);
      if (fetchResult.default) {
        vueInstance.current = new Vue(fetchResult.default).$mount(
          '#' + VUE_COMPONENT_NAME,
        );
      }
    });
  useEffect(() => {
    init();
    return () => {
      var _a, _b;
      (_b = (_a = vueInstance.current).$destroy) === null || _b === void 0
        ? void 0
        : _b.call(_a);
    };
  }, []);
  return React.createElement('div', { id: VUE_COMPONENT_NAME });
}
