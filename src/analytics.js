export function track(event, props = {}) {
  if (import.meta.env.DEV) console.debug('[analytics]', event, props)
}
