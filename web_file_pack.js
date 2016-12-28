var fileConfig = require("./web_file_pack_config.js");
//console.log(fileConfig);
var fs = require('fs');
var cssmin = require('cssmin');
var compressor = require('yuicompressor');

// 压缩 css 文件
/*
var cssFilePaths = [];	
fileConfig.css.files.forEach(function(file){
	cssFilePaths.push(fileConfig.css.baseDir+file);
});

var cssContent = "";
cssFilePaths.forEach(function(path){
	var content = fs.readFileSync(path, encoding='utf8');
	cssContent+=content;
});
var compressedCssContent = cssmin(cssContent);	
// console.log(compressedCssContent);
fs.writeFile(fileConfig.css.outputPath+fileConfig.css.outputFileName,compressedCssContent,function(err){});
	*/
	
// 压缩 js 文件
var jsContent = "";
var jsFilePaths = [];
fileConfig.js.files.forEach(function(file){
	jsFilePaths.push(fileConfig.js.baseDir+file);
});
jsFilePaths.forEach(function(path){
	var content = fs.readFileSync(path, encoding='utf8');
	jsContent=jsContent+"\n"+content;
});




compressor.compress(jsContent, {
		charset: 'utf8',
		type: 'js'
		// nomunge: true
	}, function(err, data, extra) {
		if(err==null){
			console.log("compress finished ...");
		}
		fs.writeFile(fileConfig.js.outputPath+fileConfig.js.outputFileName,data,function(err){});

});
	

	
