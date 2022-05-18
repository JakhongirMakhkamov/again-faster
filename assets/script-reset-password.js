const loginContainer = document.getElementById("login__customer");
const resetContainer = document.getElementById("reset__password");
const resetBtn = document.getElementById("passReset");
const cancelReset = document.getElementById("cancel-reset");

const toggleHiddenClass = function () {
  loginContainer.classList.toggle("hidden");
  resetContainer.classList.toggle("hidden");
};

resetBtn.addEventListener("click", toggleHiddenClass);
cancelReset.addEventListener("click", toggleHiddenClass);
