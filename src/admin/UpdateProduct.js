import React, { useState, useEffect } from "react";
import { Link, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import { isAuthenticated } from "../auth/helper";
import Base from "../core/Base";
import { getCategories ,updateProduct,getProduct} from "./helper/adminapicall";

const AddProduct = ({match}) => {

    const {user,token}=isAuthenticated()

    const [values, setValues] = useState({
        name: "",
        description: "",
        stock: "",
        category: "",
        photo: "",
        price: "",
        categories: [],
        error: "",
        createdProduct: "",
        loading: false,
        isRedirected: false,
        formData:"",
      });
  
  
      const {
        name,
        description,
        stock,
        category,
        photo,
        price,
        categories,
        error,
        createdProduct,
        loading,
        isRedirected,
        formData,
      } = values;
  
  
      const preload = productId => {
        getProduct(productId).then(data => {
          //console.log(data);
          if (data.error) {
            setValues({ ...values, error: data.error });
            toast.error(data.error,{position:"top-right"})
          } else {
            preloadCategories();
            setValues({
              ...values,
              name: data.name,
              description: data.description,
              price: data.price,
              category: data.category._id,
              stock: data.stock,
              formData: new FormData()
            });
          }
        });
      };
    
      const preloadCategories = () => {
        getCategories().then(data => {
          if (data.error) {
            setValues({ ...values, error: data.error });
          } else {
            setValues({
              categories: data,
              formData: new FormData()
            });
          }
        });
      };

      const handleChange = name => event => {
        const value = name === "photo" ? event.target.files[0] : event.target.value;
        formData.set(name, value);
        setValues({ ...values, [name]: value });
        
      };
  
      useEffect(()=>{
          preload(match.params.productId)
      },[])

      const onSubmit=(e)=>{
        e.preventDefault()
        setValues({...values,error:"",loading:true})
        updateProduct(user._id,token,match.params.productId,formData)
        .then(data=>{
            if(data.error){
                setValues({...values,error:data.error,loading:false})
                toast.error(data.error,{position:"top-right"})
            }else{
                setValues({
                    ...values,
                    name: "",
                    description: "",
                    price: "",
                    photo: "",
                    stock: "",
                    loading: false,
                    isRedirected:true,
                    createdProduct: data.name
                })

                toast.info(" Product updated successfully !",{position:"top-right"})
            }
        })
        .catch(err=>console.log(err))
      }

  const productForm = () => {
    return (
      <div className="bg-dark p-3">
        <form>
          <span>Post photo</span>
          <div className="form-group">
            <label className="btn btn-block btn-success">
              <input
              onChange={handleChange("photo")}
                type="file"
                name="photo"
                accept="image"
                placeholder="choose a file"
              />
            </label>
          </div>
          <div className="form-group">
            <input
             value={name}
             onChange={handleChange("name")}
             className="form-control mb-3 mt-3"
             placeholder="Name"
             />
          </div>
          <div className="form-group">
            <textarea
             onChange={handleChange("description")}
             value={description}
              name="photo"
              className="form-control mb-3"
              placeholder="Description"
            />
          </div>
          <div className="form-group">
            <input
             onChange={handleChange("price")}
             value={price}
              type="number"
              className="form-control mb-3"
              placeholder="Price"
            />
          </div>
          <div className="form-group">
            <select  onChange={handleChange("category")}
             className="form-control mb-3" placeholder="Category" >
              <option>Select categories</option>
              { categories &&categories.map((cate,index)=>(
                  <option key={index} value={cate._id}>{cate.name}</option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <input
             onChange={handleChange("stock")}
             value={stock}
              type="number"
              className="form-control mb-3"
              placeholder="Stock"
            />
          </div>

          <button onClick={onSubmit} type="submit" className="btn btn-outline-success ">
            Update Product
          </button>
        </form>
      </div>
    );
  };

  const redirectto=()=>{
   return ( isRedirected && (<Redirect to="/admin/products" />))
  }

  return (
    <Base
      title="Add Products"
      description="a page to create products"
      className="bg-info p-4 container"
    >
      <Link className="btn btn-md btn-outline-dark mb-3" to="/admin/dashboard">
        Back to Dashboard
      </Link>
      <div className="row bg-dark text-white rounded">
        <div className="col-md-8 offset-md-2">{productForm()}</div>
      </div>
      {redirectto()}
    </Base>
  );
};

export default AddProduct;
