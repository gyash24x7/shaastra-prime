export default (fields: any, repo: any) => {
	const select: any[] = Object.keys(fields).filter((field) =>
		repo.primaryFields.includes(field)
	);

	const relations = Object.keys(fields).filter((field) =>
		repo.relationalFields.includes(field)
	);

	return { select, relations };
};

export interface SelectAndRelationOptions<T> {
	select: keyof T[];
	relations: string[];
}
