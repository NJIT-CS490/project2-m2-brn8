    
import * as React from 'react';
import { Button } from './Button';
import { Socket } from './Socket';

export function Content() {
    const [addresses, setAddresses] = React.useState([]);
    const [count, setCount] = React.useState([]);
    const [link, setLink] = React.useState([]);
    const [image, setImage] = React.useState([]);
    
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
    
    function clickable() {
        React.useEffect(() => {
            Socket.on('new input', (data) => {
                 console.log("Received user disconnected count from server: " + data['test']);
                 setLink(data['test']);
            })
        });
    }
    clickable();
    
    function clickable_Image() {
        React.useEffect(() => {
            Socket.on('new image', (data) => {
                 console.log("Received user disconnected count from server: " + data['tests']);
                 setImage(data['tests']);
            })
        });
    }
    clickable_Image();

    return (
        <div>
             <h1>My First Chat APP</h1>
                <ol>
                    {
                    addresses.map((address, index)=>
                        <div key={index}>{address} </div>)
                    }
                    {
                    link.map((test, index)=>
                        <div key={index}><a href={test}>{test}</a> </div>  )
                    }
                    {
                    image.map((tests, index)=>
                        <div key={index}><img src={tests} width="150" height="150"/></div>  )
                    }
                </ol>
                <h2>Total Users Connected: {count}</h2>
                <p1>Type <b>!! about</b> in the chat for description </p1>
            <Button />
        </div>
    );
}