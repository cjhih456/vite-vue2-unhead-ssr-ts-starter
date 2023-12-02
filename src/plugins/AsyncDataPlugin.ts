import type { VueContext } from "types/VueContext";
import { ref, type VueConstructor, type ComponentOptions } from "vue";
export default {
  install(Vue: VueConstructor, context: VueContext) {
    Vue.mixin({
      created() {
        // @ts-ignore
        const temp = this.$options.asyncData as Promise<any> | (() => any) | object
        if (!temp) return
        const assignData = (data: object) => {
          if (data) {
            // @ts-ignore
            Object.assign(this.$options.data, data)
          }
        }
        const callFunctions = async (data: any) => {
          if (typeof data === 'function') {
            const result = data.call(this)
            if (result instanceof Promise) {
              await Promise.all([result]).then(([res]) => {
                assignData(res)
              })
            } else {
              assignData(result)
            }
          } else if (typeof data === 'object') {
            assignData(data)
          }
        }
        Array.isArray(temp) ? Promise.all(temp).then(v => v.forEach(callFunctions)) : callFunctions(temp)
      }
    })
  }
}
export function useAsyncRef<T>(cb: () => T | Promise<T>) {
  const data = ref({})
  const result = Promise.resolve(cb())
  result.then(r => { data.value = r })
  return data
}

