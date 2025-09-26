'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

/* ---------- Helpers de animación (drop-in) ---------- */
const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.6, ease: 'easeOut', delay },
});

const staggerParent = (stagger = 0.12) => ({
  initial: { opacity: 1 },
  whileInView: { opacity: 1 },
  viewport: { once: true, amount: 0.2 },
  transition: { staggerChildren: stagger },
});

const staggerItem = {
  initial: { opacity: 0, y: 14 },
  whileInView: { opacity: 1, y: 0, transition: { duration: 0.45, ease: 'easeOut' } },
};

const tapHover = {
  whileHover: { y: -2, scale: 1.02 },
  whileTap: { scale: 0.98 },
  transition: { type: 'spring', stiffness: 300, damping: 20 },
};

/* --- Helper: LinkedIn Icon Component --- */
const LinkedInIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="48"
    height="48"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="text-[#030067] h-8 w-8"
  >
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
    <rect x="2" y="9" width="4" height="12"></rect>
    <circle cx="4" cy="4" r="2"></circle>
  </svg>
);

/* --- Navbar Component (entrada suave + CTA microinteracción) --- */
const Navbar = ({ activeSection }) => {
  const linkClasses = (section) =>
    `transition-colors py-2 ${
      activeSection === section
        ? 'text-[#030067] font-semibold border-b-2 border-[#030067]'
        : 'text-gray-700 hover:text-[#030067]'
    }`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-sm">
      <motion.nav
        initial={{ y: -28, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="container mx-auto px-6 py-4 flex justify-between items-center"
      >
        <img src="/aquila-logo.png" alt="Aquila Logo" className="h-8" />
        <div className="hidden md:flex items-center space-x-8">
          <a href="#home" className={linkClasses('home')}>Home</a>
          <a href="#products-intro" className={linkClasses('products')}>Nuestros Productos</a>
          <a href="#about" className={linkClasses('about')}>Sobre Nosotros</a>
        </div>

        <motion.a
          href="https://signai.ar"
          target="_blank"
          rel="noopener noreferrer"
          {...tapHover}
          className="bg-[#030067] text-white px-4 py-2 rounded-full flex items-center space-x-2 text-sm transition-opacity"
        >
          <span>Conocé SignAI</span>
          <img src="/iso_signai.png" alt="SignAI icon" className="h-4 w-4" />
        </motion.a>
      </motion.nav>
    </header>
  );
};

/* --- Main Page Component --- */
export default function HomePage() {
  const [activeSection, setActiveSection] = useState('home');
  const sectionRefs = {
    home: useRef(null),
    productsIntro: useRef(null),
    futurePlans: useRef(null),
    education: useRef(null),
    about: useRef(null),
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const id = entry.target.id;
            if (id === 'home') setActiveSection('home');
            else if (id === 'about') setActiveSection('about');
            else if (['products-intro', 'future-plans', 'education'].includes(id)) {
              setActiveSection('products');
            }
          }
        });
      },
      { rootMargin: '-50% 0px -50% 0px' }
    );

    const refs = Object.values(sectionRefs);
    refs.forEach((ref) => ref.current && observer.observe(ref.current));
    return () => refs.forEach((ref) => ref.current && observer.unobserve(ref.current));
  }, []);

  return (
    <div className="scroll-smooth">
      <Navbar activeSection={activeSection} />

      {/* --- Hero Section (parallax leve + fadeUp) --- */}
      <main
        id="home"
        ref={sectionRefs.home}
        className="relative min-h-screen flex items-center justify-center text-white p-6"
        style={{
          backgroundImage: `url(/stars-background.png)`,
          backgroundRepeat: 'repeat',
          backgroundPosition: 'center',
          backgroundColor: '#D1C4E9',
        }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-purple-200/80 via-indigo-100/80 to-purple-200/80"></div>

        <motion.div
          {...fadeUp(0)}
          className="relative z-10 container mx-auto text-center md:text-left"
        >
          <h1 className="text-5xl md:text-7xl font-bold text-[#030067] leading-tight mb-6">
            Tecnologías que
            <br />
            derriban barreras.
          </h1>

          <motion.a
            href="#"
            aria-label="LinkedIn"
            {...tapHover}
            className="inline-block"
          >
            <LinkedInIcon />
          </motion.a>
        </motion.div>
      </main>

      {/* --- Products Section (copy reveal + card aparece) --- */}
      <section
        id="products-intro"
        ref={sectionRefs.productsIntro}
        className="bg-white pt-20 px-6"
      >
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeUp(0)}>
            <h2 className="text-4xl md:text-5xl font-light text-gray-800 leading-tight text-center md:text-left">
              Brindamos autonomía
              <br />
              a <span className="font-bold text-[#030067]">personas</span> que no la
              <br />
              tienen.
            </h2>
          </motion.div>

          <motion.div
            {...fadeUp(0.1)}
            className="bg-[#030067] text-white p-8 md:p-12 rounded-3xl shadow-2xl flex flex-col items-center text-center"
          >
            <img src="/signai-icon.png" alt="SignAI" className="h-12 mb-6" />
            <p className="text-lg md:text-xl font-light leading-relaxed mb-4">
              Tu traductor de lengua de señas <span className="font-bold">gratuito</span> impulsado por <span className="font-bold">inteligencia artificial.</span>
            </p>
            <p className="text-lg md:text-xl font-light leading-relaxed">
              Le damos voz a las personas sordas para que no dependan de un intérprete para comunicarse
            </p>
          </motion.div>
        </div>
      </section>

      {/* --- Future Plans Section (contenedor entra + list ítems con small delay) --- */}
      <section
        id="future-plans"
        ref={sectionRefs.futurePlans}
        className="bg-white py-20 px-6"
      >
        <div className="container mx-auto">
          <motion.div
            {...fadeUp(0)}
            className="bg-[#030067] text-white p-10 md:p-16 rounded-3xl shadow-2xl grid md:grid-cols-2 gap-12 items-center"
          >
            <div className="border-r-0 md:border-r md:border-white/30 pr-0 md:pr-12">
              <p className="text-lg md:text-xl font-light leading-relaxed">
                En este momento <span className="font-bold">SignAI</span> está funcionando de manera asincrónica y en DGS (Lengua de señas Alemana) debido a la falta de un banco de datos en LSA.
              </p>
            </div>

            <div>
              <h3 className="text-xl md:text-2xl font-semibold mb-6">
                Nuestros planes a futuro son los siguientes:
              </h3>

              <motion.ul
                initial="initial"
                whileInView="whileInView"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ staggerChildren: 0.12 }}
                className="space-y-4"
              >
                {[
                  'Funcionamiento en Lengua de señas Argentina',
                  'Traducción en tiempo real',
                ].map((t) => (
                  <motion.li key={t} variants={staggerItem} className="text-lg md:text-xl font-light">
                    {t}
                  </motion.li>
                ))}
              </motion.ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- Education Section (swap de columnas + reveals) --- */}
      <section
        id="education"
        ref={sectionRefs.education}
        className="bg-white pb-20 px-6"
      >
        <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
          <motion.div {...fadeUp(0)} className="bg-[#030067] text-white p-8 md:p-12 rounded-3xl shadow-2xl">
            <p className="text-lg md:text-xl font-light leading-relaxed mb-6">
              Otro gran objetivo que tenemos desde Aquila y SignAI es divulgar y dar a conocer las características de la Lengua de señas Argentina
            </p>
            <p className="text-lg md:text-xl font-light leading-relaxed">
              Próximamente SignAI incluirá una sección de aprendizaje con metas personalizadas para cada usuario para ayudar a que cada vez mas personas puedan entender y ser entendidas en LSA.
            </p>
          </motion.div>

          <motion.div {...fadeUp(0.1)} className="text-center md:text-left">
            <h2 className="text-4xl md:text-5xl font-light text-gray-800 leading-tight">
              Enseñar también
              <br />
              genera <span className="font-bold text-[#030067]">autonomía.</span>
            </h2>
          </motion.div>
        </div>
      </section>

      {/* --- Team Section (stagger en cards) --- */}
      <section id="about" ref={sectionRefs.about} className="bg-white py-20 px-6">
        <div className="container mx-auto">
          <motion.h2
            {...fadeUp(0)}
            className="text-4xl md:text-5xl font-light mb-12 text-[#030067]"
          >
            El equipo detrás de
            <br />
            <span className="font-bold">aquila:</span>
          </motion.h2>

          <motion.div
            initial="initial"
            whileInView="whileInView"
            viewport={{ once: true, amount: 0.2 }}
            transition={{ staggerChildren: 0.08 }}
            className="bg-[#030067] text-white p-10 md:p-12 rounded-3xl shadow-2xl"
          >
            <div className="grid grid-cols-2 md:grid-cols-5 gap-10 text-center">
              {[
                { name: 'Federico Díaz Németh', role: 'Desarrollador IA', imageUrl: '/team/defe.png' },
                { name: 'Borja Izurieta', role: 'Diseñador UX/UI', imageUrl: '/team/borje.png' },
                { name: 'Maximiliano Setton', role: 'Desarrollador IA', imageUrl: '/team/masi.png' },
                { name: 'Benjamín Piccagli', role: 'Back-End', imageUrl: '/team/benja.png' },
                { name: 'Tomás Grinstein', role: 'Front-End', imageUrl: '/team/toto.png' },
              ].map((member) => (
                <motion.div key={member.name} variants={staggerItem} className="flex flex-col items-center">
                  <img
                    src={member.imageUrl}
                    alt={`Photo of ${member.name}`}
                    className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-white/20"
                  />
                  <h3 className="font-semibold text-lg text-white">{member.name}</h3>
                  <p className="text-white/70">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- Footer --- */}
      <Footer />
    </div>
  );
}

