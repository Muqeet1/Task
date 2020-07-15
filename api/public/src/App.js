import React, { Component } from 'react';
import axios from 'axios';


class App extends React.Component{

constructor(props){
  super(props);
  this.state =
  {
    users:[],
    firstname:'',
    lastname:'',
    email:'',
    phonenumber:'',
    city:'',
    id:0

  }
}

componentDidMount(){
  axios.get('http://localhost:5000/')
  .then((res)=>
  this.setState({
    users:res.data,
  firstname:'',
    lastname:'',
    email:'',
    phonenumber:'',
    city:'',
    id:0 

  })
  )
}
firstnamechange = event => {
  this.setState({
    firstname:event.target.value
  })
}

lastnamechange = event => {
  this.setState({
    lastname:event.target.value
  })
}
emailchange = event => {
  this.setState({
    email:event.target.value
  })
}
phonenumberchange = event => {
  this.setState({
    phonenumber:event.target.value
  })
}
citychange = event => {
  this.setState({
     city:event.target.value
  })
}

submit(event,id){
  event.preventDefault()
if (id==0){
  axios.post('http://localhost:5000', {"firstname":this.state.firstname,"lastname":this.state.lastname,"email":this.state.email,"phonenumber":this.state.phonenumber,"city":this.state.city})
  .then (()=> {
    this.componentDidMount();
  })
} else {
  axios.put(`http://localhost:5000/${id}`, {"firstname":this.state.firstname,"lastname":this.state.lastname,"email":this.state.email,"phonenumber":this.state.phonenumber,"city":this.state.city})
  .then (()=> {
    this.componentDidMount();
  })
}
}
delete(id) {
  console.log(id)
  axios.delete(`http://localhost:5000/${id}`)
  .then(()=>{
    this.componentDidMount();
  })
}

getone(id) {
  axios.get(`http://localhost:5000/getone/${id}`)
  .then((res)=>{
    console.log(res.data)
    this.setState({
    firstname:res.data.firstname,
    lastname:res.data.lastname,
    email:res.data.email,
    phonenumber:res.data.phonenumber,
    city:res.data.city,
    id:res.data._ID
    })
  })
}

  render(){

  return (
    <div style={{width: "95%", margin: "auto"}} className="mt-5">
      <div className="row mt-5">
        <div className="col lg-6 mt-5">
            <form onSubmit={(e)=> {this.submit(e,this.state.id)}}>
              <div className="form-group">
                <input type="text" required onChange={(e)=> {this.firstnamechange(e)}} className="form-control" placeholder="First Name" value={this.state.firstname}></input>
              </div>
              <div className="form-group">
                <input type="text" required onChange={(e)=> {this.lastnamechange(e)}} className="form-control"placeholder="Last Name" value={this.state.lastname}></input>
              </div>
              <div className="form-group">
                <input type="email" required onChange={(e)=> {this.emailchange(e)}} className="form-control" placeholder="Email" value={this.state.email}></input>
              </div>
              <div className="form-group">
                <input type="string" required onChange={(e)=> {this.phonenumberchange(e)}} className="form-control" placeholder="Phone Number" value={this.state.phonenumber}></input>
              </div>
              <div className="form-group">
                <input type="text" required onChange={(e)=> {this.citychange(e)}} className="form-control" placeholder="City" value={this.state.city}></input>
              </div>
              <button className="btn btn-block btn-primary">Submit</button>
            </form>
        </div>
        <div className="col lg-6 mt-5">
          <table className="table">
            <thead>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>City</th>
            <th>Edit</th>
            <th>Delete</th>
           
            </thead>
              <tbody>

              {this.state.users.map(user=>
                <tr>
                <td>{ user.firstname     } </td>
                <td> { user.lastname   }   </td>
                <td> { user.email   }    </td>
                <td> { user.phonenumber   }    </td>
                <td> { user.city   }    </td>
                <td>  <button onClick={(e)=>{this.getone(user._ID)}} className="btn btn-sm btn-primary" >
                <i className="fa fa-pencil"></i>
                </button>
                     </td>
                     <td>  <button onClick={(e)=>{this.delete(user._ID)}} className="btn btn-sm btn-danger" >
                       <i className="fa fa-trash"></i>
                     </button>
                     </td>
              </tr>

             
              )}
                


              </tbody>
          </table>
        </div>
      </div>
     
    </div>
  );
}
}
export default App;
