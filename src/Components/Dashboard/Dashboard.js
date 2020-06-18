import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getUser} from '../../ducks/reducer'
import axios from 'axios'

class Dashboard extends Component {
    constructor() {
        super()
        this.state = {
            newPass: ''
        }
    }
    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    updatePass = (e) => {
        e.preventDefault()
        const {username, newPass} = this.state
        axios.put('/auth/update', {username, newPass})
        .then( res => {
            alert('Password updated')
        })
        .catch( err => {
            console.log(err);
        })

    }

    render(props) {
        console.log(this.state)
        return (
            <div>
                This is the Dashboard component
                <form
                    onSubmit={e => this.updatePass(e)}>
                    <input
                        type='password'
                        placeholder='new password'
                        name='newPass'
                        value={this.state.newPass}
                        onChange={e => this.handleChange(e)} />
                    <button type='submit' >Submit</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = state => state
export default connect(mapStateToProps, {getUser})(Dashboard)