import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import type { Category } from "../src/lib/categories";
import { componentEntrySchema } from "../src/schemas/component-entry";

type Difficulty = "beginner" | "intermediate" | "advanced";

type Seed = {
  slug: string;
  title: string;
  category: Category;
  tags: string[];
  difficulty: Difficulty;
  visual: string;
  interaction: string;
  motion: string;
};

const seeds: Seed[] = [
  { slug: "magnetic-glow-button", title: "Magnetic Glow Button", category: "buttons", tags: ["magnetic", "glow", "cta"], difficulty: "intermediate", visual: "a compact near-black call-to-action with a lime status dot, crisp white label, and a restrained cyan halo that feels magnetic rather than neon-heavy", interaction: "the control lifts toward the pointer, compresses on press, and keeps a clearly visible keyboard focus ring", motion: "use a spring with stiffness 300 and damping 24 for hover movement, plus a 140ms press response" },
  { slug: "liquid-fill-button", title: "Liquid Fill Button", category: "buttons", tags: ["liquid", "fill", "hover"], difficulty: "intermediate", visual: "a white pill button with a black outline and a solid lemon layer resting below the label", interaction: "the lemon layer rises from the bottom on hover or focus while the label changes contrast and remains readable", motion: "animate the fill over 420ms with cubic-bezier(0.22, 1, 0.36, 1), then use a 120ms tap scale" },
  { slug: "ripple-confirm-button", title: "Ripple Confirm Button", category: "buttons", tags: ["ripple", "confirmation", "microinteraction"], difficulty: "beginner", visual: "a rounded orange action button with a small circular confirmation indicator and strong black typography", interaction: "pressing creates a centered ripple impression and changes the indicator into a settled success state without moving surrounding layout", motion: "use a 180ms press, a 520ms ripple expansion with ease-out, and a spring check transition at stiffness 360 damping 22" },
  { slug: "tilt-spotlight-card", title: "Tilt Spotlight Card", category: "cards", tags: ["tilt", "spotlight", "depth"], difficulty: "advanced", visual: "a pale gray product card with a cyan spotlight disc, a compact category pill, and a large editorial number", interaction: "the card tilts subtly toward the pointer while the spotlight shifts inside its bounds and returns smoothly on leave", motion: "limit rotation to four degrees and use stiffness 300 damping 24 for the return spring" },
  { slug: "expandable-metric-card", title: "Expandable Metric Card", category: "cards", tags: ["metrics", "expand", "dashboard"], difficulty: "intermediate", visual: "a clean analytics tile with a 64px metric, lime delta pill, miniature bars, and generous white space", interaction: "hover expands the chart region and reveals a concise comparison label without causing a surrounding layout shift", motion: "use a 320ms ease-out reveal and stagger bars by 40ms" },
  { slug: "stacked-profile-card", title: "Stacked Profile Card", category: "cards", tags: ["profiles", "stack", "social"], difficulty: "beginner", visual: "three offset profile sheets using pink, purple, and white surfaces with circular initials and concise role labels", interaction: "hover fans the sheets apart, raises the front card, and preserves readable stacking on touch devices", motion: "use a spring at stiffness 280 damping 25 with 50ms stagger between sheets" },
  { slug: "floating-label-input", title: "Floating Label Input", category: "inputs", tags: ["form", "floating-label", "focus"], difficulty: "beginner", visual: "a spacious white input inside a soft gray panel with a compact label that floats above the typed value", interaction: "focus moves and scales the label, strengthens the border, and shows helper text without changing the field height", motion: "use a 180ms ease-out label transition and a 220ms focus-ring fade" },
  { slug: "otp-wave-input", title: "OTP Wave Input", category: "inputs", tags: ["otp", "verification", "wave"], difficulty: "intermediate", visual: "six individual rounded code cells with alternating cyan and lime accents and a restrained monospace treatment", interaction: "focus advances through cells, completed values rise in a small wave, and paste remains supported", motion: "stagger settled cells by 45ms using a stiffness 340 damping 23 spring" },
  { slug: "command-search-input", title: "Command Search Input", category: "inputs", tags: ["search", "command-menu", "keyboard"], difficulty: "intermediate", visual: "a wide search field with a magnifier, muted placeholder, and a small Command K keycap on the right", interaction: "focus expands the field slightly, reveals two suggestion rows, and supports arrow-key selection with a visible active option", motion: "use a 240ms ease-out panel reveal and 40ms stagger for results" },
  { slug: "morphing-pill-nav", title: "Morphing Pill Navigation", category: "navigation", tags: ["tabs", "pill", "active-state"], difficulty: "intermediate", visual: "a compact white navigation rail where the active item sits on a solid lime capsule", interaction: "the active capsule glides between labels while hover states remain subtle and keyboard focus stays independent", motion: "use a shared-layout spring with stiffness 320 damping 28 and no opacity crossfade" },
  { slug: "dock-magnifier-nav", title: "Dock Magnifier Navigation", category: "navigation", tags: ["dock", "magnification", "icons"], difficulty: "advanced", visual: "a near-black floating dock with five rounded square icons and one cyan notification dot", interaction: "icons nearest the pointer enlarge and lift while distant icons remain stable; keyboard focus provides the same emphasized state", motion: "use stiffness 300 damping 24 and cap scale at 1.35" },
  { slug: "breadcrumb-progress-nav", title: "Breadcrumb Progress Navigation", category: "navigation", tags: ["breadcrumb", "progress", "steps"], difficulty: "beginner", visual: "a three-step breadcrumb with numbered circles, compact labels, and a lemon progress connector", interaction: "completed steps appear solid, the current step pulses once, and links retain generous hit areas", motion: "animate the connector over 500ms with ease-in-out and the current marker with a 260ms spring" },
  { slug: "orbit-dot-loader", title: "Orbit Dot Loader", category: "loaders", tags: ["orbit", "loading", "dots"], difficulty: "beginner", visual: "three small cyan, lime, and orange dots orbiting a quiet central black disc", interaction: "the loop communicates indeterminate progress without flashing or sudden acceleration", motion: "use a 1.4 second linear orbit with evenly offset phases and honor reduced motion" },
  { slug: "elastic-bar-loader", title: "Elastic Bar Loader", category: "loaders", tags: ["bars", "elastic", "loading"], difficulty: "beginner", visual: "five rounded black bars on a lemon tile, varying in height like an audio equalizer", interaction: "bars stretch from their center in a continuous but calm elastic sequence", motion: "use 800ms ease-in-out loops with 70ms stagger and alternate direction" },
  { slug: "skeleton-shimmer-loader", title: "Soft Skeleton Loader", category: "loaders", tags: ["skeleton", "shimmer", "content"], difficulty: "beginner", visual: "an editorial card skeleton built from neutral gray blocks plus a small solid pink thumbnail placeholder", interaction: "a low-contrast highlight travels across the neutral blocks without obscuring their shapes", motion: "use a 1.6 second linear pass and disable movement under reduced-motion preferences" },
  { slug: "kinetic-type-reveal", title: "Kinetic Type Reveal", category: "text-effects", tags: ["typography", "reveal", "stagger"], difficulty: "intermediate", visual: "the word BUILD set in oversized tight black capitals with a cyan punctuation mark", interaction: "letters rise and unmask in sequence when the component enters or is replayed", motion: "use 420ms ease-out per character with 45ms stagger and no blur" },
  { slug: "split-flap-counter", title: "Split Flap Counter", category: "text-effects", tags: ["counter", "split-flap", "numbers"], difficulty: "advanced", visual: "four near-black mechanical number tiles with white monospace digits and a thin horizontal hinge line", interaction: "digits flip forward to the next value while the card dimensions remain fixed", motion: "use a 480ms perspective rotation with cubic-bezier(0.2, 0.8, 0.2, 1) and 60ms stagger" },
  { slug: "scramble-text-reveal", title: "Scramble Text Reveal", category: "text-effects", tags: ["scramble", "decode", "terminal"], difficulty: "intermediate", visual: "a compact system label where muted random glyphs resolve into a sharp final phrase beside a lime dot", interaction: "replay cycles through readable-length placeholders and settles without shifting width", motion: "resolve characters over 900ms with 35ms steps and stop entirely for reduced motion" },
  { slug: "cursor-dot-grid", title: "Cursor Dot Grid", category: "backgrounds", tags: ["cursor", "grid", "ambient"], difficulty: "advanced", visual: "a white field of tiny gray dots with a localized cluster turning cyan near the interaction point", interaction: "nearby dots scale gently with pointer proximity while the background itself never scroll-jacks", motion: "use 160ms interpolation and cap dot scale at 1.8" },
  { slug: "paper-noise-grid", title: "Paper Noise Grid", category: "backgrounds", tags: ["paper", "grid", "texture"], difficulty: "beginner", visual: "a warm off-white paper surface combining hairline gray rules, sparse black registration marks, and one lemon note", interaction: "the note lifts slightly on hover while the texture remains static and distraction-free", motion: "use a 220ms spring-like lift with no continuous animation" },
  { slug: "floating-color-orbs", title: "Floating Color Orbs", category: "backgrounds", tags: ["orbs", "ambient", "color"], difficulty: "intermediate", visual: "three solid pastel discs in cyan, pink, and purple floating on an otherwise white canvas without card gradients", interaction: "the discs drift along short independent paths and pause when reduced motion is requested", motion: "use 5–7 second ease-in-out loops, low travel distance, and alternate direction" },
  { slug: "page-curtain-transition", title: "Page Curtain Transition", category: "transitions", tags: ["page", "curtain", "route"], difficulty: "intermediate", visual: "a solid near-black curtain with a lime index badge sweeping across a white destination panel", interaction: "the curtain fully covers outgoing content before revealing the destination to avoid visual tearing", motion: "use 650ms cubic-bezier(0.76, 0, 0.24, 1) for both cover and reveal" },
  { slug: "shared-card-transition", title: "Shared Card Transition", category: "transitions", tags: ["shared-layout", "card", "detail"], difficulty: "advanced", visual: "a compact product tile expanding into a wider detail surface while its pink icon and title preserve identity", interaction: "selection grows the shared surface, relocates metadata, and keeps close controls reachable", motion: "use a layout spring at stiffness 260 damping 28 with a 120ms content crossfade" },
  { slug: "blur-swap-transition", title: "Blur Swap Transition", category: "transitions", tags: ["swap", "blur", "content"], difficulty: "beginner", visual: "two compact message states swapping inside a fixed white panel with a cyan status chip", interaction: "old content retreats while new content enters from the opposite side without changing panel height", motion: "use 220ms opacity and six-pixel translation; keep blur below four pixels" },
  { slug: "sticky-feature-stack", title: "Sticky Feature Stack", category: "scroll-effects", tags: ["sticky", "stack", "storytelling"], difficulty: "advanced", visual: "three editorial feature panels in white, lime, and near-black stacked within a compact scrolling viewport", interaction: "each panel pins briefly and scales down as the next panel overlaps, preserving native scrolling", motion: "map scroll progress to a scale range of 1 to 0.96 with no scrub delay" },
  { slug: "scroll-progress-timeline", title: "Scroll Progress Timeline", category: "scroll-effects", tags: ["timeline", "progress", "scroll"], difficulty: "intermediate", visual: "a slim vertical timeline with black milestones and a cyan progress line beside concise event labels", interaction: "the line fills as the internal content scrolls and active milestones gain a solid ring", motion: "smooth progress over 120ms while keeping the relationship directly tied to scroll position" },
  { slug: "parallax-caption-gallery", title: "Parallax Caption Gallery", category: "scroll-effects", tags: ["parallax", "gallery", "caption"], difficulty: "advanced", visual: "two solid-color editorial image blocks with oversized captions moving at a slightly different rate", interaction: "native scroll shifts captions by no more than 24 pixels and never hides essential text", motion: "use a direct scroll transform with clamped values and disable parallax for reduced motion" },
  { slug: "copy-success-toast", title: "Copy Success Toast", category: "misc", tags: ["toast", "copy", "feedback"], difficulty: "beginner", visual: "a near-black rounded toast with a lime check disc, concise success label, and muted keyboard hint", interaction: "the toast rises after copying, holds long enough to read, then exits without stealing focus", motion: "use a stiffness 360 damping 26 entrance, 1.8 second hold, and 180ms fade" },
  { slug: "animated-status-badge", title: "Animated Status Badge", category: "misc", tags: ["status", "badge", "presence"], difficulty: "beginner", visual: "a white status capsule with a green-lime dot, strong Available label, and an extremely soft outline", interaction: "the dot emits one restrained presence ring on mount and the entire badge responds to focus", motion: "use a 1.8 second low-opacity ring loop and disable the loop for reduced motion" },
  { slug: "radial-action-menu", title: "Radial Action Menu", category: "misc", tags: ["radial", "menu", "actions"], difficulty: "advanced", visual: "a black circular trigger surrounded by three pastel action buttons for save, share, and edit", interaction: "activation fans actions along a semicircle, supports Escape and outside click, and returns focus to the trigger", motion: "stagger actions by 45ms with stiffness 320 damping 24 and a 120ms trigger rotation" },
];

