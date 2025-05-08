
export interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  description: string;
  requirements: string[];
  salary: string;
  type: string;
  category: string;
  postedDate: string;
  logo?: string;
}

export const jobs: Job[] = [
  {
    id: "1",
    title: "Senior Frontend Developer",
    company: "Tech Innovations Ltd",
    location: "London, UK",
    description: "We are looking for a Senior Frontend Developer to join our team. You will be responsible for developing and maintaining our web applications.",
    requirements: [
      "5+ years of experience with React",
      "Strong knowledge of JavaScript, HTML, and CSS",
      "Experience with state management (Redux, Context API)",
      "Experience with API integration",
    ],
    salary: "£70,000 - £85,000",
    type: "Full-time",
    category: "Development",
    postedDate: "2025-05-01",
  },
  {
    id: "2",
    title: "UX/UI Designer",
    company: "Creative Solutions",
    location: "Remote",
    description: "Join our creative team as a UX/UI Designer and help us create beautiful and functional user interfaces.",
    requirements: [
      "3+ years of UX/UI design experience",
      "Proficiency with design tools (Figma, Sketch)",
      "Portfolio showcasing your work",
      "Knowledge of user-centered design practices",
    ],
    salary: "£45,000 - £60,000",
    type: "Full-time",
    category: "Design",
    postedDate: "2025-05-03",
  },
  {
    id: "3",
    title: "DevOps Engineer",
    company: "Cloud Systems Inc",
    location: "Manchester, UK",
    description: "We're seeking a DevOps Engineer to help us build and maintain our cloud infrastructure.",
    requirements: [
      "Experience with AWS, Azure, or GCP",
      "Knowledge of CI/CD pipelines",
      "Familiarity with containerization technologies",
      "Experience with infrastructure as code",
    ],
    salary: "£65,000 - £80,000",
    type: "Full-time",
    category: "DevOps",
    postedDate: "2025-04-28",
  },
  {
    id: "4",
    title: "Marketing Manager",
    company: "Growth Brands",
    location: "London, UK",
    description: "Lead our marketing efforts and help us grow our brand presence across all channels.",
    requirements: [
      "5+ years of marketing experience",
      "Experience managing digital marketing campaigns",
      "Strong analytical skills",
      "Excellent communication skills",
    ],
    salary: "£55,000 - £70,000",
    type: "Full-time",
    category: "Marketing",
    postedDate: "2025-05-05",
  },
  {
    id: "5",
    title: "Backend Developer",
    company: "Data Systems Ltd",
    location: "Birmingham, UK",
    description: "Join our team to develop and maintain our backend services and APIs.",
    requirements: [
      "Experience with Node.js or Python",
      "Knowledge of database systems",
      "Understanding of RESTful API design",
      "Experience with microservices architecture",
    ],
    salary: "£60,000 - £75,000",
    type: "Full-time",
    category: "Development",
    postedDate: "2025-04-30",
  },
  {
    id: "6",
    title: "Product Manager",
    company: "Innovation Hub",
    location: "Remote",
    description: "Lead the development of new products and features from conception to launch.",
    requirements: [
      "3+ years of product management experience",
      "Experience with agile methodologies",
      "Strong understanding of user-centered design",
      "Excellent stakeholder management skills",
    ],
    salary: "£65,000 - £80,000",
    type: "Full-time",
    category: "Product",
    postedDate: "2025-05-02",
  },
];
