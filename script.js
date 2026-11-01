/**
 * Age Calculator - Professional, Modern, Vanilla JavaScript Engine
 * Handles exact calendar age, leap years, animations, themes, and sharing.
 */

// ============================================================================
// Core Date & Age Calculation Engine
// ============================================================================

/**
 * Returns total days in a given month of a year.
 * @param {number} year - Full year (e.g. 2026)
 * @param {number} month - 1-indexed month (1 = January, 12 = December)
 * @returns {number} Days in that month (28, 29, 30, or 31)
 */
export function getDaysInMonth(year, month) {
  return new Date(year, month, 0).getDate();
}

/**
 * Accurately adds months to a date, clamping day to max days of target month.
 * Prevents calendar overflow (e.g. Jan 31 + 1 month => Feb 28 or 29, not Mar 2 or 3).
 * @param {number} year - Base year
 * @param {number} month - Base month (1-12)
 * @param {number} day - Base day (1-31)
 * @param {number} monthsToAdd - Number of months to advance
 * @returns {{year: number, month: number, day: number}} Clamped date object
 */
export function addMonthsClamped(year, month, day, monthsToAdd) {
  const totalMonths = year * 12 + (month - 1) + monthsToAdd;
  const targetYear = Math.floor(totalMonths / 12);
  const targetMonth = (totalMonths % 12) + 1;
  const maxDays = getDaysInMonth(targetYear, targetMonth);
  const targetDay = Math.min(day, maxDays);
  return { year: targetYear, month: targetMonth, day: targetDay };
}

/**
 * Helper to convert year, month (1-12), day into midnight UTC millisecond timestamp.
 * Eliminates DST shifts and timezone variations across users.
 */
export function dateToUtc(year, month, day) {
  return Date.UTC(year, month - 1, day);
}

/**
 * Determines Western Zodiac sign and symbol based on month (1-12) and day (1-31).
 * @param {number} month - 1-indexed month
 * @param {number} day - Day of month
 * @returns {{name: string, symbol: string, displayName: string}}
 */
export function getWesternZodiac(month, day) {
  if ((month === 3 && day >= 21) || (month === 4 && day <= 19)) return { name: 'Aries', symbol: '♈', displayName: '♈ Aries' };
  if ((month === 4 && day >= 20) || (month === 5 && day <= 20)) return { name: 'Taurus', symbol: '♉', displayName: '♉ Taurus' };
  if ((month === 5 && day >= 21) || (month === 6 && day <= 20)) return { name: 'Gemini', symbol: '♊', displayName: '♊ Gemini' };
  if ((month === 6 && day >= 21) || (month === 7 && day <= 22)) return { name: 'Cancer', symbol: '♋', displayName: '♋ Cancer' };
  if ((month === 7 && day >= 23) || (month === 8 && day <= 22)) return { name: 'Leo', symbol: '♌', displayName: '♌ Leo' };
  if ((month === 8 && day >= 23) || (month === 9 && day <= 22)) return { name: 'Virgo', symbol: '♍', displayName: '♍ Virgo' };
  if ((month === 9 && day >= 23) || (month === 10 && day <= 22)) return { name: 'Libra', symbol: '♎', displayName: '♎ Libra' };
  if ((month === 10 && day >= 23) || (month === 11 && day <= 21)) return { name: 'Scorpio', symbol: '♏', displayName: '♏ Scorpio' };
  if ((month === 11 && day >= 22) || (month === 12 && day <= 21)) return { name: 'Sagittarius', symbol: '♐', displayName: '♐ Sagittarius' };
  if ((month === 12 && day >= 22) || (month === 1 && day <= 19)) return { name: 'Capricorn', symbol: '♑', displayName: '♑ Capricorn' };
  if ((month === 1 && day >= 20) || (month === 2 && day <= 18)) return { name: 'Aquarius', symbol: '♒', displayName: '♒ Aquarius' };
  if ((month === 2 && day >= 19) || (month === 3 && day <= 20)) return { name: 'Pisces', symbol: '♓', displayName: '♓ Pisces' };
  return { name: 'Unknown', symbol: '✨', displayName: '✨ Unknown' };
}

/**
 * Determines Chinese Zodiac animal and emoji based on birth year.
 * @param {number} year - Birth year
 * @returns {{name: string, emoji: string, displayName: string}}
 */
