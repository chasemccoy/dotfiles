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
    }
  ],
}
