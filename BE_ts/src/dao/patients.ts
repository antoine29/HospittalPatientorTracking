import { db } from './db'

export const GetPatients = async () => {
	return db.patient.findMany();
}

export const GetPatient = async (patientId: string) => {
	return await db.patient.findUnique({
		where: { id: patientId },
	});
}

export const CreatePatient = async patient => {
	return db.patient.create({
		data: {
			name: patient.name,
			dateOfBirth: patient.dateOfBirth,
			ssn: patient.ssn,
			gender: patient.gender,
			occupation: patient.occupation
		}
	});
}