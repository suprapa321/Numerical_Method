import React, { Component } from 'react'
import { Card, Input, Button, Table } from 'antd';
import '../../screen.css';
import 'antd/dist/antd.css';
const InputStyle = {
    background: "#FFFFFF",
    color: "black",
    borderRadius: "30px",
    fontSize: "16px",
    width:"500px",
    marginBottom:"10px",
    marginLeft:"10px"

};
var columns = [
    {
        title: "No.",
        dataIndex: "no",
        key: "no"
    },
    {
        title: "X",
        dataIndex: "x",
        key: "x"
    },
    {
        title: "Y",
        dataIndex: "y",
        key: "y"
    }
];
var x, y, tableTag, interpolatePoint, tempTag, fx

class Newton extends Component {

    constructor() {
        super();
        x = []
        y = []
        interpolatePoint = []
        tempTag = []
        tableTag = []
        this.state = {
            nPoints: 0,
            X: 0,
            interpolatePoint: 0,
            showInputForm: true,
            showTableInput: false,
            showOutputCard: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.newton_difference = this.newton_difference.bind(this);

    }
    createTableInput(n) {
        for (var i = 1; i <= n; i++) {
            x.push(<Input style={{
                width: "100%",
                height: "50%",
                backgroundColor: "black",
                marginInlineEnd: "5%",
                marginBlockEnd: "5%",
                color: "white",
                fontSize: "18px",
                fontWeight: "bold"
            }}
                id={"x" + i} key={"x" + i} placeholder={"x" + i} />);
            y.push(<Input style={{
                width: "100%",
                height: "50%",
                backgroundColor: "black",
                marginInlineEnd: "5%",
                marginBlockEnd: "5%",
                color: "white",
                fontSize: "18px",
                fontWeight: "bold"
            }}
                id={"y" + i} key={"y" + i} placeholder={"y" + i} />);
            tableTag.push({
                no: i,
                x: x[i - 1],
                y: y[i - 1]
            });
        }


        this.setState({
            showInputForm: false,
            showTableInput: true,
        })
    }
    createInterpolatePointInput() {
        for (var i = 1; i <= this.state.interpolatePoint; i++) {
            tempTag.push(<Input style={{
                width: "14%",
                height: "50%",
                backgroundColor: "black",
                marginInlineEnd: "5%",
                marginBlockEnd: "5%",
                color: "white",
                fontSize: "18px",
                fontWeight: "bold"
            }}
                id={"p" + i} key={"p" + i} placeholder={"p" + i} />)
        }
    }
    initialValue() {
        x = []
        y = []
        for (var i = 1; i <= this.state.nPoints; i++) {
            x[i] = parseFloat(document.getElementById("x" + i).value);
            y[i] = parseFloat(document.getElementById("y" + i).value);
        }
        for (i = 1; i <= this.state.interpolatePoint; i++) {
            interpolatePoint[i] = parseInt(document.getElementById("p" + i).value);
        }
    }
    C(n) {
        if (n === 1) {
            return 0
        }
        else {
            return ((y[interpolatePoint[n]] - y[interpolatePoint[n - 1]]) / (x[interpolatePoint[n]] - x[interpolatePoint[n - 1]])) - this.C(n - 1)
        }

    }
    findX(n, X) {
        if (n < 1) {
            return 1
        }
        else {
            console.log(X + " - " + x[interpolatePoint[n]])
            return (X - x[interpolatePoint[n]]) * this.findX(n - 1, X)
        }
    }
    newton_difference(n, X) {
        this.initialValue()
        fx = y[1]
        if (n === 2) { //if linear interpolate
            fx += ((y[interpolatePoint[2]] - y[interpolatePoint[1]]) / (x[interpolatePoint[2]] - x[interpolatePoint[1]])) * (X - x[interpolatePoint[1]])
        }
        else {
            for (var i = 2; i <= n; i++) {
                fx += (this.C(i) / (x[interpolatePoint[i]] - x[interpolatePoint[1]])) * this.findX(i - 1, X)
            }
        }

        this.setState({
            showOutputCard: true
        })

    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    render() {
        return (
            <div style={{ padding: "30px" }}>
                <h2 style={{ color: "black", fontWeight: "bold" , textAlign: "center"}}>Newton's Divided Differences Interpolation</h2>

                        <Card
                            bordered={true}
                            style={{ background: "#0A183D", borderRadius:"50px", color: "#FFFFFFFF", width:"600px",margin: "auto"}}
                            onChange={this.handleChange}
                        >
                            {this.state.showTableInput &&
                                <div>
                                    <Table columns={columns} dataSource={tableTag} pagination={false} bordered={true} bodyStyle={{ fontWeight: "bold", fontSize: "18px", color: "white", overflowY: "scroll", minWidth: 120, maxHeight: 300 }}></Table>
                                    <br /><h2 style={{color: "#FFFFFFFF", fontSize:"24px" }}>interpolatePoint {parseInt(this.state.interpolatePoint) === 2 ? "(Linear)" :
                                        parseInt(this.state.interpolatePoint) === 3 ? "(Quadratic)" :
                                            "(Polynomial)"}</h2>{tempTag}
                                    <Button
                                        id="matrix_button"
                                        style={{ background: "#FC0254", color: "white", fontSize: "14px", borderRadius:"30px" ,height:"40px",width:"100px",marginLeft:"40%"}}
                                        onClick={() => this.newton_difference(parseInt(this.state.interpolatePoint), parseFloat(this.state.X))}>
                                        Submit
                                </Button>
                                </div>}

                            {this.state.showInputForm &&
                                <div>
                                    <h2 style={{color: "#FFFFFFFF", fontSize:"24px" }}>Number of points(n)</h2><Input size="large" name="nPoints" style={InputStyle}></Input>
                                    <h2 style={{color: "#FFFFFFFF", fontSize:"24px" }}>X</h2><Input size="large" name="X" style={InputStyle}></Input>
                                    <h2 style={{color: "#FFFFFFFF", fontSize:"24px" }}>interpolatePoint</h2><Input size="large" name="interpolatePoint" style={InputStyle}></Input>
                                    <Button id="dimention_button" onClick={
                                        () => {
                                            this.createTableInput(parseInt(this.state.nPoints));
                                            this.createInterpolatePointInput()
                                        }
                                    }
                                    style={{ background: "#FC0254", color: "white", fontSize: "14px", borderRadius:"30px" ,height:"40px",width:"100px",marginLeft:"40%"}}>
                                        Submit<br></br>
                                    </Button>
                                </div>
                            }

                        </Card>
                        {this.state.showOutputCard &&
                            <Card
                                title={"Output"}
                                bordered={true}
                                style={{ background: "#383B70", borderRadius:"50px", color: "#FFFFFFFF", width:"600px",margin: "auto",marginTop:"50px"}}
                            >
                                <p style={{ fontSize: "24px", fontWeight: "bold" }}>{fx}</p>

                            </Card>
                        }


            </div>
        );
    }
}
export default Newton;



