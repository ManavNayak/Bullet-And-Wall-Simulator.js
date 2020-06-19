
const targets = [];
const bullets = [];
let canvas = null;

function setup() {
  canvas = createCanvas(400, 400);

  for (var i = 0; i < 10; i++) {
    const w = random(width);
    const h = random(height);
    const size = random(5, 50);
    targets.push(new Target(w, h, size, 'blue'));
  }

  for (var j = 0; j < 30; j++) {
    const w = random(width);
    const h = random(height);
    const size = random(5, 20);
    bullets.push(new Bullet(w, h, size, 'green'));
  }
}

function draw() {
  background(220);
  bullets.forEach(bullet => {
    bullet.show();
    bullet.move();
  });

  for (var i = 0; i < targets.length; i++) {
    for (var j = 0; j < bullets.length; j++) {
      const hit = targets[i].hit(bullets[j]);
      if (hit) {
        targets[i].color = 'red';
        break;
      } else targets[i].color = 'blue'
    }
  }

  targets.forEach(target => target.show());
}

class Element {
  constructor(x, y, size, color) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.position = new p5.Vector(this.x, this.y);
  }

  show() {
    const c = color(this.color);
    c.setAlpha(150);
    fill(c);
    rectMode(CENTER)
    rect(this.position.x, this.position.y, this.size, this.size)
  }
}

class Bullet extends Element {
  move() {
    this.position.add(p5.Vector.random2D())
  }
}
class Target extends Element {
  hit(player) {
    if (Math.abs(this.position.x - player.position.x) < this.size / 2 + player.size / 2 && Math.abs(this.position.y - player.position.y) < this.size / 2 + player.size / 2) return true;
  }
}

function shoot() {
    x = p.x + 6.5;
    y = p.y + 12.5;
    bullets.push(new Bullet(x, y));
}

function spawnEnemies() {
    let x = 650;
    let y = 30;

    for (let i = 0; i < 14; i++) {
        enemies.push(new Enemy(x, y));
        y += 40
    }
}

// check hit
for (let i = 0; i < bullets.length; i++){
    for (let j = 0; j < enemies.length; j++){
        let d = dist(bullets[i].x, bullets[i].y, enemies[j].x, enemies[j].y)
        if (d < 1){
            console.log('hit');
        }
    }
}