import { ASSESSMENT_NOTE, MANDATORY_DISCLAIMER, VERIFICATION_NOTE } from "./constants";
import { slugify } from "./utils";

export const subjectAreas = [
  {
    name: "Computer Science",
    slug: "computer-science",
    description: "Programming, software design, systems, databases, AI foundations, and project-based computing study guidance.",
  },
  {
    name: "Cyber Security",
    slug: "cyber-security",
    description: "Network security, digital forensics, ethical hacking concepts, incident response, and secure systems learning support.",
  },
  {
    name: "Software Engineering",
    slug: "software-engineering",
    description: "Requirements, design, testing, agile delivery, architecture, and software project planning support.",
  },
  {
    name: "Artificial Intelligence",
    slug: "artificial-intelligence",
    description: "AI, machine learning, data, model evaluation, ethics, and applied intelligent systems guidance.",
  },
  {
    name: "Business Management",
    slug: "business-management",
    description: "Marketing, finance, operations, strategy, entrepreneurship, and business research support.",
  },
  {
    name: "Hospitality Management",
    slug: "hospitality-management",
    description: "Hospitality operations, service quality, event management, food and beverage, and guest experience study support.",
  },
  {
    name: "Data Science",
    slug: "data-science",
    description: "Data analysis, statistics, visualization, machine learning, and research methodology guidance.",
  },
  {
    name: "MBA",
    slug: "mba",
    description: "Strategic management, leadership, business analytics, research projects, and executive-level academic guidance.",
  },
  {
    name: "Computing",
    slug: "computing",
    description: "Broad computing support for programming, databases, web development, networks, cloud, and final projects.",
  },
  {
    name: "IT",
    slug: "it",
    description: "Information systems, IT management, networking, cloud tools, and digital transformation study guidance.",
  },
];

