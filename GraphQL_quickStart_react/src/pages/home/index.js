import React from "react";
import Navbar from "./../../components/Navbar";
import ContentSection from "./../../components/ContentSection";
import Footer from "./../../components/Footer";
import TodoList from "./TodoList";
import { Checkbox } from 'semantic-ui-react'
import MutateButton from '../mutations/MutateButton';
import { insertTodo } from '../mutations/mutations';
import ButterToast, { POS_TOP, POS_CENTER, Cinnamon } from 'butter-toast';

import "./styles.scss";

export default class HomePage extends React.Component {
    state = {
        activeIndex: 0,
        showOnlyOpenTodos: true,
        newTodoTitle: '',
    }    

    componentDidMount() {
        const styleLink = document.createElement("link");
        styleLink.rel = "stylesheet";
        styleLink.href = "https://cdn.jsdelivr.net/npm/semantic-ui/dist/semantic.min.css";
        document.head.appendChild(styleLink);
    }

    render() {
        const { activeIndex } = this.state;

        return (
            <div className="home">
                <Navbar
                    color="white"
                    spaced={true}
                />
                <ContentSection
                    color="white"
                    size="medium"
                    title="Todos"
                    subtitle="Umm... lots to do, have I"
                />
                <div className="content">
                    <div className="actions-section">
                        <input
                            className="input"
                            type="text"
                            placeholder="What needs to be done?"
                            value={this.state.newTodoTitle}
                            onChange={(e) => this.setState({ newTodoTitle: e.target.value })}
                        />
                        <MutateButton
                            className="button is-primary"
                            mutation={insertTodo}
                            variables={{title: this.state.newTodoTitle}}
                            buttonText="Add todo"
                            suppressOutput={true}
                            onMutationCompleted={this.onAddTodoCompleted}
                        />
                    </div>
                    <Checkbox 
                            className="chkPadded"
                            onClick={() => {this.setState({showOnlyOpenTodos: !this.state.showOnlyOpenTodos})}}
                            checked={this.state.showOnlyOpenTodos}
                            label='Show only open todos'
                        />
                    <TodoList handleClick={this.handleClick} activeIndex={activeIndex} showOnlyOpenTodos={this.state.showOnlyOpenTodos} />
                </div>
                (<ButterToast key="butterToast" position={{vertical: POS_TOP,  horizontal: POS_CENTER}} style={{ top: '50px' }}/>),
            </div>
        );
    }

    handleClick = (e, titleProps) => {
        const { index } = titleProps
        const { activeIndex } = this.state
        const newIndex = activeIndex === index ? -1 : index
    
        this.setState({ activeIndex: newIndex })
    }

    onAddTodoCompleted = (data) => {
        if (data.insert_todos.affected_rows > 0) {
            ButterToast.raise({
                content: <Cinnamon.Crisp title="Todo added"
                    scheme={Cinnamon.Crunch.SCHEME_GREEN}/>
            });
        }
    }
}
