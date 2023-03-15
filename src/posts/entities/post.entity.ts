import { ApiProperty } from '@nestjs/swagger'
import {
	BelongsTo,
	Column,
	DataType,
	ForeignKey,
	Model,
	Table,
} from 'sequelize-typescript'
import { User } from 'src/users/entities/user.entity'

interface PostCreationAttr {
	title: string
	content: string
	userId: number
	image: string
}

@Table({ tableName: 'posts' })
export class Post extends Model<Post, PostCreationAttr> {
	@ApiProperty({
		example: 1,
		description: 'Уникальный идентификатор поста',
	})
	@Column({
		type: DataType.INTEGER,
		unique: true,
		autoIncrement: true,
		primaryKey: true,
	})
	id: number

	@ApiProperty({
		example: 'Разработка на Nest.js',
		description: 'Заголовок поста',
	})
	@Column({ type: DataType.STRING, allowNull: false })
	title: string

	@ApiProperty({ example: 'test_123', description: 'Тело поста' })
	@Column({ type: DataType.STRING, allowNull: false })
	content: string

	@ApiProperty({ example: '', description: 'Картинка поста' })
	@Column({ type: DataType.STRING, defaultValue: '' })
	image: string

	@ForeignKey(() => User)
	@ApiProperty({ example: 5, description: 'Идентификатор пользователя' })
	@Column({ type: DataType.INTEGER })
	userId: number

	@BelongsTo(() => User)
	author: User
}
