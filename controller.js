const main = document.querySelector(".main");

const ping = (url, timeout = 3000) => {
  return new Promise((resolve, reject) => {
    const urlRule = new RegExp(
      "(https?|ftp|file)://[-A-Za-z0-9+&@#/%?=~_|!:,.;]+[-A-Za-z0-9+&@#/%=~_|]"
    );
    if (!urlRule.test(url)) reject("invalid url");
    try {
      fetch(url)
        .then(() => resolve(true))
        .catch(() => resolve(false));
      setTimeout(() => {
        resolve(false);
      }, timeout);
    } catch (e) {
      reject(e);
    }
  });
};

const loadStream = () => {
  const IPofStream = document.querySelector(".url-input").value;

  //   const streamLoaderDiv = document.querySelector(".stream-loader");
  //   streamLoaderDiv.styles.display = "none";
  if (IPofStream != "") {
    main.innerHTML = `<iframe src="${IPofStream}" class="video"></iframe>`;
  }
};

// controll server IP = http://192.168.0.108

const controllerIP = `http://192.168.0.108`;
document.addEventListener("keydown", function (event) {
  const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
  switch (event.key) {
    case "ArrowLeft":
      // Left pressed
      ping(`${controllerIP}/left`);
      break;
    case "ArrowRight":
      // Right pressed
      ping(`${controllerIP}/right`);
      break;
    case "ArrowUp":
      // Up pressed
      ping(`${controllerIP}/forward`);
      break;
    case "ArrowDown":
      // Down pressed
      ping(`${controllerIP}/backward`);
      break;
  }
});

document.addEventListener("keyup", function (event) {
  const key = event.key; // "ArrowRight", "ArrowLeft", "ArrowUp", or "ArrowDown"
  switch (event.key) {
    case "ArrowLeft":
      // Left pressed
      ping(`${controllerIP}/left_release`);
      break;
    case "ArrowRight":
      // Right pressed
      ping(`${controllerIP}/right_release`);

      break;
    case "ArrowUp":
      // Up pressed
      ping(`${controllerIP}/forward_release`);

      break;
    case "ArrowDown":
      // Down pressed
      ping(`${controllerIP}/backward_release`);
      break;
  }
});
