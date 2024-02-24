import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config({ path: 'server/.env' });
let sequelize: MySequelizeInstance;

if (
	process.env.PG_LOCAL_DATABASE &&
	process.env.PG_LOCAL_USER &&
	process.env.PG_LOCAL_PASS &&
	process.env.PG_LOCAL_HOST &&
	process.env.PG_LOCAL_PORT
) {
	sequelize = new Sequelize(
		`postgres://${process.env.PG_LOCAL_USER}:${process.env.PG_LOCAL_PASS}@${process.env.PG_LOCAL_HOST}:${process.env.PG_LOCAL_PORT}/${process.env.PG_LOCAL_DATABASE}`,
		{
			logging: false,
		}
	);
} else {
	throw new Error(
		'No se han configurado correctamente las variables de entorno para la conexión a la base de datos.'
	);
}

export interface MySequelizeInstance extends Sequelize {}
export default sequelize;
