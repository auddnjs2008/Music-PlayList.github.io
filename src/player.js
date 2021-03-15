"use strict";

export let localPlayList = localStorage.getItem("playlist")
  ? JSON.parse(localStorage.getItem("playlist")).map((song) => song.id)
  : [];

export const player = new YT.Player("player", {
  height: "200",
  width: "400",
});

setTimeout(() => {
  player.loadPlaylist({
    playlist: localPlayList,
    listType: "playlist",
    index: 0,
    startSeconds: 0,
  });
  setTimeout(() => player.stopVideo(), 500);
}, 1100);

export const playListSet = () => {
  const localList = localStorage.getItem("playlist")
    ? JSON.parse(localStorage.getItem("playlist")).map((song) => song.id)
    : [];
  player.loadPlaylist({
    playlist: localList,
    listType: "playlist",
    index: 0,
    startSeconds: 0,
  });
  player.setLoop(true);
};
