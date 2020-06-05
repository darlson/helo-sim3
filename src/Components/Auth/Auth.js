import React, {Component} from 'react'

class Auth extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: ''
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    register = (e) => {

    }

    render() {
        console.log(this.state)
        const {email, password} = this.state
        return (
            <div>
                <form
                    onSubmit={e => this.register(e)}>
                    <input 
                        type='text' 
                        placeholder='email' 
                        name='email' 
                        value={email}
                        onChange={e => this.handleChange(e)} />
                    <input 
                        type='password' 
                        placeholder='password' 
                        name='password' 
                        value={password} 
                        onChange={e => this.handleChange(e)} />
                    <input 
                        type='submit'
                        value='Register'
                    />
                </form>
            </div>
        )
    }
}

export default Auth