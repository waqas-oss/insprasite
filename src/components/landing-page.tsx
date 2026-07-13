"use client";

import type { FormEvent, ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import Hls from "hls.js";
import type { LucideIcon } from "lucide-react";
import {
  Activity as ActivityIcon,
  ArrowUpRight,
  ArrowRight,
  BadgeCheck,
  BarChart3,
  Bot,
  Building2,
  CalendarCheck,
  CheckCircle2,
  ChevronDown,
  CircleHelp,
  CircleDollarSign,
  Cpu,
  Globe,
  Headphones,
  Home,
  Layers3,
  LockKeyhole,
  Mail,
  Menu,
  MessageCircle,
  MessagesSquare,
  Moon,
  MousePointer2,
  MoveUpRight,
  Network,
  PhoneForwarded,
  PhoneCall,
  Plug,
  Quote,
  Radar,
  Scale,
  Send,
  Share2,
  Sparkles,
  Star,
  Stethoscope,
  Store,
  Sun,
  TrendingUp,
  UserCheck,
  Workflow,
  Wrench,
  X,
  Zap,
} from "lucide-react";

type CardItem = {
  title: string;
  description: string;
  icon: LucideIcon;
};

type StatItem = {
  value: number;
  suffix: string;
  label: string;
  description: string;
};

type Theme = "light" | "dark";

const THEME_STORAGE_KEY = "inspra-theme";

const navItems = [
  { label: "Home", href: "#home" },
  { label: "Services", href: "#services" },
  { label: "Industries", href: "#industries" },
  { label: "Features", href: "#features" },
  { label: "FAQ", href: "#faq" },
  { label: "Contact", href: "#contact" },
];

const services: CardItem[] = [
  {
    title: "AI Voice Agents",
    description:
      "Natural voice agents that answer calls, capture intent, and keep conversations moving around the clock.",
    icon: PhoneCall,
  },
  {
    title: "Customer Support Automation",
    description:
      "Resolve repetitive requests, route complex issues, and give every customer a faster first response.",
    icon: Headphones,
  },
  {
    title: "Sales Assistant",
    description:
      "Qualify buyers, handle objections, and surface the best opportunities for your team to close.",
    icon: CircleDollarSign,
  },
  {
    title: "Appointment Scheduler",
    description:
      "Book, reschedule, and confirm appointments with polished conversations that reduce no-shows.",
    icon: CalendarCheck,
  },
  {
    title: "AI Chatbot",
    description:
      "Offer instant website help with branded chat flows that collect leads and answer common questions.",
    icon: MessagesSquare,
  },
  {
    title: "CRM Integration",
    description:
      "Sync contacts, notes, outcomes, and follow-up tasks into the systems your team already uses.",
    icon: Plug,
  },
];

const industries: CardItem[] = [
  {
    title: "Real Estate",
    description:
      "Capture buyer and seller inquiries, qualify leads, and schedule showings without missing calls.",
    icon: Home,
  },
  {
    title: "Legal Services",
    description:
      "Intake new matters, collect case context, and route urgent requests with professional precision.",
    icon: Scale,
  },
  {
    title: "Dental Clinics",
    description:
      "Manage appointment requests, insurance questions, reminders, and after-hours patient calls.",
    icon: Stethoscope,
  },
  {
    title: "Plumbing Services",
    description:
      "Prioritize emergency calls, confirm locations, and dispatch jobs before competitors respond.",
    icon: Wrench,
  },
  {
    title: "Small Businesses",
    description:
      "Give lean teams a reliable front desk for calls, leads, bookings, and customer follow-ups.",
    icon: Store,
  },
];

const stats: StatItem[] = [
  {
    value: 24,
    suffix: "/7",
    label: "Availability",
    description: "Always-on coverage for calls, chats, and lead capture.",
  },
  {
    value: 10,
    suffix: "K+",
    label: "Calls Managed",
    description: "High-volume automation designed for growing teams.",
  },
  {
    value: 95,
    suffix: "%",
    label: "Faster Response",
    description: "Instant first touch for prospects and customers.",
  },
  {
    value: 80,
    suffix: "%",
    label: "Reduced Manual Work",
    description: "Less repetitive admin, more time for revenue work.",
  },
];

const features: CardItem[] = [
  {
    title: "Smart Dashboard",
    description:
      "Track conversations, outcomes, and automation performance in one calm operating view.",
    icon: BarChart3,
  },
  {
    title: "Call Summaries",
    description:
      "Turn every conversation into clean notes, action items, sentiment, and searchable context.",
    icon: ActivityIcon,
  },
  {
    title: "Lead Qualification",
    description:
      "Score inquiries by fit, urgency, budget, and next best action before your team steps in.",
    icon: UserCheck,
  },
  {
    title: "CRM Sync",
    description:
      "Move qualified leads, call logs, and task updates into your CRM without double entry.",
    icon: Building2,
  },
  {
    title: "Automated Follow-ups",
    description:
      "Trigger reminders, confirmations, and nurturing sequences from conversation outcomes.",
    icon: Zap,
  },
  {
    title: "Website Chatbot",
    description:
      "Guide visitors toward answers, demos, estimates, and booked appointments in real time.",
    icon: Bot,
  },
];

const platformPillars: CardItem[] = [
  {
    title: "Enterprise-grade reliability",
    description:
      "Redundant workflows, clear escalation paths, and human handoff controls for critical customer moments.",
    icon: LockKeyhole,
  },
  {
    title: "Operational intelligence",
    description:
      "Conversation data turns into summaries, lead signals, sentiment trends, and team-ready next steps.",
    icon: Cpu,
  },
  {
    title: "Revenue workflow automation",
    description:
      "AI captures demand, qualifies opportunities, updates systems, and triggers follow-ups automatically.",
    icon: Workflow,
  },
];

const testimonials = [
  {
    quote:
      "Inspra.ai gave our team a front desk that never misses a lead. The experience feels polished enough for high-value clients.",
    name: "Maya Sterling",
    role: "Managing Partner, Sterling Realty",
    company: "Sterling Realty",
    avatar: "MS",
  },
  {
    quote:
      "We cut our first-response time from hours to seconds, and the call summaries are clean enough to drop straight into our CRM.",
    name: "Daniel Cho",
    role: "Operations Director, Northline Dental",
    company: "Northline Dental",
    avatar: "DC",
  },
  {
    quote:
      "The voice agent sounds professional, asks the right questions, and hands our team qualified opportunities instead of noise.",
    name: "Avery Patel",
    role: "Founder, FlowFix Services",
    company: "FlowFix Services",
    avatar: "AP",
  },
];

const faqs = [
  {
    question: "Is this a real chat or backend-enabled product?",
    answer:
      "This landing page is frontend-only. The chat widget is a polished visual lead form with local confirmation behavior and no backend submission.",
  },
  {
    question: "What types of businesses can use Inspra.ai?",
    answer:
      "The page highlights real estate, legal, dental, plumbing, and small business workflows, but the same automation model can fit most service teams.",
  },
  {
    question: "Can it connect to a CRM?",
    answer:
      "The website presents CRM sync as a service capability. In this frontend-only version, CRM integration is represented visually without live API calls.",
  },
  {
    question: "What makes the experience premium?",
    answer:
      "The interface uses motion, layered glass surfaces, responsive cards, clean typography, dashboard-style visuals, and subtle micro-interactions throughout.",
  },
];

const businessTypes = [
  "Real Estate",
  "Legal Services",
  "Dental Clinic",
  "Home Services",
  "Small Business",
  "Other",
];

export function LandingPage() {
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    const savedTheme = window.localStorage.getItem(THEME_STORAGE_KEY);
    if (savedTheme === "dark" || savedTheme === "light") {
      const frame = window.requestAnimationFrame(() => setTheme(savedTheme));
      return () => window.cancelAnimationFrame(frame);
    }
  }, []);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === "dark" ? "light" : "dark";
    setTheme(nextTheme);
    window.localStorage.setItem(THEME_STORAGE_KEY, nextTheme);
  };

  return (
    <main
      data-theme={theme}
      className="theme-scope min-h-screen overflow-hidden bg-[#f7fbff] font-sans text-[#07172f]"
    >
      <Navbar onThemeToggle={toggleTheme} theme={theme} />
      <HeroSection />
      <BenefitsSection />
      <ServicesSection />
      <IndustriesSection />
      <StatsSection />
      <FeaturesSection />
      <TestimonialsSection />
      <FaqSection />
      <CtaSection />
      <Footer />
      <ChatWidget />
    </main>
  );
}

