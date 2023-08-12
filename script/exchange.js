// API key:          78d43df3fa621955350c7a25

const convertApp = async function () {
  try {
    let fromCurrency;
    let toCurrency;
    let amountCurrency;
    let status = false;
    const resp = await fetch(`https://v6.exchangerate-api.com/v6/78d43df3fa621955350c7a25/codes`);
    const data = await resp.json();
    data.supported_codes.forEach((each) => {
      const currencyRow = `
            <span class="dropdown-item d-flex justify-content-center">
                  <small>${each[0]}</small>
                </span>`;
      document.querySelector(".toMenuDiv").insertAdjacentHTML("afterbegin", currencyRow);
      document.querySelector(".fromMenuDiv").insertAdjacentHTML("afterbegin", currencyRow);
    });

    document.querySelectorAll(".fromMenuDiv .dropdown-item").forEach((each) => {
      each.addEventListener("click", function (e) {
        document.querySelector("#fromMenu").placeholder = fromCurrency = this.querySelector("small").textContent;
      });
    });
    document.querySelectorAll(".toMenuDiv .dropdown-item").forEach((each) => {
      each.addEventListener("click", function (e) {
        document.querySelector("#toMenu").placeholder = toCurrency = this.querySelector("small").textContent;
      });
    });

    document.querySelector(".convert").addEventListener("click", function (e) {
      e.preventDefault();
      // check insert value to be a number, if not return and don't read rest of code of funtion
      if (!Number.isFinite(Number(amount.value))) return;
      amountCurrency = amount.value;
      document.querySelector(".progress").classList.remove("d-none");

      let i = 0;
      const interval = setInterval(() => {
        document.querySelector(".progress-bar").style.width = `${i++}%`;
      }, 150);

      convert(fromCurrency, toCurrency, amountCurrency).then(() => {
        document.querySelector(".card").classList.remove("d-none");
        document.querySelector(".progress").classList.add("d-none");
        clearInterval(interval);
      });
    });
  } catch (err) {
    // console.error(err);
    console.log("error from convertValue", err);
  }
};

const convert = async function (fromCurrency, toCurrency, amountCurrency) {
  try {
    const response = await fetch(`https://v6.exchangerate-api.com/v6/78d43df3fa621955350c7a25/pair/${fromCurrency}/${toCurrency}/${amountCurrency}`);
    const convertedData = await response.json();

    document.querySelectorAll(".card-from").forEach((each) => {
      each.textContent = fromCurrency;
    });
    document.querySelectorAll(".card-to").forEach((each) => {
      each.textContent = toCurrency;
    });
    document.querySelector(".card-from-input").placeholder = amountCurrency;
    document.querySelector(".card-to-input").placeholder = Number(convertedData.conversion_result).toFixed(2);
    return convertedData;
  } catch (err) {
    console.log("error from convert", err);
  }
};

convertApp();
