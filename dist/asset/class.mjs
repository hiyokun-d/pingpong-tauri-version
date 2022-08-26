class Paddles {
    constructor({ x, y, color, speed }) {
        this.x = x;
        this.y = y;
        this.w = 20;
        this.h = 140;
        this.color = color || "white";
        this.speed = speed || 25;

        this.move = {
            up: false,
            down: false,
        }
    }

    draw(ctx) {
        if (ctx) {   
            ctx.beginPath();
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.w, this.h);
            ctx.closePath();
        } else {
            console.error("you need to put canvas context in draw parameters")
        }
    }
    
    moving(canvas) {
            if (canvas) {
                if (this.move.up && this.y > 0) {
                    this.y -= this.speed
                } else if (this.move.down && this.y + this.h < canvas.height) {
                    this.y += this.speed
                }
            } else {
                console.error("you need to put 'canvas' to detect the heights of the screen")
            }
    }
}


export { Paddles };
