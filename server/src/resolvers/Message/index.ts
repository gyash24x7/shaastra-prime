import { CreateMessageResolver } from "./CreateMessage";
import { MessageFieldResolvers } from "./FieldResolvers";
import { GetMessagesResolver } from "./GetMessages";
import { NewMessageResolver } from "./NewMessage";
import { UpdateMessageResolver } from "./UpdateMessage";

export default [
	MessageFieldResolvers,
	CreateMessageResolver,
	UpdateMessageResolver,
	GetMessagesResolver,
	NewMessageResolver
];
