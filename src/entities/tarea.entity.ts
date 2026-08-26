import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
} from "typeorm";
import { Usuario } from "./usuario.entity";
import { EntityBase } from "./common/base.entity";

@Entity()
export class Tarea extends EntityBase {
	@Column()
	nombre: string;

	@Column()
	descripcion: string;

	@Column({ type: "timestamptz" })
	fechaLimite: Date;

	@Column({ default: false })
	estado: boolean;

	@ManyToOne(() => Usuario)
	@JoinColumn({ name: "userEmail", referencedColumnName: "email" })
	user: Usuario;

	@Column()
	userEmail: string;
}
