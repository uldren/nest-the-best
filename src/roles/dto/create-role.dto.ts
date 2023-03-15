import { ApiProperty } from '@nestjs/swagger'

export class CreateRoleDto {
	@ApiProperty({
		example: 'ADMIN',
		description: 'Тип роли',
	})
	value: string

	@ApiProperty({
		example: 'Администратор',
		description: 'Описание роли',
	})
	description: string
}
