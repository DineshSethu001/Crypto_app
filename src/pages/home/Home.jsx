import React, { useContext, useEffect, useState } from 'react'
import './Home.css'
import { CoinContext } from '../../context/CoinContext'
import { Link } from 'react-router-dom'

const Home = () => {
  const {allCoin,currency} = useContext(CoinContext)
  const [displayCoin, setDisplayCoin] = useState([]);
  const[input,setInput] = useState()

  const inputHandler = (e)=>{
    setInput(e.target.value)
    if(e.target.value === ""){
      setDisplayCoin(allCoin)
    }

  }

  const searchHandling = async(e)=>{
    e.preventDefault();
    const coins = await allCoin.filter((item)=>{
      return item.name.toLowerCase().includes(input.toLowerCase())
    })
setDisplayCoin(coins)
  }

  useEffect(()=>{
    setDisplayCoin(allCoin)

  },[allCoin])
  return (
    <div className="home">
      <div className="hero">
        <h1>Largest<br/>Crypto Marketplace</h1>
        <p>Welcome to the world's largest cryptocurrency marketplace.Sign up to explore more about Cryptos.</p>
        <form onSubmit={searchHandling}>
          <input onChange={inputHandler} type="text" list="coinlist" placeholder='Search crypto ..'/>
          <datalist id="coinlist">
            {allCoin.map((item,index)=>(
              <option key={index} value={item.name}/>
            ))}
          </datalist>
          <button type="submit">Search</button>
        </form>
      </div>
      <div className="crypto-table">
        <div className="table-layout">
          <p className=''>#</p>
          <p className=''>Coins</p>
          <p className=''>Price</p>
          <p className="" style={{textAlign:"center"}}>24H Change</p>
          <p style={{textAlign:"right"}} className='market-cap'>Market Cap</p>
        </div>
        {
          displayCoin.slice(0,10).map((item,index)=>(
            <Link to={`/coin/${item.id}`}className="table-layout" key={index}>
              <p>{item.market_cap_rank}</p>
              <div className="">
                <img className="" src={item.image} alt=""/>
                <p>{item.name+ "_"+item.symbol}</p>  
              </div>
              <p>{currency.symbol}{item.current_price.toLocaleString()}</p>
              <p className={item.price_change_percentage_24h > 0 ?"green":"red"}>{Math.floor(item.price_change_percentage_24h*100)/100}</p>
              <p style={{textAlign:"right"}} className='market-cap'>{currency.symbol}{item.market_cap.toLocaleString()}</p>
            </Link>
          ))
        }
      </div>
    </div>
  )
}

export default Home