import {
  SELECT_ITEM,
  ADD_ITEMS,
  CREATE_ITEM,
  UPDATE_ITEM,
  DELETE_ITEM
} from '../constants';

//---------------------------------------
// ITEMS STORE
//---------------------------------------
export const items = (state: any = [], { type, payload }) => {
  switch(type) {
    case ADD_ITEMS:
      return payload;
    case CREATE_ITEM:
      return [
        ...state,
        payload
      ];
    case UPDATE_ITEM:
      return state.map(item => {
        return item.id === payload.id ? Object.assign({}, item, payload): item;
      });
    case DELETE_ITEM:
      return state.filter(item => item.id !== payload.id);
    default:
      return state;
  }
}

//---------------------------------------
// SELECTED ITEM STORE
//---------------------------------------
export const selectedItem = (state: any = null, { type, payload }) => {
  switch(type) {
    case SELECT_ITEM:
      return payload;
    default:
      return state;
  }
}
