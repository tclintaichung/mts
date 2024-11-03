let feeList = [];
const station = [
  "動物園",
  "木柵",
  "萬芳社區",
  "萬芳醫院",
  "辛亥",
  "麟光",
  "六張犁",
  "科技大學",
  "大安",
  "忠孝復興",
  "南京復興",
  "中山國中",
  "松山機場",
  "大直",
  "劍南路",
  "西湖",
  "港墘",
  "文德",
  "內湖",
  "大湖公園",
  "葫洲",
  "東湖",
  "南港軟體園區",
  "南港展覽館",
];
let startBR = undefined;
let stopBR = undefined;
const outDisplay = document.getElementById("js-out");
const compute = document.getElementById("compute");

function cb(fee) {
  feeList = fee;
}

const fee = localStorage.getItem("myFee");
console.log(fee);

fetch("traffic.txt")
  .then((res) => res.text())
  .then((text) => {
    let tokens = text;
    const nums = tokens.split(" ");
    for (const num of nums) {
      feeList.push(Number(num));
    }
  })
  .catch((e) => console.error(e));

for (let i = 1; i <= 24; i++) {
  const r1 = document.getElementById("js-" + String(i));
  const r2 = document.getElementById("js-" + String(i) + "e");
  r1.addEventListener("change", (e) => {
    startBR = r1["value"];
    console.log(r1["value"]);
    localStorage.setItem("start", String(startBR));
  });
  r2.addEventListener("change", (e) => {
    stopBR = r2["value"];
    console.log(r2["value"]);
    startBR = Number(localStorage.getItem("start"));
    localStorage.setItem("stop", String(stopBR));
    let msg =
      "起點站: BR" +
      String(startBR) +
      " " +
      station[startBR - 1] +
      "<br>終點站: BR" +
      String(stopBR) +
      " " +
      station[stopBR - 1];
    if (startBR > stopBR) {
      const index = ((startBR - 2) * (startBR - 1)) / 2 + stopBR - 1;
      msg += "<br> 車資: " + String(feeList[index]);
    } else if (stopBR > startBR) {
      const index = ((stopBR - 2) * (stopBR - 1)) / 2 + startBR - 1;
      msg += "<br> 車資: " + String(feeList[index]);
    } else {
      msg += "<br> 免費";
    }
    localStorage.setItem("msg", msg);
    outDisplay.innerHTML = msg;
    console.log(msg);
  });
}
