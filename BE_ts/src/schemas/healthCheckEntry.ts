import { objectType, extendType, nonNull, enumType } from "nexus";
import { GetHealthCheckEntries, CreateHealthCheckEntry } from '../dao/healthCheckEntries';
import { NewEntryInput } from '.';

export const HealthCheckRating = enumType({
	name: 'HealthCheckRating',
	members: ['Healthy', 'LowRisk', 'HighRisk', 'CriticalRisk']
})

export const HealthCheckEntry = objectType({
	name: 'HealthCheckEntry',
	definition(t) {
		t.implements('Entry')
		t.field('healthCheckRating', { type: 'HealthCheckRating' });
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

const newHealthCheckEntryInput = {
	...NewEntryInput,
	healthCheckRating: nonNull('HealthCheckRating'),	
};

export const HealthCheckEntryMutations = extendType({
	type: 'Mutation',
	definition(t) {
		t.nonNull.field('HealthCheckEntry', {
			type: 'HealthCheckEntry',
			args: newHealthCheckEntryInput,
			resolve(_root, args, ctx) {
				return CreateHealthCheckEntry(args);
			},
		});
	},
});
