var DataController=(function(){
    var Testimonial=function(id,name,rating,about){
        this.id=id;
        this.name=name;
        this.rating=rating;
        this.about=about;
    };
    var humans=[new Testimonial(1,"Kakashi Hugati",5,"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic, blanditiis natus incidunt porro ipsam voluptate sequi impedit ea sint eum quaerat maiores illo exercitationem consequuntur officia voluptates eius aut, in similique molestiae unde? Corrupti totam quibusdam tenetur iure libero voluptatibus, facilis nulla? Dicta laboriosam reprehenderit quidem eos recusandae incidunt at sapiente soluta. Exercitationem, quisquam impedit veniam rem doloribus, ipsa debitis commodi id rerum excepturi ipsam. Ullam numquam non iste dolorum dolorem quidem earum ipsum ad beatae? Nulla, et illo. Quibusdam?"),
                new Testimonial(2,"Hinata Rogue",4,"Hic, blanditiis natus incidunt porro ipsam voluptate sequi impedit ea sint eum quaerat maiores illo exercitationem consequuntur officia voluptates eius aut, in similique molestiae unde? Corrupti totam quibusdam tenetur iure libero voluptatibus, facilis nulla? Dicta laboriosam reprehenderit quidem eos recusandae incidunt at sapiente soluta. Exercitationem, quisquam impedit veniam rem doloribus, ipsa debitis commodi id rerum excepturi ipsam."),
                new Testimonial(3,"Metal Smasher",4,"Consequuntur officia voluptates eius aut, in similique molestiae unde? Corrupti totam quibusdam tenetur iure libero voluptatibus, facilis nulla? Dicta laboriosam reprehenderit quidem eos recusandae incidunt at sapiente soluta."),
                new Testimonial(4,"Naruto Uzumaki",3,"Consequuntur officia voluptates eius aut, in similique molestiae unde? Corrupti totam quibusd,"),
                new Testimonial(5,"Kakashi Uchiha",4,"Lorem ipsum, dolor sit amet consectetur adipisicing elit. Hic, blanditiis natus incidunt porro ipsam voluptate sequi impedit ea sint eum quaerat maiores illo exercitationem consequuntur officia voluptates eius aut, in similique molestiae unde? Corrupti totam quibusdam tenetur iure libero voluptatibus, facilis nulla? Dicta laboriosam."),
                new Testimonial(6,"Winni Rachi",2,"Lorem ipsum, Hic, blanditiis natus incidunt porro ipsam voluptate sequi impedit ea sint eum quaerat maiores illo exercitationem consequuntur officia voluptates eius aut, in similique molestiae unde? Corrupti totam quibusdam tenetur iure libero voluptatibus, facilis nulla? Dicta laboriosam reprehenderit.")
            ];
    return{ 
        getData:function(){
            return humans;
        }
    };
})();

var UIController=(function(DataCtrl){
    var humans=DataCtrl.getData();
    var counter=Math.floor(Math.random()*humans.length);
    return{
        AddTestItem:function(e,str){
            var html,newhtml;
            if(document.querySelector(".testimonial"))
                document.querySelector(".testimonial").remove();
            html='<div class="testimonial"><div class="img"><img src="./dist/img/human-%id%.jpg"></div><div class="name">%name%</div><div class="rating">%rating%</div><div class="about">%about%</div>';
            if(str==="left"){
                counter--;
                if(counter<0){
                    counter=humans.length-1;
                }
            }
            else{
                counter++;
                if(counter>=humans.length){
                    counter=0;
                }
            }
            newhtml=html.replace("%id%",humans[counter].id);
            newhtml=newhtml.replace("%name%",humans[counter].name);
            var str='<i class="fas fa-star"></i>',s="";
            for(var i=0;i<humans[counter].rating;i++){
                s+=str;
            }
            newhtml=newhtml.replace("%rating%",s);
            newhtml=newhtml.replace("%about%",humans[counter].about);

            document.querySelector(".third").insertAdjacentHTML('beforeend',newhtml);
        }
    };
})(DataController);

var Controller=(function(UICtrl){

    var SetupEventListener=function(){
        //1.setting the event for left and right arrow
        document.querySelector(".arrow_left").addEventListener("click",function(event){
            UICtrl.AddTestItem(event,"left");
        });
        document.querySelector(".arrow_right").addEventListener("click",function(event){
            UICtrl.AddTestItem(event,"right");
        });    
    };  
    return{
        init:function(){
            UICtrl.AddTestItem();
            SetupEventListener();
        }
    };
})(UIController);

Controller.init();