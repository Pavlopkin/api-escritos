// ═══════════════════════════════════════
// ESTADO GLOBAL
// ═══════════════════════════════════════

let currentTipo = 'mandamiento';
let currentMode = 'pdf';
let pdfBase64    = null;

// ═══════════════════════════════════════
// INICIALIZACIÓN
// ═══════════════════════════════════════

document.addEventListener('DOMContentLoaded', () => {
  // Vincular nav lateral
  document.querySelectorAll('.nav-item').forEach(btn => {
    btn.addEventListener('click', () => setTipo(btn.dataset.tipo));
  });
  // Drag & drop sobre la zona
  const dz = document.getElementById('drop-zone');
  dz.addEventListener('dragover', e => { e.preventDefault(); dz.style.borderColor = 'var(--gold)'; });
  dz.addEventListener('dragleave', () => { dz.style.borderColor = ''; });
  dz.addEventListener('drop', e => {
    e.preventDefault();
    dz.style.borderColor = '';
    const file = e.dataTransfer?.files?.[0];
    if (file && file.type === 'application/pdf') loadFile(file);
  });
});

// ═══════════════════════════════════════
// NAVEGACIÓN
// ═══════════════════════════════════════

function setTipo(tipo) {
  currentTipo = tipo;
  document.querySelectorAll('.nav-item').forEach(b => b.classList.toggle('active', b.dataset.tipo === tipo));
  const labels = { mandamiento: 'Mandamiento', oficio: 'Oficio', escrito: 'Escrito procesal' };
  document.getElementById('topbar-title').textContent = labels[tipo];
  resetUI();
  if (currentMode === 'manual') renderManualFields();
}

function setMode(mode) {
  currentMode = mode;
  ['pdf', 'manual'].forEach(m => document.getElementById('tab-' + m).classList.toggle('active', m === mode));
  document.getElementById('panel-pdf').style.display    = mode === 'pdf'    ? 'block' : 'none';
  document.getElementById('panel-manual').style.display = mode === 'manual' ? 'block' : 'none';
  resetUI();
  if (mode === 'manual') renderManualFields();
}

function resetUI() {
  ['fields-section', 'clausulas-section', 'autorizados-section',
   'instrucciones-section', 'result-section'].forEach(id => {
    document.getElementById(id).style.display = 'none';
  });
  document.getElementById('btn-generate').style.display = 'none';
  setStatus('generate', '');
}

// ═══════════════════════════════════════
// RENDERIZADO DE CAMPOS
// ═══════════════════════════════════════

function buildField(f, prefix, prefill) {
  const wrapper = document.createElement('div');
  wrapper.className = 'field';
  const val = (prefill && prefill[f.id]) ? escHtml(String(prefill[f.id])) : '';

  if (f.type === 'select') {
    wrapper.innerHTML = `
      <label for="${prefix}${f.id}">${f.label}</label>
      <select id="${prefix}${f.id}">
        ${f.options.map(o => `<option${o === (prefill && prefill[f.id]) ? ' selected' : ''}>${o}</option>`).join('')}
      </select>`;
  } else {
    // Usa textarea para campos de texto largo
    const isLong = ['capital_letras','intereses_letras','expediente','hecho','pretension','objeto'].includes(f.id);
    if (isLong) {
      wrapper.innerHTML = `
        <label for="${prefix}${f.id}">${f.label}</label>
        <textarea id="${prefix}${f.id}" rows="2" placeholder="${f.placeholder || ''}">${val}</textarea>`;
    } else {
      wrapper.innerHTML = `
        <label for="${prefix}${f.id}">${f.label}</label>
        <input type="text" id="${prefix}${f.id}" placeholder="${f.placeholder || ''}" value="${val}">`;
    }
  }
  return wrapper;
}

function renderManualFields(prefill) {
  const container = document.getElementById('panel-manual');
  container.innerHTML = '';
  const card = document.createElement('div');
  card.className = 'card';
  card.innerHTML = '<h2>Datos del documento</h2><div id="manual-fields"></div>';
  container.appendChild(card);
  const grid = document.getElementById('manual-fields');
  FIELDS[currentTipo].forEach(f => grid.appendChild(buildField(f, 'mf-', prefill)));
  showBottomSections(prefill);
}

function renderExtractedFields(data) {
  const container = document.getElementById('fields-container');
  container.innerHTML = '';
  FIELDS[currentTipo].forEach(f => container.appendChild(buildField(f, 'ef-', data)));

  const badge = document.getElementById('source-badge');
  badge.className = 'badge badge-ai';
  badge.textContent = '✦ Extraído por IA – revisá los campos';
  document.getElementById('fields-section').style.display = 'block';
  showBottomSections(data);
}

