import React, { Component } from 'react'
import {Card, Input, Button, Table} from 'antd';
import '../../screen.css';
import 'antd/dist/antd.css';
import { error } from '../../services/Services';
const InputStyle = {
    background: "#FFFFFF",
    color: "black",
    borderRadius: "30px",
    fontSize: "16px",
    width:"500px",
    marginBottom:"10px",
    marginLeft:"10px"

};

var A = [], B = [], matrixA = [], matrixB = [], x , epsilon, output = [], dataInTable = [], count=1, matrixX = []
var columns = [
    {
      title: "Iteration",
      dataIndex: "iteration",
      key: "iteration"
    }
];
class Seidel extends Component {
    
    constructor() {
        super();
        this.state = {
            row: 0,
            column: 0,
            showDimentionForm : true,
            showMatrixForm: false,
            showOutputCard: false
        }
        this.handleChange = this.handleChange.bind(this);
        this.seidel = this.seidel.bind(this);
    
    }

  
    seidel(n) {
        this.initMatrix();
        x = new Array(n);
        var xold
        epsilon = new Array(n);
        do {
            xold = JSON.parse(JSON.stringify(x));
            for (var i=0 ; i<n ; i++) {
                var sum = 0;
                for (var j=0 ; j<n ; j++) {
                    if (i !== j) { //else i == j That is a divide number
                        sum = sum + A[i][j]*x[j];
                    }
                }
                x[i] = (B[i] - sum)/A[i][i]; //update x[i]
                
            }        
        } while(error(x, xold)); //if true , continue next iteration
        
        
        for (i=0 ; i<x.length ; i++) {
                output.push(x[i]);
                output.push(<br/>);
        }
        this.setState({
            showOutputCard: true
        });

      
    }
    error(xnew, xold) {
        for (var i=0 ; i<xnew.length ; i++) {
            epsilon[i] = Math.abs((xnew[i]-xold[i]) / xnew[i])
        }
        this.appendTable(x, epsilon);
        for (i=0 ; i<epsilon.length ; i++) {
            if (epsilon[i] > 0.000001) {
                return true;
            }    
        }
        return false;  
    }   
    createMatrix(row, column) {
        A = []
        B = []
        matrixA = []
        matrixB = []
        matrixX = []
        x = []
        dataInTable = []
        for (var i=1 ; i<=row ; i++) {
            for (var j=1 ; j<=column ; j++) {
                matrixA.push(<Input style={{
                    width: "18%",
                    height: "50%", 
                    backgroundColor:"black", 
                    marginInlineEnd: "5%", 
                    marginBlockEnd: "5%",
                    color: "white",
                    fontSize: "18px",
                    fontWeight: "bold"
                }} 
                id={"a"+i+""+j} key={"a"+i+""+j} placeholder={"a"+i+""+j} />)  
            }
            matrixA.push(<br/>)
            matrixB.push(<Input style={{
                width: "18%",
                height: "50%", 
                backgroundColor:"black", 
                marginInlineEnd: "5%", 
                marginBlockEnd: "5%",
                color: "white",
                fontSize: "18px",
                fontWeight: "bold"
            }} 
            id={"b"+i} key={"b"+i} placeholder={"b"+i} />)
            matrixX.push(<Input style={{
                width: "18%",
                height: "50%", 
                backgroundColor:"black", 
                marginInlineEnd: "5%", 
                marginBlockEnd: "5%",
                color: "white",
                fontSize: "18px",
                fontWeight: "bold"
            }} 
            id={"x"+i} key={"x"+i} placeholder={"x"+i} />)
                
            
        }

        this.setState({
            showDimentionForm: false,
            showMatrixForm: true,
        })

        

    }
    initMatrix() {
        for(var i=0 ; i<this.state.row ; i++) {
            A[i] = []
            for(var j=0 ; j<this.state.column ; j++) {
                A[i][j] = (parseFloat(document.getElementById("a"+(i+1)+""+(j+1)).value));
            }
            B.push(parseFloat(document.getElementById("b"+(i+1)).value));
            x.push(parseFloat(document.getElementById("x"+(i+1)).value));
        }
    }
    initialSchema(n) {
        for (var i=1 ; i<=n ; i++) {
            columns.push({
                title: "X"+i,
                dataIndex: "x"+i,
                key: "x"+i
            },)
        }
        for (i=1 ; i<=n ; i++) {
            columns.push({
                title: "Error"+i,
                dataIndex: "error"+i,
                key: "error"+i
            },)
        }
    }
    appendTable(x, error) {
        var tag = ''
        tag += '{"iteration": ' + count++ + ',';
        for (var i=0 ; i<x.length ; i++) {
            tag += '"x'+(i+1)+'": '+x[i].toFixed(8)+', "error'+(i+1)+'": ' + error[i].toFixed(8);
            if (i !== x.length-1) {
                tag += ','
            }
        }
        tag += '}';
        dataInTable.push(JSON.parse(tag));  
    }

    handleChange(event) {
        this.setState({
            [event.target.name]: event.target.value
        });
    }
    render() {
        return(
            <div style={{padding: "30px" }}>
                <h2 style={{ color: "black", fontWeight: "bold" , textAlign: "center"}}>Gauss-Seidel Iteration Method</h2>

                        <Card
                        bordered={true}
                        style={{ background: "#0A183D", borderRadius:"50px", color: "#FFFFFFFF", width:"600px",margin: "auto"}}
                        onChange={this.handleChange}
                        >
                            {this.state.showDimentionForm && 
                                <div>
                                    <h2 style={{color: "#FFFFFFFF", fontSize:"24px" }}>Row</h2><Input size="large" name="row" style={InputStyle}></Input>
                                    <h2 style={{color: "#FFFFFFFF", fontSize:"24px" }}>Column</h2><Input size="large" name="column" style={InputStyle}></Input>
                                    <Button id="dimention_button" onClick= {
                                        ()=>{this.createMatrix(this.state.row, this.state.column);
                                            this.initialSchema(this.state.row)}
                                        }  
                                        style={{ background: "#FC0254", color: "white", fontSize: "14px", borderRadius:"30px" ,height:"40px",width:"100px",marginLeft:"40%"}}>
                                        Submit
                                    </Button>
                                </div> 
                            }
                            
                            {this.state.showMatrixForm && 
                                <div>
                                    <h2 style={{color: "#FFFFFFFF", fontSize:"24px" }}>Matrix [A]</h2><br/>{matrixA}
                                    <h2 style={{color: "#FFFFFFFF", fontSize:"24px" }}>Vector [B]<br/></h2>{matrixB}
                                    <h2 style={{color: "#FFFFFFFF", fontSize:"24px" }}>Initial X<br/></h2>{matrixX}
                                    <Button 
                                        id="matrix_button"  
                                        style={{ background: "#FC0254", color: "white", fontSize: "14px", borderRadius:"30px" ,height:"40px",width:"100px",marginLeft:"40%"}}
                                        onClick={()=>this.seidel(parseInt(this.state.row))}>
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
                            id="outputCard"
                            >
                                <Table columns={columns} dataSource={dataInTable} bordered={true} bodyStyle={{fontWeight: "bold", fontSize: "18px", color: "black", overflowX: "scroll"}}
                                ></Table>
                            </Card>
                        }          

                
            </div>
        );
    }
}
export default Seidel;



