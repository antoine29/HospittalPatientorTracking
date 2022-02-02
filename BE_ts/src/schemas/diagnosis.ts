import { objectType, extendType, nonNull, stringArg } from "nexus";
import { GetDiagnoses, CreateDiagnosis } from '../dao/diagnoses'

export const Diagnosis = objectType({
	name: 'Diagnosis',
	definition(t) {
		t.nonNull.string('id');
		t.string('code');
		t.string('name');
		t.string('latin');
	},
});

export const DiagnosisQueries = extendType({
	type: 'Query',
	definition(t) {
		t.list.field('Diagnoses', {
			type: 'Diagnosis',
			resolve(_root, _args, ctx) {
				return GetDiagnoses();
			},
		});
		// get patient by id
		//t.field('patient', {
		//	type: 'Patient',
		//	args: {
		//		id: nonNull(stringArg()),
		//	},
		//	resolve(_root, args, ctx) {
		//		//return ctx.prisma.patient.findUnique({
		//		//	where: { id: args.id },
		//		//});
		//		return GetPatient(args.id);
		//	},
		//});
		//t.list.field('roles', {
		//	type: 'Role',
		//	resolve(_root, _args, ctx) {
		//		return ctx.db.role.findMany();
		//	},
		//});
	},
});

export const DiagnosisMutations = extendType({
	type: 'Mutation',
	definition(t) {
		t.nonNull.field('Diagnosis', {
			type: 'Diagnosis',
			args: {
				code: nonNull(stringArg()),
				name: nonNull(stringArg()),
				latin: nonNull(stringArg())
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
				return CreateDiagnosis(args);
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

