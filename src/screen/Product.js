import React, { useEffect, useState } from 'react';
const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch('http://localhost:2610/products')
      .then(response => response.json())
      .then(data => {
        const newData = data.data;
        setProducts(newData);
      })
      .catch(error => console.error("Lỗi", error));
  }, []);
  const handleDeleteID = async (id) => {
    try {
      const response = await
        fetch(`http://localhost:2610/products/${id}/delete`, {
          method: 'POST'
        });
      const result = await response.json();
      console.log(result);
      if (result.status) {
        const newProducts = products.filter(product => product._id.toString() !== id.toString());
        setProducts(newProducts);
      }
    } catch (error) {
      console.error('Error deleting product:', error);
      // Handle errors appropriately (e.g., display error messages to the user)
    }
  };

  return (
    <div>
      <h1>Product</h1>
      <a href="/insert" className="btn btn-danger">Thêm sản phẩm</a>
      <br></br>
      <br></br>
      <div className="container">
        <div className="row">
          {products.map((product, index) => (
            <div className="col-md-4" key={index}>
              <div className="card">
                <img src={product.images} className="card-img-top" alt="Product Image" />
                <div className="card-body">
                  <h5 className="card-title">{product.name}</h5>
                  {product.category.map(categories => (
                    <p className="card-text">{categories.category_name}</p>
                  ))}
                  <p className="card-text">{product.price}.000đ</p>
                  <a href={`/update/${product._id}`} className="btn btn-primary">Edit</a>
                  <a href="#" className="btn btn-danger" onClick={() => { handleDeleteID(product._id) }}>Delete</a>
                </div>
              </div>
            </div>
          ))}
        </div>
        <hr></hr>
        <a href="/order" className="btn btn-primary">Xem lịch sử đơn hàng</a>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>
        <br></br>

      </div>
    </div>
  );
}

export default Product;
