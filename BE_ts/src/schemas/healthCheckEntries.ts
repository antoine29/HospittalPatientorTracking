import { objectType, extendType, nonNull, stringArg, list } from "nexus";
import { GetHealthCheckEntries, CreateHealthCheckEntry } from '../dao/healthCheckEntries'

export const HealthCheckEntry = objectType({
	name: 'HealthCheckEntry',
	definition(t) {
		t.nonNull.string('id');
		t.string('description');
		t.string('date');
		t.string('specialist');
		t.string('type');
		t.string('healthCheckRating');
		t.field('patient', {
			type: 'Patient'
		})
		t.list.field('diagnoses', {
			type: 'Diagnosis'
		})
	},
});

export const HealthCheckEntryQueries = extendType({
	type: 'Query',
	definition(t) {
		t.list.field('HealthCheckEntry', {
			type: 'HealthCheckEntry',
			resolve(_root, _args, ctx) {
				return GetHealthCheckEntries();
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


export const HealthCheckEntryMutations = extendType({
	type: 'Mutation',
	definition(t) {
		t.nonNull.field('HealthCheckEntry', {
			type: 'HealthCheckEntry',
			args: {
				description: nonNull(stringArg()),
				date: nonNull(stringArg()),
				specialist: nonNull(stringArg()),
				//type: nonNull(stringArg()),
				healthCheckRating: nonNull(stringArg()),// todo: graphql enums
				patientId: nonNull(stringArg()),
				diagnosisIDs: nonNull(list(nonNull(stringArg())))
			},
			resolve(_root, args, ctx) {
				return CreateHealthCheckEntry(args);
			},
		});
	},
});

