export default class Login {
  constructor() {
    this.loginForm = document.querySelector(".login__form");
    this.createBtn = document.querySelector(".login__toggle");
    this.inputId = document.querySelector("input[type='text']");
    this.inputPassword = document.querySelector("input[type='password']");
    this.submitBtn = this.loginForm.querySelector("input[type='submit']");
    this.create = 0;
    this.error = document.querySelector(".login__error");
    this.profile = localStorage.getItem("profile")
      ? JSON.parse(localStorage.getItem("profile"))
      : { id: "", password: "", login: false };
  }

  loginSuccess(id, password) {
    this.profile = { id, password, login: true };
    localStorage.setItem("profile", JSON.stringify(this.profile));
    // login화면을 사라지게 해야한다.
    this.error.innerHTML = "";
    this.loginForm.parentNode.style.display = "none";
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
    if (this.profile === { id, password, login: false }) {
      this.loginSuccess(id, password);
    } else {
      this.loginError();
    }
  }

  createId(id, password) {
    const newProfile = { id, password, login: true };
    this.profile = newProfile;
    localStorage.setItem("profile", JSON.stringify(newProfile));
    this.loginForm.parentNode.style.display = "none";
    this.error.innerText = "";
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

  init() {
    if (this.profile.login) {
      this.loginForm.parentNode.style.display = "none";
      return;
    }
    this.loginForm.addEventListener("submit", (e) => this.onSubmit(e));
    this.createBtn.addEventListener("click", (e) => this.onClick(e));
  }
}
