import React, {useCallback, useState} from 'react';
import logo from './logo.svg';
import './App.css';
import axios from 'axios';
import {decryptObject} from "./cryptography";
import {animated, useTransition} from "react-spring";


const pages = [
    ({ style ,onClick,token,setToken}) => <animated.div style={{ ...style, background: 'lightpink' }}>
        <button style={{width: 400, height: 50}} onClick={() => {
            axios.post('/api/getEncryptedData', {id: 'a'}).then((res) => {
                    setToken(res.data.data)
                    onClick();
                }
            ).catch((err) => alert(err.message));
        }}>
            <h3>Get Hash A</h3>
        </button>
        <button style={{width: 400, height: 50}} onClick={() => {
            axios.post('/api/getEncryptedData', {id: 'b'}).then((res) => {
                    setToken(res.data.data)
                    onClick();
                }
            ).catch((err) => alert(err.message));
        }}>
            <h3>Get Hash B</h3>
        </button>
        <button style={{width: 400, height: 50}} onClick={() => {
            axios.post('/api/getEncryptedData', {id: 'c'}).then((res) => {
                    setToken(res.data.data)
                    onClick();
                }
            ).catch((err) => alert(err.message));
        }}>
            <h3>Get Hash C</h3>
        </button>
    </animated.div>,
    ({ style ,token,onClick}) => <animated.div style={{ ...style, background: 'lightblue' }}>
        <p>{token.toString().slice(0,20)+'...'}</p>
        <button
                style={{width: 400, height: 50}} onClick={() => {
            axios.post('/api/sendEncryptedData', {eData: token}).then((res) => {
                    // alert(JSON.stringify(res.data));
                    // console.log(res.data);
                }
            ).catch((err) => alert(err.message));
        }}>
            <h3>Send Hash A To Server To Decrypt</h3>
        </button>
        <button
                style={{width: 400, height: 50}} onClick={() => {

            alert(JSON.stringify(decryptObject(token)));
        }}>
            <h3>Decrypt Hash in client</h3>
        </button>
        <button
            style={{width: 400, height: 50}} onClick={() => {
            onClick(-1)
        }}>
            <h3>{'<-GoBack'}</h3>
        </button>
    </animated.div>,
    ({ style ,onClick}) => <animated.div style={{ ...style, background: 'lightgreen' }}>
        No
    </animated.div>,
]

function AnimationHandler() {
    const [index, set] = useState(0);
    const [token, setToken] = useState('');
    const onClick = useCallback((a=1) => set(state => (state + a) % 3), []);
    const transitions = useTransition(index, p => p, {
        from: { opacity: 0, transform: 'translate3d(100%,0,0)' },
        enter: { opacity: 1, transform: 'translate3d(0%,0,0)' },
        leave: { opacity: 0, transform: 'translate3d(-50%,0,0)' },
    });
    return (
        <div align="center" style={{width:400,height:500}} className="simple-trans-main" >
            {transitions.map(({ item, props, key }) => {
                const Page = pages[item];
                return <Page key={key} style={props} onClick={onClick} token={token} setToken={setToken} />
            })}
        </div>
    )
}






function App() {

    return (
        <div className="App">
            <header className="App-header">
                <img src={logo} className="App-logo" alt="logo"/>
                <AnimationHandler/>
            </header>
        </div>
    );
}

export default App;



