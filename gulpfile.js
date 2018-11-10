let gulp = require("gulp");
let json = require("gulp-json-editor");
let argv = require("yargs").argv;
let replace = require("gulp-string-replace");

let replaceOptions = {
  logs: {
    enabled: false
  }
};

gulp.task("default", ["sass"]);

gulp.task("serve:before", ["default"]);

gulp.task("set", () => {
  let ver = argv.ver;
  if (typeof ver === "string") {
    switchLocalVersion(ver);
  }
});

function switchJSON({ key, value, src, dest }) {
  return new Promise((resolve, reject) => {
    gulp
      .src(src)
      .pipe(
        json(
          function(file) {
            return {
              ...file,
              [key]: value
            };
          },
          {
            indent_char: "\t",
            indent_size: 1
          }
        )
      )
      .on("error", reject)
      .pipe(gulp.dest(dest))
      .on("end", resolve);
  });
}

function modifyTS({ src, dest, regexp, replacement }) {
  return new Promise((resolve, reject) =>
    gulp
      .src(src)
      .pipe(replace(regexp, replacement, replaceOptions))
      .on("error", reject)
      .pipe(gulp.dest(dest))
      .on("end", resolve)
  );
}

function switchLocalVersion(version) {
  return switchVerJSON(version).then(() => switchVerTxt(version));
}

function switchVerJSON(version) {
  return switchJSON({
    key: "version",
    value: version,
    src: "./package.json",
    dest: "."
  });
}

function switchVerTxt(version) {
  let xmlRegexp = /version="(.*?)"/g;
  let tsRegexp = /ver\: (.*?),/gm;
  let xmlReplacement = `version="${version}"`;
  let tsReplacement = `ver: "${version}",`;

  return modifyTS({
    regexp: tsRegexp,
    replacement: tsReplacement,
    src: "./src/app/app.config.ts",
    dest: "./src/app"
  })
    .then(() =>
      modifyTS({
        regexp: xmlRegexp,
        replacement: xmlReplacement,
        src: "./config.xml",
        dest: "."
      })
    )
    .then(() => Promise.resolve(version));
}