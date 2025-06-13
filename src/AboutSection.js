import { useState } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';

const skills = [
  {
    name: 'UI/UX Design',
    image: 'https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1974&auto=format&fit=crop',
  },
  {
    name: 'Frontend Development',
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=2070&auto=format&fit=crop',
  },
  {
    name: 'Backend Engineering',
    image: 'https://images.unsplash.com/photo-1592609931095-54a2168ae893?q=80&w=2070&auto=format&fit=crop',
  },
  {
    name: 'Data Visualization',
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop',
  },
  {
    name: 'Cloud & DevOps',
    image: 'https://images.unsplash.com/photo-1544256718-3bcf237f3974?q=80&w=2071&auto=format&fit=crop',
  },
];

const AboutSection = () => {
  const [swiper, setSwiper] = useState(null);
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <section id="about" className="min-h-screen bg-gray-900 p-4 sm:p-6 md:p-10 flex items-center justify-center">
      <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center max-w-7xl mx-auto w-full">
        {/* Left Column: Text */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }} 
          animate={{ opacity: 1, x: 0 }} 
          transition={{ duration: 0.8 }}
          className="text-left w-full md:w-1/2"
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">About Me</h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-400">
            I am a full-stack developer with a passion for creating beautiful, functional, and user-centric digital experiences. I believe that great design is not just about aesthetics, but about creating intuitive and meaningful interactions. My expertise spans the full development lifecycle, from concept to deployment.
          </p>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 mt-2 sm:mt-4">
            Click on the cards to the right to explore some of my core skills. Each card represents a key area of my technical proficiency, showcasing my ability to deliver robust and elegant solutions.
          </p>
        </motion.div>

        {/* Right Column: Carousel */}
        <div className="w-full md:w-1/2">
          <Swiper
            onSwiper={setSwiper}
            effect={'coverflow'}
            grabCursor={true}
            centeredSlides={true}
            loop={true}
            slidesPerView={1}
            breakpoints={{
              640: { slidesPerView: 1 },
              768: { slidesPerView: 2 },
              1024: { slidesPerView: 3 }
            }}
            onSlideChange={(s) => setActiveIndex(s.realIndex)}
            coverflowEffect={{
              rotate: 0,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            }}
            modules={[EffectCoverflow]}
            className="w-full h-[260px] sm:h-[320px] md:h-[400px]"
          >
            {skills.map((skill, index) => (
              <SwiperSlide 
                key={index} 
                className="w-[200px] sm:w-[280px] md:w-[350px] h-[220px] sm:h-[280px] md:h-[400px]"
                onClick={() => swiper && swiper.slideToLoop(index)}
              >
                <motion.div 
                  className="w-full h-full relative"
                  animate={{ scale: activeIndex === index ? 1.1 : 0.9 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                  <img src={skill.image} alt={skill.name} className="w-full h-full object-cover rounded-lg" />
                  <div className="absolute inset-0 bg-black bg-opacity-40 flex items-end justify-start p-2 sm:p-4 rounded-lg">
                    <h3 className="text-white text-base sm:text-lg md:text-xl font-bold">{skill.name}</h3>
                  </div>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
