import Layout from "../Layout"
import { useState, useEffect } from "react"
import axios from "axios";
import { useCookies } from "react-cookie";
import config from "../config";
import { useParams, useLocation } from "react-router-dom";
import Loading from "../components/Loading";
// import Compressor from 'compressorjs';

export default function UploadCartoon() {
    const location = useLocation();
    const { pathname } = location;
    const [file, setFile] = useState<File | undefined>();
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [type, setType] = useState<string>('');
    const [paid, setPaid] = useState<boolean>(false);
    const [price, setPrice] = useState<number>(0);
    const [cookies] = useCookies(['token']);
    const [loading, setLoading] = useState<boolean>(false);

    const { id } = useParams();

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
    const handleSubmit = async (e: any) => {
        setLoading(true);
        e.preventDefault();
        const formData = new FormData();
        if (file) {
            // try {
            //     const result = await new Promise((resolve, reject) => {
            //         new Compressor(file, {
            //             quality: 0.4,
            //             success(result) {
            //                 resolve(result);
            //             },
            //             error(err) {
            //                 reject(err.message);
            //             },
            //         });
            //     });
            //     formData.append('thumbnail', result as Blob);
            // } catch (error) {
            //     console.log(error);
            //     // Handle error if needed
            // }
            formData.append('thumbnail', file as Blob);
        }
        formData.append('name', title);
        formData.append('description', description);
        formData.append('type', type);
        formData.append('paid', paid.toString());
        formData.append('price', price.toString());
        if(id) {
            axios.put(`${config.BASE_URL}/cartoon/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + cookies.token
                }
            }).then(res => {
                console.log(res);
                document.location.href = '/success';
            }).catch(err => {
                console.log(err);
            })
        }
        else {
            axios.post(`${config.BASE_URL}/newcartoon`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + cookies.token
                }
            }).then(res => {
                console.log(res);
                document.location.href = '/success';
            }).catch(err => {
                console.log(err);
            })
        }
    }

    const initGenres = async () => {
        const res = await axios.get(`${config.BASE_URL}/allgenre`);
        setGenres(res.data);
    }

    useEffect(() => {
        if (!cookies.token) {
            document.location.href = '/login?redirect='+pathname;
        }
        axios.post(`${config.BASE_URL}/authcheckcreator`, {}, {
            headers: {
                'Authorization': 'Bearer ' + cookies.token
            }
        }).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
            if(err.response.status === 401){
                document.location.href = '/error';
            }else document.location.href = '/login?redirect='+pathname;
        })

        initGenres();

    }, [cookies.token])

    useEffect(() => {
        if (id) {
            axios.get(`${config.BASE_URL}/cartoon/${id}`).then(res => {
                setTitle(res.data.name);
                setDescription(res.data.description);
                setType(res.data.genreId.toString());
                const imageUrl = config.BASE_URL + '/' + res.data.thumbnail;
                const filetype = imageUrl.split('.').pop();
                const fetchImageAndSetFile = async () => {
                    try {
                      const response = await fetch(imageUrl);
                      const blob = await response.blob();
                      const file = new File([blob], title+'.'+filetype, { type: 'image/*' });
                      setFile(file);
                    } catch (error) {
                      console.error('Error fetching and setting image file:', error);
                    }
                  };
                  
                  fetchImageAndSetFile();

                console.log(res.data);
            }).catch(err => {
                console.log(err);
            })
        }
    }, [id])

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
                        <input type="text" className="block w-full rounded-md border-0 py-1.5 text-gray-900 p-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={title} onChange={(e)=>setTitle(e.target.value)}/>
                    </div>
                    <div className="mb-2">
                        <label className="block text-lg font-medium leading-6 text-gray-900">เรื่องย่อ</label>
                        <textarea className="block w-full rounded-md border-0 py-1.5 text-gray-900 p-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={description} onChange={(e)=>setDescription(e.target.value)}></textarea>
                    </div>
                    <div className="mb-2">
                        <label className="block text-lg font-medium leading-6 text-gray-900">ประเภท</label>
                        <select className="rounded-md border-0 py-1.5 text-gray-900 p-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={type} onChange={(e)=>setType(e.target.value)}>
    <option value="">เลือกประเภท</option>
    {genres.map((genre, index) => (
        <option key={index} value={genre.id}>{genre.name}</option>
    ))}
</select>
                    </div>
                    <div className="mb-2">
                        <label className="block text-lg font-medium leading-6 text-gray-900">ตั้งราคา</label>
                        <input type="radio" name="paid" value="false" checked={!paid} onChange={()=>setPaid(false)}/> ฟรี
                        <input type="radio" name="paid" value="true" checked={paid} onChange={()=>setPaid(true)}/> จ่ายเงิน
                        {paid && <input type="number" className="block w-full rounded-md border-0 py-1.5 text-gray-900 p-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" value={price} onChange={(e)=>setPrice(parseInt(e.target.value))}/>}
                    </div>
                    <div>
                        {loading ? (
                            <Loading type="spin" color="#000000" />
                        ) :(
                            <button className="bg-red text-white p-2 rounded-md block mx-auto mt-5" type="submit" onClick={(e) => handleSubmit(e)}>อัปโหลด</button>
                        )}
                    </div>
                </form>
            </div>
        </Layout>
    )
}