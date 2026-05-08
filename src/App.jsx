import React, {useEffect, useRef, useState} from "react";
import {GitHubCalendar} from "react-github-calendar";
import {AnimatePresence, motion, useMotionValue, useScroll, useSpring, useTransform} from "framer-motion";
import {
	ArrowUpRight,
	CalendarClock,
	ChevronDown,
	Eye,
	Github,
	Linkedin,
	Mail,
	MapPin,
	Phone,
	Rocket,
	Sparkles,
	User,
	Users,
	X
} from "lucide-react";

// ============================================================
//  PRIYANSHU DWIVEDI — PORTFOLIO
//  Bold & playful, warm/energetic, YC-builder narrative
// ============================================================

const palette = {
	bg: "#FFF4E6",        // cream
	ink: "#1A0F08",       // deep coffee
	orange: "#FF6B1A",
	red: "#E63946",
	yellow: "#FFB627",
	cream: "#FFE8C9",
};

// ---------- Custom Cursor ----------
function Cursor() {
	const x = useMotionValue(-100);
	const y = useMotionValue(-100);
	const sx = useSpring(x, {damping: 20, stiffness: 300, mass: 0.5});
	const sy = useSpring(y, {damping: 20, stiffness: 300, mass: 0.5});
	const [hovering, setHovering] = useState(false);
	const [label, setLabel] = useState("");

	useEffect(() => {
		const move = (e) => {
			x.set(e.clientX);
			y.set(e.clientY);
		};
		const over = (e) => {
			const t = e.target.closest("[data-cursor]");
			if (t) {
				setHovering(true);
				setLabel(t.dataset.cursor);
			} else {
				setHovering(false);
				setLabel("");
			}
		};
		window.addEventListener("mousemove", move);
		window.addEventListener("mouseover", over);
		return () => {
			window.removeEventListener("mousemove", move);
			window.removeEventListener("mouseover", over);
		};
	}, [x, y]);

	return (
		<>
			<motion.div
				style={{x: sx, y: sy}}
				className="pointer-events-none fixed left-0 top-0 z-[100] hidden md:block"
			>
				<motion.div
					animate={{scale: hovering ? 3 : 1}}
					className="relative -translate-x-1/2 -translate-y-1/2"
				>
					<div
						className="rounded-full"
						style={{
							width: 14, height: 14,
							background: hovering ? palette.red : palette.ink,
							mixBlendMode: hovering ? "normal" : "difference",
						}}
					/>
					{label && (
						<motion.div
							initial={{opacity: 0}} animate={{opacity: 1}}
							className="absolute left-6 top-2 whitespace-nowrap text-[10px] font-bold uppercase tracking-widest"
							style={{color: palette.ink}}
						>
							{label}
						</motion.div>
					)}
				</motion.div>
			</motion.div>
		</>
	);
}

// ---------- Marquee ----------
function Marquee({children, reverse = false}) {
	return (
		<div className="flex overflow-hidden whitespace-nowrap py-3 border-y-2" style={{borderColor: palette.ink}}>
			<motion.div
				animate={{x: reverse ? ["-50%", "0%"] : ["0%", "-50%"]}}
				transition={{duration: 30, repeat: Infinity, ease: "linear"}}
				className="flex shrink-0"
			>
				{[...Array(2)].map((_, i) => (
					<div key={i} className="flex shrink-0">{children}</div>
				))}
			</motion.div>
		</div>
	);
}

// ---------- Hero ----------
function Hero() {
	const containerRef = useRef(null);
	const {scrollYProgress} = useScroll({target: containerRef, offset: ["start start", "end start"]});
	const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
	const opacity = useTransform(scrollYProgress, [0, 0.7], [1, 0]);

	return (
		<section ref={containerRef} className="relative min-h-screen overflow-hidden" style={{background: palette.bg}}>
			{/* Subtle grid texture — barely visible, just adds atmosphere */}
			<div
				className="absolute inset-0 opacity-[0.08]"
				style={{
					backgroundImage: `linear-gradient(${palette.ink} 1px, transparent 1px), linear-gradient(90deg, ${palette.ink} 1px, transparent 1px)`,
					backgroundSize: "80px 80px",
				}}
			/>
			{/* Floating shapes */}
			<motion.div
				animate={{rotate: 360}}
				transition={{duration: 30, repeat: Infinity, ease: "linear"}}
				className="absolute -right-20 top-32 h-80 w-80 rounded-full opacity-40"
				style={{background: `radial-gradient(circle, ${palette.yellow} 0%, transparent 70%)`}}
			/>
			<motion.div
				animate={{y: [0, -40, 0]}}
				transition={{duration: 6, repeat: Infinity, ease: "easeInOut"}}
				className="absolute left-10 top-40 h-32 w-32 rounded-full"
				style={{background: palette.red, mixBlendMode: "multiply", opacity: 0.7}}
			/>

			{/* Top bar */}
			<div className="relative z-10 flex items-center justify-between px-8 pt-8 md:px-16">
				<div className="flex items-center gap-2 text-sm font-bold uppercase tracking-widest"
				     style={{color: palette.ink}}>
					<span className="inline-block h-2 w-2 animate-pulse rounded-full"
					      style={{background: palette.red}}/>
					Available for hire · 2026
				</div>
				<div className="hidden gap-6 text-sm font-bold uppercase tracking-widest md:flex"
				     style={{color: palette.ink}}>
					<a href="#work" data-cursor="explore">Work</a>
					<a href="#about" data-cursor="read">About</a>
					<a href="#contact" data-cursor="ping">Contact</a>
				</div>
			</div>

			{/* Headline */}
			<motion.div style={{y, opacity}}
			            className="relative z-10 flex min-h-[80vh] flex-col justify-center px-8 md:px-16">
				<motion.div
					initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.1}}
					className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border-2 px-4 py-1.5 text-xs font-bold uppercase tracking-widest"
					style={{borderColor: palette.ink, color: palette.ink, background: palette.cream}}
				>
					<Sparkles size={14}/> Full-stack engineer · YC alum
				</motion.div>

				<h1
					className="font-black leading-[0.85] tracking-tighter"
					style={{
						fontFamily: '"Fraunces", "Times New Roman", serif',
						fontSize: "clamp(3.5rem, 13vw, 12rem)",
						color: palette.ink,
					}}
				>
					<motion.span
						initial={{opacity: 0, x: -50}} animate={{opacity: 1, x: 0}}
						transition={{delay: 0.2, duration: 0.8}}
						className="block"
					>
						Priyanshu
					</motion.span>
					<motion.span
						initial={{opacity: 0, x: 50}} animate={{opacity: 1, x: 0}}
						transition={{delay: 0.35, duration: 0.8}}
						className="block"
						style={{color: palette.ink}}
					>
						Dwivedi<span style={{color: palette.red}}>.</span>
					</motion.span>
				</h1>

				<motion.p
					initial={{opacity: 0}} animate={{opacity: 1}} transition={{delay: 0.6}}
					className="mt-8 max-w-2xl text-lg font-medium md:text-xl"
					style={{color: palette.ink, fontFamily: '"Inter", sans-serif'}}
				>
					I ship products from <em style={{color: palette.red}}>zero to one</em> at YC startups.
					Built medical-device clouds, trading interfaces, AI-powered scanners.
					Helped take Morphle Labs past <strong>$1M revenue</strong> as part of a tiny team.
				</motion.p>

				<motion.div
					initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}} transition={{delay: 0.8}}
					className="mt-10 flex flex-wrap items-center gap-4"
				>
					<a
						href="#work" data-cursor="see work"
						className="group inline-flex items-center gap-3 rounded-full px-6 py-3 text-sm font-bold uppercase tracking-widest transition-transform hover:scale-105"
						style={{background: palette.ink, color: palette.bg}}
					>
						See the work <ArrowUpRight size={16} className="transition-transform group-hover:rotate-45"/>
					</a>
					<a
						href="#contact" data-cursor="say hi"
						className="inline-flex items-center gap-3 rounded-full border-2 px-6 py-3 text-sm font-bold uppercase tracking-widest transition-colors"
						style={{borderColor: palette.ink, color: palette.ink}}
					>
						Get in touch
					</a>
				</motion.div>
			</motion.div>

			{/* Scroll hint */}
			<motion.div
				animate={{y: [0, 10, 0]}}
				transition={{duration: 1.5, repeat: Infinity}}
				className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 text-xs font-bold uppercase tracking-widest"
				style={{color: palette.ink}}
			>
				<ChevronDown className="mx-auto mb-1" size={20}/>
				Scroll
			</motion.div>
		</section>
	);
}

