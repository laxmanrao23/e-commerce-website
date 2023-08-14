import React from 'react';
import ReactDOM from 'react-dom/client';

class EditProduct extends React.Component {
    constructor(props) {
        // It will call constructor method in Parent Class
        super(props);
        this.state = {
            products: [],
            productName: "",
            productPrice: 0,
            quantity: 0,
            discount: 0,
            finalPrice: 0,
            selectedFile: null,
            selectedFileName: null,
            productImage: "",
            productDescription: "",
            productId:0
        };
        // const queryString = window.location.search;
        // console.log(queryString);
        // const urlParams = new URLSearchParams(queryString);
        // // const product = urlParams.get('product_id')
        // console.log(urlParams);
        // const product_id = urlParams.get('product_id')
        // console.log(product_id);
        // this.showReqProduct(product_id);
    }
    componentDidMount() {
        const queryString = window.location.search;
        console.log(queryString);
        const urlParams = new URLSearchParams(queryString);
        // const product = urlParams.get('product_id')
        console.log(urlParams);
        const product_id = urlParams.get('product_id')
        console.log(product_id);
        this.setState({productId:product_id});
        this.showReqProduct(product_id);
    }
    showReqProduct = (product_id) => {
        let postData = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({

                product_id: product_id

            })
        };

        fetch("http://localhost:8081/get_product", postData)
            .then(
                res => (res.json())
            )
            .then(
                (res) => {
                    console.log(res);
                    const updatedValue = { products: res };
                    this.setState(updatedValue);
                    this.setState({ productName: res[0].product_name });
                    this.setState({ productImage: res[0].product_image });
                    this.setState({ productDescription: res[0].product_description });
                    this.setState({ discount: res[0].discount });
                    this.setState({ finalPrice: res[0].final_price });
                    this.setState({ productPrice: res[0].product_price });
                    this.setState({ quantity: res[0].quantity });
                    console.log("okok");
                    console.log(this.state.productName);
                }
            )

    }



    updateLabel = (event) => {
        let sw = event.target.value;
        const updatedValue = { text: sw };
        this.setState(updatedValue);
    }



    updateProductName = (event) => {
        // console.log("this.state.products");
        // console.log(this.state.products);

        let sw = event.target.value;
        const updatedValue = { productName: sw };
        this.setState(updatedValue);

        // console.log("this.state.productName");
        // console.log(this.state.productName);



    }

    updateProductDescription = (event) => {
        // console.log("this.state.products");
        // console.log(this.state.products);

        let sw = event.target.value;
        const updatedValue = { productDescription: sw };
        this.setState(updatedValue);

        // console.log("this.state.productName");
        // console.log(this.state.productName);



    }
    updateProductPrice = (event) => {
        // console.log("this.state.products");
        // console.log(this.state.products);

        let sw = event.target.value;
        const updatedValue = { productPrice: sw };
        this.setState(updatedValue);

        // console.log("this.state.productName");
        // console.log(this.state.productName);



    }
    updateQuantity = (event) => {
        // console.log("this.state.products");
        // console.log(this.state.products);

        let sw = event.target.value;
        const updatedValue = { quantity: sw };
        this.setState(updatedValue);

        // console.log("this.state.productName");
        // console.log(this.state.productName);



    }
    updateDiscount = (event) => {
        // console.log("this.state.products");
        // console.log(this.state.products);

        let sw = event.target.value;
        const updatedValue = { discount: sw };
        this.setState(updatedValue);


        // console.log("this.state.productName");
        // console.log(this.state.productName);



    }

    updateProduct = (event) => {
        console.log("okay");
        let products = this.state.products;
        products.push(this.state.productName);
        products.push(this.state.productPrice);
        products.push(this.state.quantity);
        products.push(this.state.productDescription);
        products.push(this.state.discount);
        products.push(this.state.finalPrice);

        const updatedValue = { products: products };
        this.setState(updatedValue);

        console.log("this.state.products");
        console.log(this.state.products);


        let finalprice = this.state.productPrice - (this.state.productPrice * this.state.discount / 100);

        let postData = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                product_name: this.state.productName,
                product_price: this.state.productPrice,
                quantity: this.state.quantity,
                product_image: this.state.productImage,
                product_description: this.state.productDescription,
                discount: this.state.discount,
                final_price: finalprice,
                product_id:this.state.productId

            })
        };

        fetch('http://localhost:8081/update_product', postData)
            .then(
                res => res.json()
            )
            .then(
                res => {
                    console.log(res)
                    if (res.success) {
                        alert("Product successfully updated!!");
                        window.location.href="product";

                    }
                    else {
                        alert("Failed to add the Product!, Please Try Again later");
                    }
                }
            );

    }


    deleteProduct = (event) => {
        let index = event.target.value;
        console.log("index");
        console.log(index);
    }


    onImageChange = event => {



        console.log("event.target.files")
        console.log(event.target.files)
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            this.setState({
                selectedFile: event.target.files[0],
                selectedFileName: event.target.files[0].name,
            });

            console.log("this.state.image")
            console.log(this.state.image)

        }
    };




    updateImage = (event) => {

        let sw = event.target.value;
        const updatedValue = { productImage: sw };
        this.setState(updatedValue);
    }


    render() {
        let flag = true;
        let sw;
        sw = <div>

            <h1> Edit Products:</h1>
            <div className="row">



                <div className="col-lg-4 ">
                </div>
                <div className="col-lg-4 ">
                    <div className="mb-3 mt-3">
                        <label for="product_name" className="form-label">Product Name:</label>
                        <input type="text" defaultValue={this.state.productName} value={this.state.productName} onChange={this.updateProductName} className="form-control" id="product_name" placeholder={this.state.productName} name="product_name" />
                    </div>
                    <div className="mb-3 mt-3">
                        <label for="product_price" className="form-label">Product Price:</label>
                        <input type="number" value={this.state.productPrice} onChange={this.updateProductPrice} className="form-control" id="product_price" placeholder="Enter Product Price" name="product_price" />
                    </div>
                    <div className="mb-3 mt-3">
                        <label for="discount" className="form-label">Discount:</label>
                        <input type="number" value={this.state.discount} onChange={this.updateDiscount} className="form-control" id="discount" placeholder="Enter discount value" name="discount" />
                    </div>
                    <div className="mb-3 mt-3">
                        <label for="product_quantity" className="form-label">Product Quantity:</label>
                        <input type="number" value={this.state.quantity} onChange={this.updateQuantity} className="form-control" id="product_quantity" placeholder="Enter Product Quantity" name="product_quantity" />
                    </div>
                    {/* <div className="mb-3 mt-3">
                        <img src={this.state.image} />
                        <h1>Select Image</h1>
                        <input type="file" name="myImage" onChange={this.onImageChange} />
                    </div> */}
                    <div className="mb-3 mt-3">
                        <label for="product_image" className="form-label">Product Image:</label>
                        <input type="text" value={this.state.productImage} onChange={this.updateImage} className="form-control" id="product_image" placeholder="Enter Product Image" name="product_image" />
                    </div>
                    <div className="mb-3 mt-3">
                        <label for="product_description" className="form-label">Product Description:</label>
                        <textarea value={this.state.productDescription} onChange={this.updateProductDescription} className="form-control" id="product_description" placeholder="Enter Product Description" name="product_description" />
                        {/* <input type="text" value={this.state.productDescription} onChange={this.updateProductDescription} className="form-control" id="product_description" placeholder="Enter Product Description" name="product_description" /> */}
                    </div>
                    <button onClick={this.updateProduct} className="btn btn-primary">Update Product</button>
                </div>


            </div>


            {/* <label htmlFor="productName">Product Name:</label>
            <input id="productName" type="text" value={this.state.productName} onChange={this.updateProductName} />
            <label htmlFor="productPrice">Product Price:</label>
            <input id="productPrice" type="text" value={this.state.productPrice} onChange={this.updateProductPrice} />
            <label htmlFor="quantity">Quantity:</label>
            <input id="quantity" type="text" value={this.state.quantity} onChange={this.updateQuantity} /> */}

            {/* <button onClick={this.addProduct}> Add Product</button> */}




        </div>;


        return (sw);
    }
}

export default EditProduct;