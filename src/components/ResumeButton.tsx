import { flushSync } from 'react-dom';
import { Download } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import aboutData from '../data/about.json';
import skillsData from '../data/skills.json';
import achievementsData from '../data/achievements.json';
import photo from '../data/photo.jpg';

function renderResumeHtml(about: unknown, skills: unknown, achievements: unknown) {
  // basic sanitization and normalization
  const a = (about as unknown as Record<string, unknown>) || {};
  const skillCategories: Record<string, unknown[]> = (() => {
    if (!skills) return {};
    if (typeof skills === 'object' && 'categories' in (skills as object)) return (skills as unknown as { categories?: Record<string, unknown[]> }).categories || {};
    return (skills as unknown as Record<string, unknown[]>) || {};
  })();

  const achList: Array<unknown> = (() => {
    if (!achievements) return [];
    if (Array.isArray(achievements)) return achievements as unknown[];
    if (typeof achievements === 'object' && 'achievements' in (achievements as object)) return (achievements as unknown as { achievements?: unknown[] }).achievements || [];
    return [];
  })();

  const escape = (s: unknown) => String(s ?? '')
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

  const skillsHtml = Object.entries(skillCategories)
    .map(([cat, arr]) => {
      const list = Array.isArray(arr) ? arr : Object.values(arr || {});
      return `<div style="margin-bottom:8px"><div style="font-weight:700;font-size:11px">${escape(cat)}</div><div style="color:#64748b;font-size:11px">${list.map((s: unknown) => escape((s as Record<string, unknown>)?.name ?? s)).join(', ')}</div></div>`;
    })
    .join('');

  const achievementsHtml = achList
    .map(aItem => `<li style="margin-bottom:6px"><div style="font-weight:700">${escape((aItem as Record<string, unknown>)?.title)}</div><div style="color:#64748b;font-size:11px">${escape((aItem as Record<string, unknown>)?.issuer)} ${((aItem as Record<string, unknown>)?.date) ? `· ${escape((aItem as Record<string, unknown>)?.date)}` : ''}</div></li>`)
    .join('');

  const timelineArr = Array.isArray(a.timeline) ? (a.timeline as unknown[]) : [];
  const timelineHtml = timelineArr
    .map((t: unknown) => {
      const tt = t as Record<string, unknown>;
      return `<div style="margin-bottom:6px"><div style="font-weight:700">${escape(tt.title)} <span style="font-weight:400;color:#475569"> — ${escape(tt.subtitle ?? '')}</span></div><div style="color:#64748b;font-size:11px">${escape(tt.year)}</div>${tt.description ? `<div style="margin-top:4px">${escape(tt.description)}</div>` : ''}</div>`;
    })
    .join('');

  const careerArr = Array.isArray(a.careerGoals) ? (a.careerGoals as unknown[]) : [];
  const careerGoalsHtml = careerArr
    .map((g: unknown) => (typeof g === 'string' ? `<li>${escape(g)}</li>` : `<li>${escape((g as Record<string, unknown>)?.title)}${(g as Record<string, unknown>)?.description ? ` — ${escape((g as Record<string, unknown>)?.description)}` : ''}</li>`))
    .join('');
  const avatarUrl = (a as Record<string, unknown> & { _avatarDataUrl?: unknown })._avatarDataUrl;

  // Professional layout: header with name + contact, two-column body, photo in right column
  return `
  <div id="resume-print-root" style="width:210mm;min-height:297mm;padding:16mm;box-sizing:border-box;background:#ffffff;color:#0b1220;font-family:Helvetica,Arial,sans-serif;font-size:11.5px;line-height:1.45">
    <div style="display:flex;flex-direction:column;gap:6mm">
      <header style="display:flex;justify-content:space-between;align-items:center;border-bottom:2px solid #e6eef8;padding-bottom:6px">
        <div>
          <div style="font-size:22px;font-weight:800;color:#0b1220">${escape(a.name)}</div>
          <div style="margin-top:4px;font-size:12px;color:#334155;font-weight:600">${escape(a.title)}</div>
          <div style="margin-top:6px;color:#475569;max-width:60ch">${escape(a.tagline ?? a.bio ?? '')}</div>
        </div>
        <div style="text-align:right">
          ${avatarUrl ? `<img src="${String(avatarUrl)}" alt="avatar" style="width:72px;height:72px;border-radius:8px;object-fit:cover;border:1px solid #e2e8f0"/>` : ''}
          <div style="margin-top:6px;font-size:11px;color:#0f1724">${escape(a.email)} · ${escape(a.phone)}</div>
          <div style="font-size:11px;color:#64748b">${escape(a.location)}</div>
        </div>
      </header>

      <div style="display:flex;gap:12mm">
        <main style="flex:1 1 62%">
          ${a.bio ? `<section style="margin-bottom:6px"><h3 style="font-size:12px;font-weight:700;color:#0b1220;border-bottom:1px solid #eef2ff;padding-bottom:4px;margin-bottom:6px">Profile</h3><div style="color:#334155">${escape(a.bio)}</div></section>` : ''}

          ${timelineHtml ? `<section style="margin-bottom:6px"><h3 style="font-size:12px;font-weight:700;color:#0b1220;border-bottom:1px solid #eef2ff;padding-bottom:4px;margin-bottom:6px">Experience</h3><div style="color:#334155">${timelineHtml}</div></section>` : ''}

          ${achievementsHtml ? `<section style="margin-bottom:6px"><h3 style="font-size:12px;font-weight:700;color:#0b1220;border-bottom:1px solid #eef2ff;padding-bottom:4px;margin-bottom:6px">Certifications</h3><ul style="margin:0;padding-left:16px;color:#334155">${achievementsHtml}</ul></section>` : ''}
        </main>

        <aside style="width:72mm;flex-shrink:0">
          <section style="margin-bottom:10px;padding:8px;border:1px solid #f1f5f9;border-radius:6px;background:#fbfdff">
            <div style="font-size:12px;font-weight:700;color:#0b1220;margin-bottom:6px">Contact</div>
            <div style="font-size:11px;color:#0f1724;font-weight:600">${escape(a.email)}</div>
            <div style="font-size:11px;color:#0f1724">${escape(a.phone)}</div>
            <div style="font-size:11px;color:#64748b">${escape(a.location)}</div>
            ${a.university ? `<div style="margin-top:8px;font-size:11px;color:#475569">${escape(a.university)} · ${escape(a.degree)}</div>` : ''}
          </section>

          <section style="margin-bottom:10px">
            <div style="font-size:12px;font-weight:700;color:#0b1220;margin-bottom:6px">Skills</div>
            <div style="display:flex;flex-direction:column;gap:6px;color:#334155">${skillsHtml}</div>
          </section>

          ${careerGoalsHtml ? `<section style="margin-top:8px"><div style="font-size:12px;font-weight:700;color:#0b1220;margin-bottom:6px">Career Goals</div><ul style="margin:0;padding-left:16px;color:#334155">${careerGoalsHtml}</ul></section>` : ''}
        </aside>
      </div>
    </div>
  </div>
  `;
}

