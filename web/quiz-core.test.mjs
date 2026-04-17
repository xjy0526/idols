import assert from 'node:assert/strict';
import { existsSync } from 'node:fs';
import test from 'node:test';

import { homeIdolOrder, idolGalleryImages, outcomesData, quizData } from './data/idol-data.mjs';
import {
  computeDimensionStats,
  computeQuizResult,
  createQuizSession,
  createSeededRandom,
  levelToNumber,
  rankNormalOutcomes
} from './quiz-core.mjs';

const localResultImageSources = new Map([
  ['./images/idols/wonyoung-white-sailor.jpg', 'wonyoung-white-sailor.jpg'],
  ['./images/idols/karina-black-beret-white-hair.jpg', 'karina-black-beret-white-hair.jpg'],
  ['./images/idols/jisoo-250219.jpg', '250219 블랙핑크 지수 Jisoo.jpg'],
  ['./images/idols/hyuna-20230720-cropped.jpg', '20230720 Kim HyunA in July 2023 01 (cropped).png'],
  ['./images/idols/sunmi-2024.jpg', 'Lee Sunmi 이선미 2024 01.jpg'],
  ['./images/idols/yujin-fendi.jpg', 'Ahn Yujin for FENDI.jpg'],
  ['./images/idols/jihyo-fancam-2023.jpg', 'JIHYO (지효) – FANCAM – 2023.08.26 – P3.png'],
  ['./images/idols/rei-mma-2023.jpg', 'MMA 2023 IVE Rei.jpg'],
  ['./images/idols/liz-221112.jpg', '221112 Liz (IVE).jpg'],
  ['./images/idols/tzuyu-2023.jpg', 'Chou Tzuyu 2023.jpg']
]);

function imageSourceFile(src) {
  if (localResultImageSources.has(src)) {
    return localResultImageSources.get(src);
  }

  const decoded = decodeURIComponent(src).split('?')[0];
  return decoded.split('/').pop();
}

function buildAnswersForPattern(pattern) {
  const questionsByDimension = new Map();

  quizData.questions.forEach((question) => {
    if (!questionsByDimension.has(question.dim)) {
      questionsByDimension.set(question.dim, []);
    }
    questionsByDimension.get(question.dim).push(question.id);
  });

  const twoQuestionAnswers = {
    L: [1, 1],
    M: [1, 3],
    H: [3, 3]
  };

  const answers = {};
  quizData.dimensionOrder.forEach((dimensionId, index) => {
    const questionIds = questionsByDimension.get(dimensionId);
    const dimensionAnswers = twoQuestionAnswers[pattern[index]];

    questionIds.forEach((questionId, questionIndex) => {
      answers[questionId] = dimensionAnswers[questionIndex];
    });
  });

  return answers;
}

test('idol quiz session exposes the 24 regular questions', () => {
  const session = createQuizSession(quizData, createSeededRandom(7));

  assert.equal(session.getVisibleQuestions().length, 24);
  assert.equal(session.getProgress().total, 24);
  assert.equal(session.getCurrentQuestion().id.startsWith('q'), true);
});

test('idol gallery contains 72 image entries', () => {
  assert.equal(idolGalleryImages.length, 72);
  assert.ok(idolGalleryImages.every((item) => item.name && item.src.startsWith('./images/idols/')));
});

test('all quiz images are bundled as local static assets', () => {
  const imagePaths = [
    ...idolGalleryImages.map((item) => item.src),
    ...outcomesData.outcomes.map((outcome) => outcome.image)
  ];
  const remoteImages = imagePaths.filter((src) => src.startsWith('http') || src.startsWith('/img/'));
  const missingImages = imagePaths
    .filter((src) => src.startsWith('./images/'))
    .filter((src) => !existsSync(new URL(src, import.meta.url)));

  assert.deepEqual(remoteImages, []);
  assert.deepEqual(missingImages, []);
});

