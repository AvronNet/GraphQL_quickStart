import React from 'react'
import { Accordion } from 'semantic-ui-react'
import { useSubscription } from '@apollo/react-hooks';
import _ from 'lodash';

import TodoItem from './TodoItem';
import { todosWithNotesOpen } from "../subscriptions/subscriptions";

export default function TodoList(props) {
    const { data, error, loading } = useSubscription(todosWithNotesOpen(props.showOnlyOpenTodos));

    if (error) {
        return (
            <pre>
                GraphQL Error:
                {JSON.stringify(error, null, 4)}
            </pre>
        )
    }

    if(loading)
        return "Loading...";

    if(!data)
        return null;

    return (<Accordion key="accordion" styled style={{ width: '100%' }}>
            {_.map(data.todos, (todo) => <TodoItem key={todo.id} {...todo} {...props} />)}
        </Accordion>);
}
