import * as React from 'react';
import { Socket } from './Socket';

function handleSubmit(event) {
    let username = document.getElementById("username");
    let input = document.getElementById("input");
    
    Socket.emit('new username', {
        'address': username.value+': ',
    });
    username.value
    
    Socket.emit('new input', {
        'address': input.value,
    });
    input.value
    
    console.log('Sent the username and input data ' +username.value+' '+'and message: '+ input.value + ' to the server!');
    input.value = ''
    username.value=''
    
    event.preventDefault();
}

export function Button() {
    return (
        <form onSubmit={handleSubmit}>
            <input id="input" placeholder="Type a message"></input>
            <button>Send</button>
            <p>Username: </p>
            <input id="username" placeholder="Username"></input>
        </form>
    );
}