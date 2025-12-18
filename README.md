# Leonardo Cosaro - Portfolio

Portfolio personale di Leonardo Cosaro, Backend Developer specializzato in Python.

## 🚀 Tecnologie Utilizzate

- **React 18** - UI Library
- **Vite** - Build Tool
- **TypeScript** - Type Safety
- **Tailwind CSS** - Styling
- **Framer Motion** - Animations
- **Three.js** - 3D Background
- **Resend** - Email Service
- **Lucide React** - Icons

## 📋 Prerequisiti

- Node.js 18+
- npm o yarn
- Account Resend (per l'invio email)

## 🛠️ Installazione

1. Clona il repository
```bash
git clone <repository-url>
cd miosito
```

2. Installa le dipendenze
```bash
npm install
```

3. Configura le variabili d'ambiente
```bash
cp .env.example .env.local
```

4. Modifica `.env.local` con la tua API key di Resend:
```
RESEND_API_KEY=your_resend_api_key_here
```

## 💻 Sviluppo Locale

Per sviluppare localmente con la funzionalità email, usa Vercel CLI:

```bash
# Installa Vercel CLI globalmente
npm install -g vercel

# Avvia il server di sviluppo con Vercel
vercel dev
```

In alternativa, per sviluppo frontend senza API:
```bash
npm run dev
```

## 🏗️ Build

Crea la build di produzione:

```bash
npm run build
```

I file ottimizzati saranno generati nella cartella `dist/`.

## 🌐 Deploy

### Deploy su Vercel (Raccomandato)

1. Installa Vercel CLI:
```bash
npm install -g vercel
```

2. Fai il login:
```bash
vercel login
```

3. Aggiungi la variabile d'ambiente su Vercel:
```bash
vercel env add RESEND_API_KEY
```
Incolla la tua API key di Resend quando richiesto.

4. Deploy:
```bash
vercel --prod
```

### Deploy manuale

1. Crea la build:
```bash
npm run build
```

2. Carica il contenuto della cartella `dist/` sul tuo server

3. Configura il tuo server per:
   - Servire i file statici da `dist/`
   - Inoltrare le richieste `/api/*` alla funzione serverless

## 📧 Configurazione Email

Il form di contatto usa **Resend** per l'invio delle email.

### Setup Resend:

1. Crea un account su [resend.com](https://resend.com)
2. Ottieni la tua API key da [resend.com/api-keys](https://resend.com/api-keys)
3. Aggiungi l'API key alle variabili d'ambiente:
   - Per sviluppo locale: file `.env.local`
   - Per produzione: Vercel Dashboard → Settings → Environment Variables

### Personalizzazione Email:

Modifica il file `api/send-email.js` per personalizzare:
- Email di destinazione (campo `to`)
- Email mittente (campo `from`) - richiede dominio verificato su Resend
- Template HTML dell'email

## 📁 Struttura del Progetto

```
miosito/
├── api/
│   └── send-email.js         # Serverless function per invio email
├── src/
│   ├── api/
│   │   └── base44Client.ts   # Mock API client
│   ├── components/
│   │   ├── home/             # Sezioni homepage
│   │   ├── three/            # Three.js components
│   │   └── ui/               # UI components
│   ├── pages/
│   │   └── Home.tsx          # Home page
│   ├── App.tsx               # App root
│   ├── Layout.jsx            # Layout wrapper
│   ├── main.tsx              # Entry point
│   └── index.css             # Global styles
├── dist/                     # Build output
├── public/                   # Static assets
├── index.html                # HTML template
├── vite.config.js           # Vite configuration
├── tailwind.config.js       # Tailwind configuration
├── vercel.json              # Vercel configuration
└── package.json             # Dependencies

```

## 🎨 Personalizzazione

### Colori
Modifica i colori nel file `tailwind.config.js` e `src/index.css`

### Contenuti
Aggiorna i contenuti nei componenti in `src/components/home/`:
- `HeroSection.tsx` - Hero banner
- `AboutSection.tsx` - Sezione Chi Sono
- `ProjectsSection.tsx` - Portfolio progetti
- `ContactSection.tsx` - Form contatti

### Background 3D
Personalizza l'animazione in `src/components/three/LiquidGlassBackground.tsx`

## 📝 Note

- **Sicurezza**: Non committare mai il file `.env.local` nel repository
- **Performance**: Il build è ottimizzato con code splitting automatico
- **SEO**: Meta tags configurati in `index.html` e `src/pages/Home.tsx`

## 📄 Licenza

© 2024 Leonardo Cosaro. Tutti i diritti riservati.

## 📧 Contatti

- Email: cosaroleoo@gmail.com
- GitHub: [@LeoC02](https://github.com/LeoC02)
- LinkedIn: [Leonardo Cosaro](https://www.linkedin.com/in/leonardo-cosaro/)
