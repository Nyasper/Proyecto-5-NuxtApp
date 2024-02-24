export default defineEventHandler(async (event) => {
	try {
		const charaList = await scanList();
		if (charaList) {
			return charaList;
		}
		throw new Error(
			'\nERROR charaList no existe en archivo getCharaListPage.get.ts\n'
		);
	} catch (error) {
		console.error(error);
		return null;
	}
});

import { scanList } from '../func/scanCharaList';
