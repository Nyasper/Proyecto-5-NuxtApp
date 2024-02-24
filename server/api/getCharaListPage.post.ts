export default defineEventHandler(async (event) => {
	try {
		const charasFromBody: IcharaListPage[] = await readBody(event);

		const charas = await scanCharaInformation(charasFromBody);
		if (charas) {
			await updatePostgreSql(charas);
			await actualizarMongoDB();
		} else
			throw new Error(
				'Error al intentar guardar personajes en PostgreSql, desde getCharaListPage.post.ts'
			);

		return 200;
	} catch (error) {
		console.error(error);
		return [];
	}
});

import {
	scanCharaInformation,
	updatePostgreSql,
} from '../controllers/charaListPageController';
import type { IcharaListPage } from '../models/studentsModel';
import { actualizarMongoDB } from '../db/synchronizeDB';
