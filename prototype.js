

const app = document.getElementById("changeColor");

const container = document.createElement("div");
container.setAttribute("class", "container");

app.appendChild(container);

var API_KEY = "12959506-0c707c1255a41052fb69dcc17";
var URL =
  "https://api.chatrbaazan.ir/api/v1/extension/?url=" + "changal.com";
counter = 0;
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

      // const offCode = document.createElement("p");
      // offCode.setAttribute("class", "offCode");
      // offCode.textContent = element.discount_code;

      const offerOff = document.createElement("span");
      offerOff.setAttribute("class" , "offer_off");
      offerOff.textContent = element.chatrbazi;

      const copyDiv = document.createElement("div");
      copyDiv.setAttribute("class","copy_div");

      const copyInput = document.createElement("input");
      copyInput.setAttribute("id" , "inputid" + counter);
      copyInput.setAttribute("value" , element.discount_code);
      copyInput.setAttribute("disabled","disabled");
      // copyInput.textContent = element.discount_code;

      const copyBtn = document.createElement("button");
      copyBtn.setAttribute("id" ,"id"+counter);

      const copyTooltip = document.createElement("span");
      copyTooltip.setAttribute("id" , "spanid" + counter);

      eachOff.appendChild(copyDiv);
      copyDiv.appendChild(copyInput);
      copyDiv.appendChild(copyBtn);
      copyBtn.appendChild(copyTooltip);


      container.appendChild(eachOff);
      eachOff.appendChild(desc);
      //eachOff.appendChild(offCode);
      eachOff.appendChild(offerOff);

      counter++;

    });

    //container.appendChild(image_test);
  }
};
xmlhttp.open("GET", URL, true);
xmlhttp.send();
