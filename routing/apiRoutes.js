var friendData = require("../app/data/friends.js");

// Export routes to server
module.exports = function (app) {

    //Route to get Friends Data
    app.get("../app/data/friends", function (request, response) {
        response.json(friendData);
    });

    //Route to post Friends Data
    app.post("../app/data/friends", function (request, response) {
        var matchedFriend = calculateMatch(request.body);
        friendData.push(request.body);
        response.json(matchedFriend);
    });

}

// Calls compareScore for each user, then sorts them.
function calculateMatch(newFriend) {
    var matches = [];
    for (i = 0; i < friendData.length; i++) {
        matches.push(
            {
                name: friendData[i].name,
                score: compareScores(newFriend.scores, friendData[i].scores),
                photo: friendData[i].photo,
            }
        );
    }

    // Look at score attribute and sort
    matches.sort(function (a, b) {
        return (a.score - b.score)
    });

    // Return the closest match
    return matches[0];
}

// Gets the difference between scores
function compareScores(newFriendScores, existingFriendScores) {
    var scoreDiff = 0;
    newFriendScores.map(function (currentValue, index) {
        scoreDiff += Math.abs(currentValue - existingFriendScores[index]);
    });
    return scoreDiff;
}