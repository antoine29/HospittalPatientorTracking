import { prismaClient, Patient } from './prisma'

export const GetPatients = async () => {
	return await prismaClient.patient.findMany();
}

export const GetPatient = async (patientId: string) => {
	return await prismaClient.patient.findUnique({
		where: { id: patientId },
		include: {
			healthCheckEntries: true
		}
	});
}

export const CreatePatient = async (patient: Patient) => {
	return await prismaClient.patient.create({
		data: {
			name: patient.name,
			dateOfBirth: patient.dateOfBirth,
			ssn: patient.ssn,
			gender: patient.gender,
			occupation: patient.occupation
		}
	});
}