import LogOut from "./logout.js";
import { player } from "./player.js";

export default class Login {
  constructor() {
    this.loginForm = document.querySelector(".login");
    this.createBtn = document.querySelector(".login__toggle");
    this.inputId = document.querySelector("input[type='text']");
    this.inputPassword = document.querySelector("input[type='password']");
    this.submitBtn = this.loginForm.querySelector("input[type='submit']");
    this.titleHello = document.querySelector(".titleHello");
    this.titleName = document.querySelector(".titleName");
    this.create = 0;
    this.error = document.querySelector(".login__error");
    this.profile = localStorage.getItem("profile")
      ? JSON.parse(localStorage.getItem("profile"))
      : { id: "", password: "", login: false };
    this.logOut = new LogOut(this.profile);
  }

  loginSuccess(id, password) {
    this.profile = { id, password, login: true };
    localStorage.setItem("profile", JSON.stringify(this.profile));
    // login화면을 사라지게 해야한다.
    this.error.innerHTML = "";
    this.loginForm.style.display = "none";
    this.titleHello.innerText = "Hello";
    this.titleName.innerText = `${this.profile.id}`;
    this.showMp3();
  }
  loginError() {
    // 에러메세지를 출력해준다.
    if (this.profile.id === "" && this.profile.password === "") {
      this.error.innerText = "You Should create id and password";
    } else {
      this.error.innerText = "Your Login information is not invalid";
    }
  }

  loginIsTrue(id, password) {
    this.inputId.value = "";
    this.inputPassword.value = "";
    this.profile = localStorage.getItem("profile")
      ? JSON.parse(localStorage.getItem("profile"))
      : { id: "", password: "", login: false };

    if (
      JSON.stringify(this.profile) ===
      JSON.stringify({ id, password, login: false })
    ) {
      this.loginSuccess(id, password);
    } else {
      this.loginError();
    }
  }

  createId(id, password) {
    const newProfile = { id, password, login: true };
    this.inputId.value = "";
    this.inputPassword.value = "";
    this.profile = newProfile;
    localStorage.setItem("profile", JSON.stringify(newProfile));
    this.loginForm.style.display = "none";
    this.error.innerText = "";
    this.titleHello.innerText = "Hello";
    this.titleName.innerText = `${this.profile.id}`;
    this.showMp3();
  }

  onSubmit(e) {
    e.preventDefault();

    const id = this.inputId.value;
    const password = this.inputPassword.value;

    if (id !== "" && password !== "") {
      this.create
        ? this.createId(id, password)
        : this.loginIsTrue(id, password);
    }
  }

  onClick(e) {
    const {
      target: { innerText },
    } = e;
    if (innerText === "Sign Up") {
      e.target.innerText = "Sign In";
      this.submitBtn.value = "Create";
      this.create = 1;
    } else {
      e.target.innerText = "Sign Up";
      this.submitBtn.value = "Log In";
      this.create = 0;
    }
  }

  clearMp3() {
    const sections = document.querySelectorAll("section");
    const videoWindow = document.querySelector("#player");
    const logOutBtn = document.querySelector(".logout");
    sections.forEach((item) => {
      if (item.className !== "login") item.style.display = "none";
    });
    logOutBtn.style.opacity = "0";
    videoWindow.style.opacity = "0";
  }

  showMp3() {
    const controller = document.querySelector(".player");
    const videoWindow = document.querySelector("#player");
    const logOutBtn = document.querySelector(".logout");
    logOutBtn.style.opacity = "1";
    controller.style.display = "flex";
    videoWindow.style.opacity = "1";
    this.logOut.init();
  }

  init() {
    if (this.profile.login) {
      this.logOut.init();
      this.loginForm.style.display = "none";
      return;
    }
    //player.destroy();
    this.clearMp3();
    this.loginForm.addEventListener("submit", (e) => this.onSubmit(e));
    this.createBtn.addEventListener("click", (e) => this.onClick(e));
  }
}