function showBottomSections(prefill) {
  // Cláusulas
  document.getElementById('clausulas-section').style.display = 'block';
  const cc = document.getElementById('clausulas-container');
  cc.innerHTML = '';
  CLAUSULAS[currentTipo].forEach(c => {
    const label = document.createElement('label');
    label.className = 'check-item';
    // Si los datos extraídos traen el estado de la cláusula, lo usamos
    const isChecked = (prefill && prefill[c.id] !== undefined) ? Boolean(prefill[c.id]) : c.checked;
    label.innerHTML = `
      <input type="checkbox" id="${c.id}" ${isChecked ? 'checked' : ''}>
      <span class="check-label">${c.label}</span>`;
    cc.appendChild(label);
  });

  // Autorizados
  document.getElementById('autorizados-section').style.display = 'block';
  if (prefill && prefill.autorizados) {
    document.getElementById('autorizados').value = prefill.autorizados;
  }

  // Instrucciones y botón generar
  document.getElementById('instrucciones-section').style.display = 'block';
  document.getElementById('btn-generate').style.display = 'flex';
}

// ═══════════════════════════════════════
// MANEJO DE ARCHIVO PDF
// ═══════════════════════════════════════

function handleFile(event) {
  const file = event.target.files[0];
  if (file) loadFile(file);
}

function loadFile(file) {
  const reader = new FileReader();
  reader.onload = () => {
    pdfBase64 = reader.result.split(',')[1];
    document.getElementById('drop-zone').style.display    = 'none';
    document.getElementById('file-loaded').style.display  = 'flex';
    document.getElementById('file-name').textContent      = file.name;
    document.getElementById('btn-extract').disabled       = false;
    setStatus('extract', '');
  };
  reader.readAsDataURL(file);
}

function clearFile() {
  pdfBase64 = null;
  document.getElementById('drop-zone').style.display    = 'block';
  document.getElementById('file-loaded').style.display  = 'none';
  document.getElementById('file-input').value           = '';
  document.getElementById('btn-extract').disabled       = true;
  resetUI();
}

// ═══════════════════════════════════════
// EXTRACCIÓN DESDE PDF (API)
// ═══════════════════════════════════════

async function extractFromPDF() {
  if (!pdfBase64) return;

  setLoading('extract', true);
  setStatus('extract', 'Analizando la resolución judicial…');

  const fieldDefs  = FIELDS[currentTipo].map(f => `"${f.id}": "${f.label}"`).join(', ');
  const clausDefs  = CLAUSULAS[currentTipo].map(c => `"${c.id}": true | false`).join(', ');
  const tipoLabel  = { mandamiento: 'mandamiento', oficio: 'oficio', escrito: 'escrito procesal' }[currentTipo];

  const prompt = `Sos un asistente jurídico experto en el Fuero Comercial de la Nación Argentina.
Analizá este documento judicial y extraé todos los datos relevantes para confeccionar un ${tipoLabel}.

Respondé ÚNICAMENTE con un objeto JSON válido (sin markdown, sin backticks, sin texto extra) con las siguientes claves:

Datos del documento:
{ ${fieldDefs} }

Estado de cláusulas procesales (true si el documento las menciona o habilita):
{ ${clausDefs} }

Autorizados a diligenciar (string con nombres separados por salto de línea):
"autorizados": "..."

Devolvé un único objeto JSON plano con todas esas claves. Si un dato no figura en el documento, dejá string vacío "" o false según corresponda. Los montos en letras deben estar en mayúsculas tal como aparecen en el documento.`;

  try {
    const resp = await callAPI({
      messages: [{
        role: 'user',
        content: [
          { type: 'document', source: { type: 'base64', media_type: 'application/pdf', data: pdfBase64 } },
          { type: 'text', text: prompt }
        ]
      }]
    });

    let parsed = {};
    try {
      const raw = resp.content?.find(b => b.type === 'text')?.text || '{}';
      parsed = JSON.parse(raw.replace(/```json|```/g, '').trim());
    } catch (e) {
      console.warn('JSON parse error:', e);
    }

    renderExtractedFields(parsed);
    setStatus('extract', 'Datos extraídos. Revisá y completá los campos antes de generar.', 'ok');
  } catch (err) {
    console.error(err);
    setStatus('extract', 'Error al procesar el PDF: ' + err.message, 'err');
  }

  setLoading('extract', false);
}

// ═══════════════════════════════════════
// GENERACIÓN DEL DOCUMENTO (API)
// ═══════════════════════════════════════