export const foreignUniversities = [
  {
    name: "University of Sunderland",
    slug: "university-of-sunderland",
    country: "United Kingdom",
    officialWebsite: "https://www.sunderland.ac.uk/",
    overview: "A UK university represented in Nepal through selected academic partnerships. Students should verify current approvals and programme structures with official sources before applying.",
    sourceUrl: "https://example.com/verify-university-of-sunderland-nepal-partnerships",
    lastVerifiedAt: "2026-01-15",
  },
  {
    name: "London Metropolitan University",
    slug: "london-metropolitan-university",
    country: "United Kingdom",
    officialWebsite: "https://www.londonmet.ac.uk/",
    overview: "A UK university with Nepal partner delivery in computing, business, and related subject areas through listed colleges.",
    sourceUrl: "https://example.com/verify-london-met-nepal-partnerships",
    lastVerifiedAt: "2026-01-15",
  },
  {
    name: "Coventry University",
    slug: "coventry-university",
    country: "United Kingdom",
    officialWebsite: "https://www.coventry.ac.uk/",
    overview: "A UK university associated with Nepal-based partner delivery in computing and technology subjects.",
    sourceUrl: "https://example.com/verify-coventry-nepal-partnerships",
    lastVerifiedAt: "2026-01-15",
  },
  {
    name: "University of Wolverhampton",
    slug: "university-of-wolverhampton",
    country: "United Kingdom",
    officialWebsite: "https://www.wlv.ac.uk/",
    overview: "A UK university appearing in Nepal foreign-affiliated programme listings through multiple partner colleges.",
    sourceUrl: "https://example.com/verify-wolverhampton-nepal-partnerships",
    lastVerifiedAt: "2026-01-15",
  },
  {
    name: "Leeds Beckett University",
    slug: "leeds-beckett-university",
    country: "United Kingdom",
    officialWebsite: "https://www.leedsbeckett.ac.uk/",
    overview: "A UK university partner listed for selected Nepal-based academic pathways. Confirm programme status with official sources.",
    sourceUrl: "https://example.com/verify-leeds-beckett-nepal-partnerships",
    lastVerifiedAt: "2026-01-15",
  },
  {
    name: "UWE Bristol",
    slug: "uwe-bristol",
    country: "United Kingdom",
    officialWebsite: "https://www.uwe.ac.uk/",
    overview: "A UK university partner associated with selected Nepal college provision.",
    sourceUrl: "https://example.com/verify-uwe-bristol-nepal-partnerships",
    lastVerifiedAt: "2026-01-15",
  },
  {
    name: "University of Westminster",
    slug: "university-of-westminster",
    country: "United Kingdom",
    officialWebsite: "https://www.westminster.ac.uk/",
    overview: "A UK university appearing in Nepal partner-college listings. Programme data should be verified before publishing.",
    sourceUrl: "https://example.com/verify-westminster-nepal-partnerships",
    lastVerifiedAt: "2026-01-15",
  },
  {
    name: "University of Bedfordshire",
    slug: "university-of-bedfordshire",
    country: "United Kingdom",
    officialWebsite: "https://www.beds.ac.uk/",
    overview: "A UK university partner associated with professional and technology-oriented programmes in Nepal.",
    sourceUrl: "https://example.com/verify-bedfordshire-nepal-partnerships",
    lastVerifiedAt: "2026-01-15",
  },
  {
    name: "Keele University",
    slug: "keele-university",
    country: "United Kingdom",
    officialWebsite: "https://www.keele.ac.uk/",
    overview: "A UK university listed as a partner for Nepal-based academic provision. Verify exact active programmes through official channels.",
    sourceUrl: "https://example.com/verify-keele-nepal-partnerships",
    lastVerifiedAt: "2026-01-15",
  },
  {
    name: "University of Northampton",
    slug: "university-of-northampton",
    country: "United Kingdom",
    officialWebsite: "https://www.northampton.ac.uk/",
    overview: "A UK university noted in some Nepal listings. This entry is marked for additional verification before publication.",
    sourceUrl: "https://example.com/verify-northampton-nepal-partnerships",
    lastVerifiedAt: null,
  },
  {
    name: "Westcliff University",
    slug: "westcliff-university",
    country: "United States",
    officialWebsite: "https://www.westcliff.edu/",
    overview: "A US university associated with selected Nepal partner institutions for management and graduate pathways.",
    sourceUrl: "https://example.com/verify-westcliff-nepal-partnerships",
    lastVerifiedAt: "2026-01-15",
  },
  {
    name: "Asia Pacific University",
    slug: "asia-pacific-university",
    country: "Malaysia",
    officialWebsite: "https://www.apu.edu.my/",
    overview: "A Malaysian university associated with IT, computing, and management pathways delivered through Nepal partners.",
    sourceUrl: "https://example.com/verify-apu-nepal-partnerships",
    lastVerifiedAt: "2026-01-15",
  },
  {
    name: "University of the West of Scotland",
    slug: "university-of-the-west-of-scotland",
    country: "United Kingdom",
    officialWebsite: "https://www.uws.ac.uk/",
    overview: "A UK university appearing in Nepal partner-college listings for selected undergraduate pathways.",
    sourceUrl: "https://example.com/verify-uws-nepal-partnerships",
    lastVerifiedAt: "2026-01-15",
  },
  {
    name: "Queen Margaret University",
    slug: "queen-margaret-university",
    country: "United Kingdom",
    officialWebsite: "https://www.qmu.ac.uk/",
    overview: "A UK university associated with hospitality and related programme pathways through Nepal partners.",
    sourceUrl: "https://example.com/verify-qmu-nepal-partnerships",
    lastVerifiedAt: "2026-01-15",
  },
  {
    name: "Swiss Hotel Association / Hotelleriesuisse",
    slug: "swiss-hotel-association-hotelleriesuisse",
    country: "Switzerland",
    officialWebsite: "https://www.hotelleriesuisse.ch/",
    overview: "A Swiss hospitality body listed for hospitality education pathways. Confirm award, validation, and recognition details before publishing.",
    sourceUrl: "https://example.com/verify-sha-gate-nepal-partnerships",
    lastVerifiedAt: "2026-01-15",
  },
  {
    name: "Siam University",
    slug: "siam-university",
    country: "Thailand",
    officialWebsite: "https://siam.edu/",
    overview: "A Thai university associated with selected business programmes in Nepal.",
    sourceUrl: "https://example.com/verify-siam-nepal-partnerships",
    lastVerifiedAt: "2026-01-15",
  },
  {
    name: "Sripatum University",
    slug: "sripatum-university",
    country: "Thailand",
    officialWebsite: "https://www.spu.ac.th/",
    overview: "A Thai university listed in relation to selected Nepal college pathways.",
    sourceUrl: "https://example.com/verify-sripatum-nepal-partnerships",
    lastVerifiedAt: "2026-01-15",
  },
];

const verificationReminder = "Verify with official MoEST/college/university source before publishing.";

