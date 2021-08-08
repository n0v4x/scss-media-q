const { src, series, parallel, dest, watch } = require("gulp");
const gulpSass = require("gulp-sass")(require("sass"));
const browserSync = require("browser-sync").create();
const del = require("del");
const jest = require("gulp-jest").default;
const concat = require("gulp-concat");

const tests = () => {
  return src("__tests__").pipe(
    jest({
      preprocessorIgnorePatterns: [
        "<rootDir>/dist/",
        "<rootDir>/node_modules/",
      ],
      automock: false,
    })
  );
};

const build = () => {
  return src([
    "src/functions/**/*.scss",
    "src/_config.scss",
    "src/helpers/**/*.scss",
    "src/_q.scss",
    "!src/**/_.scss",
  ])
    .pipe(concat("media-q.scss"))
    .pipe(dest("build"));
};

const cleanTask = () => {
  return del("dist");
};

const sassTask = () => {
  return src("src/index.scss", { sourcemaps: true })
    .pipe(gulpSass())
    .pipe(dest("output", { sourcemaps: "." }))
    .pipe(browserSync.stream());
};

const serveTask = (cb) => {
  browserSync.init({
    server: {
      baseDir: ".",
    },
    notify: false,
  });

  cb();
};

const reloadServerTask = (cb) => {
  browserSync.reload();

  cb();
};

const watchTask = () => {
  watch("index.html", reloadServerTask);
  watch("src/**/*.scss", series(sassTask, reloadServerTask));
  // watch("src/**/*.scss", series(tests, sassTask, reloadServerTask));
  // watch("__tests__/**/*.scss", tests);
};

exports.build = build;
exports.default = series(cleanTask, sassTask, serveTask, watchTask);
