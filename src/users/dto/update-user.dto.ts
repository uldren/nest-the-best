import { ApiProperty, IntersectionType } from '@nestjs/swagger'
import { CreateUserDto } from './create-user.dto'

class AdditionalUserDto {
	@ApiProperty({ example: false, description: 'забанен ли пользователь' })
	banned: boolean

	@ApiProperty({
		example: 'За хулиганство',
		description: 'Причина блокировки',
	})
	banReason: string
}

export class UpdateUserDto extends IntersectionType(
	CreateUserDto,
	AdditionalUserDto,
) {}