export const colleges = [
  ["ISMT College", "ismt-college", "Kathmandu", "University of Sunderland", ["BSc Computing", "BBA Business and Management", "MBA"], ["Computing", "Business Management", "MBA"], true],
  ["Islington College", "islington-college", "Kathmandu", "London Metropolitan University", ["BSc Computing", "BSc Cyber Security and Digital Forensics", "BA Business and Management"], ["Computing", "Cyber Security", "Business Management"], true],
  ["Softwarica College", "softwarica-college", "Kathmandu", "Coventry University", ["BSc Computer Science", "BSc Ethical Hacking and Cybersecurity"], ["Computer Science", "Cyber Security"], true],
  ["Herald College Kathmandu", "herald-college-kathmandu", "Kathmandu", "University of Wolverhampton", ["BSc Computer Science", "BSc International Business Management"], ["Computer Science", "Business Management"], true],
  ["The British College", "the-british-college", "Kathmandu", "Leeds Beckett University", ["BSc Computing", "BBA Business and Management", "MBA"], ["Computing", "Business Management", "MBA"], true],
  ["Westminster College", "westminster-college", "Lalitpur", "University of Westminster", ["BSc Computer Science", "BSc Software Engineering"], ["Computer Science", "Software Engineering"], false],
  ["Patan College for Professional Studies", "patan-college-for-professional-studies", "Lalitpur", "University of Bedfordshire", ["BSc Computer Science and Software Engineering", "BBA Business and Management"], ["Computer Science", "Software Engineering", "Business Management"], false],
  ["British International College", "british-international-college", "Lalitpur", "Keele University", ["BSc Computing", "BBA Business and Management"], ["Computing", "Business Management"], false],
  ["NAMI College", "nami-college", "Kathmandu", "University of Northampton", ["BSc Computing", "BSc Environmental Science"], ["Computing", "IT"], false, "REQUIRES_VERIFICATION"],
  ["King's College", "kings-college", "Kathmandu", "Westcliff University", ["BBA", "MBA"], ["Business Management", "MBA"], false],
  ["Presidential Graduate School", "presidential-graduate-school", "Kathmandu", "Westcliff University", ["BBA", "MBA"], ["Business Management", "MBA"], false],
  ["Lord Buddha Education Foundation", "lord-buddha-education-foundation", "Kathmandu", "Asia Pacific University", ["BSc IT", "MSc IT", "MBA"], ["IT", "Data Science", "MBA"], true],
  ["Techspire College", "techspire-college", "Kathmandu", "Asia Pacific University", ["BSc IT", "BSc Data Science"], ["IT", "Data Science"], false],
  ["Itahari International College", "itahari-international-college", "Itahari", "London Metropolitan University", ["BSc Computing", "BA Business and Management"], ["Computing", "Business Management"], false],
  ["Informatics College Pokhara", "informatics-college-pokhara", "Pokhara", "London Metropolitan University", ["BSc Computing", "BA Business and Management"], ["Computing", "Business Management"], false],
  ["Biratnagar International College", "biratnagar-international-college", "Biratnagar", "University of Wolverhampton", ["BSc International Business Management", "BSc Computing"], ["Business Management", "Computing"], false],
  ["Fishtail Mountain College", "fishtail-mountain-college", "Pokhara", "University of Wolverhampton", ["BSc Computing", "Business Management"], ["Computing", "Business Management"], false],
  ["Stamford College", "stamford-college", "Kathmandu", "University of the West of Scotland", ["BSc Computing", "BBA"], ["Computing", "Business Management"], false],
  ["The London College", "the-london-college", "Kathmandu", "University of the West of Scotland", ["BSc Computing", "BA Business"], ["Computing", "Business Management"], false],
  ["Silver Mountain School of Hotel Management", "silver-mountain-school-of-hotel-management", "Kathmandu", "Queen Margaret University", ["BHM / Hospitality Management"], ["Hospitality Management"], true],
  ["GATE", "gate", "Kathmandu", "Swiss Hotel Association / Hotelleriesuisse", ["Hospitality Management"], ["Hospitality Management"], false],
  ["Kathmandu College of Management", "kathmandu-college-of-management", "Lalitpur", "Siam University", ["BBA Business Management"], ["Business Management"], false],
  ["Yeti International College", "yeti-international-college", "Kathmandu", "Sripatum University", ["BBA", "MBA"], ["Business Management", "MBA"], false],
].map(([name, slug, city, partner, topProgrammes, subjectTags, isFeatured, status]) => ({
  name: String(name),
  slug: String(slug),
  city: String(city),
  country: "Nepal",
  address: `${city}, Nepal`,
  description: `${name} is listed in this student directory as a foreign-affiliated college in Nepal. This profile is intended for research and study-planning support, not as an official representation of the college.`,
  websiteUrl: `https://example.com/${slug}`,
  featuredImage: `/assets/${slug}.webp`,
  status: status ? String(status) : "PUBLISHED",
  isFeatured: Boolean(isFeatured),
  sourceUrl: `https://example.com/verify-${slug}`,
  lastVerifiedAt: status === "REQUIRES_VERIFICATION" ? null : "2026-01-15",
  note: verificationReminder,
  universityNames: [String(partner)],
  subjectTags: subjectTags as string[],
  topProgrammes: topProgrammes as string[],
}));

