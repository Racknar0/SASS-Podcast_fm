const{ src, dest, watch, series } = require('gulp');  //se añade la función src y dest, watch y series

//compilar CSS
const sass = require('gulp-sass')(require('sass')) // agrega las funciones de sass y gulp-sass
const plumber = require('gulp-plumber'); //llamar la función plumber
// aplicar Purge CSS 
const purgescc = require('gulp-purgecss')
const rename = require('gulp-rename')

// imágenes
const imagemin = require('gulp-imagemin')  //Llamar función image-min


/* FUNCIÓN DE COMPILAR */
function css(done){

    src('src/scss/app.scss')  // Identificar ubicación del archivo principal 
        .pipe(plumber()) //se instala el plumber antes de compilar
        .pipe( sass() )  //Compilar Sass
        .pipe( dest('build/css') ) // Exportar a una ubicación 
    done();
}

/* FUNCION APLICAR PURGE CSS */
function cssbuild( done) {
    src ('build/css/app.css')
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(purgescc({
            content: ['index.html']
        }))
        .pipe(dest('build/css'))

    done();
}


/* FUNCION DEL WATCH */
function dev(done) {

    watch('src/scss/**/*.scss', css)
    done();
}


/* FUNCION DE OPTIMIZAR IMAGENES */
function imagenes(done) {
    src('src/img/**/*') //seleccionar ruta
        .pipe( imagemin( {optimizationLevel: 3} ) )
        .pipe(dest('build/img'))

    done(); //callback
}


exports.dev = dev;  //llamar dev
exports.css = css; //llamar css
exports.imagenes = imagenes;  //llamar imagenes
exports.default = series( imagenes,  css, dev);  //llamar defaul comando gulp
exports.build = series( cssbuild )



