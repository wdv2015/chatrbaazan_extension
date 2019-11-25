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
                if (getCuurentDate() >= element.expiration_date || element.expiration_date == null) {
                    const eachOff = document.createElement("div");
                    eachOff.setAttribute("class", "card");
                    eachOff.setAttribute("dir", "rtl");
                    //alert(element.discount_code);
                    if (element.discount_code != null) {

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

                        const _link_ = "https://chatrbaazan.ir/offer/" + element.slug;

                        const morebtn = document.createElement("button");
                        morebtn.setAttribute("class", "more_button");
                        morebtn.textContent = "توضیح بیشتر";




                        const linkToMainSite = document.createElement("a");
                        linkToMainSite.setAttribute("class", "fullDesc");
                        linkToMainSite.setAttribute("target", "_blank");
                        linkToMainSite.setAttribute("href", _link_);

                        const maincont = document.createElement("div");
                        maincont.setAttribute("class", "main");

                        linkToMainSite.appendChild(morebtn);


                        copyDiv.appendChild(copyBtn);
                        copyDiv.appendChild(copyInput);

                        copyBtn.appendChild(copyTooltip);

                        eachOff.appendChild(offerOff);
                        eachOff.appendChild(maincont);
                        eachOff.appendChild(linkToMainSite);

                        maincont.appendChild(copyDiv);
                        maincont.appendChild(desc);

                        container.appendChild(eachOff);
                        //eachOff.appendChild(offCode);

                        counter++;
                    } else {
                        //alert("isdfafdjsjhfjhdsjkfh");
                        const desc = document.createElement("h5");
                        desc.setAttribute("class", "desc");
                        desc.textContent = element.name;

                        const offerOff = document.createElement("span");
                        offerOff.setAttribute("class", "offer_off");
                        offerOff.textContent = element.chatrbazi;

                        var _link_ = "https://chatrbaazan.ir/offer/" + element.slug;

                        const linkToMainSite = document.createElement("a");
                        linkToMainSite.setAttribute("class", "fullDesc");
                        linkToMainSite.setAttribute("target", "_blank");
                        linkToMainSite.setAttribute("href", _link_);

                        const morebtn = document.createElement("button");
                        morebtn.setAttribute("class", "more_button");
                        morebtn.textContent = "توضیح بیشتر";

                        linkToMainSite.appendChild(morebtn);

                        eachOff.appendChild(desc);
                        eachOff.appendChild(offerOff);
                        eachOff.appendChild(linkToMainSite);

                        container.appendChild(eachOff);

                    }
                }

            });

            const button = document.getElementsByClassName('copy_button');

            for (i = 0; i < button.length; i++) {
                button[i].addEventListener('click', function (event) {
                    let copyText = document.getElementById("input" + event.target.id);
                    chrome.runtime.sendMessage({ command: "copy", text: copyText.value }, function (response) {
                        if (response.response == 'copied') {
                            let tooltip = document.getElementById("span" + event.target.id);
                            tooltip.style.visibility = 'visible';
                            tooltip.innerHTML = "کد کپی شد";
                            tooltip.style.opacity = '1';
                        }

                    });

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

function getCuurentDate() {
    var now = new Date();
    var dd = String(now.getDate());
    var mm = String(now.getMonth() + 1);
    var yyyy = String(now.getFullYear());

    var today = yyyy + "-" + mm + "-" + dd + "T23:59:59+03:30";
    return today;
}
