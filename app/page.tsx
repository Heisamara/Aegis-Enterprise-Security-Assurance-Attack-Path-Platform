"use client";

import { useMemo, useState } from "react";

type Finding = { id: string; title: string; asset: string; business: string; severity: "Critical" | "High" | "Medium"; score: number; route: string };

const findings: Finding[] = [
  { id: "AP-2041", title: "Public API → production customer data", asset: "checkout-api-prod", business: "Revenue Platform", severity: "Critical", score: 96, route: "3-hop path" },
  { id: "AP-2038", title: "CI token can assume production role", asset: "github-actions-ci", business: "Engineering", severity: "Critical", score: 91, route: "2-hop path" },
  { id: "AP-2032", title: "Legacy VPN route reaches payment subnet", asset: "corp-vpn-gateway", business: "IT Operations", severity: "High", score: 82, route: "4-hop path" },
  { id: "AP-2027", title: "Exposed storage contains customer exports", asset: "exports-archive-us", business: "Data Services", severity: "High", score: 76, route: "Direct exposure" },
  { id: "AP-2018", title: "Unpatched workload has lateral access", asset: "search-indexer-03", business: "Customer Experience", severity: "Medium", score: 58, route: "3-hop path" },
];
const navigation = ["Command center", "Attack paths", "Controls", "Assets", "Evidence"];

