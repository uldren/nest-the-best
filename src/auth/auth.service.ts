import {
	HttpException,
	HttpStatus,
	Injectable,
	UnauthorizedException,
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import { CreateUserDto } from 'src/users/dto/create-user.dto'
import { UsersService } from 'src/users/users.service'
import * as bcrypt from 'bcryptjs'
import { User } from 'src/users/entities/user.entity'

@Injectable()
export class AuthService {
	constructor(
		private userService: UsersService,
		private jwtService: JwtService,
	) {}

	async login(userDto: CreateUserDto) {
		const user = await this.validateUser(userDto)
		return this.generateToken(user)
	}

	async registartion(userDto: CreateUserDto) {
		const user = await this.userService.getUserByEmail(userDto.email)

		if (user) {
			throw new HttpException(
				'Пользователь с таким email уже существует',
				HttpStatus.BAD_REQUEST,
			)
		}

		const hashPassword = await bcrypt.hash(userDto.password, 5)
		const newUser = await this.userService.create({
			...userDto,
			password: hashPassword,
		})
		return this.generateToken(newUser)
	}

	private async generateToken(user: User) {
		const payload = { email: user.email, id: user.id, roles: user.roles }

		return {
			token: this.jwtService.sign(payload),
		}
	}

	private async validateUser(userDto: CreateUserDto) {
		const user = await this.userService.getUserByEmail(userDto.email)

		const comparePassword = await bcrypt.compare(
			userDto.password,
			user ? user.password : '',
		)

		if (user && comparePassword) {
			return user
		}

		throw new UnauthorizedException({
			message: 'Некорректный email или пароль',
		})
	}
}
