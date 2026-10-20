module.exports = {
  apps: [
    {
      name: 'caddy',
      cwd: '/Users/voyager/Documents',
      script: 'set -a; . /Users/voyager/.config/caddy/.env; set +a; exec /usr/local/bin/caddy run --config /Users/voyager/Documents/Caddyfile'
    },
    {
      name: 'www',
      cwd: '/Users/voyager/Repositories/www',
      script: 'pnpm run start',
      interpreter: 'none',
    },
    {
      name: 'lab',
      cwd: '/Users/voyager/Repositories/lab',
      script: 'pnpm run dev',
      interpreter: 'none',
    },
    {
      name: 'api',
      cwd: '/Users/voyager/Repositories/api',
      script: 'yarn start',
      interpreter: 'none'
    },
    {
      name: 'voyager-api',
      port: 5001,
      cwd: '/Users/voyager/Repositories/voyager-api',
      script: 'pnpm run dev'
    },
    {
      name: 'launchpad',
      port: 5002,
      cwd: '/Users/voyager/Repositories/launchpad',
      script: 'pnpm run dev',
    },
    {
      name: 'enchiridion',
      cwd: '/Users/voyager/Repositories/enchiridion',
      script: 'pnpm run dev',
    },
    {
      name: 'trailmix',
      cwd: '/Users/voyager/Repositories/trailmix',
      script: 'pnpm run deploy:prod',
    },
    {
      name: 'concierge',
      cwd: '/Users/voyager/Repositories/concierge',
      script: 'pnpm run deploy',
      watch: ['app' , 'server'],
      ignore_watch: ['node_modules', 'app/dist'],
    },
    {
      name: 'arc-tabs',
      port: 5003,
      cwd: '/Users/voyager/Repositories/arc-tabs',
      script: 'npm run start',
      interpreter: 'none',
    },
    {
      // Archive of agent-made HTML artifacts. ARTIFACTS_SYNC: pulls the library from GitHub every minute (and when
      // the artifacts CLI pings it), and commits and pushes edits made in the gallery.
      name: 'artifacts',
      cwd: '/Users/voyager/Repositories/artifacts',
      script: 'pnpm start',
      interpreter: 'none',
      env: {
        // pnpm, then Homebrew's node (24+, for TypeScript type stripping) ahead of nvm's 18 from the pm2 plist.
        PATH: '/Users/voyager/Library/pnpm:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin',
        PORT: '5004',
        ARTIFACTS_SYNC: '1',
      },
    },
    {
      // familiar, Chase's agent, serving the familiar apps (docs/VOYAGER.md in the familiar repo).
      // No secrets here: the API key is in the familiar repo's .env, the apps' token in ~/.familiar/token.
      name: 'familiar',
      cwd: '/Users/voyager/Repositories/familiar',
      script: '/Users/voyager/Repositories/familiar/bin/familiar',
      args: '--serve', // never --deploy: it would drop the agent's undeployed work on self
      interpreter: 'none',
      kill_timeout: 15000, // pm2 sends SIGINT to the whole tree; give familiar time to close its session
      exp_backoff_restart_delay: 2000,
      time: true,
      env: {
        // node 24 first (Homebrew's is 25), then pnpm and git for deploys. The agent's bash tool sees this PATH too.
        PATH: '/Users/voyager/.nvm/versions/node/v24.13.0/bin:/Users/voyager/Library/pnpm:/opt/homebrew/bin:/opt/homebrew/sbin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin:/Users/voyager/.local/bin',
        PNPM_HOME: '/Users/voyager/Library/pnpm',
        FAMILIAR_PORT: '4848',
      },
    },
    {
      // Faulkner's per-post chat with Claude (faulkner/Server, PROTOCOL.md there). No secrets here: the API key
      // is in Server/.env (mode 600). Its data is ~/.faulkner-chat (chat.db and the Agent SDK's sessions). Claude reads
      // ~/.claude/CLAUDE.md and ~/.claude/skills, i.e. ~/Repositories/scripts: pull that for current skills.
      name: 'faulkner-chat',
      cwd: '/Users/voyager/Repositories/faulkner/Server',
      script: 'pnpm start',
      interpreter: 'none',
      kill_timeout: 10000, // a running turn is ended (failed, "restarted") before the process exits
      exp_backoff_restart_delay: 2000,
      time: true,
      env: {
        // node 24 first (Homebrew's is 25): type stripping and node:sqlite.
        PATH: '/Users/voyager/.nvm/versions/node/v24.13.0/bin:/Users/voyager/Library/pnpm:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin',
        PNPM_HOME: '/Users/voyager/Library/pnpm',
        FAULKNER_CHAT_PORT: '4850',
      },
    },
    {
      // Faulkner's web app (faulkner/apps/web, SvelteKit under vite dev, as it's meant to run: its CSRF hook in
      // hooks.server.ts is load-bearing). It edits its own clone of the blog, ~/faulkner-blog (not ~/Repositories/www,
      // the preview's), committing and pushing over SSH. Its API key for drafting comes from the chat service's .env.
      name: 'faulkner-web',
      cwd: '/Users/voyager/Repositories/faulkner/apps/web',
      script: '/bin/bash',
      args: ['-c', 'set -a; . /Users/voyager/Repositories/faulkner/Server/.env; set +a; exec pnpm dev'],
      interpreter: 'none',
      exp_backoff_restart_delay: 2000,
      time: true,
      env: {
        PATH: '/Users/voyager/.nvm/versions/node/v24.13.0/bin:/Users/voyager/Library/pnpm:/opt/homebrew/bin:/usr/local/bin:/usr/bin:/bin:/usr/sbin:/sbin',
        PNPM_HOME: '/Users/voyager/Library/pnpm',
        FAULKNER_REPO: '/Users/voyager/faulkner-blog',
      },
    }
  ],
}
