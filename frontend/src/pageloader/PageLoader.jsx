// @flow
import * as React from 'react';

import NewsPage from './NewsPage';
import EventPage from './EventPage';
import Page from './Page';

type State = {
    page: Object | null,
    complete: boolean,
    found: boolean,
}

export default class PageLoader extends React.Component<{}, State> {
    state = {
        page: null,
        complete: false,
        found: false,
    }

    componentWillMount() {
        fetch('/api/page').then((response) => {
            if (response.status === 200) {
                return response.json();
            }
            throw new Error('404');
        }).then((data) => {
            this.setState({
                page: data,
                found: true,
                complete: true,
            });
        }).catch((err: Error) => {
            if (err.message === '404') {
                this.setState({
                    found: false,
                    complete: true,
                });
            } else {
                console.error(err);
            }
        });
    }

    render() {
        if (!this.state.complete) {
            return (
                <span>Loading...</span>
            );
        }
        if (!this.state.found) {
            return (
                <span>Whoops! We could not find the page you were looking for</span>
            );
        }
        if (this.state.page) {
            switch (this.state.page.type) {
            case 'NEWS':
                return <NewsPage page={this.state.page} />;
            case 'EVENT':
                return <EventPage page={this.state.page} />;
            default:
                return <Page page={this.state.page} />;
            }
        }
        return (
            <span>Err.. We have a problem, it is out fault</span>
        );
    }
}
