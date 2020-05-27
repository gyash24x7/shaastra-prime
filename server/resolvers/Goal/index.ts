import { CompleteMilestoneResolver } from "./CompleteMilestone";
import { CreateGoalResolver } from "./CreateGoal";
import { GoalFieldResolvers } from "./FieldResolvers";
import { GetGoalsResolver } from "./GetGoals";

export default [
	CreateGoalResolver,
	GetGoalsResolver,
	GoalFieldResolvers,
	CompleteMilestoneResolver
];
