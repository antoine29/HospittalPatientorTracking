import { prismaClient, HospitalEntry, HospitalDischarge } from '../../prisma'

export const GetHospitalEntries = async () => {
	return await prismaClient.hospitalEntry.findMany({
		include: {
			patient: true,
			diagnoses: true,
            discharge: true
		}
	});
}

export const CreateHospitalEntry = async (entry: HospitalEntry) => {
	return await prismaClient.hospitalEntry.create({
		data: {
			description: entry.description,
			date: entry.date,
			specialist: entry.specialist,
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
			discharge: true
		}
	});
}

export const UpsertHospitalEntryDischarge = async (entryId: string, discharge: HospitalDischarge) => {
    return await prismaClient.hospitalEntry.update({
        where: {
            id: entryId
        },
        data: {
            discharge: {
				upsert:{
					update: {
						criteria: discharge.criteria,
						date: discharge.date,
					},
					create: {
						criteria: discharge.criteria,
						date: discharge.date,
					}
				}
            }
        },
        include: {
            patient: true,
            diagnoses: true,
            discharge: true
        }
    })

}