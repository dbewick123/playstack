import { useState } from "react";

export default function useMenu() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const openMenu = (e: React.SyntheticEvent<HTMLElement>) => setAnchorEl(e.currentTarget);
  const closeMenu = () => setAnchorEl(null);

  return { anchorEl, open, openMenu, closeMenu };
}