// ---------- About ----------
function About() {
	return (
		<section id="about" className="relative overflow-hidden py-24 md:py-32"
		         style={{background: palette.ink, color: palette.bg}}>
			<div
				className="absolute inset-0 opacity-[0.06]"
				style={{
					backgroundImage: `radial-gradient(${palette.bg} 1px, transparent 1px)`,
					backgroundSize: "30px 30px",
				}}
			/>
			<div className="relative grid gap-16 px-8 md:grid-cols-12 md:px-16">
				<div className="md:col-span-4">
					<div className="text-xs font-bold uppercase tracking-widest" style={{color: palette.yellow}}>
						01 · About
					</div>
					<h2 className="mt-4 font-black leading-none tracking-tighter"
					    style={{fontFamily: '"Fraunces", serif', fontSize: "clamp(2.5rem, 6vw, 5rem)"}}>
						The <span style={{color: palette.orange}}>builder</span><br/> behind it all.
					</h2>
				</div>
				<div className="md:col-span-7 md:col-start-6 space-y-6 text-lg md:text-xl"
				     style={{fontFamily: '"Inter", sans-serif'}}>
					<p>
						I'm a full-stack engineer who's spent the last five years inside <strong
						style={{color: palette.yellow}}>tiny teams shipping ambitious products</strong> — usually as one
						of two or three people writing the code that becomes the company.
					</p>
					<p>
						At <strong style={{color: palette.orange}}>Morphle Labs (YC W20)</strong>, I built the entire
						frontend and most of the backend for AI-enabled robotic slide scanners that are now used by
						researchers and pathologists. At <strong style={{color: palette.orange}}>Galen Data</strong>, I
						built a medical-device cloud platform from scratch. At <strong
						style={{color: palette.orange}}>ETG</strong>, I built a production trading interface with
						real-time data feeds.
					</p>
					<p>
						I like the <em>zero-to-one</em> phase — the part where the product doesn't exist yet and someone
						needs to make a hundred small bets a day to get it shipped. Computer vision, microservices,
						motor control firmware, charting libraries — whatever the product needs, I'll learn it and build
						it.
					</p>
					<div className="flex flex-wrap gap-3 pt-4">
						{["YC W20 alum", "$1M+ revenue impact", "4+ startups", "0→1 specialist", "9.0 CPI · IIITDM"].map((tag) => (
							<span key={tag} className="rounded-full border px-4 py-1.5 text-sm font-bold"
							      style={{borderColor: palette.yellow, color: palette.yellow}}>
                {tag}
              </span>
						))}
					</div>
				</div>
			</div>
		</section>
	);
}

// ---------- Marquee Strip ----------
function SkillStrip() {
	const skills = ["React", "TypeScript", "Java", "Spring Boot", "Django", "Python", "AWS", "Angular", "C++", "Computer Vision", "PostgreSQL", "Redux"];
	return (
		<div style={{background: palette.yellow, color: palette.ink}}>
			<Marquee>
				{skills.map((s, i) => (
					<div key={i} className="flex shrink-0 items-center gap-6 px-6">
						<span style={{fontFamily: '"Fraunces", serif'}}
						      className="text-3xl font-black italic md:text-5xl">{s}</span>
						<span className="text-2xl">✦</span>
					</div>
				))}
			</Marquee>
		</div>
	);
}

