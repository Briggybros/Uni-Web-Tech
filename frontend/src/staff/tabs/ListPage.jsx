// @flow
import * as React from 'react';
import { Switch, Route } from 'react-router';
import styled from 'styled-components';

import NewItem from './NewItem';
import VerticalList from '../components/VerticalList';

const Page = styled.div`
    display: flex;
    flex-direction: row;
    flex-grow: 2;
`;

type Props = {
    items: Object[],
    itemRenderer: Function,
    view: Function,
    path: string,
    onNew: () => void,
}

export default (props: Props) => (
    <Page>
        <VerticalList>
            <NewItem
                onClick={props.onNew}
            />
            {props.items.map(item => React.createElement(props.itemRenderer, {
                key: item.id,
                item,
            }))}
        </VerticalList>
        <Switch>
            <Route path={`${props.path}/:id`} component={props.view} />
        </Switch>
    </Page>
);
