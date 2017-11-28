$(function(){

  // Set of variables
  var fondGame      = $(".fond");

  var redCar        = $("#vr");
  var redCarTop     = parseInt($("#vr").css("top"));      // 415px
  var redCarLeft    = parseInt($("#vr").css("left"));    // 60px

  var yellowCar     = $("#vj");
  var yellowCarTop  = parseInt(yellowCar.css("top"));   // 10
  var yellowCarLeft = parseInt(yellowCar.css("left")); // 48

  var scoreField = $("#info");
  var score = 100;
  var passScore = 0;

  var ok = true;
  var game_over = false;
  //console.log(redCarLeft + " "  +redCarTop);

  // random the red car movement 
  function randomCar(){

    var newLeft = parseInt(Math.random()*180+redCarLeft);
    redCar.animate({top:"-=900"},3500,'linear',
      function(){   
        redCar.css("top",redCarTop);
        redCar.css("left",redCarLeft+newLeft);
        var ok = true;
        randomCar();
      }
    );
  }
  

  // move the background of the game
  function deplaceFond(){

    fondGame.animate({top:"-=359"},2000,"linear",
      function(){ 
        fondGame.css("top",0); 
      deplaceFond(); 
    });
  }

  // car movement left/right
  function carMovement(){
    $(document).keydown(function(e){
      yellowCarLeft = parseInt(yellowCar.css("left"));
      if(e.which === 39 && yellowCarLeft < 283){
        yellowCar.css("left",yellowCarLeft + 20);
      }
    });

      $(document).keydown(function(e){
      if(e.which === 37 && yellowCarLeft > 48){
        yellowCar.css("left",yellowCarLeft - 20);
      }
    });
  }
  carMovement();

  // crash car + score increasing
  function crashCar(){
    var newScore = 0;
    var ycLeft  = parseInt($('#vj').css('left'));      // yellow car 
    var ycTop   = parseInt($('#vj').css('top'));

    var rcLeft  = parseInt($('#vr').css('left'));      // red car
    var rcTop   = parseInt($('#vr').css('top'));

    //console.log(rcLeft + " " + ycLeft + " "+rcTop);


      if ((rcLeft > ycLeft && rcLeft < (ycLeft+80) 
        && rcTop > ycTop && rcTop < (ycTop+250) && ok == true) 
      || (ycLeft > rcLeft && ycLeft < (rcLeft+80) 
        && rcTop > ycTop && rcTop < (ycTop+250) && ok == true)){
                  
          $('#son')[0].play();
          scoreField.text(score-=10);
          //console.log(scoreField.text());
      }
      else if((rcTop > ycTop+150) && (rcLeft > ycLeft+10) && (ok == true)){

          $("#pass-score").text(passScore+=1);

      }
  }

  $("#restart").click(function(){
    location.reload(true);
  });


  function startGame(){
      randomCar();
      setInterval(crashCar, 1000);
      deplaceFond();
  }

  startGame();
  
  //console.log($("#info").text());
  
});