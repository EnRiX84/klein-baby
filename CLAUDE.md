# Klein Baby - Sito Web

## Informazioni Progetto
- **Nome**: Klein Baby di Seggio Rosaria
- **Tipo**: Sito vetrina per negozio di abbigliamento bambini/ragazzi 0-16 anni
- **Sede**: Via Reg. Margherita, 125 - 92023 Campobello di Licata (AG)
- **Telefono/WhatsApp**: 338 171 0933
- **Repository**: https://github.com/EnRiX84/klein-baby
- **Sito live**: https://www.kleinbaby.it/
- **Dominio**: www.kleinbaby.it (custom domain su GitHub Pages)
- **URL alternativo**: https://enrix84.github.io/klein-baby/ (redirect automatico)
- **Progetto di riferimento**: C:\workspace\grandi_firme\ (stesse funzionalita, palette diversa)

## Stack Tecnico
- **Frontend**: HTML5, CSS3 (vanilla), JavaScript (vanilla)
- **Font**: Fredoka (heading) + Nunito (body) via Google Fonts
- **Icone**: Font Awesome 6.5.1 via CDN
- **Hosting**: GitHub Pages con deploy automatico via GitHub Actions
- **Pagamenti Gift Card**: Stripe (API endpoint: `https://api.kleinbaby.it/api/v1/public/gift-cards`)
- **Branch di deploy**: `master`

## Palette Colori
Palette vivace e multicolore ispirata al branding reale del negozio: insegna neon (rosa+blu), vetrine con fiori/farfalle colorati, sacchetto spesa con lettere arcobaleno.

