var gulp = require('gulp'),
    fs = require('fs'),
    path = require('path'),
    merge = require('merge-stream'),
    sass = require('gulp-sass'),
    gulpif = require('gulp-if'),
    autoprefixer = require('gulp-autoprefixer'),
    cleanCSS = require('gulp-clean-css'),
    csscomb = require('gulp-csscomb'),
    notify = require('gulp-notify'),
    rename = require('gulp-rename'),
    changed = require('gulp-changed'),
    debug = require('gulp-debug'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    webpack = require('gulp-webpack'),
    cache = require('gulp-cache'),
    babel = require('gulp-babel'),
    concat = require('gulp-concat'),
    plumber = require('gulp-plumber'),
    clean = require('gulp-clean'),
    htmlmin = require('gulp-htmlmin'),
    browserSync = require('browser-sync').create();

var reload = browserSync.reload;
var isDeploy = false;

// 静态服务器
gulp.task('browser-sync', ['html', 'sass', 'scripts', 'images'], function() {
    browserSync.init({
        server: {
            baseDir: './'
        },
        port: 3030
    });

    watch();
});

// 监听文件变化
function watch() {
    gulp.watch('src/**/*.scss', ['sass']);
    gulp.watch('src/**/*.js', ['scripts']);
    gulp.watch('src/**/*.html', ['html']);
    gulp.watch(['src/**/*.png', 'src/**/*.jpg', 'src/**/*.jpeg'], ['images']);
    gulp.watch(['index.html', 'dist/**/*.html']).on('change', reload);
    gulp.watch('dist/**/bundle.js').on('change', reload);
    gulp.watch('dist/**/*.css').on('change', reload);
}

// 压缩html
gulp.task('html', function() {
    return gulp.src('src/**/*.html')
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest('dist'));
});

// 样式处理
gulp.task('sass', function() {
    return gulp.src('src/**/*.scss')
        .pipe(changed('dist', { extension: '.css' }))
        .pipe(plumber({
            errorHandler: function(error) {
                this.emit('end');
            }
        }))
        .pipe(plumber({
            errorHandler: notify.onError({
                title: 'SASS编译失败！',
                message: `<%= error.messageOriginal %>（<%= error.line %>行）`
            })
        }))
        .pipe(gulpif(!isDeploy, sourcemaps.init()))
        .pipe(sass())
        .pipe(gulpif(!isDeploy, sourcemaps.write()))
        .pipe(autoprefixer(['>5%']))
        .pipe(csscomb())
        .pipe(gulp.dest('dist'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(cleanCSS())
        .pipe(debug({title: '编译:'}))
        .pipe(gulp.dest('dist'))
        // .pipe(notify({ message: 'sass编译成功！' }))
});

var scriptsPath = 'src';
var distPath = 'dist';

//  过滤掉不含有main.js的文件夹
function getFolders(dir) {
    return fs.readdirSync(dir)
      .filter(function(file) {
        return fs.statSync(path.join(dir, file)).isDirectory() &&  fs.readdirSync(path.join(dir, file)).some(function(file) {
            return file === 'main.js'
        });
      });
}

gulp.task('scripts', function() {
   var folders = getFolders(scriptsPath);

   var tasks = folders.map(function(folder) {
      return gulp.src(path.join(scriptsPath, folder, '/*.js'))
        .pipe(plumber({
            errorHandler: function(error) {
                this.emit('end');
            }
        }))
        .pipe(plumber({
            errorHandler: notify.onError({
                title: 'Javascript编译失败！',
                message: `<%= error.message %>`
            })
        }))
        .pipe(gulpif(!isDeploy, sourcemaps.init()))
        .pipe(babel())
        .pipe(uglify())
        .pipe(gulpif(!isDeploy, sourcemaps.write()))
        .pipe(debug({title: '编译:'}))
        .pipe(gulp.dest(path.join(distPath, folder)))
        .pipe(webpack({
	        devtool:'#eval-source-ma',
            output:{
                filename: 'bundle.js',
            },
            stats:{
                colors: true
            }
        }))
        .pipe(gulp.dest(path.join(distPath, folder)))
   });
});

// 图片压缩
gulp.task('images', function() {
    return gulp.src(['src/**/*.png', 'src/**/*.jpg', 'src/**/*.jpeg'])
        .pipe(cache(imagemin({
            optimizationLevel: 3,
            progressive: true,
            interlaced: true
        })))
        .pipe(gulp.dest('dist'))
        .pipe(notify({
            message: '图片压缩完成！'
        }));
});

// 清空图片、样式、js
gulp.task('clean', function() {
    gulp.src(['./dist/'], {
            read: false
        })
        .pipe(clean());
});

gulp.task('isDev', function() {
    isDeploy = false;
});

gulp.task('isDeploy', function() {
    isDeploy = true;
});

// 开发环境
gulp.task('default', ['isDev', 'browser-sync']);

// 生产环境
gulp.task('deploy', ['isDeploy', 'html', 'sass', 'scripts', 'images']);