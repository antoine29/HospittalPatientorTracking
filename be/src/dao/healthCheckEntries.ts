import { prismaClient, HealthCheckEntry } from '../../prisma'
  
type NewHealthCheckEntry = Omit<HealthCheckEntry, 'id' | 'type'>;

export const GetHealthCheckEntries = async () => {
	return await prismaClient.healthCheckEntry.findMany({
		include: {
			patient: true,
			diagnoses: true
		}
	});
}

export const CreateHealthCheckEntry = async (entry: NewHealthCheckEntry) => {
	return await prismaClient.healthCheckEntry.create({
		data: {
			description: entry.description,
			date: entry.date,
			specialist: entry.specialist,
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