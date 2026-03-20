import { useState, useEffect, useCallback } from "react";
import {
  Menu, X, ChevronUp, Mail, Phone, MapPin,
  CheckCircle, BookOpen, Globe, Users, Cpu, Leaf, Building,
  BarChart3, Zap, Shield, Calendar, Award, FileText, Send
} from "lucide-react";

/* ─────────────────────────────────────────────────────────────
   GLOBAL STYLES
───────────────────────────────────────────────────────────── */
const STYLES = `
  @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,600;0,700;0,900;1,400;1,700&family=Inter:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap');

  :root {
    --navy:      #07111f;
    --navy-2:    #0d1e35;
    --navy-3:    #122540;
    --navy-4:    #1a3255;
    --gold:      #c8a44a;
    --gold-2:    #dfc07e;
    --gold-3:    #f0daa8;
    --gold-pale: #fdf6e7;
    --cream:     #f8f5ef;
    --cream-2:   #f0ece3;
    --white:     #ffffff;
    --text:      #1e293b;
    --muted:     #64748b;
    --border:    #e2ddd5;
  }

  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  html { scroll-behavior: smooth; font-size: 16px; }
  body {
    font-family: 'Inter', system-ui, sans-serif;
    background: var(--cream);
    color: var(--text);
    line-height: 1.7;
    -webkit-font-smoothing: antialiased;
  }
  h1,h2,h3,h4,h5 { font-family: 'Playfair Display', Georgia, serif; line-height: 1.25; }
  a { text-decoration: none; }

  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: var(--navy); }
  ::-webkit-scrollbar-thumb { background: var(--gold); border-radius: 4px; }

  /* ── NAVBAR ─────────────────────────────────────────────── */
  .navbar {
    position: fixed; top: 0; left: 0; right: 0; z-index: 9999;
    border-bottom: 1px solid transparent;
    transition: background 0.3s, border-color 0.3s, box-shadow 0.3s;
    background: rgba(7,17,31,0.72);
    backdrop-filter: blur(10px);
    -webkit-backdrop-filter: blur(10px);
  }
  .navbar.scrolled {
    background: rgba(7,17,31,0.97);
    border-bottom-color: rgba(200,164,74,0.18);
    box-shadow: 0 2px 28px rgba(0,0,0,0.45);
  }
  .navbar-inner {
    max-width: 1200px; margin: 0 auto;
    padding: 0 28px; height: 66px;
    display: flex; align-items: center; justify-content: space-between;
  }

  /* Logo */
  .logo {
    display: flex; align-items: center; gap: 10px;
    cursor: pointer; user-select: none; border: none; background: none;
  }
  .logo-icon {
    width: 38px; height: 38px; border-radius: 7px;
    background: linear-gradient(135deg, var(--gold), var(--gold-2));
    display: flex; align-items: center; justify-content: center;
    font-family: 'Playfair Display', serif; font-weight: 900;
    color: var(--navy); font-size: 13px; letter-spacing: 0.5px; flex-shrink: 0;
  }
  .logo-text {
    font-family: 'Playfair Display', serif;
    color: var(--gold-2); font-weight: 700; font-size: 15px;
  }
  .logo-year { color: rgba(255,255,255,0.3); font-weight: 300; margin-left: 2px; }

  /* Desktop nav */
  .nav-links { display: flex; align-items: center; gap: 2px; }

  .nav-btn {
    background: none; border: none; cursor: pointer;
    color: rgba(255,255,255,0.72); font-size: 13.5px;
    font-family: 'Inter', sans-serif; font-weight: 400;
    padding: 7px 13px; border-radius: 6px;
    transition: color 0.2s, background 0.2s;
    position: relative; letter-spacing: 0.2px;
    white-space: nowrap;
  }
  .nav-btn:hover { color: var(--gold-2); background: rgba(200,164,74,0.08); }
  .nav-btn.active { color: var(--gold-2); }
  .nav-btn.active::after {
    content: ''; position: absolute;
    bottom: 4px; left: 50%; transform: translateX(-50%);
    width: 16px; height: 2px;
    background: linear-gradient(90deg, var(--gold), var(--gold-2));
    border-radius: 2px;
  }
  .nav-btn.cta {
    background: linear-gradient(135deg, var(--gold), var(--gold-2));
    color: var(--navy) !important; font-weight: 700 !important;
    padding: 8px 20px !important; margin-left: 8px;
    box-shadow: 0 3px 14px rgba(200,164,74,0.35);
  }
  .nav-btn.cta:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 22px rgba(200,164,74,0.5);
    background: linear-gradient(135deg, var(--gold-2), var(--gold-3));
  }
  .nav-btn.cta.active::after { display: none; }

  /* Hamburger */
  .hamburger {
    display: none; background: none; border: none;
    color: var(--gold-2); cursor: pointer; padding: 6px; border-radius: 5px;
  }

  /* Mobile menu */
  .mobile-menu {
    display: none; flex-direction: column; gap: 2px;
    background: rgba(7,17,31,0.99);
    border-top: 1px solid rgba(200,164,74,0.1);
    padding: 12px 18px 20px;
  }
  .mobile-menu.open { display: flex; }

  .mobile-btn {
    background: none; border: none; cursor: pointer;
    color: rgba(255,255,255,0.8); font-size: 15px;
    font-family: 'Inter', sans-serif; text-align: left;
    padding: 11px 14px; border-radius: 7px; width: 100%;
    transition: background 0.2s, color 0.2s;
    border-bottom: 1px solid rgba(255,255,255,0.05);
  }
  .mobile-btn:hover { background: rgba(200,164,74,0.08); color: var(--gold-2); }
  .mobile-btn.active { color: var(--gold-2); }
  .mobile-cta {
    background: linear-gradient(135deg, var(--gold), var(--gold-2));
    color: var(--navy); font-weight: 700; border: none; cursor: pointer;
    font-family: 'Inter', sans-serif; text-align: center;
    padding: 13px; border-radius: 7px; width: 100%;
    font-size: 15px; margin-top: 8px;
  }

  @media (max-width: 960px) {
    .nav-links { display: none; }
    .hamburger { display: flex; }
  }

  /* ── HERO ────────────────────────────────────────────────── */
  .hero {
    background: linear-gradient(160deg, var(--navy) 0%, var(--navy-2) 45%, var(--navy-3) 80%, #0f2847 100%);
    min-height: 100vh; display: flex; align-items: center;
    padding-top: 66px; position: relative; overflow: hidden;
  }
  .hero::before {
    content: ''; position: absolute; inset: 0; pointer-events: none;
    background:
      radial-gradient(ellipse 70% 55% at 8% 65%, rgba(200,164,74,0.07) 0%, transparent 68%),
      radial-gradient(ellipse 50% 40% at 88% 12%, rgba(200,164,74,0.05) 0%, transparent 60%);
  }
  .hero-dots {
    position: absolute; inset: 0; pointer-events: none;
    background-image: radial-gradient(rgba(200,164,74,0.12) 1px, transparent 1px);
    background-size: 38px 38px;
    mask-image: radial-gradient(ellipse 85% 85% at 50% 50%, black 20%, transparent 100%);
    -webkit-mask-image: radial-gradient(ellipse 85% 85% at 50% 50%, black 20%, transparent 100%);
  }
  .hero-content {
    max-width: 1200px; margin: 0 auto;
    padding: 72px 28px 84px; position: relative; z-index: 1; width: 100%;
  }

  /* Badge */
  .hero-badge {
    display: inline-flex; align-items: center; gap: 8px;
    background: rgba(200,164,74,0.1); border: 1px solid rgba(200,164,74,0.25);
    border-radius: 50px; padding: 6px 18px 6px 10px;
    color: var(--gold-2); font-size: 12px; font-weight: 500;
    margin-bottom: 26px; letter-spacing: 0.4px;
  }
  .badge-dot {
    width: 7px; height: 7px; border-radius: 50%;
    background: var(--gold); box-shadow: 0 0 8px var(--gold);
    animation: pulseDot 2s infinite;
  }
  @keyframes pulseDot {
    0%,100% { opacity:1; transform:scale(1); }
    50%      { opacity:0.4; transform:scale(0.6); }
  }

  .hero h1 {
    font-size: clamp(1.9rem, 4.5vw, 3.45rem);
    font-weight: 900; color: #fff; line-height: 1.18; margin-bottom: 6px;
  }
  .hero h1 .hl { color: var(--gold-2); font-style: italic; }

  .hero-rule {
    width: 72px; height: 3px; border-radius: 2px;
    background: linear-gradient(90deg, var(--gold), var(--gold-2));
    margin: 18px 0;
  }
  .hero-sub {
    color: rgba(255,255,255,0.58); font-size: 1.04rem;
    max-width: 570px; margin-bottom: 36px; line-height: 1.82;
    font-style: italic; font-family: 'Playfair Display', serif;
  }

  .hero-btns { display: flex; gap: 13px; flex-wrap: wrap; margin-bottom: 60px; }

  .btn-gold {
    background: linear-gradient(135deg, var(--gold), var(--gold-2));
    color: var(--navy); font-weight: 700; font-size: 14px;
    border: none; cursor: pointer; padding: 13px 28px; border-radius: 7px;
    display: inline-flex; align-items: center; gap: 7px;
    font-family: 'Inter', sans-serif; letter-spacing: 0.2px;
    box-shadow: 0 5px 20px rgba(200,164,74,0.35);
    transition: transform 0.22s, box-shadow 0.22s;
  }
  .btn-gold:hover { transform: translateY(-3px); box-shadow: 0 10px 30px rgba(200,164,74,0.45); }

  .btn-ghost {
    background: transparent; color: var(--gold-2);
    font-weight: 500; font-size: 14px;
    border: 1.5px solid rgba(200,164,74,0.4); cursor: pointer;
    padding: 13px 28px; border-radius: 7px;
    display: inline-flex; align-items: center; gap: 7px;
    font-family: 'Inter', sans-serif; letter-spacing: 0.2px;
    transition: background 0.22s, border-color 0.22s, transform 0.22s;
  }
  .btn-ghost:hover { background: rgba(200,164,74,0.08); border-color: var(--gold-2); transform: translateY(-3px); }

  .hero-stats { display: flex; gap: 44px; flex-wrap: wrap; }
  .stat-num {
    font-family: 'Playfair Display', serif; font-size: 2.1rem;
    font-weight: 900; color: var(--gold-2); line-height: 1;
  }
  .stat-lbl {
    color: rgba(255,255,255,0.38); font-size: 10.5px;
    letter-spacing: 1.3px; text-transform: uppercase;
    font-family: 'JetBrains Mono', monospace; margin-top: 5px;
  }

  /* ── SECTIONS ────────────────────────────────────────────── */
  .section { padding: 88px 28px; }
  .s-cream  { background: var(--cream); }
  .s-cream2 { background: var(--cream-2); }
  .s-navy   { background: var(--navy);   color: #fff; }
  .s-navy2  { background: var(--navy-2); color: #fff; }

  .container { max-width: 1160px; margin: 0 auto; }

  /* Section tag */
  .stag {
    display: flex; align-items: center; gap: 9px;
    font-size: 10.5px; font-weight: 600; letter-spacing: 2px;
    text-transform: uppercase; color: var(--gold);
    font-family: 'JetBrains Mono', monospace; margin-bottom: 10px;
  }
  .stag::before { content:''; display:inline-block; width:20px; height:2px; background:var(--gold); border-radius:1px; }

  .stitle { font-size: clamp(1.55rem,3vw,2.25rem); font-weight: 800; line-height: 1.22; }
  .stitle.light { color: #fff; }
  .stitle.dark  { color: var(--navy); }

  .title-bar {
    width: 48px; height: 3px; border-radius: 2px;
    background: linear-gradient(90deg, var(--gold), var(--gold-2));
    margin-top: 13px;
  }
  .title-bar.c { margin-left: auto; margin-right: auto; }

  .sub-text {
    font-size: 0.96rem; line-height: 1.82; margin-top: 17px;
  }
  .sub-text.light { color: rgba(255,255,255,0.58); }
  .sub-text.dark  { color: var(--muted); }

  /* ── CARDS ────────────────────────────────────────────────── */
  .card {
    background: #fff; border-radius: 12px;
    box-shadow: 0 2px 16px rgba(7,17,31,0.07);
    border: 1px solid var(--border);
    transition: transform 0.25s, box-shadow 0.25s;
  }
  .card:hover { transform: translateY(-5px); box-shadow: 0 16px 40px rgba(7,17,31,0.12); }

  .track-card {
    background: rgba(255,255,255,0.03);
    border: 1px solid rgba(255,255,255,0.07);
    border-left: 3px solid var(--gold);
    border-radius: 10px; padding: 26px 22px;
    transition: all 0.25s;
  }
  .track-card:hover {
    background: rgba(200,164,74,0.06);
    border-left-color: var(--gold-2);
    border-color: rgba(200,164,74,0.2);
    transform: translateY(-4px);
  }

  /* ── REGISTRATION TIERS ──────────────────────────────────── */
  .tier {
    background: #fff; border: 1px solid var(--border);
    border-radius: 14px; padding: 30px 24px;
    transition: all 0.3s;
  }
  .tier:hover { transform: translateY(-6px); box-shadow: 0 20px 48px rgba(7,17,31,0.12); }
  .tier.feat {
    background: var(--navy); color: #fff;
    border-color: rgba(200,164,74,0.3);
    transform: scale(1.04);
    box-shadow: 0 18px 48px rgba(7,17,31,0.22);
  }
  .tier.feat:hover { transform: scale(1.07) translateY(-4px); }

  /* ── TIMELINE ─────────────────────────────────────────────── */
  .tl-circle {
    flex-shrink: 0; width: 50px; height: 50px; border-radius: 50%;
    background: rgba(200,164,74,0.1); border: 2px solid rgba(200,164,74,0.28);
    display: flex; align-items: center; justify-content: center;
    color: var(--gold); position: relative; z-index: 1; margin-top: 6px;
  }
  .tl-circle.hi {
    background: linear-gradient(135deg, var(--gold), var(--gold-2));
    border-color: var(--gold-2); color: var(--navy);
  }
  .tl-box {
    background: rgba(255,255,255,0.04); border: 1px solid rgba(255,255,255,0.06);
    border-radius: 9px; padding: 14px 22px; flex: 1;
  }
  .tl-box.hi { border-color: rgba(200,164,74,0.22); }

  /* ── STEPS ─────────────────────────────────────────────────── */
  .step-card {
    background: #fff; border-radius: 11px; padding: 24px 18px;
    text-align: center; box-shadow: 0 2px 14px rgba(7,17,31,0.07);
    border: 1px solid var(--border); transition: transform 0.25s, box-shadow 0.25s;
  }
  .step-card:hover { transform: translateY(-5px); box-shadow: 0 14px 36px rgba(7,17,31,0.11); }
  .step-num {
    width: 50px; height: 50px; border-radius: 50%; margin: 0 auto 16px;
    background: linear-gradient(135deg, var(--gold), var(--gold-2));
    display: flex; align-items: center; justify-content: center;
    font-family: 'JetBrains Mono', monospace; font-weight: 700;
    color: var(--navy); font-size: 13px;
  }

  /* ── FORM ──────────────────────────────────────────────────── */
  .f-input {
    width: 100%; background: rgba(255,255,255,0.05);
    border: 1px solid rgba(255,255,255,0.12); border-radius: 7px;
    padding: 12px 15px; color: #fff;
    font-family: 'Inter', sans-serif; font-size: 14px;
    outline: none; transition: border-color 0.2s, box-shadow 0.2s;
  }
  .f-input::placeholder { color: rgba(255,255,255,0.28); }
  .f-input:focus { border-color: var(--gold); box-shadow: 0 0 0 3px rgba(200,164,74,0.1); }
  .f-label {
    display: block; color: rgba(255,255,255,0.5);
    font-size: 11.5px; letter-spacing: 0.5px;
    text-transform: uppercase; font-weight: 500; margin-bottom: 7px;
  }

  /* ── BADGE ──────────────────────────────────────────────────── */
  .gold-badge {
    display: inline-block;
    background: linear-gradient(135deg, var(--gold), var(--gold-2));
    color: var(--navy); font-weight: 700; font-size: 10px;
    letter-spacing: 1.2px; text-transform: uppercase;
    padding: 4px 10px; border-radius: 3px;
  }

  /* ── BACK TO TOP ────────────────────────────────────────────── */
  .btt {
    position: fixed; bottom: 26px; right: 26px;
    width: 44px; height: 44px; border-radius: 50%;
    background: linear-gradient(135deg, var(--gold), var(--gold-2));
    border: none; cursor: pointer; z-index: 999;
    display: flex; align-items: center; justify-content: center;
    box-shadow: 0 4px 18px rgba(200,164,74,0.45);
    transition: transform 0.25s, box-shadow 0.25s; color: var(--navy);
  }
  .btt:hover { transform: translateY(-4px); box-shadow: 0 8px 26px rgba(200,164,74,0.55); }

  /* ── GRID HELPERS ────────────────────────────────────────────── */
  .g2 { display: grid; grid-template-columns: 1fr 1fr; gap: 48px; align-items: start; }
  @media (max-width: 840px) { .g2 { grid-template-columns: 1fr; gap: 32px; } }

  .g3 { display: grid; grid-template-columns: repeat(3,1fr); gap: 22px; }
  @media (max-width: 840px) { .g3 { grid-template-columns: 1fr 1fr; } }
  @media (max-width: 540px) { .g3 { grid-template-columns: 1fr; } }

  .g4 { display: grid; grid-template-columns: repeat(4,1fr); gap: 20px; align-items: start; }
  @media (max-width: 960px) { .g4 { grid-template-columns: 1fr 1fr; } }
  @media (max-width: 500px) { .g4 { grid-template-columns: 1fr; } }

  .gauto { display: grid; grid-template-columns: repeat(auto-fill, minmax(160px,1fr)); gap: 16px; }
  .gauto2 { display: grid; grid-template-columns: repeat(auto-fill, minmax(250px,1fr)); gap: 14px; }

  .footer-g { display: grid; grid-template-columns: 2fr 1fr 1fr; gap: 40px; }
  @media (max-width: 720px) { .footer-g { grid-template-columns: 1fr 1fr; } }
  @media (max-width: 460px) { .footer-g { grid-template-columns: 1fr; } }

  /* ── ANIMATIONS ─────────────────────────────────────────────── */
  @keyframes fadeUp {
    from { opacity:0; transform:translateY(22px); }
    to   { opacity:1; transform:translateY(0); }
  }
  .a1 { animation: fadeUp 0.7s ease both; }
  .a2 { animation: fadeUp 0.7s 0.15s ease both; }
  .a3 { animation: fadeUp 0.7s 0.3s  ease both; }
  .a4 { animation: fadeUp 0.7s 0.45s ease both; }
  .a5 { animation: fadeUp 0.7s 0.6s  ease both; }

  @media (max-width: 768px) {
    .section { padding: 60px 20px; }
    .hero-content { padding: 50px 20px 60px; }
    .hero-stats { gap: 22px; }
  }
`;

