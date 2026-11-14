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
    nav: { about: 'About', projects: 'Projects', games: 'Games', favorites: 'Favourites', habits: 'Habits', weather: 'Weather', contact: 'Contact' },
    hello: "Hi, I'm",
    name: 'Itai Bechor',
    headline: 'Full Stack Team Leader · Software Architect · AI Enthusiast',
    tagline: ['I build', 'great software', 'and great teams.'],
    intro:
      '20 years of building software, from C++ face recognition and 3D airport graphics to cloud-scale React & Java platforms. Today I lead the SolarEdge ONE full-stack team, shipping smart-energy software with a strong AI-first workflow.',
    stats: [
      ['20+', 'years in software'],
      ['12', 'people on my team'],
      ['11', 'years leading teams'],
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
    principlesTitle: 'How I lead',
    impactTitle: 'Impact highlights',
    projectsTitle: 'Projects',
    testimonialsTitle: 'What people say',
    gamesTitle: 'Take a break',
    gamesIntro: 'Some of the most popular open-source web games. Click to play right here.',
    play: 'Play',
    close: 'Close',
    by: 'by',
    code: 'Code',
    live: 'Live',
    educationTitle: 'Education',
    habitsTitle: 'Habits',
    favoritesTitle: 'Favourite pages',
    empty: 'Coming soon…',
    weatherTitle: 'Kfar Saba weather', weatherWind: 'wind', weatherHumidity: 'humidity', weatherSource: 'Open-Meteo', stationTitle: 'My home station · Havazelet HaSharon', stationRain: 'rain today', stationGust: 'gusts', stationPressure: 'pressure', stationAt: 'updated', historyTitle: 'Station history by month', historyCols: ['Month', 'Rain mm', 'Rainy days', 'Wettest day', 'Avg °C', 'Avg high', 'Avg low', 'Max °C', 'Min °C', 'Humidity %', 'Dew point', 'Avg wind', 'Max gust', 'Pressure hPa', 'Days'], historyTotal: 'rain this year', rainChart: 'Rain by month (mm)', yearChart: 'Rain by season, Oct–Sep (mm, * = partial season)', daysRecorded: 'days recorded', tempChart: 'Temperature range by month (°C, avg low → avg high)', weekTitle: '7-day forecast', highlightsTitle: 'Highlights', stars: 'stars',
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
    nav: { about: 'אודות', projects: 'פרויקטים', games: 'משחקים', favorites: 'מועדפים', habits: 'הרגלים', weather: 'מזג אוויר', contact: 'צור קשר' },
    hello: 'היי, אני',
    name: 'איתי בכור',
    headline: 'ראש צוות Full Stack · ארכיטקט תוכנה · חובב AI',
    tagline: ['אני בונה', 'תוכנה מעולה', 'וצוותים מעולים.'],
    intro:
      '20 שנה של פיתוח תוכנה, מזיהוי פנים ב-C++ וגרפיקת תלת-ממד לשדות תעופה ועד פלטפורמות React ו-Java בענן. היום אני מוביל את צוות ה-Full Stack של SolarEdge ONE ומפתח תוכנה לאנרגיה חכמה עם תהליך עבודה מבוסס AI.',
    stats: [
      ['20+', 'שנים בתוכנה'],
      ['12', 'אנשים בצוות'],
      ['11', 'שנים בהובלת צוותים'],
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
    principlesTitle: 'איך אני מוביל',
    impactTitle: 'הישגים בולטים',
    projectsTitle: 'פרויקטים',
    testimonialsTitle: 'מה אומרים עליי',
    gamesTitle: 'הפסקת משחק',
    gamesIntro: 'כמה ממשחקי הקוד הפתוח הפופולריים ברשת. לחצו כדי לשחק כאן באתר.',
    play: 'שחקו',
    close: 'סגירה',
    by: 'מאת',
    code: 'קוד',
    live: 'לאתר',
    educationTitle: 'השכלה',
    habitsTitle: 'הרגלים',
    favoritesTitle: 'דפים מועדפים',
    empty: 'בקרוב…',
    weatherTitle: 'מזג האוויר בכפר סבא', weatherWind: 'רוח', weatherHumidity: 'לחות', weatherSource: 'Open-Meteo', stationTitle: 'תחנה מטאורולוגית בבית · חבצלת השרון', stationRain: 'גשם היום', stationGust: 'משבים', stationPressure: 'לחץ', stationAt: 'עודכן', historyTitle: 'היסטוריית התחנה לפי חודש', historyCols: ['חודש', 'גשם מ״מ', 'ימי גשם', 'היום הגשום', 'ממוצע °C', 'ממוצע מקס׳', 'ממוצע מינ׳', 'מקס׳ °C', 'מינ׳ °C', 'לחות %', 'נקודת טל', 'רוח ממוצעת', 'משב מקס׳', 'לחץ hPa', 'ימים'], historyTotal: 'גשם השנה', rainChart: 'גשם לפי חודש (מ״מ)', yearChart: 'גשם לפי עונה, אוקטובר–ספטמבר (מ״מ, * = עונה חלקית)', daysRecorded: 'ימים עם נתונים', tempChart: 'טווח טמפרטורות לפי חודש (°C, ממוצע מינ׳ → ממוצע מקס׳)', weekTitle: 'תחזית ל-7 ימים', highlightsTitle: 'עיקרי הדברים', stars: 'כוכבים',
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
  youtube: 'https://www.youtube.com/@itaibechor',
}

export interface Card {
  icon: string
  title: Text
  body: Text
}

export const principles: Card[] = [
  { icon: '🛠️', title: t('Hands-on, not hands-off', 'מוביל מתוך הקוד'), body: t('I still review code, pair program and make architecture calls. Credibility comes from the codebase.', 'אני עדיין עושה Code Review, ‏Pair Programming ומחליט על ארכיטקטורה. אמינות מגיעה מהקוד.') },
  { icon: '🚀', title: t('Ship small, ship often', 'לשחרר קטן, לשחרר הרבה'), body: t('Short feedback loops: small PRs, strong CI/CD, and production stability as a first-class feature.', 'לולאות משוב קצרות: PR-ים קטנים, ‏CI/CD חזק, ויציבות פרודקשן כפיצ׳ר מרכזי.') },
  { icon: '🌱', title: t('Code review is mentoring', 'Code Review זה חניכה'), body: t('Every review, pairing and vibe-coding session is a chance to grow someone on the team.', 'כל Review, ‏Pairing וסשן Vibe Coding הם הזדמנות לצמיחה של מישהו בצוות.') },
  { icon: '🤝', title: t('One team, end to end', 'צוות אחד, מקצה לקצה'), body: t('Frontend, backend, QA, product and UX own the outcome together, not their slice of it.', 'Frontend, ‏Backend, ‏QA, מוצר ו-UX אחראים יחד על התוצאה, לא רק על החלק שלהם.') },
  { icon: '🤖', title: t('AI-first workflow', 'עבודה מבוססת AI'), body: t('Cursor and Claude Code speed up delivery, onboarding and quality; I teach the team to use them well.', 'Cursor ו-Claude Code מאיצים אספקה, קליטה ואיכות; אני מלמד את הצוות להשתמש בהם נכון.') },
  { icon: '🔒', title: t('Security by default', 'אבטחה כברירת מחדל'), body: t('Years of owning SAST and pen-test findings taught me to build it in, not bolt it on.', 'שנים של אחריות על ממצאי SAST ו-PT לימדו אותי לבנות אבטחה מההתחלה, לא להדביק אותה בסוף.') },
]

export const impact: Card[] = [
  { icon: '👥', title: t('10 devs + 2 QA', '10 מפתחים + 2 QA'), body: t('Leading the SolarEdge ONE full-stack squad, from planning through production.', 'מוביל את צוות ה-Full Stack של SolarEdge ONE, מהתכנון ועד הפרודקשן.') },
  { icon: '📈', title: t('Frontend lead → Full-stack lead', 'מ-Frontend ל-Full Stack'), body: t('Grew from leading 3–5 frontend engineers to the full squad within two years at SolarEdge.', 'גדלתי מהובלת 3–5 מהנדסי Frontend להובלת הצוות המלא תוך שנתיים ב-SolarEdge.') },
  { icon: '🔐', title: t('Web security owner', 'אחראי אבטחת Web'), body: t('Ran analysis and remediation of internal and external pen-test and SAST scans at BMC.', 'ניתוח ותיקון ממצאי מבדקי חדירה וסריקות SAST פנימיות וחיצוניות ב-BMC.') },
  { icon: '🔄', title: t('ASP.NET → AngularJS', 'מעבר ל-AngularJS'), body: t('Led the migration of Genesys speech & text analytics UI to a modern SPA.', 'הובלתי את המעבר של ממשק ניתוח הדיבור והטקסט של Genesys לאפליקציית SPA מודרנית.') },
  { icon: '🛂', title: t('Face recognition at the border', 'זיהוי פנים במעברי גבול'), body: t('Built e-passport face matching with electronic gates, deployed on-site with customers.', 'פיתחתי התאמת פנים לדרכון ביומטרי עם שערים אלקטרוניים, כולל התקנה אצל לקוחות.') },
  { icon: '🗓️', title: t('20+ years shipping', '20+ שנים של אספקה'), body: t('From C++ and OpenGL to React, Java and the cloud, always learning the next stack.', 'מ-C++ ו-OpenGL ועד React, ‏Java והענן, תמיד לומד את הדבר הבא.') },
]

export interface Project {
  name: string
  body: Text
  tags: string[]
  repo?: string // private repos have none
  live?: string
  year: string
  highlights: Text[]
}

export const projects: Project[] = [
  {
    name: 'Rental Management · ניהול דירות',
    body: t('Hebrew RTL app for the family rental apartments: tenants, rent, expenses, partner balances, recurring tasks and documents, with Google sign-in.', 'אפליקציה לניהול דירות ההשכרה של המשפחה: דיירים, שכר דירה, הוצאות, מאזן בין שותפים, משימות חוזרות ומסמכים, עם התחברות Google.'),
    tags: ['Next.js', 'React', 'Mantine', 'Supabase', 'Postgres RLS', 'GitHub Pages'],
    repo: 'https://github.com/itaibech/rentalManagement',
    year: '2026',
    highlights: [
      t('Tracks each apartment, tenant and monthly rent, including which partner each check was deposited to.', 'מעקב אחרי כל דירה, דייר ושכר דירה חודשי, כולל לאיזה שותף הופקד כל צ׳ק.'),
      t('Computes every partner’s balance from their share and suggests the transfers that settle it.', 'מחשב את המאזן של כל שותף לפי חלקו ומציע את ההעברות שמאפסות אותו.'),
      t('Recurring tasks such as insurance renewals, plus document attachments.', 'משימות חוזרות כמו חידוש ביטוח, וצירוף מסמכים.'),
      t('Runs on a shared Supabase backend, one schema per app, with Google sign-in and RLS.', 'רץ על Backend משותף ב-Supabase, סכמה לכל אפליקציה, עם התחברות Google ו-RLS.'),
    ],
    live: 'https://itaibech.github.io/rentalManagement/',
  },
  {
    name: 'Building Management',
    body: t('Hebrew RTL app for a residents committee: payments, maintenance, EV charging and email reminders. Row-level security is the only backend.', 'אפליקציה לוועד בית: תשלומים, תחזוקה, טעינת רכבים ותזכורות במייל. ‏Row-Level Security הוא כל ה-Backend.'),
    tags: ['React', 'TypeScript', 'Supabase', 'Postgres RLS', 'Edge Functions', 'GitHub Actions'],
    repo: 'https://github.com/itaibech/buildingManagement',
    year: '2026',
    highlights: [
      t('Residents pay committee fees and track maintenance requests in one place.', 'הדיירים משלמים ועד בית ועוקבים אחרי קריאות תחזוקה במקום אחד.'),
      t('EV charging usage and billing per apartment.', 'מעקב וחיוב על טעינת רכבים חשמליים לפי דירה.'),
      t('Automatic email reminders from Supabase Edge Functions.', 'תזכורות אוטומטיות במייל מ-Supabase Edge Functions.'),
      t('Built feature by feature, one PR each, with Claude Code.', 'נבנה פיצ׳ר אחרי פיצ׳ר, PR לכל אחד, עם Claude Code.'),
    ],
    live: 'https://itaibech.github.io/buildingManagement/',
  },
  {
    name: 'itaibechor (this site)',
    body: t('Bilingual personal site with an admin page, contact form and counters, built with Claude Code.', 'אתר אישי דו-לשוני עם עמוד ניהול, טופס יצירת קשר ומונים, שנבנה עם Claude Code.'),
    tags: ['React', 'Vite', 'Supabase', 'CSP', 'Claude Code'],
    repo: 'https://github.com/itaibech/itaibechor',
    year: '2026',
    highlights: [
      t('English and Hebrew with full right-to-left layout, dark and light themes.', 'אנגלית ועברית עם תמיכה מלאה בימין-לשמאל, ערכת נושא כהה ובהירה.'),
      t('Live data from my home weather station, cached in Postgres and synced nightly.', 'נתונים חיים מתחנת מזג האוויר בבית, נשמרים ב-Postgres ומסונכרנים כל לילה.'),
      t('Admin page with Google-only sign-in; Row-Level Security is the only backend.', 'עמוד ניהול עם התחברות Google בלבד; ‏Row-Level Security הוא כל ה-Backend.'),
      t('Strict Content Security Policy and click-to-play game embeds.', 'מדיניות CSP קפדנית ומשחקים שנטענים רק בלחיצה.'),
    ],
    live: 'https://itaibech.github.io/itaibechor/',
  },
  {
    name: 'Word Spy · מרגל המילים',
    body: t('Real-time multiplayer Hebrew imposter word game with bots, timers, Google sign-in and a leaderboard. Built with my son Noam.', 'משחק מילים מרובה משתתפים בזמן אמת: כולם מקבלים מילה סודית חוץ מהמרגל. עם בוטים, טיימר, התחברות עם Google וטבלת מובילים. נבנה עם הבן שלי נועם.'),
    tags: ['Next.js', 'React', 'Supabase Realtime', 'Framer Motion', 'Tailwind'],
    live: 'https://imposter-snowy.vercel.app',
    year: '2026',
    highlights: [
      t('Everyone gets the secret word except the spy, who must bluff and blend in.', 'כולם מקבלים את המילה הסודית חוץ מהמרגל, שצריך לבלף ולהשתלב.'),
      t('Real-time rooms over Supabase Realtime, with bots to fill empty seats.', 'חדרים בזמן אמת על Supabase Realtime, עם בוטים שממלאים מקומות פנויים.'),
      t('Round timers, Google sign-in and a leaderboard.', 'טיימר לכל סבב, התחברות Google וטבלת מובילים.'),
    ],

  },
  {
    name: 'Pet Shop API',
    body: t('REST API for a pet shop catalog: add, find, update and remove animals.', 'REST API לקטלוג חנות חיות: הוספה, חיפוש, עדכון ומחיקה.'),
    tags: ['NestJS', 'Node.js', 'TypeScript', 'REST'],
    repo: 'https://github.com/itaibech/pethshop-nest',
    year: '2023',
    highlights: [
      t('CRUD endpoints to add, find, update and remove animals from the catalog.', 'נקודות קצה להוספה, חיפוש, עדכון ומחיקה של חיות מהקטלוג.'),
      t('Structured with NestJS modules, controllers and services.', 'בנוי עם מודולים, Controllers ו-Services של NestJS.'),
    ],

  },
]

export interface Testimonial {
  quote: string
  name: string
  relation: Text
}

// From LinkedIn recommendations (shortened). ponytail: static, add fresh SolarEdge/BMC quotes here when you get them.
export const testimonials: Testimonial[] = [
  { name: 'Yariv Aharon', relation: t('Reported to Itai at CTrue', 'דיווח לאיתי ב-CTrue'), quote: "Itai's management method allows employees the freedom to examine the technological possibilities to solve problems. He makes sure knowledge passes between all team members. I learned a lot and progressed professionally working with Itai." },
  { name: 'Dima Nemets', relation: t('Reported to Itai at CTrue', 'דיווח לאיתי ב-CTrue'), quote: 'He gave me and the whole application team a lot of confidence, was very open minded, and has shown a vast knowledge. I would be delighted to work with Itai in the future.' },
  { name: 'Shai Feder', relation: t('Teammate, now ML Vision Engineer at Apple', 'עמית לצוות, היום ב-Apple'), quote: 'A great team player; working with him is fun and very educational. Together we redesigned a huge central project to meet design-pattern practices. He works at his best under pressure.' },
  { name: 'Tom Cohen', relation: t('Managed Itai directly', 'ניהל את איתי ישירות'), quote: 'Itai is a great team player, very technical and very professional.' },
]

export interface Game {
  name: string
  icon: string
  body: Text
  author: string
  src: string // embedded in an iframe only after a click
  repo: string
  stars: string
  tags: string[]
}

// Open-source games hosted by their authors on GitHub Pages (no frame-blocking headers). Origins must stay in the CSP frame-src (vite.config.ts).
export const games: Game[] = [
  { name: 'Astray', stars: '600', tags: ['WebGL', 'Three.js', 'Box2D', '3D'], icon: '🌀', author: 'Rye Terrell', src: 'https://wwwtyro.github.io/Astray/', repo: 'https://github.com/wwwtyro/Astray', body: t('Roll a ball out of a 3D WebGL maze. Arrow keys.', 'מגלגלים כדור החוצה ממבוך תלת-ממדי ב-WebGL. חיצים.') },
  { name: 'React Tetris', stars: '8.7k', tags: ['React', 'Redux', 'Immutable.js', 'Puzzle'], icon: '🧱', author: 'chvin', src: 'https://chvin.github.io/react-tetris/?lan=en', repo: 'https://github.com/chvin/react-tetris', body: t('Classic falling blocks, written in React + Redux. Arrows and space.', 'הבלוקים הנופלים הקלאסיים, כתוב ב-React ו-Redux. חיצים ורווח.') },
  { name: 'Clumsy Bird', stars: '1.6k', tags: ['melonJS', 'Canvas', 'Arcade'], icon: '🐦', author: 'Ellison Leão', src: 'https://ellisonleao.github.io/clumsy-bird/', repo: 'https://github.com/ellisonleao/clumsy-bird', body: t('Flap through the pipes. Click, tap or space.', 'לעוף בין הצינורות. קליק, נגיעה או רווח.') },
  { name: 'Connect Four', stars: '280', tags: ['TypeScript', 'Canvas', 'AI opponent', 'Multiplayer'], icon: '🔴', author: 'Kenrick', src: 'https://kenrick95.github.io/c4/', repo: 'https://github.com/kenrick95/c4', body: t('Drop discs and line up four, against the computer or a friend.', 'מפילים דיסקיות ומסדרים ארבע ברצף, נגד המחשב או חבר.') },
]

// Kfar Saba via Open-Meteo (free, no key). Its origin must be in the CSP connect-src (checked in content.test.ts).
// Home station (Weather Underground IKFARS3) through the wu-station edge function, which holds the API key.
export const stationUrl = 'https://hyeslwlewvvjiyizoduf.supabase.co/functions/v1/wu-station'
export const stationPage = 'https://www.wunderground.com/dashboard/pws/IKFARS3'

export const weatherUrl = 'https://api.open-meteo.com/v1/forecast?latitude=32.175&longitude=34.907&current=temperature_2m,relative_humidity_2m,weather_code,wind_speed_10m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=Asia%2FJerusalem&forecast_days=7'

// WMO weather codes → emoji. ponytail: emoji only, no per-code text labels.
export function weatherIcon(code: number): string {
  if (code === 0) return '☀️'
  if (code <= 2) return '⛅'
  if (code === 3) return '☁️'
  if (code <= 48) return '🌁' // fog; Apple's 🌫️ renders as a grey square that reads as a broken image
  if (code <= 67 || (code >= 80 && code <= 82)) return '🌧️'
  if (code <= 86) return '❄️'
  return '⛈️'
}
