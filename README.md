# Nuxt 3 Minimal Starter + Supabase + OAuth + Prisma + TRPC

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

# Steps to Create
This is what I did to create the project including all the extra fiddly stuff. Putting things here so I don't forget.

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

Then I frigged around trying to get the nuxt-supabase module to work properly for the oauth flow. It's a bit of a mess TBH. Eventually I looked at the demo https://github.com/nuxt-modules/supabase/tree/main/demo like a chump and got it working

Integrating Prisma...
This was a tricky decision I think. The Supabase client has some pseudo sql ORMy sort of features already
but Prisma has this awesome schema management support and autogeneration of a typed client.... and I already had a schema lying
around that was nearly what I needed and it was nice to be able to re-use it.

```
npm install prisma --save-dev
npx prisma init
```
go to Supabase -> settings -> database -> connection string -> URI.. and copy the URI into the
DATABASE_URL settings created with prisma init.
still in database, go to 'Database password' and reset/set it and copy the password into the [YOUR-PASSWORD] placeholder in the URI

Then I manually hand coded the schema.prisma file based on something else I already had.

```
npx prisma db push
npm install @prisma/client --save-dev
npx prisma generate
```

# TODO
- add role to membership and have methods for changing role, making sure one owner etc (done)
- remove @unique so users can have multiple accounts (done)
- add concept of 'current' account for user... maybe put account on context or session... maybe just on DB... 'current' boolean on membership?
- add max_notes property to plan and account as an example of a 'limit' property (done)
- add spinup script somehow to create plans???... should I use some sort of generator like sidebase?
- team invitation thingy
- integration with stripe including webhooks