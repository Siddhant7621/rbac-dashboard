import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Hearts() {
  const [hearts, setHearts] = useState([]);

  useEffect(() => {
    const handleMouseMove = (e) => {
      const id = Math.random();
      const newHeart = {
        id,
        x: e.clientX,
        y: e.clientY,
        rotation: Math.random() * 360,
      };
      setHearts((prev) => [...prev, newHeart]);
      setTimeout(() => {
        setHearts((prev) => prev.filter((h) => h.id !== id));
      }, 1500);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {hearts.map((heart) => (
        <motion.div
          key={heart.id}
          initial={{ opacity: 1, scale: 1, y: 0 }}
          animate={{ opacity: 0, y: -100, rotate: heart.rotation }}
          transition={{ duration: 1.5 }}
          style={{
            position: "fixed",
            left: heart.x,
            top: heart.y,
            pointerEvents: "none",
            fontSize: "20px",
            color: "#ff69b4",
          }}
        >
          ❤️
        </motion.div>
      ))}
    </>
  );
}
