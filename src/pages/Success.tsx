import { Link } from "react-router-dom"
import Layout from "../Layout"

export default function Success(props : any) {
    return (
        <Layout title="ITOON">
            <div className="mt-5">
                <h1 className="text-2xl font-bold text-gray-900">Success</h1>
                <p>{props.message}</p>
                <Link to="/" className="bg-red text-white mt-5 p-2 mx-auto rounded-md">Back to home</Link>
            </div>
        </Layout>
    )
}