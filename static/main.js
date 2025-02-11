import { readFileSync } from "fs";

const videoData = JSON.parse(
  readFileSync("assets/clean_shorts_data.json", "utf-8")
);

const getRandomVideo = () =>
  videoData[Math.floor(Math.random() * videoData.length)];
const tag = document.createElement("script");

tag.src = "https://www.youtube.com/iframe_api";
const firstScriptTag = document.getElementsByTagName("script")[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let player;
const videoId = getRandomVideo().videoId;
const onYouTubeIframeAPIReady = () => {
  player = new YT.Player("player", {
    width: "100%",
    height: "100%",
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
};
