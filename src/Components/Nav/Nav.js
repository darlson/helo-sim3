import React, {Component} from 'react'
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import {logoutUser} from '../../ducks/reducer'
import axios from 'axios'
import homeIcon from '../../images/home.svg'
import addIcon from '../../images/plus-square.svg'
import logoutIcon from '../../images/power.svg'
import {withRouter} from 'react-router-dom'

class Nav extends Component {

    logout = () => {
        console.log("logging out");
        axios.delete('/auth/logout').then( () => {
            this.props.logoutUser()
            this.props.history.push('/')
        })
    }
    
    render(props) {
        return (
            <div>
                This is the Nav component
                <Link to='/dashboard'>
                    <img 
                    className='nav-img' 
                    src={homeIcon} 
                    alt='' /></Link>
                <Link to='/new'>
                    <img 
                    className='nav-img' 
                    src={addIcon} 
                    alt='' /></Link>
                
                <img 
                    onClick={() => this.logout()}
                    className='nav-img' 
                    src={logoutIcon} 
                    alt='' />
            </div>
        )
    }
}

const mapStateToProps = state => state
export default connect(mapStateToProps, {logoutUser})(withRouter(Nav))