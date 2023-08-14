// Almost out of storage … If you run out, you can't create or edit files, send or receive emails on Gmail, or back up to Google Photos.
import React from 'react';
import ReactDOM from 'react-dom/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Button } from 'bootstrap';

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

class Cart extends React.Component {
    constructor(props) {
        // It will call constructor method in Parent Class
        super(props);
        this.state = {
            products: [],
            productName: "",
            productPrice: 0,
            quantity: 0,
            cart: 0,
            id: 0,
            product_id: 0,
            finalPrice: 0,
            searchProduct: "",
            totalItems: 0,
            total: 0,
            user_id:0,
            order_details:[],
            objects:[],
            date:""
        };
     this.setState({user_id:localStorage.getItem("user_id")});
     console.log(localStorage.getItem("user_id"));

        

        // this.showCart();

        // let sw = [1, 2, 3, 4, 5];
        // sw.map((a) => (console.log(a)));
    }

componentDidMount(){
this.showCart();
};

    showCart = (event) => {

        let postData = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user_id: localStorage.getItem("user_id"),
                // product_id: event.target.value
                // product_id: event.target.getAttribute('product_id')



            })
        };
        fetch("http://localhost:8081/show_cart",postData)
            .then(
                res => (res.json())
            )
            .then(
                (res) => {

                    
                    console.log(res);
                    const updatedValue = { products: res };
                    let totalItems = 0;
                    let total = 0;
                    this.setState({ totalItems: 0, total: 0 })
                    let orderDetails=[];
                    for (const item of res) {
                        totalItems += item.count;
                        console.log(item.count);
                        console.log(item.final_price);
                
                        // orderDetails[
                        //     {"product_id":1,"quantity":2},
                        //       {"product_id":13,"quantity":5},
                        //     ]

                        total += item.final_price * item.count;
                        console.log(item.final_price);
                    }
                    console.log("Total Items: " + totalItems);
                    console.log("Total : " + total);
                    this.setState({ totalItems: totalItems, total: total })
                    this.setState(updatedValue);
                    this.setState({order_details:JSON.stringify(res)});



                }
            )

    }


    addcart = (event) => {
        console.log("okay");
        let cart = event.target.value;
        console.log(event);
        // cart.push(this.state.product_id);
        const updatedValue = { cart: cart };
        this.setState(updatedValue);

        console.log("this.state.products");
        console.log(this.state.cart);
        //         let totalItems = 0;
        // for (const item of cart.items) {
        //   totalItems += item.quantity;
        // }
        // console.log("Total Items: " + totalItems);

        let postData = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user_id: localStorage.getItem("user_id"),
                // product_id: event.target.value
                product_id: event.target.getAttribute('product_id')



            })
        };


        fetch('http://localhost:8081/add_cart', postData)
            .then(
                res => res.json()
            )
            .then(
                res => {
                    console.log(res)
                    if (res.success) {
                        this.showCart();
                        // this.setState({ loggedIn: true });
                        // this.setState({ username: res.user_details.first_name });
                        // count=count+1

                    }
                    else {
                        // this.setState({ loggedIn: false });
                        // this.setState({ error: "Wrong credentials" });

                    }
                }
            );
    }


    deletecart = (event) => {
        let postData = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user_id: localStorage.getItem("user_id"),
                product_id: event.target.getAttribute('product_id')
            })
        };

        fetch("http://localhost:8081/delete_cart_single_product", postData)
            .then(
                res => (res.json())
            )
            .then(
                (res) => {
                    console.log(res);
                    if (res.success) {
                        this.showCart();
                    }
                }
            )

    };

    placeorder = (event) => {

        console.log("okay");
        

        // const updatedValue = { products: products };
        // this.setState(updatedValue);
       
        // console.log("this.state.products");
        // console.log(this.state.products);
        
        let postData = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user_id: localStorage.getItem("user_id"),
                order_details: this.state.order_details,
                total_payable:this.state.total,
                // date:this.state.date
            })
        };

        fetch('http://localhost:8081/place_order', postData)
            .then(
                res => res.json()
            )
            .then(
                res => {
                    console.log(res)
                    if (res.success) {
                        alert("Successfully placed the order!!");

                    }
                    else {
                        alert("Failed to add the Product!!");
                    }
                }
            );

    }





    deleteproduct = (event) => {

        let postData = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                product_id: event.target.value
            })
        };

        fetch("http://localhost:8081/delete_cart", postData)
            .then(
                res => (res.json())
            )
            .then(
                (res) => {
                    console.log(res);
                    if (res.success) {
                        this.showCart();
                    }
                }
            )
    }

    updatedeleteProduct = (event) => {

        let sw = event.target.value;
        const updatedValue = { deleteproduct: sw };
        this.setState(updatedValue);
    }
    // disp=(event)=>{
    //     let totalItems = 0;
    // for (const item of products.items) {
    //   totalItems += item.quantity;
    // }
    // console.log("Total Items: " + totalItems);
    // }
    NumFormatter = (data) => {
        return parseFloat(data).toLocaleString(undefined, {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2
        });
    }


    render() {
        let sw;
        const formatter = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 });
        sw = <div className='p-2'>

            <div className='row p-2'>
                {/* {
                    this.state.products.map(
                        (product, i) => (
                            // <div className="col-lg-2 border p-3 bg-white " style={{ marginLeft: "20px", marginTop: "20px" }}>
                            //     <img className="img-thumbnail" src={product.product_image} style={{ height: "150px", width: "150px" }} />
                            //     <h4 className='text-capitalize'>{product.product_name}</h4>
                            //     <h6>Rs. {formatter.format(product.final_price)} /-</h6>
                            //     <button className='btn btn-dark' product_id={product.product_id} onClick={this.addcart}  > + </button>
                            //     <span> {product.count} </span>
                            //     <button className='btn btn-dark' product_id={product.product_id} onClick={this.deletecart} > - </button>
                            //     <br></br>
                            //     <div>
                            //         <button className='btn btn-dark' value={product.product_id} onClick={this.deleteproduct}>Delete</button>
                            //     </div>
                            // </div>
                            <div>

                            </div>

                        )
                    )
                } */}

                <Row xs={1} md={5} className="g-2 p-2">
                    {
                        this.state.products.map(
                            (product, i) => (
                                <Col>
                                    <Card className='text-center'>
                                        <div className='m-2 p-3'>
                                            <Card.Img variant="top" className="img-thumbnail" src={product.product_image} style={{width:"100%",height:"18rem"}}/>
                                        </div>
                                        <Card.Body>
                                            <Card.Title>{product.product_name}</Card.Title>
                                            <Card.Text>
                                                <h6>Rs. {formatter.format(product.final_price)} /-</h6>
                                                <div className='row'>
                                                    <div className='col'>
                                                        <button className='btn btn-dark' product_id={product.product_id} onClick={this.deletecart} > - </button>
                                                        <span> {product.count} </span>
                                                        <button className='btn btn-dark' product_id={product.product_id} onClick={this.addcart}  > + </button>
                                                    </div>
                                                    <div className='col'>
                                                        <button className='btn btn-dark' value={product.product_id} onClick={this.deleteproduct}>Delete</button>
                                                    </div>
                                                </div>
                                            </Card.Text>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            )
                        )
                    }
                </Row>
            </div>
            
            <div className='row placepage p-2 '>
                <div className="col-md-4 card">
                    <div className="mb-3 mt-3">
                        <p>Total items : {this.state.totalItems}</p>
                        <p>Total amount: Rs  {formatter.format(this.state.total)} /-</p>
                    </div>
                    <div className='placebtn' >
                        <button className='btn col-md-2' onClick={this.placeorder} style={{width: "150px" }}>Place Order</button>
                    </div>
                </div> 
            </div>
        </div>;
        return (sw);
    }
}


export default Cart;