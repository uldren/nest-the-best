import { ApiProperty } from '@nestjs/swagger'
import {
	Column,
	DataType,
	ForeignKey,
	Model,
	Table,
} from 'sequelize-typescript'
import { User } from 'src/users/entities/user.entity'
import { Role } from './role.entity'

@Table({ tableName: 'user_roles', createdAt: false, updatedAt: false })
export class UserRoles extends Model<UserRoles> {
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
		example: '1',
		description: 'Идентификатор роли',
	})
	@ForeignKey(() => Role)
	@Column({ type: DataType.INTEGER })
	roleId: number

	@ApiProperty({
		example: '1',
		description: 'Идентификатор пользователя',
	})
	@ForeignKey(() => User)
	@Column({ type: DataType.INTEGER })
	userId: number
}
