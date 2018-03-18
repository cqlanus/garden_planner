// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as Fa from 'react-icons/lib/fa'

type Props = {}

class SideNav extends Component<Props> {
    render() {
        return (
            <div className="sideNav">
                <div className="sideNavTitleContainer">
                    <div className="spacer" />
                    <h3 className="sideNavTitle">Side Nav</h3>
                </div>

                <a href="#" className="sideNavBtn">
                    <Fa.FaDashboard className="icon" />
                    <span className="sideNavBtnText">Dashboard</span>
                </a>
                <a href="#" className="sideNavBtn">
                    <Fa.FaHome className="icon" />
                    <span className="sideNavBtnText">User Profile</span>
                </a>
                <a href="#" className="sideNavBtn">
                    <Fa.FaStar className="icon" />
                    <span className="sideNavBtnText">Something Else</span>
                </a>
            </div>
        )
    }
}

export default connect(null, null)(SideNav)