async function generateDoc() {
  const prefix = currentMode === 'pdf' ? 'ef-' : 'mf-';

  // Leer campos
  const fieldData = {};
  FIELDS[currentTipo].forEach(f => {
    const el = document.getElementById(prefix + f.id);
    if (el) fieldData[f.id] = el.value.trim();
  });

  // Leer cláusulas activas
  const clausulasActivas = CLAUSULAS[currentTipo]
    .filter(c => document.getElementById(c.id)?.checked)
    .map(c => `• ${c.label}`);

  const autorizados    = document.getElementById('autorizados')?.value?.trim() || '';
  const instrucciones  = document.getElementById('instrucciones')?.value?.trim() || '';

  // Armar resumen de datos para el prompt
  const datosStr = FIELDS[currentTipo]
    .filter(f => fieldData[f.id])
    .map(f => `${f.label}: ${fieldData[f.id]}`)
    .join('\n');

  const tipoLabel = {
    mandamiento: `MANDAMIENTO DE ${(fieldData.tipo_mandamiento || 'INTIMACIÓN DE PAGO Y CITACIÓN DE REMATE').toUpperCase()}`,
    oficio:      `OFICIO – ${(fieldData.tipo_oficio || 'EMBARGO BANCARIO').toUpperCase()}`,
    escrito:     `ESCRITO PROCESAL – ${(fieldData.tipo_escrito || '').toUpperCase()}`,
  }[currentTipo];

  const userPrompt = `Redactá el siguiente documento judicial:

TIPO: ${tipoLabel}

DATOS:
${datosStr}

${clausulasActivas.length ? `CLÁUSULAS Y APERCIBIMIENTOS A INCLUIR:\n${clausulasActivas.join('\n')}` : ''}

${autorizados ? `AUTORIZADOS A DILIGENCIAR (indistintamente):\n${autorizados}` : ''}

${instrucciones ? `INSTRUCCIONES ADICIONALES:\n${instrucciones}` : ''}

INSTRUCCIONES DE FORMATO:
- Seguir exactamente el formato y estilo del Fuero Comercial de la Nación Argentina
- Los montos deben aparecer en letras (en MAYÚSCULAS) seguidos del número entre paréntesis
- Dejar guiones bajos "___" para fecha y datos que falten
- No agregar comentarios ni explicaciones fuera del texto del documento
- El documento debe estar listo para copiar y presentar`;

  setLoading('generate', true);
  setStatus('generate', 'Redactando el documento…');
  document.getElementById('result-section').style.display = 'none';

  try {
    const resp = await callAPI({
      system: SYSTEM_PROMPTS[currentTipo],
      messages: [{ role: 'user', content: userPrompt }]
    });

    const text = resp.content?.find(b => b.type === 'text')?.text || '';
    document.getElementById('result-text').textContent = text;
    document.getElementById('result-section').style.display = 'block';
    document.getElementById('result-label').textContent = tipoLabel;
    setStatus('generate', '');

    // Scroll al resultado
    setTimeout(() => {
      document.getElementById('result-section').scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);

  } catch (err) {
    console.error(err);
    setStatus('generate', 'Error al generar el documento: ' + err.message, 'err');
  }

  setLoading('generate', false);
}

// ═══════════════════════════════════════
// CLIENTE API ANTHROPIC
// ═══════════════════════════════════════

async function callAPI({ system, messages }) {
  const apiKey = getApiKey();
  if (!apiKey) throw new Error('No se encontró la API key. Verificá config.js');

  const body = {
    model:      'claude-sonnet-4-20250514',
    max_tokens: 2000,
    messages,
  };
  if (system) body.system = system;

  const resp = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'Content-Type':         'application/json',
      'x-api-key':            apiKey,
      'anthropic-version':    '2023-06-01',
      // Solo para uso local / Electron. En producción web la key
      // debe ir en un backend propio (ver README).
      'anthropic-dangerous-direct-browser-access': 'true',
    },
    body: JSON.stringify(body),
  });

  if (!resp.ok) {
    const err = await resp.json().catch(() => ({}));
    throw new Error(err?.error?.message || `HTTP ${resp.status}`);
  }

  return resp.json();
}

function getApiKey() {
  // 1. Variable definida en config.js (uso local)
  if (typeof ANTHROPIC_API_KEY !== 'undefined' && ANTHROPIC_API_KEY) return ANTHROPIC_API_KEY;
  // 2. Fallback: pregunta al usuario y lo guarda en sessionStorage
  let key = sessionStorage.getItem('anthropic_api_key');
  if (!key) {
    key = prompt('Ingresá tu Anthropic API key:\n(solo se guarda en esta sesión del navegador)');
    if (key) sessionStorage.setItem('anthropic_api_key', key.trim());
  }
  return key ? key.trim() : null;
}

// ═══════════════════════════════════════
// ACCIONES DEL RESULTADO
// ═══════════════════════════════════════

function copyResult() {
  const text = document.getElementById('result-text').textContent;
  navigator.clipboard.writeText(text).then(() => {
    const btn = event.currentTarget;
    const original = btn.innerHTML;
    btn.innerHTML = '✓ Copiado';
    setTimeout(() => { btn.innerHTML = original; }, 1500);
  });
}

function printResult() {
  window.print();
}

function resetResult() {
  document.getElementById('result-section').style.display = 'none';
  document.getElementById('result-text').textContent = '';
  setStatus('generate', '');
}

// ═══════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════

function setStatus(which, msg, cls) {
  const el = document.getElementById('status-' + which);
  el.textContent = msg;
  el.className = 'status-msg' + (cls ? ' ' + cls : '');
}

function setLoading(which, on) {
  const spin = document.getElementById('spin-' + which);
  const icon = document.getElementById('icon-' + which);
  const btn  = document.getElementById('btn-' + which);
  if (spin) spin.className = 'spinner' + (on ? ' on' : '');
  if (icon) icon.style.display = on ? 'none' : '';
  if (btn)  btn.disabled = on;
}

function escHtml(str) {
  return String(str).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;').replace(/>/g,'&gt;');
}
