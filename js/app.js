const res = document.querySelector("#resultcont");
const submitbtn = document.querySelector(".btn");

submitbtn.addEventListener("click", async (evt) => {
  evt.preventDefault();

  const email = document.querySelector("#email").value.trim();

  if (!email) {
    res.innerHTML = "Please enter an email address to validate!";
    return;
  }

  res.innerHTML = `<img width="23vh" src="img/loading.svg" alt="loading">`;

  const apiKey = "Enter-Your-API-KEY-HERE";
  const url = `https://api.emailvalidation.io/v1/info?apikey=${apiKey}&email=${email}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`API Error: ${response.status}`);
    }

    const apiResult = await response.json();

    let str = "";
    for (let key in apiResult) {
      if (apiResult[key] !== "" && apiResult[key] !== null) {
        str += `<div><b>${key}</b>: ${apiResult[key]}</div>`;
      }
    }

    res.innerHTML = str;

  } catch (error) {
    res.innerHTML = "Something went wrong. Try again later.";
  }
});
