const len=10;
var data=document.querySelectorAll('.figure img');
var pos=0,prev;


function ShowNext(e,pos,prev){
  data[prev].classList.remove('active');
  data[pos].classList.add('active');
}

document.querySelector('.fa-chevron-right').addEventListener('click',(e)=>{
  prev=pos;
  pos++;
  if(pos>=len){
    pos=0;
  }
  ShowNext(e,pos,prev);
});


document.querySelector('.fa-chevron-left').addEventListener('click',(e)=>{
  prev=pos;
  pos--;
  if(pos<0){
    pos=9;
  }
  ShowNext(e,pos,prev);
});