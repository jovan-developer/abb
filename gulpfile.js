const srcFolder = './1_src'

const {src, dest, parallel, series, watch} = require('gulp')
const sass = require('gulp-sass')
const notify = require('gulp-notify')
const sourcemaps = require('gulp-sourcemaps')
const rename = require('gulp-rename')
const autoPrefixer = require('gulp-autoprefixer')
const cleanCss = require('gulp-clean-css')
const browserSync = require('browser-sync').create()
const fileInclude = require('gulp-file-include')
const svgSprite = require('gulp-svg-sprite')
const fs = require('fs')
const merge = require('merge-stream')
const ttf2woff = require('gulp-ttf2woff')
const ttf2woff2 = require('gulp-ttf2woff2')
const del = require('del')
const webpack = require('webpack')
const webpackStream = require('webpack-stream')
const uglify = require('gulp-uglify')
const tiny = require('gulp-tinypng-compress')
const gutil = require('gulp-util')
const ftp = require('vinyl-ftp')
const htmlmin = require('gulp-htmlmin')
const babel = require('gulp-babel')
const nunjucksRender = require('gulp-nunjucks-render')
const env = require('./env.json')

let mode = 'development'

const fonts = () => {
  // src(`${srcFolder}/fonts/**.ttf`)
  // 	.pipe(ttf2woff())
  // 	.pipe(dest('./app/fonts/'))
  // return src(`${srcFolder}/fonts/**.ttf`)
  // 	.pipe(ttf2woff2())
  // 	.pipe(dest('./app/fonts/'))
  return src(`${srcFolder}/fonts/**/*`).pipe(dest('./app/fonts'))
}

const cb = () => {}

// let srcFonts = `${srcFolder}/scss/global/fonts.scss`;
// let appFonts = './app/fonts/';

const svgSprites = () => {
  let imgDirs = fs.readdirSync(`${srcFolder}/img/svg`)
  let arr = []

  imgDirs.map(function (dir) {
    // console.log(`${srcFolder}/img/svg/${dir}`)
    arr.push(
      src(`${srcFolder}/img/svg/${dir}/*.svg`)
        .pipe(
          svgSprite({
            mode: {
              stack: {
                sprite: `../${dir}.svg`,
              },
            },
          })
        )
        .pipe(dest('./app/img/svg'))
    )
  })

  return merge(arr)
}

// sourcemap, rename, autoprefixer, cleanCSS, browser-sync
const styles = () => {
  return src(`${srcFolder}/scss/*.scss`)
    .pipe(sourcemaps.init())
    .pipe(
      sass({
        outputStyle: 'expanded',
      }).on('error', notify.onError())
    )
    .pipe(
      rename({
        suffix: '.min',
      })
    )
    .pipe(
      autoPrefixer({
        cascade: false,
      })
    )
    .pipe(
      cleanCss({
        level: 2,
      })
    )
    .pipe(sourcemaps.write('.'))
    .pipe(dest('./app/css'))
    .pipe(browserSync.stream())
}

const htmlInclude = () => {
  return src([`${srcFolder}/njk/*.njk`])
    .pipe(
      nunjucksRender({
        path: '1_src/njk/',
      })
    )
    .pipe(dest('./app'))
    .pipe(browserSync.stream())
}

const imgToApp = () => {
  return src([`${srcFolder}/img/**/*.{png,jpg,jpeg,svg}`, `!${srcFolder}/img/svg/**/*.svg`]).pipe(dest('./app/img'))
}

const resources = () => {
  return src(`${srcFolder}/resources/**/*`).pipe(dest('./app/resources'))
}

const plugins = () => {
  return src(`${srcFolder}/plugins/**/*`).pipe(dest('./app/plugins'))
}

const clean = () => {
  return del(['app/*'])
}

