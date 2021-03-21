import { API } from "../../backend"

//category api calls
export const createCategory=(userId,token,category)=>{
    return fetch(`${API}/category/create/${userId}`,{
        method:'POST',
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(category)
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))
}

export const getCategories=()=>{
    
    return fetch(`${API}/categories`,{
        method:"GET"
    })
    .then((response)=>response.json())
    .catch(err=>console.log(err))
}

export const deleteCategory=(userId,token,categoryId)=>{
    return fetch(`${API}/category/${categoryId}/${userId}`,{
        method:'DELETE',
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))
}

export const getCategory=(categoryId)=>{

    return fetch(`${API}/category/${categoryId}`,{
        method:"GET"
    })
    .then(response=>response.json())
    .catch(err=>console.log(err))
}


export const updateCategory=(userId,token,categoryId,category)=>{

    return fetch(`${API}/category/${categoryId}/${userId}`,{
        method:"PUT",
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
        body:JSON.stringify(category)
    })
    .then((response)=>response.json())
    .catch(err=>console.log(err))

}

//product api calls

export const createProduct=(userId,token,product)=>{
    return fetch(`${API}/product/create/${userId}`,{
        method:'POST',
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`
        },
        body:product
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))
}

export const deleteProduct=(userId,token,productId)=>{
    return fetch(`${API}/product/${productId}/${userId}`,{
        method:'DELETE',
        headers:{
            Accept:"application/json",
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
        },
    })
    .then(response=>{
        return response.json()
    })
    .catch(err=>console.log(err))
}

export const getAllProducts=()=>{
    return fetch(`${API}/products`,{
        method:"GET"
    })
    .then((response)=>response.json())
    .catch(err=>console.log(err))
}

export const getProduct=(productId)=>{
    return fetch(`${API}/product/${productId}`,{
        method:"GET"
    })
    .then((response)=>response.json())
    .catch(err=>console.log(err))
}

export const updateProduct=(userId,token,productId,product)=>{
    return fetch(`${API}/product/${productId}/${userId}`,{
        method:"PUT",
        headers:{
            Accept:"application/json",
            Authorization:`Bearer ${token}`
        },
        body:product
    }).then((response)=>response.json())
    .catch(err=>console.log(err))
}