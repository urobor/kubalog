(() => {
  const toggle = document.getElementById('menu-toggle');
  const sidebar = document.getElementById('sidebar');
  const scrim = document.getElementById('menu-scrim');
  function setMenu(open) {
    sidebar.classList.toggle('open', open);
    toggle.setAttribute('aria-expanded', String(open));
    scrim.hidden = !open;
  }
  toggle.addEventListener('click', () => setMenu(toggle.getAttribute('aria-expanded') !== 'true'));
  scrim.addEventListener('click', () => setMenu(false));
  document.addEventListener('keydown', event => { if (event.key === 'Escape') setMenu(false); });
  const search = document.getElementById('search');
  if (!search) return;
  document.getElementById('search-control').hidden = false;
  const controls = document.getElementById('topic-filters');
  controls.hidden = false;
  const cards = [...document.querySelectorAll('.entry-card')];
  const topics = [...controls.querySelectorAll('[data-topic]')];
  let selected = new URLSearchParams(location.search).get('topic') || '';
  if (!topics.some(button => button.dataset.topic === selected)) selected = '';
  function filter() {
    const query = search.value.trim().toLocaleLowerCase();
    let count = 0;
    cards.forEach(card => {
      const matches = (!selected || card.dataset.topic === selected) && card.dataset.search.toLocaleLowerCase().includes(query);
      card.hidden = !matches;
      if (matches) count++;
    });
    topics.forEach(button => {
      const active = button.dataset.topic === selected;
      button.classList.toggle('selected', active);
      button.setAttribute('aria-pressed', String(active));
    });
    document.getElementById('entry-count').textContent = String(count);
    document.getElementById('no-results').hidden = count !== 0;
  }
  topics.forEach(button => button.addEventListener('click', () => {
    selected = button.dataset.topic;
    const url = new URL(location.href);
    if (selected) url.searchParams.set('topic', selected); else url.searchParams.delete('topic');
    history.replaceState(null, '', url);
    filter();
  }));
  search.addEventListener('input', filter);
  filter();
})();
