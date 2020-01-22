import { createSelector } from "reselect";
import { Store } from "../../typings";

const selectUser = ( store: Store ) => store.user;

export const selectCurrentUser = createSelector( [ selectUser ], user => user );
