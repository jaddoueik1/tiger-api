import assert from "node:assert/strict";
import { test } from "node:test";
import { computeSessionInstances } from "./sessionScheduling";
import { SessionRepetition } from "../types";

const base = {
	_id: "sched1",
	name: "Test",
	sessionDate: new Date("2026-01-05T09:00:00.000Z"), // Monday
	repetition: SessionRepetition.WEEKLY,
};

test("weekly with recurrenceEndDate generates one instance per week through the end date", () => {
	const out = computeSessionInstances(
		{ ...base, recurrenceEndDate: new Date("2026-01-26T09:00:00.000Z") } as any,
		"coachA",
	);
	assert.equal(out.length, 4);
	assert.equal(out[0].coachId, "coachA");
	assert.equal(out[0].scheduleId, "sched1");
	assert.equal(out[0].repetition, "weekly");
	assert.deepEqual(
		out.map((o) => o.startDateTime?.toISOString()),
		[
			"2026-01-05T09:00:00.000Z",
			"2026-01-12T09:00:00.000Z",
			"2026-01-19T09:00:00.000Z",
			"2026-01-26T09:00:00.000Z",
		],
	);
});

test("repetition 'none' produces exactly one instance", () => {
	const out = computeSessionInstances(
		{ ...base, repetition: "none" } as any,
		"coachA",
	);
	assert.equal(out.length, 1);
	assert.equal(out[0].repetition, "none");
});

test("weekly with selectedDays only generates on those weekdays within the end date", () => {
	const out = computeSessionInstances(
		{
			...base,
			selectedDays: [1, 3], // Mon, Wed
			recurrenceEndDate: new Date("2026-01-15T09:00:00.000Z"),
		} as any,
		"coachA",
	);
	assert.equal(out.length, 4);
	for (const o of out) {
		const day = o.startDateTime!.getUTCDay();
		assert.ok(day === 1 || day === 3, `unexpected weekday ${day}`);
	}
});

test("count mode: weekly Mon/Wed/Fri yields exactly N total instances", () => {
	const out = computeSessionInstances(
		{
			...base,
			selectedDays: [1, 3, 5], // Mon, Wed, Fri
			numberOfSessions: 10,
		} as any,
		"coachA",
	);
	assert.equal(out.length, 10);
	for (const o of out) {
		const day = o.startDateTime!.getUTCDay();
		assert.ok([1, 3, 5].includes(day), `unexpected weekday ${day}`);
	}
	for (let i = 1; i < out.length; i++) {
		assert.ok(
			out[i].startDateTime!.getTime() > out[i - 1].startDateTime!.getTime(),
		);
	}
});

test("count mode: daily yields exactly N consecutive days", () => {
	const out = computeSessionInstances(
		{ ...base, repetition: SessionRepetition.DAILY, numberOfSessions: 5 } as any,
		"coachA",
	);
	assert.equal(out.length, 5);
	assert.deepEqual(
		out.map((o) => o.startDateTime!.toISOString().slice(0, 10)),
		["2026-01-05", "2026-01-06", "2026-01-07", "2026-01-08", "2026-01-09"],
	);
});

test("count mode: monthly yields exactly N monthly instances", () => {
	const out = computeSessionInstances(
		{ ...base, repetition: SessionRepetition.MONTHLY, numberOfSessions: 3 } as any,
		"coachA",
	);
	assert.equal(out.length, 3);
});

test("count mode takes precedence over recurrenceEndDate when both set", () => {
	const out = computeSessionInstances(
		{
			...base,
			repetition: SessionRepetition.DAILY,
			numberOfSessions: 2,
			recurrenceEndDate: new Date("2030-01-01T00:00:00.000Z"),
		} as any,
		"coachA",
	);
	assert.equal(out.length, 2);
});

test("count mode is clamped to 100", () => {
	const out = computeSessionInstances(
		{ ...base, repetition: SessionRepetition.DAILY, numberOfSessions: 5000 } as any,
		"coachA",
	);
	assert.equal(out.length, 100);
});

test("count mode with weekly + empty selectedDays stays bounded (terminates, exactly N)", () => {
	// Degenerate config: weekly count mode with no weekdays selected. Must not hang
	// (the 2-year horizon is the backstop) and must produce exactly N instances,
	// since 100 weekly steps fit inside the 2-year horizon.
	const out = computeSessionInstances(
		{
			...base,
			repetition: SessionRepetition.WEEKLY,
			selectedDays: [],
			numberOfSessions: 100,
		} as any,
		"coachA",
	);
	assert.equal(out.length, 100);
});
