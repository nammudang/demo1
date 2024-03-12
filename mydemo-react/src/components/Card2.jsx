import axios from "axios";
import React, { useRef , useState , useEffect } from 'react';
function Card2() {
    const [strHTML , setStrHTML] = useState('')
    useEffect(() => {
        axios.get('http://localhost:3000/getalldata')
          .then(response => {
            const str = response.data.map((item,id) => {
                return   <tr key={item.id}>
                <td>{item.name}</td>
                <td><img src={'http://localhost:3000'+ item.filepic} width="30"/></td>
              </tr>
            })
            setStrHTML(str)
          })
          .catch(error => {
            console.error('Error fetching data:', error);
          });
      }, []); 
    return (
        <><div>
            <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Pic</th> 
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