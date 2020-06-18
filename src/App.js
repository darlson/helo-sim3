import React from 'react';
import './App.css';
import Nav from './Components/Nav/Nav'
import routes from './routes'
import {withRouter} from 'react-router-dom'
import {connect} from 'react-redux'
import {getUser} from './ducks/reducer'

class App extends React.Component {
  // console.log(props)
  
  componentDidMount(){
    this.props.getUser()
  }
  
  render () {
    return (
      <div className="App">
        { this.props.location.pathname === '/' ? null : <Nav /> }
        {routes}
      </div>
    );
  }
}

const mapStateToProps = state => state
export default connect(mapStateToProps, {getUser})(withRouter(App))
