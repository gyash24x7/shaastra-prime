import {
	PrimaryGeneratedColumn,
	Column,
	CreateDateColumn,
	Entity
} from "typeorm";

@Entity()
export class Channel {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	name: string;

	@Column()
	description: string;

	@CreateDateColumn()
	createdAt: Date;

	@Column({ default: false })
	isArchived: boolean;
}
