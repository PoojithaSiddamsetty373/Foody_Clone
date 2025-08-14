import React, { useState, useEffect } from 'react'
import { API_URL } from '../api'
import { useParams } from "react-router-dom"
import TopBar from './TopBar'

const ProductMenu = () => {

  const [products, setProducts] = useState([])
  const { firmId ,firmName} = useParams()

  const productHandler = async () => {
    try {

      const response = await fetch(`${API_URL}/add-product/${firmId}/products`)
      const newProduct = await response.json()
      setProducts(newProduct.products);
      console.log(newProduct)
    }
    catch (error) {
      alert("product not found")
      console.log("product data not fetched", error)
    }
  }
  useEffect(() => {
    productHandler()
  }, [])

  return (
    <>
      <TopBar />
      <section className="productSection">
        <h3>{firmName}</h3>
        
        {products.map((item) => {
          return (
            <div className='productBox'>
              <div>
               
                <div><strong>{item.productName}</strong></div>
                <div>{item.price}/-</div>
                <div> {item.description}</div>
              </div>


              <div className='productGroup'>
                <img src={`${API_URL}/uploads/${item.image}`} />
                <div className='addButton'>
                  ADD
                </div>
              </div>
            </div>
          )
        })}
      </section>
    </>

  )
}

export default ProductMenu
