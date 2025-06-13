import { motion, useInView, AnimatePresence } from 'framer-motion';
import { useRef, useState, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import AboutSection from './AboutSection';
import ProjectSection from './ProjectSection';
import { Points, PointMaterial } from '@react-three/drei';
import * as random from 'maath/random/dist/maath-random.esm';


// Reusable animated wrapper for sections
const AnimatedWrapper = ({ children }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const variants = { hidden: { opacity: 0, y: 50 }, visible: { opacity: 1, y: 0 } };
  return (
    <motion.div ref={ref} initial="hidden" animate={isInView ? "visible" : "hidden"} variants={variants} transition={{ duration: 0.8, ease: "easeOut" }}>
      {children}
    </motion.div>
  );
};

// Animated Hamburger Icon
const HamburgerIcon = ({ isOpen, setIsOpen }) => {
  // Bar widths: top = 100%, middle = 70%, bottom = 40%
  // On open: slide right (staggered)
  const barCommon = "block absolute h-1 bg-white rounded transition-all duration-300";
  const topVariants = {
    closed: { x: 0, width: '100%', right: 0, left: 'auto' },
    open: { x: 0, width: '100%', left: 0, right: 'auto' }
  };
  const middleVariants = {
    closed: { x: 0, width: '70%', right: 0, left: 'auto' },
    open: { x: 0, width: '70%', left: 0, right: 'auto' }
  };
  const bottomVariants = {
    closed: { x: 0, width: '40%', right: 0, left: 'auto' },
    open: { x: 0, width: '40%', left: 0, right: 'auto' }
  };

  return (
    <button onClick={() => setIsOpen(!isOpen)} className="z-50 w-10 h-10 relative focus:outline-none">
      <motion.span
        className={barCommon}
        style={{ top: '0.5rem' }}
        variants={topVariants}
        animate={isOpen ? 'open' : 'closed'}
        transition={{ type: 'spring', stiffness: 400, damping: 30 }}
      />
      <motion.span
        className={barCommon}
        style={{ top: '1.25rem' }}
        variants={middleVariants}
        animate={isOpen ? 'open' : 'closed'}
        transition={{ type: 'spring', stiffness: 400, damping: 30, delay: 0.05 }}
      />
      <motion.span
        className={barCommon}
        style={{ top: '2rem' }}
        variants={bottomVariants}
        animate={isOpen ? 'open' : 'closed'}
        transition={{ type: 'spring', stiffness: 400, damping: 30, delay: 0.10 }}
      />
    </button>
  );
};

// Side Menu Component
const SideMenu = ({ isOpen, setIsOpen }) => {
  const menuVariants = { open: { x: 0 }, closed: { x: "-100%" } };
  const linkVariants = { open: { opacity: 1, x: 0 }, closed: { opacity: 0, x: -20 } };
  const navLinks = ["Home", "About", "Projects", "Contact"];

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed top-0 left-0 h-full w-11/12 md:w-2/3 lg:w-1/3 bg-black bg-opacity-60 backdrop-blur-lg z-40 flex items-center justify-center"
          initial="closed" animate="open" exit="closed" variants={menuVariants} transition={{ type: "spring", stiffness: 260, damping: 30 }}
        >
          <nav>
            <motion.ul initial="closed" animate="open" variants={{ open: { transition: { staggerChildren: 0.1, delayChildren: 0.2 } } }}>
              {navLinks.map(link => (
                <motion.li key={link} variants={linkVariants} className="my-4 md:my-6">
                  <a href={`#${link.toLowerCase()}`} onClick={() => setIsOpen(false)} className="text-4xl md:text-6xl lg:text-8xl font-bold text-white hover:text-gray-400 transition-colors">
                    {link}
                  </a>
                </motion.li>
              ))}
            </motion.ul>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

// 3D Particle System
const Particles = (props) => {
  const ref = useRef();
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.2 }));
  
  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 10;
    ref.current.rotation.y -= delta / 15;
    // Mouse interaction
    ref.current.position.x = state.mouse.x * 0.2;
    ref.current.position.y = state.mouse.y * 0.2;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false} {...props}>
        <PointMaterial
          transparent
          color="#ffffff"
          size={0.005}
          sizeAttenuation={true}
          depthWrite={false}
        />
      </Points>
    </group>
  );
};

const ParticleCanvas = () => {
  return (
    <div className="absolute inset-0 z-0">
      <Canvas camera={{ position: [0, 0, 1] }}>
        <Suspense fallback={null}>
          <Particles />
        </Suspense>
      </Canvas>
    </div>
  );
};

function App() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="bg-black text-white font-sans antialiased">
      <SideMenu isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} />
      
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 p-4 md:p-6 flex justify-between items-center">
        <div className="text-lg md:text-2xl font-bold tracking-wider cursor-pointer z-50">
          YOUR NAME
        </div>
        <div className="md:hidden"><HamburgerIcon isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} /></div>
        <div className="hidden md:block"><HamburgerIcon isOpen={isMenuOpen} setIsOpen={setIsMenuOpen} /></div>
      </header>

      {/* Hero Section */}
      <main id="home" className="relative h-screen flex flex-col items-end justify-end text-right p-10 md:p-20 overflow-hidden">
        <video autoPlay loop muted className="absolute top-0 left-0 w-full h-full object-cover z-0" src="https://videos.pexels.com/video-files/3129576/3129576-hd_1920_1080_25fps.mp4"></video>
        <div className="relative z-10 bg-black bg-opacity-50 p-10 rounded-lg">
            <h1 className="text-6xl md:text-8xl font-extrabold leading-tight mb-4">Crafting Digital Experiences</h1>
            <p className="text-lg md:text-xl text-gray-300 max-w-2xl ml-auto">A passionate developer creating seamless and beautiful web applications. Inspired by precision engineering and timeless design.</p>
        </div>
      </main>

      {/* About Section */}
      <AboutSection />

      {/* Projects Section */}
      <AnimatedWrapper>
        <section id="projects" className="min-h-screen p-10 flex flex-col items-center justify-center text-center">
          <ProjectSection />
        </section>
      </AnimatedWrapper>

      {/* Contact Section */}
      <AnimatedWrapper>
        <section id="contact" className="relative min-h-screen bg-gray-900 p-10 flex flex-col items-center justify-center text-center overflow-hidden">
          <ParticleCanvas />
          <div className="relative z-10">
            <h2 className="text-5xl font-bold mb-8">Get In Touch</h2>
            <p className="text-xl text-gray-400 mb-8">I'm currently available for freelance work. Drop me a line!</p>
            <a href="mailto:your.email@example.com" className="bg-white text-black font-bold py-3 px-8 rounded-lg hover:bg-gray-300 transition-colors">Email Me</a>
          </div>
        </section>
      </AnimatedWrapper>

      {/* Footer */}
      <footer className="p-6 text-center text-gray-500">
        <p>&copy; {new Date().getFullYear()} YOUR NAME. All Rights Reserved.</p>
        <div className="mt-4">
          <a href="#!" className="mx-2 hover:text-white">LinkedIn</a>
          <a href="#!" className="mx-2 hover:text-white">GitHub</a>
          <a href="#!" className="mx-2 hover:text-white">Twitter</a>
        </div>
      </footer>
    </div>
  );
}

export default App;
