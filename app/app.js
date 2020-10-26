import React, { Component } from 'react';


class App extends Component {

    constructor() {
        super();
        this.state = {
            name: '',
            lastName: '',
            age: '',
            sport: '',
            users: [],
            _id: '',
            date: new Date()
            
        };
        this.addUser = this.addUser.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    addUser(e) {
        console.log(this.state);    
        if(this.state._id){
            fetch(`/user/${this.state._id}`,{        
                method:'PUT',
                body: JSON.stringify(this.state),
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                M.toast({html: "User Uploded"})
                this.setState({name: '', lastName: '', date: new Date(), sport: '', _id: ''})
                this.fetchUsers();
                
            })
            

        } else {
            fetch('/user', {
                method: 'POST',
                body: JSON.stringify(this.state),
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            
        })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                M.toast({html: 'User Saved'})
                this.setState({name: '', lastName: '', date: new Date() , sport: ''})
                this.fetchUsers();
            })
            .catch(err => console.log(err));
        }
        e.preventDefault();
    }

    componentDidMount() {
        this.fetchUsers();
    }

    fetchUsers(sort){
        
        fetch('/user')
            .then(res => res.json())
            .then(data => {
                this.setState({users: data.usuarios});
                console.log(this.state.users);
            })
        
    }

    deleteUser(id){
        if (confirm('Are you sure you want to delete it?')) {
            fetch(`/user/${id}`, {
                method: 'DELETE',
                headers:{
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data);
                M.toast({html: 'User Deleted'});
                this.fetchUsers();
            });
        }
    }

    editUser(id){
        fetch(`/user/${id}`)
            .then(res => res.json())
            .then(data => {
                let users = data.usuarioDB
                let dateR = new Date(users.date)
                let y = dateR.getFullYear()
                let m = dateR.getMonth()
                let d = dateR.getDay()

                let dateF = `${y}/${m}/${d}`
                this.setState({
                    name: users.name,
                    lastName: users.lastName,
                    date: dateF,
                    sport: users.sport,
                    _id: users._id

                })
                console.log(dateF);
            })
    }
    handleChange(e){
       const { name, value} = e.target;
        this.setState({
            [name]: value
        }) 
    }

   

    render() {
        return(
            <div>
                {/* Navigation */}
                <nav className="#26a69a teal lighten-1">
                    <div className="container">
                        <a className="brand-logo" href="/"> App Web Juan Camilo Echeverri </a>
                    </div>
                </nav>
                <div className="container">
                    <div className= "row">
                        <div className="col s3">
                            <div className="card">
                                <div className= "card-content">
                                    <form onSubmit= {this.addUser}>
                                        <div className="row">
                                            <div className= "input-field col s12">
                                               <input name="name"   onChange={this.handleChange} type="text"  maxLength="12" pattern="[A-Za-z]{0,}" title="Only letters" placeholder="Juan" value={this.state.name} required/> 
                                               <label htmlFor="birthday">Name</label>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className= "input-field col s12">
                                               <input name="lastName" onChange={this.handleChange} type="text" maxLength="12" pattern="[A-Za-z]{0,}" title="Only letters" placeholder="Echeverri" value={this.state.lastName} required/> 
                                               <label htmlFor="birthday">Last Name</label>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className= "input-field col s12">
                                               <input name="date" onChange={this.handleChange}  type="date" min="1920-01-01" max="2019-12-31"  placeholder="Age" value={this.state.date} required/> 
                                               <label htmlFor="birthday">Birthday</label>
                                            </div>
                                        </div>
                                        <div className="row">
                                            <div className= "input-field col s12">
                                               <input name="sport" onChange={this.handleChange} type="text" maxLength="10" pattern="[A-Za-z]{0,}" title="Only letters" placeholder="Hockey" value={this.state.sport} required/> 
                                               <label htmlFor="birthday">Sport</label>
                                            </div>
                                        </div>
                                        <button type="submit" className="#004d40 btn teal darken-4">
                                            Send
                                        </button>
                                    </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s9">
                            <table className="striped" >
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Last Name</th>
                                        <th>Age</th>
                                        <th>Sport</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.users.map( user => {
                                            return (
                                                <tr key={user._id}>
                                                    <td>{user.name}</td>
                                                    <td>{user.lastName}</td>
                                                    <td>{user.age}</td>
                                                    <td>{user.sport}</td>
                                                    <td>
                                                        <button className="#004d40 btn teal darken-4" onClick={() => this.editUser(user._id)} style={{margin: '4px'}}>
                                                            <i className="material-icons">edit</i>
                                                        </button>
                                                        <button className="#e53935 btn red darken-1" onClick={() => this.deleteUser(user._id)}>
                                                            <i className="material-icons">delete</i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    } 
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App;