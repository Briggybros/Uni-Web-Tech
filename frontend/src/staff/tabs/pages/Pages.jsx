// @flow
import * as React from 'react';
import { connect } from 'react-redux';

import type { PageType } from '../../../types';
import { updatePages } from '../../../reducers/pageReducer';

import ListPage from '../ListPage';

import Page from './Page';
import PageItem from './PageItem';

type Props = {
    pages: PageType[],
    updatePages: Function,
    history: {
        push: Function,
    }
}

class Pages extends React.Component<Props> {
    componentDidMount() {
        fetch('/api/page/?drafts=true')
            .then((response) => {
                if (response.ok) {
                    return response.json();
                }
                throw new Error('Library Error');
            })
            .then((body) => {
                if (body.response.isError) {
                    alert(`${body.response.code}: ${body.response.message}`);
                } else {
                    this.props.updatePages(body.pages);
                }
            });
    }

    newPage = () => {
        fetch('/api/page/save/new', {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
            },
            credentials: 'same-origin',
        }).then((response) => {
            if (response.ok) {
                return response.json();
            }
            throw new Error('Library Error');
        }).then((body) => {
            if (body.response.isError) {
                alert(`${body.response.code}: ${body.response.message}`);
                return null;
            }
            this.props.updatePages([body.page]);
            this.props.history.push(`/staff/pages/${body.page.id}`);
            return body.page;
        }).catch(console.error);
    }

    render() {
        return (
            <ListPage
                onNew={this.newPage}
                path="/staff/pages"
                items={this.props.pages}
                itemRenderer={PageItem}
                view={Page}
            />
        );
    }
}

export default connect(state => ({
    pages: Object.values(state.pages),
}), {
    updatePages,
})(Pages);
