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
    constructor(props){
        super(props);

        // restore data from localstorage if possible and use them
        var storage = JSON.parse(localStorage.getItem("recipe"));
        console.log(storage);
        if(storage == null) storage = [];

        this.state = {
            name: "",
            list: [],
            showform: false,
            showRecipes: storage
        };
    }
   

    addRecipe = (event) => {
        // alert(event.target);
        var object = {name: this.state.name, ingr: this.state.list};
        var tmpArray = this.state.showRecipes;
        tmpArray.push(object);
        this.setState({showRecipes: tmpArray});
        
// save to localStorage
localStorage.setItem("recipe", JSON.stringify(tmpArray));

        // Reset the fields
        event.target.reset();
        event.preventDefault();
        console.log(tmpArray);
        console.log(this.state.showRecipes);
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
        // const myArray = Array.from(this.state.showRecipes);
        // console.log(this.state.showRecipes);
        // const myList = myArray.map((ob, index) =>
        //     <Recipe name={ob.name} />
        // );

        return (
            <div>
                { this.state.showform ? <RecipeForm onSubmit={this.addRecipe} closeM = {this.closeForm} addN={this.addName} addI={this.addIngredients}/> : null}
                <div id="recipebox">   
                    {/* <Recipe data={rec}/> */}
                    {
                        this.state.showRecipes.map((rec, index) => (
                            <Recipe key={index} data={rec} />
                        ))
                    }
                </div>
                <button onClick={this.showForm}>Add Recipe</button>
            </div>
        );
    }
}

window.onbeforeunload = function(){

}

ReactDOM.render(<RecipeBox />, document.getElementById('root'));
