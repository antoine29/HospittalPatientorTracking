import { objectType, extendType, nonNull, stringArg, list, arg, extendInputType } from "nexus";
import { GetHospitalEntries, CreateHospitalEntry, UpsertHospitalEntryDischarge } from '../dao/hospitalEntries'
import { NewEntryInput } from ".";

export const HospitalEntry = objectType({
	name: 'HospitalEntry',
	definition(t) {
		t.implements('Entry')
        t.field('discharge', { type: 'HospitalDischarge' });
	},
});

export const HospitalEntryQueries = extendType({
	type: 'Query',
	definition(t) {
		t.list.field('HospitalEntries', {
			type: 'HospitalEntry',
			resolve(_root, _args, ctx) {
				return GetHospitalEntries();
			},
		});
	},
});

export const hospitalDischargeInput = extendInputType({
    type: 'HospitalDischargeInput',
    definition(t) {
        t.nonNull.string('date');
        t.nonNull.string('criteria');
    }
});

export const HospitalEntryMutations = extendType({
	type: 'Mutation',
	definition(t) {
		t.nonNull.field('HospitalEntry', {
			type: 'HospitalEntry',
			args: NewEntryInput,
			resolve(_root, args, ctx) {
				return CreateHospitalEntry(args);
			},
		});
        t.field('HospitalEntryDischarge', {
            type: 'HospitalEntry',
            args: {
                hospitalEntryId: nonNull(stringArg()),
                discharge: arg({
                    type: nonNull('HospitalDischargeInput')
                })
            },
            resolve(_root, args, ctx) {
				return UpsertHospitalEntryDischarge(args.hospitalEntryId, args.discharge);
			},
        })
	},
});

