import React, { useEffect, useState } from 'react'
import { Route,Routes,useParams } from 'react-router-dom'
const Update = () => {
  let {id} = useParams()
  const [product,setProduct] = useState({})
  useEffect(()=>{
      const getProduct = async()=>{
        const response =await fetch (`http://localhost:2610/products/${id}`)
        const data = await response.json()
        const newData = data.data
        setProduct(newData)
      } 
      getProduct()
      return ()=>{ }
  },[])
  

  //cập nhật state
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [quantity, setQuantity] = useState('');
  const [images, setImages] = useState('');
  const [category, setCategory] = useState('');


  const handleAdd = async (_id) => {
    try {
      const body ={
        name:name,
        price:price,
        quantity:quantity,
        images:images,
        category:category
      }
      const result = await fetch(`http://localhost:2610/products/update/${id}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(body),
      });
      const response = await result.json();
      if (response.status) {
        setName('')
        setPrice('')
        setQuantity('')
        setImages('')
        setCategory('')
        window.location.href ='/product'
      }
    } catch (error) {
      console.log("Lỗi",error)
    }
  }
  return (
    <div className="container">
    <h1 className="text-left">Sửa sản phẩm</h1>
    <form className="text-left">
      <div className="form-group">
        <label htmlFor="name">Tên sản phẩm:</label>
        <br /><br />
        <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nhập tên sản phẩm" />
      </div>
      <div className="form-group">
        <label htmlFor="price">Giá bán:</label>
        <br /><br />
        <input type="number" className="form-control" value={price} onChange={(e) => setPrice(e.target.value)} placeholder="Nhập giá bán" />
      </div>
      <div className="form-group">
        <label htmlFor="quantity">Số lượng:</label>
        <br /><br />
        <input type="number" className="form-control" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Nhập số lượng" />
      </div>
      <div className="form-group">
        <label htmlFor="images">Link ảnh:</label>
        <br /><br />
        <input type="text" className="form-control" value={images} onChange={(e) => setImages(e.target.value)} placeholder="Nhập link ảnh" />
      </div>
      <br></br>
      <div className="form-group">
        <label htmlFor="category">ID danh mục:</label><br></br>
        <a>Chọn 1 trong 2:</a><br></br>
        <a>Ưa bóng :65f96f56fc13ae786550fa9c</a><br></br>
        <a>Ưa sáng :65f96f56fc13ae786550fa9d</a><br></br>
        <input type="text" className="form-control" value={category} onChange={(e) => setCategory(e.target.value)} placeholder="Nhập id danh mục" />
      </div>
      <br /><br />
      <button type="submit" className="btn btn-primary" onClick={()=>{handleAdd(id)}}>Sửa sản phẩm</button>
    </form>
  </div>
  )
}

export default Update

