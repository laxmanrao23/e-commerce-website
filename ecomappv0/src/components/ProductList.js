// Almost out of storage … If you run out, you can't create or edit files, send or receive emails on Gmail, or back up to Google Photos.
import React from 'react';
import ReactDOM from 'react-dom/client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

class ProductList extends React.Component {
    constructor(props) {
        // It will call constructor method in Parent Class
        super(props);
        this.state = {
            products: [],
            productName: "",
            productPrice: 0,
            finalPrice:0,
            quantity: 0,
            cart: 0,
            id: 0,
            product_id: 0,
            searchProduct: "",

        };
        // localStorage.removeItem("user_id");
        // window.location.href="login";
        console.log(localStorage.getItem("user_id"))
        if(localStorage.getItem("user_id") == null)
        {
            window.location.href="login";
        }
        else{
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
            
                    
                    for (const item of res) {
                        // totalItems += item.count;
                        // console.log(item.count);
                        // console.log(item.product_price);
                        // total+=item.product_price*item.count;
                        item.final_price=item.product_price-((item.product_price*item.discount)/100);
                    }
                    console.log("Final price: " + this.state.finalPrice);
                    
               
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

                product_id: event.target.value

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

    

     
    
    searchProduct = (event) => {

        let postData = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                search: this.state.searchProduct
            })
        };

        fetch("http://localhost:8081/search_product",postData)
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
gotoproductDescription=(event)=>{
window.location.href="product_description?product_id="+event.target.getAttribute('product_id');


}

    render() {
        let sw;
        const formatter = new Intl.NumberFormat('en-IN', {maximumSignificantDigits: 3 });
        sw = <div>
         
            {/* <h1> Products List: </h1> */}
            <br></br>
            <div className='row'>
                <div className="col-lg-4"></div>
                <div className="col-lg-4">                   
                    <div className="input-group">
                        <div className="form-outline">
                            <input value={this.state.searchProduct} onChange={this.updateSearchProduct} type="search" id="form1" className="form-control" />
                        </div>
                        <button onClick={this.searchProduct} type="button" className="btn btn-primary">
                            <i className="fas fa-search"></i>
                        </button>
                    </div>
                </div>
            </div>

            <div className='row'>
                {
                    this.state.products.map(
                        (product, i) => (
                            <div className="col-lg-2 border p-3 bg-white " style={{ marginLeft: "20px", marginTop: "20px" }}>
                                <img className="img-thumbnail" onClick={this.gotoproductDescription} product_id={product.product_id} src={product.product_image} style={{ height: "150px", width: "150px" }} />
                                <h4 className='text-capitalize'>{product.product_name}</h4>
                                <p>Rs. {formatter.format(product.final_price)} /- <del>Rs.{formatter.format(product.product_price)}/-</del> {product.discount}%</p>
                                <button className='btn btn-dark' value={product.product_id} onClick={this.addcart}>Add to cart</button>
                            </div>
                        )
                    )
                }
            </div>

        </div>;


        return (sw);
    }
}

export default ProductList;