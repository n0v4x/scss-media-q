const { src, series, parallel, dest, watch } = require("gulp");
const gulpSass = require("gulp-sass")(require("sass"));
const del = require("del");
const jest = require("gulp-jest").default;
const concat = require("gulp-concat");
const sassdoc = require("sassdoc");

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
    .pipe(concat("scss-media-q.scss"))
    .pipe(dest("build"));
};

const cleanTask = () => {
  return del("output");
};

const cleanBuild = () => {
  return del("build");
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

const doc = () => {
  return src("src/**/*.scss").pipe(sassdoc());
};

exports.doc = doc;
exports.tests = tests;
exports.build = series(tests, cleanBuild, build);
exports.default = series(cleanTask, sassTask, watchTask);
