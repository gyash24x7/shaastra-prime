export default (fields: any, Entity: any) => {
	const select = Object.keys(fields).filter((field) =>
		Entity.primaryFields.includes(field)
	);

	const relations = Object.keys(fields).filter((field) =>
		Entity.relationalFields.includes(field)
	);

	return { select, relations };
};
