import React from 'react';

class UsersList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            currentUser: null,
            showUsers: false,
        }
        this.showUsers = this.showUsers.bind(this)
        this.setCurrentUser = this.setCurrentUser.bind(this)
    }
    showUsers() {
        this.setState({
            showUsers: !this.state.showUsers
        })
        this.props.updateProfile()
    }
    setCurrentUser(user) {
        this.setState({
            currentUser: user
        })
    }

    render() {
        return (
            <div>
                <div id="showUsers">
                <button id="showUsers" onClick={this.showUsers}>Sign In</button>
                </div>
                <div id = "list">
                    {this.state.showUsers === true &&
                        this.props.users.map((user) => (
                            <div key={user.id}>
                                <button className = "userListItem" id = "userListUsername" onClick={() => { this.props.setCurrentUser(user) }}>
                                    {user.username}
                                </button>
                                <button className = "userListItem" onClick={() => { this.props.updateProfile(user, this.showUsers)}}>Update Profile</button>
                                <button className = "userListItem" onClick={() => { this.props.deleteUser(user) }}>Delete profile</button>
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}


export default UsersList;