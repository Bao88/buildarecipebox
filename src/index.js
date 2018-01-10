import React from 'react';
import ReactDOM from 'react-dom';
import "./css/index.css";

class Main extends React.Component {
    render(){
        return (
            <h1>Hello World!</h1>
        );
    }
}


ReactDOM.render(<Main />, document.getElementById('root'));
