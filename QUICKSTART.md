# 🚀 Quick Start Guide

## Il Problema dell'Email in Sviluppo

Hai ricevuto l'errore: **"Failed to execute 'json' on 'Response': Unexpected end of JSON input"**

Questo succede perché l'endpoint `/api/send-email` **funziona solo con Vercel**, non con il normale `npm run dev` di Vite.

---

## ✅ Soluzione: Usa Vercel Dev

### 1. Installa Vercel CLI (una volta sola)

```bash
npm install -g vercel
```

### 2. Login su Vercel (prima volta)

```bash
vercel login
```

Segui le istruzioni nel browser per fare login.

### 3. Avvia il Server di Sviluppo

**Invece di `npm run dev`, usa:**

```bash
npm run dev:vercel
```

Oppure direttamente:

```bash
vercel dev
```

Alla prima esecuzione ti chiederà:
- **Set up and develop?** → Yes
- **Which scope?** → Seleziona il tuo account
- **Link to existing project?** → No (se è la prima volta)
- **What's your project's name?** → leonardo-cosaro-portfolio (o qualsiasi nome)
- **In which directory?** → `./` (premi Enter)
- **Want to modify settings?** → No

### 4. Testa il Form

Il server sarà disponibile su **http://localhost:3000**

Ora il form di contatto funzionerà correttamente e invierà email reali a `cosaroleoo@gmail.com`! 🎉

---

## 📊 Confronto dei Comandi

| Comando | Funziona per | Email Funziona? |
|---------|-------------|-----------------|
| `npm run dev` | Sviluppo UI | ❌ No (errore JSON) |
| `npm run dev:vercel` | Sviluppo completo | ✅ Sì |
| `vercel dev` | Sviluppo completo | ✅ Sì |
| `npm run build` | Build produzione | N/A |
| `npm run deploy` | Deploy a Vercel | ✅ Sì |

---

## 🔧 Workflow Consigliato

### Per Sviluppo UI (senza email)
```bash
npm run dev
```
Più veloce, usa quando non devi testare l'invio email.

### Per Testare Email
```bash
npm run dev:vercel
```
Ambiente completo con API funzionanti.

### Per Build & Deploy
```bash
# Build locale
npm run build

# Deploy a Vercel
npm run deploy
```

---

## 🎯 Deploy in Produzione

### Prima Volta

```bash
# 1. Build
npm run build

# 2. Deploy
npm run deploy
```

Vercel ti darà un URL tipo: `https://leonardo-cosaro-portfolio.vercel.app`

### Aggiorna il Sito

Dopo modifiche al codice:

```bash
npm run deploy
```

---

## 🔑 Variabile d'Ambiente su Vercel

L'API key Resend è già configurata localmente in `.env.local`.

Per funzionare in produzione, devi aggiungerla su Vercel:

```bash
vercel env add RESEND_API_KEY production
```

Quando richiesto, incolla la tua API key Resend (ottienila da https://resend.com/api-keys)

Oppure aggiungila dalla dashboard:
1. Vai su [vercel.com/dashboard](https://vercel.com/dashboard)
2. Seleziona il progetto
3. Settings → Environment Variables
4. Aggiungi `RESEND_API_KEY` con il valore sopra

---

## 🐛 Troubleshooting

### "vercel: command not found"
```bash
npm install -g vercel
```

### Email non arriva
1. Controlla i log: `vercel logs`
2. Verifica su [resend.com/emails](https://resend.com/emails)
3. Controlla spam/promozioni

### Errore "Missing RESEND_API_KEY"
```bash
vercel env add RESEND_API_KEY production
```

### Porta 3000 già in uso
```bash
# Vercel userà automaticamente un'altra porta (es. 3001)
# Oppure fermale altre app sulla porta 3000
```

---

## 📁 Struttura Sviluppo vs Produzione

### Sviluppo Locale (vercel dev)
```
http://localhost:3000
├── Frontend (Vite) → http://localhost:3000
└── API Function → http://localhost:3000/api/send-email
```

### Produzione (Vercel)
```
https://your-site.vercel.app
├── Frontend (Static) → CDN
└── API Function → Serverless Function
```

---

## ✨ Pro Tips

1. **Usa `vercel dev` solo quando serve testare le API**
   - Per modifiche UI → `npm run dev` (più veloce)
   - Per test email → `npm run dev:vercel`

2. **Hotkeys utili con Vercel Dev**
   - `Ctrl+C` per fermare il server
   - Il reload è automatico come Vite

3. **Preview Branch**
   ```bash
   # Crea una preview senza fare deploy in produzione
   vercel
   ```

4. **Logs in tempo reale**
   ```bash
   vercel logs --follow
   ```

---

## 📝 Prossimi Passi

1. ✅ Installa Vercel CLI: `npm install -g vercel`
2. ✅ Testa localmente: `npm run dev:vercel`
3. ✅ Verifica che l'email arrivi
4. ✅ Deploy: `npm run deploy`
5. ✅ Aggiungi variabile d'ambiente su Vercel
6. ✅ Testa in produzione

---

Hai ancora problemi? Controlla `DEPLOYMENT.md` per la guida completa! 🚀
