import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import './Coin.css'

const Coin = () => {
  const { coinId } = useParams()
  const [coinData, setCoinData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [historicalData, setHistoricalData] = useState(null)  
  const [error, setError] = useState(null)

  useEffect(() => {
    let isCancelled = false
    const controller = new AbortController()

    setIsLoading(true)
    setError(null)

    const options = {
      method: 'GET',
      headers: {
        accept: 'application/json',
        'x-cg-demo-api-key': 'CG-Hqwv3QX7Cx4ZE3bobtc6BsNN'
      },
      signal: controller.signal
    }

    fetch(`https://api.coingecko.com/api/v3/coins/${coinId}`, options)
      .then(res => {
        if (!res.ok) throw new Error(`Request failed: ${res.status}`)
        return res.json()
      })
      .then(data => {
        if (!isCancelled) setCoinData(data)
      })
      .catch(err => {
        if (!isCancelled && err.name !== 'AbortError') setError(err.message)
      })
      .finally(() => {
        if (!isCancelled) setIsLoading(false)
      })

    return () => {
      isCancelled = true
      controller.abort()
    }
  }, [coinId])

  if (isLoading) {
    return (
      <div className="spinner">
        <div className="spin"></div>
      </div>
    )
  }

  if (error) {
    return <div className="coin-error">{error}</div>
  }

  if (!coinData) {
    return null
  }

  return (
    <div className="coin">
      <div className="coin-name">
        <img src={coinData?.image?.large} alt={coinData?.name || 'coin'} />
        <p>
          <b>{coinData?.name} ({coinData?.symbol?.toUpperCase()})</b>
        </p>
      </div>
    </div>
  )
}

export default Coin
