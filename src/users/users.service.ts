import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { RolesService } from 'src/roles/roles.service'
import { BanUserDto } from './dto/ban-user.dto'
import { CreateUserDto } from './dto/create-user.dto'
import { SetRoleDto } from './dto/set-role.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { User } from './entities/user.entity'

@Injectable()
export class UsersService {
	constructor(
		@InjectModel(User)
		private userModel: typeof User,
		private roleServise: RolesService,
	) {}

	async create(createUserDto: CreateUserDto): Promise<User> {
		const user = await this.userModel.create(createUserDto)
		const role = await this.roleServise.findOne('USER')
		await user.$set('roles', [role.id])
		user.roles = [role] //дабы заново не производить поиск пользователя и не подтягивать все связи

		return user
	}

	async findAll(): Promise<User[]> {
		return this.userModel.findAll({ include: { all: true } })
	}

	async findOne(id: number): Promise<User | null> {
		const user = await this.userModel.findOne({
			include: { all: true },
			where: { id },
		})

		return user
	}

	async update(id: number, updateUserDto: UpdateUserDto): Promise<User | null> {
		const result = await this.userModel.update(updateUserDto, {
			where: { id },
		})

		if (result) {
			const user = await this.userModel.findOne({
				where: { id },
			})

			return user
		} else {
			return null
		}
	}

	async remove(id: number): Promise<void> {
		const user = await this.userModel.findOne({ where: { id } })
		await user?.destroy()
	}

	async getUserByEmail(email: string) {
		const user = await this.userModel.findOne({
			where: { email },
			include: { all: true },
		})

		return user
	}

	async setRole(dto: SetRoleDto) {
		const user = await this.userModel.findByPk(dto.userId)
		const role = await this.roleServise.findOne(dto.value)

		if (user && role) {
			await user.$add('roles', role.id)
			return dto
		}

		throw new HttpException(
			'Роль или пользователь не найдены',
			HttpStatus.NOT_FOUND,
		)
	}

	async ban(dto: BanUserDto) {
		const user = await this.userModel.findByPk(dto.userId)

		if (!user) {
			throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND)
		}

		user.banned = true
		user.banReason = dto.banReason
		await user.save()

		return user
	}
}
