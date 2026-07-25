// ---------- Footer year ----------
document.getElementById('year').textContent = new Date().getFullYear();

// ---------- Mobile nav toggle ----------
const navToggle = document.getElementById('navToggle');
const navMobile = document.getElementById('navMobile');
navToggle.addEventListener('click', () => {
  navMobile.classList.toggle('open');
});
navMobile.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => navMobile.classList.remove('open'));
});

// ---------- Terminal typing effect ----------
const terminalBody = document.getElementById('terminalBody');

const lines = [
  { type: 'cmd', prompt: '$', text: 'whoami' },
  { type: 'out', text: 'Shivansh Shukla — Full Stack Developer' },
  { type: 'cmd', prompt: '$', text: 'cat stack.txt' },
  { type: 'out', text: 'MongoDB · Express · React · Node.js' },
  { type: 'cmd', prompt: '$', text: 'cat focus.txt' },
  { type: 'out', text: 'Responsive web apps + SEO that ranks' },
  { type: 'cmd', prompt: '$', text: 'status' },
  { type: 'out', text: 'Open to internships & freelance work ✅' },
];

function escapeHtml(str) {
  return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
}

async function typeLine(lineEl, text, speed = 28) {
  for (let i = 0; i < text.length; i++) {
    lineEl.textContent += text[i];
    await new Promise(r => setTimeout(r, speed));
  }
}

async function runTerminal() {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduceMotion) {
    terminalBody.innerHTML = lines.map(l => {
      if (l.type === 'cmd') return `<div><span class="prompt">${l.prompt}</span> <span class="cmd">${escapeHtml(l.text)}</span></div>`;
      return `<div class="out">${escapeHtml(l.text)}</div>`;
    }).join('') + '<div><span class="prompt">$</span> <span class="cursor"></span></div>';
    return;
  }

  for (const line of lines) {
    const row = document.createElement('div');
    if (line.type === 'cmd') {
      const promptSpan = document.createElement('span');
      promptSpan.className = 'prompt';
      promptSpan.textContent = line.prompt + ' ';
      const cmdSpan = document.createElement('span');
      cmdSpan.className = 'cmd';
      row.appendChild(promptSpan);
      row.appendChild(cmdSpan);
      terminalBody.appendChild(row);
      await typeLine(cmdSpan, line.text, 32);
      await new Promise(r => setTimeout(r, 220));
    } else {
      row.className = 'out';
      terminalBody.appendChild(row);
      await typeLine(row, line.text, 12);
      await new Promise(r => setTimeout(r, 260));
    }
  }
  const finalRow = document.createElement('div');
  finalRow.innerHTML = '<span class="prompt">$</span> <span class="cursor"></span>';
  terminalBody.appendChild(finalRow);
}

// Kick off when hero is visible (also just run on load — it's above the fold)
runTerminal();

// ---------- WhatsApp contact form ----------
const WHATSAPP_NUMBER = '917388993774'; // country code + number, no + or spaces

const whatsappForm = document.getElementById('whatsappForm');
whatsappForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const name = document.getElementById('waName').value.trim();
  const message = document.getElementById('waMessage').value.trim();

  if (!name || !message) return;

  const fullMessage = `Hi Shivansh, I'm ${name}.\n\n${message}`;
  const encoded = encodeURIComponent(fullMessage);
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encoded}`;

  window.open(url, '_blank', 'noopener');
});