import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common'
import { plainToInstance } from 'class-transformer'
import { validate } from 'class-validator'
import { ValidationException } from 'src/exceptions/validation.exception'

@Injectable()
export class ValidationPipe implements PipeTransform {
	async transform(value: any, { metatype }: ArgumentMetadata): Promise<any> {
		const obj = plainToInstance(metatype as any, value)
		const errors = await validate(obj)

		if (errors.length) {
			const messages: string[] = errors.map(err => {
				return `${err.property} - ${Object.values(
					err.constraints ? err.constraints : '',
				).join(', ')}`
			})

			throw new ValidationException(messages)
		}
		return value
	}
}
