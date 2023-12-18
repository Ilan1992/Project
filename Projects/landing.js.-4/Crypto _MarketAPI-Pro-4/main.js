const coinList = document.getElementById("coinList");

const getData = async () => {
  try {
    let res = await axios.get("https://api.coincap.io/v2/assets");

    showCoinList(res.data.data);
  } catch (error) {
    console.log(error);
  }
};
getData();
function showCoinList(data) {
  coinList.innerHTML = " ";
  const {
    rank,
    symbol,
    name,
    marketCapUsd,
    priceUsd,
    changePercent24Hr,
    supply,
    maxSupply,
  } = data;

  let regex = /\B(?=(\d{3})+(?!\d))/g;
  
  for (let da of data) {
    let numChangePercent24HR = Number(da.changePercent24Hr);
    
    const chartContainerId = `chart_div_${da.rank}`;
    coinList.innerHTML += `<tr>
      <td>${da.rank}</td>
      <td>${da.name}</td>
      <td>${da.symbol}</td>
      <td>$ ${Number(da.priceUsd).toFixed(3).replace(regex, ",")}</td>
      <td class="${
        numChangePercent24HR * -1 > 0 ? "text-danger" : "text-success"
      }">${Number(da.changePercent24Hr).toFixed(2)} %</td>
      <td>$ ${Number(da.marketCapUsd).toFixed().replace(regex, ",")}</td>
      <td>${Number(da.supply).toFixed().replace(regex, ",")} ${da.symbol}</td>
      <td>${
        (da.maxSupply != null &&
          Number(da.maxSupply).toFixed().replace(regex, ",")) ||
        "No More Supply"
      } ${da.symbol}</td>
      
    </tr>`;
  }
}
google.charts.load('current', {packages: ['corechart', 'line']});
google.charts.setOnLoadCallback(drawBackgroundColor);

const getBitcoinPriceData = async () => {
  try {
    const value = document.querySelector("#input_id").value.toLowerCase();
    
    console.log(value);
    let res = await axios.get(
      `https://api.coincap.io/v2/assets/${value}/history?interval=d1`
    );

    const priceData = res.data.data.map((entry) => [
      new Date(entry.time),
      parseFloat(entry.priceUsd),
    ]);

    drawBackgroundColor(priceData);
  } catch (error) {
    console.log(error);
    alert(error)
  }
};
const btn = document.querySelector('#btn');
btn.addEventListener("click", getBitcoinPriceData);

function drawBackgroundColor(bitcoinPriceData) {
  var data = new google.visualization.DataTable();
  data.addColumn("date", "Time");
  data.addColumn("number", "USD Price");

  data.addRows(bitcoinPriceData)

  var options = {
    hAxis: {
      title: "Time",
      format: "MMM yyy"
    },
    vAxis: {
      title: "Price USD",
    },
    backgroundColor: "#f1f8e9",
  };
  var chart = new google.visualization.LineChart(
    document.getElementById("chart_div")
  );
  chart.draw(data, options);
}


