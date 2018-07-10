const PLAYER_MOVE_SPEED = 3.0;

function warriorClass() {
		this.x = 75;
		this.y = 75;
		this.ang = 0;
		this.speed = 0;
		this.sprite; // which picture to use
		this.name = "Untitled Car";

		this.keyHeld_Up = false;
		this.keyHeld_Down = false;
		this.keyHeld_TurnLeft = false;
		this.keyHeld_TurnRight = false;

		this.controlKeyUp;
		this.controlKeyRight;
		this.controlKeyDown;
		this.controlKeyLeft;

		this.setupInput = function(upKey,rightKey,downKey,leftKey) {
			this.controlKeyUp = upKey;
			this.controlKeyRight = rightKey;
			this.controlKeyDown = downKey;
			this.controlKeyLeft = leftKey;
		}

		this.reset = function(whichImage, WarriorName) {
			this.name = WarriorName;
			this.sprite = whichImage;
			this.speed = 0;
			this.keysHeld = 0;

				for(var eachRow=0;eachRow<ROOM_ROWS;eachRow++) {
					for(var eachCol=0;eachCol <ROOM_COLS;eachCol++) {
						var arrayIndex = roomTileToIndex(eachCol, eachRow);
						if(roomGrid[arrayIndex] == TILE_PLAYERSTART) {
							roomGrid[arrayIndex] = TILE_GROUND;
							this.x = eachCol * TILE_W + TILE_W/2;
							this.y = eachRow * TILE_H + TILE_H/2;
							return;
						} // end of player start if
					} // end of col for
				} // end of row for
				console.log("NO PLAYER START FOUND");
		} // end of WarriorReset func

		this.move = function() {
			var nextX = this.x;
			var nextY = this.y;

			if(this.keyHeld_Up) {
				nextY -= PLAYER_MOVE_SPEED;
			}
			if(this.keyHeld_Down) {
				nextY += PLAYER_MOVE_SPEED;
			}
			if(this.keyHeld_TurnLeft) {
				nextX -= PLAYER_MOVE_SPEED;
			}
			if(this.keyHeld_TurnRight) {
				nextX += PLAYER_MOVE_SPEED;
			}

			var walkIntoTileIndex = getTileAtPixelCoord( nextX, nextY );
			var walkIntoTileType = TILE_WALL//roomGrid[tileKindHere];

			if (walkIntoTileIndex != undefined) { // if the tile is undefined
				var walkIntoTileType = roomGrid[walkIntoTileIndex]; // Act as wall
			}

			switch ( walkIntoTileType ) {
				case TILE_GROUND:
					this.x = nextX;
					this.y = nextY;
				break;

				case TILE_GOAL:
					console.log(this.name+"Wins!");
					document.getElementById("debugText").innerHTML = this.name + " won!";
					this.reset();;
					loadLevel(levelOne)
				break;

				case TILE_DOOR:
					if (this.keysHeld > 0) {
						this.keysHeld --; // one less key
						document.getElementById("debugText").innerHTML = "Keys: "+this.keysHeld;

						roomGrid[walkIntoTileIndex] = TILE_GROUND; //remove door

					}
					break;

					case TILE_KEY:
						this.keysHeld++; // gain key
						document.getElementById("debugText").innerHTML = "Keys: "+this.keysHeld;

						roomGrid[walkIntoTileIndex] = TILE_GROUND; // remove key
					break
			}
	}

		this.draw = function() {
			drawBitmapCenteredWithRotation(this.sprite, this.x, this.y, this.ang);
		}
	}
