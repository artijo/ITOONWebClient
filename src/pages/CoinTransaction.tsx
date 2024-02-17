import axios from "axios";
import { useCookies } from "react-cookie";
import config from "../config";
import { useState, useEffect } from "react";
import Layout from "../Layout";
import { loadStripe } from '@stripe/stripe-js';


export default function Cointransaction() {
    const initStripe = async () => {
        const stripe = await loadStripe('pk_test_51OkK2WDulwlvkdoosW76OZEezA58xYfIm7aVPQvQvajiwG3rcVUg3YXKlRlivhv6FjDJVKpfDx2OnRtFSwKRqDpq00qCjUa9eG');
        return stripe;
    }
    const [cookies] = useCookies(['token']);
    const [coin, setCoin] = useState<number>(0);
    const [stripe, setStripe] = useState<any>(null);

    console.log(cookies.token);

    const handdleSubmit = (e: any) => {
        e.preventDefault();

        axios.post(`${config.BASE_URL}/checkout`, {
             
                product:{
                    price:coin,
                    quantity:1,
                    name:"Coin"
                }
            
        }, {
            headers: {
                'Authorization': 'Bearer ' + cookies.token
            }
        }).then(res => {
            console.log(res);
            if (stripe) {
                stripe.redirectToCheckout({
                    sessionId: res.data.id
                });
            }
        }).catch(err => {
            console.log(err);
        })
    }
    useEffect(() => {
        initStripe().then((res) => {
            setStripe(res);
        })
        if (!cookies.token) {
            document.location.href = '/login';
        }
        axios.post(`${config.BASE_URL}/authcheckweb`, {}, {
            headers: {
                'Authorization': 'Bearer ' + cookies.token
            }
        }).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
            if(err.response.status === 401) {
                document.location.href = '/login';
            }
        })

    }, [cookies.token])
    return (
    <Layout title="Coin Transaction">
        <div>
            <h1>Coin Transaction</h1>
            <form>
                <div>
                    <label htmlFor="amount">จำนวน Coin</label>
                    <input type="number" id="amount" onChange={(e)=>setCoin(Number(e.target.value))} />
                </div>
                <div>
                    <button onClick={(e)=>handdleSubmit(e)}>Submit</button>
                </div>
            </form>
        </div>
    </Layout>
    )
}