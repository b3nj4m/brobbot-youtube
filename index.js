// Description:
//   Search for a YouTube video

module.exports = function(robot) {
  robot.helpCommand("brobbot youtube [me] `query`", "Searches YouTube for `query` and returns the video link.");

  robot.respond(/^youtube( me)? (.*)/i, function(msg) {
    var query = msg.match[3];
    robot.http("http://gdata.youtube.com/feeds/api/videos")
      .query({
        orderBy: "relevance",
        'max-results': 15,
        alt: 'json',
        q: query
      })
      .get()(function(err, res, body) {
        var videos = JSON.parse(body).feed.entry;

        if (!videos) {
          msg.send("No video results for '" + query + "'");
          return;
        }

        var video = msg.random(videos);
        video.link.forEach(function(link) {
          if (link.rel === "alternate" && link.type === "text/html") {
            msg.send(link.href);
            return false;
          }
        });
      });
  });
};
