import React, { Component } from 'react';
import { Card, Input, Button, Table } from 'antd';
import '../../screen.css';
import 'antd/dist/antd.css';
import Graph from '../../components/Graph';
import { func } from '../../services/Services';

const InputStyle = {
    background: "#FFFFFF",
    color: "black",
    borderRadius: "30px",
    fontSize: "16px",
    width:"500px",
    marginBottom:"10px",
    marginLeft:"10px"

};
var dataInTable;
const columns = [
    {
        title: "x",
        dataIndex: "x",
        key: "x"
    },
    {
        title: "y",
        key: "y",
        dataIndex: "y"
    }
];
var x = [], yE = [];
class Heun extends Component {
    constructor() {
        super();
        this.state = {
            fx: "",
            start: 0,
            finish: 0,
            x0: 0,
            y0: 0,
            h: 0,
            exactEquation: "",
            showOutputCard: false,
            showGraph: false
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });

    }
    heun(start, finish, x0, y0, h) {
        x = []
        yE = []
        dataInTable = []
        var y = y0
        var xi = x0
        for (var i = start; i <= finish; i += h) {
            var euler = this.euler(xi, y, h)
            y = y + ((func(this.state.fx, xi, y) + func(this.state.fx, (xi += h), euler)) / 2) * h
            yE.push(y)
            x.push(i)
        }
        this.createTable(x, yE)
        this.setState({
            showOutputCard: true,
            showGraph: true
        })
    }
    euler(x, y, h) {
        return y + func(this.state.fx, x, y) * h

    }

    createTable(x, y) {
        dataInTable = []
        for (var i = 0; i < x.length; i++) {
            dataInTable.push({
                x: x[i],
                y: y[i]
            });
        }

    }
    render() {
        return (
            <div style={{ padding: "30px" }}>
                <h2 style={{ color: "black", fontWeight: "bold" , textAlign: "center"}}>Heun's Method</h2>
                <div className="row">
                    <div className="col">
                        <Card
                            bordered={true}
                            style={{ background: "#0A183D", borderRadius:"50px", color: "#FFFFFFFF", width:"600px",margin: "auto"}}
                            onChange={this.handleChange}
                            id="inputCard"
                        >

                            <h2 style={{color: "#FFFFFFFF", fontSize:"24px" }}>f(x,y)</h2><Input size="large" name="fx" style={InputStyle}></Input>
                            <h2 style={{color: "#FFFFFFFF", fontSize:"24px" }}>X<sub>0</sub></h2><Input size="large" name="x0" style={InputStyle}></Input>
                            <h2 style={{color: "#FFFFFFFF", fontSize:"24px" }}>Y<sub>0</sub></h2><Input size="large" name="y0" style={InputStyle}></Input>
                            <h2 style={{color: "#FFFFFFFF", fontSize:"24px" }}>Start</h2><Input size="large" name="start" style={InputStyle}></Input>
                            <h2 style={{color: "#FFFFFFFF", fontSize:"24px" }}>Finish</h2><Input size="large" name="finish" style={InputStyle}></Input>
                            <h2 style={{color: "#FFFFFFFF", fontSize:"24px" }}>H</h2><Input size="large" name="h" style={InputStyle}></Input><br /><br />
                            <h2 style={{color: "#FFFFFFFF", fontSize:"24px" }}>Exact Equation</h2><Input size="large" name="exactEquation" style={InputStyle}></Input><br /><br />

                            <Button id="submit_button" onClick={
                                () => this.heun(parseFloat(this.state.start), parseFloat(this.state.finish), parseFloat(this.state.x0), parseFloat(this.state.y0), parseFloat(this.state.h))
                            }
                            style={{ background: "#FC0254", color: "white", fontSize: "14px", borderRadius:"30px" ,height:"40px",width:"100px",marginLeft:"40%"}}>Submit</Button>

                        </Card>
                    </div>
                    <div className="col">
                        {this.state.showGraph && <Graph fx={this.state.exactEquation} title={'Heun\'s of ' + this.state.exactEquation} />}

                    </div>
                </div>
                {this.state.showOutputCard &&
                    <Card
                        title={"Output"}
                        bordered={true}
                        style={{ background: "#383B70", borderRadius:"50px", color: "#FFFFFFFF", width:"600px",margin: "auto",marginTop:"50px"}}
                        id="outputCard"
                    >
                        <Table columns={columns} bordered={true} dataSource={dataInTable} bodyStyle={{ fontWeight: "bold", fontSize: "18px", color: "black" }}
                        ></Table>
                    </Card>
                }
            </div>
        );
    }
}
export default Heun;