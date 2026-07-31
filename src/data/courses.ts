export type Course = {
  id: string;
  title: string;
  category: string;
  instructor: string;
  rating: number;
  reviews: string;
  students: string;
  duration: string;
  level: "Начальный" | "Средний" | "Продвинутый";
  price: number;
  image: string;
  badge?: string;
  keywords: string[];
};

export type Category = {
  id: string;
  name: string;
  count: string;
  description: string;
};

export type Instructor = {
  id: string;
  name: string;
  role: string;
  courses: number;
  students: string;
  image: string;
  bio: string;
};

export type Testimonial = {
  id: string;
  quote: string;
  name: string;
  title: string;
  outcome: string;
};

export type Stat = {
  label: string;
  value: number;
  decimalPlaces?: number;
  suffix?: string;
  prefix?: string;
};

export const categories: Category[] = [
  {
    id: "data",
    name: "Данные и аналитика",
    count: "180+",
    description: "SQL, дашборды и истории, на которых принимают решения.",
  },
  {
    id: "design",
    name: "Продуктовый дизайн",
    count: "95+",
    description: "Исследования, UI-системы и портфолио, которое продаёт.",
  },
  {
    id: "engineering",
    name: "Разработка",
    count: "210+",
    description: "Современный стек, системное мышление и чистый код.",
  },
  {
    id: "ai",
    name: "ИИ и ML",
    count: "120+",
    description: "Практичные модели, агенты и пайплайны под продукт.",
  },
  {
    id: "marketing",
    name: "Growth-маркетинг",
    count: "88+",
    description: "Петли роста, голос бренда и платные системы.",
  },
  {
    id: "leadership",
    name: "Лидерство",
    count: "64+",
    description: "Стратегия, коммуникация и сильные команды.",
  },
];

export const courses: Course[] = [
  {
    id: "data-storytelling",
    title: "Data Storytelling для тех, кто принимает решения",
    category: "Данные и аналитика",
    instructor: "Прия Наир",
    rating: 4.9,
    reviews: "12,4 тыс.",
    students: "86 тыс.",
    duration: "6 недель",
    level: "Средний",
    price: 7900,
    image: "/images/course-data.jpg",
    badge: "Хит",
    keywords: [
      "данные",
      "аналитика",
      "sql",
      "storytelling",
      "дашборд",
      "excel",
      "визуализация",
      "bi",
    ],
  },
  {
    id: "product-systems",
    title: "Дизайн-системы продукта с нуля",
    category: "Продуктовый дизайн",
    instructor: "Маркус Хейл",
    rating: 4.8,
    reviews: "8,1 тыс.",
    students: "54 тыс.",
    duration: "8 недель",
    level: "Начальный",
    price: 8900,
    image: "/images/course-design.jpg",
    badge: "Новое",
    keywords: [
      "дизайн",
      "ui",
      "ux",
      "figma",
      "дизайн-система",
      "продукт",
      "интерфейс",
      "prototyping",
    ],
  },
  {
    id: "full-stack-craft",
    title: "Full-stack инженерия как ремесло",
    category: "Разработка",
    instructor: "Кенджи Окада",
    rating: 4.9,
    reviews: "15,2 тыс.",
    students: "112 тыс.",
    duration: "12 недель",
    level: "Средний",
    price: 11900,
    image: "/images/course-code.jpg",
    keywords: [
      "разработка",
      "код",
      "javascript",
      "typescript",
      "react",
      "backend",
      "fullstack",
      "программирование",
      "api",
    ],
  },
  {
    id: "practical-ai",
    title: "Практический ИИ для продуктовых команд",
    category: "ИИ и ML",
    instructor: "Прия Наир",
    rating: 4.8,
    reviews: "9,6 тыс.",
    students: "71 тыс.",
    duration: "5 недель",
    level: "Начальный",
    price: 9900,
    image: "/images/course-ai.jpg",
    badge: "В тренде",
    keywords: [
      "ии",
      "ai",
      "ml",
      "chatgpt",
      "llm",
      "машинное обучение",
      "агенты",
      "нейрон",
      "prompt",
    ],
  },
  {
    id: "growth-loops",
    title: "Growth-петли, которые действительно растут",
    category: "Growth-маркетинг",
    instructor: "Маркус Хейл",
    rating: 4.7,
    reviews: "6,3 тыс.",
    students: "41 тыс.",
    duration: "4 недели",
    level: "Средний",
    price: 6900,
    image: "/images/course-marketing.jpg",
    keywords: [
      "маркетинг",
      "growth",
      "реклама",
      "прирост",
      "retention",
      "воронка",
      "product-led",
      "seo",
    ],
  },
  {
    id: "lead-with-clarity",
    title: "Лидерство с ясностью под давлением",
    category: "Лидерство",
    instructor: "Кенджи Окада",
    rating: 4.9,
    reviews: "5,8 тыс.",
    students: "38 тыс.",
    duration: "6 недель",
    level: "Продвинутый",
    price: 10900,
    image: "/images/course-leadership.jpg",
    keywords: [
      "лидерство",
      "менеджмент",
      "управление",
      "команда",
      "soft skills",
      "стратегия",
      "1:1",
    ],
  },
];

