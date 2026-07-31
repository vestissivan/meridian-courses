import { categories, courses, type Course } from "@/data/courses";

function normalize(value: string) {
  return value
    .toLowerCase()
    .replace(/ё/g, "е")
    .replace(/[^\p{L}\p{N}\s+#.:/-]/gu, " ")
    .replace(/\s+/g, " ")
    .trim();
}

function scoreCourse(course: Course, query: string): number {
  if (!query) return 0;
  const q = normalize(query);
  if (!q) return 0;

  const title = normalize(course.title);
  const category = normalize(course.category);
  const instructor = normalize(course.instructor);
  const keywords = course.keywords.map(normalize);
  const haystack = [title, category, instructor, ...keywords].join(" ");

  let score = 0;
  if (title === q) score += 200;
  if (title.startsWith(q)) score += 100;
  if (title.includes(q)) score += 70;
  if (category === q || category.includes(q)) score += 55;
  if (instructor.includes(q)) score += 35;
  if (keywords.some((k) => k === q)) score += 60;
  if (keywords.some((k) => k.startsWith(q) || q.startsWith(k))) score += 45;
  if (keywords.some((k) => k.includes(q) || q.includes(k))) score += 25;

  const tokens = q.split(" ").filter((t) => t.length >= 2);
  let tokenHits = 0;
  for (const token of tokens) {
    if (haystack.includes(token)) {
      tokenHits += 1;
      score += 8;
    }
  }
  // Require at least one meaningful hit
  if (score < 20 && tokenHits === 0) return 0;
  if (tokens.length >= 2 && tokenHits === 0) return 0;

  score += course.rating;
  return score;
}

export type CourseSuggestion = {
  type: "course";
  course: Course;
  score: number;
};

export type CategorySuggestion = {
  type: "category";
  id: string;
  name: string;
  count: string;
};

export type HintSuggestion = {
  type: "hint";
  label: string;
};

export type SearchSuggestion =
  | CourseSuggestion
  | CategorySuggestion
  | HintSuggestion;

export function searchCourses(query: string, limit = 12): Course[] {
  const q = normalize(query);
  if (!q) return courses;

  return courses
    .map((course) => ({ course, score: scoreCourse(course, q) }))
    .filter((item) => item.score >= 20)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((item) => item.course);
}

export function getSearchSuggestions(
  query: string,
  limit = 6,
): SearchSuggestion[] {
  const q = normalize(query);

  if (!q) {
    const popular = courses
      .slice()
      .sort((a, b) => b.rating - a.rating)
      .slice(0, 4)
      .map(
        (course): CourseSuggestion => ({
          type: "course",
          course,
          score: course.rating,
        }),
      );

    const cats = categories.slice(0, 3).map(
      (cat): CategorySuggestion => ({
        type: "category",
        id: cat.id,
        name: cat.name,
        count: cat.count,
      }),
    );

    return [...popular, ...cats];
  }

  const courseHits = courses
    .map((course) => ({ course, score: scoreCourse(course, q) }))
    .filter((item) => item.score >= 20)
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(
      (item): CourseSuggestion => ({
        type: "course",
        course: item.course,
        score: item.score,
      }),
    );

  const categoryHits = categories
    .filter((cat) => normalize(cat.name).includes(q))
    .slice(0, 3)
    .map(
      (cat): CategorySuggestion => ({
        type: "category",
        id: cat.id,
        name: cat.name,
        count: cat.count,
      }),
    );

  return [...courseHits, ...categoryHits].slice(0, limit + 2);
}

export function highlightMatch(text: string, query: string): string[] {
  const q = query.trim();
  if (!q) return [text];
  const idx = text.toLowerCase().indexOf(q.toLowerCase());
  if (idx < 0) {
    // try first meaningful token
    const token = q.split(/\s+/).find((t) => t.length >= 2);
    if (!token) return [text];
    const tIdx = text.toLowerCase().indexOf(token.toLowerCase());
    if (tIdx < 0) return [text];
    return [
      text.slice(0, tIdx),
      text.slice(tIdx, tIdx + token.length),
      text.slice(tIdx + token.length),
    ];
  }
  return [
    text.slice(0, idx),
    text.slice(idx, idx + q.length),
    text.slice(idx + q.length),
  ];
}
