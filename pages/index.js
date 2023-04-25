import React, { useState, useEffect, useRef } from "react";
import Head from "next/head";
import Image from "next/legacy/image";
import Link from "next/link";
import ReactTypingEffect from "react-typing-effect";

import Icon from "../components/Icon";
// Icons
import Html from "../components/icons/Html";
import Css from "../components/icons/Css";
import Javascript from "../components/icons/Javascript";
import Tailwind from "../components/icons/Tailwind";
import Bootstrap from "../components/icons/Bootstrap";
import Sass from "../components/icons/Sass";
import ReactJs from "../components/icons/ReactJs";
import NextJs from "../components/icons/NextJs";
import NodeJs from "../components/icons/NodeJs";
import Typescript from "../components/icons/Typescript";
import Vscode from "../components/icons/Vscode";
import Django from "../components/icons/Django";
import Python from "../components/icons/Python";
import Solidity from "../components/icons/Solidity";
import MongoDb from "../components/icons/MongoDb";
import Express from "../components/icons/Express";
// Project Card
import ProjectCard from "../components/ProjectCard";
import GitHubProfile from "../components/icons/GitHubProfile";
import TwitterProfile from "../components/icons/TwitterProfile";
import LinkedInProfile from "../components/icons/LinkedInProfile";
import FeaturedProjectCard from "../components/FeaturedProjectCard";

// Blog Components
import BlogList from "../components/blog/BlogList";
import BlogItem from "../components/blog/BlogItem";

// Dark Mode
import { useTheme } from "next-themes";

import { projects } from "../utils/constants";

const getDimensions = (ele) => {
  const { height } = ele.getBoundingClientRect();
  const offsetTop = ele.offsetTop;
  const offsetBottom = offsetTop + height;

  return {
    height,
    offsetTop,
    offsetBottom,
  };
};

const scrollTo = (ele) => {
  ele.scrollIntoView({
    behavior: "smooth",
    block: "start",
  });
};

