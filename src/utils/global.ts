
type PromiseFunc<T> = (resolve: (value?: T) => void, reject: (value?: T) => void, resultObj?: T) => void

export function promiseLinker<T>(promiseList: PromiseFunc<T>[]) {
  return new Promise<T>((resolve, reject) => {
    let resultObj: any
    const buffProcess = promiseList.slice()
    const callProcess = () => {
      const process = buffProcess.shift()
      if (process)
        new Promise((resolve, reject) => process(resolve, reject, resultObj))
          .then(result => {
            resultObj = result
            callProcess()
          })
          .catch(reject)
      else return resolve(resultObj)
    }
    callProcess()
  })
}