/* ─────────────────────────────────────────────────────────────
   SMOOTH SCROLL HELPER
───────────────────────────────────────────────────────────── */
function goTo(id, offset = 66) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - offset;
  window.scrollTo({ top, behavior: "smooth" });
}

/* ─────────────────────────────────────────────────────────────
   NAV CONFIG
───────────────────────────────────────────────────────────── */
const NAV = [
  { id: "series",       label: "Series" },
  { id: "about",        label: "About" },
  { id: "tracks",       label: "Tracks" },
  { id: "submission",   label: "Submission" },
  { id: "registration", label: "Registration" },
  { id: "dates",        label: "Dates" },
  { id: "committee",    label: "Committee" },
  { id: "contact",      label: "Contact" },
];

/* ─────────────────────────────────────────────────────────────
   NAVBAR
───────────────────────────────────────────────────────────── */
function Navbar() {
  const [scrolled,  setScrolled]  = useState(false);
  const [menuOpen,  setMenuOpen]  = useState(false);
  const [activeId,  setActiveId]  = useState("");

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      let cur = "";
      for (const { id } of NAV) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 90) cur = id;
      }
      setActiveId(cur);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const click = (id) => { goTo(id); setMenuOpen(false); };

  return (
    <header className={`navbar${scrolled ? " scrolled" : ""}`}>
      <div className="navbar-inner">

        {/* ── Logo ── */}
        <button className="logo" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Back to top">
          <div className="logo-icon">IC</div>
          <span className="logo-text">ICEAIT<span className="logo-year"> 2026</span></span>
        </button>

        {/* ── Desktop Links ── */}
        <nav className="nav-links" aria-label="Main navigation">
          {NAV.map(({ id, label }) => (
            <button
              key={id}
              className={`nav-btn${activeId === id ? " active" : ""}`}
              onClick={() => click(id)}
              aria-label={`Go to ${label}`}
            >
              {label}
            </button>
          ))}
          <button
            className="nav-btn cta"
            onClick={() => click("submission")}
          >
            Submit Paper
          </button>
        </nav>

        {/* ── Hamburger ── */}
        <button
          className="hamburger"
          onClick={() => setMenuOpen(p => !p)}
          aria-label="Toggle menu"
          aria-expanded={menuOpen}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* ── Mobile Menu ── */}
      <nav className={`mobile-menu${menuOpen ? " open" : ""}`} aria-label="Mobile navigation">
        {NAV.map(({ id, label }) => (
          <button
            key={id}
            className={`mobile-btn${activeId === id ? " active" : ""}`}
            onClick={() => click(id)}
          >
            {label}
          </button>
        ))}
        <button className="mobile-cta" onClick={() => click("submission")}>
          Submit Paper →
        </button>
      </nav>
    </header>
  );
}