const computingModules = [
  ["Programming", "Level 4", "Semester 1", "Core programming concepts, problem solving, control structures, and practical coding exercises."],
  ["Fundamentals of Computing", "Level 4", "Semester 1", "Computer systems, data, networks, operating concepts, and academic study expectations."],
  ["Database Design and Development", "Level 4", "Semester 2", "Relational modelling, SQL, normalization, and database implementation practice."],
  ["Web Development", "Level 4", "Semester 2", "Responsive web interfaces, client-server foundations, accessibility, and testing basics."],
  ["Software Engineering", "Level 5", "Semester 1", "Requirements, design, implementation planning, testing, and maintainable delivery practices."],
  ["Networking", "Level 5", "Semester 1", "Network models, addressing, routing concepts, services, and troubleshooting methods."],
  ["Operating Systems", "Level 5", "Semester 2", "Processes, memory, file systems, concurrency, and systems-level reasoning."],
  ["Cloud Computing", "Level 5", "Semester 2", "Cloud service models, deployment patterns, scaling, monitoring, and responsible architecture decisions."],
  ["Artificial Intelligence", "Level 6", "Semester 1", "Search, knowledge representation, learning concepts, ethics, and applied intelligent systems."],
  ["Machine Learning", "Level 6", "Semester 1", "Supervised and unsupervised learning concepts, evaluation, data preparation, and model limitations."],
  ["Cyber Security", "Level 6", "Semester 2", "Security principles, threats, controls, secure development, and responsible reporting."],
  ["Final Year Project", "Level 6", "Semester 2", "Independent project planning, research method selection, implementation, evaluation, and reflection."],
];

const cyberModules = [
  ["Computer Systems and Networks", "Level 4", "Semester 1", "Core computer architecture and networking principles for security study."],
  ["Network Security", "Level 5", "Semester 1", "Security controls, secure network design, monitoring concepts, and defense planning."],
  ["Ethical Hacking", "Level 5", "Semester 1", "Responsible testing concepts, vulnerability discovery methods, and legal boundaries."],
  ["Digital Forensics", "Level 5", "Semester 2", "Forensic process, evidence handling, disk and memory concepts, and reporting principles."],
  ["Penetration Testing", "Level 6", "Semester 1", "Scoped testing methodology, tool awareness, risk documentation, and remediation guidance."],
  ["Secure Networks", "Level 6", "Semester 1", "Secure infrastructure design, identity controls, segmentation, and hardening concepts."],
  ["Cyber Threat Intelligence", "Level 6", "Semester 2", "Threat modelling, intelligence sources, actor behavior, and defensive decision-making."],
  ["Web Application Security", "Level 6", "Semester 2", "Common web risks, secure coding concepts, testing ethics, and mitigation patterns."],
  ["Incident Response", "Level 6", "Semester 2", "Preparation, detection, containment, eradication, recovery, and communication workflows."],
  ["Final Cyber Security Project", "Level 6", "Semester 2", "Independent cyber security research or implementation project with ethical boundaries."],
];

