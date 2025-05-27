"use client";

// import { Monitor, BriefcaseIcon } from "lucide-react";
import { motion } from "framer-motion";
// import starIcon from "../../assets/skills/star.svg";
import reactIcon from "../../assets/skills/react.svg";
import NextIcon from "../../assets/skills/next.svg";

const experiences = [
  {
    title: "Full Stack Developer",
    company: "Keyhole",
    description:
      "Currently working as a full-stack developer at Keyhole since Dec 2021.Built full-stack features using React (Next.js) and scalable Python APIs with Flask/FastAPI. Developed ETL pipelines via Airflow and custom Python scripts to process third-party social data. Used Pandas, NumPy, and Scikit-learn for real-time analytics and audience insights. Integrated sentiment analysis with spaCy/NLTK to enrich content interpretation. Deployed on AWS using Docker and Gunicorn, ensuring scalable performance..",
    icon: reactIcon,
    technologies: ["MERN", "PostgreSQL", "MySQL", "Next.js"],
    duration: "Dec 2021 - Present",
  },
  {
    title: "Software Engineer",
    company: "Shewt.io",
    description:
      "Worked as a Next.JS developer at Shewt.io since Apr 2020.Designed and developed a high-quality messaging platform, owning everything from backend architecture to a clean, intuitive UI layout. Built dynamic interfaces with React.js, paired with server-side rendering techniques to boost page responsiveness and user engagement.",
    icon: NextIcon,
    technologies: ["Next.js", "Stripe", "PostgreSQL", "Mantine JS"],
    duration: "Apr 2020 - Oct 2021",
  },
];

export default function Experience() {
  return (
    <section className="min-h-screen bg-[#F2F2F4] py-24 px-4 sm:px-6 lg:px-8 rounded-t-[80px]">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl font-bold text-green-600  mb-10 tracking-wider"
        >
          EXPERIENCE
        </motion.h2>

        <div className="">
          {experiences.map((experience, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="group"
            >
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Left column - Title and Company */}
                <div className="lg:col-span-4 ">
                  <div className="flex items-center gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-500 group-hover:bg-gray-900 text-black transition-colors duration-300">
                      <img src={experience.icon} alt="" />
                    </div>
                    <div>
                      <h3 className="text-2xl font- ">{experience.title}</h3>
                      <p className=" mt-1">{experience.company}</p>
                      <p className=" text-sm mt-1">{experience.duration}</p>
                    </div>
                  </div>
                </div>

                {/* Right column - Description and Technologies */}
                <div className="lg:col-span-8 space-y-2">
                  <p className=" leading-relaxed text-gray-600">
                    {experience.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {experience.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="inline-flex items-center px-4 py-1.5 rounded-full text-sm font-bold text-gray-800 bg-green-300 hover:bg-gray-300 cursor-pointer transition-colors duration-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              {/* Divider */}
              {index !== experiences.length - 1 && (
                <div className="w-full h-px bg-gray-300 my-8" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
