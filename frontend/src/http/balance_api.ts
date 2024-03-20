import axios from "axios"

// let host = '3f9215732d0c.vps.myjino.ru'
// let host = '127.0.0.1:8000'
let host = process.env.REACT_APP_API_URL;
let path = process.env.DJANGO_PATH

console.log(path)

export const fetchBalance = async () => {
    const {data} = await axios.get(`http://${host}/${path}balance/`)

    return data.data;
}

export const createBalance = async (wallet) => {
    const config = {
        headers: {
         'Content-Type': 'multipart/form-data'        
        }
    }
    const {data} = await axios.post(`http://${host}/${path}balance/`, wallet, config);
    return data
}

export const fetchOneBalance = async (id) => {
    const {data} = await axios.get(`http://${host}/${path}balance/` + id + "/");
    return data;
}

export const deleteBalance = async (id) => {
    const {data} = await axios.delete(`http://${host}/${path}balance/` + id + `/`);
    return data;
}

