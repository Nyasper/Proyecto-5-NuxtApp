export async function downloadFilesFromFron(charas: ICharaFiles[]) {
	const Promises = charas.map(async (chara) => {
		await downloadFiles(chara);
		await charaFilesDownloaded(chara);
	});
	return await Promise.all(Promises);
}

import downloadFiles from '../func/downloadFiles';
import { charaFilesDownloaded } from '../db/postgreSql';
import type { ICharaFiles } from '../models/studentsModel';
