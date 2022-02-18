import { objectType } from "nexus";

export const HospitalDischarge = objectType({
	name: 'HospitalDischarge',
	definition(t) {
		t.nonNull.string('id');
        t.string('date');
        t.string('criteria');
		t.field('hospitalEntry', { type: 'HospitalEntry' });
	},
});