const accentByCategory: Record<Category, string> = {
  buttons: "#d8f34e",
  cards: "#53e8d4",
  inputs: "#f5e642",
  navigation: "#d8f34e",
  loaders: "#ff9950",
  "text-effects": "#53e8d4",
  backgrounds: "#f5c9d4",
  transitions: "#c5bff0",
  "scroll-effects": "#53e8d4",
  misc: "#d8f34e",
};

function makePrompt(seed: Seed) {
  return `Create a production-ready ${seed.title} component using React, Tailwind CSS, and Framer Motion. The visual direction is ${seed.visual}. Keep the composition aligned with a premium light-theme SaaS dashboard: use a white or #F4F5F6 surface, #111111 primary text, #4A4A4F supporting text, 20–24px corner radii, a one-pixel #ECECEE border where separation is needed, and only an extremely soft shadow. Do not add card gradients, default blue links, heavy shadows, or decorative clutter.

The interaction must work as follows: ${seed.interaction}. Implement motion precisely: ${seed.motion}. Animate transform and opacity whenever possible to avoid layout thrashing. The effect should start in a meaningful static state during server rendering, replay cleanly when remounted, and avoid infinite animation unless the pattern is explicitly a loader or ambient background. Use Framer Motion variants where multiple children coordinate, and keep state local to the component.

Make the component responsive from a 320px viewport through desktop widths. It must remain legible inside a compact preview card and expand naturally in a larger detail preview without fixed page-level positioning. Use fluid spacing, clamp oversized typography when appropriate, and keep touch targets at least 44 by 44 pixels. Do not depend on remote images, external CSS, network requests, random values, timers that are never cleaned up, or framework-specific server APIs.

Meet accessibility requirements: use semantic HTML, an explicit accessible name for icon-only controls, visible keyboard focus, logical tab order, sufficient text contrast, and appropriate ARIA only when native semantics are insufficient. Respect prefers-reduced-motion by replacing large movement with a short opacity change or a stable final state. Return a self-contained TypeScript React component that can be pasted into a Next.js client component, followed by any minimal usage example needed to reproduce the preview accurately.`;
}

