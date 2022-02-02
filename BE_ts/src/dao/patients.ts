import { db } from './db'

export const GetPatients = async () => {
	return await db.patient.findMany();
}

export const GetPatient = async (patientId: string) => {
	return await db.patient.findUnique({
		where: { id: patientId },
		include: {
			healthCheckEntries: true
		}
	});
}

export const CreatePatient = async patient => {
	return await db.patient.create({
		data: {
			name: patient.name,
			dateOfBirth: patient.dateOfBirth,
			ssn: patient.ssn,
			gender: patient.gender,
			occupation: patient.occupation
		}
	});
}