export const popularSearchHints = [
  "ИИ",
  "дизайн",
  "SQL",
  "React",
  "лидерство",
  "маркетинг",
  "Python",
  "Figma",
];

export const instructors: Instructor[] = [
  {
    id: "priya",
    name: "Прия Наир",
    role: "Head of Analytics, ранее Stripe",
    courses: 14,
    students: "240 тыс.",
    image: "/images/instructor-priya.jpg",
    bio: "Превращает сложные данные в решения, которые команда может запустить.",
  },
  {
    id: "marcus",
    name: "Маркус Хейл",
    role: "Дизайн-лид, продуктовые системы",
    courses: 11,
    students: "180 тыс.",
    image: "/images/instructor-marcus.jpg",
    bio: "Строит дизайн-системы от MVP стартапа до enterprise-масштаба.",
  },
  {
    id: "kenji",
    name: "Кенджи Окада",
    role: "Engineering director и автор",
    courses: 9,
    students: "210 тыс.",
    image: "/images/instructor-kenji.jpg",
    bio: "Учит инженерному ремеслу ясно — без лишней церемонии.",
  },
];

export const testimonials: Testimonial[] = [
  {
    id: "1",
    quote:
      "Meridian — первая платформа, где ощущался живой ментор, а не свалка видео. За шесть недель собрала портфолио и получила три оффера на интервью.",
    name: "Елена Восс",
    title: "Product designer → Senior UX",
    outcome: "Повышение за 4 месяца",
  },
  {
    id: "2",
    quote:
      "Главное — проекты. На новой роли в аналитике я уже говорила на языке стейкхолдеров, а не только SQL.",
    name: "Иона Рид",
    title: "Аналитик в Series B стартапе",
    outcome: "Смена карьеры",
  },
  {
    id: "3",
    quote:
      "Чистые уроки, жёсткий фокус и преподаватели, которые сами шипят. Стоило каждого часа в календаре.",
    name: "Амира Солтани",
    title: "Engineering manager",
    outcome: "Команда выросла в Q1",
  },
];

export const stats: Stat[] = [
  { label: "Активных учеников", value: 2.4, decimalPlaces: 1, suffix: " млн" },
  { label: "Курсов от экспертов", value: 1200, suffix: "+" },
  { label: "Средняя оценка", value: 4.8, decimalPlaces: 1 },
  { label: "Карьерных результатов", value: 91, suffix: "%" },
];

export const marqueeItems = [
  "Данные",
  "Дизайн",
  "Разработка",
  "Искусственный интеллект",
  "Маркетинг",
  "Лидерство",
  "Продукт",
  "Аналитика",
  "UX Research",
  "MLOps",
];

export const plans = [
  {
    id: "single",
    name: "Один курс",
    price: "от 6 900 ₽",
    period: "разово",
    description: "Курс навсегда. Когда точно знаете, чему учиться.",
    features: [
      "Пожизненный доступ к одному курсу",
      "Проекты и материалы для скачивания",
      "Сертификат об окончании",
      "Q&A в сообществе",
    ],
    cta: "Смотреть курсы",
    highlighted: false,
  },
  {
    id: "plus",
    name: "Meridian Plus",
    price: "2 900 ₽",
    period: "/мес",
    description: "Безлимитное обучение и новые релизы каждую неделю.",
    features: [
      "Доступ ко всем 1 200+ курсам",
      "Новые курсы каждую неделю",
      "Сертификаты на каждый курс",
      "Траектории и трекинг прогресса",
      "Приоритетные office hours",
    ],
    cta: "Начать пробный период",
    highlighted: true,
  },
  {
    id: "teams",
    name: "Для команд",
    price: "Индивидуально",
    period: "",
    description: "Системный апскилл для product, eng и ops команд.",
    features: [
      "Админка и управление местами",
      "Ролевые learning paths",
      "Аналитика использования",
      "SSO и выставление счетов",
    ],
    cta: "Связаться с sales",
    highlighted: false,
  },
];