// ---------- Projects (Draggable) ----------
const projects = [
	{
		title: "Whale Monitoring System",
		company: "Curiote",
		period: "Mar 2026 — Apr 2026",
		color: palette.red,
		rotate: -2,
		team: "Solo",
		tags: ["React", "Django", "Microservices", "Blockchain", "PostgreSQL", "WebSocket", "ZMQ", "Redis", "Telegram API", "X API", "Web3.py", "TypeScript", "GitHub Actions"],
		blurb: "Architected and built a real-time whale monitoring system for Bitcoin and Ethereum blockchains. Set up full node infrastructure for both chains, designed the microservices pipeline, and delivered end-to-end — from on-chain data ingestion to alert-driven dashboards.",
		highlight: "Full-node blockchain infrastructure",
		link: "https://curiote.com",
		details: {
			description: [
				"Real-time whale transaction detection across Bitcoin and Ethereum mainnet — tracking large movements of BTC, ETH, and 12+ major ERC20 tokens (USDT, USDC, WBTC, DAI, LINK, and more).",
				"Set up and configured full Bitcoin Core and Ethereum (Geth) nodes from scratch — RPC, WebSocket subscriptions, ZMQ block notifications, and cookie-based auth.",
				"Built async microservices architecture — dedicated services for ETH monitoring, BTC monitoring, price feeds, Telegram alerts, and X/Twitter alerts, each running in isolated threads with their own event loops and task queues.",
				"Implemented smart whale detection with configurable thresholds per token (e.g., 100+ BTC, 1000+ ETH, 5M+ USDT) with automatic USD conversion via live price feeds.",
				"Transaction confirmation pipeline with sliding-window block tracking — 6 confirmations for BTC, 12 for ETH — with full blockchain reorg detection and status rollback.",
				"Live Telegram bot alerts with intelligent message batching (respecting 4096-char limit), rate-limit handling, and retry-after backoff.",
				"Automated X/Twitter posting of whale alerts via OAuth1 + API v2, with 280-char formatting, rate-limit header parsing, and calculated cooldown.",
				"Real-time WebSocket streaming to the frontend via Django Channels + Redis — clients see whale alerts the moment they're confirmed, with auto-reconnect and connection status tracking.",
				"Built the full React + TypeScript dashboard — live alert feed with severity filtering, date range picker, token/wallet filters, detailed transaction drill-down with block explorer links, and copy-to-clipboard utilities.",
				"Multi-method authentication — email/password, Google OAuth, Twitter OAuth, and Web3 wallet signing (MetaMask, WalletConnect) via Reown AppKit.",
				"Historical backfill on service restart — automatically detects gaps and replays missed blocks (batch of 500 for ETH, sequential for BTC) before resuming live monitoring.",
				"CI/CD pipeline with GitHub Actions — automated tests on PostgreSQL 16 + Redis, SSH deployment to production, build and start scripts.",
			],
			architecture: "Django ASGI backend (Daphne) serving both HTTP REST APIs and WebSocket connections. Five microservices run as dedicated async threads: ETHWhaleService subscribes to Ethereum node via WebSocket (newHeads + ERC20 Transfer logs), BTCWhaleService subscribes via ZMQ (hashblock). Both feed detected whale transactions into PostgreSQL with atomic writes, then broadcast confirmed transactions through Redis-backed Django Channels to all connected clients. TelegramService and XService consume from the same channel and batch-distribute alerts with rate-limit awareness. PriceService keeps live USD conversion rates. React + TypeScript frontend connects via WebSocket for real-time updates, with Redux Toolkit managing state and Material UI (Joy) for the interface.",
			media: [],
		},
	},
	{
		title: "ETG Trading Interface",
		company: "ETG Commodities",
		period: "Aug 2024 — Dec 2024",
		color: palette.orange,
		rotate: 3,
		team: "Solo",
		tags: ["React", "Vite", "Django", "ChartIQ", "Redux Toolkit", "PostgreSQL", "AWS EB", "S3", "ECharts"],
		blurb: "Built production trading UI with ChartIQ — futures prices, fundamental data series, multiple report views. Integrated data sources, deployed to prod.",
		highlight: "Live in production",
		link: "#",
		details: {
			description: [
				"Built a full-stack trading simulation platform from scratch — interactive charting, order execution, risk management, and post-trade analytics, all solo.",
				"Integrated ChartIQ 9.4 with custom plugins — multi-chart grid layouts, Trading From Chart (TFC) for visual order placement, SignalIQ for custom indicators, and 50+ built-in technical studies.",
				"Implemented a complete order engine supporting market, limit, stop, and MIT orders — plus advanced bracket orders with One-Triggers-Other (OTO) and One-Cancels-Other (OCO) logic.",
				"Built a date-progression trading simulator — users advance through historical market data day-by-day, with limit/stop orders executing against real High/Low prices and slippage simulation.",
				"Value-at-Risk (VAR) and notional exposure tracking — calculated using 20-day historical volatility at 95% confidence, with automatic position liquidation if capital limits are breached.",
				"Custom QuoteFeed adapter that lazy-loads OHLCV data from the backend, caches fetched ranges per symbol, and streams new data as simulation progress advances.",
				"Post-simulation analytics dashboard with ECharts — Sharpe ratio, Sortino ratio, Calmar ratio, hit ratio, profit factor, mean trade duration, and per-product P&L breakdowns.",
				"External economic reports integrated into the trading timeline — earnings calendars, fundamental data series stored in S3, navigable by year/month within the chart view.",
				"Multi-product futures trading with contract expiry management — automatic order cancellation on expiry, symbol lookup with autocomplete, and per-contract pip values and tick sizes.",
				"Full authentication system with token-based auth, user-scoped simulations, and role-based permissions ensuring traders can only access their own positions and orders.",
				"Deployed to AWS Elastic Beanstalk with Nginx reverse proxy — React SPA served from dist, Django API proxied on /server, /auth, /data, /trader routes, S3 for media and report storage.",
				"CI/CD pipeline with GitHub Actions — automated deployment to Elastic Beanstalk on push to master, with AWS credentials managed via secrets.",
			],
			architecture: "React + TypeScript SPA (Vite) with Redux Toolkit for state management, communicating via REST APIs to a Django + DRF backend. ChartIQ 9.4 handles all charting with custom plugins for data feeding (QuoteFeed), symbol search (LookupDriver), and trade execution (TFC). The backend runs a simulation engine that processes orders against historical OHLCV data — market orders fill immediately with randomized slippage, limit/stop orders match against daily High/Low on date progression. PostgreSQL stores all market data, orders, trades, and simulation state. Reports and chart view configs persist to S3. Nginx reverse proxy routes API traffic to Django (port 8000) and serves the React SPA. Deployed on AWS Elastic Beanstalk with GitHub Actions CI/CD.",
			media: [],
		},
	},
	{
		title: "Widget Plug-in Framework",
		company: "Matrix One",
		period: "Feb 2023 — Current",
		color: palette.yellow,
		rotate: -1.5,
		team: "Solo",
		tags: ["Angular", "Spring", "TypeScript"],
		blurb: "Built scalable widget plug-in framework letting third-party developers create and integrate custom widgets into our cloud product — accelerating feature expansion.",
		highlight: "Ecosystem-grade extensibility",
		link: "#",
		details: {
			description: "",
			architecture: "",
			media: [],
		},
	},
	{
		title: "Galen Cloud Platform",
		company: "Galen Data Inc.",
		period: "Feb 2023 — May 2025",
		color: palette.red,
		rotate: 2,
		team: "3 Engineers",
		tags: ["Angular", "Spring", "Java", "AWS"],
		blurb: "Built configurable, scalable cloud platform that lets medical devices centralize data and leverage cloud tech. Full-stack from architecture to UI.",
		highlight: "FDA-context medical infrastructure",
		link: "#",
		details: {
			description: "",
			architecture: "",
			media: [],
		},
	},
	{
		title: "Morphle Cloud & Scanners",
		company: "Morphle Labs · YC W20",
		period: "Dec 2021 — Feb 2023",
		color: palette.orange,
		rotate: -3,
		team: "2 Engineers",
		tags: ["React", "Django", "Computer Vision", "AWS"],
		blurb: "Built complete frontend & backend for AI-enabled robotic slide scanners. Created 2D map-based interfaces that stitch microscopic images into whole-slide scans. Wrote camera/motor wrappers, microservices, real-time AI detection.",
		highlight: "Helped drive revenue past $1M",
		link: "https://morphlelabs.com",
		details: {
			description: "",
			architecture: "",
			media: [],
		},
	},
	{
		title: "On-Chain Bitcoin Analytics",
		company: "Jarvis Labs LLC",
		period: "Jun 2021 — Dec 2021",
		color: palette.red,
		rotate: -2.5,
		team: "Solo",
		tags: ["Python", "Streamlit", "Plotly", "Heroku"],
		blurb: "End-to-end on-chain analytics — scraped Blockchair, tracked top 100 richest BTC wallets, real-time Streamlit dashboard with automated CI/CD.",
		highlight: "Continuous deployment to cloud",
		link: "#",
		details: {
			description: "",
			architecture: "",
			media: [],
		},
	},
	{
		title: "ML Ops Dashboards",
		company: "SG Analytics Pvt. Ltd.",
		period: "Jan 2021 — Jun 2021",
		color: palette.yellow,
		rotate: 1.5,
		team: "Solo",
		tags: ["Azure ML", "Python", "Plotly Dash"],
		blurb: "Built ML models on Azure ML, managed full ML project lifecycle, shipped analytical dashboards on cloud with Plotly Dash.",
		highlight: "End-to-end ML lifecycle",
		link: "#",
		details: {
			description: "",
			architecture: "",
			media: [],
		},
	},
];

