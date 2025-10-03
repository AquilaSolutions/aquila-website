'use client';
import React, { useEffect } from 'react';
import { motion } from 'framer-motion';

/* ===== Animaciones ===== */
const clipReveal = (delay = 0) => ({
  initial: { opacity: 0.001, clipPath: 'inset(0 0 100% 0)' },
  whileInView: { opacity: 1, clipPath: 'inset(0 0 0% 0)' },
  viewport: { once: true, amount: 0.35 },
  transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1], delay },
});
const slideUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.6, ease: 'easeOut', delay },
});
const slideLeft = (delay = 0) => ({
  initial: { opacity: 0, x: -28 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.55, ease: 'easeOut', delay },
});
const slideRight = (delay = 0) => ({
  initial: { opacity: 0, x: 28 },
  whileInView: { opacity: 1, x: 0 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.55, ease: 'easeOut', delay },
});
const scaleIn = (delay = 0) => ({
  initial: { opacity: 0, scale: 0.96 },
  whileInView: { opacity: 1, scale: 1 },
  viewport: { once: true, amount: 0.25 },
  transition: { duration: 0.45, ease: 'easeOut', delay },
});

/* ===== LinkedIn Icon (inline, como tenías) ===== */
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

/* ===== Navbar (CTA corregido: icono tamaño texto y alineado) ===== */
const Navbar = () => {
  const links = [
    { href: '#home', label: 'Home' },
    { href: '#products', label: 'Nuestros Productos' },
    { href: '#about', label: 'Sobre Nosotros' },
  ];

  useEffect(() => {
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <nav className="container mx-auto px-8 py-6 flex items-center justify-between font-semibold text-[#030067]">
        <img src="/aquila-logo.png" alt="aquila" className="h-8 w-auto" />

        <ul className="hidden md:flex gap-10">
          {links.map((l) => (
            <li key={l.href}>
              <a href={l.href} className="hover:underline">{l.label}</a>
            </li>
          ))}
        </ul>

        <a
          href="https://signai.ar"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 bg-[#030067] text-white rounded-full px-6 py-2 text-sm font-medium hover:opacity-95 transition"
        >
          <span>Conocé </span>
          <img
            src="/signai-icon.png"
            alt="SignAI icon"
            className="h-6 md:h-7 object-contain align-middle"
          />
        </a>
      </nav>
    </header>
  );
};
function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[92vh] pt-28 flex flex-col items-center justify-center text-center bg-[linear-gradient(#f1f1f7,#b7b1d0)] text-[#030067] px-6"
    >
      <div className="container mx-auto max-w-5xl flex flex-col items-center">
        
        {/* Claim en dos líneas */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="font-extrabold leading-[0.95] tracking-tight"
        >
          <span className="block text-[clamp(2.5rem,6vw,5.5rem)]">Tecnologías que</span>
          <span className="block text-[clamp(2.5rem,6vw,5.5rem)]">derriban barreras.</span>
        </motion.h1>

        {/* LinkedIn */}
        <motion.a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: 'easeOut', delay: 0.3 }}
          className="inline-block mt-10"
        >
          <LinkedInIcon />
        </motion.a>

        {/* Flecha ↓ animada */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: [0, 8, 0] }}
          transition={{ delay: 0.5, duration: 1.4, repeat: Infinity }}
          className="text-5xl mt-6"
        >
          ↓
        </motion.div>
      </div>
    </section>
  );
}

/* ===== Productos (usa /signai-logo.png como pediste) ===== */
const Products = () => (
  <section id="products" className="min-h-screen flex items-center bg-[linear-gradient(#b7b1d0,#8c86ad)] px-6 py-24">
    <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
      <motion.div {...slideLeft(0)}>
        <h2 className="text-4xl md:text-6xl font-light text-white leading-tight">
          Brindamos autonomía
          <br />
          a <span className="font-bold">personas</span> que no la
          <br />
          tienen.
        </h2>
      </motion.div>

      <motion.div
        {...scaleIn(0.1)}
        className="bg-white text-[#030067] p-8 md:p-12 rounded-[28px] shadow-2xl"
      >
        <img src="/signai-colo.png" alt="SignAI Logo" className="h-12 mb-6 mx-auto md:mx-0" />
        <p className="text-lg md:text-xl font-medium leading-relaxed mb-4">
          Tu traductor de lengua de señas gratuito impulsado por inteligencia artificial.
        </p>
        <p className="text-lg md:text-xl font-medium leading-relaxed">
          Le damos voz a las personas sordas para que no dependan de un intérprete para comunicarse.
        </p>
      </motion.div>
    </div>
  </section>
);

