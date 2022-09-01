import { ref, onMounted, Ref, onUnmounted } from 'vue'

interface MousePosition {
  x: Ref<number>
  y: Ref<number>
}

function useMousePosition(): MousePosition{
  const x = ref(0)
  const y = ref(0)

  const updateMounsePosition = (e: MouseEvent) => {
    x.value = e.pageX
    y.value = e.pageY
  }
  
  onMounted(() => {
    document.addEventListener('click', updateMounsePosition)
  })

  onUnmounted(() => {
    document.removeEventListener('click', updateMounsePosition)
  })
 
  return {
    x,
    y
  }
}

export default useMousePosition