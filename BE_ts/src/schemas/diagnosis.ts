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
		t.list.field('diagnoses', {
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

