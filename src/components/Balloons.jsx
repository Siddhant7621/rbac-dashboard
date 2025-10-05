import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function Balloons() {
  const [balloons, setBalloons] = useState([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const id = Math.random();
      const colors = ["#FF69B4", "#FFB6C1", "#FFD700", "#8A2BE2"];
      const newBalloon = {
        id,
        x: Math.random() * window.innerWidth,
        color: colors[Math.floor(Math.random() * colors.length)],
      };
      setBalloons((prev) => [...prev, newBalloon]);
      setTimeout(() => {
        setBalloons((prev) => prev.filter((b) => b.id !== id));
      }, 4000);
    }, 400);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {balloons.map((b) => (
        <motion.div
          key={b.id}
          initial={{ y: window.innerHeight, opacity: 1 }}
          animate={{ y: -200, opacity: 0 }}
          transition={{ duration: 4, ease: "easeOut" }}
          style={{
            position: "fixed",
            left: b.x,
            fontSize: "2rem",
            color: b.color,
            pointerEvents: "none",
          }}
        >
          🎈
        </motion.div>
      ))}
    </>
  );
}
