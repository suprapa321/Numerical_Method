import React, { Component } from 'react'
import { Card, Input, Button } from 'antd';
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

var A = [], B = [], matrixA = [], matrixB = [], output = []
class Jordan extends Component {

    constructor() {
        super();
        this.state = {
            row: 0,
            column: 0,
            showDimentionForm: true,
            showMatrixForm: false,
            showOutputCard: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.jordan = this.jordan.bind(this);

    }

    jordan(n) {
        this.initMatrix();
        if (A[0][0] === 0) { //pivoting
            var tempRow = JSON.parse(JSON.stringify(A[0]));
            var tempColumn = B[0];
            A[0] = A[1];
            A[1] = tempRow;
            B[0] = B[1];
            B[1] = tempColumn;
        }
        //Forward eliminate
        for (var k = 0; k < n; k++) {
            for (var i = k + 1; i < n; i++) {
                var factor = A[i][k] / A[k][k];
                for (var j = k; j < n; j++) {
                    A[i][j] = A[i][j] - factor * A[k][j];
                }
                B[i] = B[i] - factor * B[k];

            }
        }
        //Backward Substitution
        for (k = n - 1; k >= 0; k--) {
            for (i = k; i >= 0; i--) {

                if (i === k) {//Identity matrix
                    factor = 1 / A[i][k];

                    for (j = 0; j < n; j++) {
                        A[i][j] = A[i][j] * factor;
                    }
                    B[i] = B[i] * factor;


                }
                else {
                    factor = A[i][k] / A[k][k];
                    for (j = 0; j < n; j++) {
                        A[i][j] = A[i][j] - factor * A[k][j];
                    }
                    B[i] = B[i] - factor * B[k];
                }
            }
        }
        for (i = 0; i < n; i++) {
            output.push(B[i]);
            output.push(<br />)
        }
        this.setState({
            showOutputCard: true
        });


    }
    createMatrix(row, column) {
        for (var i = 1; i <= row; i++) {
            for (var j = 1; j <= column; j++) {
                matrixA.push(<Input style={{
                    width: "18%",
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
                width: "18%",
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
            <div style={{padding: "30px" }}>
                <h2 style={{ color: "black", fontWeight: "bold" , textAlign: "center"}}>Gauss-Jordan Method</h2>

                        <Card
                            bordered={true}
                            style={{ background: "#0A183D", borderRadius:"50px", color: "#FFFFFFFF", width:"600px",margin: "auto"}}
                            onChange={this.handleChange}
                        >

                            {this.state.showDimentionForm &&
                                <div>
                                    <h2 style={{color: "#FFFFFFFF", fontSize:"24px" }}>Row</h2><Input size="large" name="row" style={InputStyle}></Input>
                                    <h2 style={{color: "#FFFFFFFF", fontSize:"24px" }}>Column</h2><Input size="large" name="column" style={InputStyle}></Input>
                                    <Button id="dimention_button" onClick={
                                        () => this.createMatrix(row, column)
                                    }
                                    style={{ background: "#FC0254", color: "white", fontSize: "14px", borderRadius:"30px" ,height:"40px",width:"100px",marginLeft:"40%"}}>
                                        Submit<br></br>
                                    </Button>
                                </div>
                            }

                            {this.state.showMatrixForm &&
                                <div>
                                    <h2 style={{color: "#FFFFFFFF", fontSize:"24px" }}>Matrix [A]</h2><br />{matrixA}
                                    <h2 style={{color: "#FFFFFFFF", fontSize:"24px" }}>Vector [B]<br /></h2>{matrixB}
                                    
                                    <Button
                                        id="matrix_button"
                                        style={{ background: "#FC0254", color: "white", fontSize: "14px", borderRadius:"30px" ,height:"40px",width:"100px",marginLeft:"40%"}}
                                        onClick={() => this.jordan(row)}>
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
                                onChange={this.handleChange} id="answerCard">
                                <p style={{ fontSize: "24px", fontWeight: "bold" }}>{output}</p>
                            </Card>
                        }
            </div>
        );
    }
}
export default Jordan;



