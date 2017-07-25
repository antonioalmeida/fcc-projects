import React, { Component } from 'react';
import logo from './logo.svg';
import 'bootstrap/dist/css/bootstrap.css';
import {Button, Tab, Row, Col, Nav, NavItem, Modal, Form, FormGroup, FormControl, ControlLabel, HelpBlock} from 'react-bootstrap';
import './App.css';

class Recipe extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            modalShow: false,
        }
    }

    handleDeleteClick = (e) => {
        this.props.onDelete(this.props.index);
    }

    handleEditClick = (e) => {

    }

    render() {
        let ingredients = this.props.ingredients;
        const ingredientsList = ingredients.map((ingredient, index) => {
            return (
                <li key={index}>{ingredient}</li>
            );
        })

        return (
            <Tab.Pane eventKey={this.props.index}>
                <ol>
                    {ingredientsList}
                </ol>
                <Button onClick={this.handleEditClick}>Edit</Button>
                <Button bsStyle="danger" onClick={this.handleDeleteClick}>Delete</Button>
            </Tab.Pane>
        );
    }
}

class RecipeCreator extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            ingredients: '',
        };
    }

    getNameValidationState() {
        const length = this.state.name.length;
        if (length > 4)
        return 'success';
        if (length > 0)
        return 'error';
    }

    getIngredientsValidationState() {
        const length = this.state.ingredients.length;
        if (length > 4)
        return 'success';
        if (length > 0)
        return 'error';
    }

    handleNameChange = (e) => {
        this.setState({ name: e.target.value });
    }

    handleIngredientsChange = (e) => {
        this.setState({ ingredients: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        const newRecipe = {
            name: this.state.name,
            ingredients: this.state.ingredients.split(", "),
        };

        this.props.onSave(newRecipe);
    }

    render() {
        return (
            <Modal {...this.props}>
                <Modal.Header>
                    <Modal.Title>Add new recipe</Modal.Title>
                </Modal.Header>

                <Form onSubmit={this.handleSubmit}>
                    <Modal.Body>
                        <FormGroup controlId="recipeName" validationState={this.getNameValidationState()} >
                            <ControlLabel>Recipe Name</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.state.name}
                                placeholder="Insert name..."
                                onChange={this.handleNameChange}
                            />
                            <FormControl.Feedback />
                        </FormGroup>
                        <FormGroup controlId="ingredientsList" validationState={this.getIngredientsValidationState()} >
                            <ControlLabel>Ingredients</ControlLabel>
                            <FormControl
                                type="text"
                                value={this.state.ingredients}
                                placeholder="tomato, pasta, strawberries..."
                                onChange={this.handleIngredientsChange}
                            />
                            <FormControl.Feedback />
                            <HelpBlock>Validation is based on string length.</HelpBlock>
                        </FormGroup>

                    </Modal.Body>

                    <Modal.Footer>
                        <Button onClick={this.props.onHide}>Close</Button>
                        <Button type="submit" bsStyle="primary">Save</Button>
                    </Modal.Footer>
                </Form>
            </Modal>
        )
    }
}

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: [
                {name: 'Lasanha', ingredients: ['carne', 'massa', 'tomate']},
                {name: 'Bacalhau à Brás', ingredients: ['bacalhau', 'molho bechamel', 'batata']},
                {name: 'Gelado de Banana', ingredients: ['chocolate', 'banana', 'gelado']}
            ],
            modalShow: false,
        };
    }

    handleSaveRecipe = (newRecipe)=>{
        this.setState((prevState) => {
            let updatedRecipes = prevState.recipes.concat(newRecipe);
            return {recipes: updatedRecipes};
        });
    };

    handleDeleteRecipe = (recipeIndex)=>{
        this.setState((prevState) => {
            let tempRecipes = prevState.recipes;
            console.log(recipeIndex);
            tempRecipes.splice(recipeIndex, 1);
            return {recipes: tempRecipes};
        });
    }

    render() {
        let currentRecipes = this.state.recipes;
        let recipesIngredients = currentRecipes.map((recipe, index) => {
            return (<Recipe key={index} index={index} ingredients={recipe.ingredients} name={recipe.name} onDelete={this.handleDeleteRecipe}/>);
        });

        const recipesList = currentRecipes.map((recipe, index) => {
            return (<NavItem key={index} eventKey={index}>
                {recipe.name}
            </NavItem>);
        });

        return (
            <div className="App">
                <div className="App-header">
                    <h2>Recipe Box</h2>
                </div>

                <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                    <Row className="clearfix">
                        <Col sm={4}>
                            <Nav bsStyle="pills" stacked>
                                {recipesList}
                            </Nav>
                        </Col>
                        <Col sm={8}>
                            <Tab.Content animation>
                                {recipesIngredients}
                            </Tab.Content>
                        </Col>
                    </Row>
                </Tab.Container>

                <Button bsStyle="primary" onClick={()=>this.setState({ modalShow: true })}>
                    Add Recipe
                </Button>
                <RecipeCreator show={this.state.modalShow} onHide={()=>this.setState({modalShow: false})} onSave={this.handleSaveRecipe} />
            </div>
        );
    }
}

export default App;
