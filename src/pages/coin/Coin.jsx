import React, { useContext, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { CoinContext } from '../../context/CoinContext'
import './Coin.css'

const Coin = () => {
  const { coinId } = useParams()
  const { currency } = useContext(CoinContext)

  const [coinData, setCoinData] = useState(null)
  const [historicalData, setHistoricalData] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isCancelled = false
    setIsLoading(true)
    setError(null)

    const API_BASE = import.meta.env.VITE_CG_BASE_URL || 'https://api.coingecko.com/api/v3'
    const headers = { accept: 'application/json' }
    if (import.meta.env.VITE_CG_DEMO_API_KEY) {
      headers['x-cg-demo-api-key'] = import.meta.env.VITE_CG_DEMO_API_KEY
    }

    const options = { method: 'GET', headers }

    Promise.all([
      fetch(`${API_BASE}/coins/${coinId}`, options).then(r => {
        if (!r.ok) throw new Error(`Coin request failed: ${r.status}`)
        return r.json()
      }),
      fetch(`${API_BASE}/coins/${coinId}/market_chart?vs_currency=${currency.name}&days=30`, options).then(r => {
        if (!r.ok) throw new Error(`Chart request failed: ${r.status}`)
        return r.json()
      })
    ])
      .then(([coin, chart]) => {
        if (!isCancelled) {
          setCoinData(coin)
          setHistoricalData(chart)
        }
      })
      .catch(err => {
        if (!isCancelled) setError(err.message)
      })
      .finally(() => {
        if (!isCancelled) setIsLoading(false)
      })

    return () => {
      isCancelled = true
    }
  }, [coinId, currency.name])

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

  if (!coinData) return null

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
