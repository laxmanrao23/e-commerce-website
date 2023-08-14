// Almost out of storage … If you run out, you can't create or edit files, send or receive emails on Gmail, or back up to Google Photos.
//npm install react-icons --save

import React from 'react';
import ReactDOM from 'react-dom/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FaPlus } from 'react-icons/fa';

import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

class Product extends React.Component {
    constructor(props) {
        // It will call constructor method in Parent Class
        super(props);
        this.state = {
            products: [],
            productName: "",
            productPrice: 0,
            finalPrice: 0,
            quantity: 0,
            cart: 0,
            id: 0,
            product_id: 0,
            searchProduct: "",

        };
        // localStorage.removeItem("user_id");
        // window.location.href="login";
        console.log(localStorage.getItem("user_id"))
        if (localStorage.getItem("user_id") == null) {
            window.location.href = "login";
        }
        else {
            this.showProduct();
        }
        // let sw = [1, 2, 3, 4, 5];
        // sw.map((a) => (console.log(a)));
    }

    showProduct = (event) => {
        fetch("http://localhost:8081/get_product_list")
            .then(
                res => (res.json())
            )
            .then(
                (res) => {

                    console.log(res);
                    const updatedValue = { products: res };
                    const formatter = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 });

                    // for (const item of res) {
                    //     // totalItems += item.count;
                    //     // console.log(item.count);
                    //     // console.log(item.product_price);
                    //     // total+=item.product_price*item.count;
                    //     item.final_price = item.product_price - ((item.product_price * item.discount) / 100);
                    // }
                    // console.log("Final price: " + this.state.finalPrice);

                    <div class="text-center">
                        <button className='btn btn-dark' onClick={this.gotoaddproduct} >Add Product</button>
                    </div>
                    {/* 
            <div className='row'>
                { */}
                    <table class="table">

                        <thead>
                            <tr>
                                <th scope="col">No</th>
                                <th scope="col">Product Image</th>
                                <th scope="col">Product Name</th>
                                <th scope="col">Product Price</th>
                                <th scope="col">Buttons</th>
                            </tr>
                        </thead>
                        <tbody>

                            {
                                this.state.products.map(
                                    (product, i) => (

                                        <tr>
                                            <th scope="row">{product.product_id}</th>

                                            <td> <img className="img-thumbnail" onClick={this.gotoproductDescription} product_id={product.product_id} src={product.product_image} style={{ height: "150px", width: "150px" }} /></td>
                                            <td> <h4 className='text-capitalize'>{product.product_name}</h4></td>
                                            <td><p>Rs. {formatter.format(product.final_price)} /- <del>Rs.{formatter.format(product.product_price)}/-</del> {product.discount}%</p></td>
                                            <td>
                                                <button className='btn btn-dark' value={product.product_id} onClick={this.ok}>Edit</button>
                                                <br></br>
                                                <button className='btn btn-dark' value={product.product_id} onClick={this.deleteProduct}>Delete</button></td>
                                            


                                        </tr>

                                    )
                                )
                            }


                        </tbody>


                    </table>


                    this.setState(updatedValue);



                }
            )

    }

    addcart = (event) => {
        console.log("okay");
        let cart = event.target.value;
        console.log(event.target.value);
        // cart.push(this.state.product_id);
        const updatedValue = { cart: cart };
        this.setState(updatedValue);

        console.log("this.state.products");
        console.log(this.state.cart);


        let postData = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                user_id: localStorage.getItem("user_id"),
                product_id: event.target.value

            })
        };
