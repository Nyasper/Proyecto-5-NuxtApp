import { Students } from '../models/studentsModel';
import type { IStudent, ICharaFiles } from '../models/studentsModel';

export async function getOneStudent(charaname: string): Promise<IStudent | []> {
	try {
		const chara = await Students.findOne({ where: { charaname } });
		const Student: IStudent = {
			charaName: chara?.dataValues.charaname,
			name: chara?.dataValues.name,
			lastName: chara?.dataValues.lastname,
			school: chara?.dataValues.school,
			role: chara?.dataValues.role,
			combatClass: chara?.dataValues.combatclass,
			weaponType: chara?.dataValues.weapontype,
			age: chara?.dataValues.age,
			birthday: chara?.dataValues.birthday,
			height: chara?.dataValues.height,
			hobbies: chara?.dataValues.hobbies,
			designer: chara?.dataValues.designer,
			illustrator: chara?.dataValues.illustrator,
			voice: chara?.dataValues.voice,
			releaseDate: chara?.dataValues.releasedate,
			skinSet: chara?.dataValues.skinset,
			pageUrl: chara?.dataValues.pageurl,
			pageImageProfileUrl: chara?.dataValues.pageimageprofileurl,
			pageImageFullUrl: chara?.dataValues.pageimagefullurl,
			audioUrl: chara?.dataValues.audiourl,
			files: chara?.dataValues.files,
		};
		return Student;
	} catch (error) {
		console.error(
			`\n Error al intentar OBTENER los datos de "${
				charaname || 'undefined'
			}" desde la tabla "students" \n`,
			error
		);
		return [];
	}
}

export async function getAllCharas(): Promise<IStudent[] | []> {
	try {
		const allStudents = await Students.findAll({
			order: [['charaname', 'ASC']],
		});

		const charas: IStudent[] = allStudents.map((chara) => ({
			charaName: chara.dataValues.charaname,
			name: chara.dataValues.name,
			lastName: chara.dataValues.lastname,
			school: chara.dataValues.school,
			role: chara.dataValues.role,
			combatClass: chara.dataValues.combatclass,
			weaponType: chara.dataValues.weapontype,
			age: chara.dataValues.age,
			birthday: chara.dataValues.birthday,
			height: chara.dataValues.height,
			hobbies: chara.dataValues.hobbies,
			designer: chara.dataValues.designer,
			illustrator: chara.dataValues.illustrator,
			voice: chara.dataValues.voice,
			releaseDate: chara.dataValues.releasedate,
			skinSet: chara.dataValues.skinset,
			pageUrl: chara.dataValues.pageurl,
			pageImageProfileUrl: chara.dataValues.pageimageprofileurl,
			pageImageFullUrl: chara.dataValues.pageimagefullurl,
			audioUrl: chara.dataValues.audiourl,
			files: chara.dataValues.files,
			createdAt: chara.dataValues.createdAt,
		}));
		return charas;
	} catch (error) {
		console.error(
			'\n Error al intentar OBTENER todos los personajes de la tabla "students" \n',
			error
		);
		return [];
	}
}

export async function getAllCharasName(): Promise<
	{ charaName: string }[] | []
> {
	try {
		const charaNames = await Students.findAll({
			attributes: ['charaname'],
			order: [['charaname', 'ASC']],
		});

		return charaNames.map((charaname) => ({
			charaName: charaname.dataValues.charaname as string,
		}));
	} catch (error) {
		console.error(
			'\nError al Intentar OBTENER todos los "charaNames" de la tabla students\n',
			error
		);
		return [];
	}
}

export async function getAllCharasWithoutFiles(): Promise<ICharaFiles[]> {
	try {
		const charas = await Students.findAll({
			attributes: [
				'charaname',
				'name',
				'school',
				'pageimageprofileurl',
				'pageimagefullurl',
				'pageurl',
				'audiourl',
				'files',
			],
			where: { files: false },
			order: [['charaname', 'ASC']],
		});

		return charas.map((chara) => ({
			charaName: chara.dataValues.charaname as string,
			name: chara.dataValues.name as string,
			school: chara.dataValues.school as string,
			pageImageProfileUrl: chara.dataValues.pageimageprofileurl as string,
			pageImageFullUrl: chara.dataValues.pageimagefullurl as string,
			pageUrl: chara.dataValues.pageurl as string,
			audioUrl: chara.dataValues.audiourl as string,
			files: chara.dataValues.files as boolean,
		}));
	} catch (error) {
		console.error(
			'\n ERROR al intentar OBTENER TODOS LOS PERSONAJES SIN ARCHIVOS \n',
			error
		);
		return [];
	}
}

export const insertOneChara = async (chara: IStudent): Promise<void> => {
	try {
		await Students.create({
			charaname: chara.charaName,
			name: chara.name,
			lastname: chara.lastName,
			school: chara.school,
			role: chara.role,
			combatclass: chara.combatClass,
			weapontype: chara.weaponType,
			age: chara.age,
			birthday: chara.birthday,
			height: chara.height,
			hobbies: chara.hobbies,
			designer: chara.designer,
			illustrator: chara.illustrator,
			voice: chara.voice,
			releasedate: chara.releaseDate,
			skinset: chara.skinSet,
			pageurl: chara.pageUrl,
			pageimageprofileurl: chara.pageImageProfileUrl,
			pageimagefullurl: chara.pageImageFullUrl,
			audiourl: chara.audioUrl,
		});

		console.log(`\n💚 ${chara.charaName} 💚\n`);
	} catch (error) {
		throw new Error(`\n Error al INSERTAR insertar a: "${chara.charaName}" \n`);
	}
};

export async function charaFilesDownloaded(chara: ICharaFiles): Promise<void> {
	try {
		await Students.update(
			{ files: true },
			{ where: { charaname: chara.charaName, files: false } }
		);
		console.log(
			`\n 💚 DESCARGADO TODOS LOS ARCHIVOS de "${chara.charaName}" 💚\n`
		);
	} catch (error) {
		throw new Error(
			`\n Error al intentar ACTUALIZAR FILES a TRUE de "${chara.charaName}" en postgreSQL" \n`
		);
	}
}
