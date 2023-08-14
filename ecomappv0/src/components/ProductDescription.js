import React from 'react';
import ReactDOM from 'react-dom/client';

class ProductDescription extends React.Component {
    constructor(props) {
        // It will call constructor method in Parent Class
        super(props);
        this.state = {
            products: [],
            productName: "",
            productPrice: 0,
            quantity: 0,
            selectedFile: null,
            selectedFileName: null,
            productImage: "",
            productDescription: ""
        };
        const queryString = window.location.search;
        console.log(queryString);
        const urlParams = new URLSearchParams(queryString);
        // const product = urlParams.get('product_id')
console.log(urlParams);
const product_id = urlParams.get('product_id')
console.log(product_id);
this.showProductDescription(product_id);
        // let sw = [1, 2, 3, 4, 5];
        // sw.map((a) => (console.log(a)));
    }

    showProductDescription=(product_id)=>{ 
        let postData = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({

                product_id: product_id

            })
        };
        
        fetch("http://localhost:8081/get_product",postData)
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
    render(){let sw;
        sw=<div>
         <div className='row'>
                {
                    this.state.products.map(
                        (product, i) => (
                            <div className="col-lg-5 border p-3 bg-white " style={{ marginLeft: "20px", marginTop: "20px" }}>
                                <img className="img-thumbnail" onClick={this.gotoproductDescription} product_id={product.product_id} src={product.product_image} style={{ height: "150px", width: "150px" }} />
                                <h4 className='text-capitalize'>{product.product_name}</h4>
                                <h6>Rs. {product.product_price} /-</h6>
                                <div>{product.product_description}</div>
                            </div>
                        )
                    )
                }
            </div>
    </div>;

        return(sw);
    }
}

 export default ProductDescription;