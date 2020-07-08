import gql from 'graphql-tag';

export const getTodos = gql`
    query getTodos {
        todos {
            id
            title
            done
            created_date
            completed_date
        }
    }
`;

export const todosWithNotes = gql`
    query todosWithNotes {
        todos {
            id
            title
            done
            created_date
            completed_date
            notes {
                note
                created_date
                updated_date
            }
        }
    }
`;

export const countTodos = gql`
    query countTodos {
        todos_aggregate {
            nodes {
                id
                title
                done
            }
            aggregate{
                count
            }
        }
    }
`;

export const filteredOrderedTodos = gql`
    query filteredOrderedTodos {
        todos_aggregate(where: {title: {_ilike: "%graph%"}}, order_by: {title: asc}) {
            nodes {
                title
            }
            aggregate {
                count
            }
        }
    }
`;