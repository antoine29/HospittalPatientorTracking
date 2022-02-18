import { objectType, extendType, nonNull, stringArg, list, arg, extendInputType, interfaceType } from "nexus";
import { GetHospitalEntries, CreateHospitalEntry, UpsertHospitalEntryDischarge } from '../dao/hospitalEntries'
import { NewEntryInput } from ".";

import { NexusGenFieldTypes } from '../../nexus-typegen'

type nexusHospitalEntry = NexusGenFieldTypes['HospitalEntry'];
type nexusHospitalDischarge = NexusGenFieldTypes['HospitalDischarge'];

type customHospitalDischarge = nexusHospitalDischarge & {
	active: boolean
};
type customHospitalEntry = Omit<nexusHospitalEntry, 'discharge'> & {
	discharge: customHospitalDischarge
};

export const HospitalEntry = objectType({
	name: 'HospitalEntry',
	definition(t) {
		t.implements('Entry');
		t.field('discharge', {
			type: 'HospitalDischarge',
			resolve: (root) =>  {
				// ToDo: idk why but root seems to be of 'Entry' type rather than of 'HospitalEntry' type.
				// Or maybe once i'm returnig a null for this field, the 'discharge' field dissappear from 'HospitalEntry'
				// So in order to get type safety, i need to cast it to the propper type
				// Anyways, returning as it is seems to be working 2
				// Also, there is no way to hide a the 'active' field from a nexus schema, so i solved this by making these 'custom' types
				// to have the active field only in the resolver and not in the schema
				// return root.discharge?.active ? root.discharge : null
				//const casted = root as nexusHospitalEntry;
				const casted = root as customHospitalEntry;
				return casted.discharge?.active ? casted.discharge : null
			}
		});
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

