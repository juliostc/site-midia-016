"use strict";

const gulp = require("gulp"),
      path = require("path"),
      environments = require("gulp-environments"),
      less = require("gulp-less"),
      sourcemaps = require("gulp-sourcemaps"),
      cssnano = require("gulp-cssnano"),
      uglify = require("gulp-uglify"),
      del = require("del"),
      ngAnnotate = require("gulp-ng-annotate"),
      image = require("gulp-image"),
      include = require("gulp-include"),
      rename = require("gulp-rename");

if (!process.env.NODE_ENV) { environments.current(environments.development); }

const publicFolder = "./public/",
      assetsFolder = path.join(publicFolder, "assets");

gulp.task("css", () => {
  return gulp.src("./src/css/application.css.less")
    .pipe(environments.development(sourcemaps.init()))
      .pipe(include())
      .pipe(less())
      .pipe(rename("application.css"))
      .pipe(environments.production(cssnano()))
    .pipe(environments.development(sourcemaps.write()))
    .pipe(gulp.dest(publicFolder));
});

gulp.task("js", () => {
  return gulp.src("./src/application.js")
    .pipe(environments.development(sourcemaps.init()))
      .pipe(include())
      .pipe(ngAnnotate())
      .pipe(rename("application.js"))
      .pipe(environments.production(uglify()))
    .pipe(environments.development(sourcemaps.write()))
    .pipe(gulp.dest(publicFolder));
});

gulp.task("views", () => {
  return gulp.src("./src/views/**/*")
    .pipe(gulp.dest(publicFolder));
});

gulp.task("assets", () => {
  return gulp.src("./src/assets/**/*")
    .pipe(image())
    .pipe(gulp.dest(assetsFolder));
});

gulp.task("clean", () => del.sync(publicFolder));

gulp.task("default", ["css", "js", "views", "assets"]);

gulp.task("build", ["clean", "default"]);

if (environments.development()) {
  const watch = require("gulp-watch"),
        batch = require("gulp-batch");

  function buildWhenChanged(files, task, buildPath) {
    task = task || "build";

    watch(files, batch((events, done) => {
      if (buildPath) {
        del(buildPath).then(() => {
          gulp.start(task, done).on("error", error => {
            error.end();
            done();
          });
        }).catch(done);
      } else {
        gulp.start(task, done).on("error", error => {
          error.end();
          done();
        });
      }
    }));
  };

  gulp.task("watch", ["build"], () => {
    buildWhenChanged("./src/js/**/*", "js");

    buildWhenChanged("./src/css/**/*", "css");

    buildWhenChanged("./src/views/**/*", "views", path.join(publicFolder, "**/*.html"));

    buildWhenChanged("./src/assets/**/*", "assets", assetsFolder);
  });
}
