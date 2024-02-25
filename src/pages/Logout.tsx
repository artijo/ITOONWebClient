import { useEffect } from "react";
import { useCookies } from "react-cookie";
export default function Logout() {
    const [cookies, setCookie, removeCookie] = useCookies(['token']);
    useEffect(() => {
        document.title = "Logout";
        if (cookies.token) {
            removeCookie('token');
            document.location.href = '/';
        }
    }, [])
    return (
        <div></div>
    )
}