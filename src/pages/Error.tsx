import { useEffect } from "react"
import Layout from "../Layout"
import { useCookies } from "react-cookie";


export default function Error() {
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    useEffect(() => {
        document.title = "Error"
        // if (cookies.token) {
        //     removeCookie('token');
        // }
    }, [])
    return (
        <Layout title="Error">
            <div className="mt-5">
                <h1 className="text-2xl font-bold text-gray-900">คุณไม่มีสิทธ์เข้าถึงหน้านี้ คุณไม่ได้เป็น Creator หรือ ไม่มีบัญชีผู้ใช้นี้ หรือไม่ได้เป็นผู้ดูแลระบบ</h1>
            </div>
        </Layout>
    )
}
