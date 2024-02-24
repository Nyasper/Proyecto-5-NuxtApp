export default defineEventHandler(async (event) => {
	try {
		const Students = await getAllCharasName();
		if (Students) {
			return Students;
		}
		throw new Error(
			'\nERROR Student no existe en archivo getCharasDB.get.ts\n'
		);
	} catch (error) {
		console.error(error);
		return null;
	}
});

import { getAllCharasName } from '../db/postgreSql';
