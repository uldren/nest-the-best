import { ApiProperty } from '@nestjs/swagger'
import {
	BelongsToMany,
	Column,
	DataType,
	HasMany,
	Model,
	Table,
} from 'sequelize-typescript'
import { Post } from 'src/posts/entities/post.entity'
import { Role } from 'src/roles/entities/role.entity'
import { UserRoles } from 'src/roles/entities/user-roles.entity'

interface UserCreationAttr {
	readonly email: string
	readonly password: string
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttr> {
	@ApiProperty({
		example: 1,
		description: 'Уникальный идентификатор пользователя',
	})
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number

	@ApiProperty({
		example: 'example@email.com',
		description: 'Почта потльзователя',
	})
	@Column({ type: DataType.STRING, unique: true, allowNull: false })
	email: string

	@ApiProperty({ example: 'test_123', description: 'Пароль пользователя' })
	@Column({ type: DataType.STRING, allowNull: false })
	password: string

	@ApiProperty({ example: true, description: 'забанен ли пользователь' })
	@Column({ type: DataType.BOOLEAN, defaultValue: false })
	banned: boolean

	@ApiProperty({
		example: 'За хулиганство',
		description: 'Причина блокировки',
	})
	@Column({ type: DataType.STRING, allowNull: true })
	banReason: string

	@BelongsToMany(() => Role, () => UserRoles)
	roles: Role[]

	@HasMany(() => Post)
	posts: Post[]
}
