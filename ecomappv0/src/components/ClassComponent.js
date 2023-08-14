import React from 'react';
import ReactDOM from 'react-dom/client';

class ClassComponent extends React.Component {
    constructor(props) {
        // It will call constructor method in Parent Class
        super(props);
        this.state = {
            brand: "Ford",
            model: "Mustang",
            color: "red",
            year: 45445,
            counter: 0,
            text: "Dummy Text",
            testArray: [1, 2, 3, 4, 5],
            usersData: { "data": [] },
            loggedIn: false,
            username: "",
            password: "",
            error: ""

        };
        let sw = [1, 2, 3, 4, 5];
        sw.map((a) => (console.log(a)));
    }

    // Lifecycle method
    componentDidMount() {
        console.log("component Mount sucessfully !!");
        // alert("component Mount sucessfully !!");
    }

    componentDidUpdate() {
        console.log("The updated brand is " + this.state.brand);
    }

    static getDerivedStateFromProps(props, state) {
        console.log("before component Mount");
        return {};
    }

    shouldComponentUpdate() {
        console.log("in shouldComponentUpdate");
        return true;
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


    fetchData = () => {
        fetch("https://reqres.in/api/users?page=2")
            .then(
                res => (res.json())
            )
            .then(
                (res) => {
                    console.log(res);
                    const updatedValue = { usersData: res };
                    this.setState(updatedValue);
                }
            )
    }

    login = () => {

        let postData = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({

                email: this.state.username,
                password: this.state.password,
                // expiresInMins: 60, // optional
            })
        };

        fetch('http://localhost:8081/login', postData)
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

    updateUserName = (event) => {
        let sw = event.target.value;
        const updatedValue = { username: sw };
        this.setState(updatedValue);
    }

    updatePassword = (event) => {
        let sw = event.target.value;
        const updatedValue = { password: sw };
        this.setState(updatedValue);
    }


    render() {
        let flag = true;
        let sw;
        if (!this.state.loggedIn) {
            sw = <div>

                <div className="row">
                <div className="col-lg-4 ">
                    </div>
                    <div className="col-lg-4 ">
                        <div className="mb-3 mt-3">
                            <label for="email" className="form-label">Email:</label>
                            <input type="email" value={this.state.username} onChange={this.updateUserName} className="form-control" id="email" placeholder="Enter email" name="email" />
                        </div>
                        <div className="mb-3">
                            <label for="pwd" className="form-label">Password:</label>
                            <input type="password" value={this.state.password} onChange={this.updatePassword} className="form-control" id="pwd" placeholder="Enter password" name="pswd" />
                        </div>
                        <button onClick={this.login} className="btn btn-primary">Login</button>
                    </div>
                </div>               
            </div >;
        }
        else {
            sw = <div>
                <h1> You are successfully logged in our system  {this.state.username}!! </h1>


                <h1>My {this.state.brand}</h1>
                <p>
                    It is a {this.state.color}
                    {this.state.model}
                    from {this.state.year}.
                </p>

                {/* TextBox Value Change */}
                <h1>Textbox Text: {this.state.text}</h1>
                <input type="text" value={this.state.text} onChange={this.updateLabel} />
                <button type="button" onClick={this.changeColor}>Change Brand</button>

                <br>
                </br>

                {/* Counter Value */}
                <h1>Counter: {this.state.counter}</h1>
                <button type="button" onClick={this.upCounter}>+</button>
                <button type="button" onClick={this.downCounter}>-</button>

                {/* Print Map Function */}
                <h1>Map Example</h1>
                {
                    this.state.testArray.map(
                        (a) => (<li>{a}</li>)
                    )
                }

                {/* Fetch data GET API */}
                <button type="button" onClick={this.fetchData}>Fetch Data</button>

                {/* Print GET API Data */}

                {

                    this.state.usersData.data.map(
                        (user) => (<li>{user.email}</li>)
                    )
                }

            </div>;
        }
        return (sw);
    }
}

export default ClassComponent;
