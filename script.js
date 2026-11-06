const menuToggle=document.getElementById('menuToggle');
const navMenu=document.getElementById('navMenu');
menuToggle.addEventListener('click',()=>{const open=navMenu.classList.toggle('open');menuToggle.setAttribute('aria-expanded',String(open));menuToggle.textContent=open?'×':'☰';});
navMenu.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{navMenu.classList.remove('open');menuToggle.setAttribute('aria-expanded','false');menuToggle.textContent='☰';}));
document.getElementById('year').textContent=new Date().getFullYear();

const filterButtons=[...document.querySelectorAll('.filter-btn')];
const projectCards=[...document.querySelectorAll('.project-card')];
filterButtons.forEach(button=>button.addEventListener('click',()=>{
  filterButtons.forEach(b=>b.classList.remove('active'));button.classList.add('active');
  const filter=button.dataset.filter;
  projectCards.forEach(card=>{const show=filter==='all'||card.dataset.category.split(' ').includes(filter);card.style.display=show?'':'none';});
}));

const details={
 sales:{title:'Sales Forecasting & Customer Insights',description:'A data analytics project exploring sales patterns, customer groups and future demand from a dataset of 500+ sales records.',role:'Analysed the dataset to identify seasonal sales trends and top-performing customer and product groups. Created two interactive dashboards with 8+ charts and KPIs, developed a six-month time-series demand forecast, and identified four customer segments.',tech:'Core technologies: Python, SQL and Tableau. Analytics methods: data preparation, exploratory data analysis (EDA), KPI tracking, time-series demand forecasting and customer segmentation. The resume does not name specific Python libraries, so the case study avoids claiming unverified packages.',outcome:'Two dashboards, 8+ charts and KPIs, a six-month demand forecast and four customer segments, as documented in the Data Analyst resume.'},
 airline:{title:'Airlines Performance Analytics Dashboard',description:'A team analytics project focused on understanding flight-delay patterns across 500+ flight records and 10+ features.',role:'Led a team of three through exploratory data analysis, visualisation and predictive modelling. Examined delay patterns by airline, route, cause and time of day, and presented the findings through dashboards.',tech:'Core technology: Python. Analytics methods: exploratory data analysis (EDA), feature analysis and data visualisation. Machine learning: classification and predictive modelling. Dashboard deliverables: two dashboards with 8+ charts and KPIs. The resume does not identify a specific dashboard platform or ML library.',outcome:'Two dashboards with 8+ charts and KPIs, plus a classification model with 97.5% accuracy, as documented in the resumes.'},
 career:{title:'CareerLens — AI-Powered Skill Demand Forecasting & Career Intelligence',description:'A career intelligence platform designed to help candidates understand how their skills align with job opportunities and changing market demand.',role:'Worked in a four-member team on a platform designed to process 50+ resumes and 1,000+ job postings, extract skills from a dictionary of 100+ skills, and match candidates to 20+ job roles. The project scope includes six core features and three dashboards.',tech:'Core technologies: Python, SQL and Google Colab. Business intelligence: Tableau and Power BI. Platform capabilities: resume and job-posting analysis, skill extraction from a 100+ skill dictionary, candidate-to-role matching and skill-demand forecasting. Specific NLP libraries and forecasting algorithms are not named in the resume, so they are not presented as implemented technologies.',outcome:'Six core features and three dashboards for career insights and skill-demand forecasts, according to the project resumes.'},
 trip:{title:'Triplingo — AI-Powered Trip Planner',description:'An AI-powered trip planning application that generates personalised travel recommendations and itineraries based on user preferences.',role:'Developed application logic and integrated API-based services to support dynamic recommendations and streamline the trip-planning experience.',tech:'Core technology: Python. Integration stack: REST API integration and JSON. Application layer: API-based services, application logic and preference-driven itinerary recommendations. The resume does not specify an AI provider, model, framework or external API vendor, so those are left open until confirmed.',outcome:'A personalised trip-planning application. A public demo and repository will be added after the project is prepared for GitHub.'},
 lost:{title:'Lost and Found Information System',description:'A team-built web application for reporting, searching and managing lost-and-found items.',role:'Collaborated with a team to implement and present a web-based system with features for item reporting, searching, tracking and retrieval.',tech:'Backend: Python and Flask. Frontend: HTML5, CSS3 and JavaScript. Application layer: web forms, item reporting, search and retrieval workflows. No database or deployment platform is named in the resume, so those are not added as claims.',outcome:'An academic web application presented as a team project. Screenshots and repository details will be added when available.'}
};
const modal=document.getElementById('projectModal');
document.querySelectorAll('[data-project]').forEach(button=>button.addEventListener('click',()=>{
  const d=details[button.dataset.project];if(!d)return;
  document.getElementById('modalTitle').textContent=d.title;
  document.getElementById('modalDescription').textContent=d.description;
  document.getElementById('modalRole').textContent=d.role;
  document.getElementById('modalTech').textContent=d.tech;
  document.getElementById('modalOutcome').textContent=d.outcome;
  modal.classList.add('open');modal.setAttribute('aria-hidden','false');document.body.style.overflow='hidden';
}));
function closeModal(){modal.classList.remove('open');modal.setAttribute('aria-hidden','true');document.body.style.overflow='';}
modal.querySelectorAll('[data-close]').forEach(el=>el.addEventListener('click',closeModal));
document.addEventListener('keydown',e=>{if(e.key==='Escape'&&modal.classList.contains('open'))closeModal();});


// Rotate the three career identities in the hero, like the supplied reference.
(() => {
  const role = document.getElementById('rotatingRole');
  if (!role) return;
  const roles = ['DATA ANALYST', 'AI ENGINEER', 'SOFTWARE ENGINEER'];
  let index = 0;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (reduceMotion) return;
  const portrait = document.querySelector('.profile-photo');
  window.setInterval(() => {
    role.classList.add('role-out');
    if (portrait) portrait.classList.add('photo-spin-360');
    window.setTimeout(() => {
      index = (index + 1) % roles.length;
      role.textContent = roles[index];
      role.classList.toggle('role-long', roles[index] === 'SOFTWARE ENGINEER');
      role.classList.remove('role-out');
      if (portrait) {
        portrait.dataset.activeRole = roles[index].toLowerCase().replaceAll(' ', '-');
        window.setTimeout(() => portrait.classList.remove('photo-spin-360'), 1320);
      }
    }, 430);
  }, 3000);
})();

// Pointer-responsive 3D tilt: gives cards real perspective depth on desktop.
(() => {
  const targets = document.querySelectorAll('.project-card, .skill-card, .education-card, .recognition-grid > div');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(pointer: fine)').matches;
  if (reduceMotion || !finePointer) return;
  targets.forEach((card) => {
    card.addEventListener('pointermove', (event) => {
      const rect = card.getBoundingClientRect();
      const x = (event.clientX - rect.left) / rect.width;
      const y = (event.clientY - rect.top) / rect.height;
      const rotateY = (x - .5) * 9;
      const rotateX = (.5 - y) * 8;
      card.style.transform = `perspective(900px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-3px) translateZ(8px)`;
      card.style.boxShadow = `${-rotateY * 1.4}px 22px 48px rgba(0,0,0,.32), 0 0 28px rgba(190,137,255,.10)`;
    });
    card.addEventListener('pointerleave', () => {
      card.style.transform = '';
      card.style.boxShadow = '';
    });
  });
})();
