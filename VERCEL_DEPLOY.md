# 🚀 Deploy su Vercel

Il tuo codice è ora su GitHub!
**Repository**: https://github.com/LeoC02/leonardo-cosaro-portfolio

## Metodo 1: Deploy tramite Dashboard Vercel (Raccomandato) 🌐

### Step 1: Vai su Vercel
Apri: https://vercel.com/new

### Step 2: Importa il Repository
1. Clicca su "Import Project"
2. Se richiesto, fai login con GitHub
3. Autorizza Vercel ad accedere ai tuoi repository
4. Seleziona: **leonardo-cosaro-portfolio**

### Step 3: Configura il Progetto
Vercel rileverà automaticamente Vite. Lascia le impostazioni di default:
- **Framework Preset**: Vite
- **Root Directory**: ./
- **Build Command**: `npm run build`
- **Output Directory**: dist

### Step 4: Aggiungi la Variabile d'Ambiente
**IMPORTANTE**: Prima di cliccare "Deploy", aggiungi:

1. Espandi "Environment Variables"
2. Aggiungi questa variabile:
   - **Name**: `RESEND_API_KEY`
   - **Value**: `re_e9XmKio9_HKFWHNQUUzHSCpxnK2uUVP8w`
   - **Environment**: Production (e anche Preview se vuoi)

### Step 5: Deploy!
Clicca su "Deploy" e aspetta ~2 minuti.

### ✅ Fatto!
Il tuo sito sarà live su un URL tipo:
`https://leonardo-cosaro-portfolio.vercel.app`

---

## Metodo 2: Deploy tramite CLI ⚡

Se hai già installato Vercel CLI:

```bash
# Login (se non l'hai già fatto)
vercel login

# Deploy
vercel --prod
```

Quando richiesto:
- Link to existing project? → **No**
- Project name? → leonardo-cosaro-portfolio (premi Enter)
- Directory? → `./` (premi Enter)

Poi aggiungi la variabile d'ambiente:
```bash
vercel env add RESEND_API_KEY production
# Incolla: re_e9XmKio9_HKFWHNQUUzHSCpxnK2uUVP8w
```

E fai un nuovo deploy:
```bash
vercel --prod
```

---

## 📝 Dopo il Deploy

### Verifica che Tutto Funzioni
1. Apri il tuo sito
2. Scorri fino al form di contatto
3. Compila e invia un messaggio di test
4. Controlla che l'email arrivi a `cosaroleoo@gmail.com`
5. Verifica anche su https://resend.com/emails

### Collega un Dominio Personalizzato (Opzionale)
1. Vai su Vercel Dashboard → Il tuo progetto
2. Settings → Domains
3. Aggiungi il tuo dominio (es. leonardocosaro.com)
4. Segui le istruzioni per configurare i DNS

### Aggiorna il Sito in Futuro
Ogni volta che fai push su GitHub, Vercel farà automaticamente il deploy!

```bash
# Fai modifiche al codice
git add .
git commit -m "La tua modifica"
git push

# Vercel farà il deploy automaticamente! 🎉
```

---

## 🔧 Troubleshooting

### Build Fallisce
- Controlla i logs nella dashboard Vercel
- Verifica che `npm run build` funzioni localmente

### Email Non Funzionano
1. Verifica che `RESEND_API_KEY` sia configurata su Vercel
2. Vai su Settings → Environment Variables
3. Controlla che il valore sia corretto

### 404 su Reload
Se ottieni 404 quando ricarichi una pagina:
- Vercel dovrebbe gestirlo automaticamente con Vite
- Se persiste, aggiungi un file `vercel.json` (già presente nel progetto)

---

## 📊 Monitoring

### Vercel Dashboard
- **Deployments**: Storico di tutti i deploy
- **Analytics**: Visite, performance, etc.
- **Logs**: Logs delle serverless functions (per le email)

### Resend Dashboard
- https://resend.com/emails
- Monitora le email inviate
- Controlla delivery rate e errori

---

## 🎉 Complimenti!

Il tuo portfolio è ora online e professionale!

**Link Rapidi:**
- Repository: https://github.com/LeoC02/leonardo-cosaro-portfolio
- Vercel Dashboard: https://vercel.com/dashboard
- Resend Dashboard: https://resend.com/emails

Hai domande? Controlla README.md e DEPLOYMENT.md per più dettagli!
