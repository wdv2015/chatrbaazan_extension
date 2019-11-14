URL = "";

chrome.tabs.query({ 'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT },
    function (tabs) {
        URL2 = tabs[0].url;
        URL2 = URL2.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0];
        URL =
            "https://api.chatrbaazan.ir/api/v1/extension/?url=" + URL2;
        toCreateTest();
    }
);

function toCreateTest() {
    const app = document.getElementById("changeColor");

    const container = document.createElement("div");
    container.setAttribute("class", "container");

    app.appendChild(container);

    var API_KEY = "12959506-0c707c1255a41052fb69dcc17";
    // var URL = "https://api.chatrbaazan.ir/api/v1/extension/?url=" + "changal.com";
    counter = 0;

    var xmlhttp = new XMLHttpRequest();
    xmlhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var myObj = JSON.parse(this.responseText);
            document.getElementById("result_num").innerHTML = myObj.name;
            /*myObj.hits.length*/

            var image_test = document.getElementById("image_content");
            image_test.setAttribute("src", myObj.image);


            myObj.product_company.forEach(element => {
                const eachOff = document.createElement("div");
                eachOff.setAttribute("class", "card");
                eachOff.setAttribute("dir", "rtl");

                const desc = document.createElement("h5");
                desc.setAttribute("class", "desc");
                desc.textContent = element.name;

                // const offCode = document.createElement("p");
                // offCode.setAttribute("class", "offCode");
                // offCode.textContent = element.discount_code;

                const offerOff = document.createElement("span");
                offerOff.setAttribute("class", "offer_off");
                offerOff.textContent = element.chatrbazi;

                const copyDiv = document.createElement("div");
                copyDiv.setAttribute("class", "copy_div");

                const copyInput = document.createElement("input");
                copyInput.setAttribute("class", "coupon_code");
                copyInput.setAttribute("id", "inputid" + counter);
                copyInput.setAttribute("value", element.discount_code);
                copyInput.setAttribute("disabled", "disabled");
                // copyInput.textContent = element.discount_code;

                const copyBtn = document.createElement("button");
                copyBtn.setAttribute("id", "id" + counter);
                copyBtn.setAttribute("class", "copy_button");
                copyBtn.textContent = 'کپی';

                const copyTooltip = document.createElement("span");
                copyTooltip.setAttribute("id", "spanid" + counter);
                copyTooltip.setAttribute("class", "copy_tooltip");

                const maincont = document.createElement("div");
                maincont.setAttribute("class", "main");


                copyDiv.appendChild(copyBtn);
                copyDiv.appendChild(copyInput);

                copyBtn.appendChild(copyTooltip);

                eachOff.appendChild(maincont);
                eachOff.appendChild(offerOff);

                maincont.appendChild(desc);
                maincont.appendChild(copyDiv);

                container.appendChild(eachOff);
                //eachOff.appendChild(offCode);

                counter++;

            });

            //container.appendChild(image_test);
        }
    };
    xmlhttp.open("GET", URL, true);
    xmlhttp.send();
}