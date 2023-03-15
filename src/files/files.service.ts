import { HttpException, HttpStatus, Injectable } from '@nestjs/common'
import * as fs from 'fs'
import * as path from 'path'
import * as uuid from 'uuid'

@Injectable()
export class FilesService {
	async createFile(file: any): Promise<string> {
		try {
			const fileName = uuid.v4() + '.jpg'
			const filePath = path.resolve(__dirname, '..', 'static')

			if (!fs.existsSync(filePath)) {
				fs.mkdirSync(filePath, { recursive: true })
			}

			const fullPathToNewFile = path.join(filePath, fileName)

			fs.writeFileSync(fullPathToNewFile, file.buffer)

			return fileName
		} catch (error) {
			throw new HttpException(
				'Произошла ошибка записи файла',
				HttpStatus.INTERNAL_SERVER_ERROR,
			)
		}
	}
}
