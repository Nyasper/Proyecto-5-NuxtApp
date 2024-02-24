export default defineEventHandler(async (event) => {
	try {
		const Students = await getAllCharasWithoutFiles();

		if (Students) {
			return Students;
		}
		throw new Error(
			'\nERROR Student no existe en archivo getFilesToDownload.get.ts\n'
		);
	} catch (error) {
		console.error(error);
		return [];
	}
});

import { getAllCharasWithoutFiles } from '../db/postgreSql';
