// @flow
import * as React from 'react';

export const IMAGE_NODE = 'IMAGE_NODE';
export class Image extends React.Component<{node : Object, attributes : Object}, {src : any}> {
    state = {
        src: '',
    }

    componentDidMount() {
        const { node } = this.props;
        const { data } = node;
        const file = data.get('file');
        this.load(file);
    }

    load(file : any) {
        const reader = new FileReader();
        reader.addEventListener('load', () => this.setState({ src: reader.result }));
        reader.readAsDataURL(file);
    }

    render() {
        const { attributes } = this.props;
        const { src } = this.state;
        return src
            ? <img {...attributes} src={src} alt="" />
            : <span>Loading...</span>;
    }
}
