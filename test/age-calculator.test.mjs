import test from 'node:test';
import assert from 'node:assert/strict';
import {
  calculateExactAge,
  getDaysInMonth,
  addMonthsClamped,
  getWesternZodiac,
  getChineseZodiac,
  calculateLifeMilestones
} from '../script.js';

test('Days in month handles leap years and normal years', () => {
  assert.equal(getDaysInMonth(2024, 2), 29); // Leap year 2024
  assert.equal(getDaysInMonth(2023, 2), 28); // Non-leap year 2023
  assert.equal(getDaysInMonth(2024, 1), 31);
  assert.equal(getDaysInMonth(2024, 4), 30);
});

test('Adding months clamps correctly to month end', () => {
  const jan31 = addMonthsClamped(2024, 1, 31, 1);
  assert.deepEqual(jan31, { year: 2024, month: 2, day: 29 });

  const nonLeapFeb = addMonthsClamped(2023, 1, 31, 1);
  assert.deepEqual(nonLeapFeb, { year: 2023, month: 2, day: 28 });
});

test('Standard age calculation: 2000-05-15 to 2026-10-30 with Zodiac', () => {
  const res = calculateExactAge('2000-05-15', '2026-10-30');
  assert.equal(res.years, 26);
  assert.equal(res.months, 5);
  assert.equal(res.days, 15);
  assert.equal(res.dayOfWeekBorn, 'Monday');
  assert.equal(res.formattedDob, 'May 15, 2000');
  assert.equal(res.isBirthdayToday, false);
  assert.equal(res.westernZodiac.displayName, '♉ Taurus');
  assert.equal(res.chineseZodiac.displayName, '🐉 Dragon');
});

test('Western Zodiac mapping across all signs', () => {
  assert.equal(getWesternZodiac(3, 25).displayName, '♈ Aries');
  assert.equal(getWesternZodiac(5, 5).displayName, '♉ Taurus');
  assert.equal(getWesternZodiac(6, 1).displayName, '♊ Gemini');
  assert.equal(getWesternZodiac(7, 10).displayName, '♋ Cancer');
  assert.equal(getWesternZodiac(8, 15).displayName, '♌ Leo');
  assert.equal(getWesternZodiac(9, 10).displayName, '♍ Virgo');
  assert.equal(getWesternZodiac(10, 15).displayName, '♎ Libra');
  assert.equal(getWesternZodiac(11, 10).displayName, '♏ Scorpio');
  assert.equal(getWesternZodiac(12, 10).displayName, '♐ Sagittarius');
  assert.equal(getWesternZodiac(1, 5).displayName, '♑ Capricorn');
  assert.equal(getWesternZodiac(2, 5).displayName, '♒ Aquarius');
  assert.equal(getWesternZodiac(2, 29).displayName, '♓ Pisces');
});

test('Chinese Zodiac cycle calculation', () => {
  assert.equal(getChineseZodiac(2020).displayName, '🐀 Rat');
  assert.equal(getChineseZodiac(2021).displayName, '🐂 Ox');
  assert.equal(getChineseZodiac(2022).displayName, '🐅 Tiger');
  assert.equal(getChineseZodiac(2023).displayName, '🐇 Rabbit');
  assert.equal(getChineseZodiac(2024).displayName, '🐉 Dragon');
  assert.equal(getChineseZodiac(2025).displayName, '🐍 Snake');
  assert.equal(getChineseZodiac(2026).displayName, '🐎 Horse');
  assert.equal(getChineseZodiac(1995).displayName, '🐖 Pig');
});

test('Leap year birthday calculation: 2020-02-29 to 2024-02-29', () => {
  const res = calculateExactAge('2020-02-29', '2024-02-29');
  assert.equal(res.years, 4);
  assert.equal(res.months, 0);
  assert.equal(res.days, 0);
  assert.equal(res.isBirthdayToday, true);
  assert.equal(res.westernZodiac.displayName, '♓ Pisces');
  assert.equal(res.chineseZodiac.displayName, '🐀 Rat');
});

test('Leap day birth in non-leap year target: 2020-02-29 to 2021-02-28', () => {
  const res = calculateExactAge('2020-02-29', '2021-02-28');
  assert.equal(res.years, 1);
  assert.equal(res.months, 0);
  assert.equal(res.days, 0);
});

test('Month end borrowing from 31st to March 1st: 2024-01-31 to 2024-03-01', () => {
  const res = calculateExactAge('2024-01-31', '2024-03-01');
  assert.equal(res.years, 0);
  assert.equal(res.months, 1);
  assert.equal(res.days, 1);
});

test('Born today calculation: 2026-10-30 to 2026-10-30', () => {
  const res = calculateExactAge('2026-10-30', '2026-10-30');
  assert.equal(res.years, 0);
  assert.equal(res.months, 0);
  assert.equal(res.days, 0);
  assert.equal(res.totalDays, 0);
  assert.equal(res.isBirthdayToday, true);
});

test('Future birth date produces validation error', () => {
  const res = calculateExactAge('2026-12-31', '2026-10-30');
  assert.ok(res.error);
  assert.equal(res.error, 'Date of birth cannot be in the future.');
});

test('Empty or invalid date returns validation error', () => {
  const res = calculateExactAge('', '2026-10-30');
  assert.ok(res.error);
});

test('Life Milestones calculates 10,000 days and next milestone birthday correctly', () => {
  const milestones = calculateLifeMilestones('2000-05-15', '2026-10-30');
  assert.ok(milestones);
  assert.equal(milestones.dayMilestone.target, 10000);
  assert.equal(milestones.dayMilestone.title, '10,000 Days Old');
  assert.equal(milestones.dayMilestone.daysRemaining, 336);
  assert.equal(milestones.dayMilestone.progressPercent, 93);

  // Next milestone birthday for 26-year-old is 30
  assert.equal(milestones.birthdayMilestone.age, 30);
  assert.equal(milestones.birthdayMilestone.title, '30th Birthday Anniversary');
  assert.equal(milestones.birthdayMilestone.yearsRemaining, 4);

  // Integrated in calculateExactAge
  const ageRes = calculateExactAge('2000-05-15', '2026-10-30');
  assert.ok(ageRes.milestones);
  assert.equal(ageRes.milestones.dayMilestone.target, 10000);
});
