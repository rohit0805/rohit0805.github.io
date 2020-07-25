var Controller=(function(){
    var waitTime=false,scroll_limit,y,middle,keep;
    var breaks=[];
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
            y=window.scrollY;
            if(y>200){ 
                selector.shade.style.display="block";
                selector.mode.style.display="none"
            }
            else{
                selector.shade.style.display="none";
                selector.mode.style.display="block";
            }
        });
        selector.mode.addEventListener("click",function(e){
            ChangeColor();
        });
    };  
    var WaitControl=setInterval(()=>{
        waitTime=true;
    },50);
    var HideAllLayer=()=>{
        selector.box1.style.left='-50%';
        selector.box2.style.right='-50%';
        selector.box3.style.left='-50%';
        selector.box4.style.right='-50%';
        selector.box5.style.left='-50%';
        selector.box6.style.right='-50%';
    };
    var ShowAllLayer=()=>{
        selector.box1.style.left='50%';
        selector.box2.style.right='50%';
        selector.box3.style.left='50%';
        selector.box4.style.right='50%';
        selector.box5.style.left='50%';
        selector.box6.style.right='50%';
    };
    var CheckLayerOne=(left,y,right)=>{
        left=parseInt(left);
        right=parseInt(right);
        y=parseInt(y);
        middle=parseInt(((-left+right)/2+left).toFixed(2));
        if(y<middle){
            keep=parseInt((((y-left)/(middle-left))*50).toFixed(2))-50;
            selector.box1.style.left=`${keep}%`;
            selector.box2.style.right=`${keep}%`;
            selector.box3.style.left="-50%";
            selector.box4.style.right="-50%";
            
            //console.log(keep);
        }
        else{
            keep=(((y-middle)/(right-middle))*50).toFixed(2);
            selector.box1.style.left=`${keep}%`;
            selector.box2.style.right=`${keep}%`;
            //console.log(keep);
        }
    };
    var CheckLayerTwo=(left,y,right)=>{
        left=parseInt(left);
        right=parseInt(right);
        y=parseInt(y);
        middle=parseInt(((-left+right)/2+left).toFixed(2));
        selector.box1.style.left="50%";
        selector.box2.style.right="50%";
        selector.box5.style.left="-50%";
        selector.box6.style.right="-50%";
        //console.log(left,middle,right,y);
        if(y<middle){
            keep=parseInt((((y-left)/(middle-left))*50).toFixed(2))-50;
            selector.box3.style.left=`${keep}%`;
            selector.box4.style.right=`${keep}%`;
            //console.log(keep);
        }
        else{
            keep=(((y-middle)/(right-middle))*50).toFixed(2);
            selector.box3.style.left=`${keep}%`;
            selector.box4.style.right=`${keep}%`;
            //console.log(keep);
        }
    };
    var CheckLayerThree=(left,y,right)=>{
        left=parseInt(left);
        right=parseInt(right);
        y=parseInt(y);
        middle=parseInt(((-left+right)/2+left).toFixed(2));
        selector.box3.style.left="50%";
        selector.box4.style.right="50%";
        //console.log(left,middle,right,y);
        if(y<middle){
            keep=parseInt((((y-left)/(middle-left))*50).toFixed(2))-50;
            selector.box5.style.left=`${keep}%`;
            selector.box6.style.right=`${keep}%`;
            //console.log(keep);
        }
        else{
            keep=(((y-middle)/(right-middle))*50).toFixed(2);
            selector.box5.style.left=`${keep}%`;
            selector.box6.style.right=`${keep}%`;
            //console.log(keep);
        }
    };
    var FullControl=function(){
        window.addEventListener("scroll",function(e){
            if(waitTime){
                waitTime=false;
                y=window.scrollY;
                scroll_limit=parseInt(document.body.scrollHeight-screen.height);
                breaks[0]=(scroll_limit*0.125).toFixed(2);
                breaks[1]=(scroll_limit*0.375).toFixed(2);
                breaks[2]=(scroll_limit*0.625).toFixed(2);
                breaks[3]=(scroll_limit*0.875).toFixed(2);
                if(y<breaks[0]){
                    HideAllLayer();
                }
                else if(y>=breaks[0] && y<breaks[1]){
                    CheckLayerOne(breaks[0],y,breaks[1]);
                }
                else if(y>=breaks[1] && y<breaks[2]){
                    CheckLayerTwo(breaks[1],y,breaks[2]);
                }
                else if(y>=breaks[2] && y<breaks[3]){
                    CheckLayerThree(breaks[2],y,breaks[3]);
                }
                else{
                    ShowAllLayer();
                }
            }
        });
    };
    return{
        init:function(){
            FullControl();
            SetupEventList();
            ChangeColor();
        }
    }
})();

Controller.init();
