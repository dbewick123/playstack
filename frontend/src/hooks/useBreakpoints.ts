import { useResponsive } from "./useResponsive";

export function useIsMobile() {
  return useResponsive("(max-width: 430px)");
}

export function useIsLargeMobile() {
  return useResponsive("(min-width: 431px) and (max-width: 557px)");
}

export function useIsTablet() {
  return useResponsive("(min-width: 558px) and (max-width: 831px)");
}

export function useIsDesktop() {
  return useResponsive("(min-width: 832px) and (max-width: 1439px)");
}

export function useIsLargeMonitor() {
  return useResponsive("(min-width: 1440px) and (max-width: 2559px)");
}

export function useIs4k() {
  return useResponsive("(min-width: 2560px)");
}