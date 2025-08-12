import type { Directive, Ref } from "vue";
import { onMounted, onBeforeUnmount } from "vue";

const handlerMap = new WeakMap<HTMLElement, (e: Event) => void>();

export const clickOutsideDirective: Directive<HTMLElement, (e: Event) => void> =
  {
    mounted(el, binding) {
      const handler = (e: Event) => {
        const target = e.target as Node | null;
        if (el && target && !el.contains(target) && el !== target) {
          if (typeof binding.value === "function") binding.value(e);
        }
      };
      handlerMap.set(el, handler);
      document.addEventListener("click", handler);
      document.addEventListener("touchstart", handler);
    },
    unmounted(el) {
      const handler = handlerMap.get(el);
      if (handler) {
        document.removeEventListener("click", handler);
        document.removeEventListener("touchstart", handler);
        handlerMap.delete(el);
      }
    },
  };

export function useClickOutside(
  target: Ref<HTMLElement | null>,
  onOutside: (e: Event) => void
) {
  const handler = (e: Event) => {
    const el = target.value;
    const t = e.target as Node | null;
    if (el && t && !el.contains(t) && el !== t) {
      onOutside(e);
    }
  };

  onMounted(() => {
    document.addEventListener("click", handler);
    document.addEventListener("touchstart", handler);
  });

  onBeforeUnmount(() => {
    document.removeEventListener("click", handler);
    document.removeEventListener("touchstart", handler);
  });
}
