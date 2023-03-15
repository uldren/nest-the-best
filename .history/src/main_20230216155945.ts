import { NestFactory } from '@nestjs/core'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger'
import { AppModule } from './app.module'

async function bootstrap() {
	const port = process.env.PORT || 3000
	const app = await NestFactory.create(AppModule)

	const config = new DocumentBuilder()
		.setTitle('Тестирование NestJS')
		.setDescription('Документация REST API')
		.setVersion('1.0.0')
		.addTag('Todo List')
		.build()
	const document = SwaggerModule.createDocument(app, config)
	SwaggerModule.setup('/api/docs', app, document)

	//app.useGlobalGuards(JwtAuthGuard)

	await app.listen(port)

	console.log(`Application is running on: ${await app.getUrl()}`)
}

bootstrap()
