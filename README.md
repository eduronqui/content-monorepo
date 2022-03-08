# Content Monorepo

This monorepo is part of my #100DaysOfCode challenge.

It's based on [Lerna](https://lerna.js.org/) and it's structured as fallows:

```text
- src
  + packages
  |  # Leaf packages that will be used by services and web
  + services
  |  # Mostly Web APIs and event consumers and producers
  + web
  |  # Websites
```

## Getting started

Start by cloning and installing the root dependencies:

```bash
git clone https://github.com/eduronqui/content-monorepo && cd content-monorepo && npm install
```

[Optional] if you want to have to prefix every lerna command with `npx` than you will want to install it globally:

```bash
npm install lerna --global
```

The next thing to do is to bootstrap the monorepo:

```bash
npx lerna bootstrap
```

From now on, you're good to go on your own journey. The following scripts are mostly for reference

Running npm scripts

```bash
# Runs "target:script" on every package.
npx lerna run target:script

# Runs "target:script" only on "target:package".
# You may want to add --stream to get the logs from the packages on stdout.
npx lerna run target:script --scope target-package
```

## Committing changes

This repo uses [commitizen](https://github.com/commitizen/cz-cli) to make commit messages more consistent and pleasant so, please, when committing you awesome new features use:

```bash
git cz
# or (from the root of the monorepo)
npm run cz
```

This will display in interactive console to build your commit message in a bice way.

Don't be scared! There's a pre-commit hook configure through [husky](https://github.com/typicode/husky) that will run `npm test` on every package, service ou web that had a file changed in this commit.

_**Have fun!**_
