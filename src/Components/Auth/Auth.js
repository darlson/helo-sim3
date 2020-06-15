import React, {Component} from 'react'
import axios from 'axios'
import {connect} from 'react-redux'
import {loginUser} from '../../ducks/reducer'

class Auth extends Component {
    constructor() {
        super()
        this.state = {
            username: '',
            password: ''
        }
    }

    handleChange = (e) => {
        this.setState({ [e.target.name]: e.target.value })
    }

    login = (e) => {
        e.preventDefault()
        const {username, password} = this.state
        axios.post('/auth/login', {username, password})
        .then( res => {
            this.props.loginUser(res.data)
            this.props.history.push('/dashboard')
        })
        .catch( err => {
            console.log(err.response.data)
            alert(err.response.data)
        })
        // console.log(`logged in!`)
    }
    register = (e) => {
        e.preventDefault()
        const {username, password} = this.state
        axios.post('/auth/register', {username, password})
        .then( res => {
            this.props.loginUser(res.data)
            this.props.history.push('/dashboard')
        })
        .catch( err => {
            console.log(err.response.data)
            alert(err.response.data)
        })  
    }

    render() {
        console.log(this.state)
        const {username, password} = this.state
        return (
            <div>
                <form
                    onSubmit={e => this.login(e)}>
                    <input 
                        type='text' 
                        placeholder='username' 
                        name='username' 
                        value={username}
                        onChange={e => this.handleChange(e)} />
                    <input 
                        type='password' 
                        placeholder='password' 
                        name='password' 
                        value={password} 
                        onChange={e => this.handleChange(e)} />
                    <button type='submit'>Login</button>
                    <button onClick={e => this.register(e)}>Register</button>
                </form>
            </div>
        )
    }
}

const mapStateToProps = reduxState => reduxState
// const mapDispatchToProps = {loginUser}

export default connect(mapStateToProps, {loginUser})(Auth)