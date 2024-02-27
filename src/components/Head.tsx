import { useEffect, useState } from "react"
import { useCookies } from "react-cookie";
import axios from "axios";
import config from "../config";

interface userProps {
    id: number,
    name: string,
    email: string,
}

export default function Head({ title }: { title: string}) {
    const [cookies] = useCookies(['token']);
    useEffect(() => {
        if(cookies.token){
            axios.get(`${config.BASE_URL}/user/web`, {
                headers: {
                    'Authorization': 'Bearer ' + cookies.token
                }
            }).then(res => {
                console.log(res.data);
                setUser(res.data);
            }).catch(err => {
                console.log(err);
            })
        }
    }, [cookies.token])

    const [user, setUser] = useState<userProps>({id: 0, name: 'guest', email: ''});
    return (
    <div className="bg-red text-white">
        <div className="container mx-auto p-5">
            <h1 className="text-2xl">{title}</h1>
            <div className="flex justify-between">
                <div>
                    <p>{user.name}</p>
                    <p>{user.email}</p>
                </div>
                <div>
                    {user.id === 0 ? <a href="/login">เข้าสู่ระบบ</a> : <a href="/logout">ออกจากระบบ</a>}
                    
                </div>
            </div>
        </div>
    </div>
    )
}