import { createContext, useEffect, useState } from "react";

export const CoinContext = createContext()

const CoinContextProvier = (props) => {

    const [allCoin, setAllCoin] = useState([])
    const [currency, setCurrency] = useState({
        name: "usd",
        symbol: "$"
    })

    const fetchAllCoin = async () => {
        const API_BASE = import.meta.env.VITE_CG_BASE_URL || 'https://api.coingecko.com/api/v3'

        const headers = { accept: 'application/json' }
        if (import.meta.env.VITE_CG_DEMO_API_KEY) {
            headers['x-cg-demo-api-key'] = import.meta.env.VITE_CG_DEMO_API_KEY
        }

        const options = {
            method: 'GET',
            headers
        }

        fetch(`${API_BASE}/coins/markets?vs_currency=${currency.name}`, options)
            .then(res => res.json())
            .then(res => setAllCoin(res))
            .catch(err => console.error(err))
    }

        useEffect(() => {
            fetchAllCoin();
        }, [currency])

        const contextValue = {
            allCoin, currency, setCurrency
        }
    
        return (
            <CoinContext.Provider value={contextValue}>
                {props.children}
            </CoinContext.Provider>
        )
    }

    export default CoinContextProvier