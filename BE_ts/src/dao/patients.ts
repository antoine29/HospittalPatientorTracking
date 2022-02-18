import { prismaClient, Patient } from '../../prisma'
import { NexusGenFieldTypes } from '../../nexus-typegen'

type NewPatient = Omit<Patient, 'id'>

export const GetPatients = async () => {
	return await prismaClient.patient.findMany();
}

export const GetPatient = async (patientId: string) => {
	return await prismaClient.patient.findUnique({
		where: { id: patientId },
		include: {
			healthCheckEntries: {
				include: {
					diagnoses: true
				}
			},
			hospitalEntries: {
				include: {
					diagnoses: true
				}
			},
			occupationalHealthEntries: {
				include: {
					diagnoses: true
				}
			}
		}
	});
}

export const CreatePatient = async (patient: NewPatient) => {
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
