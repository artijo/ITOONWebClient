import { useEffect } from "react"
import Layout from "../Layout"
import { Link } from "react-router-dom";


export default function Error() {
    useEffect(() => {
        document.title = "Error"
        // if (cookies.token) {
        //     removeCookie('token');
        // }
    }, [])
    return (
        <Layout title="Error">
            <div className="mt-5">
                <h1 className="text-2xl font-bold text-gray-900 mb-5">คุณไม่มีสิทธ์เข้าถึงหน้านี้ คุณไม่ได้เป็น Creator หรือ ไม่มีบัญชีผู้ใช้นี้ หรือไม่ได้เป็นผู้ดูแลระบบ</h1>
                <Link to="/" className="bg-red text-white mt-5 p-2 mx-auto rounded-md">กลับหน้าแรก</Link>
            </div>
        </Layout>
    )
}
