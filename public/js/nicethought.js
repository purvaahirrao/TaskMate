document.addEventListener("DOMContentLoaded", function () {
  const thoughtContainer = document.querySelector(".thought-container");

  if (thoughtContainer) {
    thoughtContainer.addEventListener("click", function () {
      if (document.querySelector("#thoughtInput")) return;

      const input = document.createElement("input");
      input.id = "thoughtInput";
      input.placeholder = "Type your thought...";
      input.type = "text";

      thoughtContainer.appendChild(input);
      input.focus();

      input.addEventListener("keydown", function (event) {
        if (event.key === "Enter") {
          event.preventDefault();
          const newThought = input.value.trim();
          const existing = document.querySelector(".user-thought");
          if (existing) existing.remove();

          if (newThought) {
            const thoughtText = document.createElement("p");
            thoughtText.classList.add("user-thought");
            thoughtText.textContent = newThought;
            thoughtContainer.appendChild(thoughtText);
          }

          input.remove();
        }
      });

      input.addEventListener("blur", function () {
        input.remove();
      });
    });
  }
});