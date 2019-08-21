function clock(dataArr){

  // 声明所需变量
  var canvas,ctx;
  // 图表属性
  var cWidth, cHeight, cMargin, cSpace;
  // 饼状图属性
  var radius,ox,oy;//半径 圆心
  var tWidth, tHeight;//图例宽高
  var posX, posY, textX, textY;
  var startAngle, endAngle;
  var totleNb;
  // 运动相关变量
  var ctr, numctr, speed;
  //鼠标移动
  var mousePosition = {};

  var clickData = [];

  //线条和文字
  var lineStartAngle,line,textPadding,textMoveDis;

  canvas = document.getElementById("chart");
  if(canvas && canvas.getContext){
    ctx = canvas.getContext("2d");
  }
  initChart();

  // 图表初始化
  function initChart(){
    // 图表信息
    cMargin = 20;
    cSpace = 40;

    canvas.width = canvas.parentNode.getAttribute("width")* 2 ;
    canvas.height = canvas.parentNode.getAttribute("height")* 2;
    canvas.style.height = canvas.height/2 + "px";
    canvas.style.width = canvas.width/2 + "px";
    cHeight = canvas.height - cMargin*2;
    cWidth = canvas.width - cMargin*2;

    //饼状图信息
    radius = cHeight*2/6;  //半径  高度的2/6
    ox = canvas.width/2 + cSpace;  //圆心
    oy = canvas.height/2;
    tWidth = 60; //图例宽和高
    tHeight = 20;
    posX = cMargin;
    posY = cMargin;   //
    textX = posX + tWidth + 15
    textY = posY + 18;
    startAngle = endAngle = 90*Math.PI/180; //起始弧度 结束弧度
    totleNb = 36;



    // 运动相关
    ctr = 1;//初始步骤
    numctr = 50;//步骤
    speed = 1.2; //毫秒 timer速度

    //指示线 和 文字
    lineStartAngle = -startAngle;
    line=70;
    textPadding=10;
    textMoveDis = 200;
  }


  //绘制动画
  pieDraw();
  function pieDraw(mouseMove){
    var rad = 2 * Math.PI / 24;
    var mrad = 2 * Math.PI / 24 / 60;
    ctx.font = 'normal 24px Arial';

    for (var n = 0; n < dataArr.length; n++){
      ctx.fillStyle = ctx.strokeStyle = "black";
      ctx.lineWidth=1;

      var startTime = dataArr[n][1];
      var endTiem = dataArr[n][2];

      var arr1 = startTime.split(":");
      var startAngle = rad * arr1[0] + mrad * arr1[1];

      var arr2 = endTiem.split(":");
      var endAngle =  rad * arr2[0] + mrad * arr2[1];

      var lineAngle = startAngle+(endAngle-startAngle)/2-Math.PI/2;


      ctx.beginPath();
      var  x0=ox+radius*Math.cos(lineAngle),//圆弧上线与圆相交点的x坐标
        y0=oy+radius*Math.sin(lineAngle),//圆弧上线与圆相交点的y坐标
        x1=ox+(radius+line)*Math.cos(lineAngle),//圆弧上线与圆相交点的x坐标
        y1=oy+(radius+line)*Math.sin(lineAngle),//圆弧上线与圆相交点的y坐标
        x2=x1,//转折点的x坐标
        y2=y1,
        linePadding=ctx.measureText(dataArr[n][4]).width+10; //获取文本长度来确定折线的长度

      ctx.moveTo(x0,y0);
      //对x1/y1进行处理，来实现折线的运动
      var yMove = y0+(y1-y0)*ctr/numctr;
      ctx.lineTo(x1,yMove);
      if(x1<=x0){
        x2 -= line;
        ctx.textAlign="right";
        ctx.lineTo(x2-linePadding,yMove);
        ctx.fillText(dataArr[n][4],x2-textPadding-textMoveDis*(numctr-ctr)/numctr,y2-textPadding);
        ctx.fillText(dataArr[n][1]+"-"+dataArr[n][2],x2-textPadding-textMoveDis*(numctr-ctr)/numctr,y2-textPadding+40);
      }else{
        x2 += line;
        ctx.textAlign="left";
        ctx.lineTo(x2+linePadding,yMove);
        ctx.fillText(dataArr[n][4],x2+textPadding+textMoveDis*(numctr-ctr)/numctr,y2-textPadding);
        ctx.fillText(dataArr[n][1]+"-"+dataArr[n][2],x2-textPadding-textMoveDis*(numctr-ctr)/numctr,y2-textPadding+40);
      }

      ctx.stroke();

    }

    //设置旋转
    ctx.save();
    ctx.translate(ox, oy);
    ctx.rotate((Math.PI*2/numctr)*ctr/2);

    ctx.beginPath();
    ctx.arc(0, 0 ,(radius+50)*ctr/numctr, 0, Math.PI*2, false);
    var grad = ctx.createRadialGradient(0, 0, radius+10, 0, 0, (radius+50));
    grad.addColorStop(0, "blue");
    grad.addColorStop(1, "#ffffff");
    ctx.fillStyle = grad;
    ctx.fill();

    //绘制一个圆圈
    ctx.strokeStyle = "rgba(0,0,0,"+ 0.5*ctr/numctr +")"
    ctx.beginPath();
    ctx.arc(0, 0 ,(radius+30)*ctr/numctr, 0, Math.PI*2, false);
    ctx.fillStyle = "#b6a2dd";
    ctx.fill();



    var oPI = Math.PI/360;
    /*画分针刻度*/
    ctx.beginPath();
    for(var i=0; i<120; i++){
      ctx.moveTo(0,0);
      ctx.arc(0,0,(radius+30),6*oPI*i,6*oPI*(i+1),false);
      ctx.strokeStyle = "#ffffff";
    }
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0 ,(radius+15)*ctr/numctr, 0, Math.PI*2, false);
    ctx.fillStyle = "#b6a2dd";
    ctx.fill();
    ctx.closePath();

    /*画时针刻度*/
    ctx.beginPath();
    ctx.lineWidth = 3;
    for(var i=0; i<24; i++){
      ctx.moveTo(0,0);
      ctx.arc(0,0,(radius+30),30*oPI*i,30*oPI*(i+1),false);
      ctx.strokeStyle = "#ffffff";
    }
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.arc(0, 0 ,(radius)*ctr/numctr, 0, Math.PI*2, false);
    ctx.fillStyle = "#b0e0e6";
    ctx.fill();


    clickData = [];
    for (var j = 0; j < dataArr.length; j++){
      var id = dataArr[j][0];
      var startTime = dataArr[j][1];
      var endTiem = dataArr[j][2];

      var arr1 = startTime.split(":");
      startAngle = Math.PI/2 + rad * arr1[0] + mrad * arr1[1];

      var arr2 = endTiem.split(":");
      endAngle = Math.PI/2 + rad * arr2[0] + mrad * arr2[1];

      var data = {id:id,start:startAngle,end:endAngle};
      clickData.push(data);
      //绘制饼图background-image: linear-gradient(to right, #43e97b 0%, #38f9d7 100%);
      if((dataArr[j][3] || dataArr[j][3]== "") && dataArr[j][5]==1){ dataArr[j][3]="#62bc6b"; }
      else if((dataArr[j][3] || dataArr[j][3]== "") && dataArr[j][5]==0){ dataArr[j][3]="#d18269"; }
      ctx.beginPath();
      ctx.moveTo(0,0);
      ctx.arc(0, 0, radius*ctr/numctr, startAngle, endAngle, false); //绘制圆弧
      var grad = ctx.createRadialGradient(0, 0, 30, 0, 0, radius*ctr/numctr);
      grad.addColorStop(0, "#ffffff");
      grad.addColorStop(1, dataArr[j][3]);
      ctx.fillStyle = grad;
      ctx.strokeStyle = "#ffffff";

      //ctx.fillStyle = dataArr[j][3];
      if(mouseMove && ctx.isPointInPath(mousePosition.x*2, mousePosition.y*2)){
        ctx.globalAlpha = 0.7;
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      ctx.globalAlpha = 1;
    }



    var rem = radius/100;
    ctx.font = 10 * rem + 'px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = "#4b84bc";//时钟数字颜色
    ctx.textBaseline = 'middle';
    ctx.rotate(Math.PI);
    var deg = 2 * Math.PI / 24;
    for (var i = 1; i < 25; i++) {
      var x1 = Math.sin(i * deg);
      var y1 = -Math.cos(i * deg);
      ctx.fillText(i, x1 * ((radius+30)*5/6), y1 * ((radius+30)*5/6));
    }


    ctx.beginPath();
    ctx.arc(0, 0 ,(radius/3)*ctr/numctr, 0, Math.PI*2, false);
    ctx.fillStyle = "#f2f193";
    ctx.fill();


    ctx.beginPath();
    ctx.arc(0, 0 ,(radius/3)-10, 0, Math.PI*2, false);
    ctx.fillStyle = "#fcffba";
    ctx.fill();

    var now = new Date();
    var hour = now.getHours();
    var minutes = now.getMinutes();
    var ps = "am";
    if(hour>12) ps = "pm";
    if(minutes<10) minutes = "0"+minutes;
    var hhmm = hour+":"+minutes+ " "+ps;

    var a = ["日", "一", "二", "三", "四", "五", "六"];
    var week = now.getDay();
    var weekStr = "周"+ a[week]+"·"+now.getDate();

    ctx.font = 10 * rem + 'px Arial';
    ctx.textAlign = 'center';
    ctx.fillStyle = "#d17836";
    ctx.textBaseline = 'middle';
    ctx.fillText(hhmm, 0, -20);
    ctx.fillText(weekStr, 0, 20);


    ctx.restore();

    if(ctr<numctr){
      ctr++;
      setTimeout(function(){
        ctx.clearRect(-canvas.width, -canvas.height,canvas.width*2, canvas.height*2);
        //drawMarkers();
        pieDraw();
      }, speed*=1.085);
    }
  }

  //监听鼠标移动
  var mouseTimer = null;
  canvas.addEventListener("mousemove",function(e){
    e = e || window.event;
    if( e.offsetX || e.offsetX==0 ){
      mousePosition.x = e.offsetX;
      mousePosition.y = e.offsetY;
    }else if( e.layerX || e.layerX==0 ){
      mousePosition.x = e.layerX;
      mousePosition.y = e.layerY;
    }

    clearTimeout(mouseTimer);
    mouseTimer = setTimeout(function(){
      ctx.clearRect(0,0,canvas.width, canvas.height);
      //drawMarkers();
      pieDraw(true);
    },10);
  });

  canvas.addEventListener('click', function(e){
    e = e || window.event;
    if( e.offsetX || e.offsetX==0 ){
      mousePosition.x = e.offsetX;
      mousePosition.y = e.offsetY;
    }else if( e.layerX || e.layerX==0 ){
      mousePosition.x = e.layerX;
      mousePosition.y = e.layerY;
    }
    // console.log(mousePosition.x*2+"|"+ox);
    // console.log(dataArr);
  });

}
export default clock;
