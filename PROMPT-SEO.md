# PROMPT PARA CLAUDE CODE — Implementación SEO de aqualabpro.store

> **Cómo usar este archivo:** guárdalo en la raíz de tu repositorio como
> `PROMPT-SEO.md`. Abre el repo en VS Code, abre Claude y escríbele:
>
> `Lee PROMPT-SEO.md completo y ejecuta la FASE 0. No avances a la FASE 1 hasta que yo confirme.`
>
> Trabaja fase por fase. Si le pides todo de golpe va a inventar datos y a
> perder precisión en las últimas páginas.

---

## 1. CONTEXTO DEL PROYECTO

Soy ingeniero químico y dueño de **AquaLab Pro**, un laboratorio de análisis de agua,
suelos y minerales en Piura, Perú, en etapa temprana de operación. El sitio actual es
estático, alojado en **GitHub Pages** con dominio propio, y hoy es una sola página con
navegación por anclas (`#servicios`).

- Dominio canónico: `https://www.aqualabpro.store/` (con `www`, con `https`)
- Repositorio: este mismo, desplegado por GitHub Pages
- El archivo `CNAME` ya existe y el 301 desde `flavioagusto.github.io/aqualab-pro/` **ya funciona** — no lo toques
- Stack: HTML + CSS estático. **No introduzcas frameworks, build steps, npm, ni generadores de sitios.** Si crees que hace falta uno, dímelo y lo discutimos; no lo instales.

**Objetivo:** pasar de una página a una arquitectura de 13 URLs indexables que
posicione en búsquedas locales de cola larga en Piura, con schema markup válido y
sin duplicación de contenido.

---

## 2. REGLAS ABSOLUTAS — LÉELAS ANTES DE ESCRIBIR CÓDIGO

Estas reglas tienen prioridad sobre cualquier otra instrucción de este documento.

### 2.1 NUNCA inventes datos técnicos ni comerciales

Este es el punto más importante del prompt. Mis informes tienen valor legal ante
DIGESA, ANA y OEFA. Un método analítico o un límite normativo inventado en la web
me destruye la credibilidad profesional.

**Está prohibido que generes, completes o "estimes":**

| Dato | Qué hacer si falta |
|---|---|
| Códigos de método analítico (SMEWW, NTP, EPA, ASTM) | Dejar `[[MÉTODO — CONFIRMAR]]` |
| Límites máximos permisibles de cualquier norma | Dejar `[[LMP — CONFIRMAR]]` |
| Precios en soles | Dejar `[[PRECIO — CONFIRMAR]]` |
| Plazos de entrega en días | Dejar `[[PLAZO — CONFIRMAR]]` |
| Dirección física, calle, número | Dejar `[[DIRECCIÓN — CONFIRMAR]]` |
| Coordenadas geográficas | Dejar `[[LAT]]` / `[[LON]]` |
| Mi nombre, colegiatura CIP, títulos | Dejar `[[NOMBRE]]`, `[[CIP]]` |
| URLs de redes sociales | Dejar `[[URL YOUTUBE]]` etc. |
| Número de años de experiencia | Omitir la frase completa |
| Cantidad de clientes, ensayos realizados, certificaciones | Omitir la frase completa |

Cuando termines cada fase, **lista todos los placeholders que dejaste** agrupados por
archivo, para que yo los complete. No los rellenes con valores plausibles.

### 2.2 Cero reclamos de acreditación

El sitio actual dice **"Laboratorio certificado bajo normas ISO 17025 y ISO 9001"**.
**Es falso y hay que eliminarlo de todo el sitio.** Todavía no tengo la acreditación
INACAL.

Redacción aprobada y única permitida:

> Laboratorio en proceso de acreditación ISO/IEC 17025 ante INACAL. Los ensayos que
> requieren acreditación se derivan a laboratorios acreditados, identificados de forma
> visible en el informe.

No escribas "certificado", "acreditado", "avalado", "homologado", ni variantes,
referidas a AquaLab Pro. Tampoco en `meta` tags, `alt` de imágenes, ni JSON-LD.

Búsca y elimina también: "Certificaciones Internacionales", "años de experiencia",
"Líderes en servicios ambientales", "resultados en tiempo récord".

