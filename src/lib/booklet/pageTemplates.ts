import { Booklet, Page, PageType, Theme } from "./types";

// Renders a single page as HTML string using theme tokens (used for PDF export & preview parity)
export function renderPageHTML(page: Page, theme: Theme, booklet: Booklet): string {
  const { primary, secondary, accent, background, text, headingFont, bodyFont, logoUrl } = theme;
  const wrap = (inner: string, opts?: { dark?: boolean; bg?: string }) => `
    <div style="font-family:'${bodyFont}',Inter,sans-serif;background:${opts?.bg || background};color:${text};width:100%;height:100%;padding:64px 72px;box-sizing:border-box;position:relative;overflow:hidden;">
      ${inner}
    </div>`;

  const h1 = (t: string, size = 64) => `<h1 style="font-family:'${headingFont}',serif;font-size:${size}px;line-height:1.05;margin:0 0 16px;letter-spacing:-0.02em;font-weight:700;">${escape(t)}</h1>`;
  const h2 = (t: string) => `<h2 style="font-family:'${headingFont}',serif;font-size:36px;line-height:1.1;margin:0 0 24px;letter-spacing:-0.015em;font-weight:600;">${escape(t)}</h2>`;
  const p = (t: string, muted = false) => `<p style="font-size:16px;line-height:1.65;margin:0 0 12px;${muted ? "opacity:0.7;" : ""}">${escape(t)}</p>`;
  const pill = (t: string) => `<span style="display:inline-block;padding:6px 14px;border:1px solid ${primary}40;border-radius:999px;font-size:12px;letter-spacing:0.08em;text-transform:uppercase;color:${primary};margin-bottom:24px;">${escape(t)}</span>`;
  const cornerBrand = () => `<div style="position:absolute;top:32px;left:72px;display:flex;align-items:center;gap:10px;font-size:12px;letter-spacing:0.2em;text-transform:uppercase;opacity:0.6;">${logoUrl ? `<img src="${logoUrl}" style="height:20px;width:auto;object-fit:contain;"/>` : ""}<span>${escape(booklet.companyName)}</span></div>`;
  const footer = (num: string) => `<div style="position:absolute;bottom:32px;left:72px;right:72px;display:flex;justify-content:space-between;font-size:11px;letter-spacing:0.15em;text-transform:uppercase;opacity:0.5;"><span>${escape(booklet.companyName)} — ${escape(booklet.tagline)}</span><span>${num}</span></div>`;

  switch (page.type) {
    case "cover":
      return `
        <div style="font-family:'${bodyFont}',Inter,sans-serif;background:linear-gradient(135deg,${primary} 0%,${secondary} 100%);color:#fff;width:100%;height:100%;padding:72px;box-sizing:border-box;position:relative;overflow:hidden;">
          <div style="position:absolute;inset:0;background:radial-gradient(circle at 80% 20%, ${accent}33, transparent 50%),radial-gradient(circle at 20% 80%, #00000040, transparent 50%);"></div>
          <div style="position:relative;display:flex;flex-direction:column;justify-content:space-between;height:100%;">
            <div style="display:flex;align-items:center;gap:14px;">
              ${logoUrl ? `<img src="${logoUrl}" style="height:42px;width:auto;object-fit:contain;background:#ffffff14;padding:6px 10px;border-radius:8px;"/>` : ""}
              <span style="font-size:13px;letter-spacing:0.3em;text-transform:uppercase;opacity:0.85;">${escape(booklet.companyName)}</span>
            </div>
            <div>
              <div style="font-size:13px;letter-spacing:0.35em;text-transform:uppercase;opacity:0.7;margin-bottom:24px;">Company Profile · ${page.content.year || new Date().getFullYear()}</div>
              <h1 style="font-family:'${headingFont}',serif;font-size:96px;line-height:0.95;margin:0 0 28px;letter-spacing:-0.03em;font-weight:700;">${escape(booklet.companyName)}</h1>
              <p style="font-size:24px;line-height:1.3;max-width:680px;opacity:0.9;margin:0;font-style:italic;">${escape(page.content.tagline || booklet.tagline)}</p>
            </div>
            <div style="display:flex;justify-content:space-between;font-size:12px;letter-spacing:0.2em;text-transform:uppercase;opacity:0.75;">
              <span>${escape(booklet.websiteUrl)}</span>
              <span>Confidential · ${page.content.year || new Date().getFullYear()}</span>
            </div>
          </div>
        </div>`;

    case "welcome":
      return wrap(`${cornerBrand()}
        <div style="max-width:760px;margin:auto;display:flex;flex-direction:column;justify-content:center;height:100%;">
          ${pill("Welcome")}
          ${h1("Hello, and welcome.", 72)}
          <p style="font-size:20px;line-height:1.6;margin-top:12px;">${escape(page.content.message || "")}</p>
        </div>
        ${footer("02")}`);

    case "about": {
      const values: string[] = page.content.values || [];
      return wrap(`${cornerBrand()}
        <div style="max-width:920px;margin:auto;display:flex;flex-direction:column;justify-content:center;height:100%;">
          ${pill("About Us")}
          ${h1("Who we are.")}
          ${p(page.content.overview || "")}
          ${p(page.content.history || "", true)}
          <div style="margin-top:32px;display:grid;grid-template-columns:repeat(${Math.min(values.length, 4)},1fr);gap:16px;">
            ${values.map((v, i) => `<div style="padding:20px;border:1px solid ${primary}30;border-radius:14px;background:${primary}08;"><div style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;opacity:0.5;margin-bottom:8px;">0${i + 1}</div><div style="font-family:'${headingFont}',serif;font-size:20px;font-weight:600;">${escape(v)}</div></div>`).join("")}
          </div>
        </div>
        ${footer("03")}`);
    }

    case "mission":
      return wrap(`${cornerBrand()}
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:48px;height:100%;align-items:center;">
          <div>${pill("Mission")}${h2("Why we exist.")}${p(page.content.mission || "")}</div>
          <div>${pill("Vision")}${h2("Where we're going.")}${p(page.content.vision || "")}</div>
        </div>
        ${footer("04")}`);

    case "services": {
      const items = page.content.items || [];
      return wrap(`${cornerBrand()}
        ${pill("Services")}${h1("What we do.")}
        <div style="margin-top:32px;display:grid;grid-template-columns:repeat(3,1fr);gap:20px;">
          ${items.map((s: any, i: number) => `<div style="padding:24px;border:1px solid ${primary}25;border-radius:16px;background:linear-gradient(180deg, ${primary}08, transparent);"><div style="width:36px;height:36px;border-radius:10px;background:${primary};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;margin-bottom:14px;">${String(i + 1).padStart(2, "0")}</div><div style="font-family:'${headingFont}',serif;font-size:20px;font-weight:600;margin-bottom:6px;">${escape(s.title)}</div><div style="font-size:13px;line-height:1.55;opacity:0.75;">${escape(s.description)}</div></div>`).join("")}
        </div>
        ${footer("05")}`);
    }

    case "process": {
      const steps = page.content.steps || [];
      return wrap(`${cornerBrand()}
        ${pill("Process")}${h1("How we work.")}
        <div style="margin-top:48px;display:grid;grid-template-columns:repeat(${steps.length || 4},1fr);gap:0;position:relative;">
          <div style="position:absolute;top:20px;left:5%;right:5%;height:2px;background:${primary}30;"></div>
          ${steps.map((s: any, i: number) => `<div style="position:relative;text-align:center;padding:0 12px;"><div style="width:42px;height:42px;border-radius:50%;background:${primary};color:#fff;display:flex;align-items:center;justify-content:center;font-weight:700;margin:0 auto 18px;font-family:'${headingFont}',serif;">${i + 1}</div><div style="font-family:'${headingFont}',serif;font-size:22px;font-weight:600;margin-bottom:8px;">${escape(s.title)}</div><div style="font-size:13px;line-height:1.55;opacity:0.75;">${escape(s.description)}</div></div>`).join("")}
        </div>
        ${footer("06")}`);
    }

    case "portfolio": {
      const items = page.content.items || [];
      return wrap(`${cornerBrand()}
        ${pill("Portfolio")}${h1("Selected work.")}
        <div style="margin-top:32px;display:grid;grid-template-columns:repeat(3,1fr);gap:20px;">
          ${items.map((it: any) => `<div style="border-radius:16px;overflow:hidden;border:1px solid ${primary}20;background:${primary}06;"><div style="aspect-ratio:4/3;background:${it.image ? `url('${it.image}') center/cover` : `linear-gradient(135deg,${primary},${secondary})`};"></div><div style="padding:18px;"><div style="font-family:'${headingFont}',serif;font-size:18px;font-weight:600;">${escape(it.title)}</div><div style="font-size:13px;opacity:0.7;margin-top:4px;">${escape(it.description)}</div></div></div>`).join("")}
        </div>
        ${footer("07")}`);
    }

    case "team": {
      const members = page.content.members || [];
      return wrap(`${cornerBrand()}
        ${pill("Team")}${h1("People behind the work.")}
        <div style="margin-top:32px;display:grid;grid-template-columns:repeat(3,1fr);gap:24px;">
          ${members.map((m: any) => `<div style="text-align:center;"><div style="width:140px;height:140px;border-radius:50%;background:${m.photo ? `url('${m.photo}') center/cover` : `linear-gradient(135deg,${primary},${accent})`};margin:0 auto 16px;"></div><div style="font-family:'${headingFont}',serif;font-size:20px;font-weight:600;">${escape(m.name)}</div><div style="font-size:12px;letter-spacing:0.15em;text-transform:uppercase;opacity:0.6;margin:4px 0 8px;">${escape(m.role)}</div><div style="font-size:13px;opacity:0.75;">${escape(m.bio || "")}</div></div>`).join("")}
        </div>
        ${footer("08")}`);
    }

    case "testimonials": {
      const items = page.content.items || [];
      return wrap(`${cornerBrand()}
        ${pill("Testimonials")}${h1("What clients say.")}
        <div style="margin-top:32px;display:grid;grid-template-columns:repeat(${Math.min(items.length, 2)},1fr);gap:24px;">
          ${items.map((t: any) => `<div style="padding:32px;border-radius:18px;background:${primary}10;border:1px solid ${primary}25;"><div style="color:${accent};font-size:32px;line-height:1;margin-bottom:12px;">★★★★★</div><p style="font-family:'${headingFont}',serif;font-size:22px;line-height:1.4;font-style:italic;margin:0 0 18px;">"${escape(t.quote)}"</p><div style="font-weight:600;">${escape(t.author)}</div><div style="font-size:12px;opacity:0.65;">${escape(t.role || "")}</div></div>`).join("")}
        </div>
        ${footer("09")}`);
    }

    case "contact": {
      const c = page.content;
      return wrap(`${cornerBrand()}
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:48px;height:100%;align-items:center;">
          <div>${pill("Contact")}${h1("Let's talk.")}${p("We'd love to hear from you. Reach out anytime.")}</div>
          <div style="padding:36px;border-radius:18px;background:${primary}10;border:1px solid ${primary}25;">
            ${[["Email", c.email], ["Phone", c.phone], ["Website", c.website], ["Address", c.address]].map(([k, v]) => `<div style="margin-bottom:18px;"><div style="font-size:11px;letter-spacing:0.2em;text-transform:uppercase;opacity:0.55;margin-bottom:4px;">${k}</div><div style="font-size:16px;">${escape(String(v || "—"))}</div></div>`).join("")}
          </div>
        </div>
        ${footer("10")}`);
    }

    case "client-welcome": {
      const c = page.content;
      const block = (title: string, items: string[]) => `<div><div style="font-family:'${headingFont}',serif;font-size:20px;font-weight:600;margin-bottom:12px;">${title}</div>${items.map(i => `<div style="display:flex;gap:10px;align-items:flex-start;margin-bottom:8px;font-size:14px;"><span style="color:${primary};font-weight:700;">✓</span><span>${escape(i)}</span></div>`).join("")}</div>`;
      return wrap(`${cornerBrand()}
        ${pill("Client Success Kit")}${h1("Welcome aboard.")}
        ${p(c.welcome || "")}
        <div style="margin-top:32px;display:grid;grid-template-columns:repeat(3,1fr);gap:32px;">
          ${block("What to expect", c.expect || [])}
          ${block("What we need from you", c.needFromYou || [])}
          ${block("Communication channels", c.channels || [])}
        </div>
        ${footer("11")}`);
    }

    case "kickoff": {
      const c = page.content;
      return wrap(`${cornerBrand()}
        ${pill("Kickoff")}${h1("Our kickoff meeting.")}
        <div style="display:grid;grid-template-columns:1fr 1fr 1fr;gap:24px;margin-top:24px;">
          <div><div style="font-family:'${headingFont}',serif;font-size:18px;font-weight:600;margin-bottom:10px;">Services</div>${(c.services || []).map((s: string) => `<div style="padding:8px 12px;border:1px solid ${primary}25;border-radius:8px;margin-bottom:6px;font-size:13px;">${escape(s)}</div>`).join("")}</div>
          <div><div style="font-family:'${headingFont}',serif;font-size:18px;font-weight:600;margin-bottom:10px;">Purpose</div>${(c.purpose || []).map((s: string) => `<div style="padding:8px 12px;background:${primary}10;border-radius:8px;margin-bottom:6px;font-size:13px;">${escape(s)}</div>`).join("")}</div>
          <div><div style="font-family:'${headingFont}',serif;font-size:18px;font-weight:600;margin-bottom:10px;">Agenda</div>${(c.agenda || []).map((s: string, i: number) => `<div style="display:flex;gap:10px;align-items:center;margin-bottom:8px;font-size:13px;"><span style="width:24px;height:24px;border-radius:50%;background:${primary};color:#fff;display:flex;align-items:center;justify-content:center;font-size:11px;font-weight:700;">${i + 1}</span>${escape(s)}</div>`).join("")}</div>
        </div>
        ${footer("12")}`);
    }

    case "invoice": {
      const c = page.content;
      const items = c.items || [];
      const subtotal = items.reduce((s: number, i: any) => s + (+i.amount || 0), 0);
      const tax = subtotal * (c.taxRate || 0);
      const total = subtotal + tax;
      return wrap(`${cornerBrand()}
        ${pill("Invoice")}${h1("Purchase summary.")}
        <div style="display:flex;justify-content:space-between;margin-top:8px;font-size:13px;opacity:0.75;">
          <div><b>Invoice #</b> ${escape(c.invoiceNumber)}</div>
          <div><b>Due</b> ${escape(c.dueDate)}</div>
          <div><b>Method</b> ${escape(c.paymentMethod)}</div>
        </div>
        <table style="width:100%;border-collapse:collapse;margin-top:24px;font-size:14px;">
          <thead><tr style="text-align:left;border-bottom:2px solid ${primary};"><th style="padding:12px 8px;">Service</th><th style="padding:12px 8px;">Description</th><th style="padding:12px 8px;text-align:right;">Amount</th></tr></thead>
          <tbody>${items.map((it: any) => `<tr style="border-bottom:1px solid ${primary}20;"><td style="padding:12px 8px;font-weight:600;">${escape(it.service)}</td><td style="padding:12px 8px;opacity:0.8;">${escape(it.description)}</td><td style="padding:12px 8px;text-align:right;font-variant-numeric:tabular-nums;">$${it.amount.toLocaleString()}</td></tr>`).join("")}</tbody>
        </table>
        <div style="display:flex;justify-content:flex-end;margin-top:18px;"><div style="min-width:280px;font-size:14px;">
          <div style="display:flex;justify-content:space-between;padding:6px 0;"><span>Subtotal</span><span>$${subtotal.toLocaleString()}</span></div>
          <div style="display:flex;justify-content:space-between;padding:6px 0;opacity:0.7;"><span>Tax (${((c.taxRate || 0) * 100).toFixed(0)}%)</span><span>$${tax.toFixed(2)}</span></div>
          <div style="display:flex;justify-content:space-between;padding:12px 0;border-top:2px solid ${primary};font-weight:700;font-size:18px;"><span>Total</span><span>$${total.toLocaleString()}</span></div>
        </div></div>
        ${footer("13")}`);
    }

    case "agreement": {
      const c = page.content;
      return wrap(`${cornerBrand()}
        ${pill("Service Agreement")}${h1("Letter of engagement.")}
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:24px;margin-top:8px;font-size:13px;">
          <div style="padding:18px;border:1px solid ${primary}25;border-radius:12px;"><div style="font-weight:600;margin-bottom:6px;">Agency</div><div>${escape(c.agencyName)}</div><div style="opacity:0.7;">${escape(c.agencyAddress)}</div></div>
          <div style="padding:18px;border:1px solid ${primary}25;border-radius:12px;"><div style="font-weight:600;margin-bottom:6px;">Client</div><div>${escape(c.clientName)}</div><div style="opacity:0.7;">${escape(c.clientAddress)}</div></div>
        </div>
        <ol style="margin-top:20px;padding-left:20px;font-size:13px;line-height:1.7;">${(c.clauses || []).map((cl: string) => `<li style="margin-bottom:6px;">${escape(cl)}</li>`).join("")}</ol>
        <div style="display:grid;grid-template-columns:1fr 1fr;gap:32px;margin-top:32px;">
          <div><div style="border-top:1px solid ${text}40;padding-top:8px;font-size:12px;opacity:0.7;">Agency Signature · Date</div></div>
          <div><div style="border-top:1px solid ${text}40;padding-top:8px;font-size:12px;opacity:0.7;">Client Signature · Date</div></div>
        </div>
        ${footer("14")}`);
    }

    case "thankyou":
      return `
        <div style="font-family:'${bodyFont}',Inter,sans-serif;background:linear-gradient(135deg,${secondary} 0%,${primary} 100%);color:#fff;width:100%;height:100%;display:flex;align-items:center;justify-content:center;text-align:center;padding:72px;box-sizing:border-box;position:relative;overflow:hidden;">
          <div style="position:absolute;inset:0;background:radial-gradient(circle at center, ${accent}22, transparent 60%);"></div>
          <div style="position:relative;max-width:720px;">
            <div style="font-size:13px;letter-spacing:0.35em;text-transform:uppercase;opacity:0.7;margin-bottom:24px;">Thank You</div>
            <h1 style="font-family:'${headingFont}',serif;font-size:84px;line-height:1;margin:0 0 24px;letter-spacing:-0.03em;font-weight:700;">${escape(page.content.message || "Thank you.")}</h1>
            <p style="font-size:22px;font-style:italic;opacity:0.9;margin:0 0 36px;">${escape(page.content.cta || "")}</p>
            <div style="font-size:12px;letter-spacing:0.25em;text-transform:uppercase;opacity:0.7;">${escape(booklet.companyName)} · ${escape(booklet.websiteUrl)}</div>
          </div>
        </div>`;

    default:
      return wrap(`<div>${escape(page.title)}</div>`);
  }
}

function escape(s: any) {
  return String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]!));
}
