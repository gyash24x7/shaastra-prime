import { CreateVerticalResolver } from "./CreateVertical";
import { DeleteVerticalResolver } from "./DeleteVertical";
import { VerticalFieldResolvers } from "./FieldResolvers";
import { GetVerticalsResolver } from "./GetVerticals";
import { UpdateVerticalResolver } from "./UpdateVertical";

export default [
	GetVerticalsResolver,
	CreateVerticalResolver,
	UpdateVerticalResolver,
	DeleteVerticalResolver,
	VerticalFieldResolvers
];
