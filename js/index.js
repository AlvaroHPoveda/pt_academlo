// -------------------------------LOGIN TOKEN---------------------------------------------
// ---------------------------------------------------------------------------------------
let form = document.getElementById("login");

async function postLogin(e) {
  e.preventDefault();

  let email = document.getElementById("email");
  let password = document.getElementById("password");

  let data = {
    email: email.value,
    password: password.value,
  };

  let requestOptionsPostLogin = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    redirect: "follow",
  };

  const resLogin = await fetch(
    "https://tasks-crud.academlo.com/api/auth/login",
    requestOptionsPostLogin
  );
  if (resLogin.status >= 400) {
    console.log("Claves erroneas");
    return;
  }
  const dataLogin = await resLogin.text();
  localStorage.setItem("token", dataLogin);
  window.location.replace('/page/crud.html')
}

form.addEventListener("submit", postLogin);

let token = localStorage.getItem("token").split("|")[1];
// -------------------------------GET LIST USER-------------------------------------------
// ---------------------------------------------------------------------------------------
// let requestOptionsGetUsers = {
//   method: "GET",
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${token}`,
//   },
//   redirect: "follow",
// };

// fetch("https://tasks-crud.academlo.com/api/user", requestOptionsGetUsers)
//   .then((response) => response.text())
//   .then((result) => console.log(result))
//   .catch((error) => console.log("error", error));
// ---------------------------------------------------------------------------------------
