import Layout from "../Layout"
import { useEffect, useState } from "react"
import axios from "axios"
import config from "../config"
import { useCookies } from "react-cookie"
import { useLocation } from "react-router-dom"

export default function ApproveCreator() {
    const [cookies] = useCookies(['token']);
    const [creators, setCreators] = useState<any[]>([]);
    const [approve, setApprove] = useState<boolean>(false);
    const location = useLocation();
    const { pathname } = location;

    const handleApprove = (e: any ,id: number) => {
        e.preventDefault();
        setApprove(true);
        axios.put(`${config.BASE_URL}/creator/${id}`, {}, {
            headers: {
                'Authorization': 'Bearer ' + cookies.token
            }
        }).then(res => {
            console.log(res);
            setApprove(false);
        }).catch(err => {
            console.log(err);
        })
    }

    useEffect(() => {
        axios.get(`${config.BASE_URL}/allcreator`, {
            headers: {
                'Authorization': 'Bearer ' + cookies.token
            }
        }).then(res => {
            setCreators(res.data);
            console.log(res);
        }).catch(err => {
            console.log(err);
            if (err.response.status == 401) {
                document.location.href = '/error';
            }else document.location.href = '/login?redirect='+pathname;
        })
    }
    , [cookies.token, approve])
    return (
        <Layout title="Approve Creator">
            <div className="container">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 mt-5">
                    <thead>
                        <tr>
                            <th>ชื่อ</th>
                            <th>อีเมล</th>
                            <th>เบอร์โทรศัพท์</th>
                            <th>อนุมัติ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {creators.map(creator => {
                            if( creator.status == "pending"){
                                return (
                                    <tr key={creator.id}>
                                        <td>{creator.user.name}</td>
                                        <td>{creator.user.email}</td>
                                        <td>{creator.user.phone}</td>
                                        <td><button className="btn btn-primary" onClick={(e)=>{
                                            handleApprove(e,creator.userId)
                                        }}>Approve</button></td>
                                    </tr>
                                )
                            }
                        })}
                    </tbody>
                </table>
            </div>
        </Layout>
    )
}