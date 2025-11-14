## 30-Day Real Posting Model

- Next.js app that turns brand inputs into a 30-day publishing calendar with hooks, batching prompts, and AI assist suggestions.
- Weekly focus cards keep teams aligned on narrative arcs, and the output highlights top formats and platform cadence.
- Built to deploy on Vercel at `https://agentic-112f7c8b.vercel.app`.

### Local Development

```bash
npm install
npm run dev
```

Visit `http://localhost:3000` to interact with the generator.

### Production Build

```bash
npm run build
npm start
```

### Deployment

The project is already configured for Vercel. Redeploy with:

```bash
vercel deploy --prod --yes --token $VERCEL_TOKEN
```

The live build is verified via `curl https://agentic-112f7c8b.vercel.app`.