export function getChineseZodiac(year) {
  const animals = [
    { name: 'Rat', emoji: '🐀' },
    { name: 'Ox', emoji: '🐂' },
    { name: 'Tiger', emoji: '🐅' },
    { name: 'Rabbit', emoji: '🐇' },
    { name: 'Dragon', emoji: '🐉' },
    { name: 'Snake', emoji: '🐍' },
    { name: 'Horse', emoji: '🐎' },
    { name: 'Goat', emoji: '🐐' },
    { name: 'Monkey', emoji: '🐒' },
    { name: 'Rooster', emoji: '🐓' },
    { name: 'Dog', emoji: '🐕' },
    { name: 'Pig', emoji: '🐖' }
  ];
  const index = ((year - 4) % 12 + 12) % 12;
  const item = animals[index];
  return {
    name: item.name,
    emoji: item.emoji,
    displayName: `${item.emoji} ${item.name}`
  };
}

/**
 * Calculates key life milestones (10,000 days, next big birthday anniversary, etc.)
 * @param {string|Date} birthDateInput
 * @param {string|Date} [currentDateInput=new Date()]
 * @returns {object} Milestone calculations
 */
export function calculateLifeMilestones(birthDateInput, currentDateInput = new Date()) {
  let bYear, bMonth, bDay;
  if (typeof birthDateInput === 'string') {
    const parts = birthDateInput.split('-').map(Number);
    bYear = parts[0];
    bMonth = parts[1];
    bDay = parts[2];
  } else if (birthDateInput instanceof Date) {
    bYear = birthDateInput.getFullYear();
    bMonth = birthDateInput.getMonth() + 1;
    bDay = birthDateInput.getDate();
  }

  let cYear, cMonth, cDay;
  if (typeof currentDateInput === 'string') {
    const parts = currentDateInput.split('-').map(Number);
    cYear = parts[0];
    cMonth = parts[1];
    cDay = parts[2];
  } else if (currentDateInput instanceof Date) {
    cYear = currentDateInput.getFullYear();
    cMonth = currentDateInput.getMonth() + 1;
    cDay = currentDateInput.getDate();
  }

  const birthUtc = dateToUtc(bYear, bMonth, bDay);
  const currentUtc = dateToUtc(cYear, cMonth, cDay);
  const totalDays = Math.round((currentUtc - birthUtc) / (1000 * 60 * 60 * 24));

  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];

  function formatUtcDate(utcMs) {
    const d = new Date(utcMs);
    return `${monthNames[d.getUTCMonth()]} ${d.getUTCDate()}, ${d.getUTCFullYear()}`;
  }

  // 1. Next Significant Day Milestone (10,000 days, 15,000 days, etc.)
  const dayThresholds = [1000, 2000, 5000, 10000, 15000, 20000, 25000, 30000, 35000, 40000];
  let nextDayTarget = dayThresholds[dayThresholds.length - 1] + 5000;
  let prevDayTarget = 0;

  for (let i = 0; i < dayThresholds.length; i++) {
    if (dayThresholds[i] > totalDays) {
      nextDayTarget = dayThresholds[i];
      prevDayTarget = i > 0 ? dayThresholds[i - 1] : 0;
      break;
    }
  }

  const daysToNextDayMilestone = nextDayTarget - totalDays;
  const nextDayMilestoneUtc = birthUtc + nextDayTarget * 86400000;
  const nextDayMilestoneDate = formatUtcDate(nextDayMilestoneUtc);
  const dayProgressPercent = Math.min(
    Math.max(Math.round(((totalDays - prevDayTarget) / (nextDayTarget - prevDayTarget)) * 100), 0),
    100
  );

  // 2. Next Significant Birthday Milestone (18th, 21st, 25th, 30th, 40th, 50th, etc.)
  const birthdayMilestones = [1, 5, 10, 16, 18, 21, 25, 30, 40, 50, 60, 70, 75, 80, 90, 100];
  let yearsLived = cYear - bYear;
  let birthdayThisYear = addMonthsClamped(bYear, bMonth, bDay, yearsLived * 12);
  if (dateToUtc(birthdayThisYear.year, birthdayThisYear.month, birthdayThisYear.day) > currentUtc) {
    yearsLived--;
  }

  let nextBirthdayAge = birthdayMilestones[birthdayMilestones.length - 1] + 10;
  let anniversaryTitle = 'Next Milestone Birthday';
  let anniversaryTag = 'Celebration';

  for (const age of birthdayMilestones) {
    if (age > yearsLived) {
      nextBirthdayAge = age;
      break;
    }
  }

  if (nextBirthdayAge === 18) {
    anniversaryTitle = '18th Birthday (Adulthood)';
    anniversaryTag = 'Adulthood Milestone';
  } else if (nextBirthdayAge === 21) {
    anniversaryTitle = '21st Birthday Milestone';
    anniversaryTag = 'Key Milestone';
  } else if (nextBirthdayAge === 25) {
    anniversaryTitle = '25th Birthday (Silver)';
    anniversaryTag = 'Quarter-Century';
  } else if (nextBirthdayAge === 50) {
    anniversaryTitle = '50th Birthday (Golden)';
    anniversaryTag = 'Half-Century';
  } else if (nextBirthdayAge % 10 === 0) {
    anniversaryTitle = `${nextBirthdayAge}th Birthday Anniversary`;
    anniversaryTag = 'Decade Milestone';
  } else {
    anniversaryTitle = `${nextBirthdayAge}th Birthday Milestone`;
    anniversaryTag = 'Significant Birthday';
  }

  const nextBdayDateObj = addMonthsClamped(bYear, bMonth, bDay, nextBirthdayAge * 12);
  const nextBdayUtc = dateToUtc(nextBdayDateObj.year, nextBdayDateObj.month, nextBdayDateObj.day);
  const nextBdayFormatted = `${monthNames[nextBdayDateObj.month - 1]} ${nextBdayDateObj.day}, ${nextBdayDateObj.year}`;
  const daysUntilAnniversary = Math.round((nextBdayUtc - currentUtc) / 86400000);
  const yearsUntilAnniversary = nextBirthdayAge - yearsLived;

  return {
    dayMilestone: {
      target: nextDayTarget,
      title: `${nextDayTarget.toLocaleString()} Days Old`,
      dateFormatted: nextDayMilestoneDate,
      daysRemaining: daysToNextDayMilestone,
      progressPercent: dayProgressPercent
    },
    birthdayMilestone: {
      age: nextBirthdayAge,
      title: anniversaryTitle,
      tag: anniversaryTag,
      dateFormatted: nextBdayFormatted,
      daysRemaining: daysUntilAnniversary,
      yearsRemaining: yearsUntilAnniversary
    }
  };
}

