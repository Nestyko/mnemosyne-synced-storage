export const resolveFIFOAndBreak: (
  promises: Promise<any>[]
) => Promise<any> = promises => {
  return promises.reduce((acc, p) => acc.catch(() => p), Promise.reject(null))
}
