import { TaskActivityType } from ".";
import { Channel } from "../entities/Channel";
import { User } from "../entities/User";

interface TaskActivityDescriptionOptions {
	type: TaskActivityType;
	user: User;
	assignedTo?: User[];
	mediaLength?: number;
	newChannels?: Channel[];
}

export default (options: TaskActivityDescriptionOptions) => {
	switch (options.type) {
		case TaskActivityType.IN_PROGRESS:
			return `${options.user.name} started working on the task.`;

		case TaskActivityType.ASSIGNED:
			return (
				`${options.user.name}` +
				" assigned the task to " +
				`${options.assignedTo?.map((user) => user.name + ", ")}`
			);

		case TaskActivityType.ATTACH_MEDIA:
			return `${options.user.name} attached ${options.mediaLength} media files to this task.`;

		case TaskActivityType.COMPLETED:
			return `${options.user.name} marked the task as completed.`;

		case TaskActivityType.CONNECT_CHANNEL:
			return (
				`${options.user?.name} ` +
				"connected the following channels to this task: " +
				`${options.newChannels?.map(({ name }) => name + ", ")}`
			);

		case TaskActivityType.CREATED:
			return `${options.user?.name} created the task.`;

		case TaskActivityType.SUBMITTED:
			return `${options.user?.name} submitted the task.`;

		default:
			return `${options.user?.name} deleted the task.`;
	}
};