const businessModules = [
  ["Business Organisations", "Level 4", "Semester 1", "Business structures, environments, stakeholders, and management fundamentals."],
  ["Marketing", "Level 4", "Semester 1", "Marketing principles, segmentation, positioning, campaigns, and evaluation."],
  ["Accounting and Finance", "Level 4", "Semester 2", "Financial statements, budgeting, performance measures, and decision support."],
  ["Managing People", "Level 4", "Semester 2", "People management, motivation, teams, leadership, and workplace communication."],
  ["Business Decision Making", "Level 5", "Semester 1", "Evidence-informed decisions, data use, risk, and business problem framing."],
  ["Operations Management", "Level 5", "Semester 1", "Process design, quality, supply chains, capacity, and service delivery."],
  ["Strategic Management", "Level 6", "Semester 1", "Competitive analysis, strategy formulation, implementation, and evaluation."],
  ["Entrepreneurship", "Level 6", "Semester 1", "Opportunity recognition, business models, feasibility, and responsible innovation."],
  ["Research Methods", "Level 6", "Semester 2", "Research design, ethics, data collection, analysis, and academic reporting."],
  ["Business Consultancy Project", "Level 6", "Semester 2", "Applied business problem analysis, recommendations, and reflective learning."],
];

const hospitalityModules = [
  ["Contemporary Hospitality Industry", "Level 4", "Semester 1", "Hospitality sectors, trends, guest expectations, and professional standards."],
  ["Front Office Operations", "Level 4", "Semester 1", "Reservation, reception, guest journey, and front-office communication."],
  ["Food Production", "Level 4", "Semester 2", "Kitchen operations, production planning, hygiene, and practical workflow awareness."],
  ["Customer Experience", "Level 5", "Semester 1", "Service design, guest expectations, complaints, recovery, and experience measurement."],
  ["Event Management", "Level 5", "Semester 1", "Event planning, logistics, stakeholders, risk, budgeting, and evaluation."],
  ["Hospitality Marketing", "Level 5", "Semester 2", "Hospitality branding, digital channels, customer segments, and campaign analysis."],
  ["Service Quality", "Level 6", "Semester 1", "Quality frameworks, operational consistency, training, feedback, and improvement."],
  ["Strategic Hospitality Management", "Level 6", "Semester 1", "Hospitality strategy, competition, service innovation, and market positioning."],
  ["Hospitality Research Project", "Level 6", "Semester 2", "Independent hospitality research planning, ethics, analysis, and reporting."],
];

export function moduleSetFor(area: string) {
  if (area.includes("Cyber")) return cyberModules;
  if (area.includes("Business") || area.includes("MBA")) return businessModules;
  if (area.includes("Hospitality")) return hospitalityModules;
  return computingModules;
}

export const programmes = [
  ["BSc Computing", "ismt-college", "university-of-sunderland", "computing", "Bachelor", "Computing", "3 years"],
  ["BSc Computing", "islington-college", "london-metropolitan-university", "computing", "Bachelor", "Computing", "3 years"],
  ["BSc Computer Science", "softwarica-college", "coventry-university", "computer-science", "Bachelor", "Computer Science", "3 years"],
  ["BSc Computer Science with Artificial Intelligence", "herald-college-kathmandu", "university-of-wolverhampton", "artificial-intelligence", "Bachelor", "Artificial Intelligence", "3 years"],
  ["BSc Cyber Security and Digital Forensics", "islington-college", "london-metropolitan-university", "cyber-security", "Bachelor", "Cyber Security", "3 years"],
  ["BSc Cyber Security and Forensics", "softwarica-college", "coventry-university", "cyber-security", "Bachelor", "Cyber Security", "3 years"],
  ["BSc Software Engineering", "westminster-college", "university-of-westminster", "software-engineering", "Bachelor", "Software Engineering", "3 years"],
  ["BSc Ethical Hacking and Cybersecurity", "softwarica-college", "coventry-university", "cyber-security", "Bachelor", "Cyber Security", "3 years"],
  ["BA/BBA Business and Management", "the-british-college", "leeds-beckett-university", "business-management", "Bachelor", "Business Management", "3 years"],
  ["BHM / Hospitality Management", "silver-mountain-school-of-hotel-management", "queen-margaret-university", "hospitality-management", "Bachelor", "Hospitality Management", "4 years"],
  ["MBA", "presidential-graduate-school", "westcliff-university", "mba", "Master", "MBA", "2 years"],
  ["MSc Computing", "lord-buddha-education-foundation", "asia-pacific-university", "computing", "Master", "Computing", "1.5-2 years"],
  ["MSc IT", "lord-buddha-education-foundation", "asia-pacific-university", "it", "Master", "IT", "1.5-2 years"],
  ["MSc Data Science", "techspire-college", "asia-pacific-university", "data-science", "Master", "Data Science", "1.5-2 years"],
].map(([title, collegeSlug, universitySlug, subjectSlug, degreeLevel, discipline, duration]) => ({
  title: String(title),
  slug: `${slugify(String(title))}-${String(collegeSlug)}`,
  collegeSlug: String(collegeSlug),
  universitySlug: String(universitySlug),
  subjectSlug: String(subjectSlug),
  degreeLevel: String(degreeLevel),
  discipline: String(discipline),
  duration: String(duration),
  intakeInfo: "Confirm current intake dates with the college admissions office.",
  overview: `${title} students often need module-level planning, reading guidance, draft feedback, referencing help, and concept tutoring. Assignment Nepal supports understanding and improvement while students remain responsible for their own assessed work.`,
  assessmentStyleNotes: ASSESSMENT_NOTE,
  careerNotes: "This pathway may support careers related to the subject area, depending on student skills, portfolio, internships, and employer requirements.",
  sourceUrl: `https://example.com/verify-${slugify(String(title))}-${String(collegeSlug)}`,
  lastVerifiedAt: "2026-01-15",
  status: "PUBLISHED",
  isFeatured: ["BSc Computing", "BSc Cyber Security and Digital Forensics", "MBA", "BHM / Hospitality Management"].includes(String(title)),
  modules: moduleSetFor(String(discipline)).map(([moduleTitle, yearOrLevel, semester, description], index) => ({
    title: String(moduleTitle),
    slug: slugify(String(moduleTitle)),
    code: `${String(discipline).slice(0, 3).toUpperCase()}${100 + index}`,
    yearOrLevel: String(yearOrLevel),
    semester: String(semester),
    credits: index % 3 === 0 ? 20 : 15,
    description: String(description),
    sourceUrl: `https://example.com/verify-module-${slugify(String(moduleTitle))}`,
    lastVerifiedAt: "2026-01-15",
  })),
}));

