import Layout from "../Layout"
import { useState, useEffect } from "react"
import axios from "axios";
import { useCookies } from "react-cookie";
import config from "../config";
import { useParams, useLocation } from "react-router-dom";
export default function UploadEpisode() {
    const location = useLocation();
    const { pathname } = location;
    const [thumbnail, setThumbnaiil] = useState<File | undefined>();
    const [title, setTitle] = useState<string>('');
    const [images, setImages] = useState<FileList | null>();
    const [cookies] = useCookies(['token']);
    const { id, episode } = useParams();
    const [episodes, setEpisodes] = useState<Number>();

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
        const formData = new FormData();
        formData.append('cover', thumbnail as Blob);
        formData.append('title', title);
        formData.append('episode', episodes?.toString() ?? '1');
        formData.append('cartoonid', id as string);
        if (images) {
            for (let i = 0; i < images.length; i++) {
                formData.append('images', images[i]);
            }
        }
        if(episode) {
            axios.put(`${config.BASE_URL}/updateEpisode/${episode}`, formData, {
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
        }else{
            axios.post(`${config.BASE_URL}/newEpisode`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': 'Bearer ' + cookies.token
                }
            }).then(res => {
                console.log(res);
                document.location.href = '/success';
            }).catch(err => {
                console.log(err);
                if (err.response.status === 401) {
                    document.location.href = '/error';
                }
            })
        }
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
            }else document.location.href = '/login?redirect=' + pathname;
            
        })
        axios.get(`${config.BASE_URL}/getlastep/${id}`).then(res => {
            if(res.data == null) {
                setEpisodes(1);
                return;
            }
            setEpisodes(res.data.episodeNumber + 1);
            
        }).catch(err => {
            console.log(err);
        })
    }, [cookies.token])

    useEffect(() => {
        if (episode) {
            axios.get(`${config.BASE_URL}/getepbyid/${episode}`, {
            }).then(res => {
                setTitle(res.data.name);
                setEpisodes(res.data.episodeNumber);
                const imageUrl = config.BASE_URL + '/' + res.data.thumbnail;
                const filetype = imageUrl.split('.').pop();
                fetch(imageUrl).then(res => res.blob()).then(blob => {
                    const file = new File([blob], `thumbnail.${filetype}`, { type: `image/${filetype}` });
                    setThumbnaiil(file);
                });
                const fetchImagesAndSetFilelist = async () => {
                    const res = await axios.get(`${config.BASE_URL}/getImageEp/${episode}`);
                    const images = res.data;
                    const filelist = new DataTransfer();
                    for (let i = 0; i < images.length; i++) {
                        const imageUrl = config.BASE_URL + '/' + images[i].url;
                        const filetype = imageUrl.split('.').pop();
                        const response = await fetch(imageUrl);
                        const blob = await response.blob();
                        const file = new File([blob], `${images[i].name}.${filetype}`, { type: `image/${filetype}` });
                        filelist.items.add(file);
                    }
                    setImages(filelist.files);
                }
                fetchImagesAndSetFilelist();
            }).catch(err => {
                console.log(err);
            })
        }
    }
    , [episode])

    return (
        <Layout title="อัปโหลดตอน">
            <div className="pt-3">
                <form>
                    <div className="mb-2">
                        <label className="block text-lg font-medium leading-6 text-gray-900">รูปปก</label>
                        {thumbnail && <img src={URL.createObjectURL(thumbnail)} className="w-1/4" />}
                        <input onChange={(e)=>handlethumbnail(e)} type="file" name="cover" accept="image/*" className="file:mr-4 file:py-2 file:px-4
      file:rounded-full file:border-0
      file:text-sm file:font-semibold
      file:bg-red file:text-white" />
                    </div>
                    <div className="mb-2">
                        <label className="block text-lg font-medium leading-6 text-gray-900">ชื่อตอน</label>
                        <input value={title} onChange={(e)=>setTitle(e.target.value)} type="text" className="block w-full rounded-md border-0 py-1.5 text-gray-900 p-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                    <div className="mb-2">
                        <label className="block text-lg font-medium leading-6 text-gray-900">ตอนที่</label>
                        <input type="text" value={episodes?.toString() ?? '1'} readOnly className="block w-full rounded-md border-0 py-1.5 text-gray-900 p-2 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"/>
                    </div>
                    {images ? (
                        <div></div>
                    ) : (
                        <div className="upload-btn-wrapper">
                            <button className="btn">อัปโหลดรูป</button>
                            <input onChange={handdleimages} type="file" name="images" accept="image/*" multiple/>
                        </div>
                    )}
                    {images && <div className="grid grid-cols-2">
                        {Array.from(images).map((image, index) => {
                            return (
                                <>
                                <div className="w-full mx-auto" key={index}><img  src={URL.createObjectURL(image)} className="w-1/2" /><button onClick={(e) => handleremoveimageindex(e, index)}>ลบ</button></div>
                                <p>{image.name}</p>
                                </>
                            )
                        })}
                    <div className="upload-btn-wrapper">
                        <button className="btn">อัปโหลดเพิ่มเติม</button>
                        <input onChange={(e)=>handdleaddimages(e)} type="file" name="images" accept="image/*" multiple/>
                    </div>
                    </div>
                    }
                    <div className="mb-2">
                        <button onClick={haddlesubmit} className="bg-red text-white mt-5 p-2 block mx-auto rounded-md">อัปโหลดตอน</button>
                    </div>
                </form>
            </div>
        </Layout>
    )
}