import Layout from "../Layout"
import { useState, useEffect } from "react";
import axios from "axios";
import { useCookies } from "react-cookie";
import config from "../config";
import { useLocation } from "react-router-dom";
export default function Login() {
    const location = useLocation();
    const { search } = location;
    console.log(search);
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    const handleSubmit = (e: any) => {
        e.preventDefault();
        axios.post(`${config.BASE_URL}/loginweb`, {
            email,
            password
        }).then(res => {
            console.log(res);
            setCookie('token', res.data.token, { maxAge: 3600*24*7 });
            document.location.href = '/';
        }).catch(err => {
            console.log(err);
        })
    }
    useEffect(() => {
        if (cookies.token) {
            document.location.href = search.replace('?', '').split('=')[1];
        }
    }, [cookies.token])

    return (
        <Layout title="เข้าสู่ระบบสำหรับ Creator">
            <div className="mt-5">
                <form>
                    <div className="mb-2">
                        <label className="block text-lg font-medium leading-6 text-gray-900">อีเมล</label>
                        <input onChange={(e)=>setEmail(e.target.value)} type="email" className="block w-full rounded-md border-0 py-1.5 text-gray-900 p-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>
                    <div className="mb-2">
                        <label className="block text-lg font-medium leading-6 text-gray-900">รหัสผ่าน</label>
                        <input onChange={(e)=>setPassword(e.target.value)} type="password" className="block w-full rounded-md border-0 py-1.5 text-gray-900 p-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>
                    <div className="mb-2">
                        <button onClick={(e)=>handleSubmit(e)} className="bg-red text-white mt-5 p-2 block mx-auto rounded-md">เข้าสู่ระบบ</button>
                    </div>
                </form>
            </div>
        </Layout>
    )
}