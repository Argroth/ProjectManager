export const SIDEBAR_VISIBILITY_TOGGLE = "SIDEBAR_VISIBILITY_TOGGLE";
export const SIDEBAR_VISIBILITY_SHOW = "SIDEBAR_VISIBILITY_SHOW";
export const SIDEBAR_VISIBILITY_HIDE = "SIDEBAR_VISIBILITY_HIDE";
export const SIDEBAR_STICKY_TOGGLE = "SIDEBAR_STICKY_TOGGLE";
export const SIDEBAR_STICKY_ENABLE = "SIDEBAR_STICKY_ENABLE";
export const SIDEBAR_STICKY_DISABLE = "SIDEBAR_STICKY_DISABLE";

const initialState = {
  isOpen: true,
  isSticky: true
};

export default function reducer(state = initialState, actions) {
  switch (actions.type) {
    case SIDEBAR_VISIBILITY_TOGGLE:
      return {
        ...state,
        isOpen: !state.isOpen
      };
    case SIDEBAR_VISIBILITY_SHOW:
      return {
        ...state,
        isOpen: true
      };
    case SIDEBAR_VISIBILITY_HIDE:
      return {
        ...state,
        isOpen: false
      };

    case SIDEBAR_STICKY_TOGGLE:
      return {
        ...state,
        isSticky: !state.isSticky
      };
    case SIDEBAR_STICKY_ENABLE:
      return {
        ...state,
        isSticky: true
      };

    case SIDEBAR_STICKY_DISABLE:
      return {
        ...state,
        isSticky: false
      };

    default:
      return state;
  }
}
