const fmt = new Intl.NumberFormat("en-US");

function bars(host, items, valueOf, labelOf) {
  const max = Math.max(...items.map(valueOf));
  host.innerHTML = "";
  for (const item of items) {
    const row = document.createElement("div");
    row.className = "row";
    const name = document.createElement("div");
    name.textContent = item.name;
    const track = document.createElement("div");
    track.className = "track";
    const fill = document.createElement("div");
    fill.className = "fill";
    const value = valueOf(item);
    fill.style.width = max > 0 ? `${(value / max) * 100}%` : "0%";
    track.appendChild(fill);
    const val = document.createElement("div");
    val.className = "val";
    val.textContent = labelOf(item);
    row.append(name, track, val);
    host.appendChild(row);
  }
}

function renderConstraints(measure) {
  const occ = measure === "occurrences";
  const items = DATA.constraints;
  document.getElementById("constraint-caption").textContent = occ
    ? "Each occurrence is one canonical RDF triple. Rows stay in tree-prevalence order. Bar length is logarithmic, because sh:property would otherwise hide the rest."
    : "Share of the 6,336 extracted trees in which the parameter occurs at least once.";
  bars(
    document.getElementById("constraint-chart"),
    items,
    (item) => (occ ? Math.log10(item.occurrences) : item.percent),
    (item) => (occ ? fmt.format(item.occurrences) : treeLabel(item)),
  );
}

function renderHist(mode) {
  const items = mode === "log" ? DATA.hist_log : DATA.hist_body;
  const named = items.map((bin) => ({ name: bin.label, trees: bin.trees }));
  bars(
    document.getElementById("shape-chart"),
    named,
    (item) => item.trees,
    (item) => fmt.format(item.trees),
  );
}

function renderCurve() {
  const width = 640;
  const height = 360;
  const pad = { l: 48, r: 16, t: 16, b: 36 };
  const xs = (x) => pad.l + (x / 100) * (width - pad.l - pad.r);
  const ys = (y) => pad.t + (1 - y / 100) * (height - pad.t - pad.b);
  const points = DATA.curve.map((p) => `${xs(p.x)},${ys(p.y)}`).join(" ");
  const ticks = [0, 25, 50, 75, 100];
  const grid = ticks.map((t) => {
    const y = ys(t);
    return `<line x1="${pad.l}" y1="${y}" x2="${width - pad.r}" y2="${y}" stroke="#e4e4e4"/>
      <text x="${pad.l - 8}" y="${y + 4}" text-anchor="end" font-size="12" fill="#4a4a4a">${t}</text>
      <text x="${xs(t)}" y="${height - 12}" text-anchor="middle" font-size="12" fill="#4a4a4a">${t}</text>`;
  }).join("");
  const dots = Object.values(DATA.markers).map((m) =>
    `<circle cx="${xs(m.x)}" cy="${ys(m.y)}" r="4" fill="#8c3a2f"/>`
  ).join("");
  document.getElementById("curve").innerHTML = `
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="Cumulative share of distinct shapes">
      ${grid}
      <line x1="${xs(0)}" y1="${ys(0)}" x2="${xs(100)}" y2="${ys(100)}" stroke="#9a9a9a" stroke-dasharray="4 4"/>
      <polyline fill="none" stroke="#1f3a5f" stroke-width="2.5" points="${points}"/>
      ${dots}
      <text x="${pad.l}" y="14" font-size="12" fill="#4a4a4a">Cumulative % of distinct shapes</text>
    </svg>`;
  document.getElementById("markers").innerHTML = ["1", "5", "10"].map((key) => {
    const m = DATA.markers[key];
    return `<div><strong>${m.y.toFixed(1)}%</strong><br>of shapes in the largest ${key}% of trees</div>`;
  }).join("");
}

function renderCoverage() {
  const steps = [
    ["15,075", "candidate repositories"],
    ["7,569", "verified repositories"],
    ["6,343", "unique content trees"],
    ["6,336", "trees with statistics"],
  ];
  document.getElementById("funnel").innerHTML = steps.map(([n, label]) =>
    `<div class="step"><b>${n}</b><span>${label}</span></div>`
  ).join("");
  document.getElementById("coverage-notes").innerHTML = [
    "6,335 extracted trees have a complete file list. One heavy tree stopped because its archive exceeded 200 MiB.",
    "2,724 extracted trees have partial counts: a parsed file failed, a file was larger than 20 MiB, a download failed, or the file was a Git LFS pointer. A tree is marked partial if even one candidate file could not contribute to the counts; the tree itself remains in the analysis.",
    "Seven verified trees were not extracted because their file listing stayed unresolved. They are inside the 6,343 and outside the 6,336.",
  ].map((text) => `<li>${text}</li>`).join("");
}

function treeLabel(item) {
  return `${Number(item.percent).toFixed(1)}% (${fmt.format(item.trees)} trees)`;
}

function renderTargets() {
  const order = ["sh:targetClass", "sh:targetSubjectsOf", "sh:targetObjectsOf", "sh:targetNode"];
  const byName = new Map(DATA.targets.map((item) => [item.name, item]));
  const items = order.map((name) => byName.get(name)).filter(Boolean);
  bars(
    document.getElementById("target-chart"),
    items,
    (item) => item.percent,
    treeLabel,
  );
}

function wire(group, attr, render) {
  for (const button of document.querySelectorAll(group)) {
    button.addEventListener("click", () => {
      for (const peer of document.querySelectorAll(group)) peer.classList.remove("on");
      button.classList.add("on");
      render(button.dataset[attr]);
    });
  }
}

renderCoverage();
renderConstraints("trees");
renderHist("log");
renderCurve();
renderTargets();
wire("#constraints .toggle button", "measure", renderConstraints);
wire("#shapes .toggle button", "hist", renderHist);