export const services = [
  ["Concept Tutoring", "concept-tutoring", "Understand difficult topics through guided explanation and examples.", "We explain module concepts, help students practise problems, review learning outcomes, and build confidence without completing assessed work.", "Explaining concepts, practice questions, reading guidance, study skills, and revision planning.", "Writing full assignments, providing exam answers, impersonation, or promising grades.", "GraduationCap"],
  ["Assignment Brief Explanation", "assignment-brief-explanation", "Break down briefs, marking criteria, and learning outcomes.", "We help students interpret what their brief is asking, identify deliverables, and plan their own approach ethically.", "Requirement explanation, task breakdowns, rubrics, and planning checklists.", "Producing assessed coursework text or telling students exactly what to submit.", "FileQuestion"],
  ["Assignment Planning", "assignment-planning", "Create a responsible outline and timeline for your own work.", "We support structure, milestones, research direction, and time planning so students can produce their own work with clarity.", "Outlines, schedules, reading lists, section planning, and task prioritisation.", "Completing coursework on behalf of students or guaranteeing academic outcomes.", "CalendarCheck"],
  ["Research Guidance", "research-guidance", "Find credible directions, methods, and source strategies.", "We guide students in selecting research questions, evaluating sources, choosing methods, and documenting evidence responsibly.", "Research direction, source evaluation, methodology discussion, and ethics awareness.", "Fabricating references, inventing data, or writing final research reports for submission.", "Search"],
  ["Referencing and Citation Help", "referencing-and-citation-help", "Learn Harvard, APA, IEEE, and module-specific referencing.", "We teach citation rules, reference-list formatting, quotation handling, paraphrasing boundaries, and source management.", "Citation teaching, reference formatting feedback, and plagiarism-avoidance guidance.", "Creating fake references, disguising copied text, or misrepresenting sources.", "Quote"],
  ["Proofreading and Editing", "proofreading-and-editing", "Improve clarity, grammar, structure, and academic tone.", "We review student-written drafts for language, flow, structure, formatting, and clarity while preserving the student author voice.", "Grammar checks, clarity edits, formatting suggestions, and academic tone feedback.", "Rewriting a draft into a new assignment or adding unverified claims.", "PencilLine"],
  ["Draft Feedback", "draft-feedback", "Receive formative feedback on your own draft.", "We provide comments on structure, argument, evidence, readability, and alignment with the brief so students can revise independently.", "Feedback notes, improvement priorities, structure comments, and rubric awareness.", "Producing final assessed text for submission or promising marks.", "MessageSquareText"],
  ["Presentation Support", "presentation-support", "Plan and practise presentations with clearer structure.", "We help students outline slides, rehearse talking points, improve visual clarity, and prepare for questions.", "Slide structure, speaking practice, clarity checks, and rehearsal support.", "Impersonating a student or creating misleading work for assessment submission.", "Presentation"],
  ["Programming / Coding Concept Support", "programming-coding-concept-support", "Learn programming logic, debugging, and implementation ideas.", "We explain programming concepts, review student-written code, discuss debugging strategies, and support learning through examples.", "Code walkthroughs, debugging guidance, concept explanation, and practice exercises.", "Completing graded coding assignments, bypassing academic rules, or hiding misconduct.", "Code2"],
  ["Data Analysis Guidance", "data-analysis-guidance", "Understand methods, tools, and interpretation responsibly.", "We guide students through data-cleaning logic, analysis choices, visualisation, and interpretation while keeping responsibility with the student.", "Method selection, tool explanation, interpretation guidance, and chart feedback.", "Fabricating datasets, manipulating results, or writing reports for submission.", "ChartNoAxesCombined"],
  ["Exam Preparation", "exam-preparation", "Revise ethically with concepts, practice plans, and study routines.", "We support revision planning, topic explanations, practice discussion, and confidence-building before exams.", "Revision plans, concept explanation, practice review, and study strategies.", "Unauthorized exam assistance, live exam help, quiz completion, impersonation, or rule-breaking support.", "BookOpenCheck"],
  ["Dissertation / Research Proposal Guidance", "dissertation-research-proposal-guidance", "Plan research questions, structure, ethics, and proposal logic.", "We help students understand proposal expectations, research design, methodology choices, source strategy, and supervisor feedback.", "Topic refinement, proposal structure, methodology explanation, and ethics guidance.", "Writing dissertations for submission, fabricating data, or guaranteeing approval.", "LibraryBig"],
].map(([title, slug, shortDescription, fullDescription, allowedScope, forbiddenScope, icon]) => ({
  title: String(title),
  slug: String(slug),
  shortDescription: String(shortDescription),
  fullDescription: String(fullDescription),
  allowedScope: String(allowedScope),
  forbiddenScope: String(forbiddenScope),
  icon: String(icon),
  isActive: true,
}));

