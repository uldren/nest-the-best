import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/sequelize'
import { CreateRoleDto } from './dto/create-role.dto'
import { Role } from './entities/role.entity'

@Injectable()
export class RolesService {
	constructor(
		@InjectModel(Role)
		private roleModel: typeof Role,
	) {}

	async create(createRoleDto: CreateRoleDto): Promise<Role> {
		const role = await this.roleModel.create(createRoleDto)
		return role
	}

	async findOne(value: string): Promise<Role> {
		const role = await this.roleModel.findOne({ where: { value } })
		return role!
	}
}
