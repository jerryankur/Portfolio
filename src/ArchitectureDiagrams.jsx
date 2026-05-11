import "react";

const palette = {
	bg: "#FFF4E6",
	ink: "#1A0F08",
	orange: "#FF6B1A",
	red: "#E63946",
	yellow: "#FFB627",
	cream: "#FFE8C9",
};

const FONT = '"Inter", sans-serif';

function Box({x, y, w, h, label, sub, fill = palette.cream, stroke = palette.ink, r = 10, fontSize = 11}) {
	return (
		<g>
			<rect x={x} y={y} width={w} height={h} rx={r} fill={fill} stroke={stroke} strokeWidth={2}/>
			<text x={x + w / 2} y={y + (sub ? h / 2 - 4 : h / 2 + 1)} textAnchor="middle" dominantBaseline="middle"
			      fill={palette.ink} fontSize={fontSize} fontWeight={700} fontFamily={FONT}>
				{label}
			</text>
			{sub && (
				<text x={x + w / 2} y={y + h / 2 + 10} textAnchor="middle" dominantBaseline="middle"
				      fill={palette.ink} fontSize={9} fontWeight={500} fontFamily={FONT} opacity={0.6}>
					{sub}
				</text>
			)}
		</g>
	);
}

function Arrow({x1, y1, x2, y2, label, color = palette.ink, dashed = false}) {
	const mid = label ? 0.5 : 0;
	const mx = (x1 + x2) / 2;
	const my = (y1 + y2) / 2;
	const angle = Math.atan2(y2 - y1, x2 - x1);
	const headLen = 8;
	return (
		<g>
			<line x1={x1} y1={y1} x2={x2} y2={y2} stroke={color} strokeWidth={1.5}
			      strokeDasharray={dashed ? "5,3" : "none"} markerEnd="none"/>
			<polygon
				points={`${x2},${y2} ${x2 - headLen * Math.cos(angle - 0.4)},${y2 - headLen * Math.sin(angle - 0.4)} ${x2 - headLen * Math.cos(angle + 0.4)},${y2 - headLen * Math.sin(angle + 0.4)}`}
				fill={color}/>
			{label && (
				<text x={mx} y={my - 6} textAnchor="middle" fill={color} fontSize={8} fontWeight={600}
				      fontFamily={FONT}>
					{label}
				</text>
			)}
		</g>
	);
}

function SectionLabel({x, y, label, color = palette.red}) {
	return (
		<text x={x} y={y} fill={color} fontSize={9} fontWeight={800} fontFamily={FONT} letterSpacing="1.5"
		      textTransform="uppercase">
			{label.toUpperCase()}
		</text>
	);
}

