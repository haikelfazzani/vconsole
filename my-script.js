$(function(){

	// red car proprieties
	var redCar = $("#vr");
	var redCar_initial_top = parseInt($("#vr").css("top"));
	var redCar_initial_left = parseInt($("#vr").css("left"));

	// yellow car proprieties
	var yellowCar = $("#vj");
	var yellowCar_initial_top = parseInt($("#vj").css("top"));
	var yellowCar_initial_left = parseInt($("#vj").css("left"));

	var ok = true;

	var score = 100;
	var pass = 0;
	
	// Functions
	function deplaceRedCar(){
		var newLeft = parseInt(Math.random()*180+redCar_initial_left);
		redCar.animate({top:'-150px'},4000,'linear',
		function(){
			redCar.css("top",redCar_initial_top);
			redCar.css("left",redCar_initial_left+newLeft);
			ok = true;
			deplaceRedCar();
		});
	}

	function moveBackground(){
		$(".fond").animate({top:'-=359'},1500,'linear',
		function(){
			$(".fond").css('top','0');
			moveBackground();
		});
	}

	function keyboardControls(){
		var yellowCar_initial_left = parseInt($("#vj").css("left"));
		$(document).keydown(function(event){
			if(event.which === 39 && yellowCar_initial_left < 280){
				yellowCar.css("left",yellowCar_initial_left+20);
			}

			if(event.which === 37 && yellowCar_initial_left > 48){
				yellowCar.css("left",yellowCar_initial_left-20);
			}
		});
	}

	function crashCar(){

		ycLeft = parseInt($('#vj').css('left'));
  		rcLeft = parseInt($('#vr').css('left'));
  		ycTop = parseInt($('#vj').css('top'));
  		rcTop = parseInt($('#vr').css('top'));
  		if (((ycLeft > rcLeft) 
  			&& (ycLeft < (rcLeft+48)) 
  			&& (rcTop > ycTop) 
  			&& (rcTop < (ycTop+155)) 
  			&& (ok === true))){

			$("#score").text("Score : " + (score-=10));
			$('#son')[0].play();
			ok = false;

		}else if(((ycLeft < rcLeft+155) && ycLeft < (rcLeft+48) && (ok === true))){

			$("#pass").text(pass++);
		}

	}
	// Game Functions
	function startGame(){
		keyboardControls();
		moveBackground();
		deplaceRedCar();
		crashCar();
	}
	// The game
	var moveBack;
	var game_over = false;
	$("#start-game").click(function(){
		moveBack = setInterval(function(){ startGame(); game_over = true; } ,20);

		$("#stop-game").click(function(){
			clearInterval(moveBack);
			game_over = false;
		});
	});

	$("#restart").click(function(){
		location.reload();
	});

});
