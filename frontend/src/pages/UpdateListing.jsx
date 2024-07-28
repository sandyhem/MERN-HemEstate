import { getDownloadURL, getStorage, ref, uploadBytesResumable } from "firebase/storage";
import React, { useEffect, useState } from "react";
import { app } from "../firebase";
import { useSelector } from 'react-redux'
import {useNavigate, useParams} from 'react-router-dom'

export default function UpdateListing() {
    const [files,setFiles]=useState([]);
    const [error,setError]=useState(false);
    const[loading,setLoading]=useState(false);
    const navigate=useNavigate()
    const [formData,setFormData]=useState({
        imageUrls:[],
        name:'',
        description:'',
        address:'',
        type:'rent',
        bedrooms:0,
        bathrooms:0,
        regularPrice:50,
        discountPrice:0,
        offer:false,
        parking:false,
        furnished:false,
    }) 
    const params=useParams();

    useEffect(()=>{
        const fetchListing =async()=>{
            const listingId=params.listingId;
            const res=await fetch(`/api/listing/get/${listingId}`);
            const data=await res.json();
            if(data.success === false){
                console.log("error in fetching is",data.messsage);
                return;
            }
            setFormData(data);
        }

   fetchListing();
    },[])
    const [uploading,setUploading]=useState(false);
    const [imageUploadError,setImageUploadError]=useState(false);
     const {currentUser}=useSelector((state)=>state.user)
    const handleImageSubmit=()=>{
     if(files.length>0 && files.length + formData.imageUrls.length<7){
      setUploading(true);
      setImageUploadError(false);  
      const promises=[];
        for(let i=0;i<files.length;i++){
           promises.push(storeImage(files[i]));
        }
        Promise.all(promises).then((urls)=>{
            setFormData({...formData,imageUrls:formData.imageUrls.concat(urls)});
            setImageUploadError(false);
            setUploading(false);
        }).catch((err)=>{
            setImageUploadError('Image Upload failure(size<2MB per image)')
            setUploading(false);
          });
     }
     else{
         setImageUploadError('you can only upload atmost 6 images!')
          setUploading(false);
        }

    }
    const storeImage=async(file)=>{
        return new Promise((resolve,reject)=>{
                const storage=getStorage(app);
                const fileName=new Date().getTime()+file.name;
                const storageRef=ref(storage,fileName);
                const uploadTask=uploadBytesResumable(storageRef,file);
                uploadTask.on(
                    'state_changed',
                    (snapshot)=>{
                        const progress=(snapshot.bytesTransferred/snapshot.totalBytes)*100;
                        console.log(progress+`%`);
                    },
                    (error)=>{
                        reject(error);
                    },
                    ()=>{
                        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                            resolve(downloadURL);
                        })
                     }
                )
        })
    }
    const handleRemoveImage = (index) => {
      setFormData({
        ...formData,
        imageUrls: formData.imageUrls.filter((_, i) => i !== index)
      });
    };
    const handleChange=(e)=>{
     if(e.target.id === 'sale' || e.target.id ==='rent'){
      setFormData({
        ...formData,
        type:e.target.id
      })
     }

     if(e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer'){
       setFormData({
        ...formData,
        [e.target.id]:e.target.checked
       })
     }

     if(e.target.type === 'number' || e.target.type === 'text' || e.target.type === 'textarea'){
      setFormData({
        ...formData,
        [e.target.id]:e.target.value
      })
     }
    }

    const handleSubmit=async(e)=>{
         e.preventDefault();
         try {
          if(formData.imageUrls.length<1)return setError("You must Upload atleast one image!");
          if(+formData.regularPrice<+formData.discountPrice){
            return setError('Discount Price must be lower than regular price')
          }
          setLoading(true);
          setError(false);
          const res =await fetch(`/api/listing/update/${params.listingId}`,{
            method:'POST',
            headers:{
              'Content-Type':'application/json'
            },
            body:JSON.stringify({
              ...formData,
              userRef:currentUser._id
            })
          })
          const data=await res.json();
          setLoading(false);
         if(data.success === false){
          setError(data.messsage);
          setLoading(false);
          return;
         }
         setLoading(false);
          navigate(`/listing/${data._id}`)
         } catch (error) {
          setError(error.messsage);
          setLoading(false);
         }
    }
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Update a Listing
      </h1>
      <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-4">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            className="border p-3 rounded-lg"
            id="name"
            maxLength="62"
            minLength="10"
            placeholder="Name"
            required
            onChange={handleChange}
            value={formData.name}
          />
          <textarea
            type="text"
            className="border p-3 rounded-lg"
            id="description"
            placeholder="Description"
            required
            onChange={handleChange}
            value={formData.description}
          />
          <input
            type="text"
            className="border p-3 rounded-lg"
            id="address"
            placeholder="Address"
            required
            onChange={handleChange}
            value={formData.address}
          />
          <div className="flex gap-6 flex-wrap">
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5" onChange={handleChange}
            checked={formData.type === 'sale'}/>
              <span>Sell</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="rent" className="w-5" onChange={handleChange}
            checked={formData.type === 'rent'} />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="parking" className="w-5"
              onChange={handleChange}
              checked={formData.parking} />
              <span>Parking Slot</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="furnished" className="w-5" 
                 onChange={handleChange}
                 checked={formData.furnished}/>
              <span>Furnished</span>
            </div>
            <div className="flex gap-2">
              <input type="checkbox" id="offer" className="w-5"
                 onChange={handleChange}
                 checked={formData.offer} />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min="1"
                max="10"
                required
                className="p-3 border-gray-300 rounded-lg"
                onChange={handleChange}
                value={formData.bedrooms}
              />
              <p>Beds</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                min="1"
                max="10"
                required
                className="p-3 border-gray-300 rounded-lg"
                onChange={handleChange}
                value={formData.bathrooms}
              />
              <p>Baths</p>
            </div>
            <div className="flex flex-col items-center">
              <input
                type="number"
                id="regularPrice"
                min="50"
                max='1000000'
                required
                className="p-3 border-gray-300 rounded-lg w-36"
                onChange={handleChange}
                value={formData.regularPrice}
              />
              <p>Regular Price</p>
              <span className="text-xs">($/month)</span>
            </div>
            {
              formData.offer &&
              (
                <div className="flex flex-col items-center">
                <input
                  type="number"
                  id="discountPrice"
                  min="0"
                  max='1000000'
                  required
                  className="p-3 border-gray-300 rounded-lg w-36"
                  onChange={handleChange}
                  value={formData.discountPrice}
                />
                <p>Discount Price</p>
                <span className="text-xs">($/month)</span>
                </div>
              )
            }
           </div>
        </div>
        <div className="flex flex-col gap-4 flex-1">
          <p className="font-semibold">
            Images:
            <span className="font-normal text-gray-600 ml-2">
              The first image will be cover (max 6)
            </span>
          </p>
          <div className="flex gap-4">
            <input
              className="p-3 border border-gray-300 rounded w-full"
              type="file"
              id="images"
              accept="image/*"
              onChange={(e) => setFiles(e.target.files)}
              multiple
            />
            <button disabled={uploading} type='button' onClick={handleImageSubmit} className="p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80">
             {
              uploading? 'Uploading...':'Upload'
             }
            </button>
          </div>
          <p className="text-red-700 text-sm">{imageUploadError && imageUploadError}</p>
          {
            formData.imageUrls.length>0 && formData.imageUrls.map((url,index)=>{
               return (
                <div key={url} className="flex justify-between p-3 border items-center">
                     <img src={url} alt="listing images" className="w-40 h-40 object-cover rounded-lg" />
                      <button onClick={()=>handleRemoveImage(index)} type='button' className="p-3 text-red-700 rounded-lg uppercase hover:opacity:75">Delete</button>
                </div>
               )
              
            })
          }
          <button disabled={loading || uploading} className="p-3 bg-slate-700 rounded-lg text-white roudned-lg uppercase hover:opacity-95 disabled:opacity-80">
           {
            loading? 'Listing...':'Update Listing'
           }
          </button>
          {
            error && <p className="text-red-700 text-sm">{error}</p>
          }
        </div>
      </form>

    </main>
  );
}
