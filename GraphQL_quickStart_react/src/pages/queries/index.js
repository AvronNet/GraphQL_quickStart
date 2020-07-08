import React from "react";
import { Query } from 'react-apollo';
import { Accordion, AccordionItem } from 'react-light-accordion';

import Navbar from "./../../components/Navbar";
import ContentSection from "./../../components/ContentSection";
import { getTodos, countTodos, todosWithNotes, filteredOrderedTodos } from "./todosQuery";
import "./styles.scss";

const getTodosQueryTxt = `query getTodos {
    todos {
        id
        title
        done
        created_date
        completed_date
    }
}`;

const todosWithNotesQueryTxt = `query todosWithNotes {
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
}`;

const countTodosQueryTxt = `query countTodos {
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
}`;

const filteredOrderedTodosQueryTxt = `query filteredOrderedTodos {
    todos_aggregate(where: {title: {_ilike: "%graph%"}}, order_by: {title: asc}) {
        nodes {
            title
        }
        aggregate {
            count
        }
    }
}`;

function QueriesPage(props) {
  return (
    <React.Fragment>
        <Navbar
            color="white"
            spaced={true}
        />
        <ContentSection
            color="white"
            size="medium"
            title="Get some data"
            subtitle="Todo tables"
        />
        <div className="container">
            <Accordion atomic={true}>
                <AccordionItem title="Todos Query">
                    <pre>
                        {getTodosQueryTxt}
                    </pre>
                </AccordionItem>
                <AccordionItem title="Todos Query result">
                    <Query
                        query={getTodos}
                        fetchPolicy="network-only">
                        {({ loading, error, data }) => {
                            if (loading) {
                                return null;
                            }

                            if (error) {
                                return `Error!: ${JSON.stringify(error)}`;
                            }

                            return (
                            <pre>
                                {JSON.stringify(data, null, 4)}
                                </pre>
                                ); 
                            }}
                    </Query>
                </AccordionItem>
                <AccordionItem title="Todos with Notes Query">
                    <pre>
                        {todosWithNotesQueryTxt}
                    </pre>
                </AccordionItem>
                <AccordionItem title="Todos with Notes Query result">
                    <Query
                        query={todosWithNotes}
                        fetchPolicy="network-only"
                    >
                        {({ loading, error, data }) => {
                            if (loading) {
                                return null;
                            }

                            if (error) {
                                return `Error!: ${JSON.stringify(error)}`;
                            }

                            return (
                                <pre>
                                    {JSON.stringify(data, null, 4)}
                                </pre>
                                ); 
                            }}
                    </Query>
                </AccordionItem>
                <AccordionItem title="Todos Count Query">
                    <pre>
                        {countTodosQueryTxt}
                    </pre>
                </AccordionItem>
                <AccordionItem title="Todos Count Query result">
                    <Query query={countTodos}
                    fetchPolicy="network-only">
                        {({ loading, error, data }) => {
                            if (loading) {
                                return null;
                            }

                            if (error) {
                                return `Error!: ${JSON.stringify(error)}`;
                            }

                            return (
                                <pre>
                                    {JSON.stringify(data, null, 4)}
                                </pre>
                                ); 
                            }}
                    </Query>
                </AccordionItem>
                <AccordionItem title="Filtered & Ordered Todos Query">
                    <pre>
                        {filteredOrderedTodosQueryTxt}
                    </pre>
                </AccordionItem>
                <AccordionItem title="Filtered & Ordered Todos Query result">
                    <Query query={filteredOrderedTodos} fetchPolicy="network-only">
                        {({ loading, error, data }) => {
                            if (loading) {
                                return null;
                            }

                            if (error) {
                                return `Error!: ${JSON.stringify(error)}`;
                            }

                            return (
                                <pre>
                                    {JSON.stringify(data, null, 4)}
                                </pre>
                                ); 
                            }}
                    </Query>
                </AccordionItem>
            </Accordion>
        </div>
    </React.Fragment>
  );
}

export default QueriesPage;
