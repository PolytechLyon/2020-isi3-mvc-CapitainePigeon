export const controller = model => {
  model.run();
  document.getElementById("start").addEventListener("click", function(event) {
    model.run();
  });
  document.getElementById("stop").addEventListener("click", function(event) {
    model.stop();
  });
  document.getElementById("reset").addEventListener("click", function(event) {
    model.reset();
  });
};
