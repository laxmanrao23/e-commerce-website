import React from 'react';
import ReactDOM from 'react-dom/client';

class Signup extends React.Component {
    constructor(props) {
        // It will call constructor method in Parent Class
        super(props);
        this.state = {
            users: [],
            firstName: "",
            lastName: "",
            confirmPassword:"",
            email: "",
            password:"",
            mobileNumber:"",
            address:"",
            pincode:0

        };
        // localStorage.removeItem("user_id");
        // window.location.href="login";
        console.log("ok");
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



    updateFirstName = (event) => {
        // console.log("this.state.products");
        // console.log(this.state.products);

        let sw = event.target.value;
        const updatedValue = { firstName: sw };
        this.setState(updatedValue);

        // console.log("this.state.productName");
        // console.log(this.state.productName);



    }
    updateLastName = (event) => {
        // console.log("this.state.products");
        // console.log(this.state.products);

        let sw = event.target.value;
        const updatedValue = { lastName: sw };
        this.setState(updatedValue);

        // console.log("this.state.productName");
        // console.log(this.state.productName);



    }

    updateMobileNumber = (event) => {
        // console.log("this.state.products");
        // console.log(this.state.products);

        let sw = event.target.value;
        const updatedValue = { mobileNumber: sw };
        this.setState(updatedValue);

        // console.log("this.state.productName");
        // console.log(this.state.productName);



    }

    updateAddress = (event) => {
        // console.log("this.state.products");
        // console.log(this.state.products);

        let sw = event.target.value;
        const updatedValue = { address: sw };
        this.setState(updatedValue);

        // console.log("this.state.productName");
        // console.log(this.state.productName);



    }

    updatePincode = (event) => {
        // console.log("this.state.products");
        // console.log(this.state.products);

        let sw = event.target.value;
        const updatedValue = { pincode: sw };
        this.setState(updatedValue);

        // console.log("this.state.productName");
        // console.log(this.state.productName);



    }

    updateEmail = (event) => {
        // console.log("this.state.products");
        // console.log(this.state.products);

        let sw = event.target.value;
        const updatedValue = { email: sw };
        this.setState(updatedValue);

        // console.log("this.state.productName");
        // console.log(this.state.productName);



    }
    updatePassword = (event) => {
        // console.log("this.state.products");
        // console.log(this.state.products);

        let sw = event.target.value;
        const updatedValue = { password: sw };
        this.setState(updatedValue);

        // console.log("this.state.productName");
        // console.log(this.state.productName);



    }
    updateConfirmPassword = (event) => {
        // console.log("this.state.products");
        // console.log(this.state.products);

        let sw = event.target.value;
        const updatedValue = { confirmPassword: sw };
        this.setState(updatedValue);

        // console.log("this.state.productName");
        // console.log(this.state.productName);



    }
    

    addUser = (event) => {
        console.log("okay");
        let users = this.state.users;
        users.push(this.state.firstName);
        users.push(this.state.lastName);
        users.push(this.state.email);
        if(this.state.password==this.state.confirmPassword){
        users.push(this.state.password);
        alert("ok");
        }
        else{
            alert("please re-enter the correct password");
            return;
        }
        users.push(this.state.address);
        users.push(this.state.pincode);
        users.push(this.state.mobileNumber);

        const updatedValue = { users: users };
        this.setState(updatedValue);

        console.log("this.state.products");
        console.log(this.state.users);

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


        let postData = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
            
                first_name: this.state.firstName,
                last_name: this.state.lastName,
                mobile_number: this.state.mobileNumber,
                address: this.state.address,
                pincode: this.state.pincode,
                email: this.state.email,
                password: this.state.password
            })
        };

        fetch('http://localhost:8081/signup', postData)
            .then(
                res => res.json()
            )
            .then(
                res => {
                    console.log(res)
                    if (res.success) {
                        alert("user signed up successfully!");
                        window.location.href="login";

                    }
                    else {
                        alert("user not added");
                    }
                }
            );

    }


   


    render() {
        let flag = true;
        let sw;
        sw = <div className="row logpage">
                <div className="col-md-4 card">
                    <div className='text-center'>
                        <h1>Sign Up!</h1>
                    </div>
                    <div className="mb-3 mt-3">
                        <label for="first_name" className="form-label">First Name:</label>
                        <input type="text" value={this.state.firstName} onChange={this.updateFirstName} className="form-control" id="first_name" placeholder="Enter First Name" name="first_name" />
                    </div>
                    <div className="mb-3 mt-3">
                        <label for="last_name" className="form-label">Last Name:</label>
                        <input type="text" value={this.state.lastName} onChange={this.updateLastName} className="form-control" id="last_name" placeholder="Enter Last Name" name="last_name" />
                    </div>
                    <div className="mb-3 mt-3">
                        <label for="mobile_number" className="form-label">Mobile Number:</label>
                        <input type="text" value={this.state.mobileNumber} onChange={this.updateMobileNumber} className="form-control" id="mobile_number" placeholder="Enter Mobile Number" name="mobile_number" />
                    </div>
                    {/* <div className="mb-3 mt-3">
                        <img src={this.state.image} />
                        <h1>Select Image</h1>
                        <input type="file" name="myImage" onChange={this.onImageChange} />
                    </div> */}
                   <div className="mb-3 mt-3">
                        <label for="address" className="form-label">Address:</label>
                        <textarea value={this.state.address} onChange={this.updateAddress} className="form-control" id="address" placeholder="Enter Address" name="address"/>
                        {/* <input type="text" value={this.state.productDescription} onChange={this.updateProductDescription} className="form-control" id="product_description" placeholder="Enter Product Description" name="product_description" /> */}
                    </div>
                    <div className="mb-3 mt-3">
                        <label for="pincode" className="form-label">pincode:</label>
                        <input type="number" value={this.state.pincode} onChange={this.updatePincode} className="form-control" id="pincode" placeholder="Enter Pincode" name="pincode" />
                    </div>
            
                    <div className="mb-3 mt-3">
                        <label for="email" className="form-label">Email:</label>
                        <input type="text" value={this.state.email} onChange={this.updateEmail} className="form-control" id="email" placeholder="Enter email" name="email" />
                    </div>
                    <div className="mb-3 mt-3">
                        <label for="password" className="form-label">Password:</label>
                        <input type="password" value={this.state.password} onChange={this.updatePassword} className="form-control" id="password" placeholder="Enter Password" name="password" />
                    </div>
                    <div className="mb-3 mt-3">
                        <label for="cpassword" className="form-label">Confirm Password:</label>
                        <input type="password" value={this.state.confirmPassword} onChange={this.updateConfirmPassword} className="form-control" id="cpassword" placeholder="Enter Confirm Password" name="cpassword" />
                    </div>
                    
                    <button onClick={this.addUser} className="btn btn-primary">Sign Up</button>
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



   

export default Signup;