export default function Home({ publications }) {
  const [visibleSection, setVisibleSection] = useState();
  const [scrolling, setScrolling] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [navbarOpen, setNavbarOpen] = useState(false);
  const [showHeader, setShowHeader] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { systemTheme, theme, setTheme } = useTheme();

  const handleResize = () => {
    if (window.innerWidth < 1024) {
    } else {
      setNavbarOpen(false);
    }
  };

  const headerRef = useRef(null);
  const homeRef = useRef(null);
  const aboutRef = useRef(null);
  const skillsRef = useRef(null);
  const myWorkRef = useRef(null);
  const blogRef = useRef(null);
  const contactRef = useRef(null);

  useEffect(() => {
    const sectionRefs = [
      { section: "home", ref: homeRef, id: 1 },
      { section: "about", ref: aboutRef, id: 2 },
      { section: "skills", ref: skillsRef, id: 3 },
      { section: "my-work", ref: myWorkRef, id: 4 },
      { section: "blog", ref: blogRef, id: 5 },
      { section: "contact", ref: contactRef, id: 6 },
    ];

    const handleScroll = () => {
      const { height: headerHeight } = getDimensions(headerRef.current);
      const scrollPosition = window.scrollY + headerHeight;

      const selected = sectionRefs.find(({ section, ref }) => {
        const ele = ref.current;
        if (ele) {
          const { offsetBottom, offsetTop } = getDimensions(ele);
          return scrollPosition >= offsetTop && scrollPosition <= offsetBottom;
        }
      });

      if (selected && selected.section !== visibleSection) {
        setVisibleSection(selected.section);
        // console.log(visibleSection);
      } else if (!selected && visibleSection) {
        setVisibleSection(undefined);
      }
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [visibleSection]);

  // Handle Header Scroll Away
  useEffect(() => {
    let prevScrollPos = window.pageYOffset;
    let timeoutId;

    const handleScrollBack = () => {
      const currentScrollPos = window.pageYOffset;

      // Delay before the header scrolls back into view
      if (currentScrollPos < scrollPosition - 50 && scrolling) {
        timeoutId = setTimeout(() => {
          setShowHeader(true);
        }, 250);
      }

      // Add an easing effect when the header scrolls into and out of view
      if (currentScrollPos > prevScrollPos + 10 && !scrolling && showHeader) {
        setScrolling(true);
      } else if (currentScrollPos < prevScrollPos - 10 && scrolling) {
        clearTimeout(timeoutId);
        setScrolling(false);
        setTimeout(() => {
          setShowHeader(false);
        }, 250);
      }

      prevScrollPos = currentScrollPos;
    };

    window.addEventListener("scroll", handleScrollBack);
    return () => window.removeEventListener("scroll", handleScrollBack);
  }, [scrollPosition, scrolling, showHeader]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.addEventListener("scroll", () =>
        setScrolling(window.pageYOffset > 110)
      );
    }
  }, []);

  useEffect(() => {
    window.addEventListener("resize", handleResize);
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const currentTheme = theme === "system" ? systemTheme : theme;

  useEffect(() => {
    console.log(currentTheme);
  }, [currentTheme]);

  const renderThemeChanger = () => {
    if (!mounted) return null;

    if (currentTheme === "dark") {
      return (
        <svg
          className="w-6 h-6 transition-all duration-150 ease-in-out flex text-mid/50 group-hover:text-dark"
          fill="#fff"
          viewBox="0 0 24 24"
          stroke="#fff"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
          />
        </svg>
      );
    } else {
      return (
        <svg
          className="w-6 h-6 transition-all duration-150 ease-in-out dark:flex dark:opacity-50 dark:group-hover:opacity-100 dark:text-white"
          fill="#000"
          viewBox="0 0 24 24"
          stroke="#000"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"
          />
        </svg>
      );
    }
  };

  return (
    <div className="bg-white dark:bg-darker transition-all duration-150 ease-in-out">
      <div
        className={`relative w-full dark:bg-dark/20 bg-light bg-opacity-10 overflow-auto min-h-screen transition-all duration-150 ease-in-out ${
          navbarOpen ? "overflow-hidden" : "overflow-auto"
        }`}
      >
        <Head>
          <title>Tonny Batya</title>
          <meta
            name="description"
            content="The portfolio of Tonny Batya, Blockchain Developer"
          />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        {/* Full-screen Menu */}
        <div
          className={`fixed w-full z-50 h-screen pt-24 bg-white dark:bg-darker bg-opacity-100 transform delay-100 transition-all duration-150 ${
            navbarOpen
              ? "opacity-100 translate-x-0"
              : "opacity-0 -translate-x-full"
          }`}
        >
          <div className="container relative mx-auto">
            <nav className="block ml-auto">
              <ul className="z-50 flex flex-col items-start">
                <li className="z-50 block py-2 list-none lg:inline-block">
                  <button
                    href="#"
                    className={`header_link text-xl font-semibold transition-all duration-150 ease-in-out ${
                      visibleSection === "home"
                        ? "selected delay-200"
                        : "dark:text-light dark:hover:text-white text-mid/50 hover:text-mid border-b-2 border-transparent"
                    }`}
                    onClick={() => {
                      setNavbarOpen(false);
                      scrollTo(homeRef.current);
                    }}
                  >
                    HOME
                  </button>
                </li>
                <li className="z-50 block py-2 list-none lg:inline-block">
                  <button
                    href="#"
                    className={`header_link text-xl font-semibold transition-all duration-150 ease-in-out ${
                      visibleSection === "about"
                        ? "current"
                        : "dark:text-light dark:hover:text-white text-mid/50 hover:text-mid border-b-2 border-transparent"
                    }`}
                    onClick={() => {
                      setNavbarOpen(false);
                      scrollTo(aboutRef.current);
                    }}
                  >
                    ABOUT
                  </button>
                </li>
                <li className="z-50 block py-2 list-none lg:inline-block">
                  <button
                    href="#"
                    className={`header_link text-xl font-semibold transition-all duration-150 ease-in-out ${
                      visibleSection === "skills"
                        ? "current"
                        : "dark:text-light dark:hover:text-white text-mid/50 hover:text-mid border-b-2 border-transparent"
                    }`}
                    onClick={() => {
                      setNavbarOpen(false);
                      scrollTo(skillsRef.current);
                    }}
                  >
                    SKILLS
                  </button>
                </li>
                <li className="z-50 block py-2 list-none lg:inline-block">
                  <button
                    href="#"
                    className={`header_link text-xl font-semibold transition-all duration-150 ease-in-out ${
                      visibleSection === "my-work"
                        ? "current"
                        : "dark:text-light dark:hover:text-white text-mid/50  hover:text-mid border-b-2 border-transparent"
                    }`}
                    onClick={() => {
                      setNavbarOpen(false);
                      scrollTo(myWorkRef.current);
                    }}
                  >
                    PROJECTS
                  </button>
                </li>
                <li className="z-50 block py-2 list-none lg:inline-block">
                  <button
                    href="#"
                    target="_blank"
                    rel="noreferrer"
                    className={`header_link text-xl font-semibold transition-all duration-150 ease-in-out ${
                      visibleSection === "blog"
                        ? "current"
                        : "dark:text-light dark:hover:text-white text-mid/50 hover:text-mid border-b-2 border-transparent"
                    }`}
                    onClick={() => {
                      setNavbarOpen(false);
                      scrollTo(blogRef.current);
                    }}
                  >
                    BLOG
                  </button>
                </li>
                <li className="z-50 block py-2 list-none lg:inline-block">
                  <button
                    href="#"
                    className={`header_link text-xl font-semibold transition-all duration-150 ease-in-out ${
                      visibleSection === "contact"
                        ? "current"
                        : "dark:text-light dark:hover:text-white text-mid/50 hover:text-mid border-b-2 border-transparent"
                    }`}
                    onClick={() => {
                      setNavbarOpen(false);
                      scrollTo(contactRef.current);
                    }}
                  >
                    CONTACT
                  </button>
                </li>
                <li className="z-40 block py-2 mt-6 list-none lg:inline-block">
                  <a
                    href={`mailto:batztonnie@gmail.com`}
                    className="text-lg btn-brand btn-lg group"
                  >
                    RESUME
                  </a>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        {/* Header and Nav */}
        <header
          ref={headerRef}
          className={`header top-0 mx-auto flex items-center z-50 fixed w-full transition-all duration-150 h-20 ease-in-out ${
            scrolling ? "-translate-y-full" : ""
          } ${
            scrolling && !navbarOpen
              ? "dark:bg-darker bg-[#f6f5f6]"
              : "dark:bg-darker bg-[#f6f5f6]"
          }`}
        >
          {/* Logo and Nav container */}
          <div className="container relative flex items-center mx-auto">
            {/* Logo */}
            <div className="z-50 sm:w-8 sm:h-8 w-9 h-9 flex items-center">
              <Image
                src="/logo.svg"
                className="overflow-hidden rounded-md"
                width={880}
                height={880}
                alt={"Tonny Batya headshot"}
              />
            </div>
            {/* Text */}
            <div className="flex items-center ml-4">
              <h1
                href="#"
                className="text-lg font-semibold font-display tracking-tight dark:text-white text-darker mb-0 transition-all duration-150 ease-in-out"
              >
                TONNY BATYA
              </h1>
            </div>
            {/* Nav */}
            <nav className="block ml-auto h-full">
              <ul className="z-50 flex items-center">
                <li className="z-50 hidden mx-5 list-none lg:inline-block">
                  <button
                    href="#"
                    className={`nav-item ${
                      visibleSection === "home" ? "current" : "active"
                    }`}
                    onClick={() => {
                      scrollTo(homeRef.current);
                    }}
                  >
                    HOME
                  </button>
                </li>
                <li className="z-50 hidden mx-5 list-none lg:inline-block">
                  <button
                    href="#"
                    className={`nav-item ${
                      visibleSection === "about" ? "current" : "active"
                    }`}
                    onClick={() => {
                      scrollTo(aboutRef.current);
                    }}
                  >
                    ABOUT
                  </button>
                </li>
                <li className="z-50 hidden mx-5 list-none lg:inline-block">
                  <button
                    href="#"
                    className={`nav-item ${
                      visibleSection === "skills" ? "current" : "active"
                    }`}
                    onClick={() => {
                      scrollTo(skillsRef.current);
                    }}
                  >
                    SKILLS
                  </button>
                </li>
                <li className="z-50 hidden mx-5 list-none lg:inline-block">
                  <button
                    href="#"
                    className={`nav-item ${
                      visibleSection === "my-work" ? "current" : "active"
                    }`}
                    onClick={() => {
                      scrollTo(myWorkRef.current);
                    }}
                  >
                    PROJECTS
                  </button>
                </li>
                <li className="z-50 hidden mx-5 list-none lg:inline-block">
                  <button
                    href="#"
                    target="_blank"
                    rel="noreferrer"
                    className={`nav-item ${
                      visibleSection === "blog" ? "current" : "active"
                    }`}
                    onClick={() => {
                      scrollTo(blogRef.current);
                    }}
                  >
                    BLOG
                  </button>
                </li>
                <li className="z-50 hidden mx-5 list-none lg:inline-block">
                  <button
                    href="#"
                    className={`nav-item ${
                      visibleSection === "contact" ? "current" : "active"
                    }`}
                    onClick={() => {
                      scrollTo(contactRef.current);
                    }}
                  >
                    CONTACT
                  </button>
                </li>
                <li className="z-50 hidden ml-5 list-none lg:inline-block">
                  <a href={``} className="btn-brand btn-md group">
                    RESUME
                  </a>
                </li>
                <li className="z-50 inline-block list-none lg:hidden group">
                  <button
                    className={`relative w-10 h-10 ${
                      navbarOpen
                        ? "dark:text-white text-dark"
                        : "text-mid/50 group-hover:text-mid dark:opacity-50 dark:group-hover:opacity-100 dark:text-white dark:group-hover:text-white"
                    } focus:outline-none`}
                    onClick={() => setNavbarOpen(!navbarOpen)}
                  >
                    <div className="absolute block w-5 transform -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2">
                      <span
                        aria-hidden="true"
                        className={`block absolute h-0.5 w-5 bg-current transform transition duration-200 ease-in-out ${
                          navbarOpen ? "rotate-45" : "-translate-y-1.5"
                        }`}
                      ></span>
                      <span
                        aria-hidden="true"
                        className={`block absolute h-0.5 w-5 bg-current transform transition duration-200 ease-in-out ${
                          navbarOpen ? "opacity-0" : "opacity-100"
                        }`}
                      ></span>
                      <span
                        aria-hidden="true"
                        className={`block absolute h-0.5 w-5 bg-current transform transition duration-200 ease-in-out ${
                          navbarOpen ? "-rotate-45" : "translate-y-1.5"
                        }`}
                      ></span>
                    </div>
                  </button>
                </li>
              </ul>
            </nav>
            <div className="flex mt-auto ml-0 lg:ml-5">
              {/* Dark mode */}
              <button
                className="flex items-center justify-center w-7 h-12 transition-all duration-150 ease-in rounded-sm focus:outline-none group bg-transparent outline-none"
                onClick={() => {
                  setTheme(theme === "dark" ? "light" : "dark");
                }}
              >
                {renderThemeChanger()}
              </button>
            </div>
          </div>
        </header>

        {/* Content Container */}
        <div className="container relative z-30 mx-auto">
          {/* Hero Content */}
          <main className={`flex-col flex h-screen`} id="home" ref={homeRef}>
            {/* Main */}
            <div className="container relative flex flex-col items-start justify-center flex-grow px-0 mx-auto md:px-20 lg:px-24 section">
              <div className="w-full">
                <h1 className="mb-4 text-5xl md:text-7xl dark:text-white text-dark">
                  TONNY BATYA
                </h1>
                <h2 className="mb-4 text-3xl md:text-4xl dark:text-light text-mid">
                  <ReactTypingEffect
                    typingDelay={200}
                    speed={30}
                    eraseSpeed={30}
                    eraseDelay={1500}
                    text={[
                      `Software Engineer...`,
                      `Blockchain Dev..`,
                      `Technical Writer`,
                    ]}
                  />
                </h2>
                <button
                  className="mt-4 btn-brand btn-lg group"
                  onClick={() => {
                    scrollTo(myWorkRef.current);
                  }}
                >
                  MY WORK
                </button>
              </div>
            </div>
          </main>

          {/* About */}
          <section
            className="flex flex-col w-full px-0 md:px-20 lg:px-24 py-28 section"
            id="about"
            ref={aboutRef}
          >
            <div className="flex flex-col">
              <h2 className="text-5xl">ABOUT</h2>
              <hr className="bg-brand w-40 h-1.5 mt-4 mb-6 border-0"></hr>

              <div className="flex flex-col-reverse items-start w-full md:flex-row">
                <div className="flex flex-col w-full md:pr-8 md:w-3/5">
                  <h2 className="text-2xl font-semibold">TONNY BATYA</h2>
                  <p className="text-lg">
                    A passionate Developer with interest in exploring emerging
                    technologies like Blockchain and Artificial Intelligence. I
                    am excited to leverage my skills and experience to
                    contribute to innovative projects and make a difference. As
                    a proactive and self-motivated individual, I am always
                    looking for new opportunities to learn and grow in my
                    career. I am open to exploring various roles in Software
                    development and believe that my technical skills, excellent
                    communication, collaboration, and problem-solving abilities
                    make me a valuable asset to any team.
                  </p>
                </div>
                <div className="flex w-full h-full mb-4 md:pl-8 md:w-2/5 md:mb-0">
                  <Image
                    src="/headshot.png"
                    className="overflow-hidden rounded-full"
                    width={880}
                    height={880}
                    alt={"Tonny Batya headshot"}
                  />
                </div>
              </div>
            </div>
          </section>

          {/* Skills */}
          <section
            className="flex flex-col w-full px-0 md:px-20 lg:px-24 py-28 section"
            id="skills"
            ref={skillsRef}
          >
            <h2 className="text-5xl">SKILLS</h2>
            <hr className="bg-brand w-40 h-1.5 mt-4 mb-6 border-0"></hr>

            {/* Skills icons */}
            <div className="w-full mr-auto grid gap-4 grid-cols-4 sm:grid-cols-4 md:grid-cols-8 mt-4">
              {/* HTML */}
              <Icon
                IconType={Html}
                title="HTML"
                width={"w-16"}
                height={"h-16"}
                padding={"p-0"}
                flexDirection={"flex-col"}
                titleMargins={"mt-4"}
                titleSize={"text-sm sm:text-sm"}
                marginBottom={"mb-4"}
                marginRight={"mr-0"}
                textTransform={"normal-case"}
                fixedHeight={"h-28"}
              />

              {/* CSS */}
              <Icon
                IconType={Css}
                title="CSS"
                width={"w-16"}
                height={"h-16"}
                padding={"p-0"}
                flexDirection={"flex-col"}
                titleMargins={"mt-4"}
                titleSize={"text-sm sm:text-sm"}
                marginBottom={"mb-4"}
                marginRight={"mr-0"}
                textTransform={"normal-case"}
                fixedHeight={"h-28"}
              />

              {/* Tailwind */}
              <Icon
                IconType={Tailwind}
                title="Tailwind"
                width={"w-16"}
                height={"h-16"}
                padding={"p-0"}
                flexDirection={"flex-col"}
                titleMargins={"mt-4"}
                titleSize={"text-sm sm:text-sm"}
                marginBottom={"mb-4"}
                marginRight={"mr-0"}
                textTransform={"normal-case"}
                fixedHeight={"h-28"}
              />

              {/* Javascript */}
              <Icon
                IconType={Javascript}
                title="Javascript"
                width={"w-16"}
                height={"h-16"}
                padding={"p-0"}
                flexDirection={"flex-col"}
                titleMargins={"mt-4"}
                titleSize={"text-sm sm:text-sm"}
                marginBottom={"mb-4"}
                marginRight={"mr-0"}
                textTransform={"normal-case"}
                fixedHeight={"h-28"}
              />

              {/* React */}
              <Icon
                IconType={ReactJs}
                title="React"
                width={"w-16"}
                height={"h-16"}
                padding={"p-0"}
                flexDirection={"flex-col"}
                titleMargins={"mt-4"}
                titleSize={"text-sm sm:text-sm"}
                marginBottom={"mb-4"}
                marginRight={"mr-0"}
                textTransform={"normal-case"}
                fixedHeight={"h-28"}
              />

              {/* Next */}
              <Icon
                IconType={NextJs}
                title="Next"
                width={"w-16"}
                height={"h-16"}
                padding={"p-0"}
                flexDirection={"flex-col"}
                titleMargins={"mt-4"}
                titleSize={"text-sm sm:text-sm"}
                marginBottom={"mb-4"}
                marginRight={"mr-0"}
                textTransform={"normal-case"}
                fixedHeight={"h-28"}
              />

              {/* Node */}
              <Icon
                IconType={NodeJs}
                title="Node"
                width={"w-16"}
                height={"h-16"}
                padding={"p-0"}
                flexDirection={"flex-col"}
                titleMargins={"mt-4"}
                titleSize={"text-sm sm:text-sm"}
                marginBottom={"mb-4"}
                marginRight={"mr-0"}
                textTransform={"normal-case"}
                fixedHeight={"h-28"}
              />

              {/* Express */}
              <Icon
                IconType={Express}
                title="Express"
                width={"w-16"}
                height={"h-16"}
                padding={"p-0"}
                flexDirection={"flex-col"}
                titleMargins={"mt-4"}
                titleSize={"text-sm sm:text-sm"}
                marginBottom={"mb-4"}
                marginRight={"mr-0"}
                textTransform={"normal-case"}
                fixedHeight={"h-28"}
              />

              {/* Solidity */}
              <Icon
                IconType={Solidity}
                title="Solidity"
                width={"w-16"}
                height={"h-16"}
                padding={"p-0"}
                flexDirection={"flex-col"}
                titleMargins={"mt-4"}
                titleSize={"text-sm sm:text-sm"}
                marginBottom={"mb-4"}
                marginRight={"mr-0"}
                textTransform={"normal-case"}
                fixedHeight={"h-28"}
              />

              {/* MongoDb */}
              <Icon
                IconType={MongoDb}
                title="MongoDb"
                width={"w-16"}
                height={"h-16"}
                padding={"p-0"}
                flexDirection={"flex-col"}
                titleMargins={"mt-4"}
                titleSize={"text-sm sm:text-sm"}
                marginBottom={"mb-4"}
                marginRight={"mr-0"}
                textTransform={"normal-case"}
                fixedHeight={"h-28"}
              />

              {/* Sass */}
              <Icon
                IconType={Sass}
                title="Sass"
                width={"w-16"}
                height={"h-16"}
                padding={"p-0"}
                flexDirection={"flex-col"}
                titleMargins={"mt-4"}
                titleSize={"text-sm sm:text-sm"}
                marginBottom={"mb-4"}
                marginRight={"mr-0"}
                textTransform={"normal-case"}
                fixedHeight={"h-28"}
              />

              {/* Bootstrap */}
              <Icon
                IconType={Bootstrap}
                title="Bootstrap"
                width={"w-16"}
                height={"h-16"}
                padding={"p-0"}
                flexDirection={"flex-col"}
                titleMargins={"mt-4"}
                titleSize={"text-sm sm:text-sm"}
                marginBottom={"mb-4"}
                marginRight={"mr-0"}
                textTransform={"normal-case"}
                fixedHeight={"h-28"}
              />

              {/* Typescript */}
              <Icon
                IconType={Typescript}
                title="Typescript"
                width={"w-16"}
                height={"h-16"}
                padding={"p-0"}
                flexDirection={"flex-col"}
                titleMargins={"mt-4"}
                titleSize={"text-sm sm:text-sm"}
                marginBottom={"mb-4"}
                marginRight={"mr-0"}
                textTransform={"normal-case"}
                fixedHeight={"h-28"}
              />

              {/* Vscode */}
              <Icon
                IconType={Vscode}
                title="Vscode"
                width={"w-16"}
                height={"h-16"}
                padding={"p-0"}
                flexDirection={"flex-col"}
                titleMargins={"mt-4"}
                titleSize={"text-sm sm:text-sm"}
                marginBottom={"mb-4"}
                marginRight={"mr-0"}
                textTransform={"normal-case"}
                fixedHeight={"h-28"}
              />

              {/* Django */}
              <Icon
                IconType={Django}
                title="Django"
                width={"w-16"}
                height={"h-16"}
                padding={"p-0"}
                flexDirection={"flex-col"}
                titleMargins={"mt-4"}
                titleSize={"text-sm sm:text-sm"}
                marginBottom={"mb-4"}
                marginRight={"mr-0"}
                textTransform={"normal-case"}
                fixedHeight={"h-28"}
              />

              {/* Python */}
              <Icon
                IconType={Python}
                title="Python"
                width={"w-16"}
                height={"h-16"}
                padding={"p-0"}
                flexDirection={"flex-col"}
                titleMargins={"mt-4"}
                titleSize={"text-sm sm:text-sm"}
                marginBottom={"mb-4"}
                marginRight={"mr-0"}
                textTransform={"normal-case"}
                fixedHeight={"h-28"}
              />
            </div>
          </section>

          {/* My Work */}
          <section
            className="flex flex-col w-full px-0 md:px-20 lg:px-24 py-28 section"
            id="my-work"
            ref={myWorkRef}
          >
            {/* My Work header */}
            <h2 className="text-5xl">MY PROJECTS</h2>
            <hr className="bg-brand w-40 h-1.5 mt-4 mb-6 border-0"></hr>

            {/* Featured Projects Container */}
            <div className="flex flex-col w-full mb-12">
              {/* Project One */}
              <FeaturedProjectCard
                title={"Crowdnuru"}
                status={"Launching soon!!"}
                description={`CrowdNuru is a decentralized Crowdfunding, LaunchPad, Hiring and Collaboration Platform.`}
                float={`right-0`}
                flexDirection={`flex-col lg:flex-row`}
                imgWidth={"1366"}
                imgHeight={"666"}
                imgSrc={"/projects/crowdnuru.png"}
                liveLink={"https://crowdnuru.netlify.app/"}
                repoLink={"https://github.com/devbxtzz/crowdnuru"}
                stack={
                  <>
                    <Icon
                      IconType={Html}
                      title="HTML"
                      columnSizing={"w-auto"}
                      width={"w-6"}
                      height={"h-6"}
                      flexDirection={"flex-row"}
                      padding={"p-0"}
                      titleMargins={"my-0 ml-1"}
                      titleSize={"text-sm"}
                      marginBottom={"mb-4"}
                      marginRight={"mr-3"}
                      textTransform={"uppercase"}
                      fixedHeight={"h-auto"}
                    />

                    <Icon
                      IconType={Tailwind}
                      title="Tailwind"
                      columnSizing={"w-auto"}
                      width={"w-6"}
                      height={"h-6"}
                      flexDirection={"flex-row"}
                      padding={"p-0"}
                      titleMargins={"my-0 ml-1"}
                      titleSize={"text-sm"}
                      marginBottom={"mb-4"}
                      marginRight={"mr-3"}
                      textTransform={"uppercase"}
                      fixedHeight={"h-auto"}
                    />

                    <Icon
                      IconType={ReactJs}
                      title="React"
                      columnSizing={"w-auto"}
                      width={"w-6"}
                      height={"h-6"}
                      flexDirection={"flex-row"}
                      padding={"p-0"}
                      titleMargins={"my-0 ml-1"}
                      titleSize={"text-sm"}
                      marginBottom={"mb-4"}
                      marginRight={"mr-3"}
                      textTransform={"uppercase"}
                      fixedHeight={"h-auto"}
                    />

                    <Icon
                      IconType={NextJs}
                      title="Next"
                      columnSizing={"w-auto"}
                      width={"w-6"}
                      height={"h-6"}
                      flexDirection={"flex-row"}
                      padding={"p-0"}
                      titleMargins={"my-0 ml-1"}
                      titleSize={"text-sm"}
                      marginBottom={"mb-4"}
                      marginRight={"mr-3"}
                      textTransform={"uppercase"}
                      fixedHeight={"h-auto"}
                    />
                    <Icon
                      IconType={Solidity}
                      title="Solidity"
                      width={"w-6"}
                      height={"h-6"}
                      padding={"p-0"}
                      flexDirection={"flex-col"}
                      titleMargins={"mt-4"}
                      titleSize={"text-sm sm:text-sm"}
                      marginBottom={"mb-4"}
                      marginRight={"mr-0"}
                      textTransform={"normal-case"}
                      fixedHeight={"h-28"}
                    />
                  </>
                }
              />
              {/* Project Two */}
              <FeaturedProjectCard
                title={"Ecsynths"}
                status={"Still Developmet Phase"}
                description={`Ecsynths is a synthetic derivatives DEX.`}
                float={`right-0`}
                flexDirection={`flex-col lg:flex-row-reverse`}
                imgWidth={"1366"}
                imgHeight={"666"}
                imgSrc={"/projects/ecsynths.png"}
                liveLink={"https://ecsynths.netlify.app/"}
                repoLink={"https://github.com/devbxtzz/ecsynths"}
                stack={
                  <>
                    <Icon
                      IconType={Solidity}
                      title="Solidity"
                      width={"w-6"}
                      height={"h-6"}
                      padding={"p-0"}
                      flexDirection={"flex-col"}
                      titleMargins={"mt-4"}
                      titleSize={"text-sm sm:text-sm"}
                      marginBottom={"mb-4"}
                      marginRight={"mr-0"}
                      textTransform={"normal-case"}
                      fixedHeight={"h-28"}
                    />

                    <Icon
                      IconType={Tailwind}
                      title="Tailwind"
                      columnSizing={"w-auto"}
                      width={"w-6"}
                      height={"h-6"}
                      flexDirection={"flex-row"}
                      padding={"p-0"}
                      titleMargins={"my-0 ml-1"}
                      titleSize={"text-sm"}
                      marginBottom={"mb-4"}
                      marginRight={"mr-3"}
                      textTransform={"uppercase"}
                      fixedHeight={"h-auto"}
                    />

                    <Icon
                      IconType={ReactJs}
                      title="React"
                      columnSizing={"w-auto"}
                      width={"w-6"}
                      height={"h-6"}
                      flexDirection={"flex-row"}
                      padding={"p-0"}
                      titleMargins={"my-0 ml-1"}
                      titleSize={"text-sm"}
                      marginBottom={"mb-4"}
                      marginRight={"mr-3"}
                      textTransform={"uppercase"}
                      fixedHeight={"h-auto"}
                    />

                    <Icon
                      IconType={NextJs}
                      title="Next"
                      columnSizing={"w-auto"}
                      width={"w-6"}
                      height={"h-6"}
                      flexDirection={"flex-row"}
                      padding={"p-0"}
                      titleMargins={"my-0 ml-1"}
                      titleSize={"text-sm"}
                      marginBottom={"mb-4"}
                      marginRight={"mr-3"}
                      textTransform={"uppercase"}
                      fixedHeight={"h-auto"}
                    />
                  </>
                }
              />
              {/* Project Three */}
              <FeaturedProjectCard
                title={"Portfolio"}
                status={""}
                description={`My personal site showcasing my Projects`}
                float={`right-0`}
                flexDirection={`flex-col lg:flex-row`}
                imgWidth={"1366"}
                imgHeight={"666"}
                imgSrc={"/projects/portfolio.png"}
                liveLink={"https://tonnybatya.vercel.app"}
                repoLink={"https://github.com/devbxtzz/tonnybatya"}
                stack={
                  <>
                    <Icon
                      IconType={Html}
                      title="HTML"
                      columnSizing={"w-auto"}
                      width={"w-6"}
                      height={"h-6"}
                      flexDirection={"flex-row"}
                      padding={"p-0"}
                      titleMargins={"my-0 ml-1"}
                      titleSize={"text-sm"}
                      marginBottom={"mb-4"}
                      marginRight={"mr-3"}
                      textTransform={"uppercase"}
                      fixedHeight={"h-auto"}
                    />

                    <Icon
                      IconType={Tailwind}
                      title="Tailwind"
                      columnSizing={"w-auto"}
                      width={"w-6"}
                      height={"h-6"}
                      flexDirection={"flex-row"}
                      padding={"p-0"}
                      titleMargins={"my-0 ml-1"}
                      titleSize={"text-sm"}
                      marginBottom={"mb-4"}
                      marginRight={"mr-3"}
                      textTransform={"uppercase"}
                      fixedHeight={"h-auto"}
                    />

                    <Icon
                      IconType={ReactJs}
                      title="React"
                      columnSizing={"w-auto"}
                      width={"w-6"}
                      height={"h-6"}
                      flexDirection={"flex-row"}
                      padding={"p-0"}
                      titleMargins={"my-0 ml-1"}
                      titleSize={"text-sm"}
                      marginBottom={"mb-4"}
                      marginRight={"mr-3"}
                      textTransform={"uppercase"}
                      fixedHeight={"h-auto"}
                    />

                    <Icon
                      IconType={NextJs}
                      title="Next"
                      columnSizing={"w-auto"}
                      width={"w-6"}
                      height={"h-6"}
                      flexDirection={"flex-row"}
                      padding={"p-0"}
                      titleMargins={"my-0 ml-1"}
                      titleSize={"text-sm"}
                      marginBottom={"mb-4"}
                      marginRight={"mr-3"}
                      textTransform={"uppercase"}
                      fixedHeight={"h-auto"}
                    />
                  </>
                }
              />
            </div>
          </section>

          {/* Blog */}
          <section
            className="flex flex-col w-full px-0 md:px-20 lg:px-24 py-28 section"
            id="blog"
            ref={blogRef}
          >
            {/* Blog header */}
            <h2 className="text-5xl">MY ARTICLES</h2>
            <hr className="bg-brand w-40 h-1.5 mt-4 mb-6 border-0"></hr>

            <BlogList publications={publications} />
          </section>

          {/* Contact */}
          <section
            className="flex flex-col w-full px-0 md:px-20 lg:px-24 py-28 section"
            id="contact"
            ref={contactRef}
          >
            <h2 className="text-5xl">CONTACT</h2>
            <hr className="bg-brand w-40 h-1.5 mt-4 mb-6 border-0"></hr>

            <div className="flex flex-col-reverse w-full md:flex-row">
              <div className="w-full mb-4 md:pl-0 md:mb-0">
                <p className="text-lg">
                  I&apos;m currently available to collaborate on any project, so
                  get in touch if you&apos;d like us to work together.
                </p>
                <p className="text-lg">
                  Email me at{" "}
                  <Link
                    href="mailto:batztonnie@gmail.com"
                    className="underline-link"
                  >
                    batztonnie@gmail.com
                  </Link>{" "}
                  and let&apos;s talk about that Amazing project!
                </p>
              </div>
            </div>
          </section>

          {/* Footer */}
          <footer className="flex flex-col w-full px-0 items-center py-16 md:px-20 lg:px-24 section">
            <hr className="w-full h-1 mb-16 dark:bg-white bg-dark border-0 opacity-10"></hr>
            <div className="w-8 mb-4">
              <Image
                src="/logo.svg"
                className="overflow-hidden rounded-md"
                width={900}
                height={900}
                alt={"Tonny Batya logo"}
              />
            </div>

            <div className="flex flex-col items-center md:flex-row">
              <p className="w-auto mb-4 md:mb-0 text-2xl">
                &copy; {new Date().getFullYear()} - Tonny Batya A.K.A Devbxtzz
              </p>

              <div className="flex md:hidden">
                <span className="mr-2">
                  <GitHubProfile marginBottom={"mb-0"} />
                </span>
                <span className="mr-2">
                  <TwitterProfile marginBottom={"mb-0"} />
                </span>
                <span className="mr-2">
                  <LinkedInProfile marginBottom={"mb-0"} />
                </span>
              </div>
            </div>
          </footer>
        </div>

        {/* Fixed Container */}
        <div className="fixed bottom-0 z-30 w-full">
          <div className="container relative flex h-full mx-auto">
            {/* Profile Icons */}
            <div className="absolute bottom-0 items-center hidden mt-auto mr-auto text-white left-8 md:flex md:flex-col">
              <GitHubProfile marginBottom={"mb-4"} />
              <TwitterProfile marginBottom={"mb-4"} />
              <LinkedInProfile marginBottom={"mb-4"} />
              <div className="w-0.5 dark:bg-white bg-dark h-24 opacity-20 mt-2"></div>
            </div>

            {/* Pagination */}
            <div className="absolute bottom-0 items-center hidden mt-auto ml-auto text-white right-8 md:flex md:flex-col">
              {/* Hero - Diamond 1 */}
              <button
                className="w-5 h-5 mb-4"
                onClick={() => {
                  scrollTo(homeRef.current);
                }}
              >
                <svg
                  id="e5c888e5-3206-4553-8f53-60ee93248ad9"
                  className={`group rounded-sm transform  transition duration-500 ease-in-out hover:rotate-45 hover:scale-110 ${
                    visibleSection === "home"
                      ? "rotate-45 scale-110"
                      : "rotate-0 scale-100"
                  }`}
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0
              0 24 24"
                >
                  {/* Fill */}
                  <path
                    className={`fill-current origin-center transform transition duration-200 ease-in-out group-hover:text-dark dark:group-hover:text-white group-hover:rotate-90 ${
                      visibleSection === "home"
                        ? "dark:text-white text-mid rotate-90"
                        : "dark:text-dark text-light rotate-0"
                    }`}
                    d="M5.64 5.64h12.73v12.73H5.64z"
                  />
                  {/* Border */}
                  <path
                    className={`fill-current origin-center transform transition duration-500 ease-in-out dark:group-hover:text-white group-hover:text-dark group-hover:rotate-45 group-hover:opacity-100 ${
                      visibleSection === "home"
                        ? "dark:text-white text-dark rotate-45 opacity-100"
                        : "dark:text-white text-light rotate-45"
                    }`}
                    d="M12 22.41L1.59 12 12 1.59 22.41 12zM4.41 12L12 19.59 19.59 12 12 4.41z"
                  />
                </svg>
              </button>
              {/* About - Diamond 2 */}
              <button
                className="w-5 h-5 mb-4"
                onClick={() => {
                  scrollTo(aboutRef.current);
                }}
              >
                <svg
                  id="e5c888e5-3206-4553-8f53-60ee93248ad9"
                  className={`group rounded-sm transform  transition duration-500 ease-in-out hover:rotate-45 hover:scale-110 ${
                    visibleSection === "about"
                      ? "rotate-45 scale-110"
                      : "rotate-0 scale-100"
                  }`}
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0
              0 24 24"
                >
                  {/* Fill */}
                  <path
                    className={`fill-current origin-center transform transition duration-200 ease-in-out group-hover:text-dark dark:group-hover:text-white group-hover:rotate-90 ${
                      visibleSection === "about"
                        ? "dark:text-white text-mid rotate-90"
                        : "dark:text-dark text-light rotate-0"
                    }`}
                    d="M5.64 5.64h12.73v12.73H5.64z"
                  />
                  {/* Border */}
                  <path
                    className={`fill-current origin-center transform transition duration-500 ease-in-out dark:group-hover:text-white group-hover:text-dark group-hover:rotate-45 group-hover:opacity-100 ${
                      visibleSection === "about"
                        ? "dark:text-white text-dark rotate-45 opacity-100"
                        : "dark:text-white text-light rotate-45"
                    }`}
                    d="M12 22.41L1.59 12 12 1.59 22.41 12zM4.41 12L12 19.59 19.59 12 12 4.41z"
                  />
                </svg>
              </button>
              {/* Skills - Diamond 3 */}
              <button
                className="w-5 h-5 mb-4"
                onClick={() => {
                  scrollTo(skillsRef.current);
                }}
              >
                <svg
                  id="e5c888e5-3206-4553-8f53-60ee93248ad9"
                  className={`group rounded-sm transform  transition duration-500 ease-in-out hover:rotate-45 hover:scale-110 ${
                    visibleSection === "skills"
                      ? "rotate-45 scale-110"
                      : "rotate-0 scale-100"
                  }`}
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0
              0 24 24"
                >
                  {/* Fill */}
                  <path
                    className={`fill-current origin-center transform transition duration-200 ease-in-out group-hover:text-dark dark:group-hover:text-white group-hover:rotate-90 ${
                      visibleSection === "skills"
                        ? "dark:text-white text-mid rotate-90"
                        : "dark:text-dark text-light rotate-0"
                    }`}
                    d="M5.64 5.64h12.73v12.73H5.64z"
                  />
                  {/* Border */}
                  <path
                    className={`fill-current origin-center transform transition duration-500 ease-in-out dark:group-hover:text-white group-hover:text-dark group-hover:rotate-45 group-hover:opacity-100 ${
                      visibleSection === "skills"
                        ? "dark:text-white text-dark rotate-45 opacity-100"
                        : "dark:text-white text-light rotate-45"
                    }`}
                    d="M12 22.41L1.59 12 12 1.59 22.41 12zM4.41 12L12 19.59 19.59 12 12 4.41z"
                  />
                </svg>
              </button>
              {/* My Work - Diamond 4 */}
              <button
                className="w-5 h-5 mb-4"
                onClick={() => {
                  scrollTo(myWorkRef.current);
                }}
              >
                <svg
                  id="e5c888e5-3206-4553-8f53-60ee93248ad9"
                  className={`group rounded-sm transform transition duration-500 ease-in-out hover:rotate-45 hover:scale-110 ${
                    visibleSection === "my-work"
                      ? "rotate-45 scale-110"
                      : "rotate-0 scale-100"
                  }`}
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0
              0 24 24"
                >
                  {/* Fill */}
                  <path
                    className={`fill-current origin-center transform transition duration-200 ease-in-out group-hover:text-dark dark:group-hover:text-white group-hover:rotate-90 ${
                      visibleSection === "my-work"
                        ? "dark:text-white text-mid rotate-90"
                        : "dark:text-dark text-light rotate-0"
                    }`}
                    d="M5.64 5.64h12.73v12.73H5.64z"
                  />
                  {/* Border */}
                  <path
                    className={`fill-current origin-center transform transition duration-500 ease-in-out dark:group-hover:text-white group-hover:text-dark group-hover:rotate-45 group-hover:opacity-100 ${
                      visibleSection === "my-work"
                        ? "dark:text-white text-dark rotate-45 opacity-100"
                        : "dark:text-white text-light rotate-45"
                    }`}
                    d="M12 22.41L1.59 12 12 1.59 22.41 12zM4.41 12L12 19.59 19.59 12 12 4.41z"
                  />
                </svg>
              </button>
              {/* Blog - Diamond 5 */}
              <button
                className="w-5 h-5 mb-4"
                onClick={() => {
                  scrollTo(blogRef.current);
                }}
              >
                <svg
                  id="e5c888e5-3206-4553-8f53-60ee93248ad9"
                  className={`group rounded-sm transform transition duration-500 ease-in-out hover:rotate-45 hover:scale-110 ${
                    visibleSection === "blog"
                      ? "rotate-45 scale-110"
                      : "rotate-0 scale-100"
                  }`}
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0
              0 24 24"
                >
                  {/* Fill */}
                  <path
                    className={`fill-current origin-center transform transition duration-200 ease-in-out group-hover:text-dark dark:group-hover:text-white group-hover:rotate-90 ${
                      visibleSection === "blog"
                        ? "dark:text-white text-mid rotate-90"
                        : "dark:text-dark text-light rotate-0"
                    }`}
                    d="M5.64 5.64h12.73v12.73H5.64z"
                  />
                  {/* Border */}
                  <path
                    className={`fill-current origin-center transform transition duration-500 ease-in-out dark:group-hover:text-white group-hover:text-dark group-hover:rotate-45 group-hover:opacity-100 ${
                      visibleSection === "blog"
                        ? "dark:text-white text-dark rotate-45 opacity-100"
                        : "dark:text-white text-light rotate-45"
                    }`}
                    d="M12 22.41L1.59 12 12 1.59 22.41 12zM4.41 12L12 19.59 19.59 12 12 4.41z"
                  />
                </svg>
              </button>
              {/* Contact - Diamond 6 */}
              <button
                className="w-5 h-5 mb-4"
                onClick={() => {
                  scrollTo(contactRef.current);
                }}
              >
                <svg
                  id="e5c888e5-3206-4553-8f53-60ee93248ad9"
                  className={`group rounded-sm transform  transition duration-500 ease-in-out hover:rotate-45 hover:scale-110 ${
                    visibleSection === "contact"
                      ? "rotate-45 scale-110"
                      : "rotate-0 scale-100"
                  }`}
                  data-name="Layer 1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0
              0 24 24"
                >
                  {/* Fill */}
                  <path
                    className={`fill-current origin-center transform transition duration-200 ease-in-out group-hover:text-dark dark:group-hover:text-white group-hover:rotate-90 ${
                      visibleSection === "contact"
                        ? "dark:text-white text-mid rotate-90"
                        : "dark:text-dark text-light rotate-0"
                    }`}
                    d="M5.64 5.64h12.73v12.73H5.64z"
                  />
                  {/* Border */}
                  <path
                    className={`fill-current origin-center transform transition duration-500 ease-in-out dark:group-hover:text-white group-hover:text-dark group-hover:rotate-45 group-hover:opacity-100 ${
                      visibleSection === "contact"
                        ? "dark:text-white text-dark rotate-45 opacity-100"
                        : "dark:text-white text-light rotate-45"
                    }`}
                    d="M12 22.41L1.59 12 12 1.59 22.41 12zM4.41 12L12 19.59 19.59 12 12 4.41z"
                  />
                </svg>
              </button>

              {/* Line */}
              <div className="w-0.5 dark:bg-white bg-dark h-24 opacity-20 mt-2 z-30"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/**
 * Method used to fetch data from Hashnode.
 * @param {Object} context
 * @returns props
 */
export async function getServerSideProps(context) {
  const res = await fetch("https://api.hashnode.com/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: "c3587989-9b82-4126-b261-7d5333e7bddd",
    },
    body: JSON.stringify({
      query:
        'query {user(username: "devbxtzz") {publication {posts(page: 0) {title brief slug coverImage dateAdded}}}}',
    }),
  });
  const publications = await res.json();

  if (!publications) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      publications,
    },
  };
}
