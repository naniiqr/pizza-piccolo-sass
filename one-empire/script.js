// ONE EMPIRE — interactions

function syncStickyBarHeight() {
  var bar = document.querySelector(".sticky-bar");
  if (!bar) return;
  document.documentElement.style.setProperty("--sticky-height", bar.offsetHeight + "px");
}

window.addEventListener("resize", syncStickyBarHeight);
window.addEventListener("load", syncStickyBarHeight);
syncStickyBarHeight();

document.addEventListener("DOMContentLoaded", function () {
  syncStickyBarHeight();

  // FAQ accordion
  document.querySelectorAll(".faq-item").forEach(function (item) {
    var question = item.querySelector(".faq-question");
    var answer = item.querySelector(".faq-answer");

    question.addEventListener("click", function () {
      var isOpen = item.classList.contains("open");

      document.querySelectorAll(".faq-item.open").forEach(function (openItem) {
        if (openItem !== item) {
          openItem.classList.remove("open");
          openItem.querySelector(".faq-answer").style.maxHeight = null;
        }
      });

      if (isOpen) {
        item.classList.remove("open");
        answer.style.maxHeight = null;
      } else {
        item.classList.add("open");
        answer.style.maxHeight = answer.scrollHeight + "px";
      }
    });
  });
});
