import { IsInt, IsString } from 'class-validator'

export class SetRoleDto {
	@IsString({ message: 'Должно быть строкой' })
	readonly value: string
	@IsInt({ message: 'Должно быть целым числом' })
	readonly userId: number
}
