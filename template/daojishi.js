    var daojishi=document.getElementById("daojishi"),
      endTime=new Date(2016,05,2,00,00,00);

  function TimeFun(){
      var startTime=new Date(),
        _lT=(endTime-startTime)/1000;
        if(_lT>0){
          var _day=Math.floor(_lT/86400);
          daojishi.innerHTML=_day;
        }
  }
  TimeFun()