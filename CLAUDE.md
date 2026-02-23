# Klein Baby - Sito Web

## Informazioni Progetto
- **Nome**: Klein Baby di Seggio Rosaria
- **Tipo**: Sito vetrina per negozio di abbigliamento bambini/ragazzi 0-16 anni
- **Sede**: Via Reg. Margherita, 125 - 92023 Campobello di Licata (AG)
- **Telefono/WhatsApp**: 338 171 0933
- **Repository**: https://github.com/EnRiX84/klein-baby
- **Sito live**: https://enrix84.github.io/klein-baby/
- **Progetto di riferimento**: C:\workspace\grandi_firme\ (stesse funzionalita, palette diversa)

## Stack Tecnico
- **Frontend**: HTML5, CSS3 (vanilla), JavaScript (vanilla)
- **Font**: Fredoka (heading) + Nunito (body) via Google Fonts
- **Icone**: Font Awesome 6.5.1 via CDN
- **Hosting**: GitHub Pages con deploy automatico via GitHub Actions
- **Pagamenti Gift Card**: Stripe (API endpoint: `https://api.kleinbaby.it/api/v1/public/gift-cards`)
- **Branch di deploy**: `master`

## Palette Colori
Derivata dalle foto dell'insegna reale del negozio (rosa/fucsia e ciano):
- **Pink**: #E91E8C (primario)
- **Pink Light**: #FF6EB4
- **Pink Dark**: #C2185B
- **Cyan**: #00BCD4 (accento)
- **Cyan Light**: #4DD0E1
- **Cyan Dark**: #0097A7
- **Dark (sfondo scuro)**: #1a1a2e
- **Off-white (sfondo chiaro)**: #fef9ff

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
- **Particelle hero**: 35 particelle confetti colorate (pink, cyan, purple, yellow, green)
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
