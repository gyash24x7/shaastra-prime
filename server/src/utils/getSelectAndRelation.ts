export default (info: any, entity: any) => {
	const fields = info;
	const select: any[] = Object.keys(fields).filter((field) =>
		entity.primaryFields.includes(field)
	);

	if (!select.includes("id")) select.push("id");

	const relations = Object.keys(fields).filter((field) =>
		entity.relationalFields.includes(field)
	);

	return { select, relations };
};

export interface SelectAndRelationOptions<T> {
	select: keyof T[];
	relations: string[];
}
