import Layout from "../Layout"
import { useState, useEffect } from "react"
import axios from "axios";
import { useCookies } from "react-cookie";
export default function UploadEpisode() {
    const [thumbnail, setThumbnaiil] = useState<File | undefined>();
    const [title, setTitle] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [cartoonId, setCartoonId] = useState<string>('');
    const [images, setImages] = useState<FileList | null>();
    const [cookies] = useCookies(['token']);

    const handlethumbnail = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            setThumbnaiil(e.target.files[0]);
        }
    }

    const handdleimages = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            setImages(e.target.files);
        }
    }
    const handleremoveimageindex = (e: any,index: number) => {
        e.preventDefault();
       
            if (images) {
                const newimages = Array.from(images);
                newimages.splice(index, 1);
                setImages(newimages as any);
         
        }
    }
    const handdleaddimages = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files) {
            if (images) {
                const newimages = Array.from(images);
                for (let i = 0; i < e.target.files.length; i++) {
                    newimages.push(e.target.files[i]);
                }
                setImages(newimages as any);
                e.target.value = '';
            }
        }
    }

    const haddlesubmit = (e: any) => {
        e.preventDefault();
        console.log(thumbnail, title, description, cartoonId, images);
        const formData = new FormData();
        formData.append('cover', thumbnail as Blob);
        formData.append('title', title);
        formData.append('description', description);
        formData.append('cartoonId', cartoonId);
        formData.append('episode', '0');
        if (images) {
            for (let i = 0; i < images.length; i++) {
                formData.append('images', images[i]);
            }
        }
        axios.post('http://localhost:3000/newEpisode', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        }).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    }
    useEffect(() => {
        if (!cookies.token) {
            document.location.href = '/login';
        }
        axios.post('http://localhost:3000/authcheckweb', {}, {
            headers: {
                'Authorization': 'Bearer ' + cookies.token
            }
        }).then(res => {
            console.log(res);
        }).catch(err => {
            console.log(err);
            document.location.href = '/login';
        })
    }, [cookies.token])
    return (
        <Layout title="อัปโหลดตอน">
            <div className="pt-3">
                <form>
                    <div className="mb-2">
                        <label className="block text-lg font-medium leading-6 text-gray-900">รูปปก</label>
                        {thumbnail && <img src={URL.createObjectURL(thumbnail)} className="w-1/4" />}
                        <input onChange={(e)=>handlethumbnail(e)} type="file" name="cover" className="block w-full rounded-md border-0 py-1.5 text-gray-900 p-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                    <div className="mb-2">
                        <label className="block text-lg font-medium leading-6 text-gray-900">ชื่อตอน</label>
                        <input type="text" className="block w-full rounded-md border-0 py-1.5 text-gray-900 p-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                    <div className="mb-2">
                        <label className="block text-lg font-medium leading-6 text-gray-900">คำอธิบาย</label>
                        <textarea className="block w-full rounded-md border-0 py-1.5 text-gray-900 p-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"></textarea>
                    </div>
                    <div className="mb-2">
                        <label className="block text-lg font-medium leading-6 text-gray-900">เลือกการ์ตูน</label>
                        <select className="block w-full rounded-md border-0 py-1.5 text-gray-900 p-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6">
                            <option value="1">การ์ตูน 1</option>
                            <option value="2">การ์ตูน 2</option>
                            <option value="3">
                                การ์ตูน 3
                            </option>
                        </select>
                    </div>
                    {images ? (
                        <div></div>
                    ) : (
                        <div className="upload-btn-wrapper">
                            <button className="btn">อัปโหลดรูป</button>
                            <input onChange={handdleimages} type="file" name="images" multiple/>
                        </div>
                    )}
                    {images && <div>
                        {Array.from(images).map((image, index) => {
                            return (
                                <><img key={index} src={URL.createObjectURL(image)} className="w-1/4" /><button onClick={(e) => handleremoveimageindex(e, index)}>ลบ</button></>
                            )
                        })}
                    <div className="upload-btn-wrapper">
                        <button className="btn">อัปโหลดเพิ่มเติม</button>
                        <input onChange={(e)=>handdleaddimages(e)} type="file" name="images" multiple/>
                    </div>
                    </div>}
                    <div className="mb-2">
                        <button onClick={haddlesubmit} className="bg-red text-white mt-5 p-2 block mx-auto rounded-md">อัปโหลดตอน</button>
                    </div>
                </form>
            </div>
        </Layout>
    )
}