console.log("postdata");
           console.log(postData);
        fetch('http://localhost:8081/add_cart', postData)
            .then(
                res => res.json()
            )
            .then(
                res => {
                    console.log(res)
                    if (res.success) {
                        this.setState({ loggedIn: true });
                        this.setState({ username: res.user_details.first_name });

                    }
                    else {
                        this.setState({ loggedIn: false });
                        this.setState({ error: "Wrong credentials" });

                    }
                }
            );
    }

    deleteProduct = (event) => {
        let index = event.target.value;
        console.log("index");
        console.log(index);

        let postData = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                product_id: event.target.value
            })
        };

        fetch("http://localhost:8081/delete_product", postData)
            .then(
                res => (res.json())
            )
            .then(
                (res) => {
                    console.log(res);
                    if (res.success) {
                        this.showProduct();
                    }
                }
            )
    }



    searchProduct = (event) => {

        let postData = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                search: this.state.searchProduct
            })
        };

        fetch("http://localhost:8081/search_product", postData)
            .then(
                res => (res.json())
            )
            .then(
                (res) => {
                    console.log(res);
                    const updatedValue = { products: res };
                    this.setState(updatedValue);
                }
            )
    }

    updateSearchProduct = (event) => {

        let sw = event.target.value;
        const updatedValue = { searchProduct: sw };
        this.setState(updatedValue);
    }
    gotoproductDescription = (event) => {
        window.location.href = "product_description?product_id=" + event.target.getAttribute('product_id');


    }
    gotoaddproduct = (event) => {
        window.location.href = "add_product";


    }

    gotoeditproduct = (event) => {
        window.location.href = "edit_product?product_id=" + event.target.getAttribute('product_id');;


    }



    render() {
        let sw;
        const formatter = new Intl.NumberFormat('en-IN', { maximumSignificantDigits: 3 });

        // sw = <div>
        //     <br></br>
        //     <div class="text-center">
        //         <button className='btn btn-dark' onClick={this.gotoaddproduct} >Add Product</button>
        //     </div>
        //     <table class="table">
        //         <thead>
        //             <tr>
        //                 <th scope="col">No</th>
        //                 <th scope="col">Product Image</th>
        //                 <th scope="col">Product Name</th>
        //                 <th scope="col">Product Price</th>
        //                 <th scope="col">Buttons</th>
        //             </tr>
        //         </thead>
        //         <tbody>
        //             {
        //                 this.state.products.map(
        //                     (product, i) => (
        //                         <tr>
        //                             <th scope="row">{i+1}</th>
        //                             <td> <img className="img-thumbnail" onClick={this.gotoproductDescription} product_id={product.product_id} src={product.product_image} style={{ height: "150px", width: "150px" }} /></td>
        //                             <td> <h4 className='text-capitalize'>{product.product_name}</h4></td>
        //                             <td><p>Rs. {formatter.format(product.final_price)} /- <del>Rs.{formatter.format(product.product_price)}/-</del> {product.discount}%</p></td>
        //                             <td>
        //                                 <button className='btn btn-dark' value={product.product_id} product_id={product.product_id} onClick={this.gotoeditproduct}>Edit</button>
        //                                 <br></br>
        //                                 <button className='btn btn-dark' value={product.product_id} onClick={this.deleteProduct}>Delete</button></td>
        //                         </tr>
        //                     )
        //                 )
        //             }
        //         </tbody>
        //     </table>
        // </div>;

        sw = <div>
                <div className='prdbtn' >
                    <button className='btn col-md-2' onClick={this.gotoaddproduct}><FaPlus /> Add Product</button>
                </div>
                <Row xs={1} md={5} className="g-2 p-2">
                    {
                        this.state.products.map(
                            (product, i) => (
                                <Col>
                                    <Card className='text-center'>
                                        <div className='m-2 p-3'>
                                            <Card.Img variant="top" className="img-thumbnail" onClick={this.gotoproductDescription} product_id={product.product_id} src={product.product_image} style={{width:"100%",height:"18rem"}}/>
                                        </div>
                                        <Card.Body>
                                            <Card.Title>{product.product_name}</Card.Title>
                                            <Card.Text>
                                                <div>
                                                    <p>Rs. {formatter.format(product.final_price)} /- <del>Rs.{formatter.format(product.product_price)}/-</del> {product.discount}%</p>
                                                </div>
                                                <div className='row text-center'>
                                                    <div className='col'><button className='btn btn-dark' value={product.product_id} product_id={product.product_id} onClick={this.gotoeditproduct}>Edit</button></div>
                                                    <div className='col'><button className='btn btn-dark' value={product.product_id} onClick={this.deleteProduct}>Delete</button></div>
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

        return (sw);
    }
}

export default Product;