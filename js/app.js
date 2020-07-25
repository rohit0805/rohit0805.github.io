var Controller=(function(){
    var selector={
        box1:document.querySelector('.box1'),
        box2:document.querySelector('.box2'),
        box3:document.querySelector('.box3'),
        box4:document.querySelector('.box4'),
        box5:document.querySelector('.box5'),
        box6:document.querySelector('.box6'),
        shade:document.querySelector('.shade'),
        flexer:document.querySelector('.flexer'),
        mode:document.querySelector('.mode'),
        middle_heading:document.querySelector('.middle h3'),
        middle_text:document.querySelector('.middle p'),
    };
    var ChangeColor=()=>{
        if(selector.flexer.style.backgroundColor=="")
                selector.flexer.style.backgroundColor="rgb(200,150,100)";
            else    
                selector.flexer.style.backgroundColor="";

            if(selector.middle_heading.style.color=="")
                selector.middle_heading.style.color="#111";
            else    
                selector.middle_heading.style.color="";
            
            if(selector.middle_text.style.color=="")
                selector.middle_text.style.color="#333";
            else    
                selector.middle_text.style.color="";
    
            if(selector.shade.style.backgroundImage=="")
                selector.shade.style.backgroundImage="linear-gradient(to bottom,rgb(200,150,100),transparent)";
            else    
                selector.shade.style.backgroundImage="";
            if(selector.mode.innerHTML=="LightMode"){
                selector.mode.innerHTML="DarkMode";
                selector.mode.style.color="";
            }
            else{
                selector.mode.innerHTML="LightMode";
                selector.mode.style.color="#ccc";
            }
    };
    var SetupEventList=function(){
        window.addEventListener("scroll",function(e){
            var y=window.scrollY;
            if(y>200){
                selector.box1.style.left='50%';
                selector.box2.style.right='50%';    
                selector.shade.style.display="block";
                selector.mode.style.display="none"
            }
            else{
                selector.box1.style.left='-300px';
                selector.box2.style.right='-300px';
                selector.shade.style.display="none";
                selector.mode.style.display="block";
            }
            if(y>400){
                selector.box3.style.left="50%";
                selector.box4.style.right="50%";
            }
            else{
                selector.box3.style.left="-300px";
                selector.box4.style.right="-300px";
            }
            if(y>600){
                selector.box5.style.left="50%";
                selector.box6.style.right="50%";
            }
            else{
                selector.box5.style.left="-300px";
                selector.box6.style.right="-300px";
            }
        });
        selector.mode.addEventListener("click",function(e){
            ChangeColor();
        });
    };  
    return{
        init:function(){
            SetupEventList();
            ChangeColor();
        }
    }
})();

Controller.init();