function HeroSection() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const src =
      "https://stream.mux.com/8wrHPCX2dC3msyYU9ObwqNdm00u3ViXvOSHUMRYSEe5Q.m3u8";

    if (Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(src);
      hls.attachMedia(video);
      return () => hls.destroy();
    }

    if (video.canPlayType("application/vnd.apple.mpegurl")) {
      video.src = src;
    }
  }, []);

  return (
    <section
      id="home"
      className="relative flex min-h-[720px] overflow-hidden bg-[#07172f] px-6 pt-36 pb-20 text-center text-white sm:min-h-screen sm:pt-40 md:px-16 lg:px-24"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_50%_10%,rgba(108,231,215,0.26),transparent_35%),radial-gradient(circle_at_82%_58%,rgba(30,58,138,0.36),transparent_34%),linear-gradient(180deg,#07172f_0%,#0f172a_58%,#eef8ff_100%)]"
      />
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        aria-hidden="true"
        className="absolute inset-0 z-[1] h-full w-full object-cover opacity-75"
      />
      <div
        aria-hidden="true"
        className="hero-fade-top pointer-events-none absolute top-0 right-0 left-0 z-[2] h-[200px] bg-[linear-gradient(to_bottom,rgba(7,23,47,0.72),transparent)]"
      />
      <div
        aria-hidden="true"
        className="hero-fade-bottom pointer-events-none absolute right-0 bottom-0 left-0 z-[2] h-[220px] bg-[linear-gradient(to_top,#000,transparent)]"
      />
      <div
        aria-hidden="true"
        className="hero-scrim absolute inset-0 z-[2] bg-[#07172f]/[0.42]"
      />
      <div
        aria-hidden="true"
        className="hero-lighting absolute inset-0 z-[2] bg-[radial-gradient(circle_at_50%_12%,rgba(108,231,215,0.24),transparent_44%),linear-gradient(180deg,rgba(238,248,255,0.08),rgba(7,23,47,0.34))]"
      />
      <motion.div
        aria-hidden="true"
        className="absolute top-28 left-[8%] z-[3] h-40 w-40 rounded-full bg-[#6ce7d7]/[0.18] blur-3xl md:h-56 md:w-56"
        animate={
          shouldReduceMotion
            ? undefined
            : { x: [0, 28, -12, 0], y: [0, -22, 16, 0], scale: [1, 1.08, 0.96, 1] }
        }
        transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute right-[10%] bottom-32 z-[3] h-48 w-48 rounded-full bg-[#1e3a8a]/[0.24] blur-3xl md:h-64 md:w-64"
        animate={
          shouldReduceMotion
            ? undefined
            : { x: [0, -24, 18, 0], y: [0, 18, -18, 0], scale: [1, 0.95, 1.08, 1] }
        }
        transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 z-[3] h-px w-[min(720px,80vw)] -translate-x-1/2 bg-[linear-gradient(90deg,transparent,rgba(108,231,215,0.48),transparent)]"
        animate={
          shouldReduceMotion
            ? undefined
            : { opacity: [0.18, 0.55, 0.18], scaleX: [0.82, 1, 0.82] }
        }
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
      />

      <div className="relative z-10 mx-auto flex w-full max-w-6xl flex-col justify-center">
        <motion.div
          className="hero-glass-panel mx-auto max-w-4xl px-5 py-8 sm:px-8 sm:py-10 md:px-12"
          initial={shouldReduceMotion ? false : { opacity: 0, y: 32, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
        >
          <motion.h1
            className="font-hero mx-auto mb-5 max-w-3xl text-center text-4xl leading-[1.03] font-extrabold text-balance text-white [letter-spacing:0] sm:text-5xl md:text-6xl lg:text-7xl"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            Transform Your Business with AI Voice Agents
          </motion.h1>
          <motion.p
            className="font-body mx-auto mb-8 max-w-2xl text-center text-sm leading-7 font-light text-white/[0.78] md:text-base"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.24, ease: [0.22, 1, 0.36, 1] }}
          >
            Inspra.ai helps businesses automate inbound and outbound calls,
            qualify leads, schedule appointments, and provide 24/7 customer
            support using intelligent AI voice agents.
          </motion.p>
          <motion.div
            className="flex flex-wrap items-center justify-center gap-4 sm:gap-6"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.72, delay: 0.36, ease: [0.22, 1, 0.36, 1] }}
          >
            <motion.a
              href="#contact"
              className="liquid-glass-strong font-body flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-white shadow-[0_0_30px_rgba(108,231,215,0.14)] transition-all hover:bg-white/10"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Book a Demo
              <ArrowUpRight className="h-5 w-5" aria-hidden="true" />
            </motion.a>
            <motion.a
              href="#services"
              className="font-body flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-medium text-black shadow-[0_18px_44px_rgba(0,0,0,0.22)] transition-colors hover:bg-white/90"
              whileHover={{ scale: 1.04, y: -2 }}
              whileTap={{ scale: 0.98 }}
            >
              Explore Solutions
              <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
            </motion.a>
          </motion.div>
        </motion.div>

        <div className="mt-24 flex flex-col items-center justify-between gap-4 border-t border-white/10 pt-8 md:mt-32 md:flex-row">
          <p className="font-body text-xs font-light text-white/40">
            &copy; 2026 Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-6">
            {["Privacy", "Terms", "Contact"].map((link) => (
              <a
                key={link}
                href="#contact"
                className="font-body text-xs font-light text-white/40 transition-colors hover:text-white/70"
              >
                {link}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function BenefitsSection() {
  return (
    <section className="relative w-full bg-black px-4 py-12 text-white sm:px-6 sm:py-20 md:px-10">
      <div className="mx-auto w-full max-w-[1400px]">
        <h2
          className="mb-12 text-center text-3xl font-light text-white sm:mb-24 sm:text-4xl md:text-5xl"
          style={{ letterSpacing: "-0.04em" }}
        >
          Key Benefits
        </h2>

        <div className="grid grid-cols-1 gap-3 sm:gap-4 md:grid-cols-3">
          <article className="relative h-[380px] overflow-hidden rounded-2xl bg-neutral-950 p-6 sm:h-[460px] sm:p-8">
            <div className="absolute top-1/2 -left-[420px] h-[460px] w-[460px] -translate-y-1/2 rounded-full bg-[#1e3a8a] opacity-40 blur-3xl" />
            <div className="relative z-10 flex h-full flex-col">
              <h3 className="text-xl leading-tight font-light text-white sm:text-2xl">
                Preemptive Risks
                <br />
                Scouting and Reactions
              </h3>
              <p className="mt-12 max-w-[280px] text-[13px] leading-relaxed font-light text-white/70 sm:mt-20 sm:text-[14px]">
                Defense platforms constantly observe bandwidth streams, record
                files, and machine behaviors to uncover unusual patterns or
                outliers that could signal a defensive failure.
              </p>
            </div>
          </article>

          <article className="relative flex h-[380px] flex-col overflow-hidden rounded-2xl bg-neutral-950 sm:h-[460px]">
            <div className="relative w-full overflow-hidden" style={{ height: "75%" }}>
              <video
                className="block h-full w-full object-cover"
                src="https://d8j0ntlcm91z4.cloudfront.net/user_38xzZboKViGWJOttwIXH07lWA1P/hf_20260421_072701_f6a01abb-eb30-4559-9d6e-774362defbc3.mp4"
                autoPlay
                loop
                muted
                playsInline
              />
              <div className="pointer-events-none absolute right-0 bottom-0 left-0 h-32 bg-gradient-to-b from-transparent to-neutral-950" />
            </div>
            <div className="flex flex-1 items-center justify-start p-6 sm:p-8">
              <h3 className="text-left text-xl leading-tight font-light text-white sm:text-2xl">
                Know-how and Sectoral
                <br />
                Awareness
              </h3>
            </div>
          </article>

          <article className="relative h-[380px] overflow-hidden rounded-2xl bg-neutral-950 p-6 sm:h-[460px] sm:p-8">
            <div className="absolute -top-28 -right-28 h-56 w-56 rounded-full bg-[#1e3a8a] opacity-40 blur-3xl" />
            <div className="relative z-10 flex h-full flex-col">
              <h3 className="text-xl leading-tight font-light text-white sm:text-2xl">
                Preemptive Risks
                <br />
                Scouting and Reactions
              </h3>
              <p className="mt-auto max-w-[320px] text-[13px] leading-relaxed font-light text-white/70 sm:text-[14px]">
                Defense platforms constantly observe bandwidth streams, record
                files, and machine behaviors to uncover unusual patterns or
                outliers that could signal a defensive failure.
              </p>
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function Navbar({
  onThemeToggle,
  theme,
}: {
  onThemeToggle: () => void;
  theme: Theme;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const sectionIds = navItems.map((item) => item.href.replace("#", ""));
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 16);

      const currentSection = sectionIds.reduce((current, id) => {
        const section = document.getElementById(id);
        if (!section) return current;
        const sectionTop = section.getBoundingClientRect().top;
        return sectionTop <= 150 ? id : current;
      }, "home");

      setActiveSection(currentSection);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setIsOpen(false);

  return (
    <motion.header
      initial={{ y: -26, opacity: 0, filter: "blur(10px)" }}
      animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
      transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
      className="fixed inset-x-0 top-0 z-40 px-4 pt-4 sm:px-6 lg:px-8"
    >
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between rounded-2xl border px-4 transition-all duration-500 sm:px-5 ${
          isScrolled
            ? "border-white/10 bg-[#111827]/[0.84] py-2 shadow-[0_24px_70px_rgba(0,0,0,0.34)] backdrop-blur-2xl"
            : "border-white/[0.12] bg-[#111827]/[0.64] py-3 shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl"
        }`}
      >
        <a
          href="#home"
          onClick={closeMenu}
          className="group flex items-center gap-3 text-white"
          aria-label="Inspra.ai home"
        >
          <span className="relative flex h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-white/10 text-white shadow-[0_12px_30px_rgba(0,0,0,0.24)] ring-1 ring-white/10 transition group-hover:scale-105 group-hover:shadow-[0_18px_42px_rgba(12,140,150,0.28)]">
            <span className="absolute inset-0 bg-[linear-gradient(135deg,transparent,rgba(108,231,215,0.32),transparent)] opacity-0 transition group-hover:opacity-100" />
            <Sparkles className="relative h-5 w-5 text-[#6ce7d7]" aria-hidden="true" />
          </span>
          <span className="text-lg font-semibold">Inspra.ai</span>
        </a>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {navItems.map((item) => {
            const isActive = activeSection === item.href.replace("#", "");
            return (
              <a
                key={item.href}
                href={item.href}
                className={`premium-nav-link rounded-xl px-4 py-2 text-sm font-medium transition ${
                  isActive
                    ? "bg-white/10 text-white shadow-[inset_0_0_0_1px_rgba(255,255,255,0.08)]"
                    : "text-white/[0.66] hover:text-white"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 md:flex">
          <ThemeToggleButton onToggle={onThemeToggle} theme={theme} />
          <a
            href="#contact"
            className="premium-button premium-button-primary group inline-flex h-11 items-center justify-center gap-2 rounded-lg px-5 text-sm font-semibold text-white"
          >
            Book Demo
            <ArrowRight
              className="h-4 w-4 transition group-hover:translate-x-0.5"
              aria-hidden="true"
            />
          </a>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <ThemeToggleButton onToggle={onThemeToggle} theme={theme} />
          <button
            type="button"
            aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={isOpen}
            onClick={() => setIsOpen((value) => !value)}
            className="inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-white shadow-[0_12px_28px_rgba(0,0,0,0.18)] transition hover:scale-105 hover:border-[#6ce7d7]/50 hover:bg-white/15"
          >
            {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen ? (
          <motion.nav
            initial={{ opacity: 0, y: -12, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -12, scale: 0.98 }}
            transition={{ duration: 0.22 }}
            className="mx-auto mt-3 grid max-w-7xl gap-2 rounded-2xl border border-white/10 bg-[#111827]/[0.94] p-3 shadow-[0_18px_55px_rgba(0,0,0,0.34)] backdrop-blur-2xl md:hidden"
            aria-label="Mobile primary"
          >
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={closeMenu}
                className={`rounded-xl px-4 py-3 text-sm font-semibold transition ${
                  activeSection === item.href.replace("#", "")
                    ? "bg-white/10 text-white"
                    : "text-white/[0.72] hover:bg-white/[0.08] hover:text-white"
                }`}
              >
                {item.label}
              </a>
            ))}
            <a
              href="#contact"
              onClick={closeMenu}
              className="premium-button premium-button-primary mt-1 inline-flex h-11 items-center justify-center gap-2 rounded-lg px-5 text-sm font-semibold text-white"
            >
              Book Demo
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </a>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </motion.header>
  );
}

function ThemeToggleButton({
  onToggle,
  theme,
}: {
  onToggle: () => void;
  theme: Theme;
}) {
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      aria-pressed={isDark}
      onClick={onToggle}
      className="theme-toggle-button inline-flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/10 text-white shadow-[0_12px_28px_rgba(0,0,0,0.18)] transition hover:scale-105 hover:border-[#6ce7d7]/50 hover:bg-white/15 md:h-11 md:w-11"
    >
      {isDark ? (
        <Sun className="h-5 w-5" aria-hidden="true" />
      ) : (
        <Moon className="h-5 w-5" aria-hidden="true" />
      )}
    </button>
  );
}

function ServicesSection() {
  return (
    <SectionShell
      id="services"
      eyebrow="Services"
      title="AI automation built around your customer conversations"
      description="Choose the workflows your business needs, then let Inspra.ai handle the repetitive front-office work with a polished customer experience."
    >
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <GradientCard key={service.title} item={service} index={index} />
        ))}
      </div>
      <Reveal delay={0.15}>
        <div className="theme-card mt-8 grid gap-4 rounded-2xl border border-white/10 bg-white/[0.05] p-3 shadow-[0_20px_70px_rgba(0,0,0,0.24)] backdrop-blur-xl md:grid-cols-3">
          {[
            {
              title: "Deploy in days",
              description: "Launch focused voice and chat workflows without operational drag.",
              icon: Radar,
            },
            {
              title: "Route with context",
              description: "Send qualified conversations to the right person or system.",
              icon: Network,
            },
            {
              title: "Optimize every touch",
              description: "Use conversation signals to refine scripts, timing, and follow-up.",
              icon: MousePointer2,
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                whileHover={{ y: -4 }}
                className="theme-card group rounded-xl border border-transparent p-5 transition hover:border-[#6ce7d7]/35 hover:bg-white/[0.07]"
              >
                <div className="flex items-start gap-4">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#6ce7d7] shadow-[0_14px_30px_rgba(0,0,0,0.18)] ring-1 ring-white/10 transition group-hover:scale-105 group-hover:bg-[#6ce7d7] group-hover:text-[#07172f]">
                    <Icon className="h-5 w-5 transition group-hover:rotate-3" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="font-semibold text-white">{item.title}</p>
                    <p className="mt-2 text-sm leading-6 text-[#b8c7dc]">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </Reveal>
    </SectionShell>
  );
}

function IndustriesSection() {
  return (
    <section
      id="industries"
      className="relative overflow-hidden bg-[#eef8ff] px-4 py-24 text-[#07172f] sm:px-6 lg:px-8"
    >
      <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(20,102,178,0.24),transparent_44%,rgba(108,231,215,0.18))]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.035)_1px,transparent_1px)] bg-[size:48px_48px]" />
      <div className="absolute -right-24 top-24 h-72 w-72 rounded-full bg-[#6ce7d7]/10 blur-3xl" />
      <div className="relative mx-auto max-w-7xl">
        <Reveal className="max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#6ce7d7]">
            Industries
          </p>
          <h2 className="font-hero mt-3 text-4xl leading-tight font-extrabold sm:text-5xl">
            Designed for teams that win or lose business by response speed
          </h2>
          <p className="mt-5 text-lg leading-8 text-[#bed2e8]">
            Inspra.ai adapts to service-heavy workflows where every missed
            inquiry, intake, or after-hours call can become lost revenue.
          </p>
        </Reveal>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {industries.map((industry, index) => {
            const Icon = industry.icon;
            return (
              <Reveal key={industry.title} delay={index * 0.06}>
                <motion.article
                  whileHover={{ y: -8 }}
                  className="theme-card group h-full rounded-2xl border border-white/[0.12] bg-white/[0.07] p-5 shadow-[0_24px_64px_rgba(0,0,0,0.2)] backdrop-blur-xl transition hover:border-[#6ce7d7]/60 hover:bg-white/[0.11]"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-[#6ce7d7] ring-1 ring-white/10 transition group-hover:scale-105 group-hover:bg-[#6ce7d7] group-hover:text-[#07172f]">
                    <Icon className="h-5 w-5 transition group-hover:rotate-3 group-hover:scale-110" aria-hidden="true" />
                  </span>
                  <h3 className="mt-5 text-lg font-semibold">
                    {industry.title}
                  </h3>
                  <p className="mt-3 text-sm leading-6 text-[#bed2e8]">
                    {industry.description}
                  </p>
                </motion.article>
              </Reveal>
            );
          })}
        </div>

        <Reveal delay={0.18}>
          <div className="theme-card mt-10 grid gap-4 rounded-2xl border border-white/10 bg-white/[0.07] p-4 shadow-[0_24px_70px_rgba(0,0,0,0.18)] backdrop-blur-xl lg:grid-cols-3">
            {[
              {
                label: "Missed calls recovered",
                value: "42%",
                icon: PhoneForwarded,
              },
              {
                label: "Lead-routing accuracy",
                value: "91%",
                icon: Layers3,
              },
              {
                label: "Pipeline velocity lift",
                value: "3.4x",
                icon: TrendingUp,
              },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.label}
                  whileHover={{ y: -4 }}
                  className="theme-card rounded-2xl border border-white/10 bg-white/[0.07] p-5 backdrop-blur transition hover:border-[#6ce7d7]/50 hover:bg-white/[0.1]"
                >
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-3xl font-semibold">{item.value}</p>
                      <p className="mt-2 text-sm text-[#bed2e8]">
                        {item.label}
                      </p>
                    </div>
                    <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-[#6ce7d7] ring-1 ring-white/10">
                      <Icon className="h-5 w-5" aria-hidden="true" />
                    </span>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function StatsSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#f7fbff] px-4 py-24 text-[#07172f] sm:px-6 lg:px-8">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(108,231,215,0.13),transparent_34%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(108,231,215,0.72),transparent)]"
      />
      <div className="relative mx-auto grid max-w-7xl gap-5 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <Reveal key={stat.label} delay={index * 0.06}>
            <motion.article
              whileHover={{ y: -7, scale: 1.01 }}
              className="theme-card group h-full rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.075),rgba(255,255,255,0.035))] p-6 shadow-[0_18px_55px_rgba(0,0,0,0.24)] backdrop-blur-xl transition hover:border-[#6ce7d7]/40 hover:shadow-[0_26px_80px_rgba(12,140,150,0.14)]"
            >
              <p className="font-hero text-4xl font-extrabold text-white sm:text-5xl">
                <AnimatedCounter value={stat.value} suffix={stat.suffix} />
              </p>
              <h3 className="mt-4 text-lg font-semibold text-white">
                {stat.label}
              </h3>
              <p className="mt-2 text-sm leading-6 text-[#b8c7dc]">
                {stat.description}
              </p>
              <div className="mt-6 h-1 overflow-hidden rounded-full bg-white/10">
                <motion.div
                  className="h-full rounded-full bg-[linear-gradient(90deg,#6ce7d7,#5aa8ff)]"
                  initial={shouldReduceMotion ? false : { width: "20%" }}
                  whileInView={{
                    width: `${Math.min(100, Math.max(45, stat.value))}%`,
                  }}
                  viewport={{ once: true }}
                  transition={{
                    duration: shouldReduceMotion ? 0 : 1,
                    delay: shouldReduceMotion ? 0 : index * 0.08,
                    ease: "easeOut",
                  }}
                />
              </div>
            </motion.article>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <SectionShell
      id="features"
      eyebrow="Features"
      title="A complete operating layer for voice, chat, and follow-up"
      description="Every feature is focused on helping your team respond faster, understand every interaction, and keep revenue workflows moving."
      className="bg-[#f6fbff]"
    >
      <div className="mb-10 grid gap-5 lg:grid-cols-3">
        {platformPillars.map((pillar, index) => {
          const Icon = pillar.icon;
          return (
            <Reveal key={pillar.title} delay={index * 0.06}>
              <motion.article
                whileHover={{ y: -6 }}
                className="theme-card group h-full rounded-2xl border border-white/10 bg-white/[0.055] p-6 shadow-[0_18px_55px_rgba(0,0,0,0.22)] backdrop-blur-xl transition hover:border-[#6ce7d7]/40 hover:bg-white/[0.08] hover:shadow-[0_28px_80px_rgba(12,140,150,0.14)]"
              >
                <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-[#6ce7d7] ring-1 ring-white/10 transition group-hover:scale-105 group-hover:bg-[#6ce7d7] group-hover:text-[#07172f]">
                  <Icon className="h-6 w-6 transition group-hover:rotate-3" aria-hidden="true" />
                </span>
                <h3 className="mt-5 text-xl font-semibold text-white">
                  {pillar.title}
                </h3>
                <p className="mt-3 leading-7 text-[#b8c7dc]">
                  {pillar.description}
                </p>
              </motion.article>
            </Reveal>
          );
        })}
      </div>
      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => {
          const Icon = feature.icon;
          return (
            <Reveal key={feature.title} delay={index * 0.05}>
              <motion.article
                whileHover={{ y: -8 }}
                className="theme-card spotlight-card group h-full rounded-2xl border border-white/10 bg-[#1E293B]/[0.5] p-6 shadow-[0_18px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl transition hover:border-[#6ce7d7]/40 hover:bg-[#1E293B]/[0.62] hover:shadow-[0_24px_75px_rgba(12,140,150,0.14)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-[#6ce7d7] ring-1 ring-white/10 transition group-hover:scale-105 group-hover:bg-[#6ce7d7] group-hover:text-[#07172f]">
                    <Icon className="h-6 w-6 transition group-hover:rotate-3 group-hover:scale-110" aria-hidden="true" />
                  </span>
                  <CheckCircle2 className="h-5 w-5 text-[#6ce7d7] opacity-0 transition group-hover:opacity-100" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-white">
                  {feature.title}
                </h3>
                <p className="mt-3 leading-7 text-[#b8c7dc]">
                  {feature.description}
                </p>
                <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-[#6ce7d7] opacity-0 transition group-hover:opacity-100">
                  <span>View workflow</span>
                  <MoveUpRight className="h-4 w-4" aria-hidden="true" />
                </div>
              </motion.article>
            </Reveal>
          );
        })}
      </div>
    </SectionShell>
  );
}

function TestimonialsSection() {
  const testimonialRail = [...testimonials, ...testimonials];

  return (
    <section className="relative overflow-hidden bg-[#eef8ff] px-4 py-24 text-[#07172f] sm:px-6 lg:px-8">
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_20%_0%,rgba(108,231,215,0.12),transparent_32%),radial-gradient(circle_at_80%_10%,rgba(88,166,255,0.1),transparent_30%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(108,231,215,0.72),transparent)]"
      />
      <div className="relative mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#6ce7d7]">
            Testimonials
          </p>
          <h2 className="font-hero mt-3 text-4xl leading-tight font-extrabold text-white sm:text-5xl">
            Trusted by operators who need every customer moment covered
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#b8c7dc]">
            Built for service teams that care about speed, polish, and clean
            operational handoff.
          </p>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="testimonial-carousel mt-12 overflow-hidden">
            <div className="testimonial-track flex w-max gap-5">
              {testimonialRail.map((testimonial, index) => (
              <motion.article
                key={`${testimonial.name}-${index}`}
                whileHover={{ y: -8, scale: 1.01 }}
                className="theme-card spotlight-card min-h-[340px] w-[min(360px,82vw)] rounded-2xl border border-white/10 bg-[linear-gradient(180deg,rgba(255,255,255,0.08),rgba(255,255,255,0.04))] p-6 shadow-[0_18px_55px_rgba(0,0,0,0.24)] backdrop-blur-xl transition hover:border-[#6ce7d7]/40 hover:shadow-[0_28px_84px_rgba(12,140,150,0.14)]"
              >
                <div className="flex items-start justify-between gap-4">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-[#6ce7d7] ring-1 ring-white/10">
                    <Quote className="h-6 w-6" aria-hidden="true" />
                  </span>
                  <div className="flex gap-1 text-[#f4b740]" aria-label="5 star rating">
                    {Array.from({ length: 5 }).map((_, starIndex) => (
                      <Star
                        key={starIndex}
                        className="h-4 w-4 fill-current"
                        aria-hidden="true"
                      />
                    ))}
                  </div>
                </div>
                <p className="mt-6 text-lg leading-8 text-[#e4edf8]">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div className="mt-7 flex items-center gap-4 border-t border-white/10 pt-5">
                  <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[linear-gradient(135deg,#6ce7d7,#5aa8ff)] text-sm font-extrabold text-[#07172f]">
                    {testimonial.avatar}
                  </span>
                  <div>
                    <p className="font-semibold text-white">{testimonial.name}</p>
                    <p className="mt-1 text-sm text-[#b8c7dc]">
                      {testimonial.role}
                    </p>
                    <p className="mt-2 inline-flex rounded-full border border-white/10 bg-white/[0.08] px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-[#6ce7d7]">
                      {testimonial.company}
                    </p>
                  </div>
                </div>
              </motion.article>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

function FaqSection() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section
      id="faq"
      className="relative overflow-hidden bg-[#f7fbff] px-4 py-24 text-[#07172f] sm:px-6 lg:px-8"
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_8%_12%,rgba(108,231,215,0.11),transparent_32%)]"
      />
      <div className="relative mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.82fr_1.18fr]">
        <Reveal>
          <div className="sticky top-28">
            <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#6ce7d7]">
              FAQ
            </p>
            <h2 className="font-hero mt-3 text-4xl leading-tight font-extrabold text-white sm:text-5xl">
              Clear answers before the first demo call
            </h2>
            <p className="mt-5 text-lg leading-8 text-[#b8c7dc]">
              A premium frontend-only experience that presents the product
              story cleanly, without pretending to run backend services.
            </p>
            <div className="theme-card mt-8 rounded-2xl border border-white/10 bg-white/[0.06] p-5 shadow-[0_18px_55px_rgba(0,0,0,0.22)] backdrop-blur-xl">
              <div className="flex items-start gap-4">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#6ce7d7] ring-1 ring-white/10">
                  <CircleHelp className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-semibold text-white">
                    Built for confidence
                  </p>
                  <p className="mt-2 text-sm leading-6 text-[#b8c7dc]">
                    Smooth motion, readable contrast, keyboard-friendly
                    controls, and responsive layouts across breakpoints.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Reveal>

        <div className="grid gap-4">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <Reveal key={faq.question} delay={index * 0.05}>
                <motion.article
                  layout
                  className="theme-card rounded-2xl border border-white/10 bg-white/[0.055] p-1 shadow-[0_16px_50px_rgba(0,0,0,0.22)] backdrop-blur-xl transition hover:border-[#6ce7d7]/35"
                >
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    onClick={() => setOpenIndex(isOpen ? -1 : index)}
                    className="group flex w-full items-center justify-between gap-5 rounded-2xl px-5 py-5 text-left transition hover:bg-white/[0.06]"
                  >
                    <span className="text-base font-semibold text-white sm:text-lg">
                      {faq.question}
                    </span>
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/[0.08] text-[#6ce7d7] transition group-hover:scale-105 group-hover:border-[#6ce7d7]/45">
                      <ChevronDown
                        className={`h-5 w-5 transition ${
                          isOpen ? "rotate-180" : ""
                        }`}
                        aria-hidden="true"
                      />
                    </span>
                  </button>
                  <AnimatePresence initial={false}>
                    {isOpen ? (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                        className="overflow-hidden"
                      >
                        <p className="px-5 pb-5 leading-7 text-[#b8c7dc]">
                          {faq.answer}
                        </p>
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </motion.article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function CtaSection() {
  const shouldReduceMotion = useReducedMotion();

  return (
    <section className="relative overflow-hidden bg-[#eef8ff] px-4 py-24 sm:px-6 lg:px-8">
      <Reveal>
        <div className="theme-cta-panel relative mx-auto max-w-7xl overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,#111827,#0F172A_48%,#1E293B)] px-6 py-16 text-white shadow-[0_34px_110px_rgba(0,0,0,0.34)] sm:px-10 lg:px-14">
          <div
            aria-hidden="true"
            className="absolute -top-32 left-1/2 h-80 w-80 -translate-x-1/2 rounded-full bg-[#6ce7d7]/[0.18] blur-3xl"
          />
          <motion.div
            aria-hidden="true"
            animate={shouldReduceMotion ? undefined : { x: ["-10%", "12%", "-10%"] }}
            transition={{ duration: 14, repeat: Infinity, ease: "easeInOut" }}
            className="absolute inset-y-0 left-0 w-full bg-[linear-gradient(110deg,transparent,rgba(108,231,215,0.22),rgba(88,166,255,0.18),transparent)] blur-xl"
          />
          <div className="relative grid gap-10 lg:grid-cols-[1fr_0.72fr] lg:items-center">
            <div>
              <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/[0.14] bg-white/10 px-4 py-2 text-sm font-semibold text-[#d8fff9] backdrop-blur">
                <Sparkles className="h-4 w-4" aria-hidden="true" />
                Ready to automate your front office
              </div>
              <h2 className="font-hero max-w-3xl text-4xl leading-tight font-extrabold sm:text-5xl">
                Give every caller an instant, polished, AI-powered experience.
              </h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-[#bed2e8]">
                Keep the human team focused on high-value work while Inspra.ai
                captures, qualifies, schedules, and syncs the repetitive flow.
              </p>
              <div className="mt-8 flex flex-col gap-3 sm:flex-row">
                <motion.a
                  href="#contact"
                  whileHover={{ scale: 1.025, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="premium-button premium-button-light inline-flex h-[52px] items-center justify-center gap-2 rounded-full px-6 text-base font-semibold text-[#07172f]"
                >
                  Book a Demo
                  <ArrowRight className="h-5 w-5" aria-hidden="true" />
                </motion.a>
                <motion.a
                  href="#services"
                  whileHover={{ scale: 1.025, y: -2 }}
                  whileTap={{ scale: 0.98 }}
                  className="premium-button premium-button-dark inline-flex h-[52px] items-center justify-center gap-2 rounded-full px-6 text-base font-semibold text-white"
                >
                  Explore Services
                  <MoveUpRight className="h-5 w-5" aria-hidden="true" />
                </motion.a>
              </div>
            </div>
            <div className="grid gap-3">
              {[
                "Voice agents answer instantly",
                "Leads are qualified and routed",
                "CRM updates stay consistent",
              ].map((item, index) => (
                <motion.div
                  key={item}
                  animate={
                    shouldReduceMotion
                      ? undefined
                      : { x: [0, index % 2 === 0 ? 6 : -6, 0] }
                  }
                  transition={{
                    duration: 5 + index,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                  className="rounded-2xl border border-white/10 bg-white/10 p-4 backdrop-blur-xl transition hover:border-[#6ce7d7]/40 hover:bg-white/[0.14]"
                >
                  <div className="flex items-center gap-3">
                    <CheckCircle2
                      className="h-5 w-5 text-[#6ce7d7]"
                      aria-hidden="true"
                    />
                    <p className="font-semibold">{item}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </section>
  );
}

function Footer() {
  return (
    <footer
      id="contact"
      className="relative overflow-hidden bg-[#f6fbff] px-4 py-[72px] text-[#07172f] sm:px-6 lg:px-8"
    >
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-48 bg-[linear-gradient(180deg,rgba(108,231,215,0.12),transparent)]"
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_12%_18%,rgba(88,166,255,0.09),transparent_30%)]" />
      <div className="theme-card relative mx-auto grid max-w-7xl gap-10 rounded-[28px] border border-white/10 bg-white/[0.035] p-6 backdrop-blur-xl lg:grid-cols-[1.15fr_1fr_0.72fr] lg:p-8">
        <div>
          <a href="#home" className="inline-flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-white/10 text-[#6ce7d7] ring-1 ring-white/10">
              <Sparkles className="h-5 w-5 text-[#0c8c96]" aria-hidden="true" />
            </span>
            <span className="font-hero text-xl font-extrabold">Inspra.ai</span>
          </a>
          <p className="mt-5 max-w-md leading-7 text-[#bed2e8]">
            AI voice agents and automation workflows for teams that need every
            inquiry answered, qualified, and followed up with care.
          </p>
          <a
            href="mailto:hello@inspra.ai"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/[0.14] px-4 py-3 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:border-[#6ce7d7] hover:bg-white/[0.08]"
          >
            <Mail className="h-4 w-4 text-[#6ce7d7]" aria-hidden="true" />
            hello@inspra.ai
          </a>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-[#6ce7d7]">Quick Links</h2>
          <div className="mt-5 flex flex-wrap justify-start gap-x-6 gap-y-3 md:flex-nowrap md:gap-x-8">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm text-[#bed2e8] transition hover:-translate-y-0.5 hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-[#6ce7d7]">Follow</h2>
          <div className="mt-5 flex gap-3">
            {[
              { label: "LinkedIn", icon: Globe },
              { label: "X", icon: Share2 },
              { label: "Community", icon: MessageCircle },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href="#home"
                  aria-label={item.label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/[0.14] bg-white/[0.04] text-[#bed2e8] transition hover:-translate-y-0.5 hover:border-[#6ce7d7] hover:bg-white/[0.08] hover:text-white"
                >
                  <Icon className="h-4 w-4" aria-hidden="true" />
                </a>
              );
            })}
          </div>
          <div className="mt-7 grid gap-3 text-sm text-[#bed2e8]">
            <a href="#home" className="transition hover:text-white">
              Privacy Policy
            </a>
            <a href="#home" className="transition hover:text-white">
              Terms
            </a>
          </div>
        </div>
      </div>

      <div className="relative mx-auto mt-12 flex max-w-7xl flex-col gap-3 border-t border-white/10 pt-7 text-sm text-[#91a8c3] sm:flex-row sm:items-center sm:justify-between">
        <p>Copyright 2026 Inspra.ai. All rights reserved.</p>
        <p>Built for responsive, always-on customer conversations.</p>
      </div>
    </footer>
  );
}

function SectionShell({
  id,
  eyebrow,
  title,
  description,
  children,
  className = "bg-[#f7fbff]",
}: {
  id: string;
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
  className?: string;
}) {
  return (
    <section
      id={id}
      className={`section-transition relative overflow-hidden ${className} px-4 py-24 text-[#07172f] sm:px-6 lg:px-8`}
    >
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-[radial-gradient(circle_at_14%_12%,rgba(108,231,215,0.12),transparent_34%),radial-gradient(circle_at_86%_0%,rgba(88,166,255,0.11),transparent_30%)]"
      />
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(108,231,215,0.72),transparent)]"
      />
      <div className="relative mx-auto max-w-7xl">
        <Reveal className="mx-auto max-w-3xl text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.22em] text-[#6ce7d7]">
            {eyebrow}
          </p>
          <h2 className="font-hero mt-3 text-4xl leading-tight font-extrabold text-white sm:text-5xl">
            {title}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-[#b8c7dc]">
            {description}
          </p>
        </Reveal>
        <div className="mt-12">{children}</div>
      </div>
    </section>
  );
}

function GradientCard({ item, index }: { item: CardItem; index: number }) {
  const Icon = item.icon;

  return (
    <Reveal delay={index * 0.05}>
      <motion.article
        whileHover={{ y: -9, scale: 1.01 }}
        transition={{ type: "spring", stiffness: 180, damping: 18 }}
        className="group h-full rounded-2xl bg-[linear-gradient(135deg,rgba(108,231,215,0.72),rgba(88,166,255,0.28),rgba(255,255,255,0.1))] p-px shadow-[0_18px_50px_rgba(0,0,0,0.22)] transition hover:shadow-[0_30px_90px_rgba(12,140,150,0.18)]"
      >
        <div className="theme-card spotlight-card h-full rounded-2xl border border-white/[0.08] bg-[#1E293B]/[0.56] p-6 backdrop-blur-xl transition group-hover:bg-[#1E293B]/[0.66]">
          <div className="flex items-start justify-between gap-4">
            <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/10 text-[#6ce7d7] shadow-[0_14px_30px_rgba(0,0,0,0.22)] ring-1 ring-white/10 transition group-hover:scale-105 group-hover:bg-[#6ce7d7] group-hover:text-[#07172f]">
              <Icon
                className="h-6 w-6 transition group-hover:rotate-3 group-hover:scale-110"
                aria-hidden="true"
              />
            </span>
            <BadgeCheck className="h-5 w-5 text-[#6ce7d7] opacity-0 transition group-hover:opacity-100" />
          </div>
          <h3 className="mt-6 text-xl font-semibold text-white">
            {item.title}
          </h3>
          <p className="mt-3 leading-7 text-[#b8c7dc]">{item.description}</p>
          <div className="mt-6 flex items-center gap-2 text-sm font-semibold text-[#6ce7d7]">
            <span>Learn More</span>
            <ArrowRight
              className="h-4 w-4 transition group-hover:translate-x-1"
              aria-hidden="true"
            />
          </div>
        </div>
      </motion.article>
    </Reveal>
  );
}

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  const shouldReduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
      whileInView={shouldReduceMotion ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.62, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });
  const shouldReduceMotion = useReducedMotion();
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    stiffness: 90,
    damping: 24,
    mass: 0.7,
  });
  const display = useTransform(springValue, (latest) => {
    const rounded = Math.round(latest);
    return `${rounded}${suffix}`;
  });

  useEffect(() => {
    if (shouldReduceMotion) {
      motionValue.set(value);
      return;
    }

    if (isInView) {
      motionValue.set(value);
    }
  }, [isInView, motionValue, shouldReduceMotion, value]);

  return <motion.span ref={ref}>{display}</motion.span>;
}

function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitted(true);
  }

  return (
    <div className="fixed bottom-5 right-5 z-50 flex max-w-[calc(100vw-2.5rem)] flex-col items-end gap-3">
      <AnimatePresence>
        {isOpen ? (
          <motion.div
            initial={{ opacity: 0, y: 18, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 18, scale: 0.96 }}
            transition={{ duration: 0.24, ease: "easeOut" }}
            className="w-[min(390px,calc(100vw-2.5rem))] overflow-hidden rounded-lg border border-[#d7e6f7] bg-white shadow-[0_28px_85px_rgba(7,23,47,0.22)] backdrop-blur"
          >
            <div className="flex items-center justify-between bg-[#111827] px-5 py-4 text-white">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 text-[#6ce7d7]">
                  <Bot className="h-5 w-5" aria-hidden="true" />
                </span>
                <div>
                  <p className="font-semibold">Inspra.ai</p>
                  <p className="text-xs text-[#bed2e8]">AI automation team</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                aria-label="Close chat"
                className="flex h-9 w-9 items-center justify-center rounded-lg text-[#bed2e8] transition hover:bg-white/10 hover:text-white"
              >
                <X className="h-5 w-5" aria-hidden="true" />
              </button>
            </div>

            <div className="p-5">
              <div className="mb-5 rounded-lg bg-[#eef8ff] p-4 text-sm leading-6 text-[#33435f]">
                Hi! How can Inspra.ai help your business today?
              </div>

              <AnimatePresence mode="wait">
                {isSubmitted ? (
                  <motion.div
                    key="thanks"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    className="rounded-lg border border-[#b8efe7] bg-[#ecfffc] p-5 text-center"
                  >
                    <CheckCircle2
                      className="mx-auto h-10 w-10 text-[#0c8c96]"
                      aria-hidden="true"
                    />
                    <p className="mt-3 text-base font-semibold text-[#07172f]">
                      Thank you! Our team will contact you soon.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form
                    key="form"
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    onSubmit={handleSubmit}
                    className="grid gap-3"
                  >
                    <label className="grid gap-1 text-sm font-medium text-[#33435f]">
                      Name
                      <input
                        required
                        name="name"
                        type="text"
                        autoComplete="name"
                        className="h-11 rounded-lg border border-[#d7e6f7] bg-white px-3 text-[#07172f] outline-none transition focus:border-[#0c8c96] focus:ring-4 focus:ring-[#6ce7d7]/20"
                      />
                    </label>
                    <label className="grid gap-1 text-sm font-medium text-[#33435f]">
                      Email
                      <input
                        required
                        name="email"
                        type="email"
                        autoComplete="email"
                        className="h-11 rounded-lg border border-[#d7e6f7] bg-white px-3 text-[#07172f] outline-none transition focus:border-[#0c8c96] focus:ring-4 focus:ring-[#6ce7d7]/20"
                      />
                    </label>
                    <label className="grid gap-1 text-sm font-medium text-[#33435f]">
                      Business Type
                      <select
                        required
                        name="businessType"
                        defaultValue=""
                        className="h-11 rounded-lg border border-[#d7e6f7] bg-white px-3 text-[#07172f] outline-none transition focus:border-[#0c8c96] focus:ring-4 focus:ring-[#6ce7d7]/20"
                      >
                        <option value="" disabled>
                          Select business type
                        </option>
                        {businessTypes.map((type) => (
                          <option key={type} value={type}>
                            {type}
                          </option>
                        ))}
                      </select>
                    </label>
                    <label className="grid gap-1 text-sm font-medium text-[#33435f]">
                      Message
                      <textarea
                        required
                        name="message"
                        rows={4}
                        className="resize-none rounded-lg border border-[#d7e6f7] bg-white px-3 py-3 text-[#07172f] outline-none transition focus:border-[#0c8c96] focus:ring-4 focus:ring-[#6ce7d7]/20"
                      />
                    </label>
                    <button
                      type="submit"
                      className="mt-1 inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-[#111827] px-5 text-sm font-semibold text-white transition hover:-translate-y-0.5 hover:bg-[#1E293B]"
                    >
                      Submit
                      <Send className="h-4 w-4" aria-hidden="true" />
                    </button>
                  </motion.form>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <motion.button
        type="button"
        aria-label={isOpen ? "Close contact chat" : "Open contact chat"}
        onClick={() => {
          setIsOpen((value) => !value);
          if (!isOpen) {
            setIsSubmitted(false);
          }
        }}
        whileHover={{ y: -4 }}
        whileTap={{ scale: 0.96 }}
        className="chat-launcher flex h-[60px] w-[60px] items-center justify-center rounded-full bg-[#111827] text-white shadow-[0_18px_45px_rgba(7,23,47,0.28)] transition hover:bg-[#1E293B]"
      >
        {isOpen ? (
          <X className="h-6 w-6" aria-hidden="true" />
        ) : (
          <MessageCircle className="h-6 w-6" aria-hidden="true" />
        )}
      </motion.button>
    </div>
  );
}
