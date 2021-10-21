import React, { Component } from "react";
import Card from "../Card/Card"
import "./Row.css"

class Row extends Component{
    constructor(props){
        super(props)
        this.state = {
            task: '',
        }
    }
    
    componentDidMount = () => {
        this.setState({
            task: this.props.task
            
        })
        console.log(this.props.task)
       
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
                            <Card task={this.props.task}/>
                        </div></div>
                    </div>

                        <div className="col">
                        <div className="card-deck">
                        <div className="card-style"> 
                            <Card task={this.props.task}/>
                        </div></div>
                    </div>

                    
                        <div className="col">
                        <div className="card-deck">
                        <div className="card-style"> 
                            <Card task={this.props.task}/>
                        </div></div> 
                    </div>

                    
                        <div className="col">
                        <div className="card-deck">
                        <div className="card-style"> 
                            <Card task={this.props.task}/>
                        </div></div>
                    </div>

                    
                        <div className="col">
                        <div className="card-deck">
                        <div className="card-style"> 
                            <Card task={this.props.task}/>
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