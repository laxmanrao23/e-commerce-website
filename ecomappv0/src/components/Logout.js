import React from 'react';
import ReactDOM from 'react-dom/client';

class Logout extends React.Component {
    constructor(props) {
        // It will call constructor method in Parent Class
        super(props);
        
        localStorage.removeItem("user_id");
        window.location.href="login";
    }

}
   

export default Logout;