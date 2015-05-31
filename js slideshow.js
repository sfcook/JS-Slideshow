var imgX, imgY, winHeight, winWidth;
var showSettings=true;
var drawerLine=5;
var slideImages=[];
var slideCurrent=-1;
var slideDelay=1000;

function resizePic(){
	var picHeight;
	if(showSettings){
		picHeight=winHeight/2;
		$("#instructions").height(winHeight-picHeight);
		$("#links").height(winHeight-picHeight-50);
		$("#links").width(winWidth-50);
	}
	else{
		picHeight=winHeight-drawerLine;
		$("#instructions").height(drawerLine);
	}
	$("#picture").height(picHeight);
	$("#picture").width(winWidth);

	resizeImage();
};

function resizeImage(){
	var winX=winWidth;
	var winY=winHeight;
	//alert($(window).width());
	if(showSettings){
		winY=winY/2;
	}
	else{
		winY=winY-drawerLine;
	}

	if(imgY/imgX>winY/winX)
	{
		$("#image").height(winY);
		$("#image").width(imgX*(winY/imgY));
	}
	else if(imgY/imgX<winY/winX)
	{
		$("#image").height(imgY*(winX/imgX));
		$("#image").width(winX);
	}
	else
	{
		$("#image").height(winY);
		$("#image").width(winX);
	}
};

function showInstructions(){
	$("#instructions").children().show();
}

function hideInstructions(){
	$("#instructions").children().hide();
}

function parseLinks(){
	slideImages=$("#links").val().split("\n");
	for(i=0;i<slideImages.length;i++){
		if(slideImages[i]==""||typeof(slideImages[i])=='undefined'){
			slideImages.splice(i,1);
			i--;
		}
	}
	if(slideCurrent>=slideImages.length){
		slideCurrent=slideImages.length-1;
	}
}

function slideTimer(){
	window.setTimeout(nextSlide,slideDelay);
}
function nextSlide(){
	slideCurrent+=1;
	if(slideCurrent>=slideImages.length){
		slideCurrent=0;
	}
	$("#image").attr("src",slideImages[slideCurrent]);
	slideTimer();
}

function setSlideDelay(){
	var time=$("#time").val();
	if($.isNumeric(time)){
		slideDelay=time;
	}
	else{
		$("#time").val(slideDelay);
	}
}

$(document).ready(function(){
	winHeight=$(window).height();
	winWidth=$(window).width();
	resizePic();
	nextSlide();
	setSlideDelay();
	
	$("#image").on('load',function(){
		var image=document.getElementById("image");
		imgY=image.naturalHeight;
		imgX=image.naturalWidth;
		resizeImage();
	});
	$("#instructions").on('mouseenter',function(){
		showSettings=true;
		showInstructions();
		resizePic();
	});
	$("#instructions").on('mouseleave',function(){
		showSettings=false;
		hideInstructions();
		resizePic();
	});
	$("#time").change(function(){
		setSlideDelay();
	});
	$("#links").change(function(){
		parseLinks();
	});
});

$(window).on('resize',function(){
	winHeight=$(window).height();
	winWidth=$(window).width();
	resizePic();
});