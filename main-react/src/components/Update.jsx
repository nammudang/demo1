import axios from 'axios'
import {useEffect , useState, useRef } from 'react'
import { useCookies } from 'react-cookie';
import { useLocation } from 'react-router-dom';

function Update() {
    const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const paramValue = queryParams.get('id');
  const valueRef = useRef(null);
    const [strHTML , setStrHTML] = useState('')
    const [cookies, setCookie] = useCookies(['reload']);

    const handClick = () => {
        axios.post('http://localhost:3000/update' , {
            id:paramValue,
            name:valueRef.current.value
        }).then(response => {
            setCookie('reload', 'y', { path: '/' });
        })

    }
    useEffect(() => {
        axios.post('http://localhost:3000/getdatadetail' , {
            id:paramValue
        })
          .then(response => {
            const str = response.data.map((item,id) => {
                return   <tr key={item.id}>
                <td>{item.id}</td>
                <td> {item.name} </td>
                <td><input ref={valueRef} type="text" id="txtName"></input></td>
                <td><button onClick={handClick}>Update</button></td>
              </tr>
            })
            setStrHTML(str)
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }, [cookies.reload]); 

    return (
        <>
       <div>
       <h2>Parameter ID: {paramValue}</h2>
            <table>
      <thead>
        <tr>
          {strHTML}
        </tr>
      </thead>
      
    </table>
            </div>
        </>
    )
}

export default Update
