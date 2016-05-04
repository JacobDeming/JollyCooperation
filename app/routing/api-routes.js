var coopData=require("../data/CooperatorData.js");
var path=require('path');

module.exports=function(app){
	app.get('/api/cooperators',function(req,res){
		res.json(coopData);})
	app.post('/api/cooperators', function(req,res){
		coopData.push(req.body);
		var totalScore=0;
		var matchSoFar=100;
		var match=[];
		for(var i=0;i<req.body.scores.length;i++){
			totalScore+=parseInt(req.body.scores[i]);}
		for(var i=0;i<coopData.length;i++){
			if(req.body.game==coopData[i].game&&req.body.name!=coopData[i].name){
				var scoreDiff=0;
				for(var j=0;j<coopData[i].scores.length;j++){
					if(req.body.scores[j]!=coopData[i].scores[j]){
						scoreDiff+=Math.abs(parseInt(req.body.scores[j])-parseInt(coopData[i].scores[j]));}}
				if(scoreDiff<matchSoFar){
					match=coopData[i];}}}
		res.send(match);})
}