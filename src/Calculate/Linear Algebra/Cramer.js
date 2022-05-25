import React, { Component } from 'react'
import { Card, Input, Button } from 'antd';
import { det } from 'mathjs';
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

var A = [], B = [], answer = [], matrixA = [], matrixB = []
class Cramer extends Component {

    constructor() {
        super();
        this.state = {
            row: parseInt(0),
            column: parseInt(0),
            showDimentionForm: true,
            showMatrixForm: false,
            showOutputCard: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.cramer = this.cramer.bind(this);

    }

    cramer() {
        this.initMatrix();
        var counter = 0;
        

        while (counter != this.state.row) {
            var transformMatrix = JSON.parse(JSON.stringify(A)); //Deep copy
            for (var i = 0; i < this.state.row; i++) {
                for (var j = 0; j < this.state.column; j++) {
                    if (j === counter) {
                        transformMatrix[i][j] = B[i]
                        break;
                    }

                }

            }
            counter++;
            answer.push(<h2>X<sub>{counter}</sub>=&nbsp;&nbsp;{Math.round(det(transformMatrix)) / Math.round(det(A))}</h2>)
            answer.push(<br />)

        }
        this.setState({
            showOutputCard: true
        });

    }

    createMatrix(row, column) {
        for (var i = 1; i <= row; i++) {
            for (var j = 1; j <= column; j++) {
                matrixA.push(<Input style={{
                    width: "14%",
                    height: "50%",
                    backgroundColor: "black",
                    marginInlineEnd: "5%",
                    marginBlockEnd: "5%",
                    color: "white",
                    fontSize: "18px",
                    fontWeight: "bold"
                }}
                    id={"a" + i + "" + j} key={"a" + i + "" + j} placeholder={"a" + i + "" + j} />)
            }
            matrixA.push(<br />)
            matrixB.push(<Input style={{
                width: "14%",
                height: "50%",
                backgroundColor: "black",
                marginInlineEnd: "5%",
                marginBlockEnd: "5%",
                color: "white",
                fontSize: "18px",
                fontWeight: "bold"
            }}
                id={"b" + i} key={"b" + i} placeholder={"b" + i} />)
        }

        this.setState({
            showDimentionForm: false,
            showMatrixForm: true,
        })


    }

    initMatrix() {
        for (var i = 0; i < this.state.row; i++) {
            A[i] = []
            for (var j = 0; j < this.state.column; j++) {
                A[i][j] = (parseFloat(document.getElementById("a" + (i + 1) + "" + (j + 1)).value));
            }
            B.push(parseFloat(document.getElementById("b" + (i + 1)).value));
        }
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }

    render() {
        let { row, column } = this.state;
        return (
            <div style={{ padding: "30px" }}>
                <h2 style={{ color: "black", fontWeight: "bold" , textAlign: "center"}}>Cramer's Rule</h2>

                        <Card
                            bordered={true}
                            style={{ background: "#0A183D", borderRadius:"50px", color: "#FFFFFFFF", width:"600px",margin: "auto"}}
                            onChange={this.handleChange}
                        >

                            {this.state.showDimentionForm &&
                                <div>
                                    <h4 style={{color: "#FFFFFFFF", fontSize:"24px" }}>Row</h4><Input size="large" name="row" style={InputStyle}></Input>
                                    <h4 style={{color: "#FFFFFFFF", fontSize:"24px" }}>Column</h4><Input size="large" name="column" style={InputStyle}></Input><br />
                                    <Button id="dimention_button" onClick={
                                        () => this.createMatrix(row, column)
                                    }
                                    style={{ background: "#FC0254", color: "white", fontSize: "14px", borderRadius:"30px" ,height:"40px",width:"100px",marginLeft:"40%"}}>
                                        Submit
                                    </Button>
                                </div>
                            }
                            {this.state.showMatrixForm &&
                                <div>
                                    <h2 style={{color: "#FFFFFFFF", fontSize:"24px" }}>Matrix [A]</h2><br />{matrixA}
                                    <h2 style={{color: "#FFFFFFFF", fontSize:"24px" }}>Vector [B]<br /></h2>{matrixB}<br/>
                                    <Button
                                        size="large"
                                        id="matrix_button"
                                        style={{ background: "#FC0254", color: "white", fontSize: "14px", borderRadius:"30px" ,height:"40px",width:"100px",marginLeft:"40%"}}
                                        onClick={() => this.cramer()}>
                                        Submit
                                </Button>
                                </div>
                            }

                        </Card>
                        {this.state.showOutputCard &&
                            <Card
                                title={"Output"}
                                bordered={true}
                                style={{ background: "#383B70", borderRadius:"50px", color: "#FFFFFFFF", width:"600px",margin: "auto",marginTop:"50px"}}
                                onChange={this.handleChange}>
                                <p style={{ fontSize: "24px", fontWeight: "bold" }}>{answer}</p>
                            </Card>
                        }

            </div>
        );
    }
}
export default Cramer;




