// Импорт пакетов
const gulp = require('gulp')
const sass = require('gulp-sass')(require('sass'))
const rename = require('gulp-rename')
const cleanCSS = require('gulp-clean-css')
const babel = require('gulp-babel')
const uglify = require('gulp-uglify')
const concat = require('gulp-concat')
const sourcemaps = require('gulp-sourcemaps')
const autoprefixer = require('gulp-autoprefixer')
const htmlmin = require('gulp-htmlmin')
const fileInclude = require('gulp-file-include');

const gulpif = require('gulp-if');
const argv = require('yargs').argv;

const size = require('gulp-size')
const newer = require('gulp-newer')
const browsersync = require('browser-sync').create()
// 
const imagemin = require('gulp-imagemin')
const del = require('del')


// Определяем аргумент `--production` с помощью yargs.
// Теперь можно запускать gulp в терминале для продакшн с аргументом: gulp --production
const isProduction = argv.production;


// Пути исходных файлов 'src' и пути к результирующим файлам 'dest'
const paths = {
  html: {
    src: ['src/**/*.html'],
    dest: 'dist/'
  },
  styles: {
    src: ['src/styles/**/*.scss', 'src/styles/**/*.css'],
    dest: 'dist/css/'
  },
  scripts: {
    src: ['src/scripts/**/*.js'],
    dest: 'dist/js/'
  },
  images: {
    src: 'src/img/**',
    dest: 'dist/img/'
  }
}

// Очистить каталог dist, удалить все кроме папки с изображениями: dist/img
function clean() {
  return del(['dist/*', '!dist/img'])
}
// Очистить каталог dist, удалить всю папку dist
function clean_all() {
  return del('dist')
}

// Обработка HTML
function html() {

  return gulp.src(['src/*.html'])

    .pipe(fileInclude({
      prefix: '@@',
      basepath: isProduction ? 'src/partials/production' : 'src/partials/dev',
    }))

    .pipe(
      gulpif(
        isProduction, htmlmin({ collapseWhitespace: true })
      ))
    .pipe(size({
      showFiles: true
    }))
    .pipe(gulp.dest(paths.html.dest))
    .pipe(browsersync.stream())
}

// Обработка препроцессором SCSS стилей
function styles() {
  return gulp.src(paths.styles.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(rename({
      basename: 'style',
      suffix: '.min'
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(size({
      showFiles: true
    }))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browsersync.stream())
}

// Обработка Java Script
const js_files = [
  'src/scripts/lib/*.*',
  'src/scripts/bold-transition.js',
  'src/scripts/burger.js',
  'src/scripts/fix-header.js',
  'src/scripts/lamp.js',
  'src/scripts/modal.js',
  'src/scripts/scroll.js'
]

function scripts() {
  return gulp.src(js_files)
    .pipe(sourcemaps.init())
    .pipe(babel({
      presets: ['@babel/env']
    }))
    .pipe(gulpif(isProduction, uglify()))
    .pipe(concat('main.min.js'))
    .pipe(sourcemaps.write('.'))
    .pipe(size({
      showFiles: true
    }))
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(browsersync.stream())
}

// Сжатие изображений
function img() {
  return gulp.src(paths.images.src)
    .pipe(newer(paths.images.dest))
    .pipe(
      gulpif(
        isProduction, imagemin({ progressive: true }),
        gulp.dest(paths.images.dest)
      ))
    .pipe(size({
      showFiles: true
    }))
    .pipe(gulp.dest(paths.images.dest))
}

// Отслеживание изменений в файлах и запуск лайв сервера
function watch() {
  browsersync.init({
    // server: isProduction ? 'dev' : 'dist',
    server: 'dist',
  })
  gulp.watch(paths.html.dest).on('change', browsersync.reload)
  gulp.watch(paths.html.src, html)
  gulp.watch(paths.styles.src, styles)
  gulp.watch(paths.scripts.src, scripts)
  gulp.watch(paths.images.src, img)
}

// Таски для ручного запуска с помощью gulp clean, gulp html и т.д.
exports.clean = clean

exports.html = html
exports.styles = styles
exports.scripts = scripts
exports.img = img
exports.watch = watch

// Удалить папку dist
exports.cleanAll = clean_all

// Таск по умолчанию. Режим 'Разработки', выполняется по команде gulp. 
exports.default = gulp.series(clean, html, gulp.parallel(styles, scripts, img), watch)

// Не делал таск для 'Продакшн'. Для режима 'Продакшн' можно запустить gulp с аргументом production: 'gulp --production'