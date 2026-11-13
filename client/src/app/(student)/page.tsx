"use client";

import { useState, useEffect, useMemo } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useCourses } from "@/hooks/useCourses";
import { useAuth } from "@/hooks/useAuth";
import { CourseCard } from "@/components/course/CourseCard";
import { CourseCardSkeleton } from "@/components/course/CourseCardSkeleton";
import { ErrorMessage } from "@/components/ui/ErrorMessage";
import { Button } from "@/components/ui/Button";
import { PageTransition } from "@/components/layout/PageTransition";
import { Course } from "@/types";

const FEATURED_TARGET_REGEXES = [
  /docker/i,
  /redis/i,
  /mern/i,
  /postgresql/i,
  /express.*mvc|mvc.*express/i,
  /node.*backend|backend.*node/i,
];

export default function LandingPage() {
  const { courses, isLoading, error, refetch } = useCourses();
  const { admin, isAuthenticated } = useAuth();
  const shouldReduceMotion = useReducedMotion();
  const coursesHref = admin ? "/admin" : isAuthenticated ? "/courses" : "/login?redirect=/courses";

  const featuredCourses = useMemo(() => {
    if (!courses || courses.length === 0) return [];
    const matched: Course[] = [];
    const usedIds = new Set<string>();

    FEATURED_TARGET_REGEXES.forEach((regex) => {
      const found = courses.find((c) => !usedIds.has(c._id) && regex.test(c.title));
      if (found) {
        matched.push(found);
        usedIds.add(found._id);
      }
    });

    courses.forEach((c) => {
      if (matched.length < 6 && !usedIds.has(c._id)) {
        matched.push(c);
        usedIds.add(c._id);
      }
    });

    return matched.slice(0, 6);
  }, [courses]);

  const [visibleCount, setVisibleCount] = useState(3);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    function updateVisible() {
      if (typeof window === "undefined") return;
      if (window.innerWidth < 640) {
        setVisibleCount(1);
      } else if (window.innerWidth < 1024) {
        setVisibleCount(2);
      } else {
        setVisibleCount(3);
      }
    }
    updateVisible();
    window.addEventListener("resize", updateVisible);
    return () => window.removeEventListener("resize", updateVisible);
  }, []);

  const maxIndex = Math.max(0, featuredCourses.length - visibleCount);

  useEffect(() => {
    if (featuredCourses.length <= visibleCount || isPaused) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
    }, 3000);

    return () => clearInterval(interval);
  }, [featuredCourses.length, visibleCount, maxIndex, isPaused]);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const heroContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.05,
      },
    },
  };

  const heroItemVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.45,
        ease: [0.25, 0.1, 0.25, 1] as const,
      },
    },
  };

  const sectionVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut" as const,
      },
    },
  };

  const cardHoverProps = shouldReduceMotion
    ? {}
    : {
        whileHover: { y: -3 },
        transition: { duration: 0.18 },
      };

  return (
    <PageTransition>
      <div className="space-y-16 sm:space-y-24 pb-8">
        <motion.section
          variants={heroContainerVariants}
          initial="hidden"
          animate="visible"
          className="text-center max-w-3xl mx-auto pt-6 sm:pt-12 space-y-6"
        >
          <motion.div variants={heroItemVariants} className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-3 py-1 text-xs font-medium text-muted shadow-sm">
            <span className="flex h-2 w-2 rounded-full bg-primary" />
            <span>Modern Learning Management Platform</span>
          </motion.div>

          <motion.h1
            variants={heroItemVariants}
            className="text-3xl sm:text-5xl font-extrabold tracking-tight text-ink leading-tight"
          >
            Master In-Demand Tech Skills at Your Own Pace
          </motion.h1>

          <motion.p
            variants={heroItemVariants}
            className="text-base sm:text-lg text-muted max-w-2xl mx-auto leading-relaxed"
          >
            Concise, modular video courses crafted for modern developers. Distraction-free learning
            designed to help you build real-world software.
          </motion.p>

          <motion.div variants={heroItemVariants} className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link href={coursesHref} className="cursor-pointer">
              <Button size="lg" variant="primary" className="cursor-pointer">
                Browse Courses →
              </Button>
            </Link>
          </motion.div>

          <motion.div
            variants={heroItemVariants}
            className="pt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 border-t border-border text-left"
          >
            <div className="p-3 rounded-lg hover:bg-slate-50/60 transition-colors">
              <h4 className="text-sm font-semibold text-ink">Self-Paced Videos</h4>
              <p className="mt-0.5 text-xs text-muted">
                Learn whenever you want with responsive playback.
              </p>
            </div>
            <div className="p-3 rounded-lg hover:bg-slate-50/60 transition-colors">
              <h4 className="text-sm font-semibold text-ink">Curated Curriculum</h4>
              <p className="mt-0.5 text-xs text-muted">
                Structured chapters designed from fundamentals to depth.
              </p>
            </div>
            <div className="p-3 rounded-lg hover:bg-slate-50/60 transition-colors">
              <h4 className="text-sm font-semibold text-ink">Distraction-Free</h4>
              <p className="mt-0.5 text-xs text-muted">
                Minimal, calm interface focused entirely on education.
              </p>
            </div>
          </motion.div>
        </motion.section>

        <motion.section
          id="featured-courses"
          variants={sectionVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="rounded-2xl border border-border bg-surface p-5 sm:p-8 md:p-12 shadow-sm space-y-6 sm:space-y-8 scroll-mt-24"
        >
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Our Top Picks
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink">
              Featured Courses
            </h2>
            <p className="text-sm text-muted">
              {!isAuthenticated
                ? "Explore top courses below. Sign in to view full lecture playlists and details."
                : "Pick up your next module from our top recommended curriculum."}
            </p>
          </div>

          {isLoading && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3].map((number) => (
                <CourseCardSkeleton key={number} />
              ))}
            </div>
          )}

          {!isLoading && error && (
            <div className="py-6">
              <ErrorMessage message={error} onRetry={refetch} />
            </div>
          )}

          {!isLoading && !error && courses.length === 0 && (
            <div className="rounded-lg border border-border bg-surface p-8 text-center text-sm text-muted">
              Courses are currently being updated. Please check back soon!
            </div>
          )}

          {!isLoading && !error && featuredCourses.length > 0 && (
            <div className="space-y-6">
              <div
                className="relative overflow-hidden py-1"
                onMouseEnter={() => setIsPaused(true)}
                onMouseLeave={() => setIsPaused(false)}
              >
                <motion.div
                  className="flex -mx-3"
                  animate={{
                    x: `-${currentIndex * (100 / visibleCount)}%`,
                  }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 0.6,
                    ease: [0.25, 1, 0.5, 1],
                  }}
                >
                  {featuredCourses.map((course) => (
                    <div
                      key={course._id}
                      className="w-full sm:w-1/2 lg:w-1/3 shrink-0 px-3"
                    >
                      <CourseCard course={course} />
                    </div>
                  ))}
                </motion.div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-4 border-t border-border/60">
                <div className="flex items-center justify-between sm:justify-start gap-4">
                  <div className="flex items-center gap-1.5">
                    <button
                      type="button"
                      onClick={handlePrev}
                      aria-label="Previous slide"
                      className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface text-ink hover:bg-slate-100 hover:text-primary transition-colors cursor-pointer"
                    >
                      ←
                    </button>
                    <button
                      type="button"
                      onClick={handleNext}
                      aria-label="Next slide"
                      className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface text-ink hover:bg-slate-100 hover:text-primary transition-colors cursor-pointer"
                    >
                      →
                    </button>
                  </div>

                  <div className="flex items-center gap-1.5">
                    {Array.from({ length: maxIndex + 1 }).map((_, idx) => (
                      <button
                        key={idx}
                        type="button"
                        onClick={() => setCurrentIndex(idx)}
                        aria-label={`Go to slide ${idx + 1}`}
                        className={`h-2 rounded-full transition-all cursor-pointer ${
                          currentIndex === idx
                            ? "w-6 bg-primary"
                            : "w-2 bg-slate-300 hover:bg-slate-400"
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <div className="w-full sm:w-auto">
                  <Link href={coursesHref} className="cursor-pointer block w-full sm:inline-block">
                    <Button variant="primary" size="md" className="cursor-pointer w-full sm:w-auto">
                      Explore All Courses →
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </motion.section>

        <motion.section
          id="about"
          variants={sectionVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="rounded-2xl border border-border bg-surface p-8 sm:p-12 shadow-sm scroll-mt-24"
        >
          <div className="text-center max-w-xl mx-auto space-y-2 mb-8">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Core Platform Highlights
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink">
              Engineered for Deep Focus
            </h2>
            <p className="text-sm text-muted">
              Built from the ground up to minimize friction and maximize technical understanding.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <motion.div {...cardHoverProps} className="p-5 rounded-lg border border-border bg-background space-y-2 transition-colors hover:border-primary/40">
              <div className="text-2xl font-bold text-primary">100%</div>
              <h3 className="text-sm font-semibold text-ink">Practical Curriculum</h3>
              <p className="text-xs text-muted leading-relaxed">
                Every course is focused on real industry technologies, frameworks, and deployment patterns.
              </p>
            </motion.div>

            <motion.div {...cardHoverProps} className="p-5 rounded-lg border border-border bg-background space-y-2 transition-colors hover:border-primary/40">
              <div className="text-2xl font-bold text-primary">HD</div>
              <h3 className="text-sm font-semibold text-ink">Responsive Video Player</h3>
              <p className="text-xs text-muted leading-relaxed">
                Fast and lightweight video playback with seamless next and previous chapter navigation.
              </p>
            </motion.div>

            <motion.div {...cardHoverProps} className="p-5 rounded-lg border border-border bg-background space-y-2 transition-colors hover:border-primary/40">
              <div className="text-2xl font-bold text-primary">Zero</div>
              <h3 className="text-sm font-semibold text-ink">Clutter or Ads</h3>
              <p className="text-xs text-muted leading-relaxed">
                No marketing popups or gamified distractions. Clean code and clean pedagogy.
              </p>
            </motion.div>

            <motion.div {...cardHoverProps} className="p-5 rounded-lg border border-border bg-background space-y-2 transition-colors hover:border-primary/40">
              <div className="text-2xl font-bold text-primary">24/7</div>
              <h3 className="text-sm font-semibold text-ink">On-Demand Access</h3>
              <p className="text-xs text-muted leading-relaxed">
                Revisit any lecture at your own pace from your desktop, tablet, or mobile phone.
              </p>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          id="benefits"
          variants={sectionVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="space-y-8 scroll-mt-24"
        >
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Why Learn With Us
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink">
              Built for High-Retention Learning
            </h2>
            <p className="text-sm text-muted">
              Everything you need to master new concepts systematically.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 pt-2">
            <motion.div {...cardHoverProps} className="p-6 rounded-lg border border-border bg-surface shadow-sm space-y-3 transition-colors hover:border-primary/40">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary-soft text-primary font-bold text-base">
                01
              </div>
              <h3 className="text-base font-semibold text-ink">Modular Chapter Design</h3>
              <p className="text-xs text-muted leading-relaxed">
                Bite-sized video lessons organized logically. Pick up right where you left off without getting lost.
              </p>
            </motion.div>

            <motion.div {...cardHoverProps} className="p-6 rounded-lg border border-border bg-surface shadow-sm space-y-3 transition-colors hover:border-primary/40">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary-soft text-primary font-bold text-base">
                02
              </div>
              <h3 className="text-base font-semibold text-ink">Clean Student Experience</h3>
              <p className="text-xs text-muted leading-relaxed">
                Enjoy a calm, minimal aesthetic designed to prevent cognitive overload during complex programming tasks.
              </p>
            </motion.div>

            <motion.div {...cardHoverProps} className="p-6 rounded-lg border border-border bg-surface shadow-sm space-y-3 transition-colors hover:border-primary/40">
              <div className="flex h-10 w-10 items-center justify-center rounded-md bg-primary-soft text-primary font-bold text-base">
                03
              </div>
              <h3 className="text-base font-semibold text-ink">Seamless Navigation</h3>
              <p className="text-xs text-muted leading-relaxed">
                Dedicated courses directory, fast course search, and instant access to video playlists.
              </p>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          id="get-started"
          variants={sectionVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="space-y-8 scroll-mt-24"
        >
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-primary">
              Getting Started
            </span>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-ink">
              How the Platform Works
            </h2>
            <p className="text-sm text-muted">
              Get up and running with your coursework in three straightforward steps.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
            <motion.div {...cardHoverProps} className="relative rounded-lg border border-border bg-surface p-6 shadow-sm space-y-3 transition-colors hover:border-primary/40">
              <span className="text-xs font-bold text-primary">STEP 01</span>
              <h3 className="text-lg font-semibold text-ink">Explore Course Library</h3>
              <p className="text-xs text-muted leading-relaxed">
                Visit the separate Courses catalog to preview upcoming courses, thumbnails, and subject areas.
              </p>
              <Link href={coursesHref} className="inline-block pt-1 text-xs font-medium text-primary hover:underline">
                View course catalog →
              </Link>
            </motion.div>

            <motion.div {...cardHoverProps} className="relative rounded-lg border border-border bg-surface p-6 shadow-sm space-y-3 transition-colors hover:border-primary/40">
              <span className="text-xs font-bold text-primary">STEP 02</span>
              <h3 className="text-lg font-semibold text-ink">Sign In to Unlock</h3>
              <p className="text-xs text-muted leading-relaxed">
                Log in or create a student account in seconds to unlock complete lecture listings, descriptions, and videos.
              </p>
              {!isAuthenticated && (
                <Link href="/login" className="inline-block pt-1 text-xs font-medium text-primary hover:underline">
                  Create free account →
                </Link>
              )}
            </motion.div>

            <motion.div {...cardHoverProps} className="relative rounded-lg border border-border bg-surface p-6 shadow-sm space-y-3 transition-colors hover:border-primary/40">
              <span className="text-xs font-bold text-primary">STEP 03</span>
              <h3 className="text-lg font-semibold text-ink">Watch and Build</h3>
              <p className="text-xs text-muted leading-relaxed">
                Enjoy seamless video lessons with sequential next/previous lecture switching on any device.
              </p>
            </motion.div>
          </div>
        </motion.section>

        <motion.section
          variants={sectionVariants}
          initial={shouldReduceMotion ? false : "hidden"}
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
          className="rounded-2xl border border-primary/20 bg-primary-soft p-8 sm:p-12 text-center space-y-5 shadow-sm"
        >
          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-ink">
            Ready to Explore the Catalog?
          </h2>
          <p className="text-sm sm:text-base text-slate-700 max-w-xl mx-auto leading-relaxed">
            Discover full course overviews, interactive lecture playlists, and project tutorials
            on our dedicated courses page.
          </p>
          <div className="pt-2 flex flex-wrap justify-center gap-3">
            <Link href={coursesHref} className="cursor-pointer">
              <Button size="lg" variant="primary" className="cursor-pointer">
                Explore All Courses
              </Button>
            </Link>
            {!isAuthenticated && (
              <Link href="/login" className="cursor-pointer">
                <Button size="lg" variant="secondary" className="cursor-pointer">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </motion.section>
      </div>
    </PageTransition>
  );
}
