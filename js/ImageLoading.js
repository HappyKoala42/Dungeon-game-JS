var warriorPic = document.createElement("img");
var roomPics = [

];

var picsToLoad = 0; // set automatically based on imageList in loadImages()

function countLoadedImagesAndLaunchIfReady() {
	picsToLoad--;
//	console.log(picsToLoad);
	if(picsToLoad == 0) {
		imageLoadingDoneSoStartGame();
	}
}

function beginLoadingImage(imgVar, fileName) {
	imgVar.onload = countLoadedImagesAndLaunchIfReady;
	imgVar.src = "images/"+fileName;
}

function loadImageForTrackCode(trackCode, fileName) {
	roomPics[trackCode] = document.createElement('img');
	beginLoadingImage(roomPics[trackCode], fileName);
}

function loadImages() {
	var imageList = [
		{varName: warriorPic, theFile:  "warrior.png"},

		{trackType: TILE_GROUND, theFile: "world_ground.png"},
		{trackType: TILE_WALL, theFile: "world_wall.png"},
		{trackType: TILE_GOAL, theFile: "world_goal.png"},
		{trackType: TILE_KEY, theFile: "world_key.png"},
		{trackType: TILE_DOOR, theFile: "world_door.png"}
		];

	picsToLoad = imageList.length;

	for(var i=0;i<imageList.length;i++) {
		if (imageList[i].varName != undefined) {
		beginLoadingImage(imageList[i].varName, imageList[i].theFile);
	} else {
			loadImageForTrackCode ( imageList[i].trackType, imageList[i].theFile);
		}
	}
}
