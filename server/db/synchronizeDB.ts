import { getAllCharas } from './postgreSql';
import { deleteAllCharasMongoDB, saveManyCharasMongoDB } from './mongoDB';
import { disconnect } from 'mongoose';

export async function actualizarMongoDB(): Promise<void> {
	try {
		const allCharasPostgreSQL = await getAllCharas(); //get Charas of

		await deleteAllCharasMongoDB();
		await saveManyCharasMongoDB(allCharasPostgreSQL);
	} catch (error) {
		console.error(
			'\nError al intentar actualizar MongoDB desde PostgreSQL:\n',
			error
		);
	} finally {
		disconnect();
	}
}
