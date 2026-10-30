// Shared header/footer injection so nav stays in sync across pages.
(function () {
  // Netlify serves /hacks for hacks.html, so compare without the extension
  const currentPath = (window.location.pathname.split('/').pop() || 'index.html').replace(/\.html$/, '') + '.html';

  const navItems = [
    { href: 'index.html', label: 'Overview' },
    { href: 'technology.html', label: 'Technology' },
    { href: 'verticals.html', label: 'Verticals' },
    { href: 'capital.html', label: 'Capital' },
    { href: 'hacks.html', label: 'Hacks' },
    { href: 'news.html', label: 'News' },
    { href: 'careers.html', label: 'Careers' },
  ];

  const hex = `<svg class="hex" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <polygon points="12,2 22,7 22,17 12,22 2,17 2,7" stroke="#0a0a0a" stroke-width="1.5" fill="none"/>
    <polygon points="12,6 18,9 18,15 12,18 6,15 6,9" stroke="oklch(0.48 0.08 145)" stroke-width="1.2" fill="none"/>
    <circle cx="12" cy="12" r="1.8" fill="oklch(0.48 0.08 145)"/>
  </svg>`;

  const nav = `
    <nav class="nav">
      <div class="inner">
        <a href="index.html" class="brand">${hex}<span>SIGILINT</span></a>
        <ul>
          ${navItems.map(i => `<li><a href="${i.href}" class="${i.href === currentPath ? 'active' : ''}">${i.label}</a></li>`).join('')}
        </ul>
        <a href="contact.html" class="cta">Request brief →</a>
      </div>
    </nav>
  `;

  const footer = `
    <footer>
      <div class="inner">
        <div>
          <div style="display:flex;align-items:center;gap:10px;margin-bottom:14px;">
            ${hex}
            <span style="font-family:var(--display);font-weight:700;letter-spacing:0.08em;font-size:15px;">SIGILINT</span>
          </div>
          <div style="color:var(--ink-3);max-width:36ch;line-height:1.6;">
            Low-latency mesh for industrial sensing.<br/>
            Stealth. Pre-revenue. Hiring.
          </div>
        </div>
        <div>
          <h4>Company</h4>
          <ul>
            <li><a href="index.html">Overview</a></li>
            <li><a href="technology.html">Technology</a></li>
            <li><a href="verticals.html">Verticals</a></li>
            <li><a href="hacks.html">Hacks</a></li>
            <li><a href="hacks.html#demos">Live demos</a></li>
            <li><a href="news.html">News &amp; events</a></li>
          </ul>
        </div>
        <div>
          <h4>Engage</h4>
          <ul>
            <li><a href="careers.html">Careers</a></li>
            <li><a href="capital.html">Capital</a></li>
            <li><a href="hacks.html#hackathons">Hackathons</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </div>
        <div>
          <h4>Presence</h4>
          <ul>
            <li>Fort Worth, TX — HQ</li>
            <li>Markets: US · GCC</li>
          </ul>
        </div>
      </div>
      <div class="coda">
        <div>© 2026 Sigilint, Inc. — All rights reserved.</div>
      </div>
    </footer>
  `;

  document.body.insertAdjacentHTML('afterbegin', nav);
  document.body.insertAdjacentHTML('beforeend', footer);
})();
