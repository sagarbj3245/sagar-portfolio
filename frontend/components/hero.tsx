"use client";

import { motion, useReducedMotion, type Variants } from "motion/react";
import { site } from "@/content/site";
import { SocialIcon } from "./social-icons";
import { RotatingText } from "./rotating-text";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
};

const item: Variants = {
  hidden: { opacity: 0, y: 24 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero() {
  const reduce = useReducedMotion();
  const firstName = site.name.split(" ")[0];
  const city = site.location.split(",")[0];

  return (
    <section id="top" className="mx-auto max-w-5xl px-6 pb-24 pt-24 sm:pt-32">
      <motion.div
        variants={container}
        initial={reduce ? false : "hidden"}
        animate="show"
        className="flex flex-col"
      >
        <motion.p
          variants={item}
          className="flex items-center gap-3 text-sm uppercase tracking-[0.2em] text-accent"
        >
          <span className="h-px w-8 bg-accent" aria-hidden />
          Hello World
        </motion.p>

        <h1 className="mt-6 max-w-4xl font-serif text-5xl leading-[1.08] text-foreground sm:text-6xl md:text-7xl">
          I am {firstName}, an{" "}
          <span className="text-accent">{site.role}</span> based in{" "}
          <span className="text-accent">{city}</span>.
        </h1>

        <motion.p variants={item} className="mt-8 text-lg text-muted">
          Currently building{" "}
          <RotatingText words={site.building} className="font-medium text-accent" />
        </motion.p>

        <motion.nav
          variants={item}
          aria-label="Social links"
          className="mt-10 flex flex-wrap items-center gap-3"
        >
          {site.socials.map((s) => (
            <a
              key={s.href}
              href={s.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={s.label}
              className="flex h-10 w-10 items-center justify-center rounded-full border border-border text-muted transition-colors hover:border-accent hover:text-accent"
            >
              <SocialIcon label={s.label} className="h-[18px] w-[18px]" />
            </a>
          ))}
        </motion.nav>

        <motion.a
          variants={item}
          href="#about"
          aria-label="Scroll to About"
          className="mt-16 inline-flex w-fit items-center gap-2 text-sm text-muted transition-colors hover:text-foreground"
        >
          <span>Scroll down</span>
          <motion.span
            aria-hidden
            animate={reduce ? undefined : { y: [0, 5, 0] }}
            transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
          >
            ↓
          </motion.span>
        </motion.a>
      </motion.div>
    </section>
  );
}
