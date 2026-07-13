
import React, { useState, useEffect } from "react";
import { Diamond, Timer, MousePointer2, Heart } from "lucide-react";

const WhyChooseUs = () => {
  const [active, setActive] = useState(0);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const features = [
    {
      title: "Financial Engineering",
      desc: "Design and optimize your loan decisions before committing.",
      icon: <Diamond className="w-5 h-5 text-white" />,
      bgColor: "var(--primary-color)",
      indent: "lg:ml-8", // Responsive indent
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Loan Simulation",
      desc: "Test loan scenarios and see the future impact instantly.",
      icon: <Timer className="w-5 h-5 text-white" />,
      bgColor: "var(--secondary-color)",
      indent: "lg:ml-20", // Responsive indent
      img: "https://images.unsplash.com/photo-1543286386-2e659306cd6c?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Interest Optimization",
      desc: "Discover smarter repayment strategies and reduce interest.",
      icon: <MousePointer2 className="w-5 h-5 text-white" />,
      bgColor: "var(--primary-color)",
      indent: "lg:ml-20", // Responsive indent
      img: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1000&auto=format&fit=crop"
    },
    {
      title: "Future Financial View",
      desc: "Visualize how loans affect your financial future.",
      icon: <Heart className="w-5 h-5 text-white" />,
      bgColor: "var(--secondary-color)",
      indent: "lg:ml-8", // Responsive indent
      img: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&q=80&w=1000"
    }
  ];

  return (
    <section
      className="min-h-screen flex items-center justify-center p-6 md:p-10 overflow-hidden"
      style={{
        background:
          "linear-gradient(to bottom, color-mix(in srgb, var(--surface-color) 14%, white), white)"
      }}
    >
      <div className="relative flex flex-col lg:flex-row items-center w-full max-w-6xl">

        {/* LEFT SECTION (CIRCLES) */}
        <div className="relative flex items-center justify-center flex-shrink-0 mb-12 lg:mb-0">
          {/* PURPLE BADGE */}
          <div
            className="z-20 w-48 h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 rounded-full flex items-center justify-center text-white text-center shadow-2xl border-[8px] md:border-[12px] border-white transition-transform duration-700"
            style={{ backgroundColor: "var(--primary-color)" }}
          >
            <h2 className="text-2xl md:text-4xl lg:text-5xl font-black tracking-tighter leading-[0.9]">
              WHY <br /> CHOOSE <br /> US
            </h2>
          </div>

          {/* BIG CIRCLE (IMAGE DISPLAY) */}
          <div
            className="z-10 -ml-16 md:-ml-24 lg:-ml-32 w-[280px] h-[280px] md:w-[400px] md:h-[400px] lg:w-[550px] lg:h-[550px] rounded-full flex items-center justify-center border-[10px] md:border-[15px] border-white shadow-2xl overflow-hidden bg-black transition-all duration-700"
          >
            <img
              key={active}
              src={features[active].img}
              className="w-full h-full object-cover opacity-70 animate-in fade-in zoom-in duration-700"
              alt="Feature preview"
            />
          </div>
        </div>

        {/* RIGHT SECTION (FEATURES) */}
        <div
          className={`flex flex-col justify-between gap-6 lg:gap-0 lg:h-[500px] lg:-ml-20 z-30 w-full py-4 transition-all duration-1000 ease-out ${
            animate ? "translate-y-0 opacity-100" : "translate-y-20 opacity-0"
          }`}
        >
          {features.map((item, index) => (
            <div
              key={index}
              onMouseEnter={() => setActive(index)}
              onClick={() => setActive(index)}
              className={`flex items-center transition-all duration-500 cursor-pointer ${item.indent} ${
                active === index ? "scale-105 lg:scale-110" : "opacity-70 hover:opacity-100"
              }`}
            >
              {/* ICON */}
              <div
                className={`flex-shrink-0 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center shadow-lg border-[4px] border-white transition-all duration-500 ${
                    active === index ? "rotate-[360deg] scale-110" : ""
                }`}
                style={{ backgroundColor: item.bgColor }}
              >
                {item.icon}
              </div>

              {/* CONNECTOR LINE (Hidden on very small screens if needed, but looks okay) */}
              <div className={`h-[2px] mx-3 md:mx-4 transition-all duration-500 ${
                  active === index ? "w-12 md:w-20 bg-indigo-500" : "w-6 md:w-10 bg-gray-300 opacity-40"
              }`}></div>

              {/* TEXT */}
              <div className="max-w-[200px] md:max-w-xs">
                <h3
                  className={`font-black text-lg md:text-2xl mb-0.5 tracking-tight transition-colors duration-300`}
                  style={{ color: active === index ? "var(--primary-color)" : "var(--muted-text)" }}
                >
                  {item.title}
                </h3>

                <p
                  className="text-xs md:text-sm font-semibold leading-snug"
                  style={{ color: active === index ? "var(--secondary-color)" : "var(--muted-text)" }}
                >
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default WhyChooseUs;
