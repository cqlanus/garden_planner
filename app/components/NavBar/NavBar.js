// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as Fa from 'react-icons/lib/fa'

type Props = {}

class NavBar extends Component<Props> {
    render() {
        return (
            <div className="navBar">
                <div className="navContainer">
                    <h3 className="navTitle">Dashboard</h3>

                    <a href="#" className="navBtn">
                        <Fa.FaDashboard className="icon" />
                    </a>
                    <a href="#" className="navBtn">
                        <Fa.FaBellO className="icon" />
                    </a>
                    <a href="#" className="navBtn">
                        <Fa.FaInfoCircle className="icon" />
                    </a>

                    <a href="#" className="navBtn">
                        <Fa.FaSearch className="icon" />
                    </a>
                </div>
                <div className="spacer" />
            </div>
        )
    }
}

export default connect(null, null)(NavBar)
