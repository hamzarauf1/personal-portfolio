"use client";

// import { Monitor, BriefcaseIcon } from "lucide-react";
import { motion } from "framer-motion";
// import starIcon from "../../assets/skills/star.svg";
import reactIcon from "../../assets/skills/react.svg";
import NextIcon from "../../assets/skills/next.svg";

const experiences = [
  {
    title: "Full Stack Developer",
    company: "Devsarch",
    description:
      "Currently working as a Full Stack MERN Developer with 3 years of experience building scalable web applications using React, Node.js, Express, and MongoDB. Skilled in developing responsive UIs, REST APIs, authentication flows, and deploying full-stack solutions with modern DevOps tools.",
    icon: reactIcon,
    technologies: ["MERN", "PostgreSQL", "MySQL", "Next.js"],
    duration: "May 2023 - Present",
  },
  {
    title: "Software Engineer",
    company: "Petsaal Technologies",
    description:
      "Worked as a Next.JS developer at Petsaal Technologies since Apr 2022.Designed and developed a high-quality messaging platform, owning everything from backend architecture to a clean, intuitive UI layout. Built dynamic interfaces with React.js, paired with server-side rendering techniques to boost page responsiveness and user engagement.",
    icon: NextIcon,
    technologies: ["Next.js", "Stripe", "PostgreSQL", "Mantine JS"],
    duration: "Apr 2022 - May 2023",
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
