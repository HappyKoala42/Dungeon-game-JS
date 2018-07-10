const TILE_W = 50;
const TILE_H = 50;
const TILE_GAP = 2;
const ROOM_COLS = 16;
const ROOM_ROWS = 12;
var levelOne =  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
								 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 5, 0, 1, 0, 0, 1,
								 1, 0, 4, 0, 4, 0, 1, 0, 2, 0, 1, 0, 1, 4, 4, 1,
								 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 5, 1, 1,
								 1, 1, 1, 5, 1, 1, 1, 0, 4, 0, 1, 0, 0, 0, 1, 1,
								 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 4, 0, 1, 1,
								 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 1, 1,
								 1, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 4, 0, 1, 1,
								 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 1,
								 1, 0, 5, 0, 5, 0, 5, 0, 3, 0, 1, 1, 1, 1, 1, 1,
								 1, 0, 1, 0, 1, 0, 1, 0, 0, 0, 1, 1, 1, 1, 1, 1,
								 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,];




var levelList = [levelOne];
var roomGrid = [levelList];

const TILE_GROUND = 0;
const TILE_WALL = 1;
const TILE_PLAYERSTART = 2;
const TILE_GOAL = 3;
const TILE_KEY = 4;
const TILE_DOOR = 5;

function getTileAtPixelCoord(pixelX, pixelY) {
	var tileCol = pixelX / TILE_W;
	var tileRow = pixelY / TILE_H;
	// Math floor to round down the nearest whole number
	tileCol = Math.floor (tileCol);
	tileRow = Math.floor (tileRow);
	//check wether the tile coords fall within valid bounds
	if(tileCol < 0 && tileCol < ROOM_COLS ||
		tileRow < 0 && tileRow < ROOM_ROWS) {

		 document.getElementById("debugText").innerHTML = "out of bounds:"+pixelX+","+pixelY;
		 	 return undefined;
		// return roomGrid[tileIndex];
		}
		var tileIndex = roomTileToIndex(tileCol, tileRow);
		return tileIndex
	}

function tileHandling(whichWarrior) {
	var tileCol = Math.floor(whichWarrior.x / TILE_W);
	var tileRow = Math.floor(whichWarrior.y / TILE_H);
	var trackIndexUnderWarrior = roomTileToIndex(tileCol, tileRow);

	if(tileCol >= 0 && tileCol < ROOM_COLS &&
		tileRow >= 0 && tileRow < ROOM_ROWS)
			var walkIntoTileType = getTileAtPixelCoord( tileCol,tileRow );
		if(walkIntoTileType == TILE_GOAL) {
				console.log(whichWarrior.name+"Wins!");
				loadLevel(levelOne);
		} else if(walkIntoTileType != WORLD_ROAD) {
				whichWarrior.x -= Math.cos(whichWarrior.ang) * whichWarrior.speed;
				whichWarrior.y -= Math.sin(whichWarrior.ang) * whichWarrior.speed;
				whichWarrior.speed *= -0.5;
		}
} // end of tileHandling func

function roomTileToIndex(col, row) {
	return col + ROOM_COLS * row;
}

function useImgHasTransparency (checkTileType) {
	return (checkTileType == TILE_GOAL ||
					checkTileType == TILE_KEY ||
					checkTileType == TILE_DOOR);
}

function drawRoom() {
	var arrayIndex = 0;
	var drawTileX = 0;
	var drawTileY = 0;
	for(var eachRow=0;eachRow<ROOM_ROWS;eachRow++) {
		for(var eachCol=0;eachCol<ROOM_COLS;eachCol++) {
			var tileKindHere = roomGrid[arrayIndex];
			var useImg = roomPics[tileKindHere];
			if (useImgHasTransparency (tileKindHere) ) {
				canvasContext.drawImage(roomPics[TILE_GROUND],drawTileX,drawTileY);
			}
				canvasContext.drawImage(useImg,drawTileX,drawTileY);

			drawTileX += TILE_W;
			arrayIndex++;
		} // end of for each col
		drawTileY += TILE_H
		drawTileX = 0;
	} // end of for each row
} // end of drawTracks func
