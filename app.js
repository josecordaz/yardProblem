var createRandomIndividualTest = function(){
	// Points array
	var points = [];
	var tmp = [[7,5],[9,7],[9,1],[9,9],[9,8],[5,8],[9,4],[8,5]];
	for(var i = 0; i < 8; i++){
		console.log(i);
		var x;
		var y;
		do {
			x = tmp[i][0];
			y = tmp[i][1];
			console.log(x+","+y);
		}while(points.map(val=>{return val.join(",");}).indexOf([x,y].join(","))!==-1||isItInLine2(x,y,points));
		points[i] =[x,y];
	}
	console.log("");

	return points;
}

var isItInLine2 = function(x,y,pnts){
	var inclinaciones = [];
	for(var i = 0; i < pnts.length; i++){
		inclinaciones[i] = [];
		for(var e = i+1; e < pnts.length; e++){
			if(pnts[i] && pnts[e]){
				inclinaciones[i][e] = (pnts[i][0]-pnts[e][0])/(pnts[i][1]-pnts[e][1]);
			}
		}
	}

	var inLine = false;
	for(var i = 0; i < inclinaciones.length; i++){
		if(pnts[i]){
			var pivote = (x-pnts[i][0])/(y-pnts[i][1]);

			var pre = inclinaciones[i].reduce((pv,cv,ci)=>{
				if(pv[cv]){
					pv[cv] ++;
				} else {
					pv[cv] = 1;
				}
				return pv;
			},{});

			var keys = Object.keys(pre);

			keys.forEach(key=>{
				if((pre[key]===3&&key===pivote)||(((pivote+"").indexOf("Infinity",0)!==-1)&&(Math.abs(key)===Math.abs(pivote)))){
					inLine = true;
				}
			});
		}
	}
	return inLine;
}