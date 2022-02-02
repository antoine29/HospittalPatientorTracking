import { prismaClient, OccupationalHealthEntry, SickLeave } from '../../prisma'

export const GetOccupationalHealthEntries = async () => {
	return await prismaClient.occupationalHealthEntry.findMany({
		include: {
			patient: true,
			diagnoses: true,
            sickLeave: true
		}
	});
}

export const CreateOccupationalHealthEntry = async (entry: OccupationalHealthEntry) => {
	return await prismaClient.occupationalHealthEntry.create({
		data: {
			description: entry.description,
			date: entry.date,
			specialist: entry.specialist,
            employerName: entry.employerName,
			patient: {
				connect: { id: entry.patientId }
			},
			diagnoses: {
				connect: entry.diagnosisIDs.map(id => {return { id }})
			}
		},
		include: {
			patient: true,
			diagnoses: true,
			sickLeave: true
		}
	});
}

export const UpsertOccupationalHealthEntrySickLeave = async (entryId: string, sickLeave: SickLeave) => {
    return await prismaClient.occupationalHealthEntry.update({
        where: {
            id: entryId
        },
        data: {
            sickLeave: {
				upsert:{
					update: {
                        startDate: sickLeave.startDate,
                        endDate: sickLeave.endDate
					},
					create: {
						startDate: sickLeave.startDate,
                        endDate: sickLeave.endDate
					}
				}
            }
        },
        include: {
            patient: true,
            diagnoses: true,
            sickLeave: true
        }
    })
}