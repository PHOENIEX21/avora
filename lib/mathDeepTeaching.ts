import { keyTermsForTeaching } from './academicVocabulary';

import { jss1MathematicsDeepLessons } from './jss1MathematicsDeepLessons';
import { jss2MathematicsDeepLessons } from './jss2MathematicsDeepLessons';
import { jss3MathematicsDeepLessons } from './jss3MathematicsDeepLessons';

import assessmentBank from '@/data/jss1-jss2-assessment-bank.json';

type RichTerm = {
  term: string;
  simple: string;
  formal: string;
  example: string;
  contrast: string;
  use: string;
};

type StructuredExample = {
  title: string;
  problem: string;
  steps: string[];
  why: string;
  check: string;
  verification?: string;
  difficulty?: number;
  curriculumFocus?: string;
};

type StandardQuestion = {
  id: string;
  prompt: string;
  questionType: string;
  options: string[];
  correctAnswer: string;
  explanation: string;
  difficulty: number;
  assessmentKind: string;
  curriculumObjective: string;
  misconceptionTags: string[];
};

export type MathTeachingPack = {
  terms: RichTerm[];
  workedExamples: StructuredExample[];
  standardQuestions: StandardQuestion[];
};

type DeepMathLesson = {
  topicId: string;
  classLevel: string;
  subject: 'Mathematics';
  topic: string;
  objectives: string[];
  prerequisites: string[];
  teaching: string[];
  workedExamples: string[];
  misconceptions: string[];
  guidedPractice: string[];
  independentPractice: string[];
};

function normalize(value: string): string {
  return String(value || '')
    .toLowerCase()
    .replace(/[–—]/g, '-')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim()
    .replace(/\s+/g, ' ');
}

function lessonFor(
  classLevel: string,
  topic: string
): DeepMathLesson | undefined {
  let lessons: DeepMathLesson[] = [];

  if (classLevel === 'JSS1') {
    lessons = jss1MathematicsDeepLessons as DeepMathLesson[];
  } else if (classLevel === 'JSS2') {
    lessons = jss2MathematicsDeepLessons as DeepMathLesson[];
  } else if (classLevel === 'JSS3') {
    lessons = jss3MathematicsDeepLessons as DeepMathLesson[];
  } else {
    return undefined;
  }

  const exact = lessons.find(
    (lesson) => lesson.topic === topic
  );

  if (exact) return exact;

  const wanted = normalize(topic);

  return lessons.find(
    (lesson) => normalize(lesson.topic) === wanted
  );
}

function richTermsFor(
  lesson: DeepMathLesson
): RichTerm[] {
  const sourceText = [
    ...lesson.objectives,
    ...lesson.prerequisites,
    ...lesson.teaching,
    ...lesson.misconceptions,
  ].join(' ');

  const terms = keyTermsForTeaching(
    'Mathematics',
    lesson.topic,
    sourceText
  );

  return terms.map(([term, meaning]) => ({
    term,
    simple: meaning,
    formal: meaning,
    example: `Watch how "${term}" is used in the worked examples for ${lesson.topic}.`,
    contrast: `Do not use "${term}" as an unexplained label. Connect it to its mathematical meaning and the current problem.`,
    use: `Understanding "${term}" helps you explain the reasoning required in ${lesson.topic}, rather than only memorising a procedure.`,
  }));
}

function structuredExample(
  text: string,
  index: number,
  lesson: DeepMathLesson
): StructuredExample {
  const raw = String(text || '').trim();

  const chunks = raw
    .split(/(?:\s*→\s*|;\s+|(?<=[.!?])\s+)/)
    .map((part) => part.trim())
    .filter(Boolean);

  const problem = chunks[0] || raw;

  const steps =
    chunks.length > 1
      ? chunks.slice(1, 9)
      : [raw];

  return {
    title: `AUTHORED WORKED EXAMPLE ${index + 1}`,
    problem,
    steps,
    why:
      lesson.teaching[index % Math.max(1, lesson.teaching.length)] ||
      `This example applies the governing mathematical ideas required for ${lesson.topic}.`,
    check:
      lesson.guidedPractice[
        index % Math.max(1, lesson.guidedPractice.length)
      ] ||
      `Explain the rule used in this example and apply it to a similar problem.`,
    verification:
      `Check every transformation or calculation against the original problem. A final answer is not enough unless the reasoning remains mathematically valid.`,
    difficulty: Math.min(index + 1, 5),
    curriculumFocus:
      lesson.objectives[
        index % Math.max(1, lesson.objectives.length)
      ] || lesson.topic,
  };
}

function questionsFor(
  classLevel: string,
  topic: string
): StandardQuestion[] {
  if (classLevel !== 'JSS1' && classLevel !== 'JSS2') {
    return [];
  }

  const wantedTopic = normalize(topic);

  return assessmentBank.questions
    .filter(
      (question) =>
        question.classLevel === classLevel &&
        question.subject === 'Mathematics' &&
        normalize(question.topic) === wantedTopic &&
        question.qualityStatus === 'REVIEWED' &&
        question.contentOrigin === 'AVORA_ORIGINAL'
    )
    .map((question) => ({
      id: question.id,
      prompt: question.prompt,
      questionType: question.questionType,
      options: question.options,
      correctAnswer: question.correctAnswer,
      explanation: question.explanation,
      difficulty: question.difficulty,
      assessmentKind: question.assessmentKind,
      curriculumObjective: question.curriculumObjective,
      misconceptionTags: question.misconceptionTags,
    }));
}

export function mathTeachingPack(
  classLevel: string,
  topic: string
): MathTeachingPack | undefined {
  const lesson = lessonFor(classLevel, topic);

  if (!lesson) {
    return undefined;
  }

  return {
    terms: richTermsFor(lesson),

    workedExamples: lesson.workedExamples.map(
      (example, index) =>
        structuredExample(example, index, lesson)
    ),

    standardQuestions: questionsFor(
      classLevel,
      lesson.topic
    ),
  };
}