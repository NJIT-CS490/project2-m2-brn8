    
import * as React from 'react';
import { Button } from './Button';
import { Socket } from './Socket';

export function Content() {
    const [addresses, setAddresses] = React.useState([]);
    const [count, setCount] = React.useState([]);
    
    function getNewAddresses() {
        React.useEffect(() => {
            Socket.on('addresses received', updateAddresses);
            
        });
    }
    
    function updateAddresses(data) {
        console.log("Received addresses from server: " + data['allAddresses']);
        setAddresses(data['allAddresses']);
    }
    
    getNewAddresses();
    
    function getCount_connect() {
        React.useEffect(() => {
            Socket.on('connected', (data) => {
                 console.log("Received user connected count from server: " + data['test']);
                 setCount(data['test']);
            })
        });
    }
    getCount_connect();
    
    function getCount_disconnect() {
        React.useEffect(() => {
            Socket.on('disconnected', (data) => {
                 console.log("Received user disconnected count from server: " + data['test']);
                 setCount(data['test']);
            })
        });
    }
    getCount_disconnect();

    return (
        <div>
             <h1>My First Chat APP</h1>
                <ol>
                    {
                    addresses.map((address, index)=>
                        <div key={index}>{address} </div>)
                    }
                </ol>
                <h2>Total Users Connected: {count}</h2>
                <p1>Type <b>!! about</b> in the chat for description </p1>
            <Button />
        </div>
    );
}