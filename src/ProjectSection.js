import React, { useState } from "react";

const projects = [
  {
    id: 1,
    title: "Travel Explorer",
    description: "Discover amazing destinations worldwide.",
    details: "Find the best places to visit, plan your itinerary, and get travel tips.",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 2,
    title: "Recipe Finder",
    description: "Search and save your favorite recipes.",
    details: "Explore thousands of recipes, save your favorites, and create shopping lists.",
    image: "https://images.unsplash.com/photo-1626108861691-d826b7d75ac8?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cmVjaXBlJTIwZmluZGVyfGVufDB8fDB8fHww"
    // fallback in case direct unsplash link fails: https://unsplash.com/photos/a-close-up-of-a-sign-that-reads-cook-1TyOM-LePng
    // direct: https://unsplash.com/photos/a-close-up-of-a-sign-that-reads-cook-1TyOM-LePng
  },
  {
    id: 3,
    title: "Fitness Tracker",
    description: "Track workouts and reach your goals.",
    details: "Monitor your progress, set goals, and stay motivated with our fitness tracker.",
    image: "https://images.unsplash.com/photo-1557935728-e6d1eaabe558?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8Zml0bmVzcyUyMHRyYWNrZXJ8ZW58MHx8MHx8fDA%3D"
    // fallback: https://unsplash.com/photos/black-fitness-tracker-band-q8Emkm9ooig
    // direct: https://images.unsplash.com/photo-1519864600265-abb23847ef2c?auto=format&fit=crop&w=600&q=80
  },
  {
    id: 4,
    title: "Portfolio Site",
    description: "Showcase your skills and projects.",
    details: "Create a stunning portfolio to impress potential employers and clients.",
    image: "https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 5,
    title: "Music Player",
    description: "Stream your favorite tunes.",
    details: "Enjoy high-quality music streaming and personalized playlists.",
    image: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 6,
    title: "E-Commerce Store",
    description: "Shop the latest trends online.",
    details: "Browse products, read reviews, and shop securely from anywhere.",
    image: "https://images.unsplash.com/photo-1512436991641-6745cdb1723f?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 7,
    title: "Event Planner",
    description: "Organize and manage events easily.",
    details: "Plan, schedule, and coordinate events with powerful tools.",
    image: "https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 8,
    title: "Blog Platform",
    description: "Share your thoughts with the world.",
    details: "Write, edit, and publish blogs with a beautiful editor and analytics.",
    image: "https://images.unsplash.com/photo-1503676382389-4809596d5290?auto=format&fit=crop&w=600&q=80"
  },
  {
    id: 9,
    title: "Photo Gallery",
    description: "Showcase your best shots.",
    details: "Upload, organize, and share your photography portfolio.",
    image: "https://images.unsplash.com/photo-1576266394503-4999348b5447?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nnx8cGhvdG8lMjBnYWxsZXJ5fGVufDB8fDB8fHww"
  }
];

export default function ProjectSection() {
  const [selected, setSelected] = useState(null);
  const [hovered, setHovered] = useState(null);

  return (
    <div className="w-full min-h-screen bg-black flex flex-col items-center py-12">
      <h2 className="text-6xl font-extrabold text-gray-100 w-full text-right lg:mr-[250px] lg:mb-[100px] mb-10">Projects</h2>
      <div
        className="grid grid-cols-3 grid-rows-3 w-full max-w-6xl h-[900px] overflow-hidden"
        style={{ gap: 0 }}
      >
        {projects.map((project) => {
          const isSelected = selected === project.id;
          // Wire mesh border logic for 3x3 grid
          const col = (project.id - 1) % 3;
          const row = Math.floor((project.id - 1) / 3);
          let borders = "";
          if (col !== 2) borders += " lg:border-r lg:border-gray-700";
          if (row !== 2) borders += " lg:border-b lg:border-gray-700";
          const cardClass = [
            "relative flex flex-col items-center justify-between bg-black cursor-pointer transition-all duration-300",
            selected === null ? "hover:z-20" : isSelected ? "z-30 shadow-2xl" : "blur-sm pointer-events-none z-10 opacity-60",
            isSelected ? "col-span-3 row-span-2 scale-105" : "",
            borders
          ].join(" ");
          return (
            <div
              key={project.id}
              className={cardClass}
              style={{
                gridColumn: isSelected ? "1 / span 3" : undefined,
                gridRow: isSelected ? "2 / span 2" : undefined,
                minHeight: isSelected ? 500 : 300,
                maxHeight: isSelected ? 650 : 350,
                transition: "all 0.4s cubic-bezier(.36,1.01,.32,1)",
                margin: 0,
                transform:
                  isSelected
                    ? "scale(1.05)"
                    : hovered === project.id
                    ? "scale(1.01)"
                    : "scale(1)",
              }}
              onClick={() => setSelected(isSelected ? null : project.id)}
              onMouseEnter={() => setHovered(project.id)}
              onMouseLeave={() => setHovered(null)}
            >
              {/* Glass effect overlay on hover */}
              {hovered === project.id && !isSelected && (
                <div
                  className="absolute inset-0 pointer-events-none"
                  style={{
                    background: "rgba(255,255,255,0.05)",
                    backdropFilter: "blur(3px)",
                    WebkitBackdropFilter: "blur(3px)",
                    border: "1.5px solid rgba(255,255,255,0.15)",
                    boxShadow: "0 4px 32px 0 rgba(0,0,0,0.10)",
                    transition: "all 0.3s cubic-bezier(.36,1.01,.32,1)",
                    zIndex: 2,
                  }}
                />
              )}
              <img
                src={project.image}
                alt={project.title}
                className={`w-full object-cover  transition-all duration-300 ${isSelected ? "h-80" : "h-40"}`}
                style={{ minHeight: isSelected ? 220 : 140, maxHeight: isSelected ? 320 : 180 }}
              />
              <div className={`flex flex-col items-center justify-center p-4 w-full ${isSelected ? "h-auto" : "h-3/5"}`}>
                <h3 className="text-2xl font-bold text-gray-100 mb-2">{project.title}</h3>
                <p className="text-gray-300 text-center mb-2 text-lg">{project.description}</p>
                {isSelected && (
                  <div className="mt-4 text-gray-200 text-base bg-gray-900 bg-opacity-90  p-6 w-full animate-fade-in shadow-xl">
                    {project.details}
                    <button
                      className="mt-6 px-6 py-3 bg-gray-700 text-gray-50  hover:bg-gray-600 transition"
                      onClick={e => { e.stopPropagation(); setSelected(null); }}
                    >
                      Close
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
