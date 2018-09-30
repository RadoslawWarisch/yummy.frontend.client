import { User } from "../../models/user";
import * as fromActions from "../../actions/user.actions";

export interface UserState {
  data: User;
}

const initialState: any = {
  data: new User({
    login: 'test@yummy.com'
  })
};

export const userReducer = (
  state: UserState = initialState,
  action: fromActions.UserActions
) => {
  switch (action.type) {
    case fromActions.FETCH_USER_SUCC:
      return {
        ...state,
        data: action.payload
      }
    default:
      return state;
  }
};
