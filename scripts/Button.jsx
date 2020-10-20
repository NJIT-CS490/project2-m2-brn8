import * as React from 'react';
import { Socket } from './Socket';

function handleSubmit(event) {
    let input = document.getElementById("input");
    
    Socket.emit('new input', {
        'address': input.value,
    });
    input.value
    
    console.log('Sent the input data '+ input.value + ' to the server!');
    input.value = ''
    
    event.preventDefault();
}

export function Button() {
    return (
        <form onSubmit={handleSubmit}>
            <input id="input" placeholder="Type a message"></input>
            <button>Send</button>
        </form>
    );
}