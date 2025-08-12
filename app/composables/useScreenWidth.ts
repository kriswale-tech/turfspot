import { ref, onMounted, onUnmounted } from "vue";

export function useScreenWidth() {
  const width = ref<number>(
    typeof window !== "undefined" ? window.innerWidth : 0
  );
  let rafId = 0;

  const handleResize = () => {
    if (rafId) return;
    rafId = window.requestAnimationFrame(() => {
      width.value = window.innerWidth;
      rafId = 0;
    });
  };

  onMounted(() => {
    width.value = window.innerWidth;
    window.addEventListener("resize", handleResize, { passive: true });
  });

  onUnmounted(() => {
    window.removeEventListener("resize", handleResize);
    if (rafId) cancelAnimationFrame(rafId);
  });

  return { width };
}
