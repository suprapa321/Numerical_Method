import React, { Component } from 'react'
import { Card, Input, Button, Table } from 'antd';
import '../../screen.css';
import 'antd/dist/antd.css';
import { error, func, getXL_XR_from_API } from '../../services/Services';
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
        title: "XL",
        dataIndex: "xl",
        key: "xl"
    },
    {
        title: "XR",
        dataIndex: "xr",
        key: "xr"
    },
    {
        title: "X",
        dataIndex: "x",
        key: "x"
    },
    {
        title: "Error",
        key: "error",
        dataIndex: "error"
    }
];

class Bisection extends Component {

    constructor() {
        super();
        this.state = this.getInitialState();
        this.handleChange = this.handleChange.bind(this);
        this.bisection = this.bisection.bind(this);
        this.handleAPI = this.handleAPI.bind(this);
    }

    getInitialState = () => ({
        fx: "",
        xl: 0,
        xr: 0,
        showOutputCard: false,
        showGraph: false,
        moveLeft: false
        
    })

    bisection(xl, xr) {
        var increaseFunction = false;
        var xm = 0;
        var sum = parseFloat(0.000000);
        var n = 0;
        var data = []
        data['xl'] = []
        data['xr'] = []
        data['x'] = []
        data['error'] = []
        if (func(this.state.fx, xl) < func(this.state.fx, xr)) {
            increaseFunction = true;
        }

        do {
            xm = (xl + xr) / 2;
            if (func(this.state.fx, xm) * func(this.state.fx, xr) < 0) {
                sum = error(xm, xr);
                if (increaseFunction) {
                    xl = xm;
                }
                else {
                    xr = xm;
                }

            }
            else {
                sum = error(xm, xl);
                if (increaseFunction) {
                    xr = xm;
                }
                else {
                    xl = xm;
                }
            }
            data['xl'][n] = xl;
            data['xr'][n] = xr;
            data['x'][n] = xm.toFixed(8);
            data['error'][n] = Math.abs(sum).toFixed(8);
            n++;
        } while (Math.abs(sum) > 0.000001);
        this.createTable(data['xl'], data['xr'], data['x'], data['error']);
        this.setState({
            showOutputCard: true,
            showGraph: true,

        })


    }

    async handleAPI() {
    
        const response = await getXL_XR_from_API();
        this.setState({
            fx: response[0].fx,
            xl: response[0].xl,
            xr: response[0].xr
        })
        const { fx, xl, xr } = this.state;

        this.bisection(parseFloat(xl), parseFloat(xr));

    }

    createTable(xl, xr, x, error) {
        dataInTable = []
        for (var i = 0; i < xl.length; i++) {
            dataInTable.push({
                iteration: i + 1,
                xl: xl[i],
                xr: xr[i],
                x: x[i],
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
        let { fx, xl, xr } = this.state;
        return (
            <div style={{padding: "30px" }}>
                <h2 style={{ color: "black", fontWeight: "bold" , textAlign: "center"}}>Bisection</h2>

                        <Card
                            bordered={true}
                            style={{ background: "#0A183D", borderRadius:"50px", color: "#FFFFFFFF", width:"600px",margin: "auto"}}
                            onChange={this.handleChange}
                            id="inputCard"
                        >
                            <h2 style={{color:"white"}}>f(x)</h2><Input size="large" name="fx" style={InputStyle}></Input>
                            <h2 style={{color:"white"}}>X<sub>L</sub></h2><Input size="large" name="xl" style={InputStyle}></Input>
                            <h2 style={{color:"white"}}>X<sub>R</sub></h2><Input size="large" name="xr" style={InputStyle}></Input><br /><br />
                            <div className="row">
                                <div className="col-3">
                                    <Button id="submit_button" onClick={
                                    () => this.bisection(parseFloat(xl), parseFloat(xr))
                                }
                                style={{ background: "#FC0254", color: "white", fontSize: "14px", borderRadius:"30px" ,height:"40px",width:"100px",marginLeft:"40%"}}>Submit</Button>
                                </div>
                                <div className="col">
                                    <Button id="submit_button_api" onClick={() => this.handleAPI()}
                                    style={{ background: "blue", color: "white" }}>Calculate from data that get from API</Button>
                                </div>
                            </div>
                        </Card>
                        {this.state.showGraph && <Graph fx={fx} title="Bisection Method" />}                    
                
                <div className="row">
                    {this.state.showOutputCard &&
                        <Card
                            title={"Output"}
                            bordered={true}
                            style={{ background: "#383B70", borderRadius:"50px", color: "#FFFFFFFF", width:"600px",margin: "auto",marginTop:"50px"}}
                            id="outputCard"
                        >
                            <Table pagination={{defaultPageSize: 5}} columns={columns} dataSource={dataInTable} bodyStyle={{ fontWeight: "bold", fontSize: "18px", color: "black" }}></Table>
                        </Card>
                    }
                </div>
            </div>

        );
    }
}
export default Bisection;