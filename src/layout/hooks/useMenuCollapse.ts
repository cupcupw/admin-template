const collapse = ref(false)

export const useMenuCollapse = () => {
  // 切换menu
  const toggle = () => {
    collapse.value = !collapse.value
  }

  const handleResize = () => {
    const react = document.body.getBoundingClientRect()
    collapse.value = react.width < 1200
  }
  handleResize()

  window.addEventListener('resize', handleResize)
  onBeforeUnmount(() => window.removeEventListener('resize', handleResize))

  return {
    collapse,
    toggle,
  }
}
