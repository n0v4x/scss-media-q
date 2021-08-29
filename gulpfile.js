const { src, series, parallel, dest, watch } = require("gulp");
const gulpSass = require("gulp-sass")(require("sass"));
const del = require("del");
const jest = require("gulp-jest").default;
const concat = require("gulp-concat");

const tests = () => {
  return src("__tests__").pipe(
    jest({
      preprocessorIgnorePatterns: [
        "<rootDir>/build/",
        "<rootDir>/output/",
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
  return del("output");
};

const sassTask = () => {
  return src("src/index.scss", { sourcemaps: true })
    .pipe(gulpSass())
    .pipe(dest("output", { sourcemaps: "." }));
};

const watchTask = () => {
  watch("src/**/*.scss", sassTask);
  watch("__tests__/**/*.scss", tests);
};

exports.tests = tests;
exports.build = series(tests, build);
exports.default = series(cleanTask, sassTask, watchTask);
