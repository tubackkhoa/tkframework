import { initial_state, types } from 'store/actions/menu'

export const menuReducer = (state = initial_state, action) => {
	switch (action.type) {

		case types.SHOW_MENU:
			return {
				...state,
				is_showing_menu: true
			}

		case types.HIDE_MENU:
			return {
				...state,
				is_showing_menu: false
			}

		default:
			return state
	}
}
