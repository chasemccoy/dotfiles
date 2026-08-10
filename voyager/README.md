# voyager

Server config for **voyager**, the always-on Mac mini. These two files are the source of truth for what runs there and how it's reached.

| File | Symlinked to | Purpose |
| --- | --- | --- |
| `ecosystem.config.js` | `~/Documents/ecosystem.config.js` | pm2 process definitions — one entry per app, with its `cwd` and start command |
| `Caddyfile` | `~/Documents/Caddyfile` | Caddy reverse proxy — maps each `*.chsmc.tools` hostname to a localhost port |

Adding an app means editing **both**: the ecosystem entry starts it, the Caddyfile block exposes it. An app in only the ecosystem config runs but has no URL.

## Setup on a fresh voyager

```zsh
ln -s ~/Repositories/dotfiles/voyager/ecosystem.config.js ~/Documents/ecosystem.config.js
ln -s ~/Repositories/dotfiles/voyager/Caddyfile ~/Documents/Caddyfile
```

Symlinked rather than copied, so edits here are what actually runs.

## Secrets

The Caddyfile reads its Cloudflare DNS-01 token from the environment as `{env.CLOUDFLARE_API_TOKEN}`. The token lives in `~/.config/caddy/.env` (mode 600), outside this repo and never committed:

```
CLOUDFLARE_API_TOKEN=...
```

The `caddy` pm2 entry sources that file before exec'ing Caddy, so the token is in Caddy's process environment.

## How Caddy runs

Caddy runs in the **foreground** under pm2:

```
set -a; . /Users/voyager/.config/caddy/.env; set +a; exec /usr/local/bin/caddy run --config /Users/voyager/Documents/Caddyfile
```

Three details, each of which will break things if changed carelessly:

- **`caddy run`, not `caddy start`.** `start` daemonizes and returns, so pm2 sees the wrapper exit, reports the entry as `errored`, and can never restart Caddy if it dies. With `run`, pm2 supervises the real process and restarts it on crash.
- **`exec`** replaces the shell with Caddy, so pm2's tracked pid *is* Caddy's pid and signals reach it directly for graceful shutdown. Without it, pm2 would be supervising a bash wrapper.
- **Absolute binary path.** pm2 runs entries through `/bin/bash -c` with a minimal PATH that excludes `/usr/local/bin`, where Caddy lives.

Avoid `caddy start --envfile <path>` if you ever revert to `start` — the flag isn't forwarded to the background process it spawns, so the token resolves to an empty string and Caddy refuses to load the config with a misleading "API token '' appears invalid" error.

## Applying changes

pm2 reads this file at start, not continuously:

```zsh
cd ~/Documents && pm2 restart ecosystem.config.js --only <app>
```

If you add, remove, or rename an app, follow with `pm2 save`. The `pm2.voyager` LaunchAgent restores from `~/.pm2/dump.pm2` via `pm2 resurrect` at login, so an unsaved change survives until the next reboot and then silently disappears.

`pm2 list` is now an accurate health check — every entry including `caddy` should read `online`.
