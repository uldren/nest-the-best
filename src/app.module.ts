import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { SequelizeModule } from '@nestjs/sequelize'
import { UsersModule } from './users/users.module'
import { RolesModule } from './roles/roles.module'
import { User } from './users/entities/user.entity'
import { Role } from './roles/entities/role.entity'
import { Post } from './posts/entities/post.entity'
import { UserRoles } from './roles/entities/user-roles.entity'
import { AuthModule } from './auth/auth.module'
import { PostsModule } from './posts/posts.module'
import { FilesModule } from './files/files.module'
import { ServeStaticModule } from '@nestjs/serve-static'
import * as path from 'path'

@Module({
	imports: [
		ConfigModule.forRoot({
			envFilePath: `.env.${process.env.NODE_ENV}`,
		}),

		SequelizeModule.forRoot({
			dialect: 'postgres',
			host: process.env.POSTGRES_HOST,
			port: Number(process.env.POSTGRES_PORT),
			username: process.env.POSTGRES_USER,
			password: process.env.POSTGRES_PASSWORD,
			database: process.env.POSTGRES_DB,
			models: [User, Role, UserRoles, Post],
			autoLoadModels: true,
			synchronize: true,
		}),

		ServeStaticModule.forRoot({
			rootPath: path.resolve(__dirname, 'static'),
		}),

		UsersModule,

		RolesModule,

		AuthModule,

		PostsModule,

		FilesModule,
	],
	controllers: [],
	providers: [],
})
export class AppModule {}
