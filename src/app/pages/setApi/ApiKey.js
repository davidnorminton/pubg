import React, { useEffect, useState } from 'react';

function ApiKey() {

    const [key, setKey] = useState(null);

    useEffect(() => {
        const api_key = localStorage.getItem('pubg_api_key');
        if(api_key) {
            setKey(api_key);
        }
    }, []);


    function setApiKey(e) {
        e.preventDefault();
        const apiKey = e.target[0].value;
        localStorage.setItem('pubg_api_key', apiKey);
        setKey(apiKey);
        clearTextArea();
    }  

    function clearTextArea() {
        const textarea = document.querySelector('.api-key-textarea');
        textarea.value = '';
    }

    function CurrentKeyTitle() {
        return (
            <div>
                <h2>Current Key</h2>
                <div className='current-key'>{key}</div>
            </div>
        )
    }

    function CurrentKey() {
        return key ? <CurrentKeyTitle /> : '';
    }

    return (
        <div className='narrow-content'>
            <h1 className='main-title'>Api Key</h1>
            <CurrentKey />
            <form onSubmit={setApiKey}>
                <textarea className='api-key-textarea' name="key"></textarea>
                <button className='api-key-btn' type="submit">Add Key</button>
            </form>  
        </div>
    );
}

export default ApiKey;