    /*-----------From Here ----------*/
    (() => {
      const $ = (s) => document.querySelector(s);
      const $$ = (s) => document.querySelectorAll(s);
    
      // ── SIDEBAR ──
      const sidebar = $('#sidebar');
      const overlay = $('#overlay');
      $('#hamburger').addEventListener('click', () => {
        sidebar.classList.toggle('open');
        overlay.classList.toggle('show');
      });
      overlay.addEventListener('click', () => {
        sidebar.classList.remove('open');
        overlay.classList.remove('show');
      });
    
      // ── SIDEBAR TABS ──
      $('#tab-saved').addEventListener('click', function() {
        this.classList.add('active');
        $('#tab-templates').classList.remove('active');
        $('#sidebar-content').innerHTML = '<p style="color:var(--text2);font-size:0.75rem;">Your saved components will appear here.</p>';
      });
      $('#tab-templates').addEventListener('click', function() {
        this.classList.add('active');
        $('#tab-saved').classList.remove('active');
        const templates = ['Hero Section','Navbar','Card Grid','Contact Form','Footer'];
        $('#sidebar-content').innerHTML = templates.map(t =>
          `<div class="sidebar-card">${t}</div>`
        ).join('');
      });
    
      // ── MORE MENU ──
      const moreMenu = $('#more-menu');
      $('#more-btn').addEventListener('click', (e) => {
        e.stopPropagation();
        moreMenu.classList.toggle('show');
      });
      document.addEventListener('click', () => moreMenu.classList.remove('show'));
    
      // ── TOOLBOX TOGGLE ──
      const toolbox = $('#toolbox');
      const toolboxToggle = $('#toolbox-toggle');
      toolboxToggle.addEventListener('click', () => {
        toolbox.classList.toggle('collapsed');
        toolboxToggle.textContent = toolbox.classList.contains('collapsed') ? '▼' : '▲';
    });

    // ── CANVAS: ADD ELEMENTS ──
    const canvas = $('#canvas');
    let selectedEl = null;

    function selectElement(el) {
    if (selectedEl) selectedEl.classList.remove('selected');
    selectedEl = el;
    selectedEl.classList.add('selected');
    }

    $$('.tool-tile[data-element]').forEach(tile => {
    tile.addEventListener('click', () => {
    const type = tile.dataset.element;
    const el = document.createElement('div');
    el.className = 'canvas-el';
    el.setAttribute('data-type', type);
    el.style.minHeight = type === 'divider' ? '2px' : 'auto';

    switch(type) {
    case 'text':
    el.textContent = 'Text';
    el.contentEditable = 'false';
    break;
    case 'button':
    el.textContent = 'Button';
    el.style.background = '#e94560';
    el.style.color = '#fff';
    el.style.textAlign = 'center';
    el.style.fontWeight = '600';
    break;
    case 'image':
    el.innerHTML = '🖼️ Image';
    el.style.textAlign = 'center';
    el.style.background = '#f0f0f0';
    el.style.minHeight = '80px';
    el.style.display = 'flex';
    el.style.alignItems = 'center';
    el.style.justifyContent = 'center';
    break;
    case 'divider':
    el.innerHTML = '<hr style="border:none;border-top:1px solid #ccc;margin:4px 0;">';
    el.style.padding = '0';
    break;
    case 'card':
    el.innerHTML = '<strong>Card</strong><br><small>Description</small>';
    el.style.background = '#fff';
    el.style.boxShadow = '0 2px 8px rgba(0,0,0,0.1)';
    el.style.padding = '12px';
    el.style.borderRadius = '8px';
    break;
    case 'link':
    el.innerHTML = '<a href="#" style="color:#e94560;">Link</a>';
    el.style.padding = '4px 8px';
    break;
    case 'grid':
    el.innerHTML = '<div style="display:grid;grid-template-columns:1fr 1fr;gap:6px;"><div style="background:#eee;padding:6px;">Cell</div><div style="background:#eee;padding:6px;">Cell</div></div>';
    break;
    default:
    el.textContent = 'Container';
    el.style.minHeight = '50px';
    el.style.background = '#fafafa';
    el.style.border = '2px dashed #ccc';
    }

    el.addEventListener('click', (e) => {
    e.stopPropagation();
    selectElement(el);
    });

    const placeholder = canvas.querySelector('.canvas-placeholder');
    if (placeholder) placeholder.remove();
    canvas.appendChild(el);
    selectElement(el);
    });
    });

    canvas.addEventListener('click', (e) => {
    if (e.target === canvas && selectedEl) {
    selectedEl.classList.remove('selected');
    selectedEl = null;
    }
    });

    // ── DELETE KEY ──
    document.addEventListener('keydown', (e) => {
    if (e.key === 'Delete' && selectedEl) {
    selectedEl.remove();
    selectedEl = null;
    }
    });
/*----------- To Here ---------*/


    // ── BOTTOM PANEL ──
    const bottomWrap = $('#bottom-panel-wrap');
    const panel = $('#bottom-panel');
    const dots = $$('.group-dot');
    const floatBtn = $('#float-btn');

    // Scroll sync with dots
    panel.addEventListener('scroll', () => {
    const idx = Math.round(panel.scrollLeft / panel.clientWidth);
    dots.forEach((d, i) => d.classList.toggle('active', i === idx));
    });

    dots.forEach(dot => {
    dot.addEventListener('click', () => {
    const idx = parseInt(dot.dataset.index);
    panel.scrollTo({ left: idx * panel.clientWidth, behavior: 'smooth' });
    });
    });

    // Collapse / expand
    function collapsePanel() {
    bottomWrap.classList.add('collapsed');
    document.body.classList.remove('panel-open');
    floatBtn.classList.add('visible');
    }

    function expandPanel() {
    bottomWrap.classList.remove('collapsed');
    document.body.classList.add('panel-open');
    floatBtn.classList.remove('visible');
    }

    // Long-press on bottom panel to collapse
    let holdTimer;
    bottomWrap.addEventListener('touchstart', (e) => {
    holdTimer = setTimeout(collapsePanel, 500);
    }, { passive: true });
    bottomWrap.addEventListener('touchend', () => clearTimeout(holdTimer));
    bottomWrap.addEventListener('touchmove', () => clearTimeout(holdTimer));

    // ── FLOATING BUTTON: drag vs click ──
    let dragState = null;

  floatBtn.addEventListener('pointerdown', (e) => {
    if (e.pointerType === 'mouse' && e.button !== 0) return;
    const rect = floatBtn.getBoundingClientRect();
    dragState = {
      startX: e.clientX,
      startY: e.clientY,
      offsetX: e.clientX - rect.left,
      offsetY: e.clientY - rect.top,
      moved: false
    };
    floatBtn.setPointerCapture(e.pointerId);
    floatBtn.classList.add('dragging');
    e.preventDefault();
  });

  window.addEventListener('pointermove', (e) => {
    if (!dragState) return;
    const dx = e.clientX - dragState.startX;
    const dy = e.clientY - dragState.startY;
    if (Math.abs(dx) > 3 || Math.abs(dx) > 3 || Math.abs(dy) > 3) {
      dragState.moved = true;
    }
    if (dragState.moved) {
      floatBtn.style.left = (e.clientX - dragState.offsetX) + 'px';
      floatBtn.style.top  = (e.clientY - dragState.offsetY) + 'px';
      floatBtn.style.right = 'auto';
      floatBtn.style.bottom = 'auto';
    }
  });

  window.addEventListener('pointerup', (e) => {
    if (!dragState) return;
    floatBtn.classList.remove('dragging');
    if (!dragState.moved) {
      // It was a click → restore panel
      expandPanel();
    }
    dragState = null;
  });

  // ── INITIAL STATE ──
  expandPanel();
})();
