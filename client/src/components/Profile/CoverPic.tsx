import React, { useCallback, useContext, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";

import { MeDocument, useUploadCoverPicMutation } from "../../generated";
import { UserContext } from "../../routes/PrivateRoute";
import { storage } from "../../utils/firebase";
import { Loader } from "../Shared/Loader";
import { ShowError } from "../Shared/ShowError";

export const CoverPic = () => {
	const [uploadCoverPic, { loading, error }] = useUploadCoverPicMutation({
		refetchQueries: [{ query: MeDocument }]
	});

	const context = useContext(UserContext);
	const [src, setSrc] = useState("");

	useEffect(() => {
		storage
			.child(context.coverPic || "coverpic.png")
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
				uploadCoverPic({
					variables: {
						coverPic: `users/${context.id}/images//${file.name}`
					}
				});
		},
		[uploadCoverPic, context]
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
				<img src={src} alt="sample87" className="cover-pic" />
			)}
		</div>
	);
};
