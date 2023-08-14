import React from 'react';
import ReactDOM from 'react-dom/client';

class AddUpdateDelete extends React.Component {
    constructor(props) {
        // It will call constructor method in Parent Class
        super(props);
        this.state = {
                products:[],
                productName:""
        };
        // let sw = [1, 2, 3, 4, 5];
        // sw.map((a) => (console.log(a)));
    }

   

    changeColor = () => {
        console.log("Prev val:" + this.state.brand);

        if (this.state.brand == "Ford") {
            console.log("In If condition");
            const updatedValue = { brand: "Audi" };
            this.setState(updatedValue);
            console.log("After updating val:" + this.state.brand);
        } else {
            console.log("In else condition");
            const updatedValue = { brand: "Ford" };
            this.setState(updatedValue);
        }

    }

    upCounter = () => {
        let sw = this.state.counter;
        sw++;
        const updatedValue = { counter: sw };
        this.setState(updatedValue);
    }

    downCounter = () => {
        let sw = this.state.counter;
        sw--;
        const updatedValue = { counter: sw };
        this.setState(updatedValue);
    }

    updateLabel = (event) => {
        let sw = event.target.value;
        const updatedValue = { text: sw };
        this.setState(updatedValue);
    }

  

    updateProductName= (event) => {
        // console.log("this.state.products");
        // console.log(this.state.products);

        let sw = event.target.value;
        const updatedValue = { productName: sw };
        this.setState(updatedValue);
    }

    updateProductNameDynamic= (event) => {
        let updatedValue = event.target.value;
        console.log("updatedValue");
        console.log(updatedValue);

        let index = event.target.getAttribute('data-tag');
        console.log("index");
        console.log(index);

        let products=this.state.products;

        products[index]=updatedValue;

       
        this.setState({ products: products });


        console.log("this.state.products");
        console.log(this.state.products);


    }

    addProduct= (event) => {
       
        let products=this.state.products;
        products.push(this.state.productName);

        const updatedValue = { products: products };
        this.setState(updatedValue);

        console.log("this.state.products");
        console.log(this.state.products);
    }

    
    deleteProduct= (event) => {
        let index = event.target.value;
        console.log("index");
        console.log(index);

        let products=this.state.products;

        products.splice(index,1);

        const updatedValue = { products: products };
        this.setState(updatedValue);
    }



    render() {
        let flag = true;
        let sw;
            sw = <div>
                <span style={{float: "right"}}>Cart: {this.state.products.length}</span>
                <h1> Add Products For Your Store: </h1>

                <label htmlFor="productName">Product Name:</label>
                <input id="productName" type="text" value={this.state.productName} onChange={this.updateProductName} />
        
                <button onClick={this.addProduct}> Add Product</button>

                <h1> Products List: </h1>

                {
                    this.state.products.map(
                        (product,i) => (
                                            <div> 
                                                <li>{product}</li>
                                                {/* <input id="productName" data-tag={i} type="text" onChange={this.updateProductNameDynamic}/> */}
                                                {/* <br></br> */}
                                                <button value={i} onClick={this.deleteProduct}>Delete</button>

                                            </div>
                                        )
                    )
                }  

            </div>;
        
       
        return (sw);
    }
}

export default AddUpdateDelete;
//  npm install bootstrap jquery popper.js