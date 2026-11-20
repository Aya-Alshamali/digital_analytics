# FocusNest chatbot relay (Cloudflare Worker)

This tiny relay lets **every visitor** use the Ask FocusNest chatbot without entering a key. The Groq key is stored as a **secret in Cloudflare**, never in this repository.

- It only answers requests from `https://aya-alshamali.github.io` (and `http://localhost:8080` for a local copy).
- It only allows the two chat models FocusNest uses, and it caps the answer length.

## Deploy (one time, free)

Run these from the `focusnest` folder:

```bash
npx wrangler@4 login                 # opens Cloudflare in your browser; sign in or create a free account
```

```bash
cd relay && npx wrangler@4 deploy    # prints the relay address, e.g. https://focusnest-chat.<you>.workers.dev
```

```bash
npx wrangler@4 secret put GROQ_KEY   # paste the Groq key when asked (it is stored secretly in Cloudflare)
```

Then put the printed address in `js/chat-config.js` as `relay: "https://focusnest-chat.<you>.workers.dev"` and push.

## Change the key later

1. Make a new key at https://console.groq.com/keys.
2. Run `npx wrangler@4 secret put GROQ_KEY` again from the `relay` folder.

The website doesn't need to change.
