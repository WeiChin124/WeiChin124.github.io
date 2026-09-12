import { lazy, Suspense, useEffect, useState } from "react";

const SystemScene = lazy(() => import("./components/SystemScene"));

const systemLayers = [
  { code: "H/W", label: "Hardware", detail: "GPIO · UART · Bring-up" },
  { code: "KRN", label: "Kernel", detail: "C/C++ · Linux · Drivers" },
  { code: "SYS", label: "System", detail: "AOSP · Services · Performance" },
  { code: "FWK", label: "Framework", detail: "Java · Android APIs" },
  { code: "APP", label: "Application", detail: "React Native · TypeScript · Kotlin" },
];

const motorolaHighlights = [
  "Promoted from Graduate Trainee to Software Engineer two months ahead of schedule.",
  "Develop Android platform features across application, framework, system, and kernel layers using Kotlin and C/C++.",
  "Completed a platform migration from Android 12 to Android 16 for next-generation chipset support.",
  "Improved boot performance and power efficiency through cross-layer root-cause analysis with hardware engineers.",
  "Developed C/C++ audio capabilities, including a Software AI Noise Suppressor for clearer voice communication.",
  "Support hardware bring-up and resolve complex Android, Linux, and embedded-system issues with hardware and QA teams.",
];

const mobileHighlights = [
  "Built and tested cross-platform mobile applications with React Native and TypeScript.",
  "Managed application data with MongoDB and Firebase.",
  "Resolved critical issues with the development team and communicated progress to stakeholders.",
  "Invited to continue contributing as a part-time developer after the internship.",
];

const skillGroups = [
  { title: "Languages", value: "C · C++ · Kotlin · Java · Python · TypeScript · JavaScript · C#" },
  { title: "Platform", value: "Android · AOSP · Linux · Embedded systems · React Native" },
  { title: "Hardware", value: "GPIO · UART · OneWire · Device drivers · Interrupts · Audio processing" },
  { title: "Data & delivery", value: "MongoDB · Firebase · SQL · Git · GitHub · AWS Cloud" },
];

function ArrowIcon() {
  return <span aria-hidden="true">↗</span>;
}

