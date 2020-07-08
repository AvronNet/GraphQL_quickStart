import React from "react";
import { Subscription } from 'react-apollo';
import { Accordion, AccordionItem } from 'react-light-accordion';

import Navbar from "./../../components/Navbar";
import ContentSection from "./../../components/ContentSection";
import { getTodos, todosWithNotes } from "./subscriptions";
import "./styles.scss";

const getTodosSubText = `
    subscription getTodos {
        todos(order_by: {id: asc}) {
            id
            title
            done
            created_date
            completed_date
        }
    }`;

const todosWithNotesSubTxt = `subscription todosWithNotes {
        todos(order_by: {id: asc}) {
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

function SubscriptionsPage(props) {
  return (
    <>
        <Navbar
            color="white"
            spaced={true}
        />
        <ContentSection
        color="white"
        size="medium"
        title="Subscriptions"
        subtitle="Subscribe to real time data changes"
        />
        <div className="container">
            <Accordion atomic={true}>
                <AccordionItem title="Todos Query">
                    <pre>
                        {getTodosSubText}
                    </pre>
                </AccordionItem>
                <AccordionItem title="Todos Query result">
                    <Subscription subscription={getTodos}>
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
                    </Subscription>
                </AccordionItem>
                <AccordionItem title="Todos with Notes Query">
                    <pre>
                        {todosWithNotesSubTxt}
                    </pre>
                </AccordionItem>
                <AccordionItem title="Todos with Notes Query result">
                    <Subscription subscription={todosWithNotes}>
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
                    </Subscription>
                </AccordionItem>
            </Accordion>
        </div>
    </>
    
  );
}

export default SubscriptionsPage;
