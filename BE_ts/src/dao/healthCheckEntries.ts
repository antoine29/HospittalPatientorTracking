import { db } from './db'

export const GetHealthCheckEntries = async () => {
	return db.healthCheckEntry.findMany();
}

export const CreateHealthCheckEntry = async entry => {
	return db.healthCheckEntry.create({
		data: {
			description: entry.description,
			date: entry.date,
			specialist: entry.specialist,
			type: entry.type,
			healthCheckRating: entry.healthCheckRating,
			patientId: entry.patientId,
			diagnosisIDs: entry.diagnosisIDs
		},
		include: {
			patient: true,
			diagnoses: true
		}
	});
}