/* ─────────────────────────────────────────────────────────────
   HERO
───────────────────────────────────────────────────────────── */
function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-dots" />
      <div className="hero-content">

        <div className="hero-badge a1">
          <span className="badge-dot" />
          SIARE Conference Series · August 2026 · Boston, USA
        </div>

        <h1 className="a2">
          International Conference on<br />
          <span className="hl">Emerging Technologies,</span><br />
          Artificial Intelligence &amp;<br />
          Smart Engineering Systems
        </h1>

        <div className="hero-rule a2" />

        <p className="hero-sub a3">
          Bridging the frontiers of science, engineering, and societal transformation
          through globally collaborative, interdisciplinary research.
        </p>

        <div className="hero-btns a3">
          <button className="btn-gold" onClick={() => goTo("submission")}>
            <FileText size={16} /> Submit Paper
          </button>
          <button className="btn-ghost" onClick={() => goTo("registration")}>
            <Users size={16} /> Register Now
          </button>
          <button className="btn-ghost" onClick={() => goTo("dates")}>
            <Calendar size={16} /> Important Dates
          </button>
        </div>

        <div className="hero-stats a4">
          {[["500+","Expected Delegates"],["40+","Countries"],["6","Research Tracks"],["3","Conference Days"]].map(([n,l]) => (
            <div key={l}>
              <div className="stat-num">{n}</div>
              <div className="stat-lbl">{l}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   SECTION HEADER
───────────────────────────────────────────────────────────── */
function SH({ tag, title, sub, center, light }) {
  const align = center ? "center" : "left";
  return (
    <div style={{ textAlign: align, marginBottom: 46 }}>
      <p className="stag" style={{ justifyContent: center ? "center" : "flex-start" }}>{tag}</p>
      <h2 className={`stitle ${light ? "light" : "dark"}`}>{title}</h2>
      <div className={`title-bar${center ? " c" : ""}`} />
      {sub && (
        <p className={`sub-text ${light ? "light" : "dark"}`}
          style={{ maxWidth: center ? 620 : "100%", margin: center ? "0 auto" : undefined }}>
          {sub}
        </p>
      )}
    </div>
  );
}

/* ─────────────────────────────────────────────────────────────
   ABOUT SERIES
───────────────────────────────────────────────────────────── */
function AboutSeries() {
  const items = [
    { icon: <Globe size={21} />, title: "Global Research Initiative", text: "A worldwide network of scholars collaborating across borders to address pressing technological and societal challenges of our era." },
    { icon: <Calendar size={21} />, title: "Year-Round Series", text: "Operating June through March, SIARE hosts a continuous stream of international academic events spanning diverse disciplines." },
    { icon: <Users size={21} />, title: "Interdisciplinary Community", text: "Uniting researchers, technologists, policymakers, and practitioners for cross-sector dialogue and impactful scholarly exchange." },
    { icon: <Award size={21} />, title: "Publication Excellence", text: "Papers considered for Scopus-indexed journals and internationally recognized proceedings with registered ISBNs." },
  ];
  return (
    <section id="series" className="section s-cream2">
      <div className="container">
        <SH tag="SIARE Conference Series" title="A Global Platform for Academic Excellence"
          sub="The SIARE Conference Series is an international multi-disciplinary initiative uniting scholarly communities across continents, fostering sustainable innovation through structured academic dialogue." />
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(230px,1fr))", gap: 20 }}>
          {items.map(it => (
            <div key={it.title} className="card" style={{ padding: "26px 22px" }}>
              <div style={{ width: 42, height: 42, background: "var(--gold-pale)", borderRadius: 9, display: "flex", alignItems: "center", justifyContent: "center", color: "var(--gold)", marginBottom: 14 }}>{it.icon}</div>
              <h4 style={{ fontSize: "0.98rem", color: "var(--navy)", marginBottom: 9, fontWeight: 700 }}>{it.title}</h4>
              <p style={{ color: "var(--muted)", fontSize: "0.87rem", lineHeight: 1.75 }}>{it.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   ABOUT CONFERENCE
───────────────────────────────────────────────────────────── */
function AboutConference() {
  const objs = [
    { icon: <BookOpen size={16} />, title: "Promote", desc: "interdisciplinary collaboration across engineering, AI, and social sciences" },
    { icon: <Leaf size={16} />,     title: "Encourage", desc: "sustainable innovation through evidence-based research and policy dialogue" },
    { icon: <Globe size={16} />,    title: "Address", desc: "global challenges including climate, health, and digital inequality" },
    { icon: <Building size={16} />, title: "Foster", desc: "academia–industry partnerships for translational research impact" },
  ];
  return (
    <section id="about" className="section s-cream">
      <div className="container">
        <div className="g2">
          <div>
            <SH tag="About the Conference" title="Purpose, Vision & Global Reach" />
            <p style={{ color: "var(--muted)", lineHeight: 1.9, marginBottom: 18, fontSize: "0.95rem" }}>
              ICEAIT 2026 is a premier international academic conference fostering rigorous inquiry at the intersection of emerging technologies, artificial intelligence, and smart engineering systems.
            </p>
            <p style={{ color: "var(--muted)", lineHeight: 1.9, marginBottom: 26, fontSize: "0.95rem" }}>
              Anchored in the belief that technology must serve humanity, the conference invites contributions bridging theoretical inquiry with practical application — from AI-driven healthcare to smart urban infrastructure.
            </p>
            <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "var(--navy)", marginBottom: 13, fontSize: "0.94rem" }}>Target Audience</p>
            <div style={{ display: "flex", flexDirection: "column", gap: 9 }}>
              {["Researchers & PhD Scholars","Academic Faculty & Educators","Industry Professionals & Engineers","Policymakers & Think Tanks","Graduate & Postgraduate Students"].map(t => (
                <div key={t} style={{ display: "flex", alignItems: "flex-start", gap: 9 }}>
                  <CheckCircle size={15} style={{ color: "var(--gold)", flexShrink: 0, marginTop: 3 }} />
                  <span style={{ color: "var(--muted)", fontSize: "0.9rem" }}>{t}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, color: "var(--navy)", fontSize: "1.02rem", marginBottom: 4 }}>Conference Objectives</p>
            {objs.map(o => (
              <div key={o.title} style={{ display: "flex", gap: 13, background: "#fff", padding: "17px 20px", borderRadius: 10, boxShadow: "0 2px 12px rgba(7,17,31,0.06)", border: "1px solid var(--border)" }}>
                <div style={{ color: "var(--gold)", flexShrink: 0, marginTop: 2 }}>{o.icon}</div>
                <div>
                  <span style={{ fontWeight: 700, color: "var(--navy)", fontSize: "0.88rem" }}>{o.title} </span>
                  <span style={{ color: "var(--muted)", fontSize: "0.86rem" }}>{o.desc}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   TRACKS
───────────────────────────────────────────────────────────── */
function Tracks() {
  const tracks = [
    { icon: <Cpu size={22} />,      title: "Artificial Intelligence & Machine Learning", desc: "Deep learning, NLP, computer vision, autonomous systems, and AI ethics across industrial and societal domains." },
    { icon: <Zap size={22} />,      title: "Smart Engineering & IoT Systems", desc: "Intelligent sensors, embedded systems, cyber-physical systems, and smart manufacturing for Industry 4.0." },
    { icon: <Leaf size={22} />,     title: "Sustainable Engineering & Green Tech", desc: "Renewable energy, carbon-neutral design, circular economy models, and climate-responsive engineering." },
    { icon: <Building size={22} />, title: "Smart Cities & Infrastructure", desc: "Urban intelligence, smart mobility, digital twins, resilient infrastructure, and connected urban ecosystems." },
    { icon: <BarChart3 size={22} />,title: "Social Impact & Policy Innovation", desc: "Technology governance, digital equity, AI policy, SDG-aligned research, and ethics of emerging technologies." },
    { icon: <Globe size={22} />,    title: "Digital Transformation & Society", desc: "Digital economies, e-governance, Industry 5.0, human-computer interaction, and societal adaptation to tech." },
  ];
  return (
    <section id="tracks" className="section s-navy">
      <div className="container">
        <SH tag="Conference Tracks" title="Six Thematic Research Domains"
          sub="Each track represents an active frontier of global scholarship, inviting original contributions from diverse methodological and disciplinary perspectives."
          center light />
        <div className="g3">
          {tracks.map(t => (
            <div key={t.title} className="track-card">
              <div style={{ color: "var(--gold)", marginBottom: 14 }}>{t.icon}</div>
              <h4 style={{ fontSize: "0.96rem", color: "#fff", marginBottom: 9, lineHeight: 1.4 }}>{t.title}</h4>
              <p style={{ color: "rgba(255,255,255,0.48)", fontSize: "0.84rem", lineHeight: 1.7 }}>{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   SUBMISSION
───────────────────────────────────────────────────────────── */
function Submission() {
  const steps = [
    { n:"01", label:"Register",     desc:"Create your author account on the ICEAIT submission portal." },
    { n:"02", label:"Prepare",      desc:"Format manuscript per IEEE/APA guidelines (8–10 pages)." },
    { n:"03", label:"Upload",       desc:"Submit via EasyChair before the deadline." },
    { n:"04", label:"Peer Review",  desc:"Double-blind review by international subject experts." },
    { n:"05", label:"Notification", desc:"Acceptance/revision decision sent to corresponding author." },
    { n:"06", label:"Camera-Ready", desc:"Submit final version with signed copyright form." },
  ];
  return (
    <section id="submission" className="section s-cream2">
      <div className="container">
        <SH tag="Paper Submission" title="Guidelines & Submission Process" />
        <div className="g2" style={{ marginBottom: 50 }}>
          <div className="card" style={{ padding: 30 }}>
            <h3 style={{ fontSize: "1.03rem", color: "var(--navy)", marginBottom: 18, paddingBottom: 13, borderBottom: "2px solid var(--cream-2)" }}>Manuscript Requirements</h3>
            {[["Format","IEEE or APA citation style"],["Length","8–10 pages including references"],["Font","Times New Roman, 12pt"],["Spacing","1.5 line spacing"],["Language","English only"],["Scope","Original, unpublished work"]].map(([k,v]) => (
              <div key={k} style={{ display:"flex", justifyContent:"space-between", padding:"10px 0", borderBottom:"1px solid var(--cream-2)", fontSize:"0.88rem" }}>
                <span style={{ fontWeight:700, color:"var(--navy)" }}>{k}</span>
                <span style={{ color:"var(--muted)" }}>{v}</span>
              </div>
            ))}
          </div>
          <div style={{ display:"flex", flexDirection:"column", gap:18 }}>
            <div style={{ background:"var(--navy)", borderRadius:12, padding:26, color:"#fff" }}>
              <div style={{ display:"flex", gap:13 }}>
                <Shield size={21} style={{ color:"var(--gold)", flexShrink:0 }} />
                <div>
                  <h3 style={{ fontSize:"1rem", marginBottom:9 }}>Plagiarism Policy</h3>
                  <p style={{ color:"rgba(255,255,255,0.62)", fontSize:"0.86rem", lineHeight:1.75, marginBottom:14 }}>
                    All manuscripts screened via iThenticate. Submissions exceeding the threshold are immediately rejected without review.
                  </p>
                  <div style={{ background:"rgba(200,164,74,0.13)", border:"1px solid rgba(200,164,74,0.28)", borderRadius:8, padding:"13px 17px" }}>
                    <span style={{ color:"var(--gold-2)", fontFamily:"'Playfair Display',serif", fontSize:"1.65rem", fontWeight:900 }}>≤ 15%</span>
                    <span style={{ color:"rgba(255,255,255,0.4)", fontSize:"0.74rem", display:"block", marginTop:2, letterSpacing:"0.5px" }}>Maximum Permitted Similarity</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="card" style={{ padding:22 }}>
              <h4 style={{ fontSize:"0.96rem", color:"var(--navy)", marginBottom:9 }}>Abstract Requirements</h4>
              <p style={{ color:"var(--muted)", fontSize:"0.86rem", lineHeight:1.75 }}>
                Each submission must include a structured abstract of 250–300 words with 5–7 keywords aligned with ACM/IEEE Computing Classification categories.
              </p>
            </div>
          </div>
        </div>
        <h3 style={{ textAlign:"center", fontFamily:"'Playfair Display',serif", fontSize:"1.15rem", color:"var(--navy)", marginBottom:26 }}>Submission Process</h3>
        <div className="gauto">
          {steps.map(s => (
            <div key={s.n} className="step-card">
              <div className="step-num">{s.n}</div>
              <h5 style={{ color:"var(--navy)", marginBottom:7, fontSize:"0.94rem" }}>{s.label}</h5>
              <p style={{ color:"var(--muted)", fontSize:"0.81rem", lineHeight:1.65 }}>{s.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   REGISTRATION
───────────────────────────────────────────────────────────── */
function Registration() {
  const tiers = [
    { label:"Listener", price:"$50",  feat:false, features:["Access to all sessions","Digital conference kit","Certificate of attendance","Networking access"] },
    { label:"Student",  price:"$100", feat:false, features:["All Listener benefits","Printed conference kit","Student certificate","Publication eligibility"] },
    { label:"Academic", price:"$150", feat:true,  features:["All Student benefits","Journal submission access","Author certificate","Workshop access"] },
    { label:"Industry", price:"$250", feat:false, features:["All Academic benefits","Exhibition space","Industry recognition","Priority publication"] },
  ];
  return (
    <section id="registration" className="section s-cream">
      <div className="container">
        <SH tag="Registration" title="Conference Registration Categories"
          sub="Select the category that best represents your participation. All registrations include access to the full programme." center />
        <div className="g4">
          {tiers.map(t => (
            <div key={t.label} className={`tier${t.feat ? " feat" : ""}`}>
              {t.feat && <span className="gold-badge" style={{ marginBottom:13, display:"inline-block" }}>Most Popular</span>}
              <h4 style={{ fontSize:"0.98rem", color: t.feat ? "#fff" : "var(--navy)", marginBottom:5, fontWeight:700 }}>{t.label}</h4>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:"1.9rem", fontWeight:900, color:"var(--gold)", marginBottom:18, lineHeight:1 }}>{t.price}</div>
              <div style={{ display:"flex", flexDirection:"column", gap:8, marginBottom:22 }}>
                {t.features.map(f => (
                  <div key={f} style={{ display:"flex", gap:8, alignItems:"flex-start" }}>
                    <CheckCircle size={14} style={{ color:"var(--gold)", flexShrink:0, marginTop:3 }} />
                    <span style={{ color: t.feat ? "rgba(255,255,255,0.68)" : "var(--muted)", fontSize:"0.83rem", lineHeight:1.5 }}>{f}</span>
                  </div>
                ))}
              </div>
              <button
                onClick={() => goTo("contact")}
                style={{ width:"100%", padding:"11px", borderRadius:7, cursor:"pointer", fontSize:"0.88rem", fontWeight:700, fontFamily:"'Inter',sans-serif", transition:"all 0.2s", background: t.feat ? "linear-gradient(135deg,var(--gold),var(--gold-2))" : "transparent", color: t.feat ? "var(--navy)" : "var(--gold)", border: t.feat ? "none" : "1.5px solid var(--gold)" }}>
                Register
              </button>
            </div>
          ))}
        </div>

        {/* Publication */}
        <div style={{ background:"var(--navy)", borderRadius:14, padding:"38px 34px", marginTop:46, color:"#fff" }}>
          <SH tag="Publication" title="Publication Opportunities" light />
          <div className="g3">
            {[
              { icon:<BookOpen size={19}/>, title:"Scopus-Indexed Journals",       desc:"Selected papers invited for submission to affiliated Scopus-indexed international journals post-conference." },
              { icon:<FileText size={19}/>, title:"Conference Proceedings (ISBN)",  desc:"All accepted and presented papers published in official proceedings with a registered ISBN." },
              { icon:<Award size={19}/>,    title:"Extended Journal Publications",  desc:"Outstanding papers offered fast-track extended journal publication with dedicated editorial support." },
            ].map(p => (
              <div key={p.title} style={{ display:"flex", gap:13 }}>
                <div style={{ color:"var(--gold)", flexShrink:0, width:38, height:38, background:"rgba(200,164,74,0.1)", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center" }}>{p.icon}</div>
                <div>
                  <h5 style={{ fontSize:"0.93rem", marginBottom:6 }}>{p.title}</h5>
                  <p style={{ color:"rgba(255,255,255,0.5)", fontSize:"0.84rem", lineHeight:1.72 }}>{p.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   DATES
───────────────────────────────────────────────────────────── */
function Dates() {
  const events = [
    { date:"15 May 2026",    label:"Full Paper Submission Deadline",          icon:<FileText size={18}/>,   hi:false },
    { date:"01 June 2026",   label:"Review Notification to Authors",           icon:<Send size={18}/>,       hi:false },
    { date:"15 June 2026",   label:"Camera-Ready & Registration Deadline",     icon:<CheckCircle size={18}/>,hi:false },
    { date:"25–27 Aug 2026", label:"Conference Days — Boston, MA, USA",        icon:<Calendar size={18}/>,   hi:true  },
  ];
  return (
    <section id="dates" className="section s-navy2">
      <div className="container" style={{ maxWidth:800 }}>
        <SH tag="Key Deadlines" title="Important Dates"
          sub="Plan your participation accordingly. All deadlines are at 23:59 AoE (Anywhere on Earth)." center light />
        <div style={{ position:"relative" }}>
          <div style={{ position:"absolute", left:25, top:54, bottom:18, width:2, background:"rgba(200,164,74,0.14)", zIndex:0 }} />
          {events.map(e => (
            <div key={e.date} style={{ display:"flex", gap:18, marginBottom:14 }}>
              <div className={`tl-circle${e.hi ? " hi" : ""}`}>{e.icon}</div>
              <div className={`tl-box${e.hi ? " hi" : ""}`}>
                <p style={{ fontFamily:"'JetBrains Mono',monospace", color:"var(--gold)", fontSize:"0.77rem", marginBottom:3, letterSpacing:"0.5px" }}>{e.date}</p>
                <p style={{ color:"#fff", fontSize:"0.97rem", fontFamily:"'Playfair Display',serif", fontWeight: e.hi ? 700 : 400 }}>{e.label}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   COMMITTEE
───────────────────────────────────────────────────────────── */
function Committee() {
  const groups = {
    "Chief Patron":         [{ name:"Prof. Dr. William H. Ashford", role:"Vice-Chancellor, Cambridge Institute of Technology" }],
    "Conference Chair":     [{ name:"Prof. Dr. Anika R. Mehta",     role:"Dean, School of AI & Smart Systems, MIT Global" }],
    "Organizing Committee": [
      { name:"Dr. James O. Fitzgerald", role:"Dept. of Computer Engineering, Stanford University" },
      { name:"Dr. Priya Subramaniam",   role:"AI Research Lab, University of Edinburgh" },
      { name:"Dr. Carlos A. Rivera",    role:"School of Smart Systems, ETH Zurich" },
      { name:"Dr. Faisal Al-Mansoori",  role:"Dept. of Digital Innovation, KAUST" },
    ],
    "Technical Committee": [
      { name:"Prof. Yuki Tanaka",     role:"Institute of Robotics, University of Tokyo" },
      { name:"Dr. Olumide Adeyemo",   role:"AI Ethics Lab, University of Cape Town" },
      { name:"Dr. Sanjana Krishnan",  role:"Centre for IoT Research, IIT Bombay" },
      { name:"Dr. Lena Hoffmann",     role:"Green Technologies Institute, TU Berlin" },
    ],
  };
  return (
    <section id="committee" className="section s-cream">
      <div className="container">
        <SH tag="Conference Leadership" title="Organizing & Technical Committee" />
        <div style={{ display:"flex", flexDirection:"column", gap:36 }}>
          {Object.entries(groups).map(([cat, list]) => (
            <div key={cat}>
              <p style={{ fontFamily:"'JetBrains Mono',monospace", fontSize:"0.74rem", color:"var(--gold)", letterSpacing:"1.5px", textTransform:"uppercase", marginBottom:14, fontWeight:600 }}>{cat}</p>
              <div className="gauto2">
                {list.map(m => (
                  <div key={m.name} className="card" style={{ padding:"17px 20px", borderLeft:"3px solid var(--gold)" }}>
                    <p style={{ fontWeight:700, color:"var(--navy)", marginBottom:3, fontSize:"0.93rem" }}>{m.name}</p>
                    <p style={{ color:"var(--muted)", fontSize:"0.81rem", lineHeight:1.6 }}>{m.role}</p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   CONTACT
───────────────────────────────────────────────────────────── */
function Contact() {
  const [form, setForm] = useState({ name:"", email:"", message:"" });
  const [sent, setSent] = useState(false);
  const submit = (e) => {
    e.preventDefault();
    setSent(true);
    setForm({ name:"", email:"", message:"" });
    setTimeout(() => setSent(false), 4000);
  };
  return (
    <section id="contact" className="section s-navy">
      <div className="container">
        <SH tag="Get In Touch" title="Contact the Organizing Team" center light />
        <div className="g2">
          <div>
            <p style={{ color:"rgba(255,255,255,0.58)", lineHeight:1.9, marginBottom:30, fontSize:"0.94rem" }}>
              For inquiries about paper submissions, registrations, or conference logistics, please reach out through any channel below. Our organizing team aims to respond within 48 hours.
            </p>
            {[
              { icon:<Mail size={17}/>,   label:"Email",  val:"iceait2026@siare.org" },
              { icon:<Phone size={17}/>,  label:"Phone",  val:"+1 (617) 945-2260" },
              { icon:<MapPin size={17}/>, label:"Venue",  val:"Grand Academic Hall, International Conference Centre, Boston, MA, USA" },
            ].map(c => (
              <div key={c.label} style={{ display:"flex", gap:13, marginBottom:20 }}>
                <div style={{ color:"var(--gold)", flexShrink:0, width:38, height:38, background:"rgba(200,164,74,0.1)", borderRadius:8, display:"flex", alignItems:"center", justifyContent:"center" }}>{c.icon}</div>
                <div>
                  <p style={{ color:"rgba(255,255,255,0.32)", fontSize:"0.71rem", letterSpacing:"1px", textTransform:"uppercase", marginBottom:2, fontFamily:"'JetBrains Mono',monospace" }}>{c.label}</p>
                  <p style={{ color:"#fff", fontSize:"0.88rem" }}>{c.val}</p>
                </div>
              </div>
            ))}
          </div>
          <form onSubmit={submit} style={{ background:"rgba(255,255,255,0.03)", border:"1px solid rgba(255,255,255,0.07)", borderRadius:13, padding:"32px 28px" }}>
            {sent && (
              <div style={{ background:"rgba(200,164,74,0.1)", border:"1px solid rgba(200,164,74,0.32)", borderRadius:8, padding:"11px 15px", color:"var(--gold-2)", marginBottom:20, fontSize:"0.88rem" }}>
                ✓ Message sent. We'll respond within 48 hours.
              </div>
            )}
            {[{ id:"name", label:"Full Name", type:"text", ph:"Dr. Jane Doe" },{ id:"email", label:"Email Address", type:"email", ph:"jane.doe@university.edu" }].map(f => (
              <div key={f.id} style={{ marginBottom:18 }}>
                <label className="f-label">{f.label}</label>
                <input type={f.type} placeholder={f.ph} className="f-input" required
                  value={form[f.id]} onChange={e => setForm({ ...form, [f.id]:e.target.value })} />
              </div>
            ))}
            <div style={{ marginBottom:22 }}>
              <label className="f-label">Message</label>
              <textarea rows={5} placeholder="Describe your inquiry..." className="f-input" required
                style={{ resize:"vertical" }} value={form.message} onChange={e => setForm({ ...form, message:e.target.value })} />
            </div>
            <button type="submit" className="btn-gold" style={{ width:"100%", justifyContent:"center" }}>
              <Send size={15} /> Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

/* ─────────────────────────────────────────────────────────────
   FOOTER
───────────────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer style={{ background:"#050d18", borderTop:"1px solid rgba(200,164,74,0.1)", padding:"46px 28px 22px" }}>
      <div style={{ maxWidth:1160, margin:"0 auto" }}>
        <div className="footer-g" style={{ marginBottom:34 }}>
          <div>
            <div style={{ display:"flex", alignItems:"center", gap:10, marginBottom:13 }}>
              <div style={{ width:34, height:34, borderRadius:6, background:"linear-gradient(135deg,var(--gold),var(--gold-2))", display:"flex", alignItems:"center", justifyContent:"center", fontFamily:"'Playfair Display',serif", fontWeight:900, color:"var(--navy)", fontSize:13 }}>IC</div>
              <span style={{ fontFamily:"'Playfair Display',serif", color:"var(--gold-2)", fontWeight:700 }}>ICEAIT 2026</span>
            </div>
            <p style={{ color:"rgba(255,255,255,0.35)", fontSize:"0.84rem", lineHeight:1.8, maxWidth:310 }}>
              International Conference on Emerging Technologies, Artificial Intelligence, and Smart Engineering Systems. August 2026 · Boston, USA.
            </p>
          </div>
          <div>
            <p style={{ color:"rgba(255,255,255,0.25)", fontSize:"0.7rem", letterSpacing:"1.2px", textTransform:"uppercase", marginBottom:14, fontFamily:"'JetBrains Mono',monospace" }}>Quick Links</p>
            {[["series","Series"],["about","About"],["tracks","Tracks"],["submission","Submission"],["registration","Registration"],["dates","Dates"],["committee","Committee"]].map(([id,l]) => (
              <button key={id} onClick={() => goTo(id)} style={{ display:"block", color:"rgba(255,255,255,0.42)", background:"none", border:"none", cursor:"pointer", fontSize:"0.84rem", marginBottom:8, textAlign:"left", transition:"color 0.2s", padding:0, fontFamily:"'Inter',sans-serif" }}
                onMouseOver={e=>e.currentTarget.style.color="var(--gold-2)"} onMouseOut={e=>e.currentTarget.style.color="rgba(255,255,255,0.42)"}>
                {l}
              </button>
            ))}
          </div>
          <div>
            <p style={{ color:"rgba(255,255,255,0.25)", fontSize:"0.7rem", letterSpacing:"1.2px", textTransform:"uppercase", marginBottom:14, fontFamily:"'JetBrains Mono',monospace" }}>Contact</p>
            <p style={{ color:"rgba(255,255,255,0.42)", fontSize:"0.84rem", marginBottom:8 }}>iceait2026@siare.org</p>
            <p style={{ color:"rgba(255,255,255,0.42)", fontSize:"0.84rem", marginBottom:8 }}>+1 (617) 945-2260</p>
            <p style={{ color:"rgba(255,255,255,0.42)", fontSize:"0.84rem" }}>Boston, MA, USA</p>
          </div>
        </div>
        <div style={{ borderTop:"1px solid rgba(255,255,255,0.06)", paddingTop:18, display:"flex", justifyContent:"space-between", flexWrap:"wrap", gap:8 }}>
          <p style={{ color:"rgba(255,255,255,0.2)", fontSize:"0.76rem" }}>© 2026 ICEAIT · SIARE Conference Series. All rights reserved.</p>
          <p style={{ color:"rgba(255,255,255,0.2)", fontSize:"0.76rem" }}>Part of the SIARE Global Academic Initiative</p>
        </div>
      </div>
    </footer>
  );
}

/* ─────────────────────────────────────────────────────────────
   BACK TO TOP
───────────────────────────────────────────────────────────── */
function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const h = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);
  if (!show) return null;
  return (
    <button className="btt" onClick={() => window.scrollTo({ top:0, behavior:"smooth" })} aria-label="Back to top">
      <ChevronUp size={20} strokeWidth={2.5} />
    </button>
  );
}

/* ─────────────────────────────────────────────────────────────
   APP
───────────────────────────────────────────────────────────── */
export default function App() {
  return (
    <>
      <style>{STYLES}</style>
      <Navbar />
      <Hero />
      <AboutSeries />
      <AboutConference />
      <Tracks />
      <Submission />
      <Registration />
      <Dates />
      <Committee />
      <Contact />
      <Footer />
      <BackToTop />
    </>
  );
}
