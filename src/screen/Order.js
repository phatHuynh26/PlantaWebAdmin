import React, { useEffect, useState } from 'react';

const Order = () => {
    const [order, setOrder] = useState([]);

    useEffect(() => {
        fetch('http://localhost:2610/histories/')
            .then(response => response.json())
            .then(data => {
                const newData = data.data;
                setOrder(newData);
            })
            .catch(error => console.error("Lỗi", error))
    }, []);
    
    return (
        <div>
            <h1>Order History</h1>
            <br></br>
            <br></br>
            <div className="container">
                {order.map((item, index) => (
                    <div  className="row" key={index}>
                        <div className="col-md-4">
                            <div className="card">
                                <img className="card-img-top" src={item.images} alt="Product Image" />
                                <div className="card-body">
                                    <h5 className="card-title">{item.name}</h5>
                                    <a><a style={{fontWeight:"bold"}}>Khách hàng</a> {item.email}</a>
                                    <p><a >Đã mua</a> {item.quantity} sản phẩm</p>
                                    <p><a style={{fontWeight:"bold"}}>Đơn giá</a> {item.price*item.quantity}.000đ</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
                <hr></hr>
            </div>
        </div>
    )
}

export default Order;
