import { useResponsive } from "./useResponsive";

export function useIsMobile() {
  return useResponsive("(max-width: 430px)");
}

export function useIsDesktop() {
  return useResponsive("(min-width: 1024px)");
}
