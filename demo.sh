if [ -d $1 ]; then
  echo 'Error : dir exists'
  exit 1
else
  mkdir $1
  cd $1
  mkdir css js
  echo '<!DOCTYPE>' > index.html
  echo '<title>Hello</title>' >> index.html
  echo '<h1>Hi</h1>' >> index.html
  touch 
  css/style.css js/main.js
  exit 0
fi