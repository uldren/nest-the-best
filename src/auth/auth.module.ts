import { Module, forwardRef } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { UsersModule } from 'src/users/users.module'
import { JwtModule } from '@nestjs/jwt'

@Module({
	controllers: [AuthController],
	providers: [AuthService],
	imports: [
		forwardRef(() => UsersModule),
		JwtModule.register({
			secret: process.env.AUTH_PRIVATE_KEY || 'SeCrEt',
			signOptions: {
				expiresIn: '24h',
			},
		}),
	],
	exports: [AuthService, JwtModule],
})
export class AuthModule {}
