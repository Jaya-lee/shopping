import React, { Component } from 'react';
import './index.css';

class App extends Component {
    constructor(){
        super();
        this.state={
            books:'',
            price:'',
            num:'',
            data:[
                {name:'名称',price:'单价(元)',number:'数量(个)',Uall:'小计(元)',do:'操作',id:0}
            ]
        }
    }
    handleSubmit(e){
        e.preventDefault();
        if(this.state.books && this.state.price && this.state.num){
            this.setState({   //设置好每个数组的值
                data:[...this.state.data,{name:this.state.books,price:this.state.price,number:this.state.num,Uall:parseFloat(this.state.price)*Number(this.state.num),id:Date.now()}]
            })
        }
        e.target.reset() //清空表单里的内容
        this.setState({  //清空实际value值
            books:'',
            price:'',
            num:''
        })
    }
    handleChange(e){
        let target=e.target
        if(target.value){
            this.setState({
                [target.id]:target.value
            })
        }
    }
    handleRemove(id){
        let index=this.state.data.findIndex(item => item.id===id)
        let newData=this.state.data
        newData.splice(index,1)
        this.setState({data:newData})
    }
    render() {
        return (
            <div className='container'>
                <table className="table table-bordered ">
                        <thead>
                            {this.state.data.map( item=>
                            <tr key={item.id}>
                                <th>{item.name}</th>
                                <th>{item.price}</th>
                                <th>{item.number}</th>
                                <th>{item.Uall}</th>
                                <th>
                                    {item.id===0 ? item.do : <button className="btn btn-danger"
                                    onClick={this.handleRemove.bind(this,item.id)}>删除</button>}</th>
                            </tr>
                        )}
                        </thead>
                        <tbody>
                            <tr>
                                {/* 利用map与reduce来实现总计功能 */}
                                <td colSpan="5">总计(元):
                                    {this.state.data.map(item =>item.id===0 ?''
                                    : item.Uall).reduce((prev,cur) =>
                                    parseFloat(prev + cur))
                                    }
                                </td>
                            </tr>
                        </tbody>
                </table>
                <form onSubmit={this.handleSubmit.bind(this)}>
                  <div className="form-group">
                    <label htmlFor="books">书名</label>
                    <input className="form-control" id="books" type='text' placeholder="name"
                        value={this.state.id}
                        onChange={this.handleChange.bind(this)}/>
                  </div>
                  <div className="form-group ">
                    <label htmlFor="price">单价</label>
                    <input type="number" min="1" step='0.01' className="form-control" id="price" placeholder="1" value={this.state.id}
                    onChange={this.handleChange.bind(this)}/>
                  </div>
                  <div className="form-group">
                    <label htmlFor="num">数量</label>
                    <input type="number" min="1" id="num" className="form-control" placeholder="1" value={this.state.id}
                    onChange={this.handleChange.bind(this)}/>
                  </div>
                   <button type="submit" className="btn btn-primary">添加</button>
                </form>
            </div>
        );
      }
    }

export default App;