function ResumeButton() {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateResume = async () => {
    setIsGenerating(true);
    try {
  // create a hidden-but-renderable container to render the resume document
  const container = document.createElement('div');
  // place it in layout but move it off-screen via huge negative top so renderer can measure styles
  container.style.position = 'fixed';
  container.style.left = '0';
  container.style.top = '-10000px';
  // set an explicit pixel width for reliable canvas capture (A4 @ 96dpi ~= 794px)
  container.style.width = '794px';
  container.style.boxSizing = 'border-box';
  container.style.background = '#ffffff';
  container.style.color = '#0b1220';
  container.style.zIndex = '9999';
  container.style.pointerEvents = 'none';
  // keep opacity 1 so html2canvas / jsPDF can capture rendered content (opacity 0 produces blank pages)
  container.style.opacity = '1';
  container.style.overflow = 'visible';
  container.style.visibility = 'visible';
  document.body.appendChild(container);

      // prepare data and inline avatar (if available) before rendering HTML
      const aboutClone: Record<string, unknown> = { ...(aboutData as unknown as Record<string, unknown>) };
      aboutClone._avatarDataUrl = photo; // Use the imported photo directly
      const avatarPath = String(aboutClone.avatar ?? aboutClone.image ?? photo);
      if (avatarPath && avatarPath !== photo) { // Only fetch if it's not our imported photo
        try {
          const fetchUrl = avatarPath.startsWith('/') ? window.location.origin + avatarPath : avatarPath;
          const resp = await fetch(fetchUrl, { cache: 'no-store' });
          if (resp.ok) {
            const blob = await resp.blob();
            const reader = new FileReader();
            // convert to data URL for reliable inlining into HTML
            const dataUrl: string = await new Promise((res, rej) => {
              reader.onload = () => res(String(reader.result));
              reader.onerror = () => rej(new Error('Failed to read avatar blob'));
              reader.readAsDataURL(blob);
            });
            aboutClone._avatarDataUrl = dataUrl;
          } else {
            console.warn('Resume: avatar fetch returned', resp.status);
          }
        } catch (err) {
          console.warn('Resume: failed to fetch avatar', err);
        }
      }

      // render a minimal but more professional-looking HTML resume into the offscreen container
      flushSync(() => {
        const normalizedSkills = ((skillsData as unknown) as { categories?: unknown })?.categories ?? (skillsData as unknown);
        const normalizedAchievements = ((achievementsData as unknown) as { achievements?: unknown })?.achievements ?? (achievementsData as unknown);
        const html = renderResumeHtml(aboutClone as unknown, normalizedSkills as unknown, normalizedAchievements as unknown);
        container.innerHTML = html;
      });

      // wait for the rendered content to appear (text nodes/layout) before capturing
      const start = Date.now();
      while (Date.now() - start < 3000) {
        const rect = container.getBoundingClientRect();
        const textLen = (container.innerText || '').trim().length;
        if ((rect.width > 10 && rect.height > 10) && textLen > 4) break;
        // small delay
        await new Promise((r) => setTimeout(r, 100));
      }

      // wait for fonts and layout to settle before rendering
      if (document.fonts && typeof document.fonts.ready !== 'undefined') {
        try {
          const fontsReady = (document as unknown as { fonts?: { ready?: Promise<void> } }).fonts?.ready;
          if (fontsReady) await fontsReady;
        } catch {
          // ignore
        }
      }
      // give extra time for React to commit and CSS to apply
      await new Promise(resolve => setTimeout(resolve, 900));

      console.log('Resume: rendering container attached, container size:', container.getBoundingClientRect(), 'innerText length:', container.innerText?.length);

      // Create an overlay to visually hide the container but keep it in DOM flow
      const overlay = document.createElement('div');
      overlay.style.position = 'fixed';
      overlay.style.left = '0';
      overlay.style.top = '0';
      overlay.style.right = '0';
      overlay.style.bottom = '0';
      overlay.style.background = '#ffffff';
      overlay.style.zIndex = '10000';
      overlay.style.pointerEvents = 'none';
      document.body.appendChild(overlay);

      try {
        // Always use html2canvas path for deterministic results
        const html2canvasModule = await import('html2canvas');
        // support both commonjs/es modules
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const html2canvas = (html2canvasModule as any).default || html2canvasModule;

        // render canvas at higher scale for quality
        const canvas = await html2canvas(container, { scale: 2, useCORS: true, logging: false });
        console.log('Resume: canvas rendered', { width: canvas.width, height: canvas.height });

        // create pdf and add pages
        const jspdfModule = await import('jspdf');
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const jsPDF = (jspdfModule as any).jsPDF || (jspdfModule as any).default || jspdfModule;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const pdf = new jsPDF({ unit: 'mm', format: 'a4', orientation: 'portrait' } as any);

        // prefer PNG, but fall back to JPEG if jsPDF complains about PNG signature
        let imgData = '';
        try {
          imgData = canvas.toDataURL('image/png');
        } catch (pngErr) {
          console.warn('PNG export failed, falling back to JPEG:', pngErr);
          imgData = canvas.toDataURL('image/jpeg', 0.95);
        }

        const imgWidth = 210; // mm
        const pageHeight = 297; // mm
        const pxPerMm = canvas.width / imgWidth;
        const imgHeight = canvas.height / pxPerMm;

        console.log('Resume: image metrics', { canvasWidth: canvas.width, canvasHeight: canvas.height, pxPerMm, imgHeight });

        // validate computed numbers before calling jsPDF
        if (!isFinite(pxPerMm) || !isFinite(imgHeight) || canvas.width <= 0 || canvas.height <= 0) {
          console.error('Resume: invalid canvas metrics, aborting PDF addImage', { canvasWidth: canvas.width, canvasHeight: canvas.height, pxPerMm, imgHeight });
          const win = window.open('', '_blank');
          if (win) {
            win.document.write('<!doctype html><html><head><title>Resume preview</title></head><body>');
            win.document.write(container.innerHTML || '<div>No content</div>');
            win.document.write('</body></html>');
            win.document.close();
            alert('Unable to auto-generate PDF in this browser. A preview has been opened in a new tab — please print to PDF from there.');
          } else {
            alert('Unable to generate or preview the resume in this browser.');
          }
          return;
        }

        let heightLeft = imgHeight;
        let position = 0;

        // detect mime type and choose format for jsPDF
        const format = imgData.startsWith('data:image/png') ? 'PNG' : 'JPEG';
        console.log('Resume: adding first image page', { format, imgWidth, imgHeight });
        pdf.addImage(imgData, format, 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;

        while (heightLeft > 0) {
          position = -(imgHeight - heightLeft);
          pdf.addPage();
          pdf.addImage(imgData, format, 0, position, imgWidth, imgHeight);
          heightLeft -= pageHeight;
        }

        pdf.save('nachiket-portfolio.pdf');
      } finally {
  try { overlay.remove(); } catch { /* ignore cleanup errors */ }
      }

      // cleanup
      setTimeout(() => {
        try {
          document.body.removeChild(container);
        } catch {
          // ignore
        }
      }, 500);
    } catch (error) {
      console.error('Error generating resume:', error);
      const message = error instanceof Error ? error.message : String(error);
      alert('Failed to generate resume. ' + message);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={generateResume}
      disabled={isGenerating}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-cyan-600 text-white rounded-full shadow-lg hover:shadow-xl transition-all disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <Download className="w-5 h-5" />
      <span className="font-semibold">
        {isGenerating ? 'Generating...' : 'Download Resume'}
      </span>
    </motion.button>
  );
}

export default ResumeButton;
