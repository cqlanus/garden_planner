// @flow
import React, { Component } from 'react'
import type { Node } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import { logout } from '../../redux'

type Props = {
    children?: Node,
    handleClick: () => void,
    isLoggedIn: boolean,
}

class Main extends Component<Props> {
    render() {
        const { children, handleClick, isLoggedIn } = this.props

        return (
            <div>
                <h1>SKELETAL</h1>
                <nav>
                    {isLoggedIn ? (
                        <div>
                            {/* The navbar will show these links after you log in */}
                            <Link to="/home">Home</Link>
                            <a href="#" onClick={handleClick}>
                                Logout
                            </a>
                        </div>
                    ) : (
                        <div>
                            {/* The navbar will show these links before you log in */}
                            <Link to="/login">Login</Link>
                            <Link to="/signup">Sign Up</Link>
                        </div>
                    )}
                </nav>
                <hr />
                {children}
            </div>
        )
    }
}

/**
 * CONTAINER
 */
const mapState = state => {
    return {
        isLoggedIn: !!state.user.id,
    }
}

const mapDispatch = dispatch => {
    return {
        handleClick: () => dispatch(logout()),
    }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))

/**
 * PROP TYPES
 */
Main.propTypes = {
    children: PropTypes.object,
    handleClick: PropTypes.func.isRequired,
    isLoggedIn: PropTypes.bool.isRequired,
}
