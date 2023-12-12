export const isHydrated = ref(false)

export function onHydrated(cb: () => unknown) {
  watchOnce(isHydrated, () => cb(), { immediate: isHydrated.value })
}
