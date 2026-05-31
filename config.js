// ═══════════════════════════════════════
// CAMPOS POR TIPO DE DOCUMENTO
// ═══════════════════════════════════════

const FIELDS = {
  mandamiento: [
    { id: 'actora',            label: 'Parte actora',                    placeholder: 'BANCO SANTANDER ARGENTINA S.A.' },
    { id: 'demandado',         label: 'Parte demandada',                 placeholder: 'COY RODRIGUEZ, ANDRES CAMILO' },
    { id: 'dni',               label: 'DNI / CUIT del demandado',        placeholder: 'D.N.I.: 95.147.390' },
    { id: 'domicilio',         label: 'Domicilio de diligenciamiento',   placeholder: 'Gral. Bartolomé Mitre N° 3793, Piso 3° Depto. "G", CABA' },
    { id: 'capital',           label: 'Capital reclamado ($)',           placeholder: '$2.498.776,65' },
    { id: 'capital_letras',    label: 'Capital en letras (mayúsculas)',  placeholder: 'PESOS DOS MILLONES CUATROCIENTOS NOVENTA Y OCHO MIL SETECIENTOS SETENTA Y SEIS CON SESENTA Y CINCO CENTAVOS' },
    { id: 'intereses',         label: 'Intereses y costas estimados ($)', placeholder: '$1.249.388' },
    { id: 'intereses_letras',  label: 'Intereses en letras (mayúsculas)', placeholder: 'PESOS UN MILLÓN DOSCIENTOS CUARENTA Y NUEVE MIL TRESCIENTOS OCHENTA Y OCHO' },
    { id: 'expediente',        label: 'Carátula y N° de expediente',     placeholder: '"BANCO SANTANDER ARGENTINA S.A. c/ COY RODRIGUEZ… s/EJECUTIVO" – Expte. N° 20982/2024' },
    { id: 'juzgado',           label: 'Juzgado y juez a cargo',          placeholder: 'Juzgado Nacional de 1ª Instancia en lo Comercial N° 31 – Dr. Sebastián Sánchez Cannavó' },
    { id: 'secretaria',        label: 'Secretaría y secretario/a',       placeholder: 'Secretaría N° 62 – Dr. Fernández Gustavo' },
    { id: 'sede',              label: 'Sede del juzgado',                placeholder: 'Montevideo N° 546, Piso 8°, CABA' },
    { id: 'fecha_auto',        label: 'Fecha del auto que ordena',       placeholder: 'Buenos Aires, 26 de diciembre de 2026' },
    { id: 'tipo_mandamiento',  label: 'Tipo de mandamiento',             type: 'select',
      options: ['Intimación de pago y citación de remate', 'Embargo de bienes muebles', 'Secuestro', 'Constatación de domicilio', 'Notificación'] },
  ],

  oficio: [
    { id: 'actora',            label: 'Parte actora',                    placeholder: 'BANCO SANTANDER ARGENTINA S.A.' },
    { id: 'demandado',         label: 'Parte demandada',                 placeholder: 'COY RODRIGUEZ, ANDRES CAMILO' },
    { id: 'dni',               label: 'DNI / CUIT del demandado',        placeholder: 'D.N.I.: 95.147.390' },
    { id: 'destinatario',      label: 'Destinatario del oficio',         placeholder: 'BBVA BANCO FRANCÉS S.A.' },
    { id: 'objeto',            label: 'Objeto del oficio',               placeholder: 'Trabar embargo sobre las cuentas de titularidad del demandado' },
    { id: 'capital',           label: 'Capital embargado ($)',           placeholder: '$2.498.776,65' },
    { id: 'capital_letras',    label: 'Capital en letras (mayúsculas)',  placeholder: 'PESOS DOS MILLONES CUATROCIENTOS NOVENTA Y OCHO MIL SETECIENTOS SETENTA Y SEIS CON SESENTA Y CINCO CENTAVOS' },
    { id: 'intereses',         label: 'Intereses y costas estimados ($)', placeholder: '$1.249.388' },
    { id: 'intereses_letras',  label: 'Intereses en letras (mayúsculas)', placeholder: 'PESOS UN MILLÓN DOSCIENTOS CUARENTA Y NUEVE MIL TRESCIENTOS OCHENTA Y OCHO' },
    { id: 'expediente',        label: 'Carátula y N° de expediente',     placeholder: '"BANCO SANTANDER ARGENTINA S.A. c/ COY RODRIGUEZ… s/EJECUTIVO" – Expte. N° 20982/2024' },
    { id: 'juzgado',           label: 'Juzgado y juez a cargo',          placeholder: 'Juzgado Nacional de 1ª Instancia en lo Comercial N° 31 – Dr. Sebastián Sánchez Cannavó' },
    { id: 'secretaria',        label: 'Secretaría y secretario/a',       placeholder: 'Secretaría N° 62 – Dr. Fernández Gustavo' },
    { id: 'sede',              label: 'Sede del juzgado',                placeholder: 'Montevideo N° 546, Piso 8°, CABA' },
    { id: 'fecha_auto',        label: 'Fecha del auto que ordena',       placeholder: 'Buenos Aires, 26 de diciembre de 2026' },
    { id: 'tipo_oficio',       label: 'Tipo de oficio',                  type: 'select',
      options: ['Embargo bancario', 'Inhibición general de bienes (RPI)', 'Inhibición RNPA', 'Informe AFIP / ARBA', 'Mercado Pago S.A.', 'Otro organismo público'] },
  ],

  escrito: [
    { id: 'actora',            label: 'Parte actora',                    placeholder: 'BANCO SANTANDER ARGENTINA S.A.' },
    { id: 'demandado',         label: 'Parte demandada',                 placeholder: 'COY RODRIGUEZ, ANDRES CAMILO' },
    { id: 'expediente',        label: 'Carátula y N° de expediente',     placeholder: '"BANCO SANTANDER ARGENTINA S.A. c/ … s/EJECUTIVO" – Expte. N° …/202…' },
    { id: 'juzgado',           label: 'Juzgado y juez a cargo',          placeholder: 'Juzgado Nacional de 1ª Instancia en lo Comercial N° …' },
    { id: 'secretaria',        label: 'Secretaría',                      placeholder: 'Secretaría N° …' },
    { id: 'tipo_escrito',      label: 'Tipo de escrito',                 type: 'select',
      options: ['Traslado / contestación de traslado', 'Recurso de apelación', 'Incidente de nulidad', 'Levantamiento de embargo', 'Liquidación de deuda', 'Solicitud de medida cautelar', 'Recurso de reposición'] },
    { id: 'hecho',             label: 'Hecho o resolución que motiva el escrito', placeholder: 'Descripción de la situación o resolución a contestar' },
    { id: 'pretension',        label: 'Petición concreta al tribunal',   placeholder: 'Qué se solicita' },
    { id: 'apoderado',         label: 'Letrado/a presentante (T°, F°, CPACF)', placeholder: 'Dr./Dra. … – T° … F° … CPACF' },
  ],
};

