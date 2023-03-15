import { ApiProperty } from '@nestjs/swagger'
import {
	BelongsToMany,
	Column,
	DataType,
	Model,
	Table,
} from 'sequelize-typescript'
import { User } from 'src/users/entities/user.entity'
import { UserRoles } from './user-roles.entity'

interface RoleCreationAttr {
	readonly value: string
	readonly description: string
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleCreationAttr> {
	@ApiProperty({
		example: 1,
		description: 'Уникальный идентификатор роли',
	})
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number

	@ApiProperty({
		example: 'ADMIN',
		description: 'Роль пользователя',
	})
	@Column({ type: DataType.STRING, unique: true, allowNull: false })
	value: string

	@ApiProperty({ example: 'Администратор', description: 'Описание роли' })
	@Column({ type: DataType.STRING, allowNull: false })
	description: string

	@BelongsToMany(() => User, () => UserRoles)
	users: User[]
}
