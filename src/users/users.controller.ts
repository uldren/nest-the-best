import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
	UsePipes,
} from '@nestjs/common'
import { UsersService } from './users.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger'
import { User } from './entities/user.entity'
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard'
import { Roles } from 'src/auth/roles-auth.decorator'
import { RolesGuard } from 'src/auth/roles.guard'
import { SetRoleDto } from './dto/set-role.dto'
import { BanUserDto } from './dto/ban-user.dto'
import { ValidationPipe } from 'src/pipes/validation.pipe'

@ApiTags('Пользователи')
@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@ApiOperation({ summary: 'Создание нового пользователя' })
	@ApiResponse({
		status: 201,
		description: 'Пользователь успешно создан',
		type: User,
	})
	@UsePipes(ValidationPipe)
	@Post()
	create(@Body() createUserDto: CreateUserDto) {
		return this.usersService.create(createUserDto)
	}

	@ApiOperation({ summary: 'Получение всех пользователей' })
	@ApiResponse({ status: 200, type: [User] })
	@Get()
	findAll() {
		return this.usersService.findAll()
	}

	@ApiOperation({ summary: 'Получение пользователя по id' })
	@ApiResponse({ status: 200, type: User })
	@Get(':id')
	findOne(@Param('id') id: number): Promise<User | null> {
		return this.usersService.findOne(id)
	}

	@ApiOperation({ summary: 'Обновление данных пользователя по id' })
	@ApiResponse({ status: 200, type: Promise<User | null> })
	@Patch(':id')
	update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
		return this.usersService.update(id, updateUserDto)
	}

	@ApiOperation({ summary: 'Удаление пользователя по id' })
	@ApiResponse({ status: 200, type: User })
	@Delete(':id')
	remove(@Param('id') id: number) {
		return this.usersService.remove(id)
	}

	@ApiOperation({ summary: 'Назначение роли пользователю' })
	@ApiResponse({ status: 200 })
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Post('role')
	setRole(@Body() dto: SetRoleDto) {
		return this.usersService.setRole(dto)
	}

	@ApiOperation({ summary: 'Бан пользователя' })
	@ApiResponse({ status: 200 })
	@Roles('ADMIN')
	@UseGuards(RolesGuard)
	@Post('ban')
	ban(@Body() dto: BanUserDto) {
		return this.usersService.ban(dto)
	}
}
