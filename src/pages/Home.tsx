import Layout from "../Layout"
import { useEffect } from "react"
import { useCookies } from "react-cookie"
import axios from "axios"
import config from "../config"
import { useLocation, Link } from "react-router-dom"

export default function Home() {
    const location = useLocation();
    const { pathname } = location;
    const [cookies] = useCookies(['token']);
    useEffect(() => {
        if (!cookies.token) {
            document.location.href = '/login?redirect=' + pathname;
        }
        axios.post(`${config.BASE_URL}/authcheckweb`, {}, {
            headers: {
                'Authorization': 'Bearer ' + cookies.token
            }
        }).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
            document.location.href = '/login?redirect=' + pathname;
        })
    } , [cookies.token])
    return (
        <Layout title="หน้าแรก">
            <div className="mt-5">
                <h1 className="text-2xl font-bold text-gray-900">หน้าแรก</h1>
                <p className="my-5">สำหรับ Crator</p>
                <Link to="/upload/cartoon" className="bg-red text-white mt-5 p-2 mx-auto rounded-md">สร้างคอร์ส</Link>
                <p className="my-5">สำหรับ User</p>
                <Link to="/coin-transaction" className="bg-red text-white mt-5 p-2 mx-auto rounded-md">เติมเหรียญ</Link>
            </div>
        </Layout>
    )
}