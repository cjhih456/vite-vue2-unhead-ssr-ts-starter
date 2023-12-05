Vite - Vue2 - unhead - ssr Server sample code

# structure

<details>
<summary><b>Project</b></summary>
| Package Manager | Bundler | Server  | Framework | Router     | Status |
| --------------- | ------- | ------- | --------- | ---------- | ------ |
| Yarn            | Vite    | Express | Vue2      | vue-router | pinia  |
</details>

## File Structure

- dist: Client side build result files
- dist-server: Server side build result files

  build results will be in `dist`, `dist-server` directory.

- public: Directory of static files
- types: typescript d.ts files
- src
  - construct
  - layout
  - pages
  - plugins
  - router
  - store
  - utils

# commands

```bash
# launch Dev server (SPA)
yarn serve:dev
# launch Dev server (SSR)
yarn ssr:dev
# launch builded server (SSR)
yarn ssr:prod

# build Client side entry(DEV)
yarn build:manifest:dev
# build Server side entry(DEV)
yarn build:ssr:dev
# build Application for SSR(DEV)
yarn build:dev

# build Client side entry(PROD)
yarn build:manifest:prod
# build Server side entry(PROD)
yarn build:ssr:prod
# build Application for SSR(PROD)
yarn build:prod
```
