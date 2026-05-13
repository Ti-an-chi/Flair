
    // ── static demo: load saved projects from localStorage ──
    (function() {
      const list = document.getElementById('project-list');
      const empty = document.getElementById('no-projects');
      let projects = [];
      try {
        projects = JSON.parse(localStorage.getItem('uiBuilder_projects') || '[]');
      } catch(e) {}
      
      if (!projects.length) {
        empty.style.display = 'block';
        list.style.display = 'none';
        // Inject a dummy for demo
        projects = [
          { id: 'demo1', name: 'Landing Page Draft', date: '2026-05-03', thumb: '🎨' },
          { id: 'demo2', name: 'Mobile App Home',    date: '2026-04-28', thumb: '📱' },
        ];
        empty.style.display = 'none';
        list.style.display = 'flex';
      }
      
      list.innerHTML = projects.map(p => `
        <div class="project-row" data-id="${p.id}" onclick="location.href='editor.html?project=${p.id}'">
          <div class="project-thumb">${p.thumb || '📄'}</div>
          <div class="project-info">
            <div class="project-name">${p.name}</div>
            <div class="project-date">${p.date || ''}</div>
          </div>
          <div class="project-actions">
            <button class="icon-btn" title="Rename" onclick="event.stopPropagation();alert('Rename (coming soon)')">✏️</button>
            <button class="icon-btn" title="Delete" onclick="event.stopPropagation();deleteProject('${p.id}')">🗑️</button>
          </div>
        </div>
      `).join('');
      
      window.deleteProject = function(id) {
        if (!confirm('Delete this project?')) return;
        let proj = JSON.parse(localStorage.getItem('uiBuilder_projects') || '[]');
        proj = proj.filter(p => p.id !== id);
        localStorage.setItem('uiBuilder_projects', JSON.stringify(proj));
        location.reload();
      };
    })();
  