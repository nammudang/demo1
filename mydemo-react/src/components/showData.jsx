import axios from "axios"
import { useEffect , useState } from 'react'
import crypto from 'crypto'
function Showdata() {
    const [str ,setStr] = useState('')
    const pk = `-----BEGIN PUBLIC KEY-----
    MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA3IDfP/tOcNt0Wj1ylM7J
    tj2wLRz7EwXgHZajQfcPvIkEKH2OqmHAeDef6KGGPDPx/2SOMHKm6ZhXPiCCv2Qg
    Sh0kCqFVdwScd8MNxcSwCIFKBTpK/tpK2XcB98HdTYzszf9R7HWMNqjKqc+FEp6y
    dtbXKVdRJwmH1o2tDYza4g6Ak3XZYJp4opGaOUwL2lgLa44cR118T6SUeVzTDQXP
    B3tpY8LXPSCJCbMHZLezKquReLCWsDchOIVxy0zvO5aIGrff2YnDvybDMgAOyvAu
    xXnX5SCEIPE6SgSi3a0s1jG/T6peZTraWhTKV5ouRbXxiEDpe+DRa1wHMv9Ybj0x
    HQIDAQAB
    -----END PUBLIC KEY-----
    `
    useEffect(() => {
        axios.get('http://localhost:3000/profie')
        .then((res) => {
           /* const data = res.data.phone
            const buffer = Buffer.from(data, 'base64');
            const dec = crypto.publicDecrypt(pk, buffer)
            setStr(dec) */
        })
    } ,'')
    return (
        <>
       <div> {str}</div>
        </>
    )
}

export default Showdata