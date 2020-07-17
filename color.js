var total=6;
var colors=generaterandomcolor(6);
var square=document.querySelectorAll(".square");
var pickedcolor=pickcolor();
var colordisplay=document.querySelector(".colordisplay");
var container_one=document.querySelector(".container-one");
var change=document.querySelector(".change");
var newcolor=document.querySelector(".newcolor");
var option1=document.querySelector(".option1");
var option2=document.querySelector(".option2");

option2.addEventListener("click",function(){
    option2.classList.add("selected");
    option1.classList.remove("selected");
    total=3;
    colors=generaterandomcolor(total);
    pickedcolor=pickcolor();
    colordisplay.textContent=pickedcolor;
    for(var i=0;i<square.length;i++){
        square[i].style.background=colors[i];
    }
    for(i=3;i<square.length;i++){
        square[i].style.display="none";
    }
    container_one.style.background="skyblue";
    change.textContent="";
});

option1.addEventListener("click",function(){
    option1.classList.add("selected");
    option2.classList.remove("selected");
    total=6;
    colors=generaterandomcolor(total);
    pickedcolor=pickcolor();
    colordisplay.textContent=pickedcolor;
    for(i=3;i<square.length;i++){
        square[i].style.display="block";
    }
    for(var i=0;i<square.length;i++){
        square[i].style.background=colors[i];
    }
    change.textContent="";
    container_one.style.background="skyblue";
});


colordisplay.textContent=pickedcolor;

for(var i=0;i<colors.length;i++){
    square[i].style.background=colors[i];
    square[i].addEventListener("click",function(){
        var clickedcolor=this.style.background;
        if(clickedcolor===pickedcolor){
            allcolor(clickedcolor);
            change.textContent="Correct"
            newcolor.textContent="Play Again?"

        }
        else{
            this.style.background="white";
            change.textContent="Try Again!!!"
        }
    });
}

function allcolor(clickedcolor){
    for(var i=0;i<square.length;i++){
        square[i].style.background=clickedcolor;
        container_one.style.background=clickedcolor;
    }
}

function pickcolor(){
    var random=Math.floor(Math.random()*colors.length);
    return colors[random];
}

function generaterandomcolor(num){
    var arr=[];
    for(var i=0;i<num;i++){
        arr[i]=randomcolor();
    }
    return arr;
}

function randomcolor(){
    var r=Math.floor(Math.random()*256);
    var g=Math.floor(Math.random()*256);
    var b=Math.floor(Math.random()*256);
    return "rgb("+r+", "+g+", "+b+")";
}

newcolor.addEventListener("click",function(){
    newcolor.textContent="New Color";
    colors=generaterandomcolor(total);
    pickedcolor=pickcolor();
    colordisplay.textContent=pickedcolor;
    for(var i=0;i<square.length;i++){
        square[i].style.background=colors[i];
    }
    container_one.style.background="skyblue";
    change.textContent="";
});