test('idol gallery avoids obvious distant or multi-person photo sources', () => {
  const distantOrGroupSourcePatterns = [
    /Amsterdam concert/i,
    /Coachella/i,
    /Golden Hour concert/i,
    /Twice in Seattle/i,
    /2023 MMA IVE\.jpg/i,
    /230415 Tour/i,
    /from TWICE in Las Vegas/i
  ];

  const distantOrGroupSources = idolGalleryImages
    .map((item) => imageSourceFile(item.src))
    .filter((source) => distantOrGroupSourcePatterns.some((pattern) => pattern.test(source)));

  assert.deepEqual(distantOrGroupSources, []);
});

test('homepage and result portraits do not repeat the random gallery sources', () => {
  const gallerySources = new Set(idolGalleryImages.map((item) => imageSourceFile(item.src)));
  const duplicateSources = outcomesData.outcomes
    .map((outcome) => [outcome.code, imageSourceFile(outcome.image)])
    .filter(([, source]) => gallerySources.has(source));

  assert.deepEqual(duplicateSources, []);
});

test('result pool contains the requested 24 idol outcomes', () => {
  const codes = outcomesData.outcomes.map((outcome) => outcome.code);

  assert.equal(codes.length, 24);
  assert.deepEqual(codes.slice(0, 6), ['WONYOUNG', 'KARINA', 'JENNIE', 'JISOO', 'ROSE', 'IU']);
  assert.ok(codes.includes('SANA'));
  assert.ok(codes.includes('TZUYU'));
});

test('home idol order pins Wonyoung and Karina before grouped idols', () => {
  const codes = outcomesData.outcomes.map((outcome) => outcome.code);

  assert.equal(homeIdolOrder.length, 24);
  assert.equal(new Set(homeIdolOrder).size, 24);
  assert.ok(homeIdolOrder.every((code) => codes.includes(code)));
  assert.ok(codes.includes('MINA'));
  assert.ok(codes.includes('LISA'));
  assert.ok(codes.includes('GAEUL'));
  assert.deepEqual(homeIdolOrder, [
    'WONYOUNG', 'KARINA',
    'JISOO', 'JENNIE', 'ROSE', 'LISA',
    'GAEUL', 'YUJIN', 'REI', 'LIZ',
    'WINTER',
    'NAYEON', 'MOMO', 'SANA', 'JIHYO', 'MINA', 'TZUYU',
    'CHAEWON',
    'TAEYEON', 'YOONA',
    'SUZY',
    'IU', 'HYUNA', 'SUNMI'
  ]);
  assert.deepEqual(homeIdolOrder.slice(0, 2), ['WONYOUNG', 'KARINA']);
  assert.deepEqual(homeIdolOrder.slice(2, 6), ['JISOO', 'JENNIE', 'ROSE', 'LISA']);
  assert.deepEqual(homeIdolOrder.slice(6, 10), ['GAEUL', 'YUJIN', 'REI', 'LIZ']);
  assert.deepEqual(homeIdolOrder.slice(10, 11), ['WINTER']);
  assert.deepEqual(homeIdolOrder.slice(11, 17), ['NAYEON', 'MOMO', 'SANA', 'JIHYO', 'MINA', 'TZUYU']);
  assert.deepEqual(homeIdolOrder.slice(-3), ['IU', 'HYUNA', 'SUNMI']);
});

test('quiz session allows revisiting and changing the previous answer', () => {
  const session = createQuizSession(quizData, createSeededRandom(11));
  const firstQuestion = session.getCurrentQuestion();

  session.answerQuestion(firstQuestion.id, 1);
  const secondQuestion = session.getCurrentQuestion();

  assert.notEqual(secondQuestion.id, firstQuestion.id);
  assert.equal(session.getPosition().index, 1);

  session.previousQuestion();
  assert.equal(session.getCurrentQuestion().id, firstQuestion.id);
  assert.equal(session.getAnswers()[firstQuestion.id], 1);

  session.answerQuestion(firstQuestion.id, 3);
  assert.equal(session.getCurrentQuestion().id, secondQuestion.id);
  assert.equal(session.getAnswers()[firstQuestion.id], 3);
  assert.equal(session.getProgress().done, 1);
});

