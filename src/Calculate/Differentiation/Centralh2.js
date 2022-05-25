import React, {Component} from 'react';
import {Card, Input, Button} from 'antd';
import '../../screen.css';
import 'antd/dist/antd.css';
import { func, funcDiffDegreeN } from '../../services/Services';

const InputStyle = {
    background: "#FFFFFF",
    color: "black",
    borderRadius: "30px",
    fontSize: "16px",
    width:"500px",
    marginBottom:"10px",
    marginLeft:"10px"

};
var y, error, exact;
class Centralh2 extends Component {
    constructor() {
        super();
        this.state = {
            fx: "",
            x: 0,
            h: 0,
            degree: 0,
            showOutputCard: false,
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });

    }
    centralh2(x, h, degree) {
        switch (degree) {
            case 1:
                y = (-func(this.state.fx, x+(2*h)) + 8*func(this.state.fx, x+(1*h)) - 8*func(this.state.fx, x-(1*h)) + func(this.state.fx, x-(2*h))) / (12*h)
                break;
            case 2:
                y = (-func(this.state.fx, x+(2*h)) + 16*func(this.state.fx, x+(1*h)) - 30*func(this.state.fx, x) + 16*func(this.state.fx, x-(1*h)) - func(this.state.fx, x-(2*h))) / (12*Math.pow(h, 2))
                break;
            case 3:
                y = (-func(this.state.fx, x+(3*h)) + 8*func(this.state.fx, x+(2*h)) - 13*func(this.state.fx, x+(1*h)) + 13*func(this.state.fx, x-(1*h)) - 8*func(this.state.fx, x-(2*h)) + func(this.state.fx, x-(3*h))) / (8*Math.pow(h, 3))
                break;
            default:
                y = (-func(this.state.fx, x+(3*h)) + 12*func(this.state.fx, x+(2*h)) - 39*func(this.state.fx, x+(1*h)) + 56*func(this.state.fx, x) - 39*func(this.state.fx, x-(1*h)) + 12*func(this.state.fx, x-(2*h)) + func(this.state.fx, x-(3*h))) / (6*Math.pow(h, 4))

        }
        exact = funcDiffDegreeN(this.state.fx, x, degree)
        error = Math.abs((y - exact) / y)*100
        this.setState({
            showOutputCard: true
        })
    }

    render() {
        return(
            <div style={{padding: "30px" }}>
                <h2 style={{ color: "black", fontWeight: "bold" , textAlign: "center"}}>Central Divided-Differences O(h<sup>4</sup>)</h2>
           
                        <Card
                        bordered={true}
                        style={{ background: "#0A183D", borderRadius:"50px", color: "#FFFFFFFF", width:"600px",margin: "auto"}}
                        onChange={this.handleChange}
                        id="inputCard"
                        >
                            <h2 style={{color: "#FFFFFFFF", fontSize:"24px" }}>f(x)</h2><Input size="large" name="fx" style={InputStyle}></Input>
                            <h2 style={{color: "#FFFFFFFF", fontSize:"24px" }}>Order derivative</h2><Input size="large" name="degree" style={InputStyle}></Input>
                            <h2 style={{color: "#FFFFFFFF", fontSize:"24px" }}>X</h2><Input size="large" name="x" style={InputStyle}></Input>
                            <h2 style={{color: "#FFFFFFFF", fontSize:"24px" }}>H</h2><Input size="large" name="h" style={InputStyle}></Input><br/><br/>
                            <Button id="submit_button" onClick= {
                                    ()=>this.centralh2(parseFloat(this.state.x), parseFloat(this.state.h), parseInt(this.state.degree))
                                }  
                                style={{ background: "#FC0254", color: "white", fontSize: "14px", borderRadius:"30px" ,height:"40px",width:"100px",marginLeft:"40%"}}>Submit</Button>
                            
                        </Card>             
                        {this.state.showOutputCard && 
                            <Card
                            title={"Output"}
                            bordered={true}
                            style={{ background: "#383B70", borderRadius:"50px", color: "#FFFFFFFF", width:"600px",margin: "auto",marginTop:"50px"}}
                            id="outputCard"
                            >
                                <p style={{fontSize: "24px", fontWeight: "bold"}}>
                                    Approximate = {y}<br/>
                                    Exact = {exact.toFixed(8)}<br/>
                                    Error(ε) = {error.toFixed(4)}%<br/>
                                </p>
                            </Card>
                        }                  
            </div>
        );
    }
}
export default Centralh2;