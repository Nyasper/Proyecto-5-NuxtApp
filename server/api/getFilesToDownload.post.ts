export default defineEventHandler(async (event) => {
	try {
		const body: ICharaFiles[] = await readBody(event);
		console.log(
			`${body.length} Personajes para descargar archivos desde el front`
		);
		await downloadFilesFromFron(body);

		return {
			status: 200,
			message: 'Todos los archivos descargados exitosamente',
		};
	} catch (error) {
		console.error(error);
		return [];
	}
});

import type { ICharaFiles } from '../models/studentsModel';
import { downloadFilesFromFron } from '../controllers/downloadFilesController';
