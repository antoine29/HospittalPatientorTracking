import { objectType, enumType, extendType, nonNull, stringArg } from "nexus";
import { GetPatients, GetPatient, CreatePatient } from '../dao/patients'
import { NexusGenFieldTypes } from '../../nexus-typegen'

type NexusPatient = NexusGenFieldTypes['Patient'] | null;

export const Gender = enumType({
	name: 'Gender',
	members: ['Male', 'Female', 'Other']
})

// ToDo: fix model
//Patient => full fields
//Patients => basic fields
// or just get a way to omit the 'entries' field in a getPatients query
//https://github.com/graphql-nexus/nexus/issues/216
export const Patient = objectType({
	name: 'Patient',
	definition(t) {
		t.nonNull.string('id');
		t.string('name');
		t.string('dateOfBirth');
		t.string('ssn');
		t.field('gender', { type: 'Gender' });
		t.string('occupation');
		t.list.field('entries', { type: 'Entry' });
	},
});

export const PatientQueries = extendType({
	type: 'Query',
	definition(t) {
		// get patients
		t.list.field('Patients', {
			type: 'Patient',
			resolve(_root, _args, ctx) {
				return GetPatients();
			},
		});
		// get patient
		t.field('Patient', {
			type: 'Patient',
			args: { id: nonNull(stringArg()) },
			resolve(_root, args, ctx) {
				const getPatientCall = async() => {
					const patient = await GetPatient(args.id);
					if(patient){
						const mergedEntries = [
							...patient.healthCheckEntries,
							...patient.hospitalEntries,
							...patient.occupationalHealthEntries
						]
						
						// ToDo: check if all the implementation fields are present
						const fixedPatient: NexusPatient = {
							id: patient.id,
							name: patient.name,
							dateOfBirth: patient.dateOfBirth,
							ssn: patient.ssn,
							gender: patient.gender,
							occupation: patient.occupation,
							entries: mergedEntries
						};
				
						return fixedPatient;
					}

					return null;

				}
				
				return getPatientCall();
			},
		});
	},
});

export const PatientMutations = extendType({
	type: 'Mutation',
	definition(t) {
		// create a new patient
		t.nonNull.field('createPatient', {
			type: 'Patient',
			args: {
				name: nonNull(stringArg()),
				dateOfBirth: nonNull(stringArg()),
				ssn: nonNull(stringArg()),
				gender: nonNull('Gender'),
				occupation: nonNull(stringArg())
			},
			resolve(_root, args, ctx) {
				//return ctx.prisma.patient.create({
				//	data: {
				//		name: args.name,
				//		dateOfBirth: args.dateOfBirth,
				//		ssn: args.ssn,
				//		gender: args.gender,
				//		occupation: args.occupation
				//	},
				//});
				
				return CreatePatient(args);
			},
		});
		/*
		// update a company by id
		t.field('updateCompany', {
			type: 'Company',
			args: {
				id: nonNull(intArg()),
				name: stringArg(),
				contactPerson: stringArg(),
				bio: stringArg(),
				email: stringArg(),
				website: stringArg(),
				roleId: intArg(),
				roles: arg({
					type: list('RoleInputType'),
				}),
			},
			resolve(_root, args, ctx) {
				return ctx.db.company.update({
					where: { id: args.id },
					data: {
						name: args.name,
						contactPerson: args.contactPerson,
						bio: args.bio,
						email: args.email,
						website: args.website,
						roles: {
							connect: [{ id: args.roleId || undefined }],
						},
					},
				});
			},
		});
		// delete a company by id
		t.field('deleteCompany', {
			type: 'Company',
			args: {
				id: nonNull(intArg()),
			},
			resolve(_root, args, ctx) {
				return ctx.db.company.delete({
					where: { id: args.id },
				});
			},
		});
		*/
	},
});
