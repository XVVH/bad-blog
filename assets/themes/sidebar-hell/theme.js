// Sidebar Hell: a calendar widget for the month of the latest post, with
// the days that have posts highlighted. Decorative: it's aria-hidden and
// has no links, because the archive already holds them. deactivate()
// removes it (docs/ARCHITECTURE.md, "Theme packages").

const DAYS = ["S", "M", "T", "W", "T", "F", "S"];

export function activate(root) {
  const rail = root.querySelector(".rail-a");
  const dates = [...root.querySelectorAll(".rail-archive [data-date]")].map((el) => el.dataset.date).sort();
  if (!rail || !dates.length) return;

  const [y, m] = dates.at(-1).split("-").map(Number);
  const posted = new Set(dates.filter((d) => d.startsWith(`${y}-${String(m).padStart(2, "0")}`)).map((d) => Number(d.slice(8))));
  const first = new Date(Date.UTC(y, m - 1, 1));
  const days = new Date(Date.UTC(y, m, 0)).getUTCDate();
  const month = first.toLocaleString("en-US", { month: "long", year: "numeric", timeZone: "UTC" });

  const section = root.createElement("section");
  section.className = "rail-section sh-calendar";
  section.setAttribute("data-tt-deco", "");
  section.setAttribute("aria-hidden", "true");

  const title = root.createElement("p");
  title.className = "rail-title";
  title.textContent = "Calendar";

  const body = root.createElement("div");
  body.className = "sh-calendar-body";
  const table = root.createElement("table");
  const caption = table.createCaption();
  caption.textContent = month;
  const head = table.createTHead().insertRow();
  for (const d of DAYS) {
    const th = root.createElement("th");
    th.textContent = d;
    head.append(th);
  }
  const tbody = table.createTBody();
  let row = tbody.insertRow();
  for (let i = 0; i < first.getUTCDay(); i++) row.insertCell();
  for (let day = 1; day <= days; day++) {
    if (row.cells.length === 7) row = tbody.insertRow();
    const cell = row.insertCell();
    cell.textContent = String(day);
    if (posted.has(day)) cell.className = "sh-posted";
  }

  body.append(table);
  section.append(title, body);
  rail.prepend(section);
}

export function deactivate(root) {
  for (const el of root.querySelectorAll(".sh-calendar[data-tt-deco]")) el.remove();
}
