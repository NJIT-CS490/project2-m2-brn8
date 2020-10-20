import * as React from 'react';
import { GoogleButton } from './GoogleButton';
import { Socket } from './Socket';

export function Content_auth() {
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
            <h1>Sign in to enjoy real-time Chat Application</h1>
            <GoogleButton />
        </div>
    );
}