### 2.3 Nada de contenido duplicado entre páginas

Las páginas de servicio comparten estructura pero **no texto**. Si dos páginas
terminan con párrafos casi idénticos, Google las clasifica como *doorway pages* y las
filtra del índice. Si al escribir una página te das cuenta de que no tienes contenido
sustancialmente distinto que decir, **detente y avísame** — la fusionamos con otra en
lugar de rellenar.

### 2.4 No toques lo que funciona

- No modifiques `CNAME`
- No cambies el color de marca `#4f46e5`
- No rediseñes el header ni el footer existentes; reutilízalos en las páginas nuevas
- No borres el `index.html` actual: modifícalo

---

## 3. FASE 0 — AUDITORÍA (hacer primero, sin escribir nada)

Antes de modificar archivos:

1. Lista la estructura completa del repositorio.
2. Muéstrame el `<head>` actual de `index.html`.
3. Confirma si existen: `CNAME`, `sitemap.xml`, `robots.txt`, `404.html`, `favicon.ico`.
4. Localiza y lista, con número de línea, **todas** las apariciones de:
   - `flavioagusto.github.io`
   - `ISO 17025`, `ISO 9001`, `certificad`
   - `años de experiencia`
   - `czfayh@gmail.com`
5. Verifica si existe algún `<link rel="canonical">`.
6. Dime si hay CSS en archivo aparte o embebido en el HTML.

**Entrega un informe y detente.** No hagas cambios en la Fase 0.

---

## 4. FASE 1 — CORREGIR LA HOME

Objetivo: resolver la duplicación y quitar los reclamos falsos. Es la fase de mayor
impacto y la más rápida.

### 4.1 En el `<head>` de `index.html`

Aplica exactamente estos cambios:

- **Agrega** `<link rel="canonical" href="https://www.aqualabpro.store/">`
- **Cambia** `og:url` de `https://flavioagusto.github.io/aqualab-pro` a `https://www.aqualabpro.store/`
- **Cambia** `og:image` de `https://flavioagusto.github.io/aqualab-pro/logo.png` a `https://www.aqualabpro.store/og-aqualabpro.jpg`
- **Elimina** `<meta name="keywords">` por completo (Google la ignora desde 2009 y expone la estrategia)
- **Agrega** `og:image:width` 1200, `og:image:height` 630, `og:image:alt`, `og:site_name`, `og:locale` = `es_PE`
- **Cambia** `<meta name="robots">` a `index, follow, max-image-preview:large`
- **Agrega** `<meta name="geo.region" content="PE-PIU">` y `geo.placename` = `Piura`
- **Reemplaza** el `<title>` por: `Laboratorio de Análisis de Agua y Suelos en Piura | AquaLab Pro`
- **Reemplaza** la `meta description` por: `Laboratorio en Piura: análisis de agua potable y de pozo (DS 031-2010-SA), efluentes VMA, suelos, minerales y monitoreo ambiental. Cotiza hoy.`
- **Verifica** que `<html lang="es-PE">`

### 4.2 En el `<body>` de `index.html`

- Elimina el bloque **"Certificaciones Internacionales / Laboratorio certificado bajo normas ISO 17025 y ISO 9001"** y sustitúyelo por la redacción aprobada del punto 2.2.
- Elimina **"Con años de experiencia en el sector ambiental"** y **"Líderes en servicios ambientales"**.
- Cambia el email `czfayh@gmail.com` por `contacto@aqualabpro.store` en todas sus apariciones. Déjame un comentario HTML avisando que debo crear ese buzón antes de publicar.
- El enlace de "Ubicación" apunta hoy a `google.com/maps/place/Piura,+Peru/`. Cámbialo a mi ficha real:
  `https://www.google.com/maps/place/?q=place_id:ChIJOQVsiHQRSpARb2HO6vi26EE`
