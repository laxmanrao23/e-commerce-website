import React from 'react';
import ReactDOM from 'react-dom/client';
import { useState } from 'react';

// import dateFormat from 'dateformat';
import Moment from 'moment';

import { Table, Thead, Tbody, Tr, Th, Td } from 'react-super-responsive-table';
import 'react-super-responsive-table/dist/SuperResponsiveTableStyle.css';

class Ordpage extends React.Component {
    
    constructor(props) {
        // It will call constructor method in Parent Class
        super(props);
        this.state = {
            products: [],
            orders: [],
            productName: "",
            productPrice: 0,
            quantity: 0,
            selectedFile: null,
            selectedFileName: null,
            productImage: "",
            productDescription: "",
            Name: "",
            startDate: "",
            endDate: ""
                };
        this.render();

        // localStorage.removeItem("user_id");
        // window.location.href="login";
        console.log(localStorage.getItem("user_id"));
        if (localStorage.getItem("user_id") == null) {
            window.location.href = "login";
        }
    }

    


    updateStartDate = (event) => {
        // console.log("this.state.products");
        // console.log(this.state.products);

        let sw = event.target.value;
        const updatedValue = { startDate: sw };
        this.setState(updatedValue);
        console.log(updatedValue);

        // console.log("this.state.productName");
        // console.log(this.state.productName);



    }

    updateEndDate = (event) => {
        // console.log("this.state.products");
        // console.log(this.state.products);

        let sw = event.target.value;
        const updatedValue = { endDate: sw };
        this.setState(updatedValue);
        console.log(updatedValue);

        // console.log("this.state.productName");
        // console.log(this.state.productName);



    }
    updateName = (event) => {
        // console.log("this.state.products");
        // console.log(this.state.products);

        let sw = event.target.value;
        const updatedValue = { Name: sw };
        this.setState(updatedValue);
        console.log(updatedValue);

        // console.log("this.state.productName");
        // console.log(this.state.productName);



    }

    report = (event) => {

        let postData = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                start_date: this.state.startDate,
                end_date: this.state.endDate
            })
        };

        this.render();
        fetch("http://localhost:8081/report", postData)
            .then(
                res => (res.json())
            )
            .then(
                (res) => {

                    console.log(res);
                    const updatedValue = { orders: res };
                    this.setState(updatedValue);

                    // const updatedValue = { products: res };
                    // this.setState({startDate: startDate, endDate: endDate })



                    // this.setState(updatedValue);



                }
            )

    }

    ChangeOrderStatus = (event) => {
        // console.log("this.state.products");
        // console.log(this.state.products);
        
        let postData = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                order_status: event.target.value,
                order_id: event.target.getAttribute('order_id')
                
            })
        };

        fetch("http://localhost:8081/order_status", postData)
        .then(
            res => (res.json())
        )
        .then(
            (res) => {

                console.log(res);
               alert("order status changed successfully");

                // const updatedValue = { products: res };
                // this.setState({startDate: startDate, endDate: endDate })



                // this.setState(updatedValue);



            }
        )

    }

    

    render() {
        let sw;
        sw = <div>
                <div className='row logpage'>
                    <div className="col-md-4 card">
                        <h2 className='text-center'>Order Details</h2>
                        <hr></hr>
                        <div className="mb-3 mt-3">
                            <label for="start_date" className="form-label"><b>From</b></label>
                            <input type="date" value={this.state.startDate} onChange={this.updateStartDate} className="form-control" id="start_date" name="start_date"  placeholder='Start Date'/>
                        </div>
                        <div className="mb-3 mt-3">
                            <label for="product_price" className="form-label"><b>To</b></label>
                            <input type="date" value={this.state.endDate} onChange={this.updateEndDate} className="form-control" id="product_price" name="product_price"  />
                        </div>
                        {/* <div className="mb-3 mt-3">
                            <label for="discount" className="form-label"><b>Customer Name</b></label>
                            <input type="text" value={this.state.Name} onChange={this.updateName} className="form-control" id="discount" placeholder="Enter Customer name/number" name="discount" />
                        </div> */}
                        <button className='btn btn-primary' onClick={this.report}>Show Orders</button>
                    </div>   
                </div>

                {
                    <div className='row m-2 text-center p-2 card'>
                        <Table>
                            <Thead>
                                <Tr>
                                    <Th>Order No</Th>
                                    <Th>Amount</Th>
                                    <Th>Order Status</Th>
                                    <Th>Date</Th>
                                    <Th>Time</Th>
                                </Tr>
                            </Thead>
                            <Tbody>
                                {
                                    this.state.orders.map(
                                        (order, i) => (
                                            <Tr >
                                                <Td>{order.order_id}</Td>
                                                <Td><p>Rs. {order.total_payable} /-</p></Td>
                                                <Td>
                                                    <select className="form-select" value={this.state.order_status} order_id={order.order_id} onChange={this.ChangeOrderStatus} type="text">
                                                        <option value="pending" selected>pending</option>
                                                        <option value="dispatched">dispatched</option>
                                                        <option value="delivered">delivered</option>
                                                    </select>
                                                </Td>
                                                <Td>{Moment(order.date).format("Do MMMM YYYY")}</Td>
                                                <Td>{Moment(order.date).format("h:mm A")}</Td>
                                            </Tr>
                                        )
                                    )
                                }
                            </Tbody>
                        </Table>

		
                    </div>
                }

            </div>;

        return (sw);
    }

}
export default Ordpage;