function ProjectDetailModal({project, onClose}) {
	useEffect(() => {
		const handleKey = (e) => e.key === "Escape" && onClose();
		document.body.style.overflow = "hidden";
		window.addEventListener("keydown", handleKey);
		return () => {
			document.body.style.overflow = "";
			window.removeEventListener("keydown", handleKey);
		};
	}, [onClose]);

	return (
		<motion.div
			initial={{opacity: 0}}
			animate={{opacity: 1}}
			exit={{opacity: 0}}
			className="fixed inset-0 z-[200] flex items-center justify-center p-4 md:p-8"
			style={{background: "rgba(26,15,8,0.85)", backdropFilter: "blur(8px)"}}
			onClick={onClose}
		>
			<motion.div
				initial={{opacity: 0, y: 40, scale: 0.95}}
				animate={{opacity: 1, y: 0, scale: 1}}
				exit={{opacity: 0, y: 40, scale: 0.95}}
				transition={{duration: 0.3}}
				onClick={(e) => e.stopPropagation()}
				className="relative max-h-[90vh] w-full max-w-4xl overflow-y-auto rounded-3xl border-[3px] p-8 md:p-12"
				style={{background: palette.bg, borderColor: palette.ink, color: palette.ink}}
			>
				<button
					onClick={onClose}
					className="absolute right-4 top-4 rounded-full border-2 p-2 transition-colors hover:bg-black/10"
					style={{borderColor: palette.ink}}
				>
					<X size={18}/>
				</button>

				<div className="mb-2 text-xs font-black uppercase tracking-widest opacity-60">{project.period}</div>
				<div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider opacity-90">
					{project.company}
					{project.link && project.link !== "#" && (
						<a href={project.link} target="_blank" rel="noreferrer"
						   className="opacity-60 transition-opacity hover:opacity-100">
							<ArrowUpRight size={14}/>
						</a>
					)}
				</div>
				<h2 className="mt-3 font-black leading-tight tracking-tight"
				    style={{fontFamily: '"Fraunces", serif', fontSize: "clamp(2rem, 4vw, 3rem)"}}>
					{project.title}
				</h2>

				<div className="mt-4 flex flex-wrap gap-2">
					{project.tags.map((t) => (
						<span key={t} className="rounded-full border-2 px-3 py-1 text-xs font-bold"
						      style={{borderColor: palette.ink, background: project.color + "33"}}>
							{t}
						</span>
					))}
					<span className="flex items-center gap-1 rounded-full border-2 px-3 py-1 text-xs font-bold"
					      style={{borderColor: palette.ink}}>
						{project.team === "Solo" ? <User size={10}/> : <Users size={10}/>}
						{project.team}
					</span>
				</div>

				<div className="mt-8">
					<h3 className="text-sm font-black uppercase tracking-widest" style={{color: palette.red}}>About</h3>
					{Array.isArray(project.details?.description) && project.details.description.length > 0 ? (
						<ul className="mt-3 space-y-3" style={{fontFamily: '"Inter", sans-serif'}}>
							{project.details.description.map((point, i) => (
								<li key={i} className="flex gap-3 text-base leading-relaxed">
									<span className="mt-1.5 h-2 w-2 shrink-0 rounded-full"
									      style={{background: project.color}}/>
									{point}
								</li>
							))}
						</ul>
					) : (
						<p className="mt-3 text-base leading-relaxed" style={{fontFamily: '"Inter", sans-serif'}}>
							{project.details?.description || project.blurb}
						</p>
					)}
				</div>

				{project.details?.architecture && (
					<div className="mt-8">
						<h3 className="text-sm font-black uppercase tracking-widest"
						    style={{color: palette.red}}>Architecture</h3>
						<p className="mt-3 text-base leading-relaxed" style={{fontFamily: '"Inter", sans-serif'}}>
							{project.details.architecture}
						</p>
					</div>
				)}

				{project.details?.media?.length > 0 && (
					<div className="mt-8">
						<h3 className="mb-4 text-sm font-black uppercase tracking-widest"
						    style={{color: palette.red}}>Screenshots & Demos</h3>
						<div className="grid gap-4 md:grid-cols-2">
							{project.details.media.map((item, i) => (
								<div key={i} className="overflow-hidden rounded-2xl border-2"
								     style={{borderColor: palette.ink}}>
									{item.type === "video" ? (
										<video src={item.src} controls className="w-full" poster={item.poster}/>
									) : (
										<img src={item.src} alt={item.alt || project.title} className="w-full"/>
									)}
									{item.caption && (
										<div className="border-t-2 px-4 py-2 text-xs font-bold"
										     style={{borderColor: palette.ink}}>
											{item.caption}
										</div>
									)}
								</div>
							))}
						</div>
					</div>
				)}

				<div className="mt-8 flex items-center gap-2 border-t-2 pt-6 text-sm font-bold"
				     style={{borderColor: palette.ink}}>
					<Sparkles size={14} style={{color: palette.orange}}/> {project.highlight}
				</div>
			</motion.div>
		</motion.div>
	);
}

