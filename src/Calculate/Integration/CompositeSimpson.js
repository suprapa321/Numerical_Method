import React, { Component } from 'react';
import { Card, Input, Button } from 'antd';
import '../../screen.css';
import 'antd/dist/antd.css';
import { exactIntegrate, func } from '../../services/Services';

const InputStyle = {
    background: "#FFFFFF",
    color: "black",
    borderRadius: "30px",
    fontSize: "16px",
    width:"500px",
    marginBottom:"10px",
    marginLeft:"10px"

};

var I, exact, error;
class Composite_Simpson extends Component {
    constructor() {
        super();
        this.state = {
            fx: "",
            a: 0,
            b: 0,
            n: 0,
            showOutputCard: false,
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });

    }
    composite_simpson(a, b, n) {
        var h = (b - a) / n
        I = (h / 3) * (func(this.state.fx, a) + func(this.state.fx, b) + (4 * this.summationFunction(1, n, h)) + (2 * this.summationFunction(2, n, 2 * h)))
        exact = exactIntegrate(this.state.fx, a, b)
        error = Math.abs((exact - I) / exact) * 100
        this.setState({
            showOutputCard: true
        })
    }

    summationFunction(start, n, h) {
        var sum = 0
        if (start % 2 === 0) {
            n += 2
        }
        var xi = parseInt(this.state.a) + h
        for (var i = start; i < n; i += 2) {
            sum += func(this.state.fx, xi)
            xi = parseInt(this.state.a) + i * h

        }

        return sum
    }

    render() {
        return (
            <div style={{ padding: "30px" }}>
                <h2 style={{ color: "black", fontWeight: "bold" , textAlign: "center"}}>Composite Simpson's Rule</h2>

                        <Card
                            bordered={true}
                            style={{ background: "#0A183D", borderRadius:"50px", color: "#FFFFFFFF", width:"600px",margin: "auto"}}
                            onChange={this.handleChange}
                            id="inputCard"
                        >
                            <h2 style={{color: "#FFFFFFFF", fontSize:"24px" }}>f(x)</h2><Input size="large" name="fx" style={InputStyle}></Input>
                            <h2 style={{color: "#FFFFFFFF", fontSize:"24px" }}>Lower bound (A)</h2><Input size="large" name="a" style={InputStyle}></Input>
                            <h2 style={{color: "#FFFFFFFF", fontSize:"24px" }}>Upper bound (B)</h2><Input size="large" name="b" style={InputStyle}></Input>
                            <h2 style={{color: "#FFFFFFFF", fontSize:"24px" }}>N</h2><Input size="large" name="n" style={InputStyle}></Input><br /><br />
                            <Button id="submit_button" onClick={
                                () => this.composite_simpson(parseInt(this.state.a), parseInt(this.state.b), parseInt(this.state.n))
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
                                <p style={{ fontSize: "24px", fontWeight: "bold" }}>
                                    Approximate = {I}<br />
                                    Exact = {exact}<br />
                                    Error = {error}%
                                </p>
                            </Card>
                        }
            </div>
        );
    }
}
export default Composite_Simpson;