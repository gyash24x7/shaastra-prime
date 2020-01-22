import * as firebase from "firebase/app";
import "firebase/auth";

const firebaseAppConfig = {
	apiKey : "AIzaSyCm5Ul6rhP8iKk9f6czBJlY16MAsPaXkgA",
	authDomain : "shaastra-prime-fbbda.firebaseapp.com",
	databaseURL : "https://shaastra-prime-fbbda.firebaseio.com",
	projectId : "shaastra-prime-fbbda",
	storageBucket : "shaastra-prime-fbbda.appspot.com",
	messagingSenderId : "986862596133",
	appId : "1:986862596133:web:c50c80d691d2c22de48fcc",
	measurementId : "G-07TR76TYD3"
};

firebase.initializeApp( firebaseAppConfig );

export const auth = firebase.auth();

export default firebase;
