import gql from 'graphql-tag';

export const getTodos = gql`
    subscription getTodos {
        todos(order_by: {id: asc}) {
            id
            title
            done
            created_date
            completed_date
        }
    }
`;


export const todosWithNotes = gql`
    subscription todosWithNotes {
        todos(order_by: {id: asc}) {
            id
            title
            done
            created_date
            completed_date
            notes {
                id
                note
                created_date
                updated_date
            }
        }
    }
`;


export function todosWithNotesOpen(onlyOpen) {
    return gql(`
    subscription todosWithNotes {
        todos(${onlyOpen ? 'where: {done: {_eq: false}},' : ''} 
            order_by: {id: asc}) {
            id
            title
            done
            created_date
            completed_date
            notes {
                id
                note
                created_date
                updated_date
            }
        }
    }
`);
};