export function WhaleArchDiagram() {
	return (
		<svg viewBox="0 0 720 460" className="w-full" style={{maxWidth: 720}}>
			<SectionLabel x={20} y={20} label="Blockchain Nodes"/>
			<Box x={20} y={30} w={130} h={50} label="Bitcoin Core" sub="ZMQ + RPC" fill={palette.yellow + "44"}/>
			<Box x={170} y={30} w={130} h={50} label="Ethereum Node" sub="WebSocket + RPC"
			     fill={palette.yellow + "44"}/>

			<SectionLabel x={20} y={115} label="Microservices Layer"/>
			<Box x={20} y={125} w={130} h={50} label="BTCWhaleService" sub="ZMQ Subscriber"
			     fill={palette.orange + "33"}/>
			<Box x={170} y={125} w={130} h={50} label="ETHWhaleService" sub="WS Subscriber"
			     fill={palette.orange + "33"}/>
			<Box x={340} y={125} w={120} h={50} label="PriceService" sub="Live USD Rates" fill={palette.orange + "33"}/>

			<Arrow x1={85} y1={80} x2={85} y2={125} label="hashblock"/>
			<Arrow x1={235} y1={80} x2={235} y2={125} label="newHeads + logs"/>

			<SectionLabel x={20} y={210} label="Data Layer"/>
			<Box x={20} y={220} w={160} h={50} label="PostgreSQL" sub="Transactions · Transfers · Tokens"
			     fill={palette.red + "22"}/>
			<Box x={200} y={220} w={120} h={50} label="Redis" sub="Channels Layer" fill={palette.red + "22"}/>

			<Arrow x1={85} y1={175} x2={85} y2={220} label="atomic writes"/>
			<Arrow x1={235} y1={175} x2={260} y2={220} label="broadcast"/>
			<Arrow x1={400} y1={175} x2={300} y2={220} dashed={true}/>

			<SectionLabel x={20} y={305} label="Alert Distribution"/>
			<Box x={20} y={315} w={140} h={50} label="Django Channels" sub="ASGI + Daphne" fill={palette.cream}/>
			<Box x={200} y={315} w={130} h={50} label="TelegramService" sub="Bot API · Batching" fill="#E8F5E9"/>
			<Box x={350} y={315} w={130} h={50} label="XService" sub="OAuth1 · API v2" fill="#E3F2FD"/>

			<Arrow x1={260} y1={270} x2={90} y2={315} label="confirmed tx"/>
			<Arrow x1={260} y1={270} x2={265} y2={315}/>
			<Arrow x1={260} y1={270} x2={415} y2={315}/>

			<SectionLabel x={20} y={400} label="Frontend"/>
			<Box x={20} y={410} w={200} h={40} label="React + TypeScript Dashboard" sub="WebSocket · Redux · Live Feed"
			     fill={palette.bg} stroke={palette.orange}/>

			<Arrow x1={90} y1={365} x2={90} y2={410} label="WebSocket"/>

			<SectionLabel x={500} y={115} label="Outputs"/>
			<Box x={500} y={125} w={100} h={40} label="Telegram" fill="#E8F5E9" stroke="#4CAF50"/>
			<Box x={610} y={125} w={90} h={40} label="X / Twitter" fill="#E3F2FD" stroke="#1DA1F2"/>
			<Box x={500} y={185} w={200} h={40} label="Live Dashboard" fill={palette.bg} stroke={palette.orange}/>

			<Arrow x1={330} y1={340} x2={500} y2={150} dashed={true} color="#4CAF50"/>
			<Arrow x1={480} y1={340} x2={640} y2={165} dashed={true} color="#1DA1F2"/>
			<Arrow x1={120} y1={430} x2={500} y2={210} dashed={true} color={palette.orange}/>

			<SectionLabel x={500} y={260} label="Confirmation"/>
			<Box x={500} y={270} w={200} h={55} label="Sliding Window Tracker" sub="BTC: 6 confirms · ETH: 12 confirms"
			     fill={palette.yellow + "22"}/>
			<text x={600} y={340} textAnchor="middle" fill={palette.ink} fontSize={8} fontFamily={FONT} opacity={0.5}>
				Reorg detection + status rollback
			</text>
		</svg>
	);
}

