import React, { Component } from 'react'
import { Card, Input, Button, Table } from 'antd';
import '../../screen.css';
import 'antd/dist/antd.css';
import { error, func } from '../../services/Services';
import Graph from '../../components/Graph';

const InputStyle = {
    background: "#FFFFFF",
    color: "black",
    borderRadius: "30px",
    fontSize: "16px",
    width:"500px",
    marginBottom:"10px",
    marginLeft:"10px"

};
var dataInTable = []
const columns = [
    {
        title: "Iteration",
        dataIndex: "iteration",
        key: "iteration"
    },
    {
        title: "Y",
        dataIndex: "y",
        key: "y"
    },
    {
        title: "Error",
        key: "error",
        dataIndex: "error"
    }
];

class Secant extends Component {
    constructor() {
        super();
        this.state = {
            fx: "",
            x0: 0,
            x1: 0,
            showOutputCard: false,
            showGraph: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.secant = this.secant.bind(this);
    }

    secant(x0, x1) {
        var x = [], y = 0, epsilon = parseFloat(0.000000);
        var n = 1, i = 1;
        var data = []
        data['y'] = []
        data['error'] = []
        x.push(x0);
        x.push(x1);
        data['y'][0] = x0;
        data['error'][0] = "---";

        do {
            y = x[i] - (func(this.state.fx, x[i]) * ((x[i] - x[i - 1]))) / (func(this.state.fx, x[i]) - func(this.state.fx, x[i - 1]));
            x.push(y);
            epsilon = error(y, x[i]);
            data['y'][n] = y.toFixed(8);
            data['error'][n] = Math.abs(epsilon).toFixed(8);

            n++;
            i++;

        } while (Math.abs(epsilon) > 0.000001);
        this.createTable(data['y'], data['error']);
        this.setState({
            showOutputCard: true,
            showGraph: true
        })


    }

    createTable(y, error) {
        dataInTable = []
        for (var i = 0; i < y.length; i++) {
            dataInTable.push({
                iteration: i + 1,
                y: y[i],
                error: error[i]
            });
        }

    }
    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        let { fx, x0, x1 } = this.state;
        return (
            <div style={{padding: "30px" }}>
                <h2 style={{ color: "black", fontWeight: "bold" , textAlign: "center"}}>Secant Method</h2>
                
                        <Card
                            bordered={true}
                            style={{ background: "#0A183D", borderRadius:"50px", color: "#FFFFFFFF", width:"600px",margin: "auto"}}
                            onChange={this.handleChange}
                        >
                            <h2 style={{color: "#FFFFFFFF", fontSize:"24px" }}>f(x)</h2><Input size="large" name="fx" style={InputStyle}></Input>
                            <h2 style={{color: "#FFFFFFFF", fontSize:"24px" }}>X<sub>0</sub></h2><Input size="large" name="x0" style={InputStyle}></Input>
                            <h2 style={{color: "#FFFFFFFF", fontSize:"24px" }}>X<sub>1</sub></h2><Input size="large" name="x1" style={InputStyle}></Input><br /><br />
                            <Button id="submit_button" onClick={
                                () => this.secant(parseFloat(x0), parseFloat(x1))
                            }
                            style={{ background: "#FC0254", color: "white", fontSize: "14px", borderRadius:"30px" ,height:"40px",width:"100px",marginLeft:"40%"}}>Submit</Button>

                        </Card>
                        {this.state.showGraph && <Graph fx={fx} title="Secant Method" />}
                
                <div className="row">
                    {this.state.showOutputCard &&
                        <Card
                            title={"Output"}
                            bordered={true}
                            style={{ background: "#383B70", borderRadius:"50px", color: "#FFFFFFFF", width:"600px",margin: "auto",marginTop:"50px"}}
                            id="outputCard"
                        >
                            <Table columns={columns} dataSource={dataInTable} bodyStyle={{ fontWeight: "bold", fontSize: "18px", color: "black" }}
                            ></Table>
                        </Card>
                    }
                </div>

            </div>

        );
    }
}
export default Secant;




