// 'use strict';
// const gulp = require("gulp");
const { watch, dest, src } = require("gulp");
const { series } = require("gulp");
const sass = require("gulp-sass");
// const sourcemaps = require("gulp-sourcemaps");
const babel = require("gulp-babel");
const concat = require("gulp-concat");
const csso = require("gulp-csso");
//const autoprefixer = require("gulp-autoprefixer");
const imagemin = require("gulp-imagemin");
const imageminPngquant = require("imagemin-pngquant");
const imgCompress = require("imagemin-jpeg-recompress");
const minifyjs = require("gulp-js-minify");
const browserSync = require("browser-sync").create();
// **************************************************
const watcher = watch([
  "src/*.html",
  "src/js/*.js",
  "src/sass/*.scss",
  "src/css/*.css"
]);
watcher.on("change", function(path, stats) {
  browserSync.reload();
});

watch(["src/sass/*.scss"], function(cb) {
  sassExt();
  cb();
});

watch("src/**/index.js", function(cb) {
  babeltr();
  cb();
});

const serv = () => {
  browserSync.init({
    server: {
      baseDir: "./src"
    }
  });
};

const babeltr = () => {
  return (
    src([
      "src/**/jquery*.min.js",
      "src/**/jquery-migrate-1.4.1.min.js",
      "src/**/slick.min.js",
      "src/**/index.js"
    ])
      .pipe(babel())
      // .pipe(rigger())
      .pipe(minifyjs())
      .pipe(concat("all.min.js"))
      //  .pipe(sourcemaps.write("."))
      .pipe(dest("dist/js"))
  );
};

sass.compiler = require("node-sass");

const sassExt = () => {
  return src("src/sass/**/*.scss")
    .pipe(sass().on("error", sass.logError))
    // .pipe(autoprefixer())
    .pipe(dest("src/css"));
  // .pipe(browserSync.stream());
};

const cssminim = () => {
  return (
    //src("src/**/*.css")
      src([
      "src/css/fontface.css", 
      "src/css/style.css",
      //"src/css/media.css"
      ])
      .pipe(csso())
      .pipe(concat("style.css"))
      .pipe(dest("dist/css/"))
      .pipe(browserSync.stream())
  );
};
const copy = () => {
  return (
    src("src/**/*.html").pipe(dest("dist")) &&
    src("src/fonts/*").pipe(dest("dist/fonts")) &&
    src ("src/img/*").pipe(dest("dist/img")) &&
    src ("src/json/*").pipe(dest("dist/json")) &&
    src("src/webfonts/*").pipe(dest("dist/webfonts/"))
  );
};

const imageMin = () => {
  return src("src/img/*.+(jpg|jpeg|png|svg)")
    .pipe(imagemin())
    .pipe(
      imagemin([
        imgCompress({
          loops: 4,
          min: 70,
          max: 80,
          quality: "high"
        }),
        imagemin.gifsicle({ interlaced: true }),
        // imagemin.optipng({ optimizationLevel: 5 }),
        imageminPngquant(["quality: 80"]),
        imagemin.svgo({
          plugins: [{ removeViewBox: true }, { cleanupIDs: false }]
        })
      ])
    )
    .pipe(dest("dist/img/"));
};

// exports.sassExt = sassExt;
// exports.sasswatch = sasswatch;
exports.babeltr = babeltr;
exports.build = series(cssminim, imageMin, babeltr, copy);
exports.dev = series(serv);
