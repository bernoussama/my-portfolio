window.addEventListener("load", (event) => {
  console.log(localStorage.getItem("theme"));
  if (localStorage.theme == "dark") {
    change();
  } else if (localStorage.theme == "light") {
    localStorage.theme == "light";
  } else localStorage.removeItem("theme");
});
