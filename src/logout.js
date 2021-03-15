"use strict";

import { player } from "./player.js";

export default class LogOut {
  constructor(profile) {
    this.logOutBtn = document.querySelector(".logout");
    //this.profile = JSON.parse(localStorage.getItem("profile"));
    this.profile = profile;
    this.loginForm = document.querySelector(".login");
    this.sections = document.querySelectorAll("section");
    this.titleHello = document.querySelector(".titleHello");
    this.titleName = document.querySelector(".titleName");
  }

  logOut() {
    this.loginForm.style.display = "block";
    const videoWindow = document.querySelector("#player");
    this.sections.forEach((item) => {
      if (item.className !== "login") item.style.display = "none";
    });
    //player.destroy();
    videoWindow.style.opacity = "0";
    player.stopVideo();
    this.logOutBtn.style.opacity = "0";
    this.titleHello.innerText = "";
    this.titleName.innerText = "";
  }

  onClickBtn(e) {
    this.profile.login = false;
    localStorage.setItem("profile", JSON.stringify(this.profile));
    this.logOut();
  }

  init() {
    this.logOutBtn.addEventListener("click", (e) => this.onClickBtn(e));
  }
}
