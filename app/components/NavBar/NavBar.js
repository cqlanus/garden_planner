// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'

type Props = {}

class NavBar extends Component<Props> {
    render() {
        return <div className="navBar">This is a navbar</div>
    }
}

export default connect(null, null)(NavBar)
