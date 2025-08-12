import { useEffect, useState } from "react"
import Chart from "react-google-charts"

const LineChart = ({ historicalData }) => {
  const [data, setData] = useState([[{ type: "date", label: "Date" }, "Price"]])

  useEffect(() => {
    if (!historicalData || !historicalData.prices || historicalData.prices.length === 0) {
      setData([[{ type: "date", label: "Date" }, "Price"]])
      return
    }

    const dataCopy = [[{ type: "date", label: "Date" }, "Price"]]
    historicalData.prices.forEach((item) => {
      const date = new Date(item[0])
      const price = Number(item[1])
      dataCopy.push([date, price])
    })
    setData(dataCopy)
  }, [historicalData])

  if (data.length <= 1) {
    return <div style={{ height: 320, display: "grid", placeItems: "center" }}>No chart data</div>
  }

  return (
    <Chart
      chartType="LineChart"
      data={data}
      width="100%"
      height="320px"
      loader={<div>Loading Chart...</div>}
      options={{
        legend: { position: "none" },
        chartArea: { width: "90%", height: "70%" },
        hAxis: { format: "MMM d" },
        vAxis: { viewWindowMode: "explicit" },
      }}
    />
  )
}

export default LineChart