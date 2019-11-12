

const app = document.getElementById("changeColor");

const container = document.createElement("div");
container.setAttribute("class", "container");

app.appendChild(container);

var API_KEY = "12959506-0c707c1255a41052fb69dcc17";
var URL =
  "https://api.chatrbaazan.ir/api/v1/extension/?url=" + "changal.com";
var xmlhttp = new XMLHttpRequest();
xmlhttp.onreadystatechange = function() {
  if (this.readyState == 4 && this.status == 200) {
    var myObj = JSON.parse(this.responseText);
    document.getElementById("result_num").innerHTML =
      "نام سایت : " + myObj.name;
    /*myObj.hits.length*/

    var image_test = document.getElementById("image_content");
    image_test.setAttribute("src", myObj.image);
    //console.log(myObj.hits.length);
    // chrome.browserAction.setBadgeText({
    //   text: myObj.product_company.length + ""
    // });

    myObj.product_company.forEach(element => {
      const eachOff = document.createElement("div");
      eachOff.setAttribute("class", "card");

      const desc = document.createElement("p");
      desc.setAttribute("class", "desc");
      desc.textContent = element.name;

      const offCode = document.createElement("p");
      offCode.setAttribute("class", "offCode");
      offCode.textContent = element.discount_code;

      container.appendChild(eachOff);
      eachOff.appendChild(desc);
      eachOff.appendChild(offCode);
    });

    //container.appendChild(image_test);
  }
};
xmlhttp.open("GET", URL, true);
xmlhttp.send();
