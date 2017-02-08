var gulp = require('gulp'),
svgSprite = require('gulp-svg-sprite'),
rename = require('gulp-rename'),
del = require('del');

var config = {  //gulp-sprite requires object literal
	mode: {
		css: {
			sprite: 'sprite.svg', //remove .css extension
			render: {
				css: {
					template: './gulp/templates/sprite.css'
				}
			}
		}
	}
}

gulp.task('beginClean', function() {
	return del(['./app/temp/sprite/css', './app/assets/images/sprites']);
});

gulp.task('createSprite', ['beginClean'], function(){
	return gulp.src('./app/assets/images/icons/**/*.svg')
		.pipe(svgSprite(config))
		.pipe(gulp.dest('./app/temp/sprite/'));
});

gulp.task('copySpriteGraphic', ['createSprite'], function(){
	return gulp.src('./app/temp/sprite/css/**/*.svg')
		.pipe(gulp.dest('./app/assets/images/sprites'));
});

gulp.task('copySpriteCSS', ['createSprite'], function(){ //[] dependencies
	return gulp.src('./app/temp/sprite/css/*.css')
		.pipe(rename('_sprite.css'))
		.pipe(gulp.dest('./app/assets/styles/modules'));
});

gulp.task('endClean', ['copySpriteGraphic', 'copySpriteCSS'], function() {
	return del('./app/temp/sprite');
});

gulp.task('icons', ['beginClean', 'createSprite', 'copySpriteGraphic', 'copySpriteCSS', 'endClean']);