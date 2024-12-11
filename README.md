# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# yarn
yarn install

# npm
npm install

# pnpm
pnpm install --shamefully-hoist
```

## Development Server

Start the development server on http://localhost:3000

```bash
npm run dev
```

## Production

Build the application for production:

```bash
npm run build
```

Locally preview production build:

```bash
npm run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.

# GENESIS STEPS
This is what I did to create the SaaS, it is here for your interest and for my memory, you don't need to repeat these.

Follow instructions from here https://nuxt.com/docs/getting-started/installation

```bash
# install node
n lts
npx nuxi init vendtrakvms
code vendtrakvms/
npm install
npm run dev -- -o
```

To setup Supabase and middleware, loosely follow instructions from https://www.youtube.com/watch?v=IcaL1RfnU44

Supabase - new account (free tier), used github oauth for supabase account

```
npm install @nuxtjs/supabase
```

add this to nuxt.config.ts
```
modules: ['@nuxtjs/supabase']
```

Follow these instructions to add google oauth https://supabase.com/docs/guides/auth/social-login/auth-google