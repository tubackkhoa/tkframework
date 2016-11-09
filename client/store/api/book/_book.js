// we use saga to keep track of changes from server
// state = [{id:}], each component is tracked by id
// when we push new id => new component will be added to Dom
// remove => remove from Dom, otherwise just update the Dom
// if no id is given, React will use Dom diff to check changes

import { fetchJsonWithToken } from 'store/api/common'


export default {
}