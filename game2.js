function load_images() 
{
    enemy_image = new Image;
    enemy_image.src = "enemy.png";
    
    player_image = new Image;
    player_image.src = "player_img.png";
    
    gem_image = new Image;
    gem_image.src = "gem.png";
    
     trophy_image = new Image;
    trophy_image.src = "trophy.png";

}

function isOverlap(rect1,rect2)
{
   if (rect1.x < rect2.x + rect2.w && rect1.x + rect1.w > rect2.x &&
   rect1.y < rect2.y + rect2.h && rect1.y + rect1.h > rect2.y)
   {
   return true; // collision detected!
   }
   return false;
}


function init() 
{
    canvas = document.getElementById("mycanvas");
    console.log(canvas);

    W = 700;
    H = 400;

    canvas.width = W;
    canvas.height = H;
    game_over = "false";

    pen = canvas.getContext('2d');
    console.log(pen);

    e1 = {
        x: 150,
        y: 50,
        w: 60,
        h: 60,
        speed: 20,
    };
    e2 = {
        x: 300,
        y: 50,
        w: 60,
        h: 60,
        speed: 30,
    };
    e3 = {
        x: 450,
        y: 50,
        w: 60,
        h: 60,
        speed: 40,
    };
    
    enemy = [e1, e2, e3]; // array of enemies
    
    
    player = {
    
         x : 20,
         y : H/2,
         w : 60,
         h : 60,
         speed : 20,
         moving : "false",
         score : 0,
    }
    
    gem = {
    
         x : W-100,
         y : H/2,
         w : 60,
         h : 60,
    }
    
    life = {   
        x : W-170,
        y : 15,
        w : 160,
        h : 18,
    }
    
 
    canvas.addEventListener('mousedown',function(){
        
        console.log("mouse Pressed");
        player.moving = true;
    });
    
    canvas.addEventListener('mouseup',function(){
        
        console.log("mouse Released");
        player.moving = false;
    });
    
}

function draw() {
    pen.clearRect(0, 0, W, H);
    
    pen.fillStyle = "white";
    pen.fillRect(530,15,160,18);
    pen.fillStyle = "green";
    pen.fillRect(life.x,life.y,life.w,life.h);
    
    pen.drawImage(player_image,player.x,player.y,player.w,player.h);
    pen.drawImage(gem_image,gem.x,gem.y,gem.w,gem.h);
    pen.drawImage(trophy_image,10,10,100,90);
    
    for (let i = 0; i < enemy.length; i++) 
    {
        pen.drawImage(enemy_image, enemy[i].x, enemy[i].y, enemy[i].w, enemy[i].h);
    }
    
    pen.fillStyle = "green";
    pen.font = "25px roboto";
    pen.fillText(player.score,42,40);
    pen.fillStyle = "purple";
    pen.fillText("health :",450,32);
}

function update() {

    if(isOverlap(player,gem))
        {
            console.log("You Won");
            game_over = true;
        }
    
    for( let i = 0; i < enemy.length; i++)
        {
            if(isOverlap(player,enemy[i]))
        {
            life.w -= 10;   
        }
            if(life.w < 0)
                {
                    console.log("life_over");
                    game_over = true;
                }
        }
    
    for(let i = 0; i < enemy.length ;i++)
    {
        enemy[i].y += enemy[i].speed;
        if(enemy[i].y > H-enemy[i].h || enemy[i].y < 0)
            {
                enemy[i].speed *= -1;
            }
    }
    
    if(player.moving == true)
        {
            player.x += player.speed;
            player.score +=10;
        }
    
}


function gameloop()
{
    if(game_over == true)
        {   
            console.log("In vicky");
            if(life.w < 0)
            alert("tum se na ho payega");
            else 
            alert("you won");
            clearInterval(f);
        }
    draw();
    update();
    console.log("In gameloop");
}

load_images();
init();
var f = setInterval(gameloop, 100);