export function ETGArchDiagram() {
	return (
		<svg viewBox="0 0 720 430" className="w-full" style={{maxWidth: 720}}>
			<SectionLabel x={20} y={20} label="Frontend"/>
			<Box x={20} y={30} w={160} h={50} label="React + TypeScript" sub="Vite · Redux Toolkit" fill={palette.bg}
			     stroke={palette.orange}/>
			<Box x={200} y={30} w={140} h={50} label="ChartIQ 9.4" sub="TFC · SignalIQ · Studies"
			     fill={palette.yellow + "44"}/>
			<Box x={360} y={30} w={120} h={50} label="ECharts" sub="Analytics · P&L" fill={palette.yellow + "22"}/>

			<Arrow x1={180} y1={55} x2={200} y2={55}/>
			<Arrow x1={340} y1={55} x2={360} y2={55}/>

			<SectionLabel x={20} y={115} label="Custom Plugins"/>
			<Box x={20} y={125} w={110} h={40} label="QuoteFeed" sub="Lazy OHLCV" fill={palette.cream}/>
			<Box x={145} y={125} w={100} h={40} label="LookupDriver" sub="Symbol Search" fill={palette.cream}/>
			<Box x={260} y={125} w={100} h={40} label="TFC Plugin" sub="Order UI" fill={palette.cream}/>
			<Box x={375} y={125} w={110} h={40} label="NameValueStore" sub="View Persistence" fill={palette.cream}/>

			<Arrow x1={270} y1={80} x2={270} y2={125}/>

			<SectionLabel x={20} y={200} label="Nginx Reverse Proxy"/>
			<Box x={20} y={210} w={460} h={35}
			     label="/server · /auth · /data · /trader  →  Django :8000    |    /*  →  React SPA"
			     fill={palette.ink + "11"} fontSize={10}/>

			<Arrow x1={250} y1={165} x2={250} y2={210}/>

			<SectionLabel x={20} y={278} label="Django Backend"/>
			<Box x={20} y={288} w={110} h={50} label="Auth App" sub="Token · Sessions" fill={palette.orange + "22"}/>
			<Box x={145} y={288} w={120} h={50} label="Data App" sub="Products · Reports" fill={palette.orange + "22"}/>
			<Box x={280} y={288} w={120} h={50} label="Trader App" sub="Orders · Trades" fill={palette.orange + "22"}/>
			<Box x={415} y={288} w={130} h={50} label="Simulation Engine" sub="Date Progression"
			     fill={palette.red + "22"}/>

			<Arrow x1={250} y1={245} x2={250} y2={288}/>
			<Arrow x1={400} y1={313} x2={415} y2={313}/>

			<SectionLabel x={20} y={373} label="Data Layer"/>
			<Box x={20} y={383} w={140} h={40} label="PostgreSQL" sub="Orders · Trades · OHLCV"
			     fill={palette.red + "22"}/>
			<Box x={180} y={383} w={120} h={40} label="AWS S3" sub="Reports · Views" fill="#E3F2FD"/>

			<Arrow x1={200} y1={338} x2={100} y2={383}/>
			<Arrow x1={480} y1={338} x2={240} y2={383} dashed={true} label="report files"/>

			<SectionLabel x={520} y={20} label="Order Flow"/>
			<Box x={520} y={30} w={180} h={35} label="Market / Limit / Stop / MIT" fill={palette.cream} fontSize={10}/>
			<Box x={520} y={75} w={180} h={35} label="OTO Brackets + OCO" fill={palette.cream} fontSize={10}/>
			<Box x={520} y={120} w={180} h={35} label="Slippage Simulation" fill={palette.cream} fontSize={10}/>
			<Box x={520} y={165} w={180} h={35} label="VAR + Notional Check" fill={palette.red + "22"} fontSize={10}/>
			<Box x={520} y={210} w={180} h={35} label="Auto-Liquidation" fill={palette.red + "33"} fontSize={10}/>

			<Arrow x1={610} y1={65} x2={610} y2={75}/>
			<Arrow x1={610} y1={110} x2={610} y2={120}/>
			<Arrow x1={610} y1={155} x2={610} y2={165}/>
			<Arrow x1={610} y1={200} x2={610} y2={210}/>

			<SectionLabel x={520} y={278} label="Analytics"/>
			<Box x={520} y={288} w={180} h={55} label="Post-Trade Metrics" sub="Sharpe · Sortino · Calmar · Hit Ratio"
			     fill={palette.yellow + "22"}/>

			<SectionLabel x={520} y={373} label="Deployment"/>
			<Box x={520} y={383} w={180} h={40} label="AWS Elastic Beanstalk" sub="GitHub Actions CI/CD"
			     fill="#E3F2FD"/>
		</svg>
	);
}

