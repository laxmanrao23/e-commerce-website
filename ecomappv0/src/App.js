// import logo from './logo.svg';
// import './App.css';

function App(props) {

  const x = 15;
  let text = "Goodbye";
  if (x < 10) {
    text = "Hello";
  }

  const myElement = <>
                      <h1>I Love {props.color} Color and my age is {props.age} . I am {props.gender}!</h1>
                       <Garage  test={props.color}/>
                    </>;

  return (myElement);
  // return (
  //   <div className="App">
  //     <p> This is Max</p>
  //     <input type="text"></input>
  //   </div>
  // );
}


function Garage(props) {
  return (    
      <h1>I am in garage Component {props.test} !!</h1>
  );
}


export default App;
