import React from 'react';

type TimelineItem = {
  year?: string;
  title?: string;
  subtitle?: string;
  description?: string;
};

type AboutShape = {
  name?: string;
  title?: string;
  tagline?: string;
  bio?: string;
  email?: string;
  phone?: string;
  location?: string;
  university?: string;
  degree?: string;
  timeline?: TimelineItem[];
  // careerGoals may be an array of strings (simple goals) or objects with title/description
  careerGoals?: Array<string | { title: string; description?: string }>;
};

type Skill = { name: string; level?: string };

type Props = {
  about: AboutShape;
  // support either direct category mapping or a wrapper { categories: Record<...> }
  skills: Record<string, Skill[]> | { categories?: Record<string, Skill[]> } | unknown;
  // achievements might be an array or an object { achievements: [...] }
  achievements: Array<{ title: string; issuer?: string; date?: string; link?: string }> | { achievements?: Array<unknown> } | unknown;
};

const sectionTitleStyle: React.CSSProperties = {
  fontSize: '12px',
  fontWeight: 700,
  marginBottom: '6px',
  color: '#0b1220'
};

export default function ResumeDocument({ about, skills, achievements }: Props) {
  return (
    <div
      id="resume-print-root"
      style={{
        width: '210mm',
        minHeight: '297mm',
        padding: '16mm',
        boxSizing: 'border-box',
        background: '#ffffff',
        color: '#0b1220',
        fontFamily: 'Arial, Helvetica, sans-serif',
        fontSize: '12px',
        lineHeight: 1.35
      }}
    >
      <div style={{ display: 'flex', gap: '12mm' }}>
        <div style={{ flex: '1 0 60%' }}>
          <h1 style={{ margin: 0, fontSize: '20px' }}>{about.name}</h1>
          <div style={{ marginTop: '4px', marginBottom: '10px', color: '#0f1724', fontWeight: 600 }}>{about.title}</div>
          {about.tagline && <div style={{ marginBottom: '8px', color: '#334155' }}>{about.tagline}</div>}

          {about.bio && (
            <section style={{ marginBottom: '8px' }}>
              <h3 style={sectionTitleStyle}>Summary</h3>
              <div>{about.bio}</div>
            </section>
          )}

          {about.timeline && about.timeline.length > 0 && (
            <section style={{ marginBottom: '8px' }}>
              <h3 style={sectionTitleStyle}>Experience / Journey</h3>
              <div>
                {about.timeline.map((t, i) => (
                  <div key={i} style={{ marginBottom: '6px' }}>
                    <div style={{ fontWeight: 700 }}>{t.title} <span style={{ fontWeight: 400, color: '#475569' }}> — {t.subtitle}</span></div>
                    <div style={{ color: '#64748b', fontSize: '11px' }}>{t.year}</div>
                    {t.description && <div style={{ marginTop: '4px' }}>{t.description}</div>}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* normalize achievements if wrapped */}
          {(() => {
            const norm = (() => {
              if (Array.isArray(achievements)) return achievements as Array<Record<string, unknown>>;
              const maybe = achievements as { achievements?: unknown } | unknown;
              if (maybe && typeof maybe === 'object' && 'achievements' in (maybe as object)) {
                const a = (maybe as { achievements?: unknown }).achievements;
                if (Array.isArray(a)) return a as Array<Record<string, unknown>>;
              }
              return [] as Array<Record<string, unknown>>;
            })();
            if (norm.length === 0) return null;
            return (
              <section style={{ marginBottom: '8px' }}>
                <h3 style={sectionTitleStyle}>Certifications & Achievements</h3>
                <ul style={{ margin: 0, paddingLeft: '16px' }}>
                  {norm.map((a, i) => (
                    <li key={i} style={{ marginBottom: '6px' }}>
                      <div style={{ fontWeight: 700 }}>{String(a.title ?? a['title'])}</div>
                      <div style={{ color: '#64748b', fontSize: '11px' }}>{String(a.issuer ?? '')} {a.date ? `· ${String(a.date)}` : ''}</div>
                    </li>
                  ))}
                </ul>
              </section>
            );
          })()}
        </div>

        <aside style={{ width: '62mm', flexShrink: 0 }}>
          <div style={{ marginBottom: '10px' }}>
            <h3 style={sectionTitleStyle}>Contact</h3>
            <div style={{ color: '#0f1724', fontWeight: 600 }}>{about.email}</div>
            <div style={{ color: '#0f1724' }}>{about.phone}</div>
            <div style={{ color: '#475569' }}>{about.location}</div>
            {about.university && <div style={{ marginTop: '8px', color: '#475569' }}>{about.university} — {about.degree}</div>}
          </div>

          <div>
            <h3 style={sectionTitleStyle}>Skills</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
              {/* support either skills = { categoryName: Skill[] } or skills = { categories: { ... } } */}
              {(() => {
                const normalized: Record<string, Skill[]> = (() => {
                  if (skills && typeof skills === 'object' && 'categories' in (skills as object)) {
                    return (skills as { categories?: Record<string, Skill[]> }).categories || {};
                  }
                  if (skills && typeof skills === 'object') return skills as Record<string, Skill[]>;
                  return {} as Record<string, Skill[]>;
                })();
                return Object.entries(normalized).map(([cat, arr]) => {
                  const list: unknown[] = Array.isArray(arr) ? arr : Object.values(arr || {});
                  return (
                    <div key={cat}>
                      <div style={{ fontWeight: 700, fontSize: '11px' }}>{cat}</div>
                      <div style={{ color: '#64748b', fontSize: '11px' }}>{list.map((s) => ((s as Skill)?.name ?? String(s))).join(', ')}</div>
                    </div>
                  );
                });
              })()}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
