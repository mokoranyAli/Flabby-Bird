    ////////////////////////////////////////////////////////////////vriables
    var container = $("#container");
    var bird = $("#bird");
    var pole = $('.pole');
    var pole_1 = $('#pole_1');
    var pole_2 = $('#pole_2');
    var score = $('#score');
    var speed_span = $('#speed');
    var restart_btn = $('#restart_btn');
    var pole_initial_position = parseInt(pole.css('right'));
    var pole_initial_height = parseInt(pole.css('height'));
    var speed = 10;
    var move=false;
    var sco=0;
    var gameover=false;
    var count=1;
    var speedcount=0;
    var y = parseInt(bird.css("top"));
    speed_span.text(speed);
    //////////////////////////////////////////////////////////////////functions
    function downBird()
    {
        
        if(y > parseInt(container.height()) - parseInt(bird.height()))
        {
         stop();
        }
        y+=5;
        bird.css("top", y );
    }
    function upBird()
    {
        
        if(y <= container.outerHeight()-parseInt(container.css("height")))
        {
            y = 0;
            bird.css("top", y );
            stop();
           
        } 
        else
        {
            y-= 10;
            bird.css("top", y );
        }
    }
   
////////////////////////crush
     function crush()
     {
        setTimeout(function() {
            bird.css("display","none");
          },setTimeout(function() {
            bird.css("display","block");
          },setTimeout(function() {
            bird.css("display","none");
          },setTimeout(function() {
            bird.css("display","block");
          }
         
          ,200)
         
          ,200)
         
          ,200)
          ,200);
         
     }
    //////////////////////////////////////////////////////////////////event listeners
    document.body.addEventListener("keydown", function(e){
        if(e.keyCode === 32 && gameover===false &&move===false)
        {
            move=setInterval(upBird,40);
        }
    });
    document.body.addEventListener("keyup", function(e){
        if(e.keyCode === 32)
        {
            clearInterval(move);
            move=false;
        }
    });
    
    /////////////////////////////////////////////////////code

    var game = setInterval(function ()
     {    if((collision(bird,pole_1)||collision(bird,pole_2)))
            {
                stop();
            }
            
         var current_position = parseInt(pole.css('right'));
          if(current_position > parseInt(container.css("width")))    
          {
            var newheight= parseInt(Math.random()*100);
            pole_1.css('height',pole_initial_height+newheight);
                pole_2.css('height',pole_initial_height-newheight);  
                   
            
       sco=sco+1;
       score.text(sco);    
            
                   
            if(sco===5*count)
              {
                   count=count+1; 
                   speedcount=speedcount+2;
                  $('#level').text(count-1);
                  speed=speed+speedcount;
                  speed_span.text(speed);   
          }
          
          current_position=pole_initial_position;
        }
         current_position=current_position+speed;
        pole.css("right",current_position);
        if(move===false)
        
       downBird();
    },40);
    function stop()
    {
        clearInterval(game);
        gameover=true;
        restart_btn.slideDown(200);
    }
    restart_btn.click(function(){
        localStorage.getItem(speed);
           location.reload();
           
                       });

 ///////////////////////////////////////////////////////////////collision
                       function collision($div1, $div2) {
                        var x1 = $div1.offset().left;
                        var y1 = $div1.offset().top;
                        var h1 = $div1.outerHeight(true);
                        var w1 = $div1.outerWidth(true);
                        var b1 = y1 + h1;
                        var r1 = x1 + w1;
                        var x2 = $div2.offset().left;
                        var y2 = $div2.offset().top;
                        var h2 = $div2.outerHeight(true);
                        var w2 = $div2.outerWidth(true);
                        var b2 = y2 + h2;
                        var r2 = x2 + w2;
                
                        if (b1 < y2 || y1 > b2 || r1 < x2 || x1 > r2) return false;
                        return true;
                    }