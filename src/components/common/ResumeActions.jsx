"use client";

import { useMemo, useState, useRef, useEffect } from "react";
import { AnimatePresence, MotionConfig, motion } from "framer-motion";
import useMeasure from "react-use-measure";
import { Download, Headphones, Pause } from "lucide-react";
import FamilyButton from "../ui/FamilyButton";

export function ResumeActions() {
  return (
    <div className="fixed bottom-4 right-4 z-[100]">
      <FamilyButton>
        <ResumeActionsToggle />
      </FamilyButton>
    </div>
  );
}

const tabs = [
  { id: 0, label: "Download" },
  // { id: 1, label: "Listen" },
];

export function ResumeActionsToggle() {
  const [activeTab, setActiveTab] = useState(0);
  const [direction, setDirection] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);
  const [ref, bounds] = useMeasure();
  const audioRef = useRef(null);

  // Replace this with your Google Drive file ID
  const RESUME_PDF_ID = "1D1UXQiyRZ_IwMmyPR8bcPCzn5HFj1Gat";
  // Google Drive direct download link
  const PDF_URL = `https://drive.google.com/uc?export=download&id=${RESUME_PDF_ID}`;

  // Function to handle PDF download from Google Drive
  const handleDownload = () => {
    try {
      window.open(PDF_URL, "_blank");
    } catch (error) {
      console.error("Error in download handler:", error);
      alert(
        "Sorry, there was an error downloading the resume. Please try again later."
      );
    }
  };

  // For audio playback using TTS (Text-to-Speech)
  const handleAudioPlayback = () => {
    if (!window.speechSynthesis) {
      alert(
        "Sorry, your browser doesn't support text-to-speech functionality."
      );
      return;
    }

    try {
      if (!audioRef.current) {
        // Initialize speech synthesis
        const utterance = new SpeechSynthesisUtterance(RESUME_TEXT);
        // Customize voice settings
        utterance.rate = 1.0; // Speed of speech
        utterance.pitch = 1.0; // Pitch of voice
        utterance.volume = 1.0; // Volume

        // Try to set a natural-sounding voice
        const voices = window.speechSynthesis.getVoices();
        const englishVoice =
          voices.find(
            (voice) =>
              voice.lang.startsWith("en") && voice.name.includes("Natural")
          ) || voices.find((voice) => voice.lang.startsWith("en"));

        if (englishVoice) {
          utterance.voice = englishVoice;
        }

        // Add event listeners
        utterance.onend = () => {
          setIsPlaying(false);
        };
        utterance.onerror = () => {
          setIsPlaying(false);
          setAudioError(true);
          alert("Sorry, there was an error with the text-to-speech playback.");
        };

        audioRef.current = utterance;
      }

      if (isPlaying) {
        window.speechSynthesis.cancel();
        setIsPlaying(false);
      } else {
        window.speechSynthesis.speak(audioRef.current);
        setIsPlaying(true);
      }
    } catch (error) {
      console.error("Error in audio handler:", error);
      setAudioError(true);
      alert(
        "Sorry, there was an error with the audio playback. Please try again later."
      );
    }
  };

  // Cleanup speech synthesis on component unmount
  useEffect(() => {
    return () => {
      if (window.speechSynthesis) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  // Replace this with your resume text content
  const RESUME_TEXT = `
        Hello, my name is Hamza Rauf.
You can reach me via email at hamzamian1@gmail.com or by phone at (+92) 3456058310.
You can also find me on GitHub at https://github.com/hamzarauf1 and on LinkedIn at https://www.linkedin.com/in/hamza-rauf-017187140/.

I am a Full-Stack Developer with over one year of experience in both front-end and back-end development.
I specialize in building scalable web applications using Next.js and React.
My strengths include writing clean, maintainable code, implementing secure authentication, and optimizing database queries.
I have a proven track record of delivering high-quality, user-friendly applications with a strong emphasis on UI and UX design.

As a Software Engineer at Devsarch since August 2023, I have developed Next.js applications with reusable components,
reduced page load times by 35% with optimized state management and lazy-loading,
integrated Stripe and real-time APIs like Pusher for seamless payment and chat features,
and improved UI responsiveness by cutting component re-renders by 20%.

Before that, as a Web Developer Intern at Petsaal Technologies from April 2023 to July 2023,
I modernized legacy front-end code with HTML5 and CSS3 to boost accessibility scores,
optimized JavaScript for faster load times, and consistently delivered tasks ahead of schedule using Agile practices.

My core skills include Full Stack Development, Database Management, Agile Methodologies such as Scrum and Kanban, and Version Control. I also excel in web development, with strong communication and collaboration skills that allow me to work effectively in diverse teams.

Thank you for taking the time to learn about me and my work. If you’d like to discuss opportunities or collaborate on a project, don’t hesitate to reach out. I look forward to connecting with you!
     `.trim();

  const content = useMemo(() => {
    switch (activeTab) {
      case 0:
        return (
          <button
            onClick={handleDownload}
            className="flex items-center justify-center p-2 rounded-full hover:bg-neutral-600 transition-colors"
            aria-label="Download Resume"
          >
            <Download size={32} className="text-white" />
          </button>
        );
      // case 1:
      //      return (
      //           <button
      //                onClick={handleAudioPlayback}
      //                className="flex items-center justify-center p-2 rounded-full hover:bg-neutral-600 transition-colors"
      //                aria-label={isPlaying ? "Pause Audio" : "Play Audio"}
      //                disabled={audioError}
      //           >
      //                {isPlaying ? (
      //                     <Pause size={32} className="text-white" />
      //                ) : (
      //                     <Headphones size={32} className="text-white" />
      //                )}
      //           </button>
      //      )
      default:
        return null;
    }
  }, [activeTab, isPlaying, audioError]);

  // Handle tab switching only
  const handleTabClick = (newTabId) => {
    if (newTabId !== activeTab && !isAnimating) {
      const newDirection = newTabId > activeTab ? 1 : -1;
      setDirection(newDirection);
      setActiveTab(newTabId);
      playClickSound();
    }
  };

  // Cleanup audio on component unmount
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener("ended", () => {
          setIsPlaying(false);
        });
      }
    };
  }, []);

  const variants = {
    initial: (direction) => ({
      x: 300 * direction,
      opacity: 0,
      filter: "blur(4px)",
    }),
    active: {
      x: 0,
      opacity: 1,
      filter: "blur(0px)",
    },
    exit: (direction) => ({
      x: -300 * direction,
      opacity: 0,
      filter: "blur(4px)",
    }),
  };

  return (
    <div className="flex flex-col items-center pt-4 text-white">
      <div className="flex space-x-1 border border-none rounded-[8px] cursor-pointer bg-neutral-700 px-[3px] py-[3.2px] shadow-inner-shadow">
        {tabs.map((tab, i) => (
          <button
            key={`${tab.id}-i-${i}`}
            onClick={() => handleTabClick(tab.id)}
            className={`${
              activeTab === tab.id ? "text-white" : "hover:text-white-300/60"
            } relative rounded-[5px] px-3 py-1.5 text-xs sm:text-sm font-medium text-white-600 transition focus-visible:outline-1 focus-visible:ring-1 focus-visible:ring-blue-light focus-visible:outline-none`}
            style={{ WebkitTapHighlightColor: "transparent" }}
          >
            {activeTab === tab.id && (
              <motion.span
                layoutId="resume-action-bubble"
                className="absolute inset-0 z-10 bg-neutral-800 mix-blend-difference shadow-inner-shadow"
                style={{ borderRadius: 5 }}
                transition={{ type: "spring", bounce: 0.19, duration: 0.4 }}
              />
            )}
            {tab.label}
          </button>
        ))}
      </div>
      <MotionConfig transition={{ duration: 0.4, type: "spring", bounce: 0.2 }}>
        <motion.div
          className="relative mx-auto my-[10px] w-[60px] md:w-[150px] overflow-hidden"
          initial={false}
          animate={{ height: bounds.height }}
        >
          <div className="md:p-6 p-2" ref={ref}>
            <AnimatePresence
              custom={direction}
              mode="popLayout"
              onExitComplete={() => setIsAnimating(false)}
            >
              <motion.div
                key={activeTab}
                variants={variants}
                initial="initial"
                animate="active"
                exit="exit"
                custom={direction}
                onAnimationStart={() => setIsAnimating(true)}
                onAnimationComplete={() => setIsAnimating(false)}
                className="flex items-center justify-center"
              >
                {content}
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      </MotionConfig>
    </div>
  );
}