/**
 * Calculates exact age between birthDate and targetDate with calendar precision.
 * @param {string|Date} birthDateInput - Birth date string (YYYY-MM-DD) or Date
 * @param {string|Date} [currentDateInput=new Date()] - Target date
 * @returns {object} Calculated age object or error object
 */
export function calculateExactAge(birthDateInput, currentDateInput = new Date()) {
  let bYear, bMonth, bDay;
  if (typeof birthDateInput === 'string') {
    const parts = birthDateInput.split('-').map(Number);
    bYear = parts[0];
    bMonth = parts[1];
    bDay = parts[2];
  } else if (birthDateInput instanceof Date) {
    bYear = birthDateInput.getFullYear();
    bMonth = birthDateInput.getMonth() + 1;
    bDay = birthDateInput.getDate();
  }

  let cYear, cMonth, cDay;
  if (typeof currentDateInput === 'string') {
    const parts = currentDateInput.split('-').map(Number);
    cYear = parts[0];
    cMonth = parts[1];
    cDay = parts[2];
  } else if (currentDateInput instanceof Date) {
    cYear = currentDateInput.getFullYear();
    cMonth = currentDateInput.getMonth() + 1;
    cDay = currentDateInput.getDate();
  }

  // Validate inputs
  if (!bYear || !bMonth || !bDay || isNaN(bYear) || isNaN(bMonth) || isNaN(bDay)) {
    return { error: 'Please select a valid date of birth.' };
  }

  const birthUtc = dateToUtc(bYear, bMonth, bDay);
  const currentUtc = dateToUtc(cYear, cMonth, cDay);

  if (birthUtc > currentUtc) {
    return { error: 'Date of birth cannot be in the future.' };
  }

  // 1. Calculate Full Years
  let years = cYear - bYear;
  let milestone = addMonthsClamped(bYear, bMonth, bDay, years * 12);
  let milestoneUtc = dateToUtc(milestone.year, milestone.month, milestone.day);

  if (milestoneUtc > currentUtc) {
    years--;
    milestone = addMonthsClamped(bYear, bMonth, bDay, years * 12);
    milestoneUtc = dateToUtc(milestone.year, milestone.month, milestone.day);
  }

  // 2. Calculate Full Months
  let months = 0;
  for (let m = 1; m <= 11; m++) {
    const nextMilestone = addMonthsClamped(bYear, bMonth, bDay, years * 12 + m);
    const nextMilestoneUtc = dateToUtc(nextMilestone.year, nextMilestone.month, nextMilestone.day);
    if (nextMilestoneUtc <= currentUtc) {
      months = m;
      milestone = nextMilestone;
      milestoneUtc = nextMilestoneUtc;
    } else {
      break;
    }
  }

  // 3. Calculate Remaining Days
  const daysDiffMs = currentUtc - milestoneUtc;
  const days = Math.round(daysDiffMs / (1000 * 60 * 60 * 24));

  // 4. Total Days and Weeks Lived
  const totalDays = Math.round((currentUtc - birthUtc) / (1000 * 60 * 60 * 24));
  const totalWeeks = Math.floor(totalDays / 7);

  // 5. Day of the Week You Were Born
  const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const birthDateObj = new Date(bYear, bMonth - 1, bDay);
  const dayOfWeekBorn = daysOfWeek[birthDateObj.getDay()];

  // 6. Formatted Date of Birth
  const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ];
  const formattedDob = `${monthNames[bMonth - 1]} ${bDay}, ${bYear}`;

  // 7. Western & Chinese Zodiac
  const westernZodiac = getWesternZodiac(bMonth, bDay);
  const chineseZodiac = getChineseZodiac(bYear);

  // 8. Life Milestones
  const milestones = calculateLifeMilestones(birthDateInput, currentDateInput);

  // 9. Next Birthday & Countdown
  const isBirthdayToday = bMonth === cMonth && bDay === cDay;
  let nextBdayYear = cYear;
  let nextBdayDay = bDay;
  const isLeapYear = (y) => (y % 4 === 0 && y % 100 !== 0) || y % 400 === 0;

  if (bMonth === 2 && bDay === 29 && !isLeapYear(nextBdayYear)) {
    nextBdayDay = 28;
  }
  let nextBdayUtc = dateToUtc(nextBdayYear, bMonth, nextBdayDay);

  if (nextBdayUtc < currentUtc) {
    nextBdayYear++;
    nextBdayDay = bDay;
    if (bMonth === 2 && bDay === 29 && !isLeapYear(nextBdayYear)) {
      nextBdayDay = 28;
    }
    nextBdayUtc = dateToUtc(nextBdayYear, bMonth, nextBdayDay);
  }

  const daysUntilNextBirthday = Math.round((nextBdayUtc - currentUtc) / (1000 * 60 * 60 * 24));
  const nextBdayDateObj = new Date(nextBdayYear, bMonth - 1, nextBdayDay);
  const nextBdayDayOfWeek = daysOfWeek[nextBdayDateObj.getDay()];

  return {
    years,
    months,
    days,
    totalDays,
    totalWeeks,
    dayOfWeekBorn,
    formattedDob,
    westernZodiac,
    chineseZodiac,
    milestones,
    isBirthdayToday,
    daysUntilNextBirthday,
    nextBdayDayOfWeek,
    nextBdayYear
  };
}

