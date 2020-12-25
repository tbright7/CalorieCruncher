import React from 'react';
import { Dropdown, DropdownButton, ButtonGroup } from 'react-bootstrap';
import PropTypes from 'prop-types';

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
    }
    setCurrentUser(user) {
        this.setState({
            currentUser: user
        })
    }
    render() {
        return (
            <div>
                <button onClick={this.showUsers}>Show Users List</button>
                <div>
                    {this.state.showUsers === true &&
                        this.props.users.map((user) => (
                            <div key={user.id}>
                                <button 
                                onClick={() => {this.props.setCurrentUser(user)}}
                                >
                                {user.username}
                                </button>
                                
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}


export default UsersList;