- Los tres enlaces de redes sociales apuntan a `#`. **Elimínalos** hasta que yo te dé las URLs reales. Un enlace roto es peor que no tenerlo.
- El logo se llama `Clicons2.jpg` y su `alt` dice "Clicons Logo". Renombra el archivo a `logo-aqualabpro-laboratorio-piura.jpg`, actualiza todas las referencias, y pon `alt="AquaLab Pro — laboratorio de análisis de agua y suelos en Piura"`.
- Convierte los enlaces de ancla del menú de servicios (`#servicios`) en enlaces a las URLs reales que crearemos en la Fase 2. Por ahora déjalos apuntando a `/servicios/`.
- Añade un `<h1>` único y descriptivo. El actual dice "Servicios Ambientales de Excelencia", que no contiene ni el servicio ni la ciudad. Cámbialo a: `Laboratorio de análisis de agua, suelos y minerales en Piura`.

### 4.3 JSON-LD en la home

Inserta al final del `<head>` dos bloques `<script type="application/ld+json">`:

**Bloque A — `LocalBusiness`:**
- `@type`: `["LocalBusiness", "ProfessionalService"]`
- `@id`: `https://www.aqualabpro.store/#organizacion`
- `additionalType`: `https://www.wikidata.org/wiki/Q483242`
- `name`: `AquaLab Pro` (sin keywords añadidas)
- `telephone`: `+51996331447`
- `email`: `contacto@aqualabpro.store`
- `address` (`PostalAddress`): `addressLocality` Piura, `addressRegion` Piura, `postalCode` 20001, `addressCountry` PE, y `streetAddress` como placeholder
- `geo`: placeholders
- `hasMap`: el enlace con `place_id` de arriba
- `openingHoursSpecification`: lunes a sábado, 08:00–18:00
- `priceRange`, `currenciesAccepted` PEN, `paymentAccepted`
- `founder` (`Person`) con placeholders y `alumniOf`: Universidad Nacional de Piura
- `areaServed`: Piura, Sullana, Paita, Talara, Sechura, Catacaos, y `AdministrativeArea` Región Piura
- `knowsAbout`: DS N° 031-2010-SA, VMA, DS N° 004-2017-MINAM, NTP 339.152, Standard Methods, monitoreo ambiental, tratamiento de agua potable, ensayo de minerales
- `hasOfferCatalog` con los 9 servicios y sus URLs de la Fase 2
- `sameAs` con placeholders
- **NO incluyas** `aggregateRating` ni `review`. Tengo 0 reseñas; inventarlas es motivo de penalización manual.

**Bloque B — `WebSite`** con `@id` `#website`, `inLanguage` `es-PE` y `publisher` referenciando `#organizacion`.

### 4.4 Descripción larga aprobada

Úsala en el campo `description` del JSON-LD, tal cual, sin reescribirla:

> Laboratorio de análisis fisicoquímicos de agua, suelos y minerales en Piura. Análisis de agua potable y de pozo según DS N° 031-2010-SA, efluentes para cumplimiento VMA, ley de minerales y concentrados, sales solubles, cloruros y sulfatos en suelos según NTP, y monitoreo ambiental para expedientes ante OEFA, ANA y DIGESA. Diseñamos e implementamos plantas de tratamiento de agua potable: remoción de hierro, manganeso y dureza. Atendemos agroexportadoras, mineras, municipalidades, constructoras y usuarios particulares en Piura, Sullana, Paita, Talara y Bayóvar. En proceso de acreditación ISO/IEC 17025 ante INACAL; los ensayos que la requieren se derivan a laboratorios acreditados, identificados en el informe.

### 4.5 Validación de la Fase 1

Antes de decirme que terminaste:
- Valida que cada bloque JSON-LD sea JSON sintácticamente correcto (parséalo, no lo asumas)
- Confirma que ya no queda ninguna referencia a `flavioagusto.github.io` en el código
- Confirma que ya no queda ninguna afirmación de certificación
- Lista los placeholders pendientes

**Detente y espera mi confirmación.**

---

## 5. FASE 2 — ARQUITECTURA DE PÁGINAS

Crea esta estructura de carpetas, cada una con su `index.html`:

```
/servicios/                                          Hub
/servicios/analisis-de-agua-potable-piura/
/servicios/analisis-de-agua-de-pozo-piura/
/servicios/analisis-de-agua-residual-vma-piura/
/servicios/analisis-de-suelos-agricolas-piura/
/servicios/sales-solubles-en-suelos-piura/
/servicios/analisis-de-minerales-piura/
/servicios/monitoreo-ambiental-piura/
/servicios/plantas-de-tratamiento-de-agua-potable/
/servicios/muestreo-y-cadena-de-custodia-piura/
/precios/
/nosotros/
/contacto/
```

