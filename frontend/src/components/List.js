import React, { Component, useState, useEffect } from 'react';
import axios from 'axios';
import Form from "./Form"
import "./common.css"


const List = () => {

  const [users, setUsers] = useState([]);
  const [editable, setEditable] = useState(false);
  const [updateUser, setUpdateuser] = useState()
  const [id, setID] = useState(null)


  useEffect(() => {
    getPersons()
  }, [])

  const getPersons = () => {
    axios.get('http://localhost:5000/')
    .then((res)=> setUsers(res.data)      
    )
  }

  const addPerson = (values) => {
    const headers = {
      'Content-Type': 'application/json'
  };
      axios.post(
      'http://localhost:5000/',values,{headers}
      ).then(response => {
          console.log("Success ========>", response);
      })
      .catch(error => {
          console.log("Error ========>", error);
      }
  )
  }

  const updatePerson = (id, user) => {
    console.log(user)
    axios.put(`http://localhost:5000/${id}`, updateUser)
  .then ((res)=> res.data)
  .then(() => getPersons())
    if(editable) {
      setEditable(false)
    }
  } 
  

  const deletePerson = (id) => {
    axios.delete(`http://localhost:5000/${id}`)
  .then(()=>{
    getPersons()
  })
  }

  const editPerson = (id, user) => {
    setID(id)
    setUpdateuser(user)
    setEditable(true)
  }


  
  return (
    <div className="container-big">
    <div className="mt-5">
      <div className="row mt-5">
        <div className="col lg-6 mt-5">
          <Form addPerson={addPerson} getPersons={getPersons} />
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

              {users.map((user)=>
                <tr key={user._ID}>
                <td>{editable && user._ID == id ? <input value={updateUser.firstname} onChange={(e) => setUpdateuser({...updateUser, firstname:e.target.value})}/> : user.firstname} </td>
                <td> {editable && user._ID == id? <input value={updateUser.lastname} onChange={(e) => setUpdateuser({...updateUser, lastname:e.target.value})} />: user.lastname} </td>
                <td> {editable && user._ID == id ? <input value={updateUser.email} onChange={(e) => setUpdateuser({...updateUser, email:e.target.value})}  />: user.email} </td>
                <td> {editable && user._ID == id ? <input value={updateUser.phonenumber} onChange={(e) => setUpdateuser({...updateUser, phonenumber:e.target.value})}  />: user.phonenumber}</td>
                <td> {editable && user._ID == id ? <input value={updateUser.city} onChange={(e) => setUpdateuser({...updateUser, city:e.target.value})} />: user.city} </td>
                <td>  
                  {editable && user._ID == id ? <button onClick={(e) => updatePerson(user._ID, user)} className="btn btn-sm btn-success btn-new" >
                <i className="fa fa-check"></i>
                </button>  : <button onClick={(e) => editPerson(user._ID, user)} className="btn btn-sm btn-primary btn-new" >
                <i className="fa fa-pencil"></i>
                </button>    }  

                          

                
                     </td>
                     <td>  <button onClick={(e)=>{deletePerson(user._ID)}} className="btn btn-sm btn-danger btn-new" >
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
    </div>
  )

}

export default List;
