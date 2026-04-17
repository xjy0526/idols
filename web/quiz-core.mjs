export const NORMAL_TYPE_SIMILARITY_FALLBACK_THRESHOLD = 60;
export const SIMILARITY_DISTANCE_DENOMINATOR = 24;

export function createSeededRandom(seed) {
  const normalized = Number(seed);
  let state = Number.isFinite(normalized) ? normalized >>> 0 : 0;

  if (state === 0) {
    state = 0x6d2b79f5;
  }

  return function seededRandom() {
    state += 0x6d2b79f5;
    let t = state;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

export function shuffle(array, random = Math.random) {
  const arr = [...array];
  for (let index = arr.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(random() * (index + 1));
    [arr[index], arr[swapIndex]] = [arr[swapIndex], arr[index]];
  }
  return arr;
}

export function scoreToLevel(score) {
  if (score < 1.75) {
    return 'L';
  }
  if (score < 2.5) {
    return 'M';
  }
  return 'H';
}

export function levelToNumber(level) {
  const lookup = { L: 1, M: 2, H: 3 };
  const value = lookup[level];
  if (!value) {
    throw new Error(`Unknown level: ${level}`);
  }
  return value;
}

function tieScoreFor(resultVector, code) {
  let hash = 2166136261;

  resultVector.forEach((value) => {
    hash ^= value + 31;
    hash = Math.imul(hash, 16777619);
  });

  for (let index = 0; index < code.length; index += 1) {
    hash ^= code.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }

  return hash >>> 0;
}

export function buildPatternFromLevels(levels, dimensionOrder, groupSize = 3) {
  const letters = dimensionOrder.map((dimensionId) => levels[dimensionId]);
  const groups = [];

  for (let index = 0; index < letters.length; index += groupSize) {
    groups.push(letters.slice(index, index + groupSize).join(''));
  }

  return groups.join('-');
}

export function getQuestionMetaLabel(question) {
  return question.special ? '补充题' : '成为题';
}

export function getVisibleQuestions(sessionState) {
  const visible = [...sessionState.shuffledQuestions];
  const [gateQuestion, hiddenQuestion] = sessionState.specialQuestions;

  if (!gateQuestion || !hiddenQuestion) {
    return visible;
  }

  const gateIndex = visible.findIndex((question) => question.id === gateQuestion.id);

  if (
    gateIndex !== -1 &&
    Number(sessionState.answers[gateQuestion.id]) === Number(sessionState.branchQuestionValue)
  ) {
    visible.splice(gateIndex + 1, 0, hiddenQuestion);
  }

  return visible;
}

export function createQuizSession(quizData, random = Math.random) {
  const specialQuestions = (quizData.specialQuestions || []).map((question) => ({
    ...question,
    options: question.options.map((option) => ({ ...option }))
  }));
  const regularQuestions = quizData.questions.map((question) => ({
    ...question,
    options: question.options.map((option) => ({ ...option }))
  }));
  const shuffledRegular = shuffle(regularQuestions, random);
  const insertIndex = Math.floor(random() * shuffledRegular.length) + 1;

  const state = {
    answers: {},
    branchQuestionId: quizData.branchQuestionId ?? specialQuestions[0]?.id ?? null,
    branchQuestionValue: quizData.branchQuestionValue ?? 3,
    currentIndex: 0,
    specialQuestions,
    shuffledQuestions: specialQuestions[0]
      ? [
          ...shuffledRegular.slice(0, insertIndex),
          specialQuestions[0],
          ...shuffledRegular.slice(insertIndex)
        ]
      : shuffledRegular
  };

  const clampCurrentIndex = () => {
    const visibleQuestions = getVisibleQuestions(state);
    state.currentIndex = Math.min(Math.max(state.currentIndex, 0), visibleQuestions.length);
    return visibleQuestions;
  };

  const getCurrentQuestion = () => {
    const visibleQuestions = clampCurrentIndex();
    return visibleQuestions[state.currentIndex] ?? null;
  };

  const getProgress = () => {
    const visibleQuestions = getVisibleQuestions(state);
    const total = visibleQuestions.length;
    const done = visibleQuestions.filter((question) => state.answers[question.id] !== undefined).length;
    return {
      done,
      total,
      complete: total > 0 && done === total
    };
  };

  return {
    getAnswers() {
      return { ...state.answers };
    },
    getCurrentQuestion() {
      const current = getCurrentQuestion();
      return current
        ? { ...current, options: current.options.map((option) => ({ ...option })) }
        : null;
    },
    getVisibleQuestions() {
      return getVisibleQuestions(state).map((question) => ({
        ...question,
        options: question.options.map((option) => ({ ...option }))
      }));
    },
    getProgress,
    getPosition() {
      const visibleQuestions = clampCurrentIndex();
      return {
        index: state.currentIndex,
        total: visibleQuestions.length,
        canGoPrevious: state.currentIndex > 0,
        canGoNext:
          state.currentIndex < visibleQuestions.length &&
          state.answers[visibleQuestions[state.currentIndex]?.id] !== undefined,
        complete: visibleQuestions.length > 0 && state.currentIndex >= visibleQuestions.length
      };
    },
    previousQuestion() {
      clampCurrentIndex();
      state.currentIndex = Math.max(0, state.currentIndex - 1);
      return this.getPosition();
    },
    nextQuestion() {
      const visibleQuestions = clampCurrentIndex();
      const currentQuestion = visibleQuestions[state.currentIndex];

      if (!currentQuestion || state.answers[currentQuestion.id] === undefined) {
        return this.getPosition();
      }

      state.currentIndex = Math.min(visibleQuestions.length, state.currentIndex + 1);
      return this.getPosition();
    },
    answerQuestion(questionId, value) {
      const currentQuestion = getCurrentQuestion();

      if (!currentQuestion) {
        throw new Error('All visible questions have already been answered.');
      }

      if (currentQuestion.id !== questionId) {
        throw new Error(`Expected answer for ${currentQuestion.id}, received ${questionId}.`);
      }

      state.answers[questionId] = Number(value);

      if (
        state.branchQuestionId &&
        questionId === state.branchQuestionId &&
        Number(value) !== Number(state.branchQuestionValue)
      ) {
        const hiddenQuestionId = specialQuestions[1]?.id;
        if (hiddenQuestionId) {
          delete state.answers[hiddenQuestionId];
        }
      }

      const visibleQuestions = clampCurrentIndex();
      state.currentIndex = Math.min(visibleQuestions.length, state.currentIndex + 1);

      return getProgress();
    }
  };
}

export function computeDimensionStats(quizData, answersInput = {}) {
  const answers = Object.fromEntries(
    Object.entries(answersInput).map(([questionId, value]) => [questionId, Number(value)])
  );
  const rawScores = {};
  const answerCounts = {};
  const averageScores = {};
  const levels = {};

  quizData.dimensionOrder.forEach((dimensionId) => {
    rawScores[dimensionId] = 0;
    answerCounts[dimensionId] = 0;
  });

  quizData.questions.forEach((question) => {
    const answer = Number(answers[question.id] || 0);
    if (answer > 0) {
      rawScores[question.dim] += answer;
      answerCounts[question.dim] += 1;
    }
  });

  quizData.dimensionOrder.forEach((dimensionId) => {
    averageScores[dimensionId] = answerCounts[dimensionId] > 0
      ? Number((rawScores[dimensionId] / answerCounts[dimensionId]).toFixed(2))
      : 0;
    levels[dimensionId] = scoreToLevel(averageScores[dimensionId]);
  });

  return {
    answers,
    rawScores,
    answerCounts,
    averageScores,
    levels,
    resultPattern: buildPatternFromLevels(levels, quizData.dimensionOrder),
    resultVector: quizData.dimensionOrder.map((dimensionId) => levelToNumber(levels[dimensionId]))
  };
}

export function rankNormalOutcomes(outcomes, resultVector) {
  return outcomes
    .filter((outcome) => !outcome.isSpecial)
    .map((outcome) => {
      const vector = outcome.vector.map((entry) => levelToNumber(entry.level));
      let distance = 0;
      let exact = 0;

      for (let index = 0; index < vector.length; index += 1) {
        const diff = Math.abs(resultVector[index] - vector[index]);
        distance += diff;
        if (diff === 0) {
          exact += 1;
        }
      }

      return {
        ...outcome,
        distance,
        exact,
        tieScore: tieScoreFor(resultVector, outcome.code),
        similarity: Math.max(
          0,
          Math.round((1 - distance / SIMILARITY_DISTANCE_DENOMINATOR) * 100)
        )
      };
    })
    .sort((left, right) => {
      if (left.distance !== right.distance) {
        return left.distance - right.distance;
      }
      if (right.exact !== left.exact) {
        return right.exact - left.exact;
      }
      if (right.similarity !== left.similarity) {
        return right.similarity - left.similarity;
      }
      return left.tieScore - right.tieScore;
    });
}

export function computeQuizResult(quizData, outcomesData, answersInput = {}) {
  const stats = computeDimensionStats(quizData, answersInput);
  const ranked = rankNormalOutcomes(outcomesData.outcomes, stats.resultVector);
  const bestNormal = ranked[0];
  const outcomesByCode = Object.fromEntries(outcomesData.outcomes.map((outcome) => [outcome.code, outcome]));
  const specialOutcomeTriggered =
    Boolean(quizData.specialOutcomeCode && quizData.specialOutcomeQuestionId) &&
    Number(stats.answers[quizData.specialOutcomeQuestionId] || 0) ===
      Number(quizData.specialOutcomeQuestionValue ?? 2);
  const fallbackThreshold = Number(
    quizData.fallbackThreshold ?? NORMAL_TYPE_SIMILARITY_FALLBACK_THRESHOLD
  );
  const fallbackTriggered =
    Boolean(quizData.fallbackOutcomeCode) &&
    !specialOutcomeTriggered &&
    bestNormal.similarity < fallbackThreshold;

  let finalType = bestNormal;
  let modeKicker = '你的主类型';
  const dimensionCount = quizData.dimensionOrder.length;
  let badge = `匹配度 ${bestNormal.similarity}% · 精准命中 ${bestNormal.exact}/${dimensionCount} 维`;
  let sub = '维度命中度较高，当前结果可视为你的第一成为画像。';
  let special = false;
  let secondaryType = null;

  if (specialOutcomeTriggered && outcomesByCode[quizData.specialOutcomeCode]) {
    finalType = outcomesByCode[quizData.specialOutcomeCode];
    modeKicker = quizData.specialOutcomeTitle ?? '特殊路线已激活';
    badge = quizData.specialOutcomeBadge ?? '特殊结果已触发';
    sub = quizData.specialOutcomeSub ?? '你的回答触发了独立分支。';
    secondaryType = bestNormal;
    special = true;
  } else if (fallbackTriggered && outcomesByCode[quizData.fallbackOutcomeCode]) {
    finalType = outcomesByCode[quizData.fallbackOutcomeCode];
    modeKicker = quizData.fallbackTitle ?? '系统强制兜底';
    badge = quizData.fallbackBadgeTemplate
      ? quizData.fallbackBadgeTemplate.replace('{similarity}', String(bestNormal.similarity))
      : `标准路线库最高匹配仅 ${bestNormal.similarity}%`;
    sub =
      quizData.fallbackSub ??
      '你的答案组合比较跳脱，系统给了你一个更适合的兜底路线。';
    special = true;
  }

  return {
    ...stats,
    ranked,
    bestNormal,
    finalType,
    modeKicker,
    badge,
    sub,
    special,
    secondaryType,
    flags: {
      specialOutcomeTriggered,
      fallbackTriggered
    }
  };
}
