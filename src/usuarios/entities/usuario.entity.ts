import { Column, DeleteDateColumn, Entity } from "typeorm";
import { Role } from "../../common/enums/rol.enum";

@Entity()
export class Usuario {
	@Column({ primary: true, generated: true })
	id: number;

	@Column()
	name: string;

	@Column({ unique: true })
	email: string;

	@Column({ nullable: true, select: false })
	password: string;

	@Column({ type: "enum", enum: Role, default: Role.USER })
	role: Role;

	@DeleteDateColumn()
	deletedAt: Date;
}
