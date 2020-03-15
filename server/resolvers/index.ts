import { ChannelResolver } from "./Channel";
import { DepartmentResolver } from "./Department";
import { UserResolver } from "./User";

export const resolvers = [DepartmentResolver, UserResolver, ChannelResolver];
