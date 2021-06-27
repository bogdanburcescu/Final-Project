let list = {};
let cart = {};
let idx;
let footer = `
<div id="footer" style=
"
    display: flex;
    justify-content: space-evenly;
    margin-top: 50px;
    background-color: #eee;
    padding: 71px;
">
<div>
<h2>Contact</h2>
    <div style="
    margin-top: 10px;
">Str. Negru Voda, nr. 105, Giurgiu</div>
                <div style="
    margin-top: 10px;
">0768 294 518</div>
         <div style="
    margin-top: 10px;
">burcescu.bogdan@yahoo.com</div>
</div>

<div>
    <h2>Info</h2>
<div style="
    margin-top: 10px;
">
About us
</div>
<div style="
    margin-top: 10px;
">
FAQ
</div>
    <div style="
    margin-top: 10px;
">
Delivery    </div>
</div>
</div>
`

function ajax(method, url, body, callback, rejectCallback) {
  let xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState === 4) {
      if (this.status === 200) {
        if (typeof callback === "function") {
          callback(JSON.parse(this.responseText));
        }
      } else {
        if (typeof rejectCallback === "function") {
          rejectCallback(new Error("serverul a dat eroare"));
        }
      }
    }
  };
  xhttp.open(method, url, true);
  xhttp.send(body);
};

function getNumberOfProdInCart() {

  ajax("GET", "https://wineareaa.firebaseio.com/cart.json", undefined, function(answer) {
    cart = answer;
    let sum = 0;
    for (let i in cart) {
      if (cart[i] === null) {
        continue
      };
      sum += Number(cart[i].quantity);
    }
    document.querySelector("#nr-of-prod-in-cart").innerHTML = "(" + sum + ")";
  })
}

function loading() {
  let load = setTimeout(showPage, 500);
}

function showPage() {
  getList();
  document.querySelector("#productsContainer").classList.remove("hidden");
}

function getList() {
  ajax("GET", "https://wineareaa.firebaseio.com/products.json", undefined, function(answer) {
    list = answer;
    draw();
  })
};

function draw() {
  let str = "";
  for (let i in list) {
    if (!list.hasOwnProperty(i)) {
      continue;
    }
    if (list[i] === null) {
      continue;
    }

    str += `
    <div class="col-lg-3 col-xs-11 col-sm-6 product">
      <img src="${list[i].image}" alt="vin"/>
      <div>${list[i].name}</div>
      <div>${list[i].brand}</div>
      <div class="details">
        <div>${list[i].price} lei</div>
        <div><a href="details.html?products=${i}"><button>Detalii</button></a></div>
      </div>
    </div>
  `;
  }
  getNumberOfProdInCart();
  document.querySelector("#footer").innerHTML = footer;
  document.querySelector("#productsContainer").innerHTML = str;
}

