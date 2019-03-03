var fs = require('fs')

var dirName = process.argv[2]

if (fs.existsSync(dirName)) {
	console.log('Error : dir exists.')
	
	process.exit(2)
}else{
	fs.mkdirSync("./" + dirName)
	process.chdir("./" + dirName)
	
	fs.mkdirSync('css')
	fs.mkdirSync('js')

	var str = "<!DOCTYPE>\n<title>Hello</title>\n<h1>Hi</h1>"
	fs.writeFileSync("index.html",str)
	str = "h1{color: red;}"
	fs.writeFileSync("css/style.css",str)
	str = 'var string = "Hello World"\nalert(string)'
	fs.writeFileSync("js/main.js",str)
	
	process.exit(0)
}
