import React from 'react';
import AddUser from './AddUser.jsx';
import UsersList from './UsersList.jsx';
import CurrentUserInfo from './CurrentUserInfo.jsx';

import axios from 'axios';


class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users: {},
            currentUser: null
        }
        this.fetchUsers = this.fetchUsers.bind(this);
        this.addUser = this.addUser.bind(this)
        this.setCurrentUser = this.setCurrentUser.bind(this)
        this.updateCurrentUserWeight = this.updateCurrentUserWeight.bind(this)
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
    addUser(user) {
        axios.post('/users', user)
            .then(() => {
                this.fetchUsers();
                this.setState({
                    currentUser: user
                })
            })
    }
    setCurrentUser(user) {
        this.setState({
            currentUser: user
        })
    }
    updateCurrentUserWeight(user, updatedWeight) {
        axios.put('/users', {
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

    render() {
        return (
            <div>
                <div>

                    {this.state.currentUser === null &&
                        <div>
                            <AddUser adduser={this.addUser} />
                            {this.state.users.length > 0 &&
                                <UsersList users={this.state.users} setCurrentUser={this.setCurrentUser} />}
                        </div>
                    }
                </div>
                {this.state.currentUser !== null &&
                    <CurrentUserInfo currentUser={this.state.currentUser} updateCurrentUserWeight={this.updateCurrentUserWeight} />}
            </div>

        )
    }
}

export default App;