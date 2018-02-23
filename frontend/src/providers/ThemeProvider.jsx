// @flow
import * as React from 'react';
import { ThemeProvider as BaseThemeProvider } from 'styled-components';

type Props = {
    theme : Object,
    children : any,
}

type State = {
    mobile : boolean,
}

export default class ThemeProvider extends React.Component<Props, State> {
    constructor(props : Props) {
        super(props);
        this.state = {
            mobile: false,
        };
    }

    componentDidMount() {
        const query = window.matchMedia('(max-width: 768px)');
        query.onchange = event => this.updateMobile(event.target);
        this.updateMobile(query);
    }

    updateMobile(mql : MediaQueryList) {
        this.setState({
            mobile: mql.matches,
        });
    }

    render() {
        return (
            <BaseThemeProvider
                theme={{
                    ...this.props.theme,
                    media: {
                        mobile: this.state.mobile,
                    },
                }}
            >
                {this.props.children}
            </BaseThemeProvider>
        );
    }
}