**Colori primari (dall'insegna neon):**
- **Pink**: #FF1493 (rosa vivace, "Klein")
- **Pink Light**: #FF69B4
- **Pink Dark**: #D4006A
- **Blue**: #1E90FF (blu brillante, "Baby")
- **Blue Light**: #5BB5FF
- **Blue Dark**: #0066CC

**Colori accento (dalle decorazioni del negozio):**
- **Green**: #4CAF50 / Light: #81C784
- **Orange**: #FF9800 / Light: #FFB74D
- **Yellow**: #FFD600 / Light: #FFF176
- **Purple**: #AB47BC / Light: #CE93D8
- **Red**: #EF5350

**Sfondi:**
- **Dark**: #1a1a2e
- **Off-white**: #FFFDF7
- **Cream**: #FFF8F0

**Gradienti principali:**
- `--rainbow-gradient`: pink -> orange -> yellow -> green -> blue -> purple
- `--shine`: arcobaleno animato con shimmer per titoli e promozioni
- `--primary-gradient`: sfumatura rosa per bottoni principali
- `--accent-gradient`: sfumatura blu per bottoni secondari

## Struttura File

```
kleinbaby/
├── index.html              # Pagina principale (tutte le sezioni)
├── gift-card.html          # Pagina acquisto Gift Card con Stripe
├── cookie-policy.html      # Cookie Policy (GDPR)
├── privacy-policy.html     # Privacy Policy (GDPR)
├── favicon.svg             # Favicon SVG (lettere "KB")
├── .gitignore
├── css/
│   ├── style.css           # Stile principale (~1700 righe)
│   ├── gift-card.css       # Stili pagina Gift Card
│   └── cookie-consent.css  # Stili banner cookie e gear icon
├── js/
│   ├── main.js             # JS principale (animazioni, nav, form, particelle)
│   └── cookie-consent.js   # Gestione consenso cookie e caricamento mappe
├── images/
│   ├── insegnasulmuro.jpg  # Foto insegna negozio (usata nell'hero)
│   ├── arredointerno1.jpg  # Foto interno negozio (sezione Chi Siamo)
│   ├── arredointerno2.jpg  # Foto interno negozio (sezione Brand)
│   └── sacchettospesa.jpg  # Foto sacchetto spesa con logo
└── .github/
    └── workflows/
        └── deploy.yml      # GitHub Actions per deploy su GitHub Pages
```

## Sezioni della Homepage (index.html)

1. **Preloader** - Animazione logo "KB" con shimmer gradient
2. **Navigation** - Navbar fissa con effetto trasparente->solido allo scroll, menu hamburger mobile
3. **Hero** - Sfondo scuro con particelle colorate (confetti), foto insegna, CTA
4. **Chi Siamo** - Testo su Seggio Rosaria + foto interno negozio + contatori animati (20+ brand, 1 punto vendita, 0-16 anni)
5. **Brand** - Marquee scorrevole con nomi brand (Mayoral, Chicco, Liu Jo, Guess Kids, Nike, ecc.) + foto negozio
6. **Collezioni** - 4 card (Neonati 0-2, Bambini 3-8, Ragazzi 9-16, Cerimonia) con icone colorate
7. **Promozioni** - Sezione saldi con prezzi e shimmer animato
8. **Gift Card** - Preview card + link alla pagina dedicata
9. **Negozio** - Indirizzo, orari (Lun-Sab 9:15-13:00 / 16:30-20:15), telefono, mappa Google (caricata solo con consenso cookie)
10. **News** - 3 card con novita (saldi, collezione invernale, nuovi arrivi neonato)
11. **Contatti** - Info contatto + form (redirect a WhatsApp come fallback senza backend)
12. **Footer** - Logo, link rapidi, info, orari, social

## Funzionalita JavaScript (main.js)

- **Preloader**: si nasconde dopo 800ms dal caricamento
- **Navbar scroll**: aggiunge classe `scrolled` quando si scrolla oltre 50px
- **Menu mobile**: toggle hamburger con overlay a destra
- **Active nav link**: IntersectionObserver evidenzia il link della sezione visibile
- **AOS (Animate On Scroll)**: implementazione leggera custom con IntersectionObserver e data-aos attributes (fade-up, fade-down, fade-left, fade-right, zoom-in)
- **Contatori animati**: animazione incrementale dei numeri nella sezione Chi Siamo
- **Particelle hero**: 45 particelle confetti in 7 colori (pink, blue, purple, yellow, green, orange, red)
- **Back to top**: bottone visibile dopo 500px di scroll
- **Smooth scroll**: per tutti i link ancora (#)
- **Form contatto**: costruisce messaggio WhatsApp e apre wa.me
- **Parallax promo**: effetto parallasse sull'overlay della sezione promozioni

## Cookie Consent (cookie-consent.js)

- **Storage key**: `kb_cookie_consent` in localStorage
- **Flusso**: prima visita mostra banner -> scelta utente (accetta tutti / solo necessari) -> salva preferenza -> mostra gear icon per modificare
- **Google Maps**: iframe caricato solo dopo consenso. Placeholder con pulsante "Accetta e mostra mappa" come alternativa
- **Gear icon**: icona cookie-bite in basso a destra per riaprire banner

## Gift Card (gift-card.html)

- **Flusso**: scegli importo (25/50/75/100 o personalizzato 10-500) -> inserisci dati acquirente e destinatario -> messaggio opzionale (max 500 char) -> pagamento Stripe
- **Preview live**: la card si aggiorna in tempo reale mentre l'utente compila
- **API**: POST a `{API_BASE}/checkout-session` -> redirect a Stripe -> ritorno con `?success=true&session_id=xxx` o `?cancelled=true`
- **Stato post-pagamento**: polling su `{API_BASE}/status/{sessionId}` (max 10 tentativi, ogni 2 secondi)

## Deploy

- **Workflow**: `.github/workflows/deploy.yml` usa `actions/deploy-pages@v4`
- **Trigger**: push su branch `master` o workflow_dispatch manuale
- **Nota**: i path dei favicon sono relativi (non assoluti) per compatibilita con GitHub Pages subdirectory

## Cronologia Sessioni

### Sessione 1 (23 feb 2026)
- Creazione completa del sito partendo da zero, prendendo come riferimento il progetto `grandi_firme`
- Analisi foto negozio (insegnasulmuro.jpg, arredointerno1.jpg, arredointerno2.jpg, sacchettospesa.jpg) per definire palette colori
- Creazione: index.html, gift-card.html, css/style.css, css/gift-card.css, css/cookie-consent.css, js/main.js, js/cookie-consent.js, favicon.svg, .gitignore, deploy.yml

### Sessione 2 (23 feb 2026)
- Creazione pagine mancanti: cookie-policy.html, privacy-policy.html (adattate da grandi_firme con dati Klein Baby)
- Aggiunta stili CSS mancanti: .policy-page, .policy-content, tabelle, .map-placeholder, .store-map iframe
- Fix workflow deploy: branch da "main" a "master"
- Inizializzazione repository git e pubblicazione su GitHub (EnRiX84/klein-baby)
- Abilitazione GitHub Pages via API (build_type: workflow)
- Fix path favicon: da assoluti (/favicon.ico) a relativi (favicon.ico) per compatibilita GitHub Pages subdirectory
- Sito live su: https://enrix84.github.io/klein-baby/

### Sessione 3 (23 feb 2026)
- Restyling completo della palette colori: da monocromo (rosa+ciano) a multicolore vivace (arcobaleno)
- Analisi approfondita delle foto del negozio reale per estrarre i colori giusti:
  - insegnasulmuro.jpg (neon): rosa "Klein" + blu "Baby"
  - arredointerno1.jpg (vetrina): fiori arancioni/rosa, farfalle colorate, arcobaleno
  - arredointerno2.jpg (porta): albero colorato con rosa/verde/giallo/viola
  - sacchettospesa.jpg: logo con ogni lettera di colore diverso (stile arcobaleno)
- Aggiornamento completo CSS variables: nuovi colori primari (pink #FF1493, blue #1E90FF) e accenti (green, orange, yellow, purple, red)
- Nuovi gradienti: --rainbow-gradient, --rainbow-gradient-h, --shine (arcobaleno animato)
- Aggiornato hero: "0-16 Anni" con effetto shimmer arcobaleno (.rainbow-text), title accent con rainbow animato
- Particelle hero: da 5 a 7 colori, da 35 a 45 particelle
- Contatori Chi Siamo: ogni numero un colore diverso (arancione, blu, verde)
- Card collezioni: neonati=rosa, bambini=blu, ragazzi=verde, cerimonia=arancione
- Prezzi promozioni: ogni fascia prezzo un colore diverso con bordi colorati
- News cards: icone arancione, blu, verde (al posto di rosa, cyan, viola)
- Bordi e hover effects: da rosa monotono a rainbow shadow multicolore
- Form contatto: focus blu invece di rosa
- Favicon SVG: bordo arcobaleno (5 colori), K rosa, B blu
- Cookie consent CSS: aggiornati colori da #E91E8C/#00BCD4 a #FF1493/#1E90FF
- Gift card CSS: aggiornati tutti i riferimenti colore alla nuova palette
- Aggiornata immagine logo ritagliata (insegnasulmuro.jpg) e pushata

### Sessione 4 (25 feb 2026)
- Implementato sistema settings per-tenant in StockFlow ERP (repo: C:\workspace\stockflowERP)
- Backend: validazione Zod per settings (smtp + branding hex), merge intelligente in updateTenant (Prisma.JsonNull), branding dinamico in PDF e email gift card
- Frontend: interfacce TS per settings, sezione Configurazione in SATenantDetailPage con toggle SMTP/branding, color picker, anteprima live card
- Configurato branding Klein Baby nel DB: rosa #FF1493, blu #1E90FF, sfondo #1a1a2e, testo #FFFFFF, accento #FF69B4
- SMTP Klein Baby: noreply@kleinbaby.it via smtps.aruba.it
- Grandi Firme: SMTP + branding oro/nero configurati dall'utente via UI superadmin
- Rimosso fallback globale SMTP: senza settings → 503 "Servizio momentaneamente non disponibile"
- Fix domain resolver: aggiunto match `www.${baseDomain}` così `api.kleinbaby.it` risolve Klein Baby (DB ha `www.kleinbaby.it`)
- Fix impersonation: `impersonate()` reso async + await, la dashboard si carica correttamente senza refresh manuale
- Deploy: build locale + SCP + PM2 restart su Oracle Cloud VM (backend + frontend)
- Password rosaria@esempio.it resettata a admin123
- Aggiunto reset password per SUPERADMIN: endpoint PUT /superadmin/users/:userId/reset-password + UI con modale (icona chiave)
- Fix PDF gift card: da 3 pagine a 1 pagina (bottom margin 0, lineBreak:false, messaggio max 120 char, validità nella stessa pagina)

### Sessione 5 (26 feb 2026)
- **Stripe per-tenant** in StockFlow ERP (repo: C:\workspace\stockflowERP):
  - Validator Zod: aggiunto `stripeSettingsSchema` (secretKey + webhookSecret) in `server/src/validators/superadmin.ts`
  - Backend service: merge `stripe` in updateTenant come smtp/branding (`server/src/services/superadmin.ts`)
  - Gift card service: rimosso singleton globale Stripe, istanza creata al volo da `tenantInfo.stripe.secretKey` con fallback a config.stripe.secretKey; senza nessuno dei due → test mode (`server/src/services/giftCardPublic.ts`)
  - Webhook controller: try-all secrets - carica tutti i tenant con stripe configurato, prova ogni webhookSecret + fallback globale .env (`server/src/controllers/giftCardPublic.ts`)
  - Frontend types: aggiunta interfaccia `SAStripeSettings` + campo `stripe` in `SATenantSettings` (`client/src/api/superadmin.ts`)
  - Frontend UI: sezione "Stripe (Pagamenti)" con toggle on/off, campi Secret Key e Webhook Secret (password con toggle visibilita), icona CreditCard (`client/src/pages/superadmin/SATenantDetailPage.tsx`)
  - Deploy backend + frontend su Oracle Cloud VM, PM2 restart
  - Test verificati: gift card test mode OK, merge settings OK (Stripe non cancella SMTP/Branding), API update tenant OK
- **Upgrade piano Klein Baby**: da FREE a STARTER (1 negozio, 3 utenti, 500 prodotti) via API superadmin
- **Superadmin StockFlow**: email=superadmin@stockflow.it, password=admin123
- **Portfolio personale** (repo: C:\workspace\enricomariacaruso, sito: www.enricomariacaruso.it):
  - Aggiunto progetto "Klein Baby" con screenshot da www.kleinbaby.it e link al sito
  - Sostituito "Gestionale Magazzino" (mockup HTML) con "StockFlow ERP" con screenshot reale, due link (sito prodotto + app demo), descrizione aggiornata SaaS multi-tenant
  - Rimosso CSS mockup-gestionale non piu necessario
  - Screenshot catturati con Playwright (images/kleinbaby.png, images/stockflow-erp.png)
  - Commit e push su main → deploy automatico GitHub Pages
