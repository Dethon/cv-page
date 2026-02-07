// All CV content as typed data

import type { PersonalInfo, ExperienceEntry, SkillCategory, EducationEntry, ProjectEntry } from '../types/content';

export const personalInfo: PersonalInfo = {
  name: "Juan Francisco Crespo Galan",
  title: "Senior Full Stack Engineer",
  summary: "I'm a software engineer and developer with more than ten years of professional experience. Passionate about all kinds of technology, but especially interested in software design, parallelism, and optimization in 'close to the metal' languages. I have worked with a remarkably diverse technological stack: from C in embedded systems, to full stack web development, digital signal processing, some videogame development and, more recently, machine learning. I pride myself on being able to learn most languages and frameworks in a truly short amount of time and provide efficient solutions to any kind of problem.",
  location: "Spain",
  email: "JF_Crespo@outlook.es",
  linkedin: "https://www.linkedin.com/in/jfcrespo5",
  github: "https://github.com/dethon"
};

export const experiences: ExperienceEntry[] = [
  {
    company: "Redslim",
    roles: [
      {
        title: "Senior Full Stack Engineer",
        startDate: "2023-04",
        endDate: "Present",
        location: "Madrid, Spain",
        achievements: [
          "Driving technical initiatives for unified platform creation",
          "Created event-driven module for internal process visibility",
          "Developing distributed data processing tools for quality standards enforcement",
          "Leveraging diverse tech stack to integrate existing pieces with new functionality"
        ]
      }
    ]
  },
  {
    company: "NielsenIQ",
    roles: [
      {
        title: "Senior Software Engineer",
        startDate: "2021-09",
        endDate: "2023-04",
        location: "Valladolid, Spain",
        achievements: [
          "Increased automation and developed human-assisting tools through data-oriented solutions",
          "Collaborated on latest version of NIQ's internal ML framework",
          "Defined and published improved ML artifact workflow"
        ]
      }
    ]
  },
  {
    company: "NTT DATA Europe and LATAM",
    roles: [
      {
        title: "Full Stack Engineer",
        startDate: "2020-06",
        endDate: "2021-09",
        location: "Valladolid, Spain",
        achievements: [
          "Led front-end part of BilliB product at critical time",
          "Ensured correct and timely delivery of key features"
        ]
      },
      {
        title: "Back End Engineer",
        startDate: "2019-04",
        endDate: "2020-06",
        location: "Valladolid, Spain",
        achievements: [
          "Developed financial software for BilliB",
          "Spearheaded 10x throughput increase by optimizing orchestration flows"
        ]
      }
    ]
  },
  {
    company: "GRIAL",
    roles: [
      {
        title: "Software Engineer",
        startDate: "2016-10",
        endDate: "2019-04",
        location: "Zamora, Spain",
        achievements: [
          "Developer for joint projects with INTRAS Foundation",
          "Created management system MVP using TDD methodology",
          "Integrated independent projects with unified auth and dashboard"
        ]
      },
      {
        title: "Software Developer",
        startDate: "2016-04",
        endDate: "2016-09",
        location: "Salamanca, Spain",
        achievements: [
          "Developed private social network for special needs care centers"
        ]
      }
    ]
  },
  {
    company: "Audaspace (Blender's audio library)",
    roles: [
      {
        title: "Open Source Developer",
        startDate: "2015-06",
        endDate: "2015-11",
        location: "Remote",
        achievements: [
          "Contributed audio processing features to Audaspace/Blender",
          "Implemented spatial sound via high-performance C++ convolution",
          "Exposed C++ capabilities through Python bindings"
        ]
      }
    ]
  },
  {
    company: "Universidad de Salamanca",
    roles: [
      {
        title: "Software Developer",
        startDate: "2013-06",
        endDate: "2013-09",
        location: "Salamanca, Spain",
        achievements: [
          "Developed 3D model visualization and manipulation for medical training software"
        ]
      }
    ]
  }
];

export const skillCategories: SkillCategory[] = [
  {
    category: "Frontend",
    skills: ["TypeScript", "JavaScript", "React", "Angular", "HTML", "CSS"]
  },
  {
    category: "Backend",
    skills: ["Java", "Spring", "Python", "Node.js", "C#", ".NET"]
  },
  {
    category: "Data and ML",
    skills: ["Apache Spark", "Azure Databricks", "Machine Learning", "Data Processing"]
  },
  {
    category: "Systems and Audio",
    skills: ["C", "C++", "Embedded Systems", "Digital Signal Processing"]
  },
  {
    category: "DevOps",
    skills: ["Docker", "Kubernetes", "Azure", "CI/CD", "Git"]
  },
  {
    category: "Languages",
    skills: ["Spanish (Native)", "English (Professional)"]
  }
];

export const education: EducationEntry[] = [
  {
    degree: "Master's degree in Computer Engineering",
    institution: "Universidad de Salamanca",
    startYear: "2014",
    endYear: "2016"
  },
  {
    degree: "Bachelor's degree in Computer Science",
    institution: "Universidad de Salamanca",
    startYear: "2008",
    endYear: "2014"
  },
  {
    degree: "Technical Engineering in Computer Systems",
    institution: "Universidad de Salamanca",
    startYear: "2008",
    endYear: "2013"
  }
];

export const projects: ProjectEntry[] = [
  {
    title: "ML Data Processing Pipeline",
    description: "Distributed data processing system for enforcing quality standards across ML workflows. Built event-driven architecture for real-time process visibility and automated quality checks at scale.",
    technologies: ["Python", "Apache Spark", "Azure Databricks", "Docker", "Machine Learning"],
    githubUrl: "https://github.com/dethon"
  },
  {
    title: "Spatial Audio Engine",
    description: "High-performance spatial audio processing library implementing 3D sound convolution algorithms. Contributed to Audaspace/Blender with C++ core and Python bindings for real-time audio manipulation.",
    technologies: ["C++", "Python", "Digital Signal Processing", "Blender"],
    githubUrl: "https://github.com/dethon"
  },
  {
    title: "Financial Orchestration Platform",
    description: "Microservices-based financial software achieving 10x throughput increase through optimized orchestration flows. Led full-stack development with focus on performance and reliability.",
    technologies: ["Java", "Spring", "React", "TypeScript", "Kubernetes", "Azure"],
    githubUrl: "https://github.com/dethon"
  },
  {
    title: "Healthcare Management System",
    description: "TDD-driven management system MVP for special needs care centers. Integrated independent projects with unified authentication and centralized dashboard.",
    technologies: ["JavaScript", "Node.js", "React", "PostgreSQL", "Docker"],
    githubUrl: "https://github.com/dethon"
  },
  {
    title: "CV Portfolio Page",
    description: "Responsive single-page CV portfolio built with React, TypeScript, and Vite. Features dark/light theme toggle, smooth scrolling navigation, and accessibility-first design deployed on GitHub Pages.",
    technologies: ["React", "TypeScript", "Vite", "CSS Grid", "GitHub Pages"],
    githubUrl: "https://github.com/dethon/cv-page",
    demoUrl: "https://dethon.github.io/cv-page"
  }
];
