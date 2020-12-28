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
            userToUpdate: null
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
    updateProfile(user) {
        if (user) {
            this.setState({
                updateProfile: !this.state.UpdateUser,
                userToUpdate: user
            })
        }
        else {
            this.setState({
                updateProfile: !this.state.UpdateUser,
                userToUpdate: null
            })
        }
    }

    render() {
        return (
            <div>
                <div>
                    <div>
                        {this.state.currentUser === null &&
                            <div>
                                {this.state.updateProfile === false &&
                                    <div>
                                        <AddUser adduser={this.addUser} />
                                        {this.state.users.length > 0 &&
                                            <UsersList users={this.state.users} setCurrentUser={this.setCurrentUser} deleteUser={this.deleteUser} updateProfile={this.updateProfile} />}
                                    </div>
                                }
                            </div>
                        }
                    </div>
                    {this.state.currentUser !== null &&
                        <CurrentUserInfo setCurrentUser={this.setCurrentUser} currentUserWeight={this.state.currentUserWeight} currentUser={this.state.currentUser} updateCurrentUserWeight={this.updateCurrentUserWeight} />
                    }
                </div>
                {this.state.updateProfile !== false &&
                    <UpdateUser updateProfile = {this.updateProfile} updateUser={this.updateUser} userToUpdate={this.state.userToUpdate} />
                }
            </div>

        )
    }
}

export default App;