export function MorphleArchDiagram() {
	return (
		<svg viewBox="0 0 720 520" className="w-full" style={{maxWidth: 720}}>
			<SectionLabel x={20} y={20} label="Scanner Hardware"/>
			<Box x={20} y={30} w={100} h={45} label="Camera" sub="Exposure · Focus" fill={palette.yellow + "33"}/>
			<Box x={135} y={30} w={100} h={45} label="Stage Motors" sub="X/Y · Homing" fill={palette.yellow + "33"}/>
			<Box x={250} y={30} w={100} h={45} label="Objectives" sub="4x–40x Turret" fill={palette.yellow + "33"}/>
			<Box x={365} y={30} w={100} h={45} label="Loader" sub="Auto Cassette" fill={palette.yellow + "33"}/>

			<SectionLabel x={20} y={105} label="Scanner Software"/>
			<Box x={20} y={115} w={445} h={40} label="Scano — Java REST Server on Local IP"
			     sub="Hardware abstraction layer · All commands via HTTP" fill={palette.orange + "22"}/>

			<Arrow x1={70} y1={75} x2={70} y2={115}/>
			<Arrow x1={185} y1={75} x2={185} y2={115}/>
			<Arrow x1={300} y1={75} x2={300} y2={115}/>
			<Arrow x1={415} y1={75} x2={415} y2={115}/>

			<SectionLabel x={20} y={188} label="Django Backend — 150+ Endpoints"/>
			<Box x={20} y={198} w={105} h={50} label="Device API" sub="Proxy to Scano" fill={palette.orange + "33"}/>
			<Box x={138} y={198} w={105} h={50} label="Slide API" sub="Lifecycle · Status"
			     fill={palette.orange + "33"}/>
			<Box x={256} y={198} w={105} h={50} label="Annotation API" sub="CRUD · Sync" fill={palette.orange + "33"}/>
			<Box x={374} y={198} w={105} h={50} label="Cloud API" sub="Upload · Bridge" fill={palette.orange + "33"}/>

			<Arrow x1={242} y1={155} x2={242} y2={198} label="HTTP proxy"/>

			<SectionLabel x={20} y={283} label="Image Processing Pipeline"/>
			<Box x={20} y={293} w={130} h={50} label="SURF Stitching" sub="Feature Match · CLAHE"
			     fill={palette.red + "22"}/>
			<Box x={165} y={293} w={130} h={50} label="Pyramid Tiling" sub="256×256 · Multi-zoom"
			     fill={palette.red + "22"}/>
			<Box x={310} y={293} w={120} h={50} label="Z-Stack Merge" sub="Focus Selection" fill={palette.red + "22"}/>
			<Box x={445} y={293} w={120} h={50} label="BigTIFF Export" sub="Interop Format" fill={palette.red + "22"}/>

			<Arrow x1={150} y1={318} x2={165} y2={318}/>
			<Arrow x1={295} y1={318} x2={310} y2={318}/>
			<Arrow x1={430} y1={318} x2={445} y2={318}/>
			<Arrow x1={190} y1={248} x2={85} y2={293} label="raw tiles"/>

			<SectionLabel x={20} y={378} label="Real-time & Storage"/>
			<Box x={20} y={388} w={120} h={50} label="Django Channels" sub="WebSocket · Collab" fill={palette.cream}/>
			<Box x={155} y={388} w={90} h={50} label="Redis" sub="Cache · Queue" fill={palette.cream}/>
			<Box x={260} y={388} w={90} h={50} label="MySQL" sub="Metadata" fill={palette.cream}/>
			<Box x={365} y={388} w={100} h={50} label="S3 / GCS" sub="Image Storage" fill="#E3F2FD"/>

			<Arrow x1={140} y1={413} x2={155} y2={413}/>

			<SectionLabel x={20} y={473} label="Frontend"/>
			<Box x={20} y={480} w={200} h={35} label="React + Redux + OpenLayers" sub="" fill={palette.bg}
			     stroke={palette.orange} fontSize={11}/>
			<Box x={240} y={480} w={100} h={35} label="GammaViewer" sub="" fill={palette.bg} stroke={palette.orange}
			     fontSize={10}/>
			<Box x={355} y={480} w={100} h={35} label="BloodViewer" sub="" fill={palette.bg} stroke={palette.orange}
			     fontSize={10}/>

			<Arrow x1={80} y1={438} x2={80} y2={480} label="WebSocket"/>
			<Arrow x1={230} y1={343} x2={290} y2={480} dashed={true} label="tile pyramid"/>

			<SectionLabel x={520} y={20} label="AI Services"/>
			<Box x={520} y={30} w={180} h={40} label="Blur Detection" sub="5-grid CLAHE + SURF" fill="#E8F5E9"/>
			<Box x={520} y={80} w={180} h={40} label="Blood Cell CNN" sub="RBC · WBC · Platelet" fill="#E8F5E9"/>
			<Box x={520} y={130} w={180} h={40} label="Tissue Segmentation" sub="Binary Morphology" fill="#E8F5E9"/>
			<Box x={520} y={180} w={180} h={40} label="DeepBio / IHC Relay" sub="External API Gateway" fill="#E8F5E9"/>

			<Arrow x1={479} y1={223} x2={520} y2={200} dashed={true}/>

			<SectionLabel x={520} y={253} label="Cloud Integration"/>
			<Box x={520} y={263} w={180} h={45} label="Relay Server" sub="Flask · TIFF Convert · Upload"
			     fill={palette.cream}/>
			<Box x={520} y={320} w={180} h={45} label="Morphle Cloud" sub="Google Cloud Run Gateway" fill="#E3F2FD"/>

			<Arrow x1={610} y1={308} x2={610} y2={320}/>
			<Arrow x1={479} y1={223} x2={520} y2={280} dashed={true} label="bridge"/>

			<SectionLabel x={520} y={398} label="Reporting"/>
			<Box x={520} y={408} w={180} h={45} label="CAP Reports" sub="DCIS · Invasive · PDF Export"
			     fill={palette.yellow + "22"}/>
		</svg>
	);
}

