import { Column, Entity } from "typeorm";
import { Role } from "../common/enums/rol.enum";
import { EntityBase } from "./common/base.entity";

@Entity()
export class Usuario extends EntityBase {
	@Column()
	name: string;

	@Column({ unique: true })
	email: string;

	@Column({ nullable: true, select: false })
	password: string;

	@Column({ type: "enum", enum: Role, default: Role.USER })
	role: Role;
}
