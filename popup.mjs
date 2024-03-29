document.querySelector("#extractBtn").addEventListener("click", () => {});
// Import Axios and Cheerio as ES modules
// import cheerio from "cheerio";
// import axios from "./node_modules/axios/dist/axios.min.js";
document.addEventListener("DOMContentLoaded", () => {
  chrome.tabs.query(
    {
      active: true,
      lastFocusedWindow: true,
    },
    async function (tabs) {
      const tab = tabs[0]?.url;

      if (tab.startsWith("https://www.amazon.com/")) {
        alert("start");
        document.getElementById("result").textContent =
          "Active Tab URL is an Amazon URL.";

        try {
          alert("WORKING");
          const response = await axios.get(
            "https://www.amazon.com/deal/c0e328a0?showVariations=true&pf_rd_r=VJ4GM393NNCK798SVT24&pf_rd_t=Events&pf_rd_i=deals&pf_rd_p=2364d0f5-5054-4700-a4e8-74a53fead388&pf_rd_s=slot-14&ref=dlx_deals_gd_dcl_img_0_c0e328a0_dt_sl14_88"
          );
          alert("LINE 2");
          const html = response.data;
          const $ = cheerio.load(html);
          const shelves = [];

          $(
            "div.sg-col-4-of-12.s-result-item.s-asin.sg-col-4-of-16.sg-col.sg-col-4-of-20"
          ).each((_idx, el) => {
            const shelf = $(el);
            const title = shelf
              .find("span.a-size-base-plus.a-color-base.a-text-normal")
              .text();
            shelves.push(title);
          });

          alert(JSON.stringify(shelves));
          document.getElementById("result").textContent =
            "Fetched shelves: " + JSON.stringify(shelves);
        } catch (error) {
          alert("Error: " + error.message);
          document.getElementById("result").textContent =
            "Error fetching shelves.";
        }
      } else {
        alert("doesn't");
        document.getElementById("result").textContent =
          "Active Tab URL is not an Amazon URL.";
      }
    }
  );
});

// document.addEventListener("DOMContentLoaded", () => {
//   let tab;

//   chrome.tabs.query(
//     {
//       active: true,
//       lastFocusedWindow: true,
//     },
//     function (tabs) {
//       // and use that tab to fill in out title and url
//       tab = tabs[0]?.url;
//       if (tab.startsWith("https://www.amazon.com/")) {
//         alert("start");
//         document.getElementById("result").textContent =
//           "Active Tab URL is an Amazon URL.";

//         const axios = require("axios");
//         const cheerio = require("cheerio");

//         const fetchShelves = async () => {
//           try {
//             alert("WORKING");
//             alert("LINE 1");
//             const response = await axios.get(
//               "https://www.amazon.com/s?crid=36QNR0DBY6M7J&k=shelves&ref=glow_cls&refresh=1&sprefix=s%2Caps%2C309"
//             );
//             alert("LINE 2", response);

//             const html = response.data;
//             const $ = cheerio.load(html);
//             const shelves = [];
//             $(
//               "div.sg-col-4-of-12.s-result-item.s-asin.sg-col-4-of-16.sg-col.sg-col-4-of-20"
//             ).each((_idx, el) => {
//               const shelf = $(el);
//               const title = shelf
//                 .find("span.a-size-base-plus.a-color-base.a-text-normal")
//                 .text();

//               shelves.push(title);
//             });

//             return shelves;
//           } catch (error) {
//             alert(error);
//             throw error;
//           }
//         };

//         fetchShelves().then((shelves) => alert(JSON.stringify(shelves)));
//       } else {
//         alert("doesn");
//         document.getElementById("result").textContent =
//           "Active Tab URL is not an Amazon URL.";
//       }
//     }
//   );
// });

document.querySelector("#extractBtn").addEventListener("click", () => {
  chrome.tabs.query({ active: true, currentWindow: true }, function (tabs) {
    var activeTab = tabs[0];
    chrome.tabs.sendMessage(activeTab.id, { action: "fetchAmazonData" });
  });
});

// .addEventListener('click', function() {
//   alert("WORKINg")
//   chrome.tabs.query({ active: true, currentWindow: true }, function(tabs) {
//     var activeTab = tabs[0];
//     var url = activeTab.url;
//     alert(url)
//     document.getElementById('result').textContent = 'Active Tab URL: ' + url;
//   });
// });

// {
//   "manifest_version": 2,
//   "name": "DATA FETCH",
//   "version": "1.0",
//   "permissions": ["http://157.230.97.71:3000/"],
//   "background": {
//     "scripts": ["background/background.js"],
//     "persistent": true
//   },
//   "browser_action": {

//   },

// },

// "content_scripts": [
//   {
//     "matches": ["<all_urls>"],
//     "js": ["content.js"]
//   }
// ]
