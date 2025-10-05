import { motion } from "framer-motion";
import Confetti from "react-confetti";
import { useState, useEffect } from "react";
import Hearts from "./components/Hearts";
import Balloons from "./components/Balloons";

export default function App() {
  const [showConfetti, setShowConfetti] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const audio = new Audio("/music.mp3"); // Add your own music file in public/music.mp3
    audio.volume = 0.4;
    audio.loop = true;
    audio.play().catch(() => {});
  }, []);

  return (
    <div className="min-h-screen text-center text-gray-800">
      <Hearts /> {/* <-- add this here */}
      <Balloons />
      {showConfetti && <Confetti />}
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center h-screen bg-romanticBg relative overflow-hidden">
        {/* Sparkle animation */}
        <motion.div
          className="absolute top-0 left-0 w-full h-full pointer-events-none"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 30, ease: "linear" }}
        >
          {[...Array(15)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute w-3 h-3 bg-yellow-300 rounded-full shadow-lg"
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: [0, 1, 0], y: [-50, 0, -50] }}
              transition={{
                repeat: Infinity,
                duration: 2 + Math.random() * 2,
                delay: Math.random() * 2,
              }}
              style={{
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
            />
          ))}
        </motion.div>

        <motion.h1
          className="text-6xl md:text-7xl font-romantic text-romanticPink z-10"
          initial={{ opacity: 0, y: 50, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          Happy Birthday Baby 💖
        </motion.h1>

        <motion.p
          className="text-xl mt-4 text-gray-600 z-10"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
        >
          A special day for the most special person in my life 🥰
        </motion.p>

        <motion.button
          className="mt-10 px-6 py-3 bg-romanticPink text-blue-400 rounded-full shadow-lg hover:scale-105 transition z-10"
          onClick={() => {
            document
              .getElementById("memories")
              .scrollIntoView({ behavior: "smooth" });
          }}
          whileHover={{ scale: 1.1 }}
        >
          Begin Our Journey 🌸
        </motion.button>
      </section>
      {/* Memories Section */}
      <section id="memories" className="py-16 bg-white">
        <h2 className="text-4xl font-romantic text-romanticPink mb-8">
          Our Memories 📸
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-6">
          {[
            "https://res.cloudinary.com/dzpty54y0/image/upload/v1759671072/profiles/IMG_2495_heolfn.jpg",
            "https://res.cloudinary.com/dzpty54y0/image/upload/v1759671069/profiles/IMG_1963_eradba.jpg",
            "https://res.cloudinary.com/dzpty54y0/image/upload/v1759671072/profiles/IMG_2495_heolfn.jpg",
            "https://res.cloudinary.com/dzpty54y0/image/upload/v1759672063/profiles/IMG_3535_rplkuv.jpg",
            "https://res.cloudinary.com/dzpty54y0/image/upload/v1759671091/profiles/IMG_3450_p0jltv.jpg",
            "https://res.cloudinary.com/dzpty54y0/image/upload/v1759671101/profiles/IMG_3518_fmd4fl.jpg",
            "https://res.cloudinary.com/dzpty54y0/image/upload/v1759671063/profiles/IMG_1875_gft7dd.jpg",
            "https://res.cloudinary.com/dzpty54y0/image/upload/v1759671099/profiles/IMG_3312_ahape2.jpg",
          ].map((url, i) => (
            <motion.img
              key={i}
              src={url}
              alt={`memory ${i + 1}`}
              className="rounded-2xl shadow-md hover:scale-105 transition duration-300 cursor-pointer"
              whileHover={{ rotate: 2 }}
            />
          ))}
        </div>
      </section>
      {/* Love Notes Section */}
      <section className="py-20 bg-romanticBg">
        <h2 className="text-4xl font-romantic text-romanticPink mb-6">
          Little Things I Love 💌
        </h2>
        <div className="flex flex-wrap justify-center gap-6 px-6">
          {[
            "Your smile lights up my world.",
            "Every moment with you feels special.",
            "You're my peace and my chaos.",
            "I fall for you a little more every day.",
          ].map((text, i) => (
            <motion.div
              key={i}
              className="bg-white rounded-2xl shadow-lg p-6 w-72"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.2 }}
            >
              <p className="text-lg text-gray-700 italic">“{text}”</p>
            </motion.div>
          ))}
        </div>
      </section>
      {/* Video Section */}
     <section className="py-16 bg-white">
  <h2 className="text-3xl font-romantic text-romanticPink mb-8">
    A Moment Together 🎥
  </h2>
  <div className="flex justify-center px-4">
    <video
      className="rounded-2xl shadow-lg"
      style={{
        transform: "rotate(270deg)", // keep rotation
        width: "460px",
        height: "715px",
      }}
      controls
      autoPlay
      loop
      muted
    >
      <source
        src="https://res.cloudinary.com/dzpty54y0/video/upload/v1759671081/profiles/F8CDCECC-3E9D-41C0-AB06-B3806DA6076D_w1omqc.mov"
        type="video/mp4"
      />
      Your browser does not support the video tag.
    </video>
  </div>

  {/* Mobile adjustments */}
  <style jsx>{`
    @media (max-width: 768px) {
      video {
        width: 70vw !important;   /* scale down width */
        height: auto !important;  /* auto height */
      }
    }
  `}</style>
</section>




      {/* Surprise Section */}
      <section className="py-20 bg-romanticBg">
  <h2 className="text-4xl font-romantic text-romanticPink mb-8">
    Birthday Surprise 🎉
  </h2>

  <motion.button
    className="px-6 py-3 bg-romanticPink text-blue-300 rounded-full shadow-lg"
    whileHover={{ scale: 1.15, rotate: [0, 5, -5, 0] }}
    onClick={() => {
      // First show the prank message
      setShowMessage("prank");
      setTimeout(() => {
        // After 2 seconds, show the real message + confetti
        setShowConfetti(true);
        setShowMessage("real");
        setTimeout(() => setShowConfetti(false), 6000);
      }, 2000);
    }}
  >
    Click Me 🎂
  </motion.button>

  {/* Messages */}
  {showMessage === "prank" && (
    <motion.p
      className="mt-8 text-2xl text-yellow-500 italic"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, type: "spring", stiffness: 120 }}
    >
      Haha! Fooled you 😜
    </motion.p>
  )}

  {showMessage === "real" && (
    <motion.p
      className="mt-8 text-2xl text-gray-700 italic"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 1 }}
    >
      Happy Birthday, Beta! 💖 You’re the best that has ever happened to me! 🥰
    </motion.p>
  )}
</section>

      {/* Footer */}
      <footer className="py-6 text-gray-500 text-sm">
        Made with ❤️ by Siddhant Sharma
      </footer>
    </div>
  );
}
