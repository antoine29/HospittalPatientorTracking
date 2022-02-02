import { db } from './db'

export const GetDiagnoses = async () => {
	return await db.diagnosis.findMany();
}

export const CreateDiagnosis = async diagnosis => {
	return await db.diagnosis.create({
		data: {
			code: diagnosis.code,
			name: diagnosis.name,
			latin: diagnosis.latin,
		}
	});
}