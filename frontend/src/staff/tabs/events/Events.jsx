// @flow
import * as React from 'react';
import { connect } from 'react-redux';

import type { EventType } from '../../../types';
import { updateEvents } from '../../../reducers/eventReducer';

import ListPage from '../ListPage';

import Event from './Event';
import EventItem from './EventItem';

type Props = {
    events: EventType[],
    updateEvents: Function,
    history: {
        push: Function,
    }
}

class Events extends React.Component<Props> {
    componentDidMount() {
        fetch('/api/events/?drafts=true')
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
                    this.props.updateEvents(body.events);
                }
            });
    }

    newEvent = () => {
        fetch('/api/events/save/new', {
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
            this.props.updateEvents([body.event]);
            this.props.history.push(`/staff/news/${body.article.id}`);
            return body.article;
        }).catch(console.error);
    }

    render() {
        return (
            <ListPage
                onNew={this.newEvent}
                path="/staff/events"
                items={this.props.events}
                itemRenderer={EventItem}
                view={Event}
            />
        );
    }
}

export default connect(state => ({
    events: Object.values(state.events),
}), {
    updateEvents,
})(Events);