function makeDemo(seed: Seed, index: number) {
  const accent = accentByCategory[seed.category];
  const secondary = ["#53e8d4", "#ff9950", "#c5bff0", "#f5c9d4"][index % 4];
  const base = `fontFamily: "Inter, sans-serif", color: "#111", boxSizing: "border-box"`;

  switch (seed.category) {
    case "buttons":
      return `(() => { const isDark = ${index % 2 === 0}; return <div style={{display:"grid",placeItems:"center",height:"100%",minHeight:180,background:"#f4f5f6",borderRadius:20}}><motion.button aria-label="${seed.title}" whileHover={{y:-3,scale:1.03}} whileTap={{scale:.94}} transition={{type:"spring",stiffness:300,damping:24}} style={{${base},position:"relative",overflow:"hidden",border:0,borderRadius:999,padding:"15px 24px",fontWeight:750,background:isDark?"#111":"${accent}",color:isDark?"#fff":"#111",boxShadow:"0 8px 24px rgba(0,0,0,.10)",cursor:"pointer"}}><motion.span aria-hidden animate={{scale:[1,1.45,1],opacity:[.75,.2,.75]}} transition={{duration:1.5,repeat:Infinity}} style={{display:"inline-block",width:8,height:8,borderRadius:99,marginRight:10,background:"${secondary}"}} />${seed.title.replace(" Button", "")}</motion.button></div>; })()`;
    case "cards":
      return `(() => <div style={{display:"grid",placeItems:"center",height:"100%",minHeight:220,background:"#f7f7f8",borderRadius:20,padding:20}}><motion.article whileHover={{y:-4,rotate:${index % 2 ? -1.5 : 1.5}}} transition={{type:"spring",stiffness:300,damping:24}} style={{${base},width:"min(100%,300px)",padding:22,borderRadius:22,background:"#fff",border:"1px solid #ececee",boxShadow:"0 10px 30px rgba(0,0,0,.06)"}}><div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}><span style={{fontSize:11,fontWeight:800,textTransform:"uppercase",letterSpacing:1.2}}>Featured</span><span style={{width:36,height:36,borderRadius:12,background:"${accent}"}} /></div><div style={{fontSize:${index % 2 ? 42 : 54},fontWeight:800,letterSpacing:-2,marginTop:24}}>${index % 2 ? "24.8K" : "86%"}</div><p style={{margin:"6px 0 18px",color:"#4a4a4f",fontSize:13}}>${seed.title}</p><div style={{display:"flex",gap:6,alignItems:"end",height:38}}>{[18,28,22,36,31].map((h,i)=><motion.span key={i} initial={{height:8}} animate={{height:h}} transition={{delay:i*.04,duration:.35}} style={{flex:1,borderRadius:8,background:i===4?"${accent}":"#e7e8ea"}} />)}</div></motion.article></div>)()`;
    case "inputs":
      return `(() => <div style={{display:"grid",placeItems:"center",height:"100%",minHeight:200,background:"#f4f5f6",borderRadius:20,padding:22}}><motion.label whileFocus={{scale:1.01}} style={{${base},display:"block",width:"min(100%,340px)",padding:18,borderRadius:20,background:"#fff",border:"1px solid #ececee",boxShadow:"0 6px 20px rgba(0,0,0,.04)"}}><span style={{display:"block",fontSize:11,fontWeight:800,textTransform:"uppercase",letterSpacing:1.2,marginBottom:9,color:"#6b6b71"}}>${seed.title}</span><span style={{display:"flex",alignItems:"center",gap:9}}><span aria-hidden style={{width:10,height:10,borderRadius:99,background:"${accent}"}} /><input aria-label="${seed.title}" placeholder="Start typing…" style={{${base},width:"100%",border:0,outline:0,fontSize:16,background:"transparent"}} /><kbd style={{padding:"5px 8px",borderRadius:8,background:"#f4f5f6",fontSize:11,color:"#777"}}>⌘K</kbd></span><motion.span initial={{scaleX:0}} animate={{scaleX:1}} transition={{duration:.45}} style={{display:"block",height:2,marginTop:12,transformOrigin:"left",background:"${accent}",borderRadius:99}} /></motion.label></div>)()`;
    case "navigation":
      return `(() => { const items=["Home","Explore","Saved"]; return <div style={{display:"grid",placeItems:"center",height:"100%",minHeight:180,background:"#f7f7f8",borderRadius:20}}><nav aria-label="Preview navigation" style={{${base},display:"flex",gap:6,padding:7,borderRadius:999,background:${index % 2 ? '"#111"' : '"#fff"'},boxShadow:"0 8px 24px rgba(0,0,0,.08)"}}>{items.map((item,i)=><motion.button key={item} whileHover={{y:-2,scale:1.04}} whileTap={{scale:.96}} style={{border:0,borderRadius:999,padding:"11px 15px",fontWeight:700,fontSize:12,background:i===${index % 3}?"${accent}":"transparent",color:${index % 2 ? 'i===' + (index % 3) + '?"#111":"#fff"' : '"#111"'},cursor:"pointer"}}>{item}</motion.button>)}</nav></div>; })()`;
    case "loaders":
      return index % 3 === 0
        ? `(() => <div role="status" aria-label="Loading" style={{display:"grid",placeItems:"center",height:"100%",minHeight:190,background:"#f4f5f6",borderRadius:20}}><motion.div animate={{rotate:360}} transition={{duration:1.4,repeat:Infinity,ease:"linear"}} style={{position:"relative",width:80,height:80,border:"1px solid #ddd",borderRadius:999}}>{["#53e8d4","#d8f34e","#ff9950"].map((c,i)=><span key={c} style={{position:"absolute",width:12,height:12,borderRadius:99,background:c,left:34,top:i*30-4,transform:"translateY(-50%)"}} />)}</motion.div><span style={{position:"absolute",width:18,height:18,borderRadius:99,background:"#111"}} /></div>)()`
        : `(() => <div role="status" aria-label="Loading" style={{display:"flex",alignItems:"center",justifyContent:"center",gap:7,height:"100%",minHeight:190,background:"${accent}",borderRadius:20}}>{[0,1,2,3,4].map(i=><motion.span key={i} animate={{height:[18,54,18]}} transition={{duration:.8,repeat:Infinity,delay:i*.07,ease:"easeInOut"}} style={{display:"block",width:9,height:18,borderRadius:99,background:i===2?"${secondary}":"#111"}} />)}<span className="sr-only">Loading</span></div>)()`;
    case "text-effects":
      return `(() => { const chars="${index % 2 ? "SIGNAL" : "BUILD"}".split(""); return <div style={{display:"grid",placeItems:"center",height:"100%",minHeight:190,background:"#fff",borderRadius:20,overflow:"hidden"}}><div aria-label={chars.join("")} style={{${base},display:"flex",alignItems:"baseline"}}>{chars.map((char,i)=><motion.span aria-hidden key={i} initial={{y:44,opacity:0}} animate={{y:0,opacity:1}} transition={{duration:.42,delay:i*.045,ease:[.22,1,.36,1]}} style={{fontSize:"clamp(40px,9vw,74px)",fontWeight:850,letterSpacing:-4}}>{char}</motion.span>)}<span style={{fontSize:54,fontWeight:900,color:"${accent}"}}>.</span></div></div>; })()`;
    case "backgrounds":
      return index % 3 === 0
        ? `(() => <div style={{display:"grid",gridTemplateColumns:"repeat(12,1fr)",gap:12,alignContent:"center",height:"100%",minHeight:220,padding:24,background:"#fff",borderRadius:20}}>{Array.from({length:72},(_,i)=><motion.span key={i} whileHover={{scale:2,backgroundColor:"${accent}"}} style={{width:4,height:4,borderRadius:99,background:i%11===0?"${accent}":"#cfd0d2"}} />)}</div>)()`
        : `(() => <div style={{position:"relative",height:"100%",minHeight:220,overflow:"hidden",background:"#fff",borderRadius:20}}>{["${accent}","${secondary}","#d8f34e"].map((c,i)=><motion.span key={c} animate={{x:[0,(i-1)*24,0],y:[0,(1-i)*18,0]}} transition={{duration:5+i,repeat:Infinity,ease:"easeInOut"}} style={{position:"absolute",width:80+i*22,height:80+i*22,borderRadius:999,background:c,left:28+i*66,top:38+i*28,opacity:.78}} />)}<span style={{position:"absolute",left:24,bottom:22,fontFamily:"Inter, sans-serif",fontWeight:800,fontSize:22}}>Quiet motion.</span></div>)()`;
    case "transitions":
      return `(() => <div style={{position:"relative",height:"100%",minHeight:220,overflow:"hidden",background:"#f4f5f6",borderRadius:20}}><div style={{position:"absolute",inset:0,display:"grid",placeItems:"center",${base},fontSize:26,fontWeight:800}}>New view <span style={{color:"${accent}"}}>02</span></div><motion.div initial={{x:"-102%"}} animate={{x:["-102%","0%","102%"]}} transition={{duration:1.8,repeat:Infinity,repeatDelay:.5,ease:[.76,0,.24,1]}} style={{position:"absolute",inset:0,display:"grid",placeItems:"center",background:"#111",color:"#fff",fontFamily:"Inter, sans-serif",fontWeight:800}}><span style={{padding:"8px 12px",borderRadius:999,background:"${accent}",color:"#111"}}>Transition</span></motion.div></div>)()`;
    case "scroll-effects":
      return `(() => <div aria-label="Scrollable effect preview" style={{height:230,overflowY:"auto",scrollbarWidth:"thin",background:"#f4f5f6",borderRadius:20,padding:14}}>{["Discover","Shape","Ship"].map((label,i)=><motion.section key={label} whileInView={{scale:1,opacity:1}} initial={{scale:.96,opacity:.65}} viewport={{amount:.7}} style={{${base},position:"sticky",top:12+i*10,minHeight:150,marginBottom:14,padding:20,borderRadius:20,background:i===1?"${accent}":i===2?"#111":"#fff",color:i===2?"#fff":"#111",boxShadow:"0 8px 24px rgba(0,0,0,.07)"}}><span style={{fontSize:11,textTransform:"uppercase",letterSpacing:1.3}}>0{i+1}</span><h3 style={{fontSize:32,margin:"34px 0 0",letterSpacing:-1.5}}>{label}</h3></motion.section>)}</div>)()`;
    case "misc":
      return `(() => <div style={{display:"grid",placeItems:"center",height:"100%",minHeight:200,background:"#f4f5f6",borderRadius:20}}><motion.div initial={{y:18,opacity:0,scale:.94}} animate={{y:0,opacity:1,scale:1}} transition={{type:"spring",stiffness:360,damping:26}} role="status" style={{${base},display:"flex",alignItems:"center",gap:12,padding:"12px 15px",borderRadius:18,background:${index % 2 ? '"#fff"' : '"#111"'},color:${index % 2 ? '"#111"' : '"#fff"'},boxShadow:"0 12px 30px rgba(0,0,0,.12)"}}><motion.span animate={{scale:[1,1.18,1]}} transition={{duration:1.8,repeat:Infinity}} style={{display:"grid",placeItems:"center",width:30,height:30,borderRadius:99,background:"${accent}",color:"#111",fontWeight:900}}>✓</motion.span><span><strong style={{display:"block",fontSize:13}}>${seed.title}</strong><small style={{color:${index % 2 ? '"#777"' : '"#b8b8bd"'}}}>Ready to use</small></span></motion.div></div>)()`;
  }
}

