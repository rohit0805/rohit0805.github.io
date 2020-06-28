//BudgetController
var BudgetController=(function(){
    //create Expense object
    var Expense=function(id,description,value){
        this.id=id;
        this.description=description;
        this.value=value;
        this.percentage=-1;
    };
    Expense.prototype.calperc=function(totalIncome){
        if(totalIncome>0){
            this.percentage=Math.round((this.value/totalIncome)*100);
        }
        else{
            this.percentage=-1;
        }
    };
    //create Income object
    var Income=function(id,description,value){
        this.id=id;
        this.description=description;
        this.value=value;
    };
    //data structure for storing
    var data={
        allItems:{
            inc:[],
            exp:[]
        },
        totals:{
            inc:0,
            exp:0
        },
        budget:0,
        percentage:-1
    };
    var calculateTotal=function(type){
        var sum=0;
        data.allItems[type].forEach(function(current,index,array){
            sum+=current.value;
        });
        data.totals[type]=sum;
    };

    return{
        addItem:function(type,description,value){
            var newItem,id;
            //calculate the id
            if(data.allItems[type].length>0){
                id=data.allItems[type][data.allItems[type].length-1].id+1;
            }
            else{
                id=0;
            }
            //check for the type
            if(type==='exp'){
                newItem=new Expense(id,description,value);
            }
            else{
                newItem=new Income(id,description,value);
            }
            data.allItems[type].push(newItem);
            return newItem;
        },
        calculateBudget:function(){
            calculateTotal('inc');
            calculateTotal('exp');
            data.budget=data.totals.inc-data.totals.exp;
            //calculate the percentage
            if(data.totals.inc>0){
                data.percentage=Math.round((data.totals.exp/data.totals.inc)*100);
            }
            else{
                data.percentage="---";
            }
        },
        getbudget:function(){
            return{
                budget:data.budget,
                income:data.totals.inc,
                expenses:data.totals.exp,
                percentage:data.percentage
            }
        },
        deleteItem:function(type,id){
            var ids,index;
            id=parseInt(id);
            ids=data.allItems[type].map(function(current){
                return current.id;
            });
            index=ids.indexOf(id);
            if(index!==-1){
                data.allItems[type].splice(index,1);
            }
        },
        calculatePercentages:function(){
            data.allItems.exp.forEach(function(current){
                current.calperc(data.totals.inc);
            });
        },
        getPercentages:function(){
            var allPerc=data.allItems.exp.map(function(current){
                return current.percentage;
            });
            return allPerc;
        }
    }
})();

//UIController
var UIController=(function(){
    var DOMstring={
        type:'.input_type',
        description:'.input_description',
        value:'.input_value',
        button:'.input_btn',
        input_container:'.income_list',
        expenses_container:'.expenses_list',
        budget_value:'.budget_value',
        income_value:'.income_value',
        expenses_value:'.expenses_value',
        expenses_percentage:'.expenses_percentage',
        container:'#container',
        small_perc:'.data_expenses_percentage',
        month:'.display_month',
        display_income:'.display_income',
        display_expenses:'.display_expenses',
        income_title:'.income_title',
        expenses_title:'.expenses_title'
    };
    var formatNumber=function(num,type){
        var numSplit,sign,int,decimal;
        num=Math.abs(num);
        num=num.toFixed(2);
        numSplit=num.split('.');
        int=numSplit[0];
        decimal=numSplit[1];
        
        //changing the number in comma format
        var keep=commaformat(int);

        type==='exp'?sign='-':sign='+';
        return sign+keep+'.'+decimal;
    };

    var commaformat=function(int){
        var len=int.length,keep="",i,j;
        if(len>3){
            if(len%2===0){
                keep+=int[0];
                keep+=',';
                i=1;
            }
            else{
                keep+=int[0];
                keep+=int[1];
                keep+=',';
                i=2;
            }
            for(j=i;j<len;j=j+2){
                if(len-j>3){
                    keep+=int[j];
                    keep+=int[j+1];
                    keep+=',';
                }
                else{
                    break;
                }
            }
            for(i=j;i<len;i++){
                keep+=int[i];
            }
        }
        else{
            keep=int;
        }
        return keep;
    }

    return{
        getDOM:function(){
            return DOMstring;
        },
        getInput:function(){
            return{
                type:document.querySelector(DOMstring.type).value,
                description:document.querySelector(DOMstring.description).value,
                value:parseFloat(document.querySelector(DOMstring.value).value)
            }
        },
        addListItem:function(obj,type){
            var html,newhtml,element;
            if(type==='inc'){
                html='<div class="data" id="inc-%id%"><div class="data_description">%description%</div><div class="data_value income_color">%value%</div><div class="data_percentage income_color">---</div><div class="data_delete"><button class="data_delete_btn"><i class="fas fa-times-circle"></i></button></div></div>'
                element=DOMstring.input_container;
            }
            else{
                html='<div class="data" id="exp-%id%"><div class="data_description">%description%</div><div class="data_value expense_color">%value%</div><div class="data_percentage data_expenses_percentage expense_color">---</div><div class="data_delete"><button class="data_delete_btn"><i class="fas fa-times-circle"></i></button></div></div>'
                element=DOMstring.expenses_container;
            }
            //replacing an html with the obj data
            newhtml=html.replace('%id%',obj.id);
            newhtml=newhtml.replace('%description%',obj.description);
            newhtml=newhtml.replace('%value%',formatNumber(obj.value,type));

            //add the newhtml to the index.html
            document.querySelector(element).insertAdjacentHTML('beforeend',newhtml);
        },
        clearFields:function(){
            var fields=document.querySelectorAll(DOMstring.description+','+DOMstring.value);
            fields=Array.from(fields);
            fields.forEach(function(current,index,array){
                current.value="";
            });
            fields[0].focus();
        },
        displayBudget:function(obj){
            var type;
            obj.budget>=0?type='inc':type='exp';
            document.querySelector(DOMstring.budget_value).innerHTML=formatNumber(obj.budget,type);
            document.querySelector(DOMstring.income_value).innerHTML=formatNumber(obj.income,'inc');
            document.querySelector(DOMstring.expenses_value).innerHTML=formatNumber(obj.expenses,'exp');
            if(obj.percentage>=0)
                document.querySelector(DOMstring.expenses_percentage).innerHTML=obj.percentage+'%';            
            else{
                document.querySelector(DOMstring.expenses_percentage).innerHTML='---';
            }
        },
        deleteListItem:function(id){
            var element=document.querySelector("#"+id);
            element.parentNode.removeChild(element);
        },
        displayPercentage:function(allPerc){
            var fields=document.querySelectorAll(DOMstring.small_perc);
            fields=Array.from(fields);
            fields.forEach(function(current,index){
                if(allPerc[index]>0)
                    current.textContent=allPerc[index]+"%";
                else    
                    current.textContent="---";
            });
        },
        changedType:function(){
            var fields=document.querySelectorAll(DOMstring.type+','+DOMstring.description+','+DOMstring.value);
            fields=Array.from(fields);
            fields.forEach(function(current,index,array){
                current.classList.toggle('color_changed');
            });
            document.querySelector(DOMstring.button).classList.toggle('color_button');
        
            if(document.querySelector(DOMstring.type).value==='inc'){
                document.querySelector(DOMstring.description).placeholder="Add Income description";
            }
            else{
                document.querySelector(DOMstring.description).placeholder="Add Expenses description";
            }
        },
        displayMonth:function(){
            var target=document.querySelector(DOMstring.month);
            var now=new Date();
            var arr=['January','February','March','April','May','June','July','August','September','October','November','December'];
            var str="Available Budget of "+arr[now.getMonth()]+" "+now.getFullYear();
            target.textContent=str;
        }
    }
})();