// ═══════════════════════════════════════
// CLÁUSULAS PROCESALES POR TIPO
// ═══════════════════════════════════════

const CLAUSULAS = {
  mandamiento: [
    {
      id: 'cl_excepcion_5dias',
      label: 'Citación para oponer excepciones dentro del término de 5 días (art. 540 y 542 CPCCN)',
      checked: true,
    },
    {
      id: 'cl_constituir_dom',
      label: 'Constituir domicilio dentro del radio del juzgado en 5 días bajo apercibimiento de tenerlo por constituido en los estrados (art. 542 CPCCN)',
      checked: true,
    },
    {
      id: 'cl_copias',
      label: 'Acompañar copias: A) Poder Judicial; B) Escrito de demanda; C) Documental firmadas y selladas',
      checked: true,
    },
    {
      id: 'cl_inhabiles',
      label: 'Habilitación de días y horas inhábiles, sin necesidad de petición previa',
      checked: false,
    },
    {
      id: 'cl_brpa',
      label: 'Bajo responsabilidad de la parte actora (BRPA)',
      checked: false,
    },
    {
      id: 'cl_nueva_sin_peticion',
      label: 'En caso de domicilio frustrado y el peticionante entiende que el requerido vive allí: librar nueva cédula o mandamiento BRPA sin petición previa (art. 34 inc. 5 CPr)',
      checked: false,
    },
  ],

  oficio: [
    {
      id: 'cl_sueldo',
      label: 'Restricción cuenta sueldo: no trabar embargo sobre saldo de cuenta sueldo hasta 3 veces el promedio de los últimos 6 meses (art. 147 Ley 20.744 mod. art. 168 Dec. 27/2018)',
      checked: true,
    },
    {
      id: 'cl_deposito',
      label: 'Las sumas embargadas deberán depositarse en el Banco Ciudad de Buenos Aires – Sucursal Tribunales, a la orden del suscripto y como pertenecientes al presente juicio',
      checked: true,
    },
    {
      id: 'cl_deox',
      label: 'Para entidades bancarias: comunicar mediante DEOX por Secretaría',
      checked: false,
    },
    {
      id: 'cl_mercadopago',
      label: 'Queda a cargo de la parte interesada el diligenciamiento del oficio dirigido a Mercado Pago S.A.',
      checked: false,
    },
    {
      id: 'cl_brpa_oficio',
      label: 'Bajo responsabilidad de la parte actora (BRPA)',
      checked: false,
    },
  ],

  escrito: [
    {
      id: 'cl_costas',
      label: 'Con costas a la contraria',
      checked: false,
    },
    {
      id: 'cl_traslado',
      label: 'Solicitar que se corra traslado a la parte contraria por el plazo de ley',
      checked: false,
    },
    {
      id: 'cl_reserva_federal',
      label: 'Con expresa reserva de plantear cuestiones federales (art. 14 Ley 48)',
      checked: false,
    },
    {
      id: 'cl_urgente',
      label: 'Carácter urgente / medida cautelar',
      checked: false,
    },
  ],
};