Reglas de URL: minúsculas, guiones, sin tildes ni `ñ`, con barra final.

### 5.1 Orden de creación

**No las hagas todas de una vez.** En este orden, deteniéndote después de cada una
para que yo revise:

1. `/servicios/` (el hub)
2. `/servicios/analisis-de-agua-de-pozo-piura/` — será la plantilla de referencia
3. `/servicios/analisis-de-agua-residual-vma-piura/`
4. `/nosotros/`
5. `/contacto/`
6. Las 6 páginas de servicio restantes, una por una
7. `/precios/` (última — necesito definir tarifas antes)

### 5.2 Estructura obligatoria de cada página de servicio

En este orden:

1. `<nav>` de migas de pan visible: Inicio / Servicios / [Servicio]
2. `<h1>` único, con el servicio y "Piura"
3. Párrafo de entrada con la norma de referencia en negrita
4. Bloque de datos clave: norma, plazo, precio desde, si incluye muestreo
5. Dos CTA: WhatsApp (`https://wa.me/51996331447?text=` con mensaje pre-cargado y URL-encoded) y enlace a `/contacto/`
6. Tabla de parámetros: parámetro / método / límite normativo — con placeholders donde no tengo el dato confirmado
7. Aviso destacado con la redacción aprobada sobre el estado de acreditación
8. Sección "Por qué estos parámetros" — contenido técnico específico de Piura, distinto en cada página
9. Sección "Cómo funciona" — proceso en 4 pasos
10. 4 preguntas frecuentes en `<details>`, con texto **visible**
11. Bloque "Servicios relacionados" con 3–4 enlaces internos
12. CTA de cierre

### 5.3 JSON-LD de cada página de servicio

Tres bloques por página:

- **`Service`**: `name`, `serviceType`, `description`, `url`, `provider` referenciando `@id` `https://www.aqualabpro.store/#organizacion`, `areaServed`, `audience`, `offers` con `priceCurrency` PEN y precio en placeholder, y `termsOfService` con la nota de subcontratación.
- **`BreadcrumbList`**: 3 niveles. El último ítem sin `item`.
- **`FAQPage`**: exactamente las 4 preguntas de los `<details>`.

**Regla crítica del FAQPage:** cada `Question` y su `acceptedAnswer` deben existir
**palabra por palabra** en el HTML visible de la página. Un `FAQPage` que declara
texto que el usuario no ve es motivo de acción manual de Google. Después de generar
cada página, verifica programáticamente que el texto de cada respuesta del schema
aparece en el HTML renderizado.

### 5.4 Requisitos de `/nosotros/`

Esta página sostiene la credibilidad de todas las demás, porque Google evalúa quién
firma el informe técnico. Debe incluir, con placeholders: mi nombre completo, título
de ingeniero químico, universidad, número de colegiatura CIP, foto real, y el estado
exacto y honesto del proceso de acreditación. Añade JSON-LD `Person` vinculado a la
organización con `worksFor`.

### 5.5 Requisitos de `/contacto/`

NAP completo (nombre, dirección, teléfono) **idéntico carácter por carácter** al de mi
ficha de Google Business Profile. Mapa embebido con el `place_id`. Sin formulario que
requiera backend: usa `mailto:` o enlace a WhatsApp, porque GitHub Pages no procesa
formularios. Si sugieres un servicio de formularios de terceros, dímelo antes de
integrarlo.

### 5.6 Requisitos de `/servicios/` (hub)

Tarjetas con enlace a cada servicio, con **texto ancla descriptivo**. Prohibido usar
"Ver más", "Leer más" o "Saber más" como texto del enlace: el ancla debe decir
`Análisis de agua de pozo en Piura`. Sin JSON-LD `Service` propio; usa `CollectionPage`.

---

## 6. FASE 3 — TÉCNICA

1. **`sitemap.xml`** en la raíz. Incluye **solo** las URLs realmente publicadas y que
   devuelven 200. Una URL en el sitemap que da 404 es señal negativa.
