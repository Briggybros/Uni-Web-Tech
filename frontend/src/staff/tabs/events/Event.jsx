// @flow
import * as React from 'react';
import { connect } from 'react-redux';
import { Value } from 'slate';
import UnstyledDateTimePicker from 'react-datetime-picker';
import styled from 'styled-components';

import type { EventType } from '../../../types';

import { updateEvents } from '../../../reducers/eventReducer';

import Editor from '../../editor/Editor';
import { JSXFromJSONString, serializeToJSONString } from '../../../dynamic/serializer';

const Window = styled.div`
    flex-grow: 2;
    display: flex;
    flex-direction: column;
`;

const ButtonWrapper = styled.span`
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin: 0.5rem 1rem;
`;

const Button = styled.button`
    background: none;
    border: none;
    border-left: 1px solid lightgrey;
    cursor: pointer;
    &:hover {
        color: ${props => props.theme.colours.primary};
    }

    &:first-child {
        border-left: none;
    }
`;

const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
`;

const TitleInput = styled.input`
    border: none;
    border-top: 1px solid lightgrey;
    font-family: ${props => props.theme.fonts.title}, serif;
    font-size: 2.5rem;
`;

const DateTimePicker = styled(UnstyledDateTimePicker)`
    background: white;

    > div:first-child {
        border: none;
    }

    > div:nth-child(2) {
        z-index: 2;
    }
`;

type Props = {
    event?: EventType,
    updateEvents: Function,
}

type State = {
    preview: boolean,
    title: string,
    timestamp: Date,
    value?: Value,
}

class Event extends React.Component<Props, State> {
    static defaultProps = {
        event: undefined,
    }

    constructor(props) {
        super(props);
        this.state = {
            preview: false,
            title: props.event && props.event.title ? props.event.title : '',
            timestamp: props.event && props.event.timestamp ?
                new Date(parseInt(props.event.timestamp, 10)) :
                new Date(Date.now()),
        };

        if (props.event) {
            this.state = {
                ...this.state,
                value: Value.fromJSON(JSON.parse(props.event.content)),
            };
        }
    }

    componentDidUpdate(prevProps) {
        if (
            prevProps.event &&
            this.props.event &&
            prevProps.event.id !== this.props.event.id
        ) {
            const { event } = this.props;
            /*
             * Note here, that airbnb has rules against setting state in update
             * If there's a better way to do this, please inform
             */
            /* eslint-disable-next-line react/no-did-update-set-state */
            this.setState({
                title: event.title,
                timestamp: new Date(parseInt(event.timestamp, 10)),
                value: Value.fromJSON(JSON.parse(event.content)),
            });
        }
    }

    onChange = (value: Value) => {
        this.setState({
            value,
        });
    }

    onTitleChange = (title: string) => {
        this.setState({
            title,
        });
    }

    onDatetimeChange = (timestamp: Date) => {
        this.setState({
            timestamp,
        });
    }

    onSave = () => fetch(`/api/event/save/${this.props.event ? this.props.event.id : 'new'}`, {
        method: 'POST',
        headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
        },
        credentials: 'same-origin',
        body: JSON.stringify({
            title: this.state.title,
            content: serializeToJSONString(this.state.value),
            timestamp: this.state.timestamp.getTime().toString(),
        }),
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
        return body.event;
    }).catch(console.error);

    onPreview = () => {
        this.setState(prevState => ({
            preview: !prevState.preview,
        }));
    };

    onPublish = () => {
        this.onSave().then((event) => {
            if (event) {
                fetch(`/api/event/publish/${event.id}`, {
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
                    return body.event;
                }).catch(console.error);
            }
        });
    }

    render() {
        return (
            <Window>
                <ButtonWrapper>
                    <Button
                        onClick={this.onSave}
                    >
                        Save
                    </Button>
                    <Button
                        onClick={this.onPreview}
                    >
                        {this.state.preview ? 'Edit' : 'Preview'}
                    </Button>
                    {(
                        (this.props.event && !this.props.event.published) ||
                        (!this.props.event)
                    ) &&
                        <Button
                            onClick={this.onPublish}
                        >
                            Publish
                        </Button>
                    }
                </ButtonWrapper>
                {this.state.preview ?
                    this.state.value &&
                    <Wrapper>
                        <h1>{this.state.title}</h1>
                        {JSXFromJSONString(serializeToJSONString(this.state.value))}
                    </Wrapper>
                    :
                    <Wrapper>
                        <TitleInput
                            value={this.state.title}
                            placeholder="Event title"
                            onChange={event => this.onTitleChange(event.target.value)}
                        />
                        <DateTimePicker
                            value={this.state.timestamp}
                            onChange={this.onDatetimeChange}
                        />
                        <Editor
                            value={this.state.value}
                            onChange={this.onChange}
                        />
                    </Wrapper>
                }
            </Window>
        );
    }
}

function mapStateToProps(state, ownProps: Object) {
    return {
        event: ownProps.isNew ? null : state.events[ownProps.match.params.id],
    };
}

export default connect(mapStateToProps, {
    updateEvents,
})(Event);
