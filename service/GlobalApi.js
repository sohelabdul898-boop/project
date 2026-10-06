import axios from "axios";

const API_KEY = import.meta.env.VITE_STRAPI_API_KEY;
const axiosClient = axios.create({
    baseURL: "http://localhost:1337/api/",
    headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${API_KEY}`
    }
});

const createNewResume = (data) => axiosClient.post('user-resumesses', data);
const GetUserResume = (userEmail) => axiosClient.get(`user-resumesses?filters[userEmail][$eq]=${userEmail}`);
const UpdateResumeDetailed = (id, data) => axiosClient.put(`user-resumesses/${id}`, data);
const GetResumeById = (id) => axiosClient.get(`user-resumesses/${id}?populate=*`);
const DeleteResumeDetail = (id) => axiosClient.delete(`user-resumesses/${id}`);

export default {
    createNewResume,
    GetUserResume,
    UpdateResumeDetailed,
    GetResumeById,
    DeleteResumeDetail
};
































// import axios from "axios";

// const API_KEY = import.meta.env.VITE_STRAPI_API_KEY 
// const axiosClient = axios.create({
//     baseURL:"http://localhost:1337/api/",
//     headers:{
//         "Content-Type":"application/json",
//         "Authorization":`Bearer ${API_KEY}`
//     }
// })
// const createNewResume =(data)=>axiosClient.post('/user-resumesses',data)
// const GetUserResume = (userEmail)=>axiosClient.get('/user-resumesses?filters[userEmail][$eq]='+userEmail)
// const UpdateResumeDetailed =(id,data)=>axiosClient.put('user-resumesses/'+id,data)
// const GetResumeById=(id)=>axiosClient.get('/user-resumesses/'+id+"?populate=*")
// const DeleteResumeDetail =(id)=>axiosClient.delete('/user-resumesses/'+id)
// export default{
//     createNewResume,
//     GetUserResume,
//     UpdateResumeDetailed,
//     GetResumeById,
//     DeleteResumeDetail
// }