2. **`robots.txt`** en la raíz, con `Allow: /` y la línea `Sitemap:`.
3. **`404.html`** en la raíz, con enlaces a la home y a `/servicios/`.
4. **CSS compartido**: extrae los estilos a `/styles.css` y referéncialo desde todas
   las páginas. No dupliques CSS en cada archivo.
5. **Imágenes**: renombra todos los archivos a nombres descriptivos con guiones y
   escribe `alt` real en cada una. Añade `loading="lazy"` a las que no estén en el
   primer viewport, y `width`/`height` explícitos para evitar salto de layout.
6. **Accesibilidad**: foco visible en teclado, contraste suficiente, un solo `<h1>` por
   página, jerarquía de encabezados sin saltos, `prefers-reduced-motion` respetado.
7. **Rendimiento**: sin librerías JS externas si no son estrictamente necesarias.
   Este sitio no necesita jQuery ni frameworks de animación.

---

## 7. VALIDACIÓN FINAL — ejecútala y muéstrame el resultado

Al terminar la Fase 3, corre estas verificaciones y dame un informe:

1. **JSON-LD**: parsea todos los bloques de todos los archivos. Reporta el `@type` de cada uno y cualquier error de sintaxis.
2. **Referencias `@id`**: confirma que cada `provider` de las páginas de servicio apunta a un `@id` que existe realmente en la home.
3. **FAQPage vs HTML**: por cada página, verifica que las 4 respuestas del schema aparecen literalmente en el HTML visible.
4. **Enlaces internos**: lista todos los `href` internos y marca los que apuntan a rutas que no existen en el repo.
5. **Canonical**: confirma que cada página tiene un único canonical y que apunta a su propia URL, no a la home.
6. **Titles y descriptions**: tabla con URL, longitud del title y longitud de la description. Marca los que pasen de 60 y 155 caracteres respectivamente. Marca cualquier title duplicado.
7. **Términos prohibidos**: busca en todo el repo `certificad`, `acreditad` (referido a nosotros), `años de experiencia`, `github.io`, `czfayh@gmail`. El resultado debe ser cero.
8. **Sitemap**: valida el XML y confirma que cada `<loc>` corresponde a un archivo existente.
9. **Placeholders**: lista final agrupada por archivo, de todo lo que debo completar.

---

## 8. CÓMO QUIERO QUE TRABAJES

- **Fase por fase.** Detente al final de cada fase y espera mi confirmación.
- **Antes de crear cada página de servicio**, muéstrame el `<h1>`, el title, la description y las 4 preguntas del FAQ que propones. Los apruebo y recién entonces escribes el archivo.
- **Un commit por fase**, con mensaje descriptivo en español.
- Si una instrucción de este documento te parece técnicamente equivocada o
  contraproducente, **dímelo y discútelo conmigo** antes de ejecutarla. Prefiero
  corregir el plan que ejecutar algo mal.
- Si te falta un dato para completar algo, **pregúntame**. No lo estimes.
- Escribe el contenido en español de Perú, técnico y directo, sin lenguaje de marketing
  vacío. Nada de "soluciones integrales", "excelencia", "líderes en el sector",
  "compromiso con la calidad".

---

## 9. DATOS CONFIRMADOS QUE PUEDES USAR

Estos sí son reales. Todo lo que no esté en esta lista es placeholder.

| Dato | Valor |
|---|---|
| Nombre comercial | AquaLab Pro |
| Dominio canónico | `https://www.aqualabpro.store/` |
| Teléfono / WhatsApp | `+51 996 331 447` |
| Email a usar | `contacto@aqualabpro.store` (pendiente de crear) |
| Ciudad / región | Piura, Piura, Perú |
| Código postal | 20001 |
| Horario | Lunes a sábado, 08:00–18:00. Domingo cerrado |
| Google Place ID | `ChIJOQVsiHQRSpARb2HO6vi26EE` |
| Zonas atendidas | Piura, Sullana, Paita, Talara, Sechura, Catacaos |
| Universidad | Universidad Nacional de Piura |
| Color de marca | `#4f46e5` |
| Idioma | `es-PE` |
| Estado de acreditación | En proceso ante INACAL. **No acreditado.** |

---

## 10. EMPIEZA AQUÍ

Ejecuta la **FASE 0** y entrégame el informe de auditoría. No modifiques ningún
archivo todavía.
