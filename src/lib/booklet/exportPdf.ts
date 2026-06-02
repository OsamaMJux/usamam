import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Booklet } from "./types";
import { renderPageHTML } from "./pageTemplates";

const W = 1280;
const H = 720; // 16:9

export async function exportBookletToPDF(booklet: Booklet, onProgress?: (current: number, total: number) => void) {
  const pdf = new jsPDF({ orientation: "landscape", unit: "pt", format: [W * 0.75, H * 0.75] });
  const total = booklet.pages.length;

  // Sandbox container
  const sandbox = document.createElement("div");
  sandbox.style.cssText = `position:fixed;left:-99999px;top:0;width:${W}px;height:${H}px;`;
  document.body.appendChild(sandbox);

  try {
    for (let i = 0; i < total; i++) {
      const page = booklet.pages[i];
      sandbox.innerHTML = `<div style="width:${W}px;height:${H}px;">${renderPageHTML(page, booklet.theme, booklet)}</div>`;
      // Wait a tick for fonts/images
      await new Promise(r => setTimeout(r, 80));
      const canvas = await html2canvas(sandbox.firstElementChild as HTMLElement, {
        width: W, height: H, scale: 2, useCORS: true, backgroundColor: null, logging: false,
      });
      const img = canvas.toDataURL("image/jpeg", 0.92);
      const pw = pdf.internal.pageSize.getWidth();
      const ph = pdf.internal.pageSize.getHeight();
      if (i > 0) pdf.addPage([W * 0.75, H * 0.75], "landscape");
      pdf.addImage(img, "JPEG", 0, 0, pw, ph);
      onProgress?.(i + 1, total);
    }
    pdf.save(`${booklet.companyName.replace(/\s+/g, "-").toLowerCase()}-booklet.pdf`);
  } finally {
    sandbox.remove();
  }
}
