# 📦 Guida al Deployment

## Opzione 1: Deploy su Vercel (Raccomandato) ⭐

Vercel è la piattaforma ideale per questo progetto perché supporta nativamente le serverless functions necessarie per l'invio email.

### Setup Iniziale

1. **Installa Vercel CLI**
```bash
npm install -g vercel
```

2. **Login su Vercel**
```bash
vercel login
```

3. **Collega il progetto**
```bash
cd /Users/leonardo/work/miosito
vercel
```
Rispondi alle domande:
- Setup and deploy? → Yes
- Which scope? → Seleziona il tuo account
- Link to existing project? → No
- Project name? → leonardo-cosaro-portfolio (o il nome che preferisci)
- Directory? → `./` (premi Enter)
- Want to override settings? → No

### Configura la Variabile d'Ambiente

**IMPORTANTE**: La tua API key Resend è già nel file `.env.local` ma non deve essere committata su Git.

Aggiungi la variabile d'ambiente su Vercel:

```bash
vercel env add RESEND_API_KEY production
```

Quando richiesto, incolla la tua API key Resend

### Deploy in Produzione

```bash
vercel --prod
```

🎉 Il tuo sito sarà live su un URL tipo: `https://leonardo-cosaro-portfolio.vercel.app`

### Personalizza il Dominio (Opzionale)

Puoi aggiungere un dominio personalizzato dalla dashboard Vercel:
1. Vai su [vercel.com/dashboard](https://vercel.com/dashboard)
2. Seleziona il tuo progetto
3. Settings → Domains
4. Aggiungi il tuo dominio

---

## Opzione 2: Deploy su Netlify

Netlify supporta le serverless functions (chiamate "Netlify Functions").

### Setup

1. **Installa Netlify CLI**
```bash
npm install -g netlify-cli
```

2. **Login**
```bash
netlify login
```

3. **Rinomina la cartella API**
```bash
mv api netlify/functions
```

4. **Crea `netlify.toml`**
```toml
[build]
  command = "npm run build"
  publish = "dist"
  functions = "netlify/functions"

[build.environment]
  NODE_VERSION = "18"

[[redirects]]
  from = "/api/*"
  to = "/.netlify/functions/:splat"
  status = 200
```

5. **Deploy**
```bash
netlify deploy --prod
```

6. **Aggiungi la variabile d'ambiente**
   - Vai su Netlify Dashboard
   - Site settings → Environment variables
   - Aggiungi `RESEND_API_KEY` con la tua API key Resend (ottienila da https://resend.com/api-keys)

---

## Opzione 3: Server Tradizionale con Backend

Se preferisci un server tradizionale, devi creare un backend Express separato.

### 1. Crea un Backend Express

Crea una nuova cartella `server/`:

```bash
mkdir server
cd server
npm init -y
npm install express cors resend dotenv
```

Crea `server/index.js`:

```javascript
import express from 'express';
import cors from 'cors';
import { Resend } from 'resend';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const resend = new Resend(process.env.RESEND_API_KEY);

app.use(cors());
app.use(express.json());
app.use(express.static('../dist'));

app.post('/api/send-email', async (req, res) => {
  try {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    const data = await resend.emails.send({
      from: 'Portfolio Contact <onboarding@resend.dev>',
      to: 'cosaroleoo@gmail.com',
      replyTo: email,
      subject: `Nuovo messaggio da ${name} - Portfolio`,
      html: `
        <h2>Nuovo Messaggio dal Portfolio</h2>
        <p><strong>Nome:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Messaggio:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    res.json({ success: true, messageId: data.id });
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Failed to send email' });
  }
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

### 2. Deploy

**Su VPS/Server Linux:**

```bash
# Build del frontend
npm run build

# Copia dist e server sul server
scp -r dist server user@your-server.com:/var/www/portfolio/

# Sul server
cd /var/www/portfolio/server
npm install
pm2 start index.js --name portfolio

# Configura Nginx
sudo nano /etc/nginx/sites-available/portfolio
```

**Configurazione Nginx:**

```nginx
server {
    listen 80;
    server_name your-domain.com;

    root /var/www/portfolio/dist;
    index index.html;

    location /api {
        proxy_pass http://localhost:3001;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

---

## 🔒 Sicurezza API Key

**IMPORTANTE:** La tua API key Resend è stata salvata in `.env.local` che è nel `.gitignore`.

### ⚠️ NON committare mai:
- `.env.local`
- `.env.production`
- File con API keys

### ✅ Best Practices:
1. Usa variabili d'ambiente per le API keys
2. Aggiungi `.env.local` al `.gitignore` (già fatto)
3. Su produzione, usa le variabili d'ambiente della piattaforma (Vercel/Netlify)
4. Ruota periodicamente le API keys

### Ruotare l'API Key (se necessario):
1. Vai su [resend.com/api-keys](https://resend.com/api-keys)
2. Genera una nuova key
3. Aggiorna su Vercel: `vercel env rm RESEND_API_KEY production` poi `vercel env add RESEND_API_KEY production`
4. Elimina la vecchia key da Resend

---

## 🧪 Test Locale

### Con Vercel CLI (Raccomandato)
```bash
vercel dev
```
Apri http://localhost:3000 e testa il form di contatto.

### Con Build Statica
```bash
npm run build
npm run preview
```
⚠️ Nota: L'invio email non funzionerà senza un backend.

---

## 📊 Monitoraggio Email

### Dashboard Resend
Monitora le email inviate su [resend.com/emails](https://resend.com/emails):
- Status delle email
- Tasso di delivery
- Errori e bounce
- Logs dettagliati

---

## 🐛 Troubleshooting

### Email non arrivano
1. Verifica l'API key su Vercel/Netlify
2. Controlla i logs: `vercel logs` o nella dashboard
3. Verifica lo status su [resend.com/emails](https://resend.com/emails)

### Errore "CORS"
- Su Vercel/Netlify: già configurato
- Su server custom: aggiungi headers CORS

### Errore "Missing required fields"
- Controlla che tutti i campi del form siano compilati
- Verifica la console del browser per errori

---

## ✅ Checklist Pre-Deploy

- [ ] Build locale funziona: `npm run build`
- [ ] API key Resend configurata
- [ ] `.env.local` non committato su Git
- [ ] Verificato dominio su Resend (se usi dominio custom per email)
- [ ] Testato il form localmente con `vercel dev`
- [ ] Meta tags SEO configurati
- [ ] Favicon presente (se necessario)

---

## 📞 Supporto

Per problemi con:
- **Vercel**: [vercel.com/support](https://vercel.com/support)
- **Resend**: [resend.com/docs](https://resend.com/docs)
- **Questo progetto**: cosaroleoo@gmail.com
