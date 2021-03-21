import React,{useEffect,useState} from 'react'
import '../styles.css'
import Base from './Base'
import Card from './Card'
import {getAllProducts} from '../admin/helper/adminapicall'
const Home = () => {
    
    const [products, setProducts] = useState([])


    const preload=()=>{
        getAllProducts()
        .then(data=>{
            if(data.error){
                console.log(data.error);
            }
            else{
                setProducts(data)
            }
        })
        .catch(err=>console.log(err))
    }

    useEffect(() => {
       preload()
    }, [])
    return (
       <Base title="Home page" description="Welcome to tshirt Store">
           <h2 className="mb-2">All Products</h2>
           <div className="row ">
               {products && products.map((product,index)=>(
                   <div className="col-4 mt-3" key={index}>
                   <Card product={product}/>
               </div>
               ))}
           </div>
       </Base>
    )
}

export default Home;
