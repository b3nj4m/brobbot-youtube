// Description:
//   Search for a video
//
// Configuration:
//   BROBBOT_YOUTUBE_REFERER - the referer URL to pass to the Google API (see https://developers.google.com/video-search/v1/jsondevguide)

module.exports = function(robot) {
  robot.helpCommand("brobbot youtube [me] `query`", "Searches YouTube for `query` and returns the video link.");

  var REFERER = process.env.BROBBOT_YOUTUBE_REFERER || 'https://npmjs.org/package/brobbot-youtube';

  robot.respond(/^youtube( me)? (.*)/i, function(msg) {
    var query = msg.match[2];

    msg.http('http://ajax.googleapis.com/ajax/services/search/video')
      .query({
        orderBy: "relevance",
        'max-results': 15,
        responseFormat: 'json',
        v: '1.0',
        q: query
      })
      .header('Referer', REFERER)
      .get()(function(err, res, body) {
        var videos = JSON.parse(body).responseData.results;

        if (!videos || videos.length === 0) {
          msg.send("No video results for '" + query + "'");
          return;
        }

        msg.send(msg.random(videos).url);
      });
  });
};
