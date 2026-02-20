import type { Project } from "@/lib/types";

export const personalInfo = {
  name: "Steven Lagadapati",
  role: "Data Science Master",
  tagline: "Data Scientist in Training",
  description:
    "I transform complex datasets into actionable insights. Specializing in machine learning, predictive modeling, and advanced data visualization to drive decision-making.",
  aboutDescription:
    "I am a passionate Data Scientist with a strong foundation in machine learning and statistical analysis. My journey involves...",
  email: "stevenlagadapati1012@gmail.com",
  location: "Florida, USA",
  availability: "Open to new opportunities",
  image: "/images/profile.jpg",
  resume: "/resume.pdf",
};

export const education = [
  {
    institution: "Florida Atlantic University",
    degree: "Master of Science in Data Science",
    period: "2022 - 2024",
    status: "Graduating Soon",
    description:
      "Specializing in Machine Learning, Statistical Analysis, and Big Data Technologies.",
    skills: [
      "Machine Learning",
      "Statistical Analysis",
      "Deep Learning",
      "Big Data",
    ],
  },
];

export const skills = {
  "Core Languages": {
    icon: "Code",
    description: "Foundational languages for robust software engineering and statistical analysis.",
    items: ["Python", "R", "SQL", "C++"],
  },
  "Machine Learning & AI": {
    icon: "Brain",
    description: "Building and deploying predictive models and deep learning architectures.",
    items: [
      "TensorFlow",
      "PyTorch",
      "Scikit-learn",
      "Hugging Face",
      "OpenCV",
    ],
  },
  "Data Engineering & Tools": {
    icon: "Database",
    description: "Infrastructure and utilities for efficient data pipelines and development.",
    items: ["Pandas", "NumPy", "Apache Spark", "Docker", "Git/GitHub", "AWS"],
  },
  "Visualization": {
    icon: "BarChart3",
    description: "Communicating insights effectively through interactive dashboards and plots.",
    items: ["Tableau", "Matplotlib", "Seaborn", "PowerBI", "Plotly"],
  },
};

export const projects: Project[] = [
  {
    id: 1,
    title: "Sentiment Analysis on Twitter",
    description:
      "Analyzed 50k tweets to determine public sentiment during the 2024 elections using NLP and machine learning techniques.",
    longDescription:
      "Built a comprehensive sentiment analysis pipeline using NLTK and transformers. The model achieved 87% accuracy in classifying positive, negative, and neutral sentiments. Implemented data cleaning, feature extraction, and model training workflows.",
    category: "Machine Learning",
    categories: ["Machine Learning"],
    tags: ["Python", "NLTK", "Scikit-learn", "Pandas"],
    image: "/images/projects/sentiment.jpg",
    github: "https://github.com/yourusername/sentiment-analysis",
    demo: null,
    featured: true,
  },
  {
    id: 2,
    title: "Real-time Object Detection",
    description:
      "Built a real-time object detection system capable of identifying 80 distinct classes of objects in live video feeds.",
    longDescription:
      "Implemented YOLOv8 for real-time object detection with OpenCV. The system processes video streams at 30 FPS and can detect common objects with high accuracy. Includes custom training on specific object classes.",
    category: "Machine Learning",
    categories: ["Machine Learning"],
    tags: ["OpenCV", "YOLO", "PyTorch", "Computer Vision"],
    image: "/images/projects/object-detection.jpg",
    github: "https://github.com/yourusername/object-detection",
    demo: null,
    featured: true,
  },
  {
    id: 3,
    title: "Global Climate Dashboard",
    description:
      "An interactive dashboard visualizing global temperature anomalies over the last century. Features drill-down capabilities by region.",
    longDescription:
      "Created an interactive Tableau dashboard that visualizes climate data from NASA and NOAA. Users can explore temperature trends, precipitation patterns, and CO2 levels across different time periods and geographic regions.",
    category: "Data Science",
    categories: ["Data Science"],
    tags: ["Tableau", "SQL", "R", "Data Visualization"],
    image: "/images/projects/climate.jpg",
    github: null,
    demo: "https://public.tableau.com/profile",
    featured: true,
  },
  {
    id: 4,
    title: "Housing Price Prediction",
    description:
      "Developed a predictive model for housing prices in metropolitan areas. Utilized XGBoost regressor and feature engineering.",
    longDescription:
      "Built a machine learning pipeline for predicting house prices based on features like location, size, age, and amenities. Implemented extensive feature engineering and hyperparameter tuning to achieve R² score of 0.91.",
    category: "Machine Learning",
    categories: ["Machine Learning"],
    tags: ["Python", "XGBoost", "Pandas", "Feature Engineering"],
    image: "/images/projects/housing.jpg",
    github: "https://github.com/yourusername/housing-prediction",
    demo: null,
    featured: false,
  },
  {
    id: 5,
    title: "Personal Portfolio V1",
    description:
      "Designed and developed a responsive portfolio website to showcase data science projects. Implemented a clean, modern UI.",
    longDescription:
      "Built using React, Tailwind CSS, and Node.js. Features project filtering, responsive design, and smooth animations. Deployed on Vercel with continuous integration.",
    category: "Web Dev",
    categories: ["Web Dev"],
    tags: ["React", "Tailwind", "Node.js", "Vercel"],
    image: "/images/projects/portfolio.jpg",
    github: "https://github.com/yourusername/portfolio-v1",
    demo: "https://yourportfolio.vercel.app",
    featured: false,
  },
  {
    id: 6,
    title: "Neural Network Pruning",
    description:
      "Master's thesis research on optimizing deep neural networks for mobile deployment. Investigated magnitude-based pruning.",
    longDescription:
      "Researched and implemented various neural network pruning techniques to reduce model size while maintaining accuracy. Achieved 60% reduction in model size with only 2% accuracy loss on ImageNet dataset.",
    category: "Research",
    categories: ["Research"],
    tags: ["TensorFlow", "Research", "Deep Learning", "Optimization"],
    image: "/images/projects/pruning.jpg",
    github: null,
    demo: null,
    featured: true,
  },
];

export const socialLinks = {
  linkedin: "https://linkedin.com/in/yourprofile",
  github: "https://github.com/yourusername",
  email: "stevenlagadapati1012@gmail.com",
};

export const siteMetadata = {
  title: "Steven Lagadapati | Data Science Master's Student",
  description:
    "Portfolio of Steven Lagadapati, a Data Science graduate student at Florida Atlantic University specializing in Machine Learning, Statistical Analysis, and Data Visualization.",
  url: "https://yourportfolio.vercel.app",
  image: "/images/og-image.jpg",
  keywords: [
    "Data Science",
    "Machine Learning",
    "Python",
    "Portfolio",
    "Steven Lagadapati",
    "FAU",
    "FAU",
    "Data Scientist",
  ],
  projectCategories: [
    "Machine Learning",
    "Data Science",
    "Web Dev",
    "Research",
  ],
};
