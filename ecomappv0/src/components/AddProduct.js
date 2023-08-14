import React from 'react';
// import ReactDOM from 'react-dom/client';

class AddProduct extends React.Component {
    constructor(props) {
        // It will call constructor method in Parent Class
        super(props);
        this.state = {
            products: [],
            productName: "",
            productPrice: 0,
            quantity: 0,
            discount:0,
            finalPrice:0,
            selectedFile: null,
            selectedFileName: null,
            productImage: "",
            productDescription: ""
        };
        // let sw = [1, 2, 3, 4, 5];
        // sw.map((a) => (console.log(a)));
    }



    // changeColor = () => {
    //     console.log("Prev val:" + this.state.brand);

    //     if (this.state.brand == "Ford") {
    //         console.log("In If condition");
    //         const updatedValue = { brand: "Audi" };
    //         this.setState(updatedValue);
    //         console.log("After updating val:" + this.state.brand);
    //     } else {
    //         console.log("In else condition");
    //         const updatedValue = { brand: "Ford" };
    //         this.setState(updatedValue);
    //     }

    // }

    // upCounter = () => {
    //     let sw = this.state.counter;
    //     sw++;
    //     const updatedValue = { counter: sw };
    //     this.setState(updatedValue);
    // }

    // downCounter = () => {
    //     let sw = this.state.counter;
    //     sw--;
    //     const updatedValue = { counter: sw };
    //     this.setState(updatedValue);
    // }

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

    addProduct = (event) => {
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

        // const formData = new FormData();

        // formData.append(
        //     "product_image",
        //     this.state.selectedFile,
        //     this.state.selectedFileName
        // );



        // formData.append("product_name", this.state.productName);
        // formData.append("product_price", this.state.productPrice);
        // formData.append("quantity", this.state.quantity);

        // console.log("formData:---")
        // console.log(formData)
let finalprice=this.state.productPrice-(this.state.productPrice*this.state.discount/100);

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
                final_price:finalprice

            })
        };

        fetch('http://localhost:8081/insert_product', postData)
            .then(
                res => res.json()
            )
            .then(
                res => {
                    console.log(res)
                    if (res.success) {
                        alert("Product successfully added!!");

                    }
                    else {
                        alert("Failed to add the Product!!");
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
            <div className="row addcard">
                <h1> Add Products:</h1>
                <div className="col-lg-4 card">
                    <div className="mb-3 mt-3">
                        <label for="product_name" className="form-label">Product Name:</label>
                        <input type="text" value={this.state.productName} onChange={this.updateProductName} className="form-control" id="product_name" placeholder="Enter Product Name" name="product_name" />
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
                        <textarea value={this.state.productDescription} onChange={this.updateProductDescription} className="form-control" id="product_description" placeholder="Enter Product Description" name="product_description"/>
                        {/* <input type="text" value={this.state.productDescription} onChange={this.updateProductDescription} className="form-control" id="product_description" placeholder="Enter Product Description" name="product_description" /> */}
                    </div>
                    <button onClick={this.addProduct} className="btn btn-primary">Add Product</button>
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

export default AddProduct;