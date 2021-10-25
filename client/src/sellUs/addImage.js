//A component that allows the user who wants to sell a piano to a company to upload a picture of the piano
import React, {  useEffect, useContext } from "react"
import { deleteUserImages } from '../server/server'
import { createUserImage } from '../server/server'
import { GetUserImages } from '../server/server'
import { MyUser } from '../userContext'
import ImageUploading from 'react-images-uploading';

export default function App() {
  const { myuser} = useContext(MyUser)
  const [images, setImages] = React.useState([]);
  const maxNumber = 69;
    useEffect(() => {
    GetUserImages(myuser._id).then((res) => {
      setImages(res)
    });
  },[]);

  const onChange = (imageList, addUpdateIndex) => {
   if(!addUpdateIndex){
     //deleteUserImages(myuser._id)
   }
   else{
   const newimagelist =addUpdateIndex.map((singleitem)=>{  
      return imageList[singleitem]
    })
  
    newimagelist.map((item) => { 
      createUserImage({ userid: myuser._id, data_url: item.data_url })
    })}
    setImages(imageList);
};
  return (
    <div className="App">
      <ImageUploading
        multiple
        value={images}
        onChange={onChange}
        maxNumber={maxNumber}
        dataURLKey="data_url"
      >
        {({
          imageList,
          onImageUpload,
          isDragging,
        }) => (
            <div className="upload__image-wrapper">
              <button className="btn btn-primary"
                style={isDragging ? { color: 'red' } : undefined}
                onClick={onImageUpload}
              >
                Upload image
            </button>
              &nbsp;
              {imageList.map((image, index) => (
                <div key={index} className="image-item">
                  <img src={image['data_url']} alt="" width="30%"/>
                  <div className="image-item__btn-wrapper" >
                  </div>
                </div>
              ))}
            </div>
          )}
      </ImageUploading>
    </div>
  );
}

