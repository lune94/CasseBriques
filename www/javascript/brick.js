/*
 * Copyright (C) 2012 Jonathan Kowalski
 * Copyright (C) 2012 Nicolas Froidure
 *
 * This file is free software;
 * you can redistribute it and/or modify it under the terms of the GNU
 * General Public License (GPL) as published by the Free Software
 * Foundation, in version 2. It is distributed in the
 * hope that it will be useful, but WITHOUT ANY WARRANTY of any kind.
 *
 */

var Brick=new Class({
	initialize: function(game,x,y,w,h){
		this.game = game;
		this.width = w; this.height = h;
		this.y = y;
		this.x = x;
		this.solidity = Math.floor((Math.random()*6+this.game.level)+1);
		if(this.solidity<6)
			this.solidity=1;
		else if(this.solidity<7)
			this.solidity=2;
		else if(this.solidity<9)
			this.solidity=3;
		else
			this.solidity=4;
		},
	draw : function() {
		switch(this.solidity)
			{
			case 1:
				this.game.context.fillStyle = "#e76500"; // Normal
				break;
			case 2:
				this.game.context.fillStyle = "#b02d00"; // Red
				break;
			case 3:
				this.game.context.fillStyle = "#612c00"; // Hard
				break;
			case 3:
				this.game.context.fillStyle = "#612c00"; // Hard
				break;
			case 4:
				this.game.context.fillStyle = "#a2a2a2"; // Metal
				break;
			}
		this.game.context.fillRect(this.x, this.y, this.width, this.height);
		},
	clear : function() {
		this.game.context.clearRect(this.x-1, this.y-1, this.width+2, this.height+2);
		},
	remove : function(ball) {
		this.game.playSound('boing');
		this.solidity--;
		if(!this.solidity)
			{
			this.game.score+=1;
			this.game.bricks.splice(this.game.bricks.indexOf(this),1);
			if(this.game.goodies.length<5&&Math.floor((Math.random()*5+this.game.level)+1)>4)
				this.game.goodies.push(new Goodie(this.game,ball,this.x,this.y));
			}
		},
	hit : function(x,y,r) {
		var hit=0;
		if(x+r>this.x&&x-r<this.x+this.width
			&&y+r>this.y&&y-r<this.y+this.height)
			{
			if(x>=this.x+this.width)
				hit+=1 // hit on right
			else if(x<=this.x)
				hit+=2 // hit on left
			if(y>=this.y+this.height)
				hit+=4; // hit on bottom
			else if(y<=this.y)
				hit+=8 // hit on top
			}
		return hit;
		},
	destruct : function() {
		}
});
