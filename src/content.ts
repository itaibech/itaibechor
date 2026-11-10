// Static profile content (from LinkedIn). Habits & favourites live in Supabase, edited at /#/admin.
export type Lang = 'en' | 'he'
export type Text = Record<Lang, string>

export interface Job {
  company: string
  role: Text
  period: string
  points: Text[]
}

export interface Degree {
  school: Text
  title: Text
  period: string
}

export const ui = {
  en: {
    nav: { about: 'About', career: 'Career', education: 'Education', habits: 'Habits', favorites: 'Favourites', contact: 'Contact' },
    hello: "Hi, I'm",
    name: 'Itai Bechor',
    headline: 'Full Stack Team Leader · Software Architect · AI Enthusiast',
    tagline: ['I build', 'great software', 'and great teams.'],
    intro:
      '20 years of building software, from C++ face recognition and 3D airport graphics to cloud-scale React & Java platforms. Today I lead the SolarEdge ONE full-stack team, shipping smart-energy software with a strong AI-first workflow.',
    stats: [
      ['20+', 'years in software'],
      ['12', 'people on my team'],
      ['8', 'years leading teams'],
    ],
    cta: 'Get in touch',
    aboutTitle: 'About me',
    about: [
      'Hands-on leader who still loves code reviews, pair programming and vibe-coding sessions with the team.',
      'Agile by heart: I run planning, refinements and retros to keep delivery fast and predictable.',
      'Security-minded: years of owning web security, SAST and pen-test remediation.',
      'AI enthusiast: Cursor and Claude Code are part of how my team builds every day.',
    ],
    careerTitle: 'Career',
    educationTitle: 'Education',
    habitsTitle: 'Habits',
    favoritesTitle: 'Favourite pages',
    empty: 'Coming soon…',
    contactTitle: "Let's talk",
    contactName: 'Your name',
    contactEmail: 'Your email',
    contactBody: 'Message',
    send: 'Send',
    sent: 'Thanks! I will get back to you soon.',
    error: 'Something went wrong, please try again.',
    views: 'views',
    like: 'Like this page',
    footer: 'Built with React, Supabase & Claude Code',
  },
  he: {
    nav: { about: 'אודות', career: 'קריירה', education: 'השכלה', habits: 'הרגלים', favorites: 'מועדפים', contact: 'צור קשר' },
    hello: 'היי, אני',
    name: 'איתי בכור',
    headline: 'ראש צוות Full Stack · ארכיטקט תוכנה · חובב AI',
    tagline: ['אני בונה', 'תוכנה מעולה', 'וצוותים מעולים.'],
    intro:
      '20 שנה של פיתוח תוכנה, מזיהוי פנים ב-C++ וגרפיקת תלת-ממד לשדות תעופה ועד פלטפורמות React ו-Java בענן. היום אני מוביל את צוות ה-Full Stack של SolarEdge ONE ומפתח תוכנה לאנרגיה חכמה עם תהליך עבודה מבוסס AI.',
    stats: [
      ['20+', 'שנים בתוכנה'],
      ['12', 'אנשים בצוות'],
      ['8', 'שנים בהובלת צוותים'],
    ],
    cta: 'בואו נדבר',
    aboutTitle: 'קצת עליי',
    about: [
      'מוביל Hands-on שעדיין אוהב Code Review, Pair Programming ו-Vibe Coding עם הצוות.',
      'אג׳ייל בלב: מוביל תכנונים, ריפיינמנטים ורטרו כדי שהאספקה תהיה מהירה וצפויה.',
      'מודע אבטחה: שנים של אחריות על אבטחת Web, סריקות SAST ותיקוני PT.',
      'חובב AI: ‏Cursor ו-Claude Code הם חלק מהעבודה היומיומית של הצוות.',
    ],
    careerTitle: 'קריירה',
    educationTitle: 'השכלה',
    habitsTitle: 'הרגלים',
    favoritesTitle: 'דפים מועדפים',
    empty: 'בקרוב…',
    contactTitle: 'בואו נדבר',
    contactName: 'שם',
    contactEmail: 'אימייל',
    contactBody: 'הודעה',
    send: 'שליחה',
    sent: 'תודה! אחזור אליך בהקדם.',
    error: 'משהו השתבש, נסו שוב.',
    views: 'צפיות',
    like: 'אהבתי',
    footer: 'נבנה עם React, ‏Supabase ו-Claude Code',
  },
}

const t = (en: string, he: string): Text => ({ en, he })

