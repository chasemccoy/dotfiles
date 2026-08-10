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
    }
  ],
}
