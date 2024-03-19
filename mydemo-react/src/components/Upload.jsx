import React, { useRef , useState  } from 'react';
import { ImageFileResizer  } from 'react-image-file-resizer';
import { useCookies } from 'react-cookie';

import axios  from 'axios';

function Uploadfile() {
    const inputRefFile = useRef(null);
    const inputRefText = useRef(null);
    const [base64String, setBase64String] = useState('');
    const [namepic, setName] = useState('');
    const [responseData, setResponseData] = useState(null);
    const [filename, setfilename] = useState(null);
    const [error, setError] = useState(null);
    const [cookies, setCookie] = useCookies(['reload']);

    
   const handChangeFile =(event) => {
    const file =  event.target.files[0]
    setfilename(file.name)
    convertToBase64(file,100,100);
  };
 
  const convertToBase64 = (file, maxWidth, maxHeight) => {
    const reader = new FileReader();
    reader.onload = function(event) {
        const image = new Image();
        image.onload = function() {
            const canvas = document.createElement('canvas');
            let width = image.width;
            let height = image.height;
            if (width > height) {
                if (width > maxWidth) {
                    height *= maxWidth / width;
                    width = maxWidth;
                }
            } else {
                if (height > maxHeight) {
                    width *= maxHeight / height;
                    height = maxHeight;
                }
            }
            canvas.width = width;
            canvas.height = height;
            const ctx = canvas.getContext('2d');
            ctx.drawImage(image, 0, 0, width, height);
            let resizedDataURL = canvas.toDataURL('image/jpeg'); // ปรับรูปภาพให้เป็นประเภท jpeg ถ้าต้องการ
            resizedDataURL = resizedDataURL.split(',')[1]
            setBase64String(resizedDataURL);
        }
        image.src = event.target.result;
    }
    reader.readAsDataURL(file);
}


    const handClick = () => { 
        handlePostRequest()
    }

    const handChangeTxt = () => {
      const inputValue2 = inputRefText.current.value;
        setName(inputValue2)
    }

    const handlePostRequest = async () => {
        try {
          const response = await axios.post('http://localhost:3000/upload', {
            name: namepic,
            file:base64String,
            filename:filename
          });
          setResponseData(response.data);
          setCookie('reload', 'y', { path: '/' });
          setError(null);
        } catch (error) {
          setError(error.response.data.message);
        }
      };

    return (
        <>
        <div className="container">
        <label for="name" className="label">ชื่อ:</label>
        <input type="text" id="name"  placeholder="กรอกชื่อของคุณ..." ref={inputRefText} onChange={handChangeTxt} />
        </div> 

        <div className="container">
        <label for="filepic" class="label">รูปภาพ</label>
        <input type="file" id="filepic"  className="custom-file-upload" ref={inputRefFile} onChange={handChangeFile} placeholder="อัพโหลดรูป"/>
        </div> 
            <button onClick={handClick}>ปุ่ม</button>
        </>
    )
}

export default Uploadfile