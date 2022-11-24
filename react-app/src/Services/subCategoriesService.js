import axios from "axios";

export const subCategories = () => {
    let token = localStorage.getItem('token');
    return axios
    .get('http://127.0.0.1:8000/api/sub_category',{
        headers: { Authorization: `Bearer ${token}` }
      })
    .then(function (response) {
      return response.data
    })
    .catch(function (error) {
      console.log(error);
    });
}
export const postSubCategories =  (item)=> {
  let token = localStorage.getItem('token')
  return axios
    .post('http://127.0.0.1:8000/api/sub_category', item,{
      headers: { Authorization: `Bearer ${token}` }
    })
    .then((response)=>{return response.data})
  .catch(function (error) {
    console.log(error);
  });
}
export const putSubCategories =  ({categoryId,subCategoryId,name})=> {
  let token = localStorage.getItem('token')
  return axios
    .put('http://127.0.0.1:8000/api/sub_category/'+subCategoryId, {categoryId,subCategoryId,name},{
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(function (response) {

    return response.data
  })
  .catch(function (error) {
    console.log(error);
  });
}

export const deleteSubCategories =  (subCategoryId)=> {
  let token = localStorage.getItem('token')
  return axios
    .delete('http://127.0.0.1:8000/api/sub_category/'+subCategoryId,{
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(function (response) {

    return response.data
  })
  .catch(function (error) {
    console.log(error);
  });
}