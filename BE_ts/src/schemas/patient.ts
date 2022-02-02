import { objectType, extendType, nonNull, stringArg } from "nexus";
import { GetPatients, GetPatient, CreatePatient } from '../dao/patients'

export const Patient = objectType({
	name: 'Patient',
	definition(t) {
		t.nonNull.string('id');
		t.string('name');
		t.string('dateOfBirth');
		t.string('ssn');
		t.string('gender');
		t.string('occupation');
		t.list.field('healthCheckEntries', {
			type: 'HealthCheckEntry'
		})
	},
});

export const PatientQueries = extendType({
	type: 'Query',
	definition(t) {
		// get all patients
		t.list.field('Patients', {
			type: 'Patient',
			resolve(_root, _args, ctx) {
				return GetPatients();
			},
		});
		// get patient by id
		t.field('Patient', {
			type: 'Patient',
			args: {
				id: nonNull(stringArg()),
			},
			resolve(_root, args, ctx) {
				//return ctx.prisma.patient.findUnique({ where: { id: args.id } });
				return GetPatient(args.id);
			},
		});
		//t.list.field('roles', {
		//	type: 'Role',
		//	resolve(_root, _args, ctx) {
		//		return ctx.db.role.findMany();
		//	},
		//});
	},
});

export const PatientMutations = extendType({
	type: 'Mutation',
	definition(t) {
		// create a new patient
		t.nonNull.field('Patient', {
			type: 'Patient',
			args: {
				name: nonNull(stringArg()),
				dateOfBirth: nonNull(stringArg()),
				ssn: nonNull(stringArg()),
				gender: nonNull(stringArg()),
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
