import React from "react";
import { Profile } from "../components/Profile";
import { PageProps } from "./Login";
import { Store } from "../typings";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";

const mapStateToProps = ( { user }: Store ) => (
	{ user }
);

export const ProfilePage = connect( mapStateToProps )( ( { user }: PageProps ) => {
	if ( user?.name ) return <Profile/>;

	return <Redirect to="/login"/>;

} );