//AppController
var Controller=(function(BudgetCtrl,UICtrl){

    var updatePercentage=function(){
        //1.Calculate the percentages
        BudgetCtrl.calculatePercentages();
        //2.Get the percentages
        var allPerc=BudgetCtrl.getPercentages();
        //3.display the percentges
        UICtrl.displayPercentage(allPerc);
    };
    var updateBudget=function(){
        //calculate the budget
        BudgetCtrl.calculateBudget();
        //get the budget
        var budget=BudgetCtrl.getbudget();
        //update the budget in the UI
        UICtrl.displayBudget(budget);
    };

    var ctrlAddItem=function(){
        var input,newItem;
        //1.get the input 
        input=UICtrl.getInput();
        if(input.description!=='' && !isNaN(input.value) && input.value>0){
            //2.store the data 
            newItem=BudgetCtrl.addItem(input.type,input.description,input.value);
            //3.put the data in the UI
            UICtrl.addListItem(newItem,input.type);
            //4.clear the fields
            UICtrl.clearFields();
            //5.Update the budget
            updateBudget();
            //6.Update the Percentage
            updatePercentage();
        }
    };
    var ctrlDeleteItem=function(){
        var splitId,id,type,itemId=event.target.parentNode.parentNode.parentNode.id;
        if(itemId){
            splitId=itemId.split('-');
            type=splitId[0];
            id=splitId[1];

            //1.delete the item from the budget data-structure
            BudgetCtrl.deleteItem(type,id);
            //2.Delete the item from the UI
            UICtrl.deleteListItem(itemId);
            //3.Update the Budget and show the budget
            updateBudget();
            //4.Update Percentage
            updatePercentage();
        }
    }

    var SetupEventListener=function(){
        var dom=UICtrl.getDOM();
        //clicking and enter key dom manipulation
        document.querySelector(dom.button).addEventListener('click',function(){
            ctrlAddItem();
        });

        document.addEventListener("keypress",function(event){
            if(event.keyCode===13 || event.which===13){
                ctrlAddItem();
                //because by default the type 'click' also get executed by enter key
                event.preventDefault();
            }
        });

        document.querySelector(dom.container).addEventListener('click',function(event){
            ctrlDeleteItem();
        });

        //for the input-tags
        document.querySelector(dom.type).addEventListener('change',UICtrl.changedType);

        //some extra effect for income_title and expenses_title
        document.querySelector(dom.income_title).addEventListener("mouseover",function(){
            document.querySelector(dom.display_income).classList.toggle('zoom'); 
            setTimeout(function(){
                document.querySelector(dom.display_income).classList.remove('zoom');
            },400);
            
        });
        
        document.querySelector(dom.expenses_title).addEventListener("mouseover",function(){
            document.querySelector(dom.display_expenses).classList.toggle('zoom'); 
            setTimeout(function(){
                document.querySelector(dom.display_expenses).classList.remove('zoom');
            },400);
        });
    };

    return{
        init:function(){
            //display month 
            UICtrl.displayMonth();
            //default setup
            UICtrl.displayBudget({budget:"0.00",income:"0.00",expenses:"0.00",percentage:'---'})
            //setting up the event listener
            SetupEventListener();
        }
    }

})(BudgetController,UIController);

Controller.init();
