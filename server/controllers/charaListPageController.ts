export async function scanCharaInformation(charasFromBody: IcharaListPage[]) {
	try {
		const Promises = charasFromBody.map(
			async (chara) => await scanCharaInfo(chara.charaName)
		);
		return await Promise.all(Promises);
	} catch (error) {
		throw new Error(
			`ERROR al intentar escanear la informacion de un personaje.\n${error}`
		);
	}
}

export async function updatePostgreSql(charas: IStudent[]) {
	try {
		const Promises = charas.map(async (chara) => {
			return await insertOneChara(chara);
		});
		return await Promise.all(Promises);
	} catch (error) {
		throw new Error(
			'ERROR al intentar insertar personajes en funcion "updatePostgreSql"'
		);
	}
}

export async function updateMongoDB() {}

import scanCharaInfo from '../func/scanCharaInfo';
import { insertOneChara } from '../db/postgreSql';
import type { IStudent, IcharaListPage } from '../models/studentsModel';