// ============================================================================
// UI & Interaction Handlers (Browser Only)
// ============================================================================

if (typeof window !== 'undefined' && typeof document !== 'undefined') {
  document.addEventListener('DOMContentLoaded', () => {
  // DOM Element References
  const themeToggleBtn = document.getElementById('theme-toggle-btn');
  const themeLabel = document.getElementById('theme-label');
  const ageForm = document.getElementById('age-form');
  const dobInput = document.getElementById('dob-input');
  const todayHint = document.getElementById('today-hint');
  const validationMessage = document.getElementById('validation-message');
  const validationText = document.getElementById('validation-text');
  const resultsSection = document.getElementById('results-section');
  const birthdayBanner = document.getElementById('birthday-banner');
  const resultYears = document.getElementById('result-years');
  const resultMonths = document.getElementById('result-months');
  const resultDays = document.getElementById('result-days');
  const resultsSummaryBadge = document.getElementById('results-summary-badge');
  const statDob = document.getElementById('stat-dob');
  const statDayOfWeek = document.getElementById('stat-day-of-week');
  const statTotalDays = document.getElementById('stat-total-days');
  const statNextBirthday = document.getElementById('stat-next-birthday');
  const statWesternZodiac = document.getElementById('stat-western-zodiac');
  const statChineseZodiac = document.getElementById('stat-chinese-zodiac');
  const milestoneDayTitle = document.getElementById('milestone-day-title');
  const milestoneDayDate = document.getElementById('milestone-day-date');
  const milestoneDayCountdown = document.getElementById('milestone-day-countdown');
  const milestoneDayProgress = document.getElementById('milestone-day-progress');
  const milestoneDayPercent = document.getElementById('milestone-day-percent');
  const milestoneBdayTitle = document.getElementById('milestone-bday-title');
  const milestoneBdayDate = document.getElementById('milestone-bday-date');
  const milestoneBdayCountdown = document.getElementById('milestone-bday-countdown');
  const milestoneBdayPill = document.getElementById('milestone-bday-pill');
  const copyBtn = document.getElementById('copy-btn');
  const copyText = document.getElementById('copy-text');
  const copyIcon = document.querySelector('.copy-icon');
  const checkIcon = document.querySelector('.check-icon');
  const shareBtn = document.getElementById('share-btn');
  const resetBtn = document.getElementById('reset-btn');
  const toast = document.getElementById('toast');
  const toastText = document.getElementById('toast-text');

  let currentAgeData = null;
  let toastTimeout = null;

  // 1. Initialize Today's Date and max attribute
  const today = new Date();
  const todayYear = today.getFullYear();
  const todayMonth = String(today.getMonth() + 1).padStart(2, '0');
  const todayDay = String(today.getDate()).padStart(2, '0');
  const todayDateString = `${todayYear}-${todayMonth}-${todayDay}`;

  // Prevent future dates by setting the max attribute
  dobInput.max = todayDateString;

  // Format hint display
  const monthNamesShort = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  todayHint.textContent = `Today: ${monthNamesShort[today.getMonth()]} ${today.getDate()}, ${todayYear}`;

  // 2. Theme Initialization & Toggle
  function initTheme() {
    const savedTheme = localStorage.getItem('age_calc_theme');
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    applyTheme(initialTheme);
  }

  function applyTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('age_calc_theme', theme);
    if (themeLabel) {
      themeLabel.textContent = theme === 'dark' ? 'Light Mode' : 'Dark Mode';
    }
  }

  themeToggleBtn.addEventListener('click', () => {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const nextTheme = currentTheme === 'dark' ? 'light' : 'dark';
    applyTheme(nextTheme);
  });

  initTheme();

  // 3. Validation Helpers
  function showError(msg) {
    validationText.textContent = msg;
    validationMessage.classList.remove('hidden');
    dobInput.classList.add('input-error');
    dobInput.focus();
  }

  function hideError() {
    validationMessage.classList.add('hidden');
    dobInput.classList.remove('input-error');
  }

  dobInput.addEventListener('input', () => {
    if (dobInput.value) {
      hideError();
    }
  });

  // 4. Smooth Number Counting Animation Engine (with Ease-Out Exponential & CSS Pop)
  const activeAnimations = new WeakMap();

  function animateNumber(element, target, duration = 1000, delay = 0, onComplete = null) {
    if (!element) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion || duration <= 0) {
      element.textContent = target.toLocaleString();
      if (onComplete) onComplete();
      return;
    }

    // Cancel existing animation on this element if running
    if (activeAnimations.has(element)) {
      const active = activeAnimations.get(element);
      if (active.frameId) cancelAnimationFrame(active.frameId);
      if (active.timeoutId) clearTimeout(active.timeoutId);
      activeAnimations.delete(element);
    }

    const parentBox = element.closest('.result-box');
    if (parentBox) {
      parentBox.classList.remove('animating');
      void parentBox.offsetWidth; // Force CSS reflow to re-trigger shimmer & entry animation
      parentBox.classList.add('animating');
    }

    element.classList.remove('counting-complete');
    element.classList.add('is-counting');
    element.textContent = '0';

    if (target === 0) {
      element.classList.remove('is-counting');
      element.classList.add('counting-complete');
      if (onComplete) onComplete();
      return;
    }

    const animationRecord = { frameId: null, timeoutId: null };
    activeAnimations.set(element, animationRecord);

    const startAnimation = () => {
      let startTime = null;

      function updateCounter(timestamp) {
        if (!startTime) startTime = timestamp;
        const elapsed = timestamp - startTime;
        const progress = Math.min(elapsed / duration, 1);

        // Exponential ease out: starts swift and decelerates with silky smoothness
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const currentVal = Math.round(target * easeProgress);

        element.textContent = currentVal.toLocaleString();

        if (progress < 1) {
          animationRecord.frameId = requestAnimationFrame(updateCounter);
        } else {
          element.textContent = target.toLocaleString();
          element.classList.remove('is-counting');
          element.classList.add('counting-complete');
          activeAnimations.delete(element);
          if (onComplete) onComplete();
        }
      }

      animationRecord.frameId = requestAnimationFrame(updateCounter);
    };

    if (delay > 0) {
      animationRecord.timeoutId = setTimeout(startAnimation, delay);
    } else {
      startAnimation();
    }
  }

  // Smooth count animation for Total Days in stats card
  function animateTotalDays(element, totalDays, totalWeeks, duration = 1200) {
    if (!element) return;
    const prefersReducedMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) {
      element.textContent = `${totalDays.toLocaleString()} Days (${totalWeeks.toLocaleString()} Weeks)`;
      return;
    }

    let startTime = null;
    function updateDays(timestamp) {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
      const currentDays = Math.round(totalDays * easeProgress);
      const currentWeeks = Math.floor(currentDays / 7);

      element.textContent = `${currentDays.toLocaleString()} Days (${currentWeeks.toLocaleString()} Weeks)`;

      if (progress < 1) {
        requestAnimationFrame(updateDays);
      } else {
        element.textContent = `${totalDays.toLocaleString()} Days (${totalWeeks.toLocaleString()} Weeks)`;
      }
    }
    requestAnimationFrame(updateDays);
  }

  // 5. Toast Feedback Helper
  function showToast(message) {
    if (toastTimeout) {
      clearTimeout(toastTimeout);
    }
    toastText.textContent = message;
    toast.classList.remove('hidden');

    toastTimeout = setTimeout(() => {
      toast.classList.add('hidden');
    }, 3200);
  }

  // 6. Handle Age Calculation
  function handleCalculation(event) {
    if (event) event.preventDefault();

    const selectedDate = dobInput.value;

    if (!selectedDate) {
      showError('Please select your date of birth first.');
      return;
    }

    const result = calculateExactAge(selectedDate, today);

    if (result.error) {
      showError(result.error);
      resultsSection.classList.add('hidden');
      birthdayBanner.classList.add('hidden');
      return;
    }

    hideError();
    currentAgeData = result;

    // Display Birthday Banner if today is their birthday
    if (result.isBirthdayToday) {
      birthdayBanner.classList.remove('hidden');
    } else {
      birthdayBanner.classList.add('hidden');
    }

    // Reveal Results Section
    resultsSection.classList.remove('hidden');

    // Trigger premium staggered spring entrance & shimmer on result boxes and cards
    const animatedCards = [
      ...resultsSection.querySelectorAll('.result-box'),
      resultsSection.querySelector('.stats-card'),
      resultsSection.querySelector('.milestones-section'),
      resultsSection.querySelector('.admob-container'),
      resultsSection.querySelector('.action-buttons-group')
    ].filter(Boolean);

    animatedCards.forEach((el) => el.classList.remove('animating'));
    // Force DOM reflow so re-calculation re-triggers the spring & shimmer animations
    void resultsSection.offsetWidth;
    animatedCards.forEach((el) => el.classList.add('animating'));

    // Staggered counting animations for Years, Months, and Days
    // Years starts immediately, Months at +80ms, Days at +160ms for a cascading odometer effect
    animateNumber(resultYears, result.years, 1100, 0);
    animateNumber(resultMonths, result.months, 1000, 80);
    animateNumber(resultDays, result.days, 900, 160);

    // Summary badge text
    resultsSummaryBadge.textContent = `${result.years} Years | ${result.months} Months | ${result.days} Days`;

    // Detailed metrics with animated total days count
    statDob.textContent = result.formattedDob;
    statDayOfWeek.textContent = result.dayOfWeekBorn;
    animateTotalDays(statTotalDays, result.totalDays, result.totalWeeks, 1200);

    if (statWesternZodiac) {
      statWesternZodiac.textContent = result.westernZodiac.displayName;
    }
    if (statChineseZodiac) {
      statChineseZodiac.textContent = result.chineseZodiac.displayName;
    }

    if (result.isBirthdayToday) {
      statNextBirthday.textContent = '🎉 Today is your Birthday!';
    } else if (result.daysUntilNextBirthday === 1) {
      statNextBirthday.textContent = `Tomorrow (${result.nextBdayDayOfWeek})!`;
    } else {
      statNextBirthday.textContent = `In ${result.daysUntilNextBirthday} days (${result.nextBdayDayOfWeek})`;
    }

    // Populate Life Milestones
    if (result.milestones) {
      const { dayMilestone, birthdayMilestone } = result.milestones;
      if (milestoneDayTitle) milestoneDayTitle.textContent = dayMilestone.title;
      if (milestoneDayDate) milestoneDayDate.textContent = dayMilestone.dateFormatted;
      if (milestoneDayCountdown) {
        milestoneDayCountdown.textContent = `In ${dayMilestone.daysRemaining.toLocaleString()} days`;
      }
      if (milestoneDayProgress) {
        milestoneDayProgress.style.width = `${dayMilestone.progressPercent}%`;
      }
      if (milestoneDayPercent) {
        milestoneDayPercent.textContent = `${dayMilestone.progressPercent}% toward goal`;
      }

      if (milestoneBdayTitle) milestoneBdayTitle.textContent = birthdayMilestone.title;
      if (milestoneBdayDate) milestoneBdayDate.textContent = birthdayMilestone.dateFormatted;
      if (milestoneBdayCountdown) {
        milestoneBdayCountdown.textContent = `In ${birthdayMilestone.daysRemaining.toLocaleString()} days (${birthdayMilestone.yearsRemaining} ${birthdayMilestone.yearsRemaining === 1 ? 'yr' : 'yrs'})`;
      }
      if (milestoneBdayPill) milestoneBdayPill.textContent = birthdayMilestone.tag;
    }

    // Smooth scroll down to results on mobile devices if needed
    if (window.innerWidth <= 600) {
      resultsSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  }

  ageForm.addEventListener('submit', handleCalculation);

  // 7. Reset Button Handler
  resetBtn.addEventListener('click', () => {
    dobInput.value = '';
    currentAgeData = null;
    hideError();
    resultsSection.classList.add('hidden');
    birthdayBanner.classList.add('hidden');
    resultYears.textContent = '0';
    resultMonths.textContent = '0';
    resultDays.textContent = '0';
    [resultYears, resultMonths, resultDays].forEach((el) => {
      if (el) {
        el.classList.remove('is-counting', 'counting-complete');
      }
    });
    document.querySelectorAll('.result-box, .stats-card, .milestones-section, .admob-container, .action-buttons-group').forEach((el) => {
      el.classList.remove('animating');
    });
    if (statWesternZodiac) statWesternZodiac.textContent = '--';
    if (statChineseZodiac) statChineseZodiac.textContent = '--';
    if (milestoneDayTitle) milestoneDayTitle.textContent = '10,000 Days Old';
    if (milestoneDayDate) milestoneDayDate.textContent = '--';
    if (milestoneDayCountdown) milestoneDayCountdown.textContent = 'In -- days';
    if (milestoneDayProgress) milestoneDayProgress.style.width = '0%';
    if (milestoneDayPercent) milestoneDayPercent.textContent = '0% toward goal';
    if (milestoneBdayTitle) milestoneBdayTitle.textContent = 'Next Milestone Birthday';
    if (milestoneBdayDate) milestoneBdayDate.textContent = '--';
    if (milestoneBdayCountdown) milestoneBdayCountdown.textContent = 'In -- days';
    if (milestoneBdayPill) milestoneBdayPill.textContent = 'Celebration';
    dobInput.focus();
    showToast('Calculator has been reset.');
  });

  // 8. Copy Result Button Handler
  copyBtn.addEventListener('click', async () => {
    if (!currentAgeData) {
      showToast('Please calculate your age first.');
      return;
    }

    const m = currentAgeData.milestones;
    const copyString = [
      '🎂 My Exact Age & Life Milestones:',
      `• Age: ${currentAgeData.years} Years, ${currentAgeData.months} Months, ${currentAgeData.days} Days`,
      `• Date of Birth: ${currentAgeData.formattedDob}`,
      `• Born on: ${currentAgeData.dayOfWeekBorn}`,
      `• Western Zodiac: ${currentAgeData.westernZodiac.displayName}`,
      `• Chinese Zodiac: ${currentAgeData.chineseZodiac.displayName}`,
      `• Total Days Lived: ${currentAgeData.totalDays.toLocaleString()} Days (${currentAgeData.totalWeeks.toLocaleString()} Weeks)`,
      `• Life Milestone: ${m ? m.dayMilestone.title + ' on ' + m.dayMilestone.dateFormatted + ' (in ' + m.dayMilestone.daysRemaining.toLocaleString() + ' days)' : ''}`,
      `• Next Milestone Birthday: ${m ? m.birthdayMilestone.title + ' on ' + m.birthdayMilestone.dateFormatted : ''}`,
      '— Calculated with Age Calculator'
    ].filter(Boolean).join('\n');

    let copied = false;
    if (navigator.clipboard && navigator.clipboard.writeText) {
      try {
        await navigator.clipboard.writeText(copyString);
        copied = true;
      } catch {
        copied = false;
      }
    }

    if (!copied) {
      try {
        const textarea = document.createElement('textarea');
        textarea.value = copyString;
        textarea.style.position = 'fixed';
        textarea.style.left = '-9999px';
        textarea.style.top = '0';
        document.body.appendChild(textarea);
        textarea.focus();
        textarea.select();
        copied = document.execCommand('copy');
        document.body.removeChild(textarea);
      } catch {
        copied = false;
      }
    }

    // Visual feedback
    copyText.textContent = 'Copied!';
    copyIcon.classList.add('hidden');
    checkIcon.classList.remove('hidden');
    showToast('Result copied to clipboard!');

    setTimeout(() => {
      copyText.textContent = 'Copy Result';
      copyIcon.classList.remove('hidden');
      checkIcon.classList.add('hidden');
    }, 2000);
  });

  // 9. Share Result Button Handler (Web Share API with fallback)
  shareBtn.addEventListener('click', async () => {
    if (!currentAgeData) {
      showToast('Please calculate your age first.');
      return;
    }

    const m = currentAgeData.milestones;
    const milestoneSummary = m ? ` Next milestone: ${m.dayMilestone.title} on ${m.dayMilestone.dateFormatted}!` : '';
    const shareData = {
      title: 'My Exact Age & Life Milestones',
      text: `I am ${currentAgeData.years} years, ${currentAgeData.months} months, and ${currentAgeData.days} days old! (Born on ${currentAgeData.dayOfWeekBorn}, ${currentAgeData.formattedDob} | ${currentAgeData.westernZodiac.displayName} | ${currentAgeData.chineseZodiac.displayName}). Total days lived: ${currentAgeData.totalDays.toLocaleString()} days.${milestoneSummary}`,
      url: window.location.href
    };

    if (navigator.share && navigator.canShare && navigator.canShare(shareData)) {
      try {
        await navigator.share(shareData);
      } catch (err) {
        if (err.name !== 'AbortError') {
          // If share failed for reason other than user cancel, copy instead
          copyBtn.click();
        }
      }
    } else {
      // Fallback: Copy to clipboard and notify
      copyBtn.click();
      showToast('Share not supported on this browser. Result copied to clipboard!');
    }
  });
});
}
