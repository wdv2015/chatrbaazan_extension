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
                // copyTooltip.innerHTML = 'کد کپی شد';

                const maincont = document.createElement("div");
                maincont.setAttribute("class", "main");


                copyDiv.appendChild(copyBtn);
                copyDiv.appendChild(copyInput);

                copyBtn.appendChild(copyTooltip);

                eachOff.appendChild(offerOff);
                eachOff.appendChild(maincont);

                maincont.appendChild(copyDiv);
                maincont.appendChild(desc);

                container.appendChild(eachOff);
                //eachOff.appendChild(offCode);

                counter++;

            });

            const button = document.getElementsByClassName('copy_button');

            console.log(button.length);
            for (i = 0; i < button.length; i++) {
                button[i].addEventListener('click', function (event) {
                    console.log(event.target.id);
                    let copyText = document.getElementById("input" + event.target.id);
                    chrome.runtime.sendMessage({ command: "copy", text: copyText.value }, function (response) {
                        console.log(response.response);
                        if (response.response == 'copied') {
                            console.log('in if')
                            console.log(event)
                            console.log("span" + event.target.id)
                            let tooltip = document.getElementById("span" + event.target.id);
                            tooltip.style.visibility = 'visible';
                            tooltip.innerHTML = "کد کپی شد";
                            tooltip.style.opacity = '1';
                        }

                    });
                    // copyText.focus();
                    // copyText.select();
                    // document.execCommand("copy");
                    console.log(copyText);
                    // console.log(copyText.focus());
                    // console.log(copyText.select());
                    // console.log(document.execCommand("copy"));
                    // console.log(123)

                });
                button[i].addEventListener('mouseout', function (event) {
                    let tooltip = document.getElementById("span" + event.target.id);
                    tooltip.style.visibility = 'hidden';
                    tooltip.style.opacity = '0';
                });

            }

            //container.appendChild(image_test);
        }
    };
    xmlhttp.open("GET", URL, true);
    xmlhttp.send();
}