export function WalletArchDiagram() {
	return (
		<svg viewBox="0 0 720 400" className="w-full" style={{maxWidth: 720}}>
			<SectionLabel x={20} y={20} label="Data Sources"/>
			<Box x={20} y={30} w={120} h={50} label="Blockchair API" sub="BTC Transactions"
			     fill={palette.yellow + "44"}/>
			<Box x={155} y={30} w={120} h={50} label="Etherscan API" sub="ETH + ERC-20" fill={palette.yellow + "44"}/>
			<Box x={290} y={30} w={120} h={50} label="Santiment API" sub="Hourly Prices" fill={palette.yellow + "44"}/>

			<SectionLabel x={500} y={20} label="Scraping"/>
			<Box x={500} y={30} w={200} h={50} label="Selenium + Undetected" sub="btc.com · etherscan · tether.to"
			     fill={palette.orange + "22"}/>
			<Box x={500} y={95} w={200} h={40} label="Bitbucket CSVs" sub="Top Wallet Lists" fill={palette.cream}/>

			<Arrow x1={600} y1={80} x2={600} y2={95} label="store"/>

			<SectionLabel x={20} y={115} label="Processing Layer"/>
			<Box x={20} y={125} w={130} h={50} label="Pandas" sub="DataFrames · Transforms"
			     fill={palette.orange + "33"}/>
			<Box x={165} y={125} w={130} h={50} label="Transaction Filter" sub="Threshold · Inverse"
			     fill={palette.orange + "33"}/>
			<Box x={310} y={125} w={140} h={50} label="Price Correlation" sub="1h · 4h · 12h · 1d Δ"
			     fill={palette.orange + "33"}/>

			<Arrow x1={80} y1={80} x2={80} y2={125}/>
			<Arrow x1={215} y1={80} x2={215} y2={125}/>
			<Arrow x1={350} y1={80} x2={380} y2={125}/>
			<Arrow x1={500} y1={115} x2={450} y2={140} dashed={true} label="wallet lists"/>

			<Arrow x1={150} y1={150} x2={165} y2={150}/>
			<Arrow x1={295} y1={150} x2={310} y2={150}/>

			<SectionLabel x={20} y={210} label="Analytics Engine"/>
			<Box x={20} y={220} w={140} h={50} label="Copy-Trade P&L" sub="Entry/Exit Timing"
			     fill={palette.red + "22"}/>
			<Box x={175} y={220} w={120} h={50} label="HODL Returns" sub="First → Last Price"
			     fill={palette.red + "22"}/>
			<Box x={310} y={220} w={140} h={50} label="Deposit / Withdrawal" sub="Classification Engine"
			     fill={palette.red + "22"}/>

			<Arrow x1={230} y1={175} x2={230} y2={220}/>
			<Arrow x1={380} y1={175} x2={380} y2={220}/>

			<SectionLabel x={20} y={305} label="Visualization"/>
			<Box x={20} y={315} w={200} h={50} label="Plotly Interactive Chart" sub="Price + Tx Markers · Range Slider"
			     fill={palette.bg} stroke={palette.orange}/>
			<Box x={240} y={315} w={130} h={50} label="Wallet Tables" sub="Top 50–100 Wallets" fill={palette.bg}
			     stroke={palette.orange}/>
			<Box x={385} y={315} w={130} h={50} label="Metrics Panel" sub="P&L · HODL · Trade %" fill={palette.bg}
			     stroke={palette.orange}/>

			<Arrow x1={90} y1={270} x2={90} y2={315}/>
			<Arrow x1={235} y1={270} x2={305} y2={315}/>
			<Arrow x1={380} y1={270} x2={450} y2={315}/>

			<SectionLabel x={500} y={175} label="Dashboard"/>
			<Box x={500} y={185} w={200} h={50} label="Streamlit App" sub="Wide Layout · Sidebar" fill={palette.cream}/>

			<SectionLabel x={500} y={270} label="Deployment"/>
			<Box x={500} y={280} w={200} h={45} label="Heroku" sub="Single Dyno · Headless Chrome" fill="#E3F2FD"/>
			<Box x={500} y={340} w={200} h={45} label="Bitbucket Pipelines" sub="Test → Build → Deploy" fill="#E3F2FD"/>

			<Arrow x1={600} y1={235} x2={600} y2={280}/>
			<Arrow x1={600} y1={325} x2={600} y2={340}/>

			<SectionLabel x={20} y={390} label="Chains: BTC · ETH · USDT ERC-20 · Bitfinex Cold Wallets"/>
		</svg>
	);
}
