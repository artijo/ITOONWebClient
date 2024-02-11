import Layout from "../Layout"
import { useEffect } from "react"
import { useCookies } from "react-cookie"
import axios from "axios"
import config from "../config"


export default function Home() {
    const [cookies] = useCookies(['token']);
    useEffect(() => {
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
            document.location.href = '/login';
        })
    } , [cookies.token])
    return (
        <Layout title="หน้าแรก">
            <div className="mt-5">
                <h1 className="text-2xl font-bold text-gray-900">หน้าแรก</h1>
            </div>
        </Layout>
    )
}