/* --- Footer Component (fadeUp) --- */
const Footer = () => {
  return (
    <footer className="bg-[#E8EAF6] text-[#030067] py-16 px-6">
      <motion.div {...fadeUp(0)} className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-10 mb-8 text-center md:text-left">
          <div className="flex-shrink-0">
            <img src="/aquila-logo.png" alt="Aquila Logo" className="h-10" />
          </div>

          <div className="flex gap-16">
            <div>
              <h3 className="font-bold text-lg mb-4">Links</h3>
              <ul className="space-y-2">
                <li><a href="#home" className="hover:underline transition-colors">Home</a></li>
                <li><a href="#products-intro" className="hover:underline transition-colors">Productos</a></li>
                <li><a href="#about" className="hover:underline transition-colors">Nosotros</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Socials</h3>
              <ul className="space-y-2">
                <li><a href="#" className="hover:underline transition-colors">linkedin</a></li>
                <li><a href="#" className="hover:underline transition-colors">instagram</a></li>
              </ul>
            </div>
          </div>
        </div>

        <hr className="border-t border-[#030067]/30 my-8" />
        <div className="text-center text-sm text-[#030067]/80">
          <p>&copy; 2025 Aquila, Todos los derechos reservados</p>
        </div>
      </motion.div>
    </footer>
  );
};
