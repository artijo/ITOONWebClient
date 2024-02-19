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
    <Layout title="เติมเหรียญ">
        <div>
            <h1 className="text-3xl text-center font-bold mt-2">เติมเหรียญ</h1>
            <p className="text-center">เติมเหรียญเพื่อใช้ในการสนับสนุนผู้สร้างสรรค์ผลงาน</p>
            <p className="text-center">1 บาท = 1 เหรียญ</p>
            <p className="text-center">เติมเหรียญเริ่มต้นที่ 20 เหรียญ</p>
            <p className="text-center">เหรียญที่เติมจะไม่สามารถถอนออกมาได้</p>
            <p className="text-center">เหรียญที่เติมจะไม่สามารถโอนให้ผู้อื่นได้</p>
            <p className="text-center">รองรับการชำระผ่าน เดบิต/เครดิต และ พร้อมเพย์</p>
            <form>
                <div className="md-2">
                    <label htmlFor="amount" className="block text-lg font-medium leading-6 text-gray-900">จำนวน Coin</label>
                    <input type="number" min={20} className="block w-full rounded-md border-0 py-1.5 text-gray-900 p-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" id="amount" onChange={(e)=>setCoin(Number(e.target.value))} />
                </div>
                <div>
                    <button className="bg-red text-white p-2 rounded-md block mx-auto mt-5" onClick={(e)=>handdleSubmit(e)}>เติมเหรียญ</button>
                </div>
            </form>
        </div>
    </Layout>
    )
}