import { db } from './db'

export const GetDiagnoses = async () => {
	return db.diagnosis.findMany();
}

export const CreateDiagnosis = async diagnosis => {
	return db.diagnosis.create({
		data: {
			code: diagnosis.code,
			name: diagnosis.name,
			latin: diagnosis.latin,
		}
	});
}