/**
 * Cobalt University is a fictional institution made for this demo.
 * Every programme, date and person below is invented sample content.
 */

export type Level = "undergraduate" | "postgraduate" | "short";

export const levels: { id: Level; label: string; plural: string }[] = [
  { id: "undergraduate", label: "Undergraduate", plural: "Undergraduate degrees" },
  { id: "postgraduate", label: "Postgraduate", plural: "Postgraduate degrees" },
  { id: "short", label: "Short course", plural: "Short courses" },
];

export const schools = [
  { id: "design", name: "School of Design and Media", blurb: "Design as a practice: research, making and testing with real users." },
  { id: "computing", name: "School of Computing and Data", blurb: "Software, data and the judgement to know what to build and what to trust." },
  { id: "business", name: "School of Business and Innovation", blurb: "How organisations start, grow and change, learned by working on live problems." },
] as const;

export type SchoolId = (typeof schools)[number]["id"];

export type Programme = {
  id: string;
  name: string;
  level: Level;
  school: SchoolId;
  duration: string;
  mode: string;
  intake: string;
  summary: string;
  study: string[];
};

export const programmes: Programme[] = [
  { id: "ba-design", name: "BA Design and Interaction", level: "undergraduate", school: "design", duration: "3 years", mode: "Full-time, on campus", intake: "September 2027", summary: "A studio degree in designing products and services people can actually use.", study: ["Design studio and critique every term", "User research and prototyping", "A final-year project with an external partner"] },
  { id: "bsc-computing", name: "BSc Computing", level: "undergraduate", school: "computing", duration: "3 years", mode: "Full-time, on campus", intake: "September 2027", summary: "Core computer science, with building and shipping software from the first term.", study: ["Programming, algorithms and systems", "Software engineering in teams", "Electives in data, security or interaction"] },
  { id: "bsc-data", name: "BSc Data Science", level: "undergraduate", school: "computing", duration: "3 years", mode: "Full-time, on campus", intake: "September 2027", summary: "Statistics, programming and communication, applied to real datasets.", study: ["Statistics and probability", "Data wrangling and visualisation", "A dissertation on a dataset of your choice"] },
  { id: "ba-business", name: "BA Business and Innovation", level: "undergraduate", school: "business", duration: "3 years", mode: "Full-time, on campus", intake: "September 2027", summary: "Business fundamentals taught through live projects with local organisations.", study: ["Operations, finance and marketing", "Venture building and pitching", "A placement-style consultancy project"] },
  { id: "ma-design", name: "MA Human-Centred Design", level: "postgraduate", school: "design", duration: "1 year full-time or 2 years part-time", mode: "On campus, evenings for part-time", intake: "September 2027", summary: "For graduates and practitioners who want to lead design work.", study: ["Advanced research methods", "Service and systems design", "A major project, in practice or research"] },
  { id: "msc-analytics", name: "MSc Data Analytics", level: "postgraduate", school: "computing", duration: "1 year", mode: "Full-time, on campus", intake: "September 2027", summary: "A conversion master's for people who want to work with data professionally.", study: ["Machine learning and modelling", "Data engineering foundations", "An industry-set capstone"] },
  { id: "msc-computing", name: "MSc Applied Computing", level: "postgraduate", school: "computing", duration: "1 year", mode: "Full-time, on campus", intake: "September 2027", summary: "Advanced software and systems for graduates from any discipline.", study: ["Software architecture", "Cloud and distributed systems", "A project built for a real client"] },
  { id: "msc-innovation", name: "MSc Innovation and Entrepreneurship", level: "postgraduate", school: "business", duration: "1 year", mode: "Full-time, on campus", intake: "September 2027", summary: "Build and test a venture, or lead change inside an existing organisation.", study: ["Venture design and validation", "Finance and negotiation for founders", "A live venture or consultancy project"] },
  { id: "cert-ux", name: "UX Design Certificate", level: "short", school: "design", duration: "12 weeks", mode: "Part-time, hybrid evenings", intake: "March 2027", summary: "A focused route into UX design without stopping your day job.", study: ["Run user interviews and synthesise them", "Build and test an interactive prototype", "Write a portfolio-ready case study"] },
  { id: "cert-data", name: "Data Analytics Certificate", level: "short", school: "computing", duration: "16 weeks", mode: "Full-time, on campus", intake: "April 2027", summary: "The fastest route to a working data portfolio.", study: ["Clean and document a real dataset", "Build a dashboard that answers a question", "Present findings to a non-technical audience"] },
];

export const schoolName = (id: SchoolId) => schools.find((s) => s.id === id)!.name;
export const levelLabel = (l: Level) => levels.find((x) => x.id === l)!.label;

/** Landing anchor for a level: the id of its first programme row. */
export const levelAnchor = (l: Level) => programmes.find((p) => p.level === l)!.id;
