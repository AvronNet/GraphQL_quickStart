import gql from 'graphql-tag';

export const insertTodo = gql`
    mutation insertTodo($title: String!) {
    insert_todos(objects: {title: $title}) {
        affected_rows
        returning {
            id
            done
            created_date
        }
    }
}`;


export const insertMultipleTodos = gql`
    mutation insertMultipleTodos {
    insert_todos(objects: [
        {title: "test1", created_date: "2019-1-1"},
        {title: "test2", created_date: "2019-1-2"},
        {title: "test3", created_date: "2019-1-3"}
    ]) {
        affected_rows
        returning {
            id
            done
            created_date
        }
    }
}`;

export const deleteNewTodos = gql`
    mutation deleteTodos($fromId: bigint = 7){
    delete_notes(where: {todo_id: {_gt: $fromId}}){
        affected_rows
    }
    delete_todos(where: {id: {_gt: $fromId}}){
        affected_rows
        returning {
            id
            title
        }
    }
}`;

export const completeTodo = gql`
    mutation completeTodo($id: bigint!) {
        update_todos (
            where: {id: {_eq: $id}}, 
            _set: {done: true}) {
        affected_rows
    }
}`;

export const addNote = gql`
    mutation insertNote($todoId: bigint!, $note: String!) {
        insert_notes(objects: {note: $note, todo_id: $todoId}) {
        affected_rows
        returning {
            id
            updated_date
            created_date
            todo_id
        }
    }
}`;

export const deleteTodoNotes = gql`
    mutation deleteTodoNotes($todoId: bigint!){
    delete_notes(where: {todo_id: {_eq: $todoId}}){
        affected_rows
    }
}`;

export const changeTodoStatus = gql`
    mutation changeTodoStatus($id: bigint!, $done: Boolean!, $completeDate: timestamptz) {
        update_todos (
            where: {id: {_eq: $id}}, 
            _set: {
              done: $done
              completed_date: $completeDate
            }) {
        affected_rows
        returning {
            title
            done
            completed_date
        }
    }
}`;

export const deleteNote = gql`
    mutation deleteNote($id: bigint!){
    delete_notes(where: {id: {_eq: $id}}){
        affected_rows
    }
}`;