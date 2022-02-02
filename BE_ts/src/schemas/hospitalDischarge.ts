import { objectType, extendType, nonNull, stringArg, list } from "nexus";

export const HospitalDischarge = objectType({
	name: 'HospitalDischarge',
	definition(t) {
		t.nonNull.string('id');
        t.string('date');
        t.string('criteria');
        t.string('hospitalEntry');
		t.field('hospitalEntry', {
			type: 'HospitalEntry'
		});
	},
});