function ProjectCard({project, index}) {
	const [showDetail, setShowDetail] = useState(false);
	return (
		<>
			<motion.div
				drag
				dragConstraints={{left: -100, right: 100, top: -50, bottom: 50}}
				dragElastic={0.3}
				whileDrag={{scale: 1.05, rotate: 0, zIndex: 50, cursor: "grabbing"}}
				whileHover={{scale: 1.02, rotate: 0}}
				initial={{opacity: 0, y: 60, rotate: project.rotate}}
				whileInView={{opacity: 1, y: 0, rotate: project.rotate}}
				viewport={{once: true, margin: "-50px"}}
				transition={{duration: 0.6, delay: index * 0.05}}
				data-cursor="drag me"
				className="relative cursor-grab select-none rounded-3xl border-[3px] p-7 shadow-[8px_8px_0px_0px_#1A0F08] md:p-8"
				style={{
					background: project.color,
					borderColor: palette.ink,
					color: palette.ink,
				}}
			>
				<div className="flex items-start justify-between gap-4">
					<div className="flex items-center gap-3">
						<div className="text-xs font-black uppercase tracking-widest opacity-80">{project.period}</div>
						<div
							className="flex items-center gap-1 rounded-full border-2 px-2.5 py-0.5 text-[10px] font-black uppercase tracking-widest"
							style={{borderColor: palette.ink, opacity: 0.8}}>
							{project.team === "Solo" ? <User size={10}/> : <Users size={10}/>}
							{project.team}
						</div>
					</div>
					<div className="rounded-full border-2 px-3 py-0.5 text-[10px] font-black uppercase tracking-widest"
					     style={{borderColor: palette.ink}}>
						{String(index + 1).padStart(2, "0")}
					</div>
				</div>
				{project.link && project.link !== "#" ? (
					<a href={project.link} target="_blank" rel="noreferrer"
					   className="group mt-2 inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-wider opacity-90 transition-opacity hover:opacity-70"
					   data-cursor="visit">
						{project.company} <ArrowUpRight size={13}
						                                className="transition-transform group-hover:rotate-45"/>
					</a>
				) : (
					<div className="mt-2 text-sm font-bold uppercase tracking-wider opacity-90">{project.company}</div>
				)}
				<h3 className="mt-3 font-black leading-tight tracking-tight"
				    style={{fontFamily: '"Fraunces", serif', fontSize: "clamp(1.5rem, 2.5vw, 2.25rem)"}}>
					{project.title}
				</h3>
				<p className="mt-4 text-base leading-relaxed" style={{fontFamily: '"Inter", sans-serif'}}>
					{project.blurb}
				</p>
				<div className="mt-5 flex flex-wrap gap-2">
					{project.tags.map((t) => (
						<span key={t} className="rounded-full border-2 bg-black/5 px-3 py-1 text-xs font-bold"
						      style={{borderColor: palette.ink}}>
							{t}
						</span>
					))}
				</div>
				<div className="mt-6 flex items-center justify-between border-t-2 pt-5"
				     style={{borderColor: palette.ink}}>
					<div className="flex items-center gap-2 text-sm font-bold">
						<Sparkles size={14}/> {project.highlight}
					</div>
					<button
						onClick={() => setShowDetail(true)}
						className="group inline-flex items-center gap-1.5 text-sm font-bold uppercase tracking-widest transition-opacity hover:opacity-70"
						data-cursor="details"
					>
						<Eye size={14}/> Details
					</button>
				</div>
			</motion.div>
			<AnimatePresence>
				{showDetail && <ProjectDetailModal project={project} onClose={() => setShowDetail(false)}/>}
			</AnimatePresence>
		</>
	);
}

function Work() {
	return (
		<section id="work" className="relative overflow-hidden py-24 md:py-32" style={{background: palette.bg}}>
			<div className="px-8 md:px-16">
				<div className="mb-16 flex flex-wrap items-end justify-between gap-6">
					<div>
						<div className="text-xs font-bold uppercase tracking-widest" style={{color: palette.red}}>
							02 · Selected Work
						</div>
						<h2 className="mt-4 font-black leading-none tracking-tighter" style={{
							fontFamily: '"Fraunces", serif',
							fontSize: "clamp(2.5rem, 7vw, 6rem)",
							color: palette.ink
						}}>
							Things I've <span className="italic" style={{color: palette.orange}}>shipped</span>.
						</h2>
					</div>
					<div className="max-w-md text-base font-medium" style={{color: palette.ink}}>
            <span className="inline-block rounded-full border-2 px-3 py-1 text-xs font-black uppercase tracking-widest"
                  style={{borderColor: palette.ink}}>
              ✋ Drag the cards
            </span>
						<p className="mt-3 opacity-80">Six products. Four startups. One pattern: small teams, big
							stakes, real users. Pick something up — I won't mind.</p>
					</div>
				</div>

				<div className="grid gap-8 md:grid-cols-2 lg:gap-10">
					{projects.map((p, i) => (
						<ProjectCard key={p.title} project={p} index={i}/>
					))}
				</div>
			</div>
		</section>
	);
}

