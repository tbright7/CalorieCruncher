import React from 'react';
import AddUser from './AddUser.jsx';
import UsersList from './UsersList.jsx';
import CurrentUserInfo from './CurrentUserInfo.jsx';
import UpdateUser from './UpdateUser.jsx';
import axios from 'axios';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: {},
            currentUser: null,
            updateProfile: false,
            userToUpdate: null,
            fields: [{
                name: 'username',
                type: 'text',
                placeholder: 'Name'
            },
            {
                name: 'age',
                type: 'number',
                placeholder: 'Age'
            },
            {
                name: 'weight',
                type: 'number',
                placeholder: 'Weight in lbs'
            },
            {
                name: 'goalweight',
                type: 'number',
                placeholder: 'Goal weight'
            },
            {
                name: 'height',
                type: 'number',
                placeholder: 'Height in inches'
            }],
            activityLevels: [
                {
                    level: 'No excercise',
                    value: 1.25
                },
                {
                    level: 'Light excercise',
                    value: 1.375
                },
                {
                    level: 'Moderately active',
                    value: 1.55
                },
                {
                    level: 'Very active',
                    value: 1.725
                },
                {
                    level: 'Extremely active',
                    value: 1.9
                }
            ]
        }
        this.fetchUsers = this.fetchUsers.bind(this);
        this.fetchWeight = this.fetchWeight.bind(this);
        this.addUser = this.addUser.bind(this);
        this.setCurrentUser = this.setCurrentUser.bind(this);
        this.updateCurrentUserWeight = this.updateCurrentUserWeight.bind(this);
        this.deleteUser = this.deleteUser.bind(this);
        this.updateProfile = this.updateProfile.bind(this);
        this.updateUser = this.updateUser.bind(this);
    }

    componentDidMount() {
        this.fetchUsers()
    }
    fetchUsers() {
        axios.get('/users')
            .then(({ data }) => {
                this.setState({
                    users: data
                })
            })
            .catch((error) => {
                console.log(error)
            });
    }
    fetchWeight(user) {
        axios.get('/weight/' + user.username)
            .then(({ data }) => {
                this.setState({
                    currentUserWeight: data
                })
            })
            .catch((error) => {
                console.log(error)
            });
    }
    addUser(user) {
        axios.post('/users', user)
            .then(() => {
                this.fetchUsers();
                this.setState({
                    currentUser: user
                })
                this.setCurrentUser(user)
            })
    }

    updateUser(user) {
        axios.put('/users', user)
            .then(() => {
                this.fetchUsers();
                this.setState({
                    currentUser: user
                })
                this.setCurrentUser(user)
            })
    }

    deleteUser(user) {
        axios.delete('/users/' + user.username)
            .then(() => {
                this.fetchUsers();
            })
    }
    updateCurrentUserWeight(user, updatedWeight) {
        axios.patch('/users', {
            user: user,
            weight: updatedWeight
        })
            .then(() => {
                this.fetchUsers();
                this.setState({
                    currentUser: user
                })
            })
    }
    setCurrentUser(user) {
        if (user) {
            this.setState({
                currentUser: user
            }, () => {
                this.fetchWeight(user)
            })
        } else {
            this.setState({
                currentUser: null
            })
        }
    }
    updateProfile(user, callback) {
        if(callback) {
            callback()
        }
        if (user) {
            this.setState({
                updateProfile: !this.state.UpdateUser,
                userToUpdate: user
            })
        }
        else {
            this.setState({
                updateProfile: false,
                userToUpdate: null
            })
        }
    }

    render() {
        return (
            <div id="body">
                {this.state.currentUser === null &&
                    this.state.users.length > 0 &&
                    <div id="userList">
                        <UsersList 
                        users={this.state.users} 
                        setCurrentUser={this.setCurrentUser} 
                        deleteUser={this.deleteUser} 
                        updateProfile={this.updateProfile} />
                    </div>

                }
                {this.state.currentUser === null &&
                    this.state.updateProfile === false &&
                    <div id="addUser">
                        <AddUser 
                        adduser={this.addUser}
                        activityLevels={this.state.activityLevels} 
                        fields={this.state.fields}/>
                    </div>

                }
                {this.state.currentUser !== null &&
                    <div id="currentUserInfo">
                        <CurrentUserInfo 
                        setCurrentUser={this.setCurrentUser} 
                        currentUserWeight={this.state.currentUserWeight} 
                        currentUser={this.state.currentUser} 
                        updateCurrentUserWeight={this.updateCurrentUserWeight} />
                    </div>
                }
                {this.state.updateProfile !== false &&
                    <div id="updateUser">
                        <UpdateUser 
                        updateProfile={this.updateProfile} 
                        updateUser={this.updateUser} 
                        userToUpdate={this.state.userToUpdate}
                        activityLevels={this.state.activityLevels} 
                        fields={this.state.fields.slice(1)}
                        />
                    </div>

                }
            </div>

        )
    }
}

export default App;