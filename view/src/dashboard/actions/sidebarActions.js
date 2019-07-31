// Sidebar
export const SIDEBAR_VISIBILITY_TOGGLE = "SIDEBAR_VISIBILITY_TOGGLE";
export const SIDEBAR_VISIBILITY_SHOW = "SIDEBAR_VISIBILITY_SHOW";
export const SIDEBAR_VISIBILITY_HIDE = "SIDEBAR_VISIBILITY_HIDE";
export const SIDEBAR_STICKY_TOGGLE = "SIDEBAR_STICKY_TOGGLE";
export const SIDEBAR_STICKY_ENABLE = "SIDEBAR_STICKY_ENABLE";
export const SIDEBAR_STICKY_DISABLE = "SIDEBAR_STICKY_DISABLE";

// Layout
export const LAYOUT_BOXED_TOGGLE = "LAYOUT_BOXED_TOGGLE";
export const LAYOUT_BOXED_ENABLE = "LAYOUT_BOXED_ENABLE";
export const LAYOUT_BOXED_DISABLE = "LAYOUT_BOXED_DISABLE";

// Theme
export const THEME_TOGGLE = "THEME_TOGGLE";

export function toggleSidebar() {
  return {
    type: SIDEBAR_VISIBILITY_TOGGLE
  };
}

export function showSidebar() {
  return {
    type: SIDEBAR_VISIBILITY_SHOW
  };
}

export function hideSidebar() {
  return {
    type: SIDEBAR_VISIBILITY_HIDE
  };
}

export function toggleStickySidebar() {
  return {
    type: SIDEBAR_STICKY_TOGGLE
  };
}

export function enableStickySidebar() {
  return {
    type: SIDEBAR_STICKY_ENABLE
  };
}

export function disableStickySidebar() {
  return {
    type: SIDEBAR_STICKY_DISABLE
  };
}
