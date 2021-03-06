// Constants
// Player init
var pl_step = 10;
var pl_x = 220;
var pl_y = 470;
var pl_height = 75;
var pl_width = 65;
// Enemy init
var en_height = 65;
var en_width = 100;
// Board limitations
var bd_left = 0;
var bd_right = 505;
var bd_top = 0;
var bd_bottom = 545;//585;
var bd_water = 130;

// Generates random nums between min and max
var get_rnd = function (min, max) {
    return Math.random() * (max - min) + min;
};

// Superclass gor all objects in the game
var objs = function (x, y, width, height, img) {
    // Location on the screen (x and y)
    // and image of the object
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.sprite = img;
};
// Common methods
objs.prototype.render = function () {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Enemies our player must avoid
var Enemy = function (x, y, w, h) {
    objs.call(this, x, y, w, h, "images/enemy-bug.png");
    this.speed = get_rnd(40, 300);
};
// Using common methods
Enemy.prototype = Object.create(objs.prototype);
Enemy.prototype.constructor = Enemy;
// How enemies change their position
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function (dt) {
    this.x += this.speed * dt;
    if (this.x + this.width > bd_right) {
        this.x = 0;
        this.speed = get_rnd(40, 300);
    }
};
Enemy.prototype.collision = function (pl) {
    // Simplest collision
    /*if (Math.abs(this.x - pl.x) < 30 && Math.abs(this.y - pl.y) <30) {
        pl.x = pl_x;
        pl.y = pl_y;
    }*/
    
    // Good collision
    // Diagonals of the rectangles
    var pa1 = new Point(pl.x, pl.y);
    var pa2 = new Point(pl.x + pl.width, pl.y + pl.height);
    var pb1 = new Point(this.x, this.y);
    var pb2 = new Point(this.x + this.width, this.y + this.height);
    // Check for collision
    var rec_int = IsRecIntersect(pa1, pa2, pb1, pb2);
    if (rec_int) {
        pl.x = pl_x;
        pl.y = pl_y;
    }
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function (x, y, w, h) {
    objs.call(this, x, y, w, h, "images/char-boy.png");
};
// Using common methods
Player.prototype = Object.create(objs.prototype);
Player.prototype.constructor = Player;
// Nothing to do, just for engine
Player.prototype.update = function () {
    /**/
};
// Reaction on keys
Player.prototype.handleInput = function (key) {
    switch (key) {
    case "right":
        if ((this.x + this.width + pl_step) <= bd_right) {
            this.x += pl_step;
        }
        break;
    case "left":
        if ((this.x - pl_step) >= bd_left) {
            this.x -= pl_step;
        }
        break;
    case "up":
        if ((this.y - pl_step) >= bd_top) {
            this.y -= pl_step;
            if (this.y < bd_water) {
                this.x = pl_x;
                this.y = pl_y;
            }
        }
        break;
    case "down":
        if ((this.y + this.height + pl_step) <= bd_bottom) {
            this.y += pl_step;
        }
    }
//    console.log(this.x, this.y);
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy1 = new Enemy(0, 140, en_width, en_height);
var enemy2 = new Enemy(0, 222, en_width, en_height);
var enemy3 = new Enemy(0, 305, en_width, en_height);
var allEnemies = [];
allEnemies.push(enemy1);
allEnemies.push(enemy2);
allEnemies.push(enemy3);
var player = new Player(pl_x, pl_y, pl_width, pl_height);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keydown', function (e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