export const blogCategories = [
  "College Guides",
  "Programme Guides",
  "Study Skills",
  "Referencing",
  "Research Skills",
  "Assignment Planning",
  "Career Guidance",
  "Academic Integrity",
  "Foreign University Study in Nepal",
];

export const blogPosts = [
  ["Foreign-Affiliated Colleges in Nepal: Complete Student Guide", "College Guides"],
  ["How to Understand Your Assignment Brief", "Study Skills"],
  ["How to Plan Coursework Without Stress", "Assignment Planning"],
  ["Harvard Referencing Guide for Students in Nepal", "Referencing"],
  ["How to Avoid Plagiarism in University Assignments", "Academic Integrity"],
  ["Coursework vs Exams: What Students Should Know", "Study Skills"],
  ["How to Choose Between Computing, Cyber Security, and AI", "Programme Guides"],
  ["How to Prepare for Presentations in UK-Affiliated Programmes", "Study Skills"],
].map(([title, category], index) => ({
  title: String(title),
  slug: slugify(String(title)),
  excerpt: "A practical guide for students in Nepal studying foreign-affiliated programmes, written with academic integrity and independent learning in mind.",
  content:
    "This guide explains how students can research requirements, plan their study routine, use credible sources, and ask for ethical academic support. Assignment Nepal can help with concept explanation, draft feedback, proofreading, referencing, and study guidance. Students must produce and submit their own work.\n\n" +
    MANDATORY_DISCLAIMER,
  featuredImage: `/assets/blog-${index + 1}.webp`,
  author: "Assignment Nepal Editorial Team",
  category: String(category),
  status: "PUBLISHED",
  metaTitle: `${title} | Assignment Nepal`,
  metaDescription: "Ethical study guidance for students in Nepal studying foreign-affiliated college programmes.",
  publishedAt: "2026-01-20",
}));

