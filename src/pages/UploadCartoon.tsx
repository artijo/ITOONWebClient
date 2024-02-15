import Layout from "../Layout"
import { useState, useEffect } from "react"
import axios from "axios";
import { useCookies } from "react-cookie";
import config from "../config";
export default function UploadCartoon() {
    const [file, setFile] = useState<File | undefined>();
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [type, setType] = useState<string>('');
    const [subType, setSubType] = useState<string>('');
    const [episode, setEpisode] = useState<number>(0);
    const [cookies, setCookie, removeCookie] = useCookies(['token']);

    // interface Genre {
    //     id: number;
    //     name: string;

    // }

    type Genre = {
        id: number,
        name: string
    }


    const [genres, setGenres] = useState<Genre[]>([]);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setFile(e.target.files[0]);
        }
    }
    const handleSubmit = (e: any) => {
        e.preventDefault();
        console.log(file, title, description, type, subType);
        const formData = new FormData();
        formData.append('thumbnail', file as Blob);
        formData.append('name', title);
        formData.append('description', description);
        formData.append('type', type);
        formData.append('subType', subType);
        formData.append('episode', episode.toString());
        axios.post(`${config.BASE_URL}/newcartoon`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': 'Bearer ' + cookies.token
            }
        }).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    }

    const initGenres = async () => {
        const res = await axios.get(`${config.BASE_URL}/allgenre`);
        setGenres(res.data);
    }

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
            if(err.response.status === 401) {
                document.location.href = '/error';
            }
        })

        initGenres();

    }, [cookies.token])
    return (
        <Layout title="อัปโหลดการ์ตูน">
            <div className="pt-3">
                <form>
                    <div className="mb-2">
                        <label className="block text-lg font-medium leading-6 text-gray-900">รูปปก</label>
                        {file && <img src={URL.createObjectURL(file)} /> }
                        <input className="file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-red file:text-white" type="file" onChange={handleFileChange} accept="image/*" />
                    </div>
                    <div className="mb-2">
                        <label className="block text-lg font-medium leading-6 text-gray-900">ชื่อการ์ตูน</label>
                        <input type="text" className="block w-full rounded-md border-0 py-1.5 text-gray-900 p-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={(e)=>setTitle(e.target.value)}/>
                    </div>
                    <div className="mb-2">
                        <label className="block text-lg font-medium leading-6 text-gray-900">เรื่องย่อ</label>
                        <textarea className="block w-full rounded-md border-0 py-1.5 text-gray-900 p-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={(e)=>setDescription(e.target.value)}></textarea>
                    </div>
                    <div className="mb-2">
                        <label className="block text-lg font-medium leading-6 text-gray-900">จำนวนตอน</label>
                        <input type="number" className="block w-full rounded-md border-0 py-1.5 text-gray-900 p-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={(e)=>setEpisode(Number(e.target.value))}/>
                    </div>
                    <div className="mb-2">
                        <label className="block text-lg font-medium leading-6 text-gray-900">ประเภท</label>
                        <select className="rounded-md border-0 py-1.5 text-gray-900 p-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" onChange={(e)=>setType(e.target.value)}>
                           <option value="">เลือกประเภท</option>
                            {genres.map((genre, index) => (
                                 <option key={index} value={genre.id}>{genre.name}</option>
                            )
                            )}
                           
                        </select>
                        <input className="rounded-md border-0 py-1.5 text-gray-900 ml-2 p-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" type="text" placeholder="ประเภทรอง" onChange={(e)=>setSubType(e.target.value)}/>
                    </div>
                    <div>
                        <button className="bg-red text-white p-2 rounded-md block mx-auto mt-5" type="submit" onClick={(e) => handleSubmit(e)}>อัปโหลด</button>
                    </div>
                </form>
            </div>
        </Layout>
    )
}