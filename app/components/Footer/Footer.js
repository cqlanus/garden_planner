// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'

type Props = {}

class Footer extends Component<Props> {
    render() {
        return (
            <div className="footer">
                <div className="copyright">&copy; Christopher Lanus 2018</div>
            </div>
        )
    }
}

export default connect(null, null)(Footer)
