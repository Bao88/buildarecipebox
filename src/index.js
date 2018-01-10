import React from 'react';
import ReactDOM from 'react-dom';
import "./css/index.css";
import Recipe from "./scripts/recipe.js"

class RecipeForm extends React.Component {
    render() {
        return (
            <form onSubmit={this.props.onSubmit} id="form">
                <h1>Add a Recipe</h1>
                <label>
                    <div>
                        Recipe
                    </div>
                    <input type="text" placeholder="Recipe name" onChange={this.props.addN}/>
                </label>
                <label>
                    <div>
                        Ingredients
                    </div>
                    <textarea type="text" placeholder="Ingredients separated by commas" onChange={this.props.addI}/>                    
                </label>
                <input type="submit" value="Add Recipe"/>
                <input type="button" value="Close" onClick={this.props.closeM}/>
            </form>
        );
    }
}

class RecipeBox extends React.Component {

    state = {
        name: "",
        list: [],
        showform: false,
        showRecipes: []
    };

    addRecipe = (event) => {
        // alert(event.target);
        event.target.reset();
        event.preventDefault();
    }

    addName = (event) => {
        this.setState({name: event.target.value});
        // console.log(event.target.value);
    }

    addIngredients = (event) => {
        var tmpArray = event.target.value.split(",");
        // console.log(tmpArray);
        this.setState({list: tmpArray});
    }

    showForm = () => {
        this.setState({showform: true});
        document.getElementById("overlay").style.display = "block";
    }
    
    closeForm = () => {
        this.setState({showform: false});
        document.getElementById("overlay").style.display = "none";
    }

    render(){
        return (
            <div>
                { this.state.showform ? <RecipeForm onSubmit={this.addRecipe} closeM = {this.closeForm} addN={this.addName} addI={this.addIngredients}/> : null}
                <div id="recipebox">
                    <Recipe name="Carrot Stew" />
                </div>
                <button onClick={this.showForm}>Add Recipe</button>
            </div>
        );
    }
}

ReactDOM.render(<RecipeBox />, document.getElementById('root'));
