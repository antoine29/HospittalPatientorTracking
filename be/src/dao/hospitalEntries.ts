import { prismaClient, HospitalEntry, HospitalDischarge } from '../../prisma'

type NewHospitalEntry = Omit<HospitalEntry, 'id' | 'type' | 'dischargeId'>;
type NewHospitalDischarge = Omit<HospitalDischarge, 'id'>;

export const GetHospitalEntries = async () => {
	return await prismaClient.hospitalEntry.findMany({
		include: {
			patient: true,
			diagnoses: true,
            discharge: true
		}
	});
}

export const CreateHospitalEntry = async (entry: NewHospitalEntry) => {
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
			},
			// ToDo:
			// It seems i cannot create more than two hospitalEntries with an undefined (or null?)
			// dischargeId. I think this is because prisma is forcing a HospitalEntry to have 
			// a different dischargeId always. Maybe to raise an issue repport?
			// (a boolean flag to indicate if a discharge is valid is the solution applied)
			discharge: {
				create: {
					criteria: '',
					date: ''
				}
			}
		},
		include: {
			patient: true,
			diagnoses: true,
			discharge: true
		}
	});
}

export const UpsertHospitalEntryDischarge = async (entryId: string, discharge: NewHospitalDischarge) => {
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
						active: true
					},
					create: {
						criteria: discharge.criteria,
						date: discharge.date,
						active: true
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