test('dimension stats produce the expected grouped pattern string', () => {
  const answers = buildAnswersForPattern('HMMMMMHHMHHM');
  const stats = computeDimensionStats(quizData, answers);

  assert.equal(stats.resultPattern, 'HMM-MMM-HHM-HHM');
  assert.deepEqual(stats.resultVector, [3, 2, 2, 2, 2, 2, 3, 3, 2, 3, 3, 2]);
});

test('exact Wonyoung pattern maps back to Wonyoung with 100% similarity', () => {
  const result = computeQuizResult(quizData, outcomesData, buildAnswersForPattern('LMLLHMLMHMHH'));

  assert.equal(result.finalType.code, 'WONYOUNG');
  assert.equal(result.bestNormal.distance, 0);
  assert.equal(result.bestNormal.exact, 12);
  assert.equal(result.bestNormal.similarity, 100);
});

test('exact Karina pattern maps back to Karina with 100% similarity', () => {
  const result = computeQuizResult(quizData, outcomesData, buildAnswersForPattern('MLMMLHHLHHMM'));

  assert.equal(result.finalType.code, 'KARINA');
  assert.equal(result.bestNormal.distance, 0);
  assert.equal(result.bestNormal.exact, 12);
  assert.equal(result.bestNormal.similarity, 100);
});

test('each exact idol pattern maps back to itself', () => {
  outcomesData.outcomes.forEach((outcome) => {
    const exactPattern = outcome.pattern.replace(/-/g, '');
    const result = computeQuizResult(quizData, outcomesData, buildAnswersForPattern(exactPattern));

    assert.equal(result.finalType.code, outcome.code);
    assert.equal(result.bestNormal.distance, 0);
    assert.equal(result.bestNormal.exact, 12);
  });
});

test('the engine still ranks a top five list for mixed answers', () => {
  const answers = buildAnswersForPattern('HMMLMMMLHHMH');
  const result = computeQuizResult(quizData, outcomesData, answers);

  assert.equal(result.ranked.length, outcomesData.outcomes.length);
  assert.equal(result.ranked[0].code, result.finalType.code);
  assert.notEqual(result.ranked[1].code, result.finalType.code);
  assert.ok(result.ranked[1].image);
  assert.ok(result.ranked[1].desc);
  assert.equal(result.ranked.slice(0, 5).length, 5);
  assert.ok(result.bestNormal.similarity >= result.ranked[4].similarity);
  assert.deepEqual(Object.keys(result.flags), ['specialOutcomeTriggered', 'fallbackTriggered']);
});

test('ranking can compare all dimension level combinations without throwing', () => {
  const levels = ['L', 'M', 'H'];
  let checked = 0;

  function walk(index, vector) {
    if (index === quizData.dimensionOrder.length) {
      const ranked = rankNormalOutcomes(outcomesData.outcomes, vector.map(levelToNumber));
      assert.equal(ranked.length, outcomesData.outcomes.length);
      checked += 1;
      return;
    }

    levels.forEach((level) => {
      vector.push(level);
      walk(index + 1, vector);
      vector.pop();
    });
  }

  walk(0, []);
  assert.equal(checked, 531441);
});

test('full theoretical result frequency stays reasonably balanced', () => {
  const levels = ['L', 'M', 'H'];
  const counts = Object.fromEntries(outcomesData.outcomes.map((outcome) => [outcome.code, 0]));
  let total = 0;

  function walk(index, vector) {
    if (index === quizData.dimensionOrder.length) {
      const ranked = rankNormalOutcomes(outcomesData.outcomes, vector.map(levelToNumber));
      counts[ranked[0].code] += 1;
      total += 1;
      return;
    }

    levels.forEach((level) => {
      vector.push(level);
      walk(index + 1, vector);
      vector.pop();
    });
  }

  walk(0, []);

  const percents = Object.values(counts).map((count) => count / total);
  assert.ok(Math.min(...percents) >= 0.032);
  assert.ok(Math.max(...percents) <= 0.052);
});
