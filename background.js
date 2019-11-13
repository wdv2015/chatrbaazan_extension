// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({ color: "#3aa757" }, function() {
    console.log("The color is green.");
  });
URL2 = "digistyle.com";
chrome.tabs.onUpdated.addListener(function (){
  chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
   function(tabs) {
       URL2 = tabs[0].url;
       URL2 = URL2.replace(/^(?:https?:\/\/)?(?:www\.)?/i, "").split('/')[0];

       var URL =
           "https://api.chatrbaazan.ir/api/v1/extension/?url=" + URL2;
       //alert(URL);

       var xmlhttp = new XMLHttpRequest();
       xmlhttp.onreadystatechange = function () {
           if (this.readyState == 4 && this.status == 200) {
               var myObj = JSON.parse(this.responseText);
               if (myObj.product_company.length > 0) {
                   chrome.pageAction.show(tabs[0].id);
               }
           }
       }
       xmlhttp.open("GET", URL, true);
       xmlhttp.send();
       //alert(URL);

   }
   );
  });
  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([
      {
        conditions: [
          new chrome.declarativeContent.PageStateMatcher({

            pageUrl: { hostEquals: "changal.com" }
          })
        ],
        actions: [new chrome.declarativeContent.ShowPageAction()]
      }
    ]);
  });
});
