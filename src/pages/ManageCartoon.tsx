import { useEffect, useState } from "react"
import Layout from "../Layout"
import { useCookies } from "react-cookie";
import axios from "axios";
import config from "../config";
import { Link } from "react-router-dom";

interface Cartoon {
    id: number,
    name: string,
    description: string,
    releseDate: string,
    thumbnail: string,
}

export default function ManageCartoon() {
    const [cookies] = useCookies(['token']);
    const [cartoons, setCartoons] = useState<Cartoon[]>([]);
    useEffect(() => {
        document.title = "จัดการการ์ตูน";
        if (!cookies.token) {
            document.location.href = '/login?redirect=' + document.location.pathname;
        }
        axios.post(`${config.BASE_URL}/authcheckcreator`, {}, {
            headers: {
                'Authorization': 'Bearer ' + cookies.token
            }
        }).then(res => {
            axios.get(`${config.BASE_URL}/cartoonbycreator/${res.data.creatorId}`, {}
            ).then(res => {
                console.log(res.data);
                setCartoons(res.data);
            }).catch(err => {
                console.log(err);
            })
        }).catch(err => {
            console.log(err);
            if (err.response.status === 401) {
                document.location.href = '/error';
            } else document.location.href = '/login?redirect=' + document.location.pathname;
        })
    }, [])
    return (
        <Layout title="จัดการการ์ตูน">
            <div className="mt-5">
                <h1 className="text-2xl font-bold text-gray-900">การ์ตูนของคุณ</h1>
                {/* showlist with grid row */}
                <div className="grid grid-cols-3 gap-4">
                    {cartoons.map((cartoon, index) => {
                        return (
                            <div key={index} className="bg-gray-100 p-2">
                                <Link to={`/creator/cartoon/${cartoon.id}`}>
                                    <img src={`${config.BASE_URL}/${cartoon.thumbnail}`} alt={cartoon.name} className="w-full h-auto object-cover" />
                                    <h2 className="text-lg font-bold">{cartoon.name}</h2>
                                </Link>
                                
                            </div>
                        )
                    })}
                    </div>
            </div>
        </Layout>
    )
}