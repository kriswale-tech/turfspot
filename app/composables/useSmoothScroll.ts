// composables/useSmoothScroll.ts
export function useSmoothScroll() {
  const smoothTo = (selector: string, offset = 0) => {
    const el = document.querySelector(selector);
    if (!el) return;
    const rect = (el as HTMLElement).getBoundingClientRect();
    window.scrollTo({
      top: window.pageYOffset + rect.top - offset,
      left: 0,
      behavior: "smooth",
    });
  };
  return { smoothTo };
}
