import {
	Column,
	CreateDateColumn,
	Entity,
	JoinColumn,
	ManyToOne,
} from "typeorm";
import { Usuario } from "../../usuarios/entities/usuario.entity";

@Entity()
export class Tarea {
	@Column({ primary: true, generated: true })
	id: number;

	@Column()
	nombre: string;

	@Column()
	descripcion: string;

	// La fecha de creación se obtiene automáticamente
	@CreateDateColumn({ type: "timestamptz" })
	fechaCreacion: Date;

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
