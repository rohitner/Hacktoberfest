// can linearly increase difficulty with time
function canvas(canvas_width) {
    var blocks = []; // list containing info of falling blocks generated per new frame
    var score = 0;
    var fr = 50;
    var block_index = 0;
    var font_size = 40;
    var poisson_mean = 3.5;//number of blocks falling per second
    var cursor_pos, cursor_width, cursor_height, flag = 1;
    var previous_window={};
    var transformation_factor = {
        x:1,
        y:1
    };

    /*********function to shift the canvas to the centre of the browser*******/
    this.centerCanvas = function () {
        var x = (windowWidth - width) / 2;
        var y = (windowHeight - height) / 2;
        (this.cnv).position(x, y);
    };

    this.setup = function () {
        this.cnv = createCanvas(canvas_width, windowHeight);
        previous_window.width = windowWidth;
        previous_window.height = windowHeight;
        frameRate(fr);
        this.centerCanvas();// taking mean blocks falling per second = 3
    };
    this.draw = function () {
        background(128);
        textSize(font_size*transformation_factor.x);
        //cursor specifications
        cursor_width = 30 * transformation_factor.x;
        cursor_height = 30 * transformation_factor.y;
        fill('red');
        stroke('red');

        //checking if cursor lies in canvas area
        cursor_pos = this.within_canvas(mouseX, mouseY, cursor_width, cursor_height);
        rect(cursor_pos.x, cursor_pos.y, cursor_width, cursor_height);

        //generating falling blocks per-frame using poisson
        var new_blocks_per_frame = Module.poisson(poisson_mean, fr);
        for (var i = 0; i < new_blocks_per_frame; i++) {
            blocks.push(new this.rectangle());
        }
        for (block_index = 0; block_index < blocks.length; block_index++) {
            blocks[block_index].move();
            if (blocks.length > 0 && block_index < blocks.length) {
                blocks[block_index].display();
                if (this.collision()) {
                    noLoop(); // if collision then stop!
                    textAlign(CENTER, CENTER);
                    this.restart();
                }
            }
            textAlign(LEFT, TOP);
            this.drawScore();
        }
    };
    /**************************************************************************
     function(class) to generate falling blocks
     *************************************************************************/
    this.rectangle = function () {
        this.wid = random(60, 100);
        this.ht = random(60, 100);
        this.x = random(0, width - this.wid);
        this.y = -this.ht;
        var speed = 0.5;
        var time = 0;
        this.move = function () {
            time += (60 / fr);
            this.y*=transformation_factor.y;
            this.y += speed * time;
            if (this.y > height) {
                score++;
                blocks.splice(block_index, 1);
            }
        };
        this.display = function () {
            fill('blue');
            stroke('blue');
            rect(this.x, this.y, this.wid, this.ht);
        };
    };

    /**************************************************************************
     function to check whether given object lies within canvas

     arguments:
     x = x coordinate of the object
     y = y coordinate of the object
     obj_width = width of the object
     obj_height = height of the object

     return:
     corrected coordinates of the object that lies in canvas
     **************************************************************************/

    this.within_canvas = function (x, y, obj_width, obj_height) {
        if (x < 0) {
            x = 0;
        }
        if (y < 0) {
            y = 0;
        }
        if (x + obj_width > width) {
            x = width - obj_width;
        }
        if (y + obj_height > height) {
            y = height - obj_height;
        }
        return {x: x, y: y};
    };

    /**********function to check for collisions b/w cursor and blocks**********/

    this.collision = function () {
        if ((abs((cursor_pos.x + cursor_width / 2) - (blocks[block_index].x + blocks[block_index].wid / 2)) < (cursor_width + blocks[block_index].wid) / 2) &&
            (abs((cursor_pos.y + cursor_height / 2) - (blocks[block_index].y + blocks[block_index].ht / 2)) < (cursor_height + blocks[block_index].ht) / 2)) {
            return true;
        }
        else return false;
    };

    /*********** function to display current score ****************************/
    this.drawScore = function () {
        fill(255);
        stroke('white');
        text("Score:", 40*transformation_factor.x, 40*transformation_factor.y);
        text(score, 160*transformation_factor.x, 40*transformation_factor.y);
    };

    this.restart = function () {
        fill(255);
        stroke('white');
        text("Game Over", width / 2, height / 2);
        text("Press R to restart", width / 2, height / 2 + 50);
    };

    this.keyTyped = function () {
        if (key == 'r' || key == 'R') {
            blocks.length = 0;
            score = 0;
            loop();

        }
    };

    this.windowResized = function () {
        var new_canvas_width = canvas_width * (windowWidth / previous_window.width);
        transformation_factor.x = windowWidth / previous_window.width;
        transformation_factor.y = windowHeight / previous_window.height;
        this.resizeCanvas(new_canvas_width, windowHeight);
        this.centerCanvas();
    };
}
canvas(700);//700 = width of tha screen play area in browser