// ---------- Timeline ----------
const timeline = [
	{year: "2026", title: "Senior Software Engineer", org: "Matrix One", note: "Widget framework, plugin architecture"},
	{
		year: "2023",
		title: "Full Stack Software Engineer",
		org: "Galen Data Inc.",
		note: "Medical device cloud, 0→1 build"
	},
	{year: "2024", title: "Full Stack (Contract)", org: "ETG Commodities", note: "Trading interface in production"},
	{
		year: "2021",
		title: "Full Stack Software Engineer",
		org: "Morphle Labs · YC W20",
		note: "AI scanners, $1M+ revenue era"
	},
	{year: "2021", title: "On-Chain Analyst", org: "Jarvis Labs LLC", note: "Bitcoin whale tracking dashboards"},
	{year: "2021", title: "ML Ops Engineer", org: "SG Analytics", note: "Azure ML lifecycle & dashboards"},
	{
		year: "2017–21",
		title: "B.Tech, ECE · CPI 9.0",
		org: "IIITDM",
		note: "Indian Institute of Information Technology, Design & Manufacturing"
	},
];

function Timeline() {
	return (
		<section className="relative py-24 md:py-32" style={{background: palette.cream}}>
			<div className="px-8 md:px-16">
				<div className="mb-16">
					<div className="text-xs font-bold uppercase tracking-widest" style={{color: palette.red}}>
						03 · The road so far
					</div>
					<h2 className="mt-4 font-black leading-none tracking-tighter" style={{
						fontFamily: '"Fraunces", serif',
						fontSize: "clamp(2.5rem, 7vw, 6rem)",
						color: palette.ink
					}}>
						Five years, <span className="italic" style={{color: palette.red}}>tiny teams</span>.
					</h2>
				</div>
				<div className="relative mx-auto max-w-4xl">
					<div className="absolute bottom-0 left-4 top-0 w-1 md:left-1/2" style={{background: palette.ink}}/>
					{timeline.map((t, i) => (
						<motion.div
							key={i}
							initial={{opacity: 0, x: i % 2 === 0 ? -40 : 40}}
							whileInView={{opacity: 1, x: 0}}
							viewport={{once: true, margin: "-80px"}}
							transition={{duration: 0.5}}
							className={`relative mb-10 flex items-start gap-6 md:mb-14 md:w-1/2 ${i % 2 === 0 ? "md:pr-12" : "md:ml-auto md:pl-12"}`}
						>
							<div className="absolute left-2 top-3 h-5 w-5 rounded-full border-[3px] md:left-auto"
							     style={{
								     background: palette.orange,
								     borderColor: palette.ink,
								     ...(i % 2 === 0 ? {right: "-14px"} : {left: "-14px"}),
							     }}/>
							<div className="ml-12 md:ml-0">
								<div className="text-xs font-black uppercase tracking-widest"
								     style={{color: palette.red}}>{t.year}</div>
								<div className="mt-1 text-2xl font-black"
								     style={{fontFamily: '"Fraunces", serif', color: palette.ink}}>{t.title}</div>
								<div className="text-base font-bold" style={{color: palette.orange}}>{t.org}</div>
								<div className="mt-1 text-sm opacity-70" style={{color: palette.ink}}>{t.note}</div>
							</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}

// ---------- GitHub Activity ----------
function GitHubActivity() {
	const currentYear = new Date().getFullYear();
	const years = Array.from({length: 5}, (_, i) => currentYear - i);
	const [selectedYear, setSelectedYear] = useState(undefined);
	const theme = {
		dark: ["#382010", "#FF6B1A33", "#FF6B1A77", "#FF6B1ABB", "#FF6B1A"],
	};
	return (
		<section className="relative py-24 md:py-32" style={{background: palette.ink}}>
			<div className="px-8 md:px-16">
				<div className="mb-16">
					<div className="text-xs font-bold uppercase tracking-widest" style={{color: palette.yellow}}>
						04 · GitHub Activity
					</div>
					<h2 className="mt-4 font-black leading-none tracking-tighter" style={{
						fontFamily: '"Fraunces", serif',
						fontSize: "clamp(2.5rem, 7vw, 6rem)",
						color: palette.bg,
					}}>
						I <span className="italic" style={{color: palette.orange}}>ship</span> consistently.
					</h2>
				</div>
				<div className="mb-4 flex flex-wrap gap-2">
					{[undefined, ...years].map((year) => (
						<button
							key={year ?? "last"}
							onClick={() => setSelectedYear(year)}
							className="rounded-full px-4 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors"
							style={{
								background: selectedYear === year ? palette.orange : "rgba(255,244,230,0.08)",
								color: selectedYear === year ? palette.ink : palette.bg,
								border: `1.5px solid ${selectedYear === year ? palette.orange : "rgba(255,244,230,0.15)"}`,
							}}
						>
							{year ?? "Last Year"}
						</button>
					))}
				</div>
				<motion.div
					initial={{opacity: 0, y: 40}}
					whileInView={{opacity: 1, y: 0}}
					viewport={{once: true}}
					transition={{duration: 0.6}}
					className="overflow-x-auto rounded-3xl border-[3px] p-6 md:p-8"
					style={{borderColor: palette.orange, background: "rgba(255,244,230,0.05)"}}
				>
					<GitHubCalendar
						key={selectedYear ?? "last"}
						username="jerryankur"
						year={selectedYear}
						colorScheme="dark"
						theme={theme}
						blockSize={14}
						blockMargin={4}
						fontSize={14}
						style={{width: "100%", color: palette.bg}}
					/>
				</motion.div>
				<div className="mt-6 flex items-center gap-3">
					<a
						href="https://github.com/jerryankur"
						target="_blank"
						rel="noreferrer"
						data-cursor="repos"
						className="group inline-flex items-center gap-2 text-sm font-bold uppercase tracking-widest transition-colors hover:text-orange-400"
						style={{color: palette.yellow}}
					>
						<Github size={16}/> View full profile
						<ArrowUpRight size={14} className="transition-transform group-hover:rotate-45"/>
					</a>
				</div>
			</div>
		</section>
	);
}

// ---------- Beyond Code ----------
function BeyondCode() {
	const items = [
		{icon: "🏆", title: "Top 0.01%", note: "in coding competitions"},
		{icon: "⚡", title: "Google Kickstart", note: "rank 1323 / 11400"},
		{icon: "🧪", title: "Curious by default", note: "[hobby placeholder]"},
		{icon: "📚", title: "Always learning", note: "[interest placeholder]"},
	];
	return (
		<section className="relative py-24 md:py-32" style={{background: palette.bg}}>
			<div className="px-8 md:px-16">
				<div className="mb-16">
					<div className="text-xs font-bold uppercase tracking-widest" style={{color: palette.red}}>
						05 · Beyond the code
					</div>
					<h2 className="mt-4 font-black leading-none tracking-tighter" style={{
						fontFamily: '"Fraunces", serif',
						fontSize: "clamp(2.5rem, 7vw, 6rem)",
						color: palette.ink
					}}>
						When I'm <span className="italic" style={{color: palette.orange}}>not shipping</span>.
					</h2>
				</div>
				<div className="grid gap-6 md:grid-cols-4">
					{items.map((it, i) => (
						<motion.div
							key={i}
							initial={{opacity: 0, y: 30}}
							whileInView={{opacity: 1, y: 0}}
							viewport={{once: true}}
							transition={{delay: i * 0.08}}
							className="rounded-2xl border-[3px] p-6 shadow-[6px_6px_0px_0px_#1A0F08]"
							style={{borderColor: palette.ink, background: palette.cream}}
						>
							<div className="text-4xl">{it.icon}</div>
							<div className="mt-4 text-xl font-black"
							     style={{fontFamily: '"Fraunces", serif', color: palette.ink}}>{it.title}</div>
							<div className="mt-1 text-sm opacity-70" style={{color: palette.ink}}>{it.note}</div>
						</motion.div>
					))}
				</div>
			</div>
		</section>
	);
}

// ---------- Contact ----------
function Contact() {
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [message, setMessage] = useState("");
	const [status, setStatus] = useState("idle"); // idle | sending | sent | error

	// Load Calendly's stylesheet + script once
	useEffect(() => {
		if (!document.querySelector('link[href*="calendly.com/assets/external/widget.css"]')) {
			const link = document.createElement("link");
			link.rel = "stylesheet";
			link.href = "https://assets.calendly.com/assets/external/widget.css";
			document.head.appendChild(link);
		}
		if (!document.querySelector('script[src*="calendly.com/assets/external/widget.js"]')) {
			const script = document.createElement("script");
			script.src = "https://assets.calendly.com/assets/external/widget.js";
			script.async = true;
			document.body.appendChild(script);
		}
	}, []);

	const openCalendly = () => {
		if (window.Calendly) {
			window.Calendly.initPopupWidget({url: "https://calendly.com/priyanshud/contact-us?hide_gdpr_banner=1"});
		}
		return false;
	};

	const submit = async () => {
		if (!name || !email || !message) return;
		setStatus("sending");
		try {
			const res = await fetch("https://formspree.io/f/meenlwzg", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
				},
				body: JSON.stringify({
					name,
					email,
					message,
					_subject: `Portfolio inquiry from ${name}`,
				}),
			});
			if (res.ok) {
				setStatus("sent");
				setName("");
				setEmail("");
				setMessage("");
			} else {
				setStatus("error");
			}
		} catch (err) {
			console.error(err);
			setStatus("error");
		}
	};

	return (
		<section id="contact" className="relative overflow-hidden py-24 md:py-32"
		         style={{background: palette.ink, color: palette.bg}}>
			{/* Giant marquee-style banner — sits above the form, not behind it */}
			<div className="pointer-events-none mb-12 select-none overflow-hidden md:mb-20" aria-hidden>
				<motion.div
					animate={{x: ["0%", "-50%"]}}
					transition={{duration: 25, repeat: Infinity, ease: "linear"}}
					className="flex whitespace-nowrap"
				>
					{[...Array(2)].map((_, i) => (
						<div key={i} className="flex shrink-0 items-center">
							{["HIRE ME", "LET'S BUILD", "0→1", "SHIP IT"].map((word, j) => (
								<React.Fragment key={j}>
                  <span
	                  className="px-8 font-black leading-none"
	                  style={{
		                  fontFamily: '"Fraunces", serif',
		                  fontSize: "clamp(4rem, 14vw, 14rem)",
		                  color: j % 2 === 0 ? palette.orange : "transparent",
		                  WebkitTextStroke: j % 2 === 0 ? "none" : `2px ${palette.orange}`,
		                  fontStyle: j % 2 === 0 ? "normal" : "italic",
	                  }}
                  >
                    {word}
                  </span>
									<span style={{color: palette.yellow, fontSize: "clamp(3rem, 10vw, 10rem)"}}>✦</span>
								</React.Fragment>
							))}
						</div>
					))}
				</motion.div>
			</div>

			<div className="relative grid gap-16 px-8 md:grid-cols-12 md:px-16">
				<div className="md:col-span-5">
					<div className="text-xs font-bold uppercase tracking-widest" style={{color: palette.yellow}}>
						06 · Let's build
					</div>
					<h2 className="mt-4 font-black leading-none tracking-tighter"
					    style={{fontFamily: '"Fraunces", serif', fontSize: "clamp(2.5rem, 6vw, 5rem)"}}>
						Got something <span className="italic" style={{color: palette.orange}}>wild</span> to ship?
					</h2>
					<p className="mt-6 max-w-md text-lg opacity-80" style={{fontFamily: '"Inter", sans-serif'}}>
						I'm available for full-time roles and select contracts. Especially interested in early-stage
						startups doing 0→1 work. Drop a line — I respond fast.
					</p>
					<div className="mt-10 space-y-4">
						<button onClick={openCalendly} data-cursor="book"
						        className="group flex items-center gap-3 text-lg font-bold transition-colors hover:text-yellow-400"
						        style={{color: palette.yellow}}>
							<CalendarClock size={18}/> Book a 30-min call →
						</button>
						<a href="mailto:ankurdwivedi75@gmail.com" data-cursor="mail"
						   className="group flex items-center gap-3 text-lg font-bold transition-colors hover:text-yellow-400">
							<Mail size={18}/> ankurdwivedi75@gmail.com
						</a>
						<a href="tel:+918740890509" data-cursor="call"
						   className="group flex items-center gap-3 text-lg font-bold transition-colors hover:text-yellow-400">
							<Phone size={18}/> +91 87408 90509
						</a>
						<a href="https://linkedin.com/in/priyanshud" target="_blank" rel="noreferrer"
						   data-cursor="connect"
						   className="group flex items-center gap-3 text-lg font-bold transition-colors hover:text-yellow-400">
							<Linkedin size={18}/> /in/priyanshud
						</a>
						<a href="https://github.com/jerryankur" target="_blank" rel="noreferrer" data-cursor="repos"
						   className="group flex items-center gap-3 text-lg font-bold transition-colors hover:text-yellow-400">
							<Github size={18}/> jerryankur
						</a>
					</div>
				</div>

				<div className="md:col-span-6 md:col-start-7">
					<div className="rounded-3xl border-[3px] p-8 shadow-[10px_10px_0px_0px_#FFB627]"
					     style={{borderColor: palette.bg, background: "rgba(255,244,230,0.05)"}}>
						{/* Calendly CTA — primary path */}
						<button
							onClick={openCalendly}
							data-cursor="book a slot"
							className="group relative mb-6 flex w-full items-center justify-between gap-4 overflow-hidden rounded-2xl border-[3px] px-6 py-5 text-left transition-transform hover:scale-[1.02]"
							style={{borderColor: palette.yellow, background: palette.yellow, color: palette.ink}}
						>
							<div className="flex items-center gap-4">
								<div className="flex h-12 w-12 items-center justify-center rounded-full"
								     style={{background: palette.ink, color: palette.yellow}}>
									<CalendarClock size={22}/>
								</div>
								<div>
									<div className="text-xs font-black uppercase tracking-widest opacity-70">Fastest
										path
									</div>
									<div className="text-lg font-black"
									     style={{fontFamily: '"Fraunces", serif'}}>Schedule a call with me
									</div>
								</div>
							</div>
							<ArrowUpRight size={22} className="transition-transform group-hover:rotate-45"/>
						</button>

						<div
							className="my-6 flex items-center gap-3 text-xs font-black uppercase tracking-widest opacity-50">
							<div className="h-px flex-1" style={{background: palette.bg}}/>
							or send a message
							<div className="h-px flex-1" style={{background: palette.bg}}/>
						</div>

						<AnimatePresence mode="wait">
							{status !== "sent" ? (
								<motion.div key="form" exit={{opacity: 0, y: -20}}>
									<div className="space-y-5">
										<Field label="Your name" value={name} onChange={setName}
										       placeholder="Jane Doe"/>
										<Field label="Email" value={email} onChange={setEmail}
										       placeholder="jane@company.com" type="email"/>
										<Field label="What's the brief?" value={message} onChange={setMessage}
										       placeholder="We're a YC-backed startup looking for…" textarea/>
										{status === "error" && (
											<div className="rounded-xl border-2 px-4 py-3 text-sm font-bold" style={{
												borderColor: palette.red,
												background: "rgba(230,57,70,0.1)",
												color: palette.red
											}}>
												Something went wrong. Try again, or email me directly at
												ankurdwivedi75@gmail.com.
											</div>
										)}
										<button
											onClick={submit}
											disabled={status === "sending"}
											data-cursor={status === "sending" ? "sending" : "send it"}
											className="group inline-flex w-full items-center justify-center gap-3 rounded-full px-6 py-4 text-sm font-bold uppercase tracking-widest transition-transform hover:scale-[1.02] disabled:cursor-wait disabled:opacity-70"
											style={{background: palette.orange, color: palette.ink}}
										>
											{status === "sending" ? (
												<>
													<motion.span
														animate={{rotate: 360}}
														transition={{duration: 1, repeat: Infinity, ease: "linear"}}
														className="inline-block"
													>
														<Rocket size={16}/>
													</motion.span>
													Sending…
												</>
											) : (
												<>
													<Rocket size={16}/> Launch this message <ArrowUpRight size={16}
													                                                      className="transition-transform group-hover:rotate-45"/>
												</>
											)}
										</button>
									</div>
								</motion.div>
							) : (
								<motion.div key="sent" initial={{opacity: 0, y: 20}} animate={{opacity: 1, y: 0}}
								            className="py-8 text-center">
									<div className="text-6xl">🚀</div>
									<div className="mt-4 text-2xl font-black"
									     style={{fontFamily: '"Fraunces", serif'}}>Message launched!
									</div>
									<div className="mt-2 opacity-70">Thanks for reaching out — I'll get back to you
										within 24 hours.
									</div>
									<button
										onClick={() => setStatus("idle")}
										className="mt-6 text-xs font-bold uppercase tracking-widest underline opacity-70 hover:opacity-100"
									>
										Send another
									</button>
								</motion.div>
							)}
						</AnimatePresence>
					</div>
				</div>
			</div>
		</section>
	);
}

function Field({label, value, onChange, placeholder, type = "text", textarea}) {
	const Comp = textarea ? "textarea" : "input";
	return (
		<label className="block">
			<div className="mb-2 text-xs font-black uppercase tracking-widest opacity-80">{label}</div>
			<Comp
				type={type}
				value={value}
				onChange={(e) => onChange(e.target.value)}
				placeholder={placeholder}
				rows={textarea ? 4 : undefined}
				className="w-full rounded-xl border-2 bg-transparent px-4 py-3 text-base outline-none transition-colors focus:border-orange-400"
				style={{borderColor: palette.bg, color: palette.bg, fontFamily: '"Inter", sans-serif'}}
			/>
		</label>
	);
}

// ---------- Footer ----------
function Footer() {
	return (
		<footer className="border-t-2 px-8 py-8 md:px-16"
		        style={{background: palette.ink, color: palette.bg, borderColor: palette.orange}}>
			<div
				className="flex flex-wrap items-center justify-between gap-4 text-xs font-bold uppercase tracking-widest opacity-70">
				<div className="flex items-center gap-2">
					<MapPin size={12}/> Built from scratch · 2026
				</div>
				<div>© Priyanshu Dwivedi · All rights reserved</div>
			</div>
		</footer>
	);
}

// ---------- Main ----------
export default function Portfolio() {
	return (
		<div className="min-h-screen"
		     style={{background: palette.bg, color: palette.ink, fontFamily: '"Inter", sans-serif'}}>
			<link
				href="https://fonts.googleapis.com/css2?family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,700;0,9..144,900;1,9..144,400;1,9..144,700;1,9..144,900&family=Inter:wght@400;500;700;900&display=swap"
				rel="stylesheet"/>
			<Cursor/>
			<Hero/>
			<SkillStrip/>
			<About/>
			<Work/>
			<Timeline/>
			<GitHubActivity/>
			<BeyondCode/>
			<Contact/>
			<Footer/>
		</div>
	);
}
