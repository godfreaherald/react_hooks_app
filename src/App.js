import React,{useState} from 'react';

import './index.css';
import UserTable from './tables/UserTable.js';
import AddUserForm from './forms/AddUserForm'
import EditUserForm from './forms/EditUserForm'

const App = () => {

  const usersData = [
    { id: 1, name: 'Godfrey', username: 'Keyboard' },
    { id: 2, name: 'Kennedy', username: 'Andela' },
    { id: 3, name: 'Simon', username: 'Indra' },
  ]

  const [users, setUsers] = useState(usersData);

  const [editing,setEditing ] = useState(false);

  const innitialFormState ={id:null,name:'', username:''}
 
  const [currentUser,setCurrentUser] = useState(innitialFormState);



  const addUser = user => {
    user.id = users.length + 1
    setUsers([...users, user])
  }

  const deleteUser = id => {
    setEditing(false) //prevent deletion of a user while it is currently being edited
    setUsers(users.filter( user =>user.id !==id))
  }

  const editRow = (user) => {
      setEditing(true)

      setCurrentUser({id:user.id,name:user.name,username:user.username})
  }

  const updateUser = (id, updatedUser) => {
    setEditing(false)
  
    setUsers(users.map(user => (user.id === id ? updatedUser : user)))
  }

  return (
    <div className="container">
      <h1>CRUD App Using Hooks</h1>
      <div className="flex-row">
        <div className="flex-large">
        {editing ? (
    <div>
      <h2>Edit user</h2>
      <EditUserForm
        editing={editing}
        setEditing={setEditing}
        currentUser={currentUser}
        updateUser={updateUser}
      />
    </div>
  ) : (
    <div>
      <h2>Add user</h2>
      <AddUserForm addUser={addUser} />
    </div>
  )}
        </div>
        <div className="flex-large">
        <h2>Users List</h2>
        <UserTable users={users} editRow={editRow} deleteUser={deleteUser} />
        </div>
      </div>
    </div>
  );
}

export default App;
