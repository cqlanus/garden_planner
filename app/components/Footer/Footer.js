// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'

type Props = {}

class Footer extends Component<Props> {
    render() {
        return <div className="footer">This is a footer</div>
    }
}

export default connect(null, null)(Footer)
