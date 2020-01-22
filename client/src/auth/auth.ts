import { useEffect, useState } from "react";
import * as firebase from "firebase/app";
import { auth } from "./";

export const useAuth = () => {
	const [ authState, setAuthState ] = useState( {
		loading : true,
		user : {} as firebase.User
	} );

	useEffect( () => {
		return auth.onAuthStateChanged( authState =>
			setAuthState( {
				loading : false,
				user : authState
			} )
		);
	}, [ auth ] );

	return authState;
};