export const faqs = [
  {
    question: "Does Assignment Nepal write assignments for students?",
    answer: "No. We provide tutoring, study guidance, editing, feedback, referencing help, and academic support. Students must write and submit their own work.",
    category: "Academic Integrity",
    order: 1,
  },
  {
    question: "Can you help me understand my assignment brief?",
    answer: "Yes. We can explain requirements, marking criteria, learning outcomes, and planning steps so you can complete your own work responsibly.",
    category: "Services",
    order: 2,
  },
  {
    question: "Can you proofread my draft?",
    answer: "Yes. We can review grammar, clarity, formatting, referencing, and structure while preserving your authorship.",
    category: "Services",
    order: 3,
  },
  {
    question: "Is college and module information guaranteed to be current?",
    answer: VERIFICATION_NOTE,
    category: "Directory",
    order: 4,
  },
  {
    question: "Do you guarantee grades?",
    answer: "No. Academic outcomes depend on student effort, institution rules, assessment design, and many other factors. We do not guarantee marks or grades.",
    category: "Academic Integrity",
    order: 5,
  },
  {
    question: "Can you help with exams?",
    answer: "We can support ethical revision, concept explanation, and practice planning. We do not provide live exam help, quiz completion, exam answers, or impersonation.",
    category: "Services",
    order: 6,
  },
];

export const testimonials = [
  {
    name: "BSc Computing student",
    role: "Kathmandu",
    content: "The tutor helped me understand database design and plan my reading. I used the feedback to improve my own draft.",
    rating: 5,
  },
  {
    name: "Business student",
    role: "Lalitpur",
    content: "The referencing session made Harvard style much clearer. I liked that the support focused on learning, not shortcuts.",
    rating: 5,
  },
  {
    name: "Cyber security student",
    role: "Pokhara",
    content: "I got guidance on how to structure my project and explain my methodology responsibly.",
    rating: 4,
  },
];

export const policyPages = [
  {
    title: "Academic Integrity Policy",
    slug: "academic-integrity",
    version: "1.0",
    content:
      `${MANDATORY_DISCLAIMER}\n\nAssignment Nepal supports learning. Students must submit their own work. We do not provide work for submission and we do not help with cheating, impersonation, exams, quizzes, plagiarism, fabricated references, or fabricated data. We can help with explanations, planning, feedback, editing, referencing, research direction, and study skills.`,
  },
  {
    title: "No Ghostwriting / Disclaimer Policy",
    slug: "disclaimer",
    version: "1.0",
    content:
      `${MANDATORY_DISCLAIMER}\n\nWe do not write full assessed assignments for submission. We do not sell pre-written coursework. We do not fabricate data, references, or reports. We do not guarantee grades. Misuse of our support is prohibited. College, programme, and module information can change and must be verified with official sources. Assignment Nepal is not an official representative of listed colleges or universities unless separately stated.`,
  },
  {
    title: "Terms of Service",
    slug: "terms",
    version: "1.0",
    content:
      `${MANDATORY_DISCLAIMER}\n\nAcceptable use: students may request tutoring, study guidance, draft feedback, proofreading, referencing help, and academic planning. Prohibited use: cheating, impersonation, live exam assistance, quiz completion, fabrication of data or references, or requesting assessed work for submission. Students are responsible for following their institution rules and submitting their own work. We do not guarantee academic outcomes. Enquiries do not create a service obligation until confirmed. Information may be corrected or updated. Content on this site is owned by Assignment Nepal or used under permitted rights. Liability is limited to the maximum extent allowed by law.`,
  },
  {
    title: "Privacy Policy",
    slug: "privacy-policy",
    version: "1.0",
    content:
      "We collect enquiry information such as name, email, phone, college, programme, subject, message, and consent choices so we can respond to requests. We use data only for enquiry handling, service communication, quality improvement, security, and legal compliance. We retain data only as needed for those purposes. Users can request correction or deletion where legally available. We use reasonable security practices and may use cookies or analytics to improve the site. Contact hello@assignmentnepal.com for deletion or correction requests.",
  },
];

export function getCollegeBySlug(slug: string) {
  return colleges.find((college) => college.slug === slug);
}

export function getUniversityBySlug(slug: string) {
  return foreignUniversities.find((university) => university.slug === slug);
}

export function getProgrammeBySlug(slug: string) {
  return programmes.find((programme) => programme.slug === slug);
}

export function getSubjectBySlug(slug: string) {
  return subjectAreas.find((subject) => subject.slug === slug);
}

export function getServiceBySlug(slug: string) {
  return services.find((service) => service.slug === slug);
}

export function getBlogPostBySlug(slug: string) {
  return blogPosts.find((post) => post.slug === slug);
}