export const jobs: Job[] = [
  {
    company: 'SolarEdge Technologies',
    role: t('Full Stack Team Leader', 'ראש צוות Full Stack'),
    period: '2025 – Present',
    points: [
      t('Leading a full-stack scrum team of 10 developers and 2 QA engineers on SolarEdge ONE.', 'מוביל צוות סקראם של 10 מפתחים ו-2 בודקי QA ב-SolarEdge ONE.'),
      t('End-to-end delivery, architecture decisions and production stability.', 'אחריות מקצה לקצה על האספקה, החלטות ארכיטקטורה ויציבות הפרודקשן.'),
      t('AI-powered development with Cursor & Claude Code, GitLab CI/CD.', 'פיתוח מבוסס AI עם Cursor ו-Claude Code, ‏GitLab CI/CD.'),
    ],
  },
  {
    company: 'SolarEdge Technologies',
    role: t('Frontend Team Leader', 'ראש צוות Frontend'),
    period: '2023 – 2025',
    points: [
      t('Led a frontend team of 3–5 engineers building React apps (Ant Design, Material UI).', 'הובלת צוות Frontend של 3–5 מהנדסים בפיתוח אפליקציות React ‏(Ant Design, Material UI).'),
      t('Drove code quality through reviews, mentoring and pair programming.', 'שיפור איכות הקוד דרך Code Review, חניכה ו-Pair Programming.'),
    ],
  },
  {
    company: 'BMC Software',
    role: t('R&D Manager', 'מנהל פיתוח'),
    period: '2021 – 2023',
    points: [
      t('Managed an agile team of 6 developers, hands-on in feature development.', 'ניהול צוות אג׳ייל של 6 מפתחים, כולל פיתוח Hands-on.'),
      t('Owned web security: penetration tests and SAST scan remediation.', 'אחריות על אבטחת Web: מבדקי חדירה ותיקון ממצאי SAST.'),
    ],
  },
  {
    company: 'BMC Software',
    role: t('Development Team Lead', 'ראש צוות פיתוח'),
    period: '2018 – 2021',
    points: [
      t('Full-stack scrum lead: Angular web client, Java server, legacy C#/WPF.', 'ראש צוות Full Stack: ‏Angular בצד לקוח, Java בצד שרת, ותחזוקת C#/WPF.'),
    ],
  },
  {
    company: 'Genesys (acquired Utopy)',
    role: t('Staff Software Engineer, Full Stack', 'Staff Software Engineer, Full Stack'),
    period: '2012 – 2018',
    points: [
      t('Built speech & text analytics features with AngularJS, ASP.NET, C# and SQL.', 'פיתוח פיצ׳רים לניתוח דיבור וטקסט עם AngularJS, ‏ASP.NET, ‏C# ו-SQL.'),
      t('Led the migration from ASP.NET to AngularJS and new-tech POCs.', 'הובלת המעבר מ-ASP.NET ל-AngularJS ו-POC לטכנולוגיות חדשות.'),
    ],
  },
  {
    company: 'CTrue',
    role: t('Application Team Leader', 'ראש צוות אפליקציה'),
    period: '2009 – 2012',
    points: [
      t('Face recognition apps in C++ and C# (OpenCV, WPF, WCF), e-passport border gates.', 'אפליקציות זיהוי פנים ב-C++ וב-C# ‏(OpenCV, WPF, WCF) ושערי גבול לדרכון ביומטרי.'),
    ],
  },
  {
    company: 'Retalix',
    role: t('Software Engineer', 'מהנדס תוכנה'),
    period: '2007 – 2008',
    points: [t('Point-of-sale features in C/C++ MFC, including bill payment over TCP/IP.', 'פיצ׳רים לקופות POS ב-C/C++ MFC, כולל תשלום חשבונות מעל TCP/IP.')],
  },
  {
    company: 'Transtech Control',
    role: t('Software Engineer', 'מהנדס תוכנה'),
    period: '2006 – 2007',
    points: [t('2D/3D airport graphics in C++ and OpenGL (Vega Prime).', 'גרפיקת דו/תלת-ממד לשדות תעופה ב-C++ ו-OpenGL ‏(Vega Prime).')],
  },
]

export const degrees: Degree[] = [
  { school: t('Bar-Ilan University', 'אוניברסיטת בר-אילן'), title: t('MBA, Data Systems Management', 'MBA, ניהול מערכות מידע'), period: '2011 – 2015' },
  { school: t('Ben-Gurion University of the Negev', 'אוניברסיטת בן-גוריון בנגב'), title: t('B.Sc., Computer Science', 'B.Sc. במדעי המחשב'), period: '2003 – 2006' },
  { school: t('500Tech', '500Tech'), title: t('AngularJS course', 'קורס AngularJS'), period: '2014' },
  { school: t('Hitech College', 'מכללת הייטק'), title: t('Software Development course', 'קורס פיתוח תוכנה'), period: '2006 – 2007' },
]

export const skills = ['React', 'TypeScript', 'Java', 'Angular', 'Node.js', 'C#', 'C++', 'GitLab CI/CD', 'Web Security', 'Agile / Scrum', 'Claude Code', 'Cursor']

export const links = {
  linkedin: 'https://www.linkedin.com/in/itaibechor/',
  github: 'https://github.com/itaibech',
  facebook: 'https://www.facebook.com/itai.bechor',
}
