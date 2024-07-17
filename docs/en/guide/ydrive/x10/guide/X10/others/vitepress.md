# web://x10

## Getting Started with Vitepress

This project was built with [Vitepress](https://vitepress.dev/guide/getting-started)

follow steps below to bulid your project

## 1. Install Plugin

> run script `npm add -D vitepress`

- vitepress plugin will be add in package.json
- node_modules will be install

## 2. Set Project

> run script `npx vitepress init`

> answer some questions to set project name and configure

- [docs] folder wll be create (by default)
- 3 MD files in root created (index、api-examples、markdown-examples)
- folder called [.vitepress] will create

## 3. Start your Project

> run script `npm run docs:dev`

- You will see your homepage on localhost
- It can edit by MD

## 4. Build your Project

> run script `npm run docs:build`
> run script `npm run docs:preview`

- The "build" command will create a folder called [dist]
- The "preview" command will boot up a local static web server that will serve the output directory .vitepress/dist at localhost
- You can also configure the port of the server by passing --port as an argument.

`{
  "scripts": {
    "docs:preview": "vitepress preview docs --port 8080"
  }
}`

---
