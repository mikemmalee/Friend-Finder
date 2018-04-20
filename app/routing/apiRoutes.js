var path = require('path');
var friendsArray = require('../data/friends.js');


module.exports = function(app){
    app.get('/api/friends', function(req,res){
      res.json(friendsArray);
    });

    app.post('/api/friends', function(req,res){
        var userScores = req.body.scores;
        var scoreArray = [];
        var match = 0;

        for (var i = 0; i < friendsArray.length; i++){
            var diff = 0;
            for (var j = 0; j < userScores.length; j++){
              diff += (Math.abs(parseInt(friendsArray[i].scores[j]) - parseInt(userScores[j])));
            }
            scoreArray.push(diff);
        }
      
          
        for (var i = 0; i < scoreArray.length; i++){
            if (scoreArray[i] <= scoreArray[match]){
                match = i;
            }
        }
      
        var bestMatch = friendsArray[match];
        res.json(bestMatch);
      
        friendsArray.push(req.body);
    });

};