/* ===== Planes a futuro ===== */
const FuturePlans = () => (
  <section className="bg-white px-6 py-24">
    <div className="container mx-auto">
      <motion.div
        {...slideUp(0)}
        className="bg-[#030067] text-white p-10 md:p-16 rounded-3xl shadow-2xl grid md:grid-cols-2 gap-12 items-center"
      >
        <div className="md:pr-10 md:border-r md:border-white/20">
          <p className="text-lg md:text-xl leading-relaxed">
            Hoy <span className="font-semibold">SignAI</span> funciona de forma asincrónica y en DGS por falta de banco de datos en LSA.
          </p>
        </div>
        <div>
          <h3 className="text-2xl font-semibold mb-6">Próximos pasos</h3>
          <ul className="space-y-4">
            {[
              'Funcionamiento en Lengua de Señas Argentina (LSA)',
              'Traducción en tiempo real',
              'Módulo educativo con metas personalizadas',
            ].map((t, i) => (
              <motion.li
                key={t}
                {...(i % 2 ? slideRight(i * 0.05) : slideLeft(i * 0.05))}
                className="text-lg md:text-xl"
              >
                {t}
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
    </div>
  </section>
);

/* ===== Educación ===== */
const Education = () => (
  <section className="bg-white px-6 pb-24">
    <div className="container mx-auto grid md:grid-cols-2 gap-12 items-center">
      <motion.div {...slideUp(0)} className="bg-[#030067] text-white p-8 md:p-12 rounded-3xl shadow-2xl">
        <p className="text-lg md:text-xl leading-relaxed mb-6">
          Desde Aquila y SignAI buscamos difundir las características de la Lengua de Señas Argentina.
        </p>
        <p className="text-lg md:text-xl leading-relaxed">
          Próximamente: sección de aprendizaje con metas personalizadas para que más personas puedan entender y ser entendidas en LSA.
        </p>
      </motion.div>

      <motion.div {...clipReveal(0.1)} className="text-center md:text-left text-[#030067]">
        <h2 className="text-4xl md:text-6xl font-light leading-tight">
          Enseñar también
          <br />
          genera <span className="font-bold">autonomía.</span>
        </h2>
      </motion.div>
    </div>
  </section>
);

/* ===== Equipo ===== */
const Team = () => {
  const members = [
    { name: 'Federico Díaz Németh', role: 'Desarrollador IA', imageUrl: '/team/defe.png' },
    { name: 'Borja Izurieta', role: 'Diseñador UX/UI', imageUrl: '/team/borje.png' },
    { name: 'Maximiliano Setton', role: 'Desarrollador IA', imageUrl: '/team/masi.png' },
    { name: 'Benjamín Piccagli', role: 'Back-End', imageUrl: '/team/benja.png' },
    { name: 'Tomás Grinstein', role: 'Front-End', imageUrl: '/team/toto.png' },
  ];

  return (
    <section id="about" className="bg-white px-6 py-24">
      <div className="container mx-auto">
        <motion.h2 {...slideLeft(0)} className="text-4xl md:text-6xl font-light mb-12 text-[#030067]">
          El equipo detrás de
          <br />
          <span className="font-bold">aquila</span>
        </motion.h2>

        <motion.div {...slideUp(0.05)} className="bg-[#030067] text-white p-10 md:p-12 rounded-3xl shadow-2xl">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-10 text-center">
            {members.map((m, idx) => (
              <motion.div
                key={m.name}
                {...scaleIn(idx * 0.05)}
                whileHover={{ y: -6 }}
                transition={{ type: 'spring', stiffness: 260, damping: 18 }}
                className="flex flex-col items-center"
              >
                <motion.img
                  src={m.imageUrl}
                  alt={m.name}
                  className="w-32 h-32 rounded-full object-cover mb-4 border-4 border-white/20"
                  animate={{ y: [0, -2, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                />
                <h3 className="font-semibold text-lg">{m.name}</h3>
                <p className="text-white/70">{m.role}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

/* ===== Footer ===== */
const Footer = () => (
  <footer className="bg-[#e6e7f3] text-[#030067] py-16 px-6">
    <div className="container mx-auto">
      <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-10 mb-8 text-center md:text-left">
        <img src="/aquila-logo.png" alt="Aquila Logo" className="h-10" />
        <div className="flex gap-16">
          <div>
            <h3 className="font-bold text-lg mb-4">Links</h3>
            <ul className="space-y-2">
              <li><a href="#home" className="hover:underline">Home</a></li>
              <li><a href="#products" className="hover:underline">Productos</a></li>
              <li><a href="#about" className="hover:underline">Nosotros</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-bold text-lg mb-4">Socials</h3>
            <ul className="space-y-2">
              <li><a href="https://linkedin.com" className="hover:underline">linkedin</a></li>
              <li><a href="https://instagram.com" className="hover:underline">instagram</a></li>
            </ul>
          </div>
        </div>
      </div>
      <hr className="border-t border-[#030067]/20 my-8" />
      <div className="text-center text-sm">
        <p>&copy; 2025 Aquila, Todos los derechos reservados</p>
      </div>
    </div>
  </footer>
);

/* ===== Page ===== */
export default function Page() {
  return (
    <div className="bg-white">
      <Navbar />
      <Hero />
      <Products />
      <FuturePlans />
      <Education />
      <Team />
      <Footer />
    </div>
  );
}
