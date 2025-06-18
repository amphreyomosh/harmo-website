import { useState } from 'react';
import { motion } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/effect-coverflow';

const skills = [
  {
    name: 'Web Design',
    image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8d2ViJTIwZGVzaWdufGVufDB8fDB8fHww',
  },
  {
    name: 'Frontend Development',
    image: 'https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8ZnJvbnQlMjBlbmR8ZW58MHx8MHx8fDA%3D',
  },
  {
    name: 'Responsive Design',
    image: 'https://images.unsplash.com/photo-1587829741301-dc798b83add3?q=80&w=2070&auto=format&fit=crop',
  },
  {
    name: 'Content Creation',
    image: 'https://images.unsplash.com/photo-1581092334653-379d9de0f7e7?q=80&w=2070&auto=format&fit=crop',
  },
  {
    name: 'Teaching & Tutorials',
    image: 'https://images.unsplash.com/photo-1603576981372-7f6a08688da4?q=80&w=2070&auto=format&fit=crop',
  },
  {
    name: 'HTML & CSS',
    image: 'https://images.unsplash.com/photo-1580894908361-967195033a47?q=80&w=2070&auto=format&fit=crop',
  },
  {
    name: 'JavaScript',
    image: 'https://images.unsplash.com/photo-1629904853893-c2d6f6263ae1?q=80&w=2070&auto=format&fit=crop',
  },
  {
    name: 'Website Performance',
    image: 'https://images.unsplash.com/photo-1591696205602-2f950c417cb9?q=80&w=2070&auto=format&fit=crop',
  },
  {
    name: 'SEO Basics',
    image: 'https://images.unsplash.com/photo-1610484826967-7073b623b0d7?q=80&w=2070&auto=format&fit=crop',
  },
  {
    name: 'Version Control (Git)',
    image: 'https://images.unsplash.com/photo-1621784564114-6c112bc25f83?q=80&w=2070&auto=format&fit=crop',
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
          I’m a passionate web developer focused on creating beautiful, responsive, and user-friendly websites. Beyond building websites, I love sharing what I know to help others learn and grow in tech.          </p>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 mt-2 sm:mt-4">
          I actively contribute to the community by teaching web development and design through workshops and tutorials. I also run a YouTube channel where I create easy-to-follow content to guide beginners and aspiring developers step by step.          </p>
          <p className="text-base sm:text-lg md:text-xl text-gray-400 mt-2 sm:mt-4">
            Click on the cards to the right to explore some of my core skills. Each card represents a key area of my technical proficiency, showcasing my ability to deliver  solutions.
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
