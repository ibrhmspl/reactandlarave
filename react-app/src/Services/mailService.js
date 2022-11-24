import axios from "axios";
export const mail = ({email}) => {
    let token = localStorage.getItem('token');
    let {user} =JSON.parse(localStorage.getItem('user'));
    return axios
    .post('http://127.0.0.1:8000/api/sendMail',{email, store_id:user.store_id},{
        headers: { Authorization: `Bearer ${token}` }
      })
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error);
    });
}