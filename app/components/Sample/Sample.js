// @flow
import React, { Component } from 'react'
import { connect } from 'react-redux'

type Props = {}

class Sample extends Component<Props> {
    render() {
        return <div className="sample">This is a sample</div>
    }
}

export default connect(null, null)(Sample)
