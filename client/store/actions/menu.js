// small file for simple action + reducer
export const initial_state = {
  is_showing_menu: false
}

export const types = {
  SHOW_MENU: 'Show menu',
  HIDE_MENU: 'Hide menu'
}

export const actions = {
  showMenu() {
    return {
      type: types.SHOW_MENU
    }
  },
  hideMenu() {
    return {
      type: types.HIDE_MENU
    }
  }
}
