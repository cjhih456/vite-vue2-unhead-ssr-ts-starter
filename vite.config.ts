import { defineConfig } from 'vite'
import legacy from '@vitejs/plugin-legacy'
import vue from '@vitejs/plugin-vue2'
import vueJsx from '@vitejs/plugin-vue2-jsx'
import { viteCommonjs } from '@originjs/vite-plugin-commonjs'
import { checker } from 'vite-plugin-checker'
import dotenv from 'dotenv'

export default defineConfig((env) => {
  const processEnv = {} as ImportMetaEnv
  dotenv.config({
    override: true,
    processEnv,
    path: '.env.' + env.mode
  })
  return {
    server: {
      port: 8080,
      host: '0.0.0.0'
    },
    root: 'src',
    envDir: '..',
    envPrefix: 'VUE_',
    publicDir: '../public',
    build: {
      emptyOutDir: true,
      minify: 'terser',
      cssMinify: 'esbuild',
      outDir: '../dist',
      rollupOptions: {
        output: {
          manualChunks: env.ssrBuild ? undefined : {
            utils: ['lodash', 'vue', 'pinia', 'vue-router'],
          }
        }
      }
    },
    plugins: [
      vue(),
      vueJsx(),
      viteCommonjs(),
      legacy({
        targets: ['ie >= 11'],
        additionalLegacyPolyfills: ['regenerator-runtime/runtime']
      }),
      checker({
        typescript: true,
        vueTsc: false
      }),
    ],
    optimizeDeps: {
      exclude: ['lodash']
    },
    resolve: {
      extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json', '.vue'],
      alias: [
        { find: '@/', replacement: '/' },
        { find: '~@/', replacement: '/' }
      ]
    },
    css: {
      transformer: 'postcss',
      preprocessorOptions: {
        sass: {
          sourceMap: true,
          additionalData: '@import "@/styles/variable"\n',
        },
        scss: {
          sourceMap: true,
          additionalData: '@import "@/styles/variable";\n',
        }
      }
    },
    // experimental: {
    //   renderBuiltUrl(filename: string, fileInfo) {
    //     if (env.command === 'serve') return filename
    //     return `${processEnv.VUE_APP_CDN_HOST}/${filename}`
    //   }
    // }
  }
})