function makeReactCode(seed: Seed, demoCode: string) {
  const componentName = seed.slug
    .split("-")
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join("");

  return `"use client";

import { motion } from "framer-motion";

export default function ${componentName}() {
  return ${demoCode};
}`;
}

function makeCss(seed: Seed) {
  const accent = accentByCategory[seed.category];
  const animationName = seed.slug.replaceAll("-", "_");
  return `/* Suggested markup: <div class="uiwiki-${seed.slug}" tabindex="0"><span>${seed.title}</span></div> */
.uiwiki-${seed.slug} {
  display: grid;
  place-items: center;
  min-height: 11rem;
  padding: 1.25rem;
  border: 1px solid #ececee;
  border-radius: 22px;
  background: #ffffff;
  color: #111111;
  font: 700 1rem/1.2 Inter, system-ui, sans-serif;
  box-shadow: 0 2px 16px rgba(0, 0, 0, 0.04);
  transition: transform 240ms cubic-bezier(.22, 1, .36, 1), box-shadow 240ms ease;
}
.uiwiki-${seed.slug} > span {
  padding: .75rem 1rem;
  border-radius: 999px;
  background: ${accent};
  animation: ${animationName} 1.8s ease-in-out infinite alternate;
}
.uiwiki-${seed.slug}:hover,
.uiwiki-${seed.slug}:focus-visible {
  transform: translateY(-3px);
  box-shadow: 0 10px 28px rgba(0, 0, 0, 0.08);
}
@keyframes ${animationName} {
  from { transform: translateY(0) scale(1); }
  to { transform: translateY(-4px) scale(1.025); }
}
@media (prefers-reduced-motion: reduce) {
  .uiwiki-${seed.slug}, .uiwiki-${seed.slug} > span { animation: none; transition: none; }
}`;
}

async function main() {
  const directory = path.join(process.cwd(), "content", "components");
  await mkdir(directory, { recursive: true });

  await Promise.all(
    seeds.map(async (seed, index) => {
      const demoCode = makeDemo(seed, index);
      const entry = componentEntrySchema.parse({
        slug: seed.slug,
        title: seed.title,
        category: seed.category,
        tags: seed.tags,
        difficulty: seed.difficulty,
        prompt: makePrompt(seed),
        code: {
          react: makeReactCode(seed, demoCode),
          css: makeCss(seed),
        },
        demoCode,
        source: "original",
        createdAt: "2026-07-13T00:00:00.000Z",
      });

      await writeFile(
        path.join(directory, `${seed.slug}.json`),
        `${JSON.stringify(entry, null, 2)}\n`,
        "utf8",
      );
    }),
  );

  console.log(`Seeded ${seeds.length} original component entries.`);
}

main().catch((error: unknown) => {
  console.error(error);
  process.exitCode = 1;
});
