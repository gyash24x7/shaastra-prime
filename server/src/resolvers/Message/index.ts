import { CreateMediaMessageResolver } from "./CreateMediaMessage";
import { CreateTextMessageResolver } from "./CreateTextMessage";
import { MessageFieldResolvers } from "./FieldResolvers";
import { GetMessagesResolver } from "./GetMessages";
import { NewMessageResolver } from "./NewMessage";
import { ToggleMessageLikeResolver } from "./ToggleMessageLike";
import { ToggleMessageStarResolver } from "./ToggleMessageStar";

export default [
	MessageFieldResolvers,
	CreateTextMessageResolver,
	CreateMediaMessageResolver,
	ToggleMessageStarResolver,
	ToggleMessageLikeResolver,
	GetMessagesResolver,
	NewMessageResolver
];
