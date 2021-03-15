"use strict";

export default class Background {
  constructor() {
    this.titleHello = document.querySelector(".titleHello");
    this.titleName = document.querySelector(".titleName");
    this.profile = localStorage.getItem("profile")
      ? JSON.parse(localStorage.getItem("profile"))
      : { id: "", password: "", login: false };
  }

  init() {
    if (this.profile.login) {
      this.titleHello.innerText = "Hello";
      this.titleName.innerText = `${this.profile.id}`;
    } else {
      this.titleHello.innerText = "";
      this.titleName.innerText = "";
    }
  }
}
