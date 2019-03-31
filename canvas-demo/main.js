var canvas = document.getElementById('xxx');
var context = canvas.getContext('2d');

autoSetCanvasSize(canvas);
listenToUser(canvas);

var eraserEnabled = false;
pen.onclick = function(){
  eraserEnabled = false;
  pen.classList.add('active');
  eraser.classList.remove('active');
};
eraser.onclick = function(){
  eraserEnabled = true;
  eraser.classList.add('active');
  pen.classList.remove('active');
};

black.onclick = function(){
  context.strokeStyle = 'black';
  black.classList.add('active');
  red.classList.remove('active');
  green.classList.remove('active');
  blue.classList.remove('active');
}

red.onclick = function(){
  context.strokeStyle = 'red';
  black.classList.remove('active');
  red.classList.add('active');
  green.classList.remove('active');
  blue.classList.remove('active');
}

green.onclick = function(){
  context.strokeStyle = 'green';
  black.classList.remove('active');
  red.classList.remove('active');
  green.classList.add('active');
  blue.classList.remove('active');
}

blue.onclick = function(){
  context.strokeStyle = 'blue';
  black.classList.remove('active');
  red.classList.remove('active');
  green.classList.remove('active');
  blue.classList.add('active');
}


function listenToUser(canvas){
  var lastPoint = {x:undefined,y:undefined};
  var using = false;
  // 特性检测
  if(document.body.ontouchstart !== undefined){
    // 触屏设备
    canvas.ontouchstart = function(aaa){
      //console.log(aaa.touches[0])
      var x = aaa.touches[0].clientX;
      var y = aaa.touches[0].clientY;
      using = true;
      if(eraserEnabled){
        context.clearRect(x-5,y-5,10,10);
      }else{
        lastPoint = {x:x,y:y};
        //console.log(lastPoint);
        //drawCircle(x,y,2);
      }
    };
  
    canvas.ontouchmove = function(aaa){
      var x = aaa.touches[0].clientX;
      var y = aaa.touches[0].clientY;
      if(!using){return;}
      if(eraserEnabled){
        context.clearRect(x-5,y-5,10,10);
      }else{
        var newPoint = {x:x,y:y};
        //drawCircle(x,y,2);
        drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y);
        lastPoint = newPoint;
      }
    };
  
    canvas.ontouchend = function(aaa){
      using = false;
    };
  }else{
    // 非触屏设备
    canvas.onmousedown = function(aaa){
      var x = aaa.clientX;
      var y = aaa.clientY;
      using = true;
      if(eraserEnabled){
        context.clearRect(x-5,y-5,10,10);
      }else{
        lastPoint = {x:x,y:y};
        //console.log(lastPoint);
        //drawCircle(x,y,2);
      }
    };
  
    canvas.onmousemove = function(aaa){
      var x = aaa.clientX;
      var y = aaa.clientY;
      if(!using){return;}
      if(eraserEnabled){
        context.clearRect(x-5,y-5,10,10);
      }else{
        var newPoint = {x:x,y:y};
        //drawCircle(x,y,2);
        drawLine(lastPoint.x,lastPoint.y,newPoint.x,newPoint.y);
        lastPoint = newPoint;
      }
    };
  
    canvas.onmouseup = function(aaa){
      using = false;
    };
  }
}

function drawCircle(x,y,radius){
  context.beginPath();
  context.arc(x,y,radius,0,Math.PI*2);
  context.fill();
}

function drawLine(x1,y1,x2,y2){
  context.beginPath();
  context.moveTo(x1,y1);
  context.lineWidth = 4;
  context.lineTo(x2,y2);
  context.stroke();
  context.closePath();
}

function autoSetCanvasSize(canvas){
  setCanvasSize();
  window.onresize = function(){
    setCanvasSize();
  };
  function setCanvasSize(){
    var pageWidth = document.documentElement.clientWidth;
    var pageHeight = document.documentElement.clientHeight;
    canvas.width = pageWidth;
    canvas.height = pageHeight;
  }
}