// ═══════════════════════════════════════
// PROMPTS DEL SISTEMA POR TIPO
// ═══════════════════════════════════════

const SYSTEM_PROMPTS = {
  mandamiento: `Sos un abogado litigante experto en el Fuero Comercial de la Nación Argentina con más de 20 años de experiencia. Redactás mandamientos judiciales con lenguaje forense preciso.

El formato correcto de un MANDAMIENTO es:
1. Encabezado: "MANDAMIENTO DE [TIPO] / [SUBTÍTULO SI CORRESPONDE]"
2. Cuerpo en párrafo continuo dirigido al oficial de justicia: "El Señor Oficial de Justicia de la zona que corresponda se constituirá en el domicilio de [DEMANDADO], [DNI], sito en [DOMICILIO], y le intimará [BRPA si corresponde] para que dé y pague en el acto la suma de [MONTO EN LETRAS EN MAYÚSCULAS] ([MONTO EN NÚMEROS]), con más la suma de [INTERESES EN LETRAS EN MAYÚSCULAS] ([INTERESES EN NÚMEROS]), estimada provisoriamente en concepto de intereses y costas, que le reclama [ACTORA], en autos caratulados: [EXPEDIENTE], que tramitan por ante este [JUZGADO], a cargo del/la [JUEZ], [SECRETARÍA] a cargo del/la [SECRETARIO], con sede en [DIRECCIÓN]."
3. Transcripción del auto: "El auto que así lo dispone es del siguiente tenor: '[TEXTO DEL AUTO]… FDO: [JUEZ]'"
4. Apercibimientos numerados (1, 2, ...) según cláusulas activas
5. Mención de copias si corresponde
6. Cierre: "DADO, Sellado y Firmado en la Ciudad de Buenos Aires, a los ___ días del mes de __________ de 202__."`,

  oficio: `Sos un abogado litigante experto en el Fuero Comercial de la Nación Argentina. Redactás oficios judiciales con lenguaje forense preciso.

El formato correcto de un OFICIO es:
1. Encabezado: "OFICIO"
2. Lugar y fecha: "Ciudad de Buenos Aires, ___ de __________ de 202__.-"
3. Destinatario: "A [DESTINATARIO], / S./D.-"
4. Saludo y carátula: "Tengo el agrado de dirigirme a Ud. en los autos: [EXPEDIENTE], que tramitan por ante este [JUZGADO], a cargo del/la [JUEZ], [SECRETARÍA] a cargo del/la [SECRETARIO], con sede en [DIRECCIÓN], en los que se ha dispuesto librar el presente a fin de solicitarle se sirva disponer lo necesario para que [OBJETO DEL OFICIO]."
5. Montos en letras y números, datos del demandado
6. Transcripción del auto pertinente entre comillas
7. Cláusulas especiales (cuenta sueldo si aplica, etc.)
8. Autorizados: "Se encuentran autorizados a diligenciar este oficio, indistintamente, [LISTA DE AUTORIZADOS]."`,

  escrito: `Sos un abogado litigante experto en el Fuero Comercial de la Nación Argentina. Redactás escritos procesales con lenguaje forense preciso.

El formato correcto de un ESCRITO PROCESAL es:
1. Encabezado con juzgado y secretaría
2. Presentación: "[NOMBRE DEL LETRADO], en autos [EXPEDIENTE], a V.S. me presento y respetuosamente digo:"
3. Objeto del escrito claramente identificado
4. Desarrollo técnico-jurídico con fundamentos normativos
5. Petitorio: "Por todo lo expuesto, a V.S. solicito: [PETICIÓN CONCRETA]"
6. Cláusulas adicionales según corresponda
7. Cierre: "Proveer de conformidad / Será justicia."`,
};
