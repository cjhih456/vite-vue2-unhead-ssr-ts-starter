/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VUE_APP_API_HOST: string
  readonly VUE_APP_BATCH_HOST: string
  readonly VUE_APP_PAY_HOST: string
  readonly VUE_APP_GROUP_PAY_HOST: string
  readonly VUE_APP_WEB_HOST: string
  readonly VUE_APP_CDN_HOST: string
  readonly VUE_APP_DNS_LEVEL: string

  readonly VUE_APP_GA_ID: string
  readonly VUE_APP_GOOGLE_MAP_API_KEY: string
  readonly VUE_APP_GMAIL_PAWSSWORD: string
  readonly VUE_APP_MIXPANEL: string
  readonly VUE_APP_KAKAO_API: string

  readonly VUE_APP_WELL_KNOWN_PACKAGE_NAME: string
  readonly VUE_APP_WELL_KNOWN_SHA256: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