export default function Home() {
  const [activeNav, setActiveNav] = useState("Command center");
  const [filter, setFilter] = useState<"All" | Finding["severity"]>("All");
  const [selectedId, setSelectedId] = useState("AP-2041");
  const [notice, setNotice] = useState("");
  const selected = findings.find((finding) => finding.id === selectedId) ?? findings[0];
  const visibleFindings = useMemo(() => findings.filter((finding) => filter === "All" || finding.severity === filter), [filter]);
  function runAction(message: string) { setNotice(message); window.setTimeout(() => setNotice(""), 2600); }
  return <main className="aegis-shell">
    <aside className="rail">
      <div className="brand"><span className="brand-glyph">A</span><span>AEGIS</span></div>
      <button className="tenant"><span className="pulse" /> Northstar Holdings <span>⌄</span></button>
      <nav aria-label="Primary navigation">{navigation.map((item, index) => <button key={item} className={"rail-link " + (activeNav === item ? "current" : "")} onClick={() => setActiveNav(item)}><span className="rail-symbol">{["◫", "⌁", "◌", "◇", "▤"][index]}</span>{item}{item === "Attack paths" && <b>12</b>}</button>)}</nav>
      <div className="rail-bottom"><button className="rail-link"><span className="rail-symbol">?</span>Support</button><div className="identity"><span>AN</span><div><strong>Amarachi Nwosu</strong><small>Security lead</small></div><button aria-label="Account menu">···</button></div></div>
    </aside>
    <section className="workspace">
      <header className="app-bar"><div className="location"><span>Northstar / Security</span><b>{activeNav}</b></div><div className="bar-actions"><button className="round-action" aria-label="Search">⌕</button><button className="round-action" aria-label="Notifications">♧<i /></button><button className="report" onClick={() => runAction("Assurance report is being prepared.")}>Generate report <span>↗</span></button></div></header>
      <div className="dashboard">{notice && <div className="toast" role="status">✓ {notice}</div>}
        <section className="overview-head"><div><p className="kicker">ASSURANCE INTELLIGENCE <span>•</span> SYNCHRONIZED 3 MINUTES AGO</p><h1>Know your exposure.<br /><em>Prove your resilience.</em></h1><p className="intro">Aegis continuously maps how threats move through your environment, so teams can close the routes that put the business at risk.</p></div><article className="assurance-card"><div className="assurance-top"><span>ASSURANCE SCORE</span><b>+6.4</b></div><div className="assurance-number">84<small>/100</small></div><div className="score-bar"><span /></div><p><i /> Strong posture <small>up 4 points this quarter</small></p></article></section>
        <section className="metrics" aria-label="Key security metrics"><Metric label="Critical attack paths" value="12" note="3 need action today" tone="red" /><Metric label="Control effectiveness" value="91%" note="+2.8% this quarter" tone="blue" /><Metric label="Assets protected" value="2,847" note="98.6% coverage" tone="green" /><Metric label="Evidence readiness" value="94%" note="SOC 2 · ISO 27001" tone="purple" /></section>
        <section className="primary-grid"><article className="panel path-panel"><div className="panel-title"><div><p className="kicker">ACTIVE EXPOSURE</p><h2>Attack paths that matter now</h2></div><button onClick={() => setActiveNav("Attack paths")}>Explore graph <span>→</span></button></div><div className="filter-tabs">{(["All", "Critical", "High", "Medium"] as const).map((item) => <button key={item} className={filter === item ? "selected" : ""} onClick={() => setFilter(item)}>{item}{item !== "All" && <span>{findings.filter((finding) => finding.severity === item).length}</span>}</button>)}</div><div className="finding-list">{visibleFindings.map((finding) => <button className={"finding " + (selected.id === finding.id ? "selected" : "")} key={finding.id} onClick={() => setSelectedId(finding.id)}><span className={"severity " + finding.severity.toLowerCase()}><i />{finding.severity}</span><span className="finding-copy"><strong>{finding.title}</strong><small>{finding.asset} <b>·</b> {finding.business}</small></span><span className="finding-score">{finding.score}<small>risk</small></span><span className="chev">›</span></button>)}</div></article>
          <aside className="panel detail-card"><div className="detail-top"><span className={"severity " + selected.severity.toLowerCase()}><i />{selected.severity}</span><button aria-label="More actions">···</button></div><p className="case-id">{selected.id} <span>•</span> LIVE PATH</p><h2>{selected.title}</h2><p className="asset-line">◇ {selected.asset}<span /> ◷ Detected 42m ago</p><div className="risk-summary"><div><small>EXPOSURE SCORE</small><strong>{selected.score}<em>/100</em></strong><p>Prioritized by business impact</p></div><div className="radial"><span>{selected.score}</span></div></div><div className="signal-block"><small>PATH SIGNALS</small><div><span>Internet</span><span>Identity</span><span>Runtime</span><span>Crown jewel</span></div></div><div className="detail-actions"><button onClick={() => runAction("Remediation owner assigned for " + selected.id + ".")}>Assign remediation <span>→</span></button><button aria-label="Mark reviewed" onClick={() => runAction(selected.id + " marked as reviewed.")}>✓</button></div></aside></section>
        <section className="lower-grid"><article className="panel controls-panel"><div className="panel-title"><div><p className="kicker">CONTROL ASSURANCE</p><h2>Protection coverage</h2></div><span className="live"><i /> Live telemetry</span></div><div className="control-rows"><Coverage label="Identity hardening" detail="MFA, privileged access & role hygiene" value={96} tone="cyan" /><Coverage label="Cloud guardrails" detail="Policy drift and public exposure" value={89} tone="violet" /><Coverage label="Workload protection" detail="Runtime coverage across production" value={83} tone="amber" /></div></article><article className="panel journey-panel"><div className="panel-title"><div><p className="kicker">ATTACK JOURNEY</p><h2>Path to customer data</h2></div><button className="round-action" onClick={() => runAction("Attack path opened in graph view.")}>↗</button></div><div className="journey"><JourneyNode icon="◉" label="Internet" caption="Public endpoint" tone="red" /><span className="journey-arrow">→</span><JourneyNode icon="⌘" label="API gateway" caption="Reachable CVE" tone="amber" /><span className="journey-arrow">→</span><JourneyNode icon="◆" label="Customer data" caption="Crown jewel" tone="blue" /></div><p className="journey-note"><span>!</span> An exploitable path reaches sensitive data in under 90 seconds.</p></article></section>
      </div>
    </section>
  </main>;
}
function Metric({ label, value, note, tone }: { label: string; value: string; note: string; tone: string }) { return <article className="metric-card"><p>{label}</p><strong>{value}</strong><small className={tone}><i />{note}</small></article>; }
function Coverage({ label, detail, value, tone }: { label: string; detail: string; value: number; tone: string }) { return <div className="coverage"><span className={"coverage-icon " + tone}>✦</span><div><strong>{label}</strong><small>{detail}</small></div><b>{value}%</b><div className="coverage-track"><span className={tone} style={{ width: value + "%" }} /></div></div>; }
function JourneyNode({ icon, label, caption, tone }: { icon: string; label: string; caption: string; tone: string }) { return <div className="journey-node"><span className={tone}>{icon}</span><strong>{label}</strong><small>{caption}</small></div>; }
