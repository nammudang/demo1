import React, { useRef , useState  } from 'react';
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
    const file = event.target.files[0];
    setfilename(file.name)
    convertToBase64(file);
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