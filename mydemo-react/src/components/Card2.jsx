import axios from "axios";
import React, { useRef , useState , useEffect  } from 'react';
import { useCookies } from 'react-cookie';
function Card2() {
    const [strHTML , setStrHTML] = useState('')
    const buttonRef = useRef(null);
    const [cookies, setCookie] = useCookies(['reload']);
    const handClick = (event) => {
      window.open('http://localhost:5174/?id=' + event.target.getAttribute('data-value'))
    }
    useEffect(() => {
      setCookie('reload', 'n', { path: '/' });
        axios.get('http://localhost:3000/getalldata')
          .then(response => {
            const str = response.data.map((item,id) => {
                return   <tr key={item.id}>
                <td>{item.name}</td>
                <td><img src={'http://localhost:3000'+ item.filepic} width="50"/></td>
                <td><button data-value={item.id}  onClick={handClick}>Edit</button></td>
              </tr>
            })
            setStrHTML(str)
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }, [cookies.reload]); 
    return (
        <><div>
            <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Pic</th> 
          <th>Edit</th> 
        </tr>
      </thead>
      <tbody>
        {strHTML}
      </tbody>
    </table>
            </div></>
    )
}

export default Card2