export default function App() {
  const [activeLayer, setActiveLayer] = useState(2);
  const [menuOpen, setMenuOpen] = useState(false);
  const [emailCopied, setEmailCopied] = useState(false);

  const copyEmail = async () => {
    const emailAddress = "sawweichin0412@gmail.com";

    try {
      await navigator.clipboard.writeText(emailAddress);
      setEmailCopied(true);
      window.setTimeout(() => setEmailCopied(false), 2000);
    } catch {
      window.prompt("Copy this email address:", emailAddress);
    }
  };

  useEffect(() => {
    const updateScroll = () => {
      const range = document.documentElement.scrollHeight - window.innerHeight;
      const progress = range > 0 ? window.scrollY / range : 0;
      document.documentElement.style.setProperty("--scroll-progress", progress.toFixed(4));
      document.documentElement.style.setProperty("--parallax-near", `${window.scrollY * -0.055}px`);
      document.documentElement.style.setProperty("--parallax-far", `${window.scrollY * -0.018}px`);
    };
    const revealObserver = new IntersectionObserver(
      (entries) => entries.forEach((entry) => entry.target.classList.toggle("is-visible", entry.isIntersecting)),
      { threshold: 0.14 },
    );
    document.querySelectorAll("[data-reveal]").forEach((element) => revealObserver.observe(element));
    updateScroll();
    window.addEventListener("scroll", updateScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateScroll);
      revealObserver.disconnect();
    };
  }, []);

  return (
    <main className="relative min-h-screen overflow-x-clip bg-[#03050d] text-white">
      <a className="skip-link" href="#experience">Skip to experience</a>
      <Suspense fallback={<div className="system-loader" aria-hidden="true" />}>
        <SystemScene activeLayer={activeLayer} onLayerChange={setActiveLayer} />
      </Suspense>
      <div className="atmosphere atmosphere-a" aria-hidden="true" />
      <div className="atmosphere atmosphere-b" aria-hidden="true" />

      <header className="site-header">
        <a className="brand" href="#home" aria-label="Saw Wei Chin, home">
          <span>SWC</span>
        </a>
        <button className="menu-button" type="button" aria-expanded={menuOpen} aria-controls="primary-nav" onClick={() => setMenuOpen((value) => !value)}>
          {menuOpen ? "Close" : "Menu"}
        </button>
        <nav id="primary-nav" className={menuOpen ? "nav-links is-open" : "nav-links"} aria-label="Primary navigation">
          <a href="#experience" onClick={() => setMenuOpen(false)}>Experience</a>
          <a href="#impact" onClick={() => setMenuOpen(false)}>Impact</a>
          <a href="#stack" onClick={() => setMenuOpen(false)}>Stack</a>
          <a href="#education" onClick={() => setMenuOpen(false)}>Education</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </nav>
        <a className="status-link" href="mailto:sawweichin0412@gmail.com"><span /> Available for opportunities</a>
      </header>

      <section id="home" className="hero section-shell">
        <div className="hero-copy" data-reveal>
          <p className="signal-label"><span>SW.ENGR</span> / PENANG, MY</p>
          <h1>
            Engineering
            <span>across every layer.</span>
          </h1>
          <p className="hero-intro">
            I&apos;m <strong>Saw Wei Chin</strong>, a Software Engineer building Android platform and embedded systems software—from application behavior to hardware integration.
          </p>
          <div className="hero-actions">
            <a className="primary-action" href="#experience">Enter portfolio <span>↓</span></a>
            <a className="text-action" href="/resume_v1.1.pdf.pdf" target="_blank" rel="noreferrer">Résumé <ArrowIcon /></a>
          </div>
          <div className="profile-links" aria-label="Professional profiles">
            <a href="https://github.com/WeiChin124" target="_blank" rel="noreferrer">GitHub <ArrowIcon /></a>
            <a href="https://www.linkedin.com/in/wei-chin-saw-a600a72b8/" target="_blank" rel="noreferrer">LinkedIn <ArrowIcon /></a>
          </div>
        </div>

        <aside className="identity-card" data-reveal aria-label="Profile card">
          <div className="scan-line" aria-hidden="true" />
          <div className="photo-frame">
            <img src="/profile-photo.jpeg" alt="Saw Wei Chin" />
          </div>
          <div className="identity-meta">
            <div><span>IDENTITY</span><strong>Saw Wei Chin</strong></div>
            <div><span>ROLE</span><strong>Software Engineer</strong></div>
          </div>
          <div className="identity-code" aria-hidden="true">ANDROID / EMBEDDED / MOBILE</div>
        </aside>

        <div className="layer-console" aria-label="Select a system layer">
          <p>ACTIVE SYSTEM LAYER</p>
          <div className="layer-selector">
            {systemLayers.map((layer, index) => (
              <button
                key={layer.code}
                type="button"
                className={activeLayer === index ? "is-active" : ""}
                aria-pressed={activeLayer === index}
                onClick={() => setActiveLayer(index)}
              >
                <span>{layer.code}</span>
                <b>{layer.label}</b>
              </button>
            ))}
          </div>
          <strong>{systemLayers[activeLayer].detail}</strong>
        </div>
      </section>

      <section id="experience" className="experience-section section-shell">
        <div className="section-heading" data-reveal>
          <p>01 / EXPERIENCE LOG</p>
          <h2>Work that crosses boundaries.</h2>
          <span>I trace the signal from user-facing behavior through Android services, Linux, drivers, and hardware.</span>
        </div>

        <div className="mission-list">
          <article className="mission-card" data-reveal>
            <div className="mission-rail"><span>NOW</span><i /></div>
            <div className="mission-content">
              <div className="mission-topline">
                <div><p>Motorola Solutions Sdn. Bhd.</p><h3>Software Engineer</h3></div>
                <time>JAN 2024 — PRESENT</time>
              </div>
              <ul>{motorolaHighlights.map((item) => <li key={item}>{item}</li>)}</ul>
              <div className="mission-tags"><span>ANDROID PLATFORM</span><span>AOSP</span><span>C/C++</span><span>KOTLIN</span><span>LINUX</span></div>
            </div>
          </article>

          <article className="mission-card" data-reveal>
            <div className="mission-rail"><span>PREV</span><i /></div>
            <div className="mission-content">
              <div className="mission-topline">
                <div><p>Euro Potential Sdn. Bhd.</p><h3>Mobile Application Developer & Intern</h3></div>
                <time>OCT 2022 — DEC 2023</time>
              </div>
              <ul>{mobileHighlights.map((item) => <li key={item}>{item}</li>)}</ul>
              <div className="mission-tags"><span>REACT NATIVE</span><span>TYPESCRIPT</span><span>MONGODB</span><span>FIREBASE</span></div>
            </div>
          </article>
        </div>
      </section>

      <section id="impact" className="impact-section">
        <div className="section-shell">
          <div className="section-heading compact" data-reveal>
            <p>02 / SYSTEM IMPACT</p>
            <h2>Evidence in the output.</h2>
          </div>
          <div className="impact-grid">
            <article data-reveal><span>12 → 16</span><h3>Android migration</h3><p>Advanced a production platform through four Android generations for next-generation chipset support.</p></article>
            <article data-reveal><span>−2 MONTHS</span><h3>Early promotion</h3><p>Progressed from Graduate Trainee to Software Engineer two months ahead of schedule.</p></article>
            <article data-reveal><span>BOOT + PWR</span><h3>System efficiency</h3><p>Resolved cross-layer bottlenecks to improve startup performance and energy use.</p></article>
            <article data-reveal><span>SW AINS</span><h3>Clearer audio</h3><p>Built C/C++ noise-suppression capability to strengthen voice clarity in demanding environments.</p></article>
          </div>
        </div>
      </section>

      <section id="stack" className="stack-section section-shell">
        <div className="section-heading" data-reveal>
          <p>03 / CAPABILITY MAP</p>
          <h2>Tools mapped to the problem.</h2>
        </div>
        <div className="capability-grid">
          {skillGroups.map((group, index) => (
            <article key={group.title} data-reveal>
              <span>0{index + 1}</span>
              <h3>{group.title}</h3>
              <p>{group.value}</p>
            </article>
          ))}
        </div>

      </section>

      <section id="education" className="education-section section-shell">
        <div className="section-heading" data-reveal>
          <p>04 / EDUCATION</p>
          <h2>Academic foundation.</h2>
          <span>Computer science study supporting work across software, systems, and embedded platforms.</span>
        </div>
        <div className="education-grid">
          <article data-reveal>
            <p>IN PROGRESS</p>
            <h3>Master of Computer Science</h3>
            <span>Universiti Sains Malaysia</span>
            <strong>CGPA 3.7300 / 4.00</strong>
          </article>
          <article data-reveal>
            <p>FOUNDATION</p>
            <h3>Bachelor of Computer Science (Honours)</h3>
            <span>Honours Degree with Distinction</span>
            <strong>CGPA 3.7903 / 4.00</strong>
          </article>
        </div>
      </section>

      <section id="contact" className="contact-section section-shell">
        <div className="contact-orbit" aria-hidden="true"><span /></div>
        <div data-reveal>
          <p>05 / OPEN CHANNEL</p>
          <h2>Let&apos;s build dependable systems.</h2>
          <span>I&apos;m open to Software Engineer and Software Developer opportunities.</span>
          <div className="contact-actions">
            <a className="primary-action" href="mailto:sawweichin0412@gmail.com">Start a conversation <ArrowIcon /></a>
            <button className="text-action copy-email" type="button" onClick={copyEmail} aria-live="polite">
              {emailCopied ? "Email copied!" : "Copy email"}
            </button>
            <a className="text-action" href="https://github.com/WeiChin124" target="_blank" rel="noreferrer">GitHub <ArrowIcon /></a>
            <a className="text-action" href="https://www.linkedin.com/in/wei-chin-saw-a600a72b8/" target="_blank" rel="noreferrer">LinkedIn <ArrowIcon /></a>
          </div>
        </div>
      </section>

      <footer className="site-footer section-shell">
        <span>© 2026 SAW WEI CHIN</span>
        <span>REACT · TYPESCRIPT · THREE.JS · TAILWIND CSS</span>
      </footer>
    </main>
  );
}
