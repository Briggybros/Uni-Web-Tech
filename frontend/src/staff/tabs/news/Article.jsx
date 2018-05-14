// @flow
import * as React from 'react';
import { connect } from 'react-redux';

type Props = {
    article: Object,
}

type State = {
    preview: boolean,
}

class Article extends React.Component<Props, State> {
    constructor(props) {
        super(props);
        this.state = {
            preview: false,
            article: props.article,
        };
    }

    render() {
        return (
            <div />
        );
    }
}

function mapStateToProps(state, ownProps: Object) {
    return {
        article: ownProps.isNew ? {} : state.news[ownProps.match.params.id],
    };
}

export default connect(mapStateToProps)(Article);
