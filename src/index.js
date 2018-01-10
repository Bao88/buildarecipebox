import React from 'react';
import ReactDOM from 'react-dom';
import "./css/index.css";
import Recipe from "./scripts/recipe.js"

class RecipeBox extends React.Component {
    render(){
        return (
            <div id="recipebox">

                <Recipe name="Carrot Stew" />
            </div>
        );
    }
}


ReactDOM.render(<RecipeBox />, document.getElementById('root'));
