import { Controller, Post, Body } from '@nestjs/common'
import { ApiTags } from '@nestjs/swagger'
import { CreateUserDto } from 'src/users/dto/create-user.dto'
import { AuthService } from './auth.service'

@ApiTags('Авторизация')
@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('login')
	login(@Body() userDto: CreateUserDto) {
		return this.authService.login(userDto)
	}

	@Post('registration')
	registartion(@Body() userDto: CreateUserDto) {
		return this.authService.registartion(userDto)
	}
}