const scripts = () => {
  return (
    src(`${srcFolder}/js/*.js`)
      .pipe(
        fileInclude({
          prefix: '@',
          basepath: '@file',
        })
      )
      .pipe(sourcemaps.init())
      .pipe(
        babel({
          presets: ['@babel/preset-env'],
          plugins: [
            [
              '@babel/plugin-proposal-decorators',
              {
                legacy: true,
              },
            ],
          ],
        })
      )
      // .pipe(uglify().on('error', notify.onError()))
      .pipe(sourcemaps.write('.'))
      .pipe(dest('./app/js'))
      .pipe(browserSync.stream())
  )
}

const watchFiles = () => {
  browserSync.init({
    server: {
      baseDir: './app',
    },
    open: false,
  })

  watch(srcFolder + '/scss/**/*.scss', styles)
  watch(srcFolder + '/html/*.html', htmlInclude)
  watch(srcFolder + '/njk/**/*.njk', htmlInclude)
  watch(srcFolder + '/*.html', htmlInclude)
  watch([`${srcFolder}/img/**/*.{png,jpg,jpeg,svg}`, `!${srcFolder}/img/svg/**/*.svg`], imgToApp)
  watch(srcFolder + '/img/**/*.svg', svgSprites)
  watch(srcFolder + '/resources/**/*', resources)
  watch(srcFolder + '/plugins/**/*', plugins)
  watch(`${srcFolder}/fonts/**.ttf`, fonts)
  watch(`${srcFolder}/js/**/*.js`, scripts)
}

exports.styles = styles
exports.watchFiles = watchFiles
exports.htmlInclude = htmlInclude
exports.fonts = fonts

exports.default = series(
  clean,
  parallel(htmlInclude, scripts, fonts, resources, plugins, imgToApp, svgSprites),
  styles,
  watchFiles
)

const htmlMinify = () => {
  return src('app/**/*.html')
    .pipe(
      htmlmin({
        collapseWhitespace: true,
      })
    )
    .pipe(dest('app'))
}

const tinypng = () => {
  if (typeof env != 'undefined') {
    return src(`${srcFolder}/img/**/*.{png,jpg,jpeg}`)
      .pipe(
        tiny({
          key: env.tinyKey,
          log: true,
          parallel: true,
          parallelMax: 50,
        })
      )
      .pipe(dest('./app/img'))
  } else {
    console.log(
      '\x1b[33m',
      "Tiny can't work without key parameter, check the env variables or set key explicitly in function"
    )
  }
}

const stylesBuild = () => {
  return src(`${srcFolder}/scss/*.scss`)
    .pipe(
      sass({
        outputStyle: 'expanded',
      }).on('error', notify.onError())
    )
    .pipe(
      rename({
        suffix: '.min',
      })
    )
    .pipe(
      autoPrefixer({
        cascade: false,
      })
    )
    .pipe(
      cleanCss({
        level: 2,
      })
    )
    .pipe(dest('./app/css/'))
}

const scriptsBuild = () => {
  return src(`${srcFolder}/js/*.js`)
    .pipe(
      fileInclude({
        prefix: '@',
        basepath: '@file',
      })
    )
    .pipe(
      babel({
        presets: ['@babel/preset-env'],
        plugins: [
          [
            '@babel/plugin-proposal-decorators',
            {
              legacy: true,
            },
          ],
        ],
      })
    )
    .pipe(uglify().on('error', notify.onError()))
    .pipe(dest('./app/js'))
}

exports.build = series(
  clean,
  parallel(htmlInclude, scriptsBuild, fonts, resources, plugins, imgToApp, svgSprites),
  stylesBuild,
  tinypng
)

const deploy = () => {
  if (typeof env != 'undefined') {
    let conn = ftp.create({
      host: env.host,
      user: env.hostUser,
      password: env.hostPassword,
      parallel: 10,
      log: gutil.log,
    })

    let globs = ['./app/**/*.*']

    return src(globs, {
      base: '',
      buffer: false,
    })
      .pipe(conn.newer('abb/')) // only upload newer files
      .pipe(conn.dest('abb/'))
  } else {
    console.log('\x1b[33m', 'Warning deploy impossible because env variables undefined!!!')
  }
}

exports.deploy = deploy
