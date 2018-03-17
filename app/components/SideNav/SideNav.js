// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'

type Props = {}

class SideNav extends Component<Props> {
    render() {
        return (
            <div className="sideNav">
                <h3>Side Nav</h3>

                <a href="#" className="sideNavBtn">
                    Dashboard
                </a>
                <a href="#" className="sideNavBtn">
                    User Profile
                </a>
                <a href="#" className="sideNavBtn">
                    Something Else
                </a>
            </div>
        )
    }
}

export default connect(null, null)(SideNav)
