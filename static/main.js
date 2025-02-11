function getRandomVideo() {
  return videoData[Math.floor(Math.random() * videoData.length)];
}

var videoData = [];
var videoId;
fetch("assets/clean_shorts_data.json")
  .then((r) => r.json())
  .then((json) => {
    videoData = json;
    videoId = getRandomVideo().videoId;
  });

var tag = document.createElement("script");

tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

var player;
function onYouTubeIframeAPIReady() {
  player = new YT.Player("player", {
    videoId,
    playerVars: {
      autoplay: 1,
      controls: 0,
      playsinline: 1,
    },
    events: {
      onReady: onPlayerReady,
      onStateChange: onPlayerStateChange,
    },
  });

  function onPlayerReady(event) {
    event.target.playVideo();
  }

  function onPlayerStateChange(event) {
    if (event.data === YT.PlayerState.ENDED) {
      player.loadVideoById(getRandomVideo().videoId);
    }
  }
}

window.onload = function () {
  setTimeout(function () {
    window.scrollTo(0, 1);
  }, 0);

  var nextButton = document.getElementById("next-button");

  nextButton.addEventListener("click", function () {
    player.loadVideoById(getRandomVideo().videoId);
  });
};
