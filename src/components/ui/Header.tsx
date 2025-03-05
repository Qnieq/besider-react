import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const menu = [
  { title: 'SCIENCE', link: '/link1' },
  { title: 'GENERAL', link: '/link2' },
  { title: 'ENTERTAINMENT', link: '/link3' },
  { title: 'TECHNOLOGY', link: '/link4' },
  { title: 'BUSINESS', link: '/link5' },
  { title: 'HEALTH', link: '/link6' },
  { title: 'SPORTS', link: '/link7' },
];

const menuVariants = {
  hidden: {  x: '-100%' },
  visible: {  x: 0, transition: { duration: 0.4, ease: 'easeOut' } },
  exit: { x: '-100%', transition: { duration: 0.4, ease: 'easeIn' } },
};

const itemVariants = (index: number) => ({
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: {delay: (index + 1) * 0.2 , duration: 0.3, ease: 'easeOut' } },
});

const Header: React.FC = () => {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="w-full h-[72px] border-b-2 border-[#00000025] p-5 text-white flex items-center justify-between relative">
      <button onClick={() => setMenuOpen(!menuOpen)} className="focus:outline-none">
        <svg className="w-6 h-6" fill="none" stroke="black" strokeWidth="2" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </button>
      <h1 className="text-lg font-semibold text-[24px] tracking-widest text-black">BESIDER</h1>
      <div></div>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={menuVariants}
            className="absolute top-0 left-0 w-full h-screen bg-white flex items-center"
          >
            <ul className="flex flex-col gap-[28px] p-5" style={{ gap: "clamp(1rem, 5vw, 2rem)" }}>
              {menu.map((item, index) => (
                <motion.li
                  key={index}
                  variants={itemVariants(index)}
                  initial="hidden"
                  animate="visible"
                  className="mb-2 text-black font-extrabold text-[22px] tracking-widest cursor-pointer"
                >
                  {item.title}
                </motion.li>
              ))}
            </ul>
            <button onClick={() => setMenuOpen(false)} className="focus:outline-none cursor-pointer absolute top-5 right-5">
              <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M21 21L1 1M21 1L1 21" stroke="black" strokeWidth="2" strokeLinecap="round" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
