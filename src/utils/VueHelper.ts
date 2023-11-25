import Vue, { type VueConstructor } from 'vue'

const runOnceWith = (obj: any, fn: Function) => {
  if (!obj || !['function', 'object'].includes(typeof obj)) {
    return fn()
  }
  if (obj.__vue_installed) { return }
  obj.__vue_installed = true
  return fn()
}

export function Vueuse(vuePlugin: any, ...options: any) {
  runOnceWith(vuePlugin, () => Vue.use(vuePlugin, ...options))
}
export function Vuedirective(id: string, directive?: any) {
  runOnceWith(directive, () => Vue.directive(id, directive))
}
export function Vuemixin(vueMixin: any) {
  runOnceWith(vueMixin, () => Vue.mixin(vueMixin))
}
export function Vuecomponent(id: string, definition: VueConstructor) {
  runOnceWith(definition, () => Vue.component(id, definition))
}
