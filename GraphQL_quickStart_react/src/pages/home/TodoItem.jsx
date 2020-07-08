import React, {useState} from 'react'
import { Accordion, Icon, Checkbox, TextArea, Form } from 'semantic-ui-react'
import _ from 'lodash';
import { useMutation } from '@apollo/react-hooks';
import ButterToast, {  Cinnamon  } from 'butter-toast';
import { changeTodoStatus, deleteNote, addNote } from "../mutations/mutations";

export default function TodoItem(todo) {
    const [completeTodoFunc, { data: completedData, error: completeError, called: completeCalled }] = useMutation(changeTodoStatus);
    const [deleteNoteFunc, { data: noteDeletedData, error: deleteNoteError }] = useMutation(deleteNote);
    const [addNoteFunc, { data: addNoteData, error: addNoteError }] = useMutation(addNote);

    const [newNoteText, setNewNoteText] = useState('');

    if (completeError) {
        ButterToast.raise({
            content: <Cinnamon.Crisp title={"GraphQL Error"}
                content={
                    <pre>
                        {JSON.stringify(completeError, null, 4)}
                    </pre>
                }
                scheme={Cinnamon.Crunch.SCHEME_RED}/>
        });
    }
    
    if(completedData != null && completedData.update_todos.affected_rows > 0 && completeCalled) {
        const changedTodo = _.head(completedData.update_todos.returning);
        if(todo.done !== changedTodo.done) {
            ButterToast.raise({
                content: <Cinnamon.Crisp title={changedTodo.title}
                    content={changedTodo.done ? "Completed" : "Opened"}
                    scheme={Cinnamon.Crunch.SCHEME_GREEN}/>
            });
        }
    }

    return (
        <div className="todoItem">
            <Accordion.Title
                active={todo.activeIndex === todo.id}
                index={todo.id}
                onClick={todo.handleClick}
            >
                <Icon name='dropdown' />
                <Checkbox 
                    className="todoChk"
                    onClick={(e) => {
                        e.stopPropagation();
                        const done = !todo.done;
                        let dateTime = null;
                        if (done) {
                            var today = new Date();
                            var date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
                            var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
                            dateTime = date+' '+time;
                        }
                        completeTodoFunc({ variables: {id: todo.id, done: done, completeDate: dateTime} });
                    }} 
                    checked={todo.done}
                />
                {todo.title}
            </Accordion.Title>
            <Accordion.Content active={todo.activeIndex === todo.id}>
                {_.some(todo.notes) ? _.map(todo.notes, (note) => (
                    <div key={note.id} className="note">
                        {note.note}
                        <Icon name="trash" onClick={() => deleteNoteFunc({ variables: {id: note.id}})} />
                    </div>
                ))
                : <div key={todo.id}>
                    <Form>
                        <TextArea rows={2} placeholder='Add note' value={newNoteText} onChange={(e, {value}) => setNewNoteText(value)} />
                    </Form>
                    <button
                        onClick={() => {addNoteFunc({ variables: {todoId: todo.id, note: newNoteText}}); setNewNoteText('');}}
                        className="button is-primary"
                        disabled={!newNoteText.length}
                        style={{marginTop: '5px'}}
                    >
                        <span>Add note</span>
                        <Icon name="save" />
                    </button>
                    
                </div>}
            </Accordion.Content>
        </div>
    )
}
