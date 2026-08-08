/**
 * Client-side interactions — port of all 7 behaviors from the reference HTML.
 * Vanilla TypeScript, no framework dependencies.
 * Loaded via client:load in the Layout component.
 */

export function initInteractions(): void {
  const root = document.documentElement;

  /* ── 1 · Theme: light default, dark on request, persisted ────────── */
  const toggle = document.getElementById('theme-toggle');
  if (toggle) {
    const applyTheme = (t: string): void => {
      root.setAttribute('data-theme', t);
      const dark = t === 'dark';
      toggle.setAttribute('aria-pressed', String(dark));
      toggle.setAttribute('aria-label', dark ? 'Switch to light theme' : 'Switch to dark theme');
    };
    // Light is the default for every first visit — system dark preference does NOT override.
    let saved: string | null = null;
    try {
      saved = localStorage.getItem('theme');
    } catch {
      /* localStorage may be unavailable in private mode */
    }
    applyTheme(saved === 'dark' ? 'dark' : 'light');

    toggle.addEventListener('click', () => {
      const current = root.getAttribute('data-theme');
      const next = current === 'dark' ? 'light' : 'dark';
      applyTheme(next);
      try {
        localStorage.setItem('theme', next);
      } catch {
        /* ignore — persistent in-memory only */
      }
    });
  }

  /* ── 2 · Sticky nav: appears past scrollY > 80px ────────────────── */
  const nav = document.getElementById('site-nav');
  if (nav) {
    let navOn = false;
    const onScroll = (): void => {
      const should = window.scrollY > 80;
      if (should !== navOn) {
        navOn = should;
        nav.classList.toggle('is-visible', should);
      }
    };
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
  }

  /* ── 3 · Project disclosure: aria-expanded toggle ────────────────── */
  const discloseButtons = document.querySelectorAll('.disclose');
  discloseButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      const expanded = btn.getAttribute('aria-expanded') === 'true';
      btn.setAttribute('aria-expanded', String(!expanded));
    });
  });

  /* ── 4 · Tag filter: one tab stop, arrow-key roving ─────────────── */
  const tabs = Array.from(document.querySelectorAll('.filter [role="tab"]')) as HTMLElement[];
  const items = Array.from(document.querySelectorAll('.think__item')) as HTMLElement[];
  const status = document.getElementById('filter-status');

  if (tabs.length > 0 && items.length > 0) {
    const select = (tab: HTMLElement): void => {
      tabs.forEach((t) => {
        const on = t === tab;
        t.setAttribute('aria-selected', String(on));
        t.tabIndex = on ? 0 : -1;
      });

      const tag = tab.dataset.tag;
      let shown = 0;
      items.forEach((li) => {
        const itemTags = li.dataset.tags || '';
        const ok = tag === 'all' || itemTags.split(' ').includes(tag || '');
        li.hidden = !ok;
        if (ok) shown++;
      });

      if (status) {
        status.textContent = `${shown} ${shown === 1 ? 'item' : 'items'} shown`;
      }
    };

    tabs.forEach((tab, i) => {
      tab.addEventListener('click', () => select(tab));
      tab.addEventListener('keydown', (e: KeyboardEvent) => {
        let n: HTMLElement | null = null;
        if (e.key === 'ArrowRight') n = tabs[(i + 1) % tabs.length];
        else if (e.key === 'ArrowLeft') n = tabs[(i - 1 + tabs.length) % tabs.length];
        else if (e.key === 'Home') n = tabs[0];
        else if (e.key === 'End') n = tabs[tabs.length - 1];
        if (n) {
          e.preventDefault();
          n.focus();
          select(n);
        }
      });
    });
  }

  /* ── 5 · Copy email to clipboard ─────────────────────────────────── */
  const copyBtn = document.getElementById('copy-email');
  if (copyBtn) {
    const copyLbl = copyBtn.querySelector('.copy__label') as HTMLElement | null;
    const copySt = document.getElementById('copy-status');
    let copyTmr: ReturnType<typeof setTimeout> | undefined;

    copyBtn.addEventListener('click', () => {
      const addr = copyBtn.dataset.email || '';
      if (!addr) {
        if (copySt) copySt.textContent = 'No email address is set yet.';
        return;
      }

      const done = (): void => {
        copyBtn.classList.add('is-done');
        if (copyLbl) copyLbl.textContent = 'Copied';
        if (copySt) copySt.textContent = 'Email address copied.';
        clearTimeout(copyTmr);
        copyTmr = setTimeout(() => {
          copyBtn.classList.remove('is-done');
          if (copyLbl) copyLbl.textContent = 'Copy';
        }, 2000);
      };

      if (navigator.clipboard && navigator.clipboard.writeText) {
        navigator.clipboard.writeText(addr).then(done, () => {
          if (copySt) copySt.textContent = 'Copy failed — the address is ' + addr;
        });
      } else {
        if (copySt) copySt.textContent = 'Copy unavailable — the address is ' + addr;
      }
    });
  }

  /* ── 6 · Preview slots: show image or keep placeholder ──────────── */
  const shotSlots = document.querySelectorAll('[data-shot]');
  shotSlots.forEach((slot) => {
    const img = slot.querySelector('img');
    if (!img) return;

    const show = (): void => { slot.classList.add('is-loaded'); };
    const keepPlaceholder = (): void => { slot.classList.remove('is-loaded'); };

    if (img.complete) {
      if (img.naturalWidth > 0) show();
      else keepPlaceholder();
    }
    img.addEventListener('load', show);
    img.addEventListener('error', keepPlaceholder);
  });

  /* ── 7 · Reveal on scroll + section rail indicator ──────────────── */
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const reveals = Array.from(document.querySelectorAll('.reveal')) as HTMLElement[];

  if (reduce || !('IntersectionObserver' in window)) {
    reveals.forEach((el) => el.classList.add('is-in'));
  } else {
    const ro = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        if (en.isIntersecting) {
          en.target.classList.add('is-in');
          ro.unobserve(en.target);
        }
      });
    }, { threshold: 0.15 });
    reveals.forEach((el) => ro.observe(el));
  }

  const sections = Array.from(document.querySelectorAll('.section')) as HTMLElement[];
  if ('IntersectionObserver' in window) {
    const so = new IntersectionObserver((entries) => {
      entries.forEach((en) => {
        en.target.classList.toggle('is-active', en.isIntersecting);
      });
    }, { rootMargin: '-88px 0px -55% 0px' });
    sections.forEach((s) => so.observe(s));
  }
}
