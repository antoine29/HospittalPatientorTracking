import { prismaClient, HealthCheckEntry } from './prisma'

export const GetHealthCheckEntries = async () => {
	return await prismaClient.healthCheckEntry.findMany({
		include: {
			patient: true,
			diagnoses: true
		}
	});
}

export const CreateHealthCheckEntry = async (entry: HealthCheckEntry) => {
	return await prismaClient.healthCheckEntry.create({
		data: {
			description: entry.description,
			date: entry.date,
			specialist: entry.specialist,
			type: entry.type,
			healthCheckRating: entry.healthCheckRating,
			patient: {
				connect: { id: entry.patientId }
			},
			diagnoses: {
				connect: entry.diagnosisIDs.map(id => {return { id }})
			}
		},
		include: {
			patient: true,
			diagnoses: true
		}
	});
}