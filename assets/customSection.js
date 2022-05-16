window.addEventListener("DOMContentLoaded", (_) => {
  document.querySelectorAll(".info").forEach((info) => {
    if (!info.querySelector("p")) {
      info.querySelector("h2").classList.add("info__title--main");
    } else {
      if (info.querySelector("h2")) {
        info.querySelector("h2").classList.add("info__title");
      }
      info.querySelectorAll("p").forEach((p) => {
        p.classList.add("info__text");
      });
    }
    if (info.querySelector("ul") || info.querySelector("ol")) {
      info.querySelector("li").parentElement.classList.add("info__list");
      info.querySelectorAll("li").forEach((li) => {
        li.classList.add("info__list__item");
      });
    }
  });
});
