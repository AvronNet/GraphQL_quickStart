import React from "react";
import { Mutation } from 'react-apollo';
import { Accordion, Icon } from 'semantic-ui-react'

import Navbar from "./../../components/Navbar";
import ContentSection from "./../../components/ContentSection";
import MutateButton from "./MutateButton";
import { insertMultipleTodos, insertTodo, deleteNewTodos, completeTodo, addNote, deleteTodoNotes } from "./../mutations/mutations.js";
import "./styles.scss";

const insertTodoMutationText = `mutation insertTodo($title) {
    insert_todos(objects: {title: $title) {
        affected_rows
        returning {
            id
            done
            created_date
        }
    }
}`;

const insertMultipleTodosMutationText = `mutation insertMultipleTodos {
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

const deleteNewTodosMutationText = `mutation deleteTodos($fromId: bigint = 7){
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

const completeTodoMutationText = `mutation completeTodo($id: bigint) {
    update_todos (
        where: {id: {_eq: $id}},
        _set: {done: true}) {
    affected_rows
    }
}`;

const addNoteMutationText = `mutation insertNote($todoId: bigint!, $note: String!) {
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

const deleteNoteMutationText = `mutation deleteTodos($todoId: bigint!){
    delete_notes(where: {todo_id: {_eq: $todoId}}){
        affected_rows
    }
}`;



class MutationsPage extends React.Component {
    state = { activeIndex: 0 }

    constructor(props) {
        super(props);
        this.state = {
            newTodoTitle: '',
        };
    }

    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index

        this.setState({ activeIndex: newIndex })
    }

    componentDidMount() {
        const styleLink = document.createElement("link");
        styleLink.rel = "stylesheet";
        styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
        document.head.appendChild(styleLink);
    }

    render() {
        const { activeIndex } = this.state

        return (
            <>
                <Navbar
                    color="white"
                    spaced={true}
                />
                <ContentSection
                    color="white"
                    size="medium"
                    title="Mutations"
                    subtitle="We're not creating X-men but awesome X-apps"
                />
                <div className="container">
                    <Accordion styled style={{width: '100%'}}>
                        <Accordion.Title
                            active={activeIndex === 0}
                            index={0}
                            onClick={this.handleClick}
                        >
                            <Icon name='dropdown' />
                            Insert Todo Mutation
                        </Accordion.Title>
                        <Accordion.Content active={activeIndex === 0}>
                            <pre>
                                {insertTodoMutationText}
                            </pre>
                        </Accordion.Content>
                        <Accordion.Title
                            active={activeIndex === 1}
                            index={1}
                            onClick={this.handleClick}
                        >
                            <Icon name='dropdown' />
                            Insert Todo example
                        </Accordion.Title>
                        <Accordion.Content active={activeIndex === 1}>
                            <Mutation
                                mutation={insertTodo}
                                variables={{title: this.state.newTodoTitle}}
                            >
                                {(insertTodo, { loading, error, data }) => {
                                    if (loading) {
                                        return null;
                                    }

                                    if (error) {
                                        return `Error!: ${JSON.stringify(error)}`;
                                    }

                                    return (
                                        <div>
                                            <input
                                                className="input"
                                                type="text"
                                                placeholder="What needs to be done?"
                                                value={this.state.newTodoTitle}
                                                onChange={(e) => this.setState({ newTodoTitle: e.target.value })}
                                            />
                                            <button
                                                onClick={insertTodo}
                                                disabled={this.state.newTodoTitle.length === 0}
                                                className="button is-primary"
                                            >
                                                Add Todo
                                            </button>
                                            <br/>
                                            {data && data.insert_todos.returning &&
                                                `Inserted data: ID: ${data.insert_todos.returning[0].id}, Created date: ${data.insert_todos.returning[0].created_date.toString()}, Done: ${data.insert_todos.returning[0].done}`
                                            }
                                        </div>
                                    );
                                }}
                            </Mutation>
                        </Accordion.Content>
                        {/*---------------------------------------------------------------------------------*/}
                        <Accordion.Title
                            active={activeIndex === 2}
                            index={2}
                            onClick={this.handleClick}
                        >
                            <Icon name='dropdown' />
                            Insert multiple todos mutation
                        </Accordion.Title>
                        <Accordion.Content active={activeIndex === 2}>
                            <pre>
                                {insertMultipleTodosMutationText}
                            </pre>
                        </Accordion.Content>

                        <Accordion.Title
                            active={activeIndex === 3}
                            index={3}
                            onClick={this.handleClick}
                        >
                            <Icon name='dropdown' />
                            Insert multiple todos
                        </Accordion.Title>
                        <Accordion.Content active={activeIndex === 3}>
                            <MutateButton
                                className="button is-primary"
                                mutation={insertMultipleTodos}
                                buttonText="Insert 3 todos"
                            />
                        </Accordion.Content>
                        {/*---------------------------------------------------------------------------------*/}
                        <Accordion.Title
                            active={activeIndex === 4}
                            index={4}
                            onClick={this.handleClick}
                        >
                            <Icon name='dropdown' />
                            Delete todos with ID > N mutation
                        </Accordion.Title>
                        <Accordion.Content active={activeIndex === 4}>
                            <pre>
                                {deleteNewTodosMutationText}
                            </pre>
                        </Accordion.Content>

                        <Accordion.Title
                            active={activeIndex === 5}
                            index={5}
                            onClick={this.handleClick}
                        >
                            <Icon name='dropdown' />
                            Delete todos with ID > N
                        </Accordion.Title>
                        <Accordion.Content active={activeIndex === 5}>
                            <input
                                className="input"
                                placeholder='Delete all from ID (default 7)'
                                onChange={(e) => this.setState({ todoIdDeleteFrom: e.target.value })}
                                value={this.state.todoIdDeleteFrom}
                                type="number"
                            />
                            <MutateButton
                                className="button is-primary"
                                mutation={deleteNewTodos}
                                variables={{fromId: this.state.todoIdDeleteFrom}}
                                buttonText="Delete todos"
                            />
                        </Accordion.Content>
                        {/*---------------------------------------------------------------------------------*/}
                        <Accordion.Title
                            active={activeIndex === 6}
                            index={6}
                            onClick={this.handleClick}
                        >
                            <Icon name='dropdown' />
                            Complete todo mutation
                        </Accordion.Title>
                        <Accordion.Content active={activeIndex === 6}>
                            <pre>
                                {completeTodoMutationText}
                            </pre>
                        </Accordion.Content>

                        <Accordion.Title
                            active={activeIndex === 7}
                            index={7}
                            onClick={this.handleClick}
                        >
                            <Icon name='dropdown' />
                            Complete todo
                        </Accordion.Title>
                        <Accordion.Content active={activeIndex === 7}>
                            <input
                                className="input"
                                placeholder='Complete todo with ID'
                                onChange={(e) => this.setState({ completeTodoId: e.target.value })}
                                value={this.state.completeTodoId}
                                type="number"
                            />
                            <MutateButton
                                className="button is-primary"
                                buttonText="Complete todo"
                                disabled={this.state.completeTodoId}
                                mutation={completeTodo}
                                variables={{id: this.state.completeTodoId}} />
                        </Accordion.Content>
                        {/*---------------------------------------------------------------------------------*/}
                        <Accordion.Title
                            active={activeIndex === 8}
                            index={8}
                            onClick={this.handleClick}
                        >
                            <Icon name='dropdown' />
                            Add note mutation
                        </Accordion.Title>
                        <Accordion.Content active={activeIndex === 8}>
                            <pre>
                                {addNoteMutationText}
                            </pre>
                        </Accordion.Content>
                        <Accordion.Title
                            active={activeIndex === 9}
                            index={9}
                            onClick={this.handleClick}
                        >
                            <Icon name='dropdown' />
                            Add note
                        </Accordion.Title>
                        <Accordion.Content active={activeIndex === 9}>
                            <input
                                className="input"
                                placeholder='Enter todo ID'
                                onChange={(e) => this.setState({ addNoteTodoId: e.target.value })}
                                value={this.state.addNoteTodoId}
                                type="number"
                            />
                            <input
                                className="input"
                                placeholder='Enter note text...'
                                onChange={(e) => this.setState({ addNoteText: e.target.value })}
                                value={this.state.addNoteText}
                                type="text"
                            />
                            <MutateButton
                                className="button is-primary"
                                buttonText="Add note"
                                disabled={!(this.state.addNoteText && this.state.addNoteTodoId)}
                                mutation={addNote}
                                variables={{todoId: this.state.addNoteTodoId, note: this.state.addNoteText}} />
                        </Accordion.Content>
                        {/*---------------------------------------------------------------------------------*/}
                        <Accordion.Title
                            active={activeIndex === 9}
                            index={9}
                            onClick={this.handleClick}
                        >
                            <Icon name='dropdown' />
                            Delete note mutation
                        </Accordion.Title>
                        <Accordion.Content active={activeIndex === 9}>
                            <pre>
                                {deleteNoteMutationText}
                            </pre>
                        </Accordion.Content>
                        <Accordion.Title
                            active={activeIndex === 10}
                            index={10}
                            onClick={this.handleClick}
                        >
                            <Icon name='dropdown' />
                            Delete note
                        </Accordion.Title>
                        <Accordion.Content active={activeIndex === 10}>
                            <input
                                className="input"
                                placeholder='Enter todo ID'
                                onChange={(e) => this.setState({ deleteNoteTodoId: e.target.value })}
                                value={this.state.deleteNoteTodoId}
                                type="text"
                            />
                            <MutateButton
                                className="button is-primary"
                                buttonText="Delete note"
                                disabled={!(this.state.deleteNoteTodoId)}
                                mutation={deleteTodoNotes}
                                variables={{ todoId: this.state.addNoteTodoId }} />
                        </Accordion.Content>
                        {/*---------------------------------------------------------------------------------*/}
                    </Accordion>
                </div>
            </>
        );
    }
}

export default MutationsPage;
