import { prismaClient, OccupationalHealthEntry, SickLeave } from '../../prisma'

type NewOccupationalHealthEntry = Omit<OccupationalHealthEntry, 'id' | 'type' | 'sickLeaveId'>;
type NewSickLeave = Omit<SickLeave, 'id' | 'active'>;

export const GetOccupationalHealthEntries = async () => {
	return await prismaClient.occupationalHealthEntry.findMany({
		include: {
			patient: true,
			diagnoses: true,
            sickLeave: true
		}
	});
}

export const CreateOccupationalHealthEntry = async (entry: NewOccupationalHealthEntry) => {
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
			},
			sickLeave: {
				create: {
					startDate: '',
					endDate: ''
				}
			}
		},
		include: {
			patient: true,
			diagnoses: true,
			sickLeave: true
		}
	});
}

export const UpsertOccupationalHealthEntrySickLeave = async (entryId: string, sickLeave: NewSickLeave) => {
    return await prismaClient.occupationalHealthEntry.update({
        where: {
            id: entryId
        },
        data: {
            sickLeave: {
				upsert:{
					update: {
                        startDate: sickLeave.startDate,
                        endDate: sickLeave.endDate,
						active: true
					},
					create: {
						startDate: sickLeave.startDate,
                        endDate: sickLeave.endDate,
						active: true
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