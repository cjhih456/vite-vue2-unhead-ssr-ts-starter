/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VUE_APP_API_HOST: string
  readonly VUE_APP_WEB_HOST: string
  readonly VUE_APP_CDN_HOST: string
  readonly VUE_APP_DNS_LEVEL: string

  readonly VUE_APP_WELL_KNOWN_PACKAGE_NAME: string
  readonly VUE_APP_WELL_KNOWN_SHA256: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
