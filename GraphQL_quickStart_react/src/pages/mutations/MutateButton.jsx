import React from 'react'
import { useMutation } from '@apollo/react-hooks';

export default function MutateButton(props) {
    const [mutationFunc, { data, error }] = useMutation(props.mutation, { variables: props.variables, onCompleted: props.onMutationCompleted });
    return (
        <React.Fragment>
            <button
                onClick={mutationFunc}
                className={props.className}
                disabled={props.disabled}
            >
                {props.buttonText}
            </button>
            <br />
            
            {!props.suppressOutput && data &&
                <pre>
                    {JSON.stringify(data, null, 4)}
                </pre>}
            {!props.suppressOutput && error &&
                <pre>
                    GraphQL Error:
                    {JSON.stringify(error, null, 4)}
                </pre>}
        </React.Fragment>
    )
}
