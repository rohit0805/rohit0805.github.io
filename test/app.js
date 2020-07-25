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
        mode:document.querySelector('.mode')
    };
    var SetupEventList=function(){
        window.addEventListener("scroll",function(e){
            var y=window.scrollY;
            if(y>200){
                selector.box1.style.left='50%';
                selector.box2.style.right='50%';    
                selector.shade.style.display="block";
            }
            else{
                selector.box1.style.left='-300px';
                selector.box2.style.right='-300px';
                selector.shade.style.display="none";
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
    };  
    return{
        init:function(){
            SetupEventList();
        }
    }
})();

Controller.init();
