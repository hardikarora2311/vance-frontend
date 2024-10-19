import React, { useRef } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";

gsap.registerPlugin(ScrollTrigger);

const Hero = () => {
  const containerRef = useRef(null);
  const contentRef = useRef(null);

  useGSAP(() => {
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: 1,
        pin: true,
        anticipatePin: 1,
      },
    });

    // Initial animations
    gsap.to("#testimonial-img", {
      opacity: 1,
      scale: 1,
      ease: "power2.inOut",
      duration: 1,
      delay: 0.3,
    });
    gsap.to("#hero-img", {
      opacity: 1,
      y: -50,
      ease: "power2.inOut",
      duration: 1,
      delay: 0.3,
    });

    tl.to("#bg-overlay", {
      backgroundColor: "#111111",
      duration: 1,
      ease: "power2.inOut",
    })
      .to("#bg-overlay-gradient", {
        //   opacity: 0.5,
        background:
          "radial-gradient(50% 50% at 50% 50%, #4602D9 0%, #111 100%)",
        filter: "blur(229px)",
        duration: 1,
        ease: "power2.inOut",
      })
      .to(".phone-container", { y: "15%", duration: 0.5, delay: 0.2 }, "-=1")
      .fromTo(
        "#screen-2",
        { y: "100%", opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power2.inOut" },
        "-=1"
      )
      .to(".content-1", { opacity: 0, y: -20, duration: 0.5 }, "-=1")
      .fromTo(
        ".content-2",
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5 },
        "-=0.5"
      )
      .to("#testimonial-img", {
        scale: 0.8,
        zIndex: -15,
        opacity: 0.5,
        ease: "power2.inOut",
        duration: 1,
      })
      .to(
        "#bg-overlay-gradient",
        {
          background:
            "radial-gradient(50% 50% at 50% 50%, #C31111 0%, #111 100%)",
          filter: "blur(229px)",
          duration: 1,
          ease: "power2.inOut",
        },
        "+=0.5"
      )
      .fromTo(
        "#screen-3",
        { y: "100%", opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power2.inOut" },
        "-=1"
      )
      .to("#testimonial-img", {
        opacity: 0.1,
        scale: 0.7,
        ease: "power2.inOut",
        duration: 1,
      })
      .to(
        "#bg-overlay",
        {
          backgroundColor: "#C31111",
          duration: 1,
          ease: "power2.inOut",
        },
        "+=0.5"
      )
      .fromTo(
        "#test-card",
        { scale: 0 },
        {
          scale: 1,
          duration: 1,
          opacity: 1,
          ease: "power2.inOut",
          delay: 2,
        },
        "-=1"
      )
      .fromTo(
        "#alert-card",
        { scale: 0, opacity: 0 },
        {
          scale: 1,
          opacity: 1,
          duration: 1,
          ease: "power2.inOut",
        },
        "-=1"
      );

    // ScrollTrigger.create({
    //   trigger: "#alert-card",
    //   start: "top center",
    //   end: "bottom bottom",
    //   toggleActions: "play none none play",
    //   // toggleActions: "play reverse restart reverse",
    //   onEnter: () => {
    //     gsap.to("#alert-card", {
    //       scale: 1,
    //       opacity: 1,
    //       duration: 0.5,
    //       ease: "power2.out",
    //     });
    //   },
    //   onLeave: () => {
    //     gsap.to("#alert-card", {
    //       scale: 0,
    //       opacity: 0,
    //       duration: 0.5,
    //       ease: "power2.in",
    //     });
    //   },
    // });
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative min-h-screen flex flex-col items-center overflow-hidden"
    >
      <div
        id="bg-overlay"
        className="fixed inset-0 transition-colors duration-500 ease-in-out -z-10"
      />
      <div
        id="bg-overlay-gradient"
        className="fixed inset-0 transition-colors duration-500 ease-in-out -z-10"
      />

      <div ref={contentRef} className="relative w-full text-center pt-32">
        <div className="md:max-w-6xl mx-auto px-4">
          <div className="content-1 absolute top-32 left-0 right-0 transition-all duration-500 text-[#111111]">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 ">
              Send money to India at Google rates.
            </h1>
            <p className="text-xl mb-12">
              Say goodbye to forex fees- get the best value for your transfers
            </p>
            <div className="flex justify-center gap-4 mb-20">
              <img
                src="./app-store.svg"
                alt="app-store"
                className="cursor-pointer"
              />
              <img
                src="./play-store.svg"
                alt="play-store"
                className="cursor-pointer"
              />
            </div>
          </div>

          <div className="content-2 absolute top-32 left-0 right-0 opacity-0 max-w-3xl mx-auto text-white">
            <h1 className="text-5xl md:text-6xl font-bold mb-6 ">
              Always know when it's a good time to transfer
            </h1>
            <p className="text-xl mb-12">
              Whether you're sending money home, paying for services in a
              different currency, or managing investments - Set a desired rate,
              and we'll notify you when it's time to make your move.
            </p>
            <div className="flex justify-center gap-4 mb-20">
              <img
                src="./app-store.svg"
                alt="app-store"
                className="cursor-pointer"
              />
              <img
                src="./play-store.svg"
                alt="play-store"
                className="cursor-pointer"
              />
            </div>
          </div>

          {/* Phone Container */}
          <div className="relative mx-auto mt-[22rem] phone-container">
            <img
              src="./testimonials.svg"
              className="z-0 absolute -top-24 left-0 min-w-60 opacity-0 scale-0"
              id="testimonial-img"
            />
            <div
              className="relative z-10 opacity-5 translate-y-36 translate-x-[28%]"
              id="hero-img"
            >
              {/* Phone Mock */}
              <img src="./phone-mockup.svg" alt="App interface" />
              <img
                src="./screen-1.svg"
                alt="Screen 1"
                className="absolute z-30 top-4 left-20 opacity-1"
                id="screen-1"
              />
              <img
                src="./screen-2.svg"
                alt="Screen 2"
                className="absolute z-30 top-4 left-20 opacity-0 translate-y-full"
                id="screen-2"
              />
              <img
                src="./screen-3.svg"
                alt="Screen 3"
                className="absolute z-30 top-4 left-20 opacity-0 translate-y-full"
                id="screen-3"
              />
              <Link to="/dashboard">
                <img
                  src="./test-card.svg"
                  alt="Alert Card"
                  className="absolute z-30 top-20 left-2"
                  id="test-card"
                />
              </Link>
              <Link to="/dashboard">
                <img
                  src="./alert-new.svg"
                  alt="Alert Card"
                  className="absolute z-30 bottom-[27rem] -left-6"
                  id="alert-card"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
