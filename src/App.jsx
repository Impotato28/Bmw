import Lenis from "lenis";
import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";



export default function BMWCinematicWebsite() {

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.5,
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  const [loading, setLoading] = useState(true);
  const [showNavbar, setShowNavbar] = useState(false);
  const [activeBg, setActiveBg] = useState("from-gray-900/80 to-black");
  const [trigger, setTrigger] = useState(0);

    useEffect(() => {
    const timer = setTimeout(() => {
    setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
    }, []);

  const heroRef = useRef(null);

const { scrollYProgress } = useScroll({
  target: heroRef,
  offset: ["start start", "end start"],
});

useEffect(() => {
  const handleScroll = () => {
    if (window.scrollY > 500) {
      setShowNavbar(true);
    } else {
      setShowNavbar(false);
    }
  };

  window.addEventListener("scroll", handleScroll);

  return () => {
    window.removeEventListener("scroll", handleScroll);
  };
}, []);

  const textY = useTransform(
  scrollYProgress,
  [0, 1],
  [0, -250]
);

const opacity = useTransform(
  scrollYProgress,
  [0, 0.8],
  [1, 0]
);

const videoScale = useTransform(
  scrollYProgress,
  [0, 1],
  [1, 2.4]
);

const videoY = useTransform(
  scrollYProgress,
  [0, 1],
  [0, 80]
);
  
    if (loading) {
  return (
    <div className="
    fixed inset-0
    bg-black
    flex flex-col
    items-center
    justify-center
    z-999
    overflow-hidden
    ">

      <img
        src="/bmw-logo.png"
        alt="BMW"
        className="
        w-24 h-24
        object-contain
        animate-pulse
        "
      />

      <motion.h1
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 1.5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
        className="
        mt-8
        text-white
        text-sm
        tracking-[0.5em]
        uppercase
        "
      >
        Initializing Experience
      </motion.h1>

      <div className="
      mt-10
      w-64
      h-2px
      bg-white/10
      overflow-hidden
      rounded-full
      ">

        <motion.div
          initial={{ width: 0 }}
          animate={{ width: "100%" }}
          transition={{
            duration: 2.5,
            ease: "easeInOut",
          }}
          className="h-full bg-white"
        />

      </div>

    </div>
  );
}

    return (
      
    <div className="bg-black text-white min-h-screen overflow-x-hidden font-sans">
      {/* NAVBAR */}
      <motion.nav
    initial={{
    opacity: 0,
    y: -100,
  }}
  animate={{
    opacity: showNavbar ? 1 : 0,
    y: showNavbar ? 0 : -100,
  }}
  transition={{
    duration: 0.8,
    ease: "easeOut",
  }}
  className="
  fixed top-0 left-0
  w-full z-50
  backdrop-blur-md
  bg-black/60
  border-b border-white/10
  shadow-[0_0_30px_rgba(0,0,0,0.4)]
  "
>
  <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

    <div className="flex items-center gap-3">
      <img
        src="/bmw-logo.png"
        alt=""
        className=" w-10 h-10 object-contain hover:rotate-[360deg] transition duration-700"/>

      <h1 className="text-2xl font-bold tracking-[0.3em]">
        BMW
      </h1>
    </div>

    <div className="
        hidden md:flex
        gap-8
        text-sm
        uppercase
        tracking-widest
        text-gray-300
        ">
      <a href="#models"  onClick={() => setTrigger(prev => prev + 1)} className="hover:text-white transition">
        Models
      </a>

      <a href="#performance"  onClick={() => setTrigger(prev => prev + 1)} className="hover:text-white transition">
        Performance
      </a>

      <a href="#engine" className="hover:text-white transition">
        Engine
      </a>

      <a href="#build" className="hover:text-white transition">
        Build
      </a>
    </div>

  </div>
</motion.nav>

      {/* HERO SECTION */}
      <section ref={heroRef} className="relative h-[220vh] bg-black">
        <div className="sticky top-0 h-screen overflow-hidden">

          {/* VIDEO */}
          <motion.video
            style={{
              scale:videoScale,
            }}
            autoPlay
            muted
            loop
            playsInline
            className="absolute inset-0 w-full h-full object-cover scale-105 brightness-75 contrast-110 saturate-125 will-change-transform">
            <source src="/bmw1-video.mp4" type="video/mp4" />
          </motion.video>

          {/* DARK OVERLAY */}
          <div className="absolute inset-0 bg-black/35" />

          

          {/* HERO CONTENT */}

<div className="sticky top-0 h-screen flex items-center z-20 px-8 md:px-24">

  <motion.div
    initial={{
      opacity: 0,
      y: 60,
    }}

    animate={{
      opacity: 1,
      y: 0,
    }}

    transition={{
      duration: 1.2,
      ease: [0.22, 1, 0.36, 1],
    }}

    style={{
      y: textY,
    }}

    className="max-w-[800px]"
  >

    {/* SMALL TAG */}
    <div className="
    inline-flex
    items-center
    gap-3
    px-5 py-2
    rounded-full
    border border-white/10
    bg-white/5
    backdrop-blur-md
    mb-8
    ">

      <div className="w-2 h-2 rounded-full bg-blue-500" />

      <p className="
      text-xs
      uppercase
      tracking-[0.35em]
      text-gray-300
      ">
        BMW M Performance
      </p>
    </div>

    {/* MAIN TITLE */}
    <motion.h1
  initial={{
    opacity: 0,
    y: 60,
    filter: "blur(12px)",
  }}

  animate={{
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
  }}

  transition={{
    duration: 1.2,
    ease: [0.22, 1, 0.36, 1],
  }}

  className="
  text-[4.5rem]
  md:text-[6rem]
  leading-[0.9]
  font-black
  uppercase
  tracking-[-0.05em]
  text-white
  "
>
  Built
  <br />

  <span className="text-white/90">
    Quietly
  </span>

  <br />

  <span className="
  bg-gradient-to-r
  from-white
  via-blue-200
  to-white
  bg-clip-text
  text-transparent
  ">
    Unhinged.
  </span>
</motion.h1>

    {/* DESCRIPTION */}
    <p className="
    mt-8
    text-lg
    leading-relaxed
    text-gray-300
    max-w-xl
    ">
      Twin-turbo performance. Precision engineered for
      drivers obsessed with speed, control, and presence.

      <span className="text-white font-semibold">
        {" "}Luxury meets adrenaline.
      </span>
    </p>

    {/* BUTTONS */}
    <div className="mt-12 flex gap-5 flex-wrap">

      {/* PRIMARY */}
      <button className="
      group
      relative
      overflow-hidden
      px-8 py-4
      rounded-full
      bg-white/95 backdrop-blur-md
      shadow-[0_0_40px_rgba(255,255,255,0.15)]
      text-black
      font-semibold
      transition-all
      duration-500
      hover:scale-105
      ">

        <span className="relative z-10">
          Explore Models
        </span>

        <div className="
        absolute inset-0
        bg-blue-400
        translate-y-full
        group-hover:translate-y-0
        transition-all
        duration-500
        " />
      </button>

      {/* SECONDARY */}
      <button className="
      px-8 py-4
      rounded-full
      border border-white/10
      bg-white/5
      backdrop-blur-md
      text-white
      font-medium
      hover:bg-white/10
      hover:scale-105
      transition-all
      duration-500
      ">
        Watch Cinematic
      </button>

    </div>
  </motion.div>
</div>
          

          {/* BOTTOM FADE */}
          <div className="absolute bottom-0 left-0 w-full h-40 bg-linear-to-t from-black to-transparent" />
        </div>
      </section>

      {/* FEATURED MODELS */}
      <section
  id="models"
  className="relative py-28 px-6 overflow-hidden bg-black"
>
  
  <div
    className="
      absolute inset-0
      transition-all
      duration-1000
      ease-in-out
      pointer-events-none
    "
    style={{
      background:
        activeBg === "from-green-900/80 to-black"
          ? "radial-gradient(circle at center, rgba(34,197,94,0.25) 0%, rgba(0,0,0,0) 60%)"
          : activeBg === "from-gray-900/80 to-black"
          ? "radial-gradient(circle at center, rgba(156,163,175,0.22) 0%, rgba(0,0,0,0) 60%)"
          : activeBg === "from-blue-900/80 to-black"
          ? "radial-gradient(circle at center, rgba(59,130,246,0.25) 0%, rgba(0,0,0,0) 60%)"
          : "radial-gradient(circle at center, rgba(156,163,175,0.22) 0%, rgba(0,0,0,0) 60%)",
        }}
  />

  <div className="relative z-20 max-w-7xl mx-auto">
      

          <div className="
            absolute inset-0
            bg-gradient-to-b
            from-black/10
            via-black/30
            to-black/70" />

        </div>
        <div className="relative z-20 max-w-7xl mx-auto">
            <motion.div
              key={trigger}
            className="mb-16"

             initial={{
          opacity: 0,
          y: 60,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.3,
          duration: 1,
        }}
          >
            <p className="uppercase tracking-[0.3em] text-white text-4xl font-bold mb-8 mx-auto text-center">
              Featured Models
            </p>
          </motion.div>

          <motion.div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {cars.map((car, index) => (
                <motion.div
                key={car.name}
                initial={{
                  opacity: 0,
                  y: 60,
                }}

                whileInView={{
                  opacity: 1,
                  y: 0,
                }}

                transition={{
                  duration: 0.8,
                  delay: index * 0.3,
                }}

                viewport={{
                  once: true,
                  amount: 0.2,
                }}
                onMouseEnter={() => setActiveBg(car.bgColor)}
                onMouseLeave={() => setActiveBg(cars[0].image)}
                className={`
                  group
                  relative
                  h-[380px]
                  overflow-hidden
                  rounded-[35px]
                  cursor-pointer
                  transition-all
                  duration-700
                  hover:-translate-y-4
                  ${car.shadow}`}
                >

                  {/* IMAGE */}
                  <img
                    src={car.image}
                    alt={car.name}
                    className="
                    absolute inset-0
                    brightness-60 saturate-100
                    w-full h-full
                    object-cover
                    transition-all
                    duration-700
                    group-hover:scale-110
                    group-hover:rotate-1"
                    
                  />

                  {/* DARK OVERLAY */}
                  <div
                    className="
                    absolute inset-0
                    bg-gradient-to-b
                    from-black/20
                    via-black/40
                    to-black/30"
                  />

                  {/* BLUE GLOW */}
                  <div
                  className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition duration-700 blur-3xl ${car.glow}`}
                  />

                  {/* CONTENT */}
                  <div
                    className="
                    relative z-20
                    h-full
                    flex flex-col
                    justify-end
                    p-8
                    "
                  >

                    {/* SPEED */}
                    <p
                      className="
                      text-white
                      uppercase
                      tracking-[0.3em]
                      text-sm
                      font-medium
                      mb-4
                      opacity-0
                      translate-y-8
                      transition-all
                      duration-500
                      group-hover:opacity-100
                      group-hover:translate-y-0
                      "
                    >
                      {car.speed}
                    </p>

                    {/* NAME */}
                    <h2
                      className="
                      text-4xl
                      md:text-5xl
                      font-black
                      uppercase
                      leading-none
                      "
                    >
                      {car.name}
                    </h2>

                    {/* DESCRIPTION */}
                    <p
                      className="
                      mt-5
                      text-gray-300
                      leading-relaxed
                      max-w-sm
                      opacity-0
                      translate-y-10
                      transition-all
                      duration-700
                      group-hover:opacity-100
                      group-hover:translate-y-0
                      "
                    >
                      {car.description}
                    </p>

                    {/* STATS */}
                    <div
                      className="
                      flex gap-10
                      mt-8
                      opacity-0
                      translate-y-10
                      transition-all
                      duration-700
                      delay-100
                      group-hover:opacity-100
                      group-hover:translate-y-0
                      "
                    >

                      <div>
                        <p className="text-white text-sm">
                          Horsepower
                        </p>

                        <h3 className="text-white font-bold text-lg">
                          {car.hp}
                        </h3>
                      </div>

                      <div>
                        <p className="text-white text-sm">
                          0-100
                        </p>

                        <h3 className="text-white font-bold text-lg">
                          {car.acceleration}
                        </h3>
                      </div>

                    </div>

                    {/* BUTTON */}
                    <button
                      className="
                      mt-8
                      w-fit
                      px-6 py-3
                      rounded-full
                      bg-white
                      text-black
                      font-semibold
                      opacity-0
                      translate-y-10
                      transition-all
                      duration-700
                      delay-200
                      group-hover:opacity-100
                      group-hover:translate-y-0
                      hover:scale-105
                      "
                    >
                      Explore
                    </button>

                  </div>
                </motion.div>
              ))}
          </motion.div>
        </div>
      </section>

      {/* PERFORMANCE SECTION */}
      
<motion.section
  id="performance"
  className="
  relative
  py-32
  px-6
  overflow-hidden
  bg-gradient-to-b
  from-black
  to-[#0b0b0b]
  "

  transition={{
    duration: 1.2,
    ease: [0.22, 1, 0.36, 1],
  }}

>

  {/* BACKGROUND GLOW */}
  <div className="
  absolute inset-0
  bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.15),transparent_70%)]
  " />

  <div className="relative z-10">

    {/* TITLE */}
    <motion.div
  key={trigger}

  initial={{
          opacity: 0,
          y: 60,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.3,
          duration: 1,
        }}

  className="text-center mb-20"

      className="text-center mb-20">

      <h2 className="
      text-3xl md:text-6xl
      font-black
      uppercase
      leading-tight
      mt-20
      ">
        performance
        <br />
        For Speed
      </h2>
    </motion.div>

    {/* SLIDER */}
<div className="relative overflow-hidden w-full py-1">

  {/* LEFT BLUR EDGE */}
  <div className="
  absolute left-0 top-0 z-20
  w-40 h-full
  bg-gradient-to-r
  from-black to-transparent
  pointer-events-none
  " />

  {/* RIGHT BLUR EDGE */}
  <div className="
  absolute right-0 top-0 z-20
  w-40 h-full
  bg-gradient-to-l
  from-black to-transparent
  pointer-events-none
  " />

  <motion.div

  viewport={{
    once: true,
    amount: 0.2,
  }}

  transition={{
    duration: 1.2,
    delay: 0.4,
    ease: "easeOut",
  }}

  animate={{
    x: ["0%", "-50%"],
  }}
    transition={{
      duration: 22,
      repeat: Infinity,
      ease: "linear",
    }}
    className="flex gap-8 w-max"
  >

    {[...stats, ...stats].map((stat, index) => (
      <motion.div
        key={index}

        whileHover={{
          y: -15,
          scale: 1.04,
        }}

        transition={{
          type: "spring",
          stiffness: 200,
          damping: 15,
        }}

        className="
        group
        relative
        min-w-[320px]
        h-[240px]
        overflow-hidden
        rounded-[32px]
        border border-white/10
        bg-white/5
        backdrop-blur-xl
        p-10
        flex flex-col
        justify-between
        transition-all
        duration-500
        hover:border-blue-400/40
        "
      >

        {/* PARALLAX GLOW */}
        <div className="
        absolute inset-0
        opacity-0
        group-hover:opacity-100
        transition-all
        duration-700
        bg-blue-500/10
        blur-3xl
        " />

        {/* NEON LIGHT */}
        <div className="
        absolute -inset-[1px]
        rounded-[32px]
        opacity-0
        group-hover:opacity-100
        transition-all
        duration-500
        bg-gradient-to-r
        from-blue-500/40
        via-cyan-400/30
        to-blue-500/40
        blur-xl
        " />

        {/* ACTIVE CARD SHINE */}
        <div className="
        absolute top-0 left-[-100%]
        w-full h-full
        bg-gradient-to-r
        from-transparent
        via-white/10
        to-transparent
        skew-x-12
        group-hover:left-[100%]
        transition-all
        duration-1000
        " />

        {/* SPEEDOMETER */}
        <motion.div
          animate={{
            rotate: [0, 8, -8, 0],
          }}
          transition={{
            duration: 4,
            repeat: Infinity,
            ease: "easeInOut",
          }}

          className="
          absolute
          -top-10
          -right-10
          w-40 h-40
          rounded-full
          border border-white/10
          "
        />

        {/* CONTENT */}
        <div className="relative z-10">

          {/* VALUE */}
          <motion.h3
            whileHover={{
              scale: 1.08,
            }}

            className="
            text-6xl
            font-black
            text-white
            leading-none
            tracking-tight
            "
          >
            {stat.value}
          </motion.h3>

          {/* MINI BAR */}
          <div className="
          mt-5
          h-[2px]
          w-20
          bg-gradient-to-r
          from-blue-500
          to-transparent
          group-hover:w-32
          transition-all
          duration-500
          " />
        </div>

        {/* LABEL */}
        <p className="
        relative z-10
        uppercase
        tracking-[0.35em]
        text-sm
        text-gray-400
        group-hover:text-white
        transition-all
        duration-300
        ">
          {stat.label}
        </p>

      </motion.div>
    ))}

  </motion.div>
</div>
  </div>
</motion.section>

      {/* ENGINE SECTION */}
     <motion.section
  id="engine"
  className="
  relative
  min-h-screen
  overflow-hidden
  bg-black
  px-6
  md:px-16
  py-32
  "
  initial={{
    opacity: 0,
    y: 100,
  }}
  whileInView={{
    opacity: 1,
    y: 0,
  }}
  transition={{
    duration: 1.2,
    ease: "easeOut",
  }}
  viewport={{
    once: true,
    amount: 0.2,
  }}
>

  {/* BACKGROUND LIGHTS */}
  <div className="
  absolute
  top-[-200px]
  left-[-100px]
  w-[600px]
  h-[600px]
  bg-blue-500/20
  blur-[180px]
  rounded-full
  " />

  <div className="
  absolute
  bottom-[-200px]
  right-[-100px]
  w-[500px]
  h-[500px]
  bg-white/10
  blur-[180px]
  rounded-full
  " />

  {/* GRID */}
  <div className="
  relative
  z-10
  grid
  lg:grid-cols-2
  gap-16
  items-center
  ">

    {/* IMAGE SIDE */}
    <motion.div
      initial={{
        opacity: 0,
        x: -120,
        scale: 0.9,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
        scale: 1,
      }}
      transition={{
        duration: 1,
        ease: "easeOut",
      }}
      viewport={{
        once: true,
      }}
      className="relative group"
    >

      {/* OUTER GLOW */}
      <div className="
      absolute
      -inset-6
      bg-gradient-to-r
      from-blue-500/20
      via-cyan-400/10
      to-white/10
      blur-3xl
      opacity-70
      group-hover:opacity-100
      transition-all
      duration-700
      rounded-[50px]
      " />

      {/* IMAGE CONTAINER */}
      <div className="
      relative
      overflow-hidden
      rounded-[40px]
      border
      border-white/10
      bg-white/5
      backdrop-blur-xl
      ">

        {/* IMAGE */}
        <motion.img
          whileHover={{
            scale: 1.06,
          }}
          transition={{
            duration: 0.7,
          }}
          src="/engine.jpg"
          alt="BMW Engine"
          className="
          w-full
          h-[650px]
          object-cover
          "
        />

        {/* DARK FADE */}
        <div className="
        absolute inset-0
        bg-gradient-to-t
        from-black/80
        via-transparent
        to-black/30
        " />

        {/* LIGHT SWEEP */}
        <div className="
        absolute
        top-0
        left-[-120%]
        w-full
        h-full
        bg-gradient-to-r
        from-transparent
        via-white/20
        to-transparent
        skew-x-12
        group-hover:left-[120%]
        transition-all
        duration-[1800ms]
        " />

        {/* HORSEPOWER CARD */}
        <motion.div
          initial={{
            opacity: 0,
            y: 50,
          }}
          whileInView={{
            opacity: 1,
            y: 0,
          }}
          transition={{
            delay: 0.6,
            duration: 0.8,
          }}
          className="
          absolute
          bottom-6
          left-6
          px-6
          py-5
          rounded-[30px]
          border
          border-white/10
          bg-black/40
          backdrop-blur-2xl
          "
        >

          <p className="
          uppercase
          tracking-[0.3em]
          text-gray-400
          text-xs
          mb-2
          ">
            Engine Output
          </p>

          <h3 className="
          text-5xl
          font-black
          leading-none
          ">
            617 HP
          </h3>

        </motion.div>

      </div>
    </motion.div>

    {/* CONTENT SIDE */}
    <motion.div
      initial={{
        opacity: 0,
        x: 120,
      }}
      whileInView={{
        opacity: 1,
        x: 0,
      }}
      transition={{
        duration: 1,
        ease: "easeOut",
      }}
      viewport={{
        once: true,
      }}
    >

      {/* MINI TITLE */}
      <motion.p
        initial={{
          opacity: 0,
          y: 40,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.2,
          duration: 0.8,
        }}
        className="
        uppercase
        tracking-[0.5em]
        text-blue-400
        text-sm
        mb-6
        "
      >
        BMW M ENGINE
      </motion.p>

      {/* MAIN TITLE */}
      <motion.h2
        initial={{
          opacity: 0,
          y: 60,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.3,
          duration: 1,
        }}
        className="
        text-5xl
        md:text-7xl
        font-black
        uppercase
        leading-[0.9]
        "
      >
        Twin Turbo
        <br />
        V8 Beast
      </motion.h2>

      {/* DESCRIPTION */}
      <motion.p
        initial={{
          opacity: 0,
          y: 50,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.5,
          duration: 0.9,
        }}
        className="
        mt-10
        text-gray-400
        text-lg
        leading-relaxed
        max-w-xl
        "
      >
        Precision-engineered twin-turbo technology delivering brutal
        acceleration, razor-sharp throttle response, and a cinematic
        exhaust note designed for pure adrenaline.
      </motion.p>

      {/* SPECS */}
      <motion.div
        initial={{
          opacity: 0,
          y: 50,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.7,
          duration: 1,
        }}
        className="
        grid
        grid-cols-2
        gap-6
        mt-14
        "
      >

        {[
          {
            value: "3.1s",
            label: "0-100 KM/H",
          },
          {
            value: "750Nm",
            label: "TORQUE",
          },
          {
            value: "305",
            label: "TOP SPEED",
          },
          {
            value: "AWD",
            label: "M xDRIVE",
          },
        ].map((spec, index) => (
          <motion.div
            key={index}
            whileHover={{
              y: -8,
              scale: 1.03,
            }}
            className="
            group
            relative
            overflow-hidden
            rounded-[28px]
            border
            border-white/10
            bg-white/[0.04]
            backdrop-blur-xl
            p-7
            "
          >

            {/* CARD GLOW */}
            <div className="
            absolute inset-0
            opacity-0
            group-hover:opacity-100
            transition-all
            duration-500
            bg-blue-500/10
            blur-3xl
            " />

            <h3 className="
            relative z-10
            text-4xl
            font-black
            ">
              {spec.value}
            </h3>

            <p className="
            relative z-10
            mt-3
            text-gray-400
            tracking-[0.25em]
            text-xs
            uppercase
            ">
              {spec.label}
            </p>

          </motion.div>
        ))}

      </motion.div>

      {/* BUTTON */}
      <motion.button
        initial={{
          opacity: 0,
          y: 40,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.3,
          duration: 0.4,
        }}
        whileHover={{
          scale: 1.03,
        }}
        className="
        mt-14
        px-10
        py-5
        rounded-full
        bg-white
        text-black
        font-bold
        text-lg
        shadow-[0_0_40px_rgba(255,255,255,0.2)]
        "
      >
        Explore Engine
      </motion.button>

    </motion.div>

  </div>
</motion.section>

      {/* BUILD SECTION */}
      {/* BUILD SECTION */}
<motion.section
  id="build"
  className="
  relative
  min-h-screen
  overflow-hidden
  bg-black
  px-6
  py-32
  "
>

  {/* BACKGROUND */}
  <div className="
  absolute inset-0
  bg-[radial-gradient(circle_at_center,rgba(37,99,235,0.18),transparent_65%)]
  " />

  {/* GRID */}
  <div className="
  absolute inset-0
  opacity-[0.04]
  bg-[linear-gradient(rgba(255,255,255,0.2)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.2)_1px,transparent_1px)]
  bg-[size:80px_80px]
  " />

  <div className="relative z-10 max-w-7xl mx-auto">

    {/* TITLE */}
    <motion.div
      key={trigger}
      initial={{
          opacity: 0,
          y: 60,
        }}
        whileInView={{
          opacity: 1,
          y: 0,
        }}
        transition={{
          delay: 0.3,
          duration: 1,
        }}

      className="text-center mb-24"
    >

      <p className="
      uppercase
      tracking-[0.5em]
      text-blue-400
      text-sm
      mb-6
      ">
        Configure Your Beast
      </p>

      <h2 className="
      text-5xl
      md:text-8xl
      font-black
      uppercase
      leading-none
      text-white
      ">
        Build
        <br />
        Your BMW
      </h2>

    </motion.div>

    {/* MAIN BUILD CARD */}
    <div className="
    grid
    lg:grid-cols-2
    gap-14
    items-center
    ">

      {/* LEFT SIDE */}
      <motion.div

        initial={{
          opacity: 0,
          x: -100,
          scale: 0.9,
        }}

        whileInView={{
          opacity: 1,
          x: 0,
          scale: 1,
        }}

        transition={{
          duration: 1,
        }}

        viewport={{
          once: true,
        }}

        className="
        relative
        group
        "
      >

        {/* GLOW */}
        <div className="
        absolute
        -inset-10
        bg-blue-500/20
        blur-[120px]
        opacity-60
        group-hover:opacity-100
        transition-all
        duration-700
        " />

        {/* IMAGE CARD */}
        <motion.div

          whileHover={{
            scale: 1.02,
            rotateX: 4,
            rotateY: -4,
          }}

          transition={{
            type: "spring",
            stiffness: 150,
            damping: 15,
          }}

          className="
          relative
          overflow-hidden
          rounded-[40px]
          border
          border-white/10
          bg-white/5
          backdrop-blur-xl
          "
        >

          {/* IMAGE */}
          <img
            src="https://imgs.search.brave.com/cL6ISJSRVy5_S0l6B9HVcp_sORlPbH4ZoeA-PLNEdq4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9pLnBp/bmltZy5jb20vb3Jp/Z2luYWxzL2M2Lzgw/LzdlL2M2ODA3ZWYy/YWViM2NlOWY4ZjZm/OGMyOTg3YjUwYmYw/LmpwZw"
            alt="BMW Build"
            className="
            w-full
            h-[620px]
            object-cover
            transition-all
            duration-700
            group-hover:scale-105
            "
          />

          {/* OVERLAY */}
          <div className="
          absolute inset-0
          bg-gradient-to-t
          from-black
          via-black/20
          to-transparent
          " />

          {/* FLOATING TAG */}
          <motion.div

            animate={{
              y: [0, -10, 0],
            }}

            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeInOut",
            }}

            className="
            absolute
            top-8
            left-8
            px-6
            py-3
            rounded-full
            border
            border-white/10
            bg-black/40
            backdrop-blur-xl
            text-white
            uppercase
            tracking-[0.3em]
            text-xs
            "
          >
            M Performance
          </motion.div>

          {/* BOTTOM CONTENT */}
          <div className="
          absolute
          bottom-0
          p-10
          z-20
          ">

            <h3 className="
            text-5xl
            font-black
            uppercase
            text-white
            mb-4
            ">
              BMW M4
            </h3>

            <p className="
            text-gray-300
            max-w-lg
            leading-relaxed
            ">
              Precision engineered with aggressive aerodynamics,
              adaptive suspension, and futuristic cockpit luxury.
            </p>

          </div>

        </motion.div>

      </motion.div>

      {/* RIGHT SIDE */}
      <motion.div

        initial={{
          opacity: 0,
          x: 100,
        }}

        whileInView={{
          opacity: 1,
          x: 0,
        }}

        transition={{
          duration: 1,
          delay: 0.2,
        }}

        viewport={{
          once: true,
        }}

        className="space-y-8"
      >

        {/* OPTION CARDS */}
        {[
          {
            title: "Exterior",
            desc: "Frozen Black Metallic",
          },
          {
            title: "Interior",
            desc: "Carbon Fiber Luxury Trim",
          },
          {
            title: "Wheels",
            desc: "20” M Performance Rims",
          },
          {
            title: "Engine",
            desc: "Twin Turbo Inline-6",
          },
        ].map((item, index) => (

          <motion.div
            key={index}

            initial={{
              opacity: 0,
              y: 60,
            }}

            whileInView={{
              opacity: 1,
              y: 0,
            }}

            transition={{
              duration: 0.8,
              delay: index * 0.15,
            }}

            viewport={{
              once: true,
            }}

            whileHover={{
              scale: 1.03,
              x: 10,
            }}

            className="
            group
            relative
            overflow-hidden
            rounded-[30px]
            border
            border-white/10
            bg-white/[0.04]
            backdrop-blur-xl
            p-8
            cursor-pointer
            "
          >

            {/* HOVER LIGHT */}
            <div className="
            absolute inset-0
            opacity-0
            group-hover:opacity-100
            transition-all
            duration-700
            bg-gradient-to-r
            from-blue-500/10
            via-cyan-400/10
            to-transparent
            " />

            {/* CONTENT */}
            <div className="
            relative
            z-10
            flex
            items-center
            justify-between
            "
            >

              <div>

                <p className="
                uppercase
                tracking-[0.35em]
                text-xs
                text-blue-400
                mb-3
                ">
                  {item.title}
                </p>

                <h3 className="
                text-2xl
                font-bold
                text-white
                ">
                  {item.desc}
                </h3>

              </div>

              {/* ARROW */}
              <motion.div

                whileHover={{
                  x: 8,
                }}

                className="
                text-4xl
                text-white/40
                group-hover:text-white
                transition-all
                duration-300
                "
              >
                →
              </motion.div>

            </div>

          </motion.div>

        ))}

        {/* BUTTON */}
        <motion.button

          whileHover={{
            scale: 1.05,
          }}

          whileTap={{
            scale: 0.95,
          }}

          className="
          mt-10
          px-10
          py-5
          rounded-full
          bg-white
          text-black
          font-bold
          uppercase
          tracking-[0.2em]
          hover:bg-blue-500
          hover:text-white
          transition-all
          duration-500
          shadow-[0_0_60px_rgba(59,130,246,0.4)]
          "
        >
          Start Building
        </motion.button>

      </motion.div>

    </div>

  </div>

</motion.section>

      {/* FOOTER */}
      <footer className="py-12 border-t border-white/10 bg-[#050505] text-center text-gray-500">
        <h2 className="text-2xl font-bold tracking-[0.3em] text-white mb-4">
          BMW
        </h2>

        <p>Designed & Developed By Sanjay</p>
      </footer>
    </div>
  );
}

const cars = [
  {
    name: 'BMW M4',
    speed: '290 km/h',
    glow: "bg-gray-500/30",
    //glow: "bg-green-300/30",
    bgColor: 'from-green-900/80 to-black',
    shadow: "hover:shadow-[0_0_80px_rgba(156,163,175,0.35)]",
    hp: '503 HP',
    acceleration: '3.5s',
    description:
      'Aggressive performance coupe built for precision and adrenaline.',
    image:
      'https://imgs.search.brave.com/qzbWKCN2iK_7cX0IMFHvKOELdxqGS0_D7IjxmZd1muw/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9zdGF0/aWMtY2RuLmNhcnMy/NC5jb20vcHJvZC9u/ZXctY2FyLWNtcy9C/TVcvTTQtQ29tcGV0/aXRpb24vMjAyNC8w/Ni8xMS8yNzkxMjE1/Ny0xZjQxLTQ1YTgt/YjFkMC03ZWNlNjM3/MzU5YmEtQk1XX000/LUNvbXBldGl0aW9u/X0V4dGVyaW9yc18x/My5qcGc_dz02NDAm/ZHByPTMmb3B0aW1p/emU9bG93JmZvcm1h/dD1hdXRvJnF1YWxp/dHk9NTA',
  },
  {
    name: 'BMW i8',
    speed: '250 km/h',
    glow: "bg-gray-500/30",
    bgColor: 'from-gray-900/80 to-black',
    shadow: "hover:shadow-[0_0_80px_rgba(156,163,175,0.35)]",
    hp: '369 HP',
    acceleration: '4.2s',
    description:
      'Futuristic hybrid supercar with iconic design language.',
    image:
      'https://imgs.search.brave.com/TX1Spipq_PBn_vPSzkXXUE7RiqAt2PPeAwyt6WdkaUQ/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9jZG4u/YXV0b21vYmlsZS1w/cm9wcmUuY29tL2Nk/bi1jZ2kvaW1hZ2Uv/d2lkdGg9NzUwLGZv/cm1hdD1hdXRvLGZp/dD1zY2FsZS1kb3du/L2h0dHBzOi8vY2Ru/LmF1dG9tb2JpbGUt/cHJvcHJlLmNvbS91/cGxvYWRzLzIwMTMv/MDIvYm13LWk4XzAw/NC5qcGc',
  },
  {
    name: 'BMW M5',
    speed: '305 km/h',
    //glow: "bg-blue-300/30",
    glow: "bg-gray-500/30",
    bgColor: 'from-blue-900/80 to-black',
    shadow: "hover:shadow-[0_0_80px_rgba(156,163,175,0.35)]",
    hp: '617 HP',
    acceleration: '3.1s',
    description:
      'Luxury sedan engineered with race-inspired performance.',
    image:
      'https://imgs.search.brave.com/rop_ieN7wJZyj-MUWDb0cXoYob_3jIlqmKjHb2ectQE/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9oaXBz/LmhlYXJzdGFwcHMu/Y29tL2htZy1wcm9k/L2ltYWdlcy92b2wt/MjgtMjAyNS1ibXct/bTUtMTEtNjdlMmQ2/YzY4NzFlNi5qcGVn/P2Nyb3A9MXh3OjF4/aDtjZW50ZXIsdG9w',
  },
];

const stats = [
  {
    value: '503',
    label: 'Horsepower',
  },
  {
    value: '3.5s',
    label: '0-100 km/h',
  },
  {
    value: '290',
    label: 'Top Speed',
  },
  {
    value: 'Twin Turbo',
    label: 'Engine',
  },
];

const specs = [
  {
    value: "617",
    label: "Horsepower",
  },
  {
    value: "3.1s",
    label: "0-100 KM/H",
  },
  {
    value: "305",
    label: "Top Speed",
  },
  {
    value: "4.4L",
    label: "Twin Turbo V8",
  },
];
