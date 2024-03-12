import React, { useRef , useState  } from 'react';
import { ImageFileResizer  } from 'react-image-file-resizer';

import axios  from 'axios';

function Uploadfile() {
    const inputRefFile = useRef(null);
    const inputRefText = useRef(null);
    const [base64String, setBase64String] = useState('');
    const [name, setName] = useState('');
    const [responseData, setResponseData] = useState(null);
    const [filename, setfilename] = useState(null);
    const [error, setError] = useState(null);


    
   const handChange =(event) => { 
    setfilename(file.name)
    convertToBase64(file);
  };

  const compressImage = (base64String, maxWidth, maxHeight) => {
    return new Promise((resolve, reject) => {
      const image = new Image();
      image.src = base64String;

      image.onload = () => {
        const canvas = document.createElement('canvas');
        const context = canvas.getContext('2d');

        const aspectRatio = image.width / image.height;
        let newWidth = image.width;
        let newHeight = image.height;

        if (newWidth > maxWidth) {
          newWidth = maxWidth;
          newHeight = newWidth / aspectRatio;
        }
        if (newHeight > maxHeight) {
          newHeight = maxHeight;
          newWidth = newHeight * aspectRatio;
        }

        canvas.width = newWidth;
        canvas.height = newHeight;

        context.drawImage(image, 0, 0, newWidth, newHeight);

        const compressedBase64 = canvas.toDataURL('image/jpeg');

        resolve(compressedBase64);
      };

      image.onerror = (error) => {
        reject(error);
      };
    });
  };

  const convertToBase64 = (file) => {
    const reader = new FileReader();

    reader.onload = () => {
      const base64 = reader.result.split(',')[1];
      setBase64String(base64);
    };

    reader.onerror = (error) => {
      console.error('Error converting file to Base64:', error);
    };

    reader.readAsDataURL(file);
  };

    const handClick = () => { 
        const inputValue2 = inputRefText.current.value;
        setName(inputValue2)
        console.log('Input value:', inputValue2);

        handlePostRequest()
    }

    const handlePostRequest = async () => {
        try {
          const response = await axios.post('http://localhost:3000/upload', {
            name: name,
            file:base64String,
            filename:filename
          });
          setResponseData(response.data);
          setError(null);
        } catch (error) {
          setError(error.response.data.message);
        }
      };

    return (
        <>
        <div className="container">
        <label for="name" className="label">ชื่อ:</label>
        <input type="text" id="name"  placeholder="กรอกชื่อของคุณ..." ref={inputRefText} />
        </div> 

        <div className="container">
        <label for="filepic" class="label">รูปภาพ</label>
        <input type="file" id="filepic"  className="custom-file-upload" ref={inputRefFile} onChange={handChange} placeholder="อัพโหลดรูป"/>
        </div> 
            <button onClick={handClick}>ปุ่ม</button>
        </>
    )
}

export default Uploadfile