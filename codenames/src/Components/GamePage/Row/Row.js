import React, { Component } from "react";
import Card from "../Card/Card"
import "./Row.css"

class Row extends Component{
    constructor(props){
        super(props)
        this.state = {
            task: '',
            rowWords: ''
        }
    }
    
    componentDidMount = () => {
        this.setState({
            task: this.props.task,
            rowWords: this.props.rowWords
            
        })
        console.log(this.props.task)
        console.log(this.props.rowWords)
       
    }
    componentDidUpdate = (event) => {
        if (event.rowWords !== this.props.rowWords) {
            this.setState(prevState => {
                return {
                    rowWords: this.props.rowWords
                }
            })
        }
    }
    
    render(){
        return(
            <div>
                <div className="row">
                <div className="col-md-12">
                    <div className="row">
                        <div className="col">
                        <div className="card-deck">
                        <div className="card-style"> 
                            <Card task={this.props.task} word={this.state.rowWords[0]}/>
                        </div></div>
                    </div>

                        <div className="col">
                        <div className="card-deck">
                        <div className="card-style"> 
                            <Card task={this.props.task} word={this.state.rowWords[1]}/>
                        </div></div>
                    </div>

                    
                        <div className="col">
                        <div className="card-deck">
                        <div className="card-style"> 
                            <Card task={this.props.task} word={this.state.rowWords[2]}/>
                        </div></div> 
                    </div>

                    
                        <div className="col">
                        <div className="card-deck">
                        <div className="card-style"> 
                            <Card task={this.props.task} word={this.state.rowWords[3]}/>
                        </div></div>
                    </div>

                    
                        <div className="col">
                        <div className="card-deck">
                        <div className="card-style"> 
                            <Card task={this.props.task} word={this.state.rowWords[4]}/>
                        </div></div>
                    </div>
                    </div>
                </div>
                </div>
                <br/>
            </div>
            
            
        )
    }
}




export default Row