var background1,bird,enemy,score,livesnum,bullet,ebullet,bulletcount,bulletnum;
var bullgroup,egroup,e5,heart,state;
var heart1,heart2,heart3,ex,iwall,score;

function preload(){
  
  sky = loadImage("images/background.png");

  bird_animation = loadAnimation("images/redbird/l0_1.png","images/redbird/l0_2.png","images/redbird/l0_3.png","images/redbird/l0_4.png");

  evil_animation = loadAnimation("images/evilbird/l0_e1.png","images/evilbird/l0_e2.png","images/evilbird/l0_e3.png",
    "images/evilbird/l0_e4.png","images/evilbird/l0_e5.png","images/evilbird/l0_e6.png","images/evilbird/l0_e7.png","images/evilbird/l0_e8.png");

  smoke_a = loadAnimation("images/smoke/l0_sm1.png","images/smoke/l0_sm2.png","images/smoke/l0_sm3.png","images/smoke/l0_sm4.png","images/smoke/l0_sm5.png",);

  bird_s = loadImage("images/redbird/l0_11.png");
  e_s = loadImage("images/evilbird/l0_e1.png");

  Castle = loadImage("images/castle.png");
  down = loadImage("images/castle_d.png");

  ebull_i = loadImage("images/ebull.png");
  bull_i = loadImage("images/bull.png");

  heart = loadImage("images/heart0.png")

  var d = 1;

  play = 1;
  end = 2;

  state = play;
}

function setup() {

  background1 = createSprite(600,200,600,400);
  background1.addImage("sky", sky);
  background1.scale = 3.28;
  background1.velocityX = -1;

  castle_i = createSprite(110,200,100,100);
  castle_i.addImage("c",Castle);
  castle_i.scale = 7;

  bird = createSprite(100,200,20,20);
  bird.addAnimation("fly",bird_animation);
  bird.scale = 1.5;

  score = 0;
  bulletcount = 1;

  bullgroup = new Group();
  egroup = new Group();
  ebugi = new Group();

  e5=1;

  bulletnum = 3;

  bullet1 = createSprite(20,20,10,10);
  bullet2 = createSprite(60,20,10,10);
  bullet3 = createSprite(100,20,10,10);
  bullet1.scale = 2;
  bullet2.scale = 2;
  bullet3.scale = 2;
  bullet1.addAnimation("bullet",bull_i);
  bullet2.addAnimation("bullet",bull_i);
  bullet3.addAnimation("bullet",bull_i);

  heart1 = createSprite(580,20,10,10);
  heart2 = createSprite(540,20,10,10);
  heart3 = createSprite(500,20,10,10);
  heart1.scale = 0.03
  heart2.scale = 0.03
  heart3.scale = 0.03
  heart1.addImage("heart",heart);
  heart2.addImage("heart",heart);
  heart3.addImage("heart",heart);
  livesnum = 3;

  iwall = createSprite(10,200,5,400)
  iwall.visible  = false;
}

function draw() {
 createCanvas(600,400);
 background("black");

if (background1.x<70) {
  
  background1.x = 600;
}

if (keyDown("up")) {
  
  bird.y = bird.y-10;
}
if (keyDown("down")) {
  
  bird.y = bird.y+10;
}
if (keyDown("space")&&bulletcount === 1&&bulletnum >= 1) {
  
  bullet = createSprite(110,bird.y,10,10);
  bullet.velocityX = 5;
  bulletcount = 0;
  bullet.addImage("bullet",bull_i);
  bullet.scale = 2;
  bullgroup.add(bullet);
  bulletnum = bulletnum-1;
}
if (keyWentUp("space")) {
  
  bulletcount = 1;
}

if (bulletnum === 3) {
  
  bullet3.visible = true;
  bullet2.visible = true;
  bullet1.visible = true;
}
if (bulletnum === 2){

  bullet3.visible = false;
  bullet2.visible = true;
  bullet1.visible = true;
}
if (bulletnum === 1) {
  
  bullet2.visible = false;
  bullet1.visible = true;
}
if (bulletnum === 0) {
  
  bullet1.visible = false;
}

if (livesnum === 3) {
  
  heart3.visible = true;
  heart2.visible = true;
  heart1.visible = true;
}
if (livesnum === 2){

  heart3.visible = false;
  heart2.visible = true;
  heart1.visible = true;
}
if (livesnum === 1) {
  
  heart2.visible = false;
  heart1.visible = true;
}
if (livesnum === 0) {
  
  heart1.visible = false;
}
if(livesnum === 0||egroup.isTouching(iwall)){

  state = end;
}
if (frameCount%60===0&&bulletnum<3) {
  
  bulletnum = bulletnum+1;
}
var ed = createEdgeSprites();

if(state===play){
bird.collide(ed[3]);
bird.collide(ed[2]);
}
  if (ebugi.isTouching(bird)){

    ebugi.destroyEach();
    livesnum = livesnum-1; 
  }

  if (bullgroup.isTouching(egroup)){
    
    bullgroup.destroyEach();
    egroup.destroyEach()
    e5 = 2;
    score = score+1;
  }

  efun();
  drawSprites();
  fill(0);
  textSize(20);
  text("Score: "+score,250,50)
  textSize(10);
  text("Press Space to shoot",10,380);
  text("The Bad Birds are attacking us",450,370);
  text("You are the Hero you have",460,380);
  text("to defend our castle",475,390);

  if (state===end) {
    
    bird.setVelocity(0,6);
    enemy.setVelocity(0,0);
    background1.velocityX = 0;
    bird.addImage("over",bird_s);
    bird.changeImage("over");
    castle_i.addImage("do",down);
    castle_i.changeImage("do");

   textSize(30);
   text("Your Castle was Destroyed",100,200);
   textSize(40);
   text("Game Over",200,100) 
   textSize(15);
   text("Press R to Restart",200,300);

   if (keyDown('r')) {
     
     reset();
   }
  }
}
function efun(){

  if (frameCount === 60||e5 === 2){

  enemy = createSprite(630,random(50,380),20,20)
  enemy.velocityX = -2;
  e5 = 1;
  enemy.addAnimation("evil",evil_animation);
  enemy.mirrorX = -1;
  enemy.scale = 2;
  egroup.add(enemy);
}
  if(frameCount %60 === 0&&frameCount != 0&&state===play){

    ebullet = createSprite(enemy.x-10,enemy.y,10,10)
    ebullet.velocityX = -6;
    ebullet.velocityY = random(-3,3);
    ebullet.addImage("ebullet",ebull_i);
    ebullet.scale = 2;
    ebugi.add(ebullet);
    }
}
function reset() {
  
  console.log(state);
  state = play;
  livesnum = 3;
  bird.changeAnimation("fly");
  bird.y = 200;
  castle_i.changeAnimation("c");
  egroup.destroyEach();
  e5 = 2
  score = 0;
  background1.velocityX = -1;
}
