import Avatar from "@atlaskit/avatar";
import React, { useCallback, useContext, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

import { MeDocument, useUploadProfilePicMutation } from "../../generated";
import { UserContext } from "../../routes/PrivateRoute";
import { storage } from "../../utils/firebase";
import { Loader } from "../Shared/Loader";
import { ShowError } from "../Shared/ShowError";

export const ProfilePic = () => {
	const [uploadProfilePic, { loading, error }] = useUploadProfilePicMutation({
		refetchQueries: [{ query: MeDocument }]
	});

	const context = useContext(UserContext);
	const [src, setSrc] = useState("");

	useEffect(() => {
		if (!!context.profilePic)
			storage
				.child(context.profilePic)
				.getDownloadURL()
				.then(url => setSrc(url));
	}, [context]);

	const onDrop = useCallback(
		async ([file]) => {
			const snapshot = await storage
				.child(`users/${context.id}/images/${file.name}`)
				.put(file);
			console.log(snapshot);
			if (snapshot.state === "success")
				uploadProfilePic({
					variables: {
						profilePic: `users/${context.id}/images/${file.name}`
					}
				});
		},
		[uploadProfilePic, context]
	);

	const { getRootProps, getInputProps } = useDropzone({ onDrop });

	if (error) {
		console.log(error);
		return <ShowError />;
	}

	return (
		<div {...getRootProps()} style={{ cursor: "pointer" }}>
			<input {...getInputProps()} />
			{loading ? (
				<Loader />
			) : (
				<Avatar src={src} size="xlarge" presence="online" />
			)}
		</div>
	);
};
