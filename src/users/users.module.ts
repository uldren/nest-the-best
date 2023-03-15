import { forwardRef, Module } from '@nestjs/common'
import { UsersService } from './users.service'
import { UsersController } from './users.controller'
import { SequelizeModule } from '@nestjs/sequelize'
import { User } from './entities/user.entity'
import { Role } from 'src/roles/entities/role.entity'
import { Post } from 'src/posts/entities/post.entity'
import { UserRoles } from 'src/roles/entities/user-roles.entity'
import { RolesModule } from 'src/roles/roles.module'
import { AuthModule } from 'src/auth/auth.module'

@Module({
	imports: [
		SequelizeModule.forFeature([User, Role, UserRoles, Post]),
		RolesModule,
		forwardRef(() => AuthModule),
	],
	controllers: [UsersController],
	providers: [UsersService],
	exports: [UsersService],
})
export class UsersModule {}
