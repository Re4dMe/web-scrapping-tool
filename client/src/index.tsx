import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import axios, { AxiosResponse } from 'axios';
import './index.css';
import './Style/TaskSection.css';
import App from './App';
import { Button, TextField } from '@mui/material';
import { TaskBoard, TaskControl, TaskControlProps } from './Components/TaskBoard'

import reportWebVitals from './reportWebVitals';
import { DatabaseTable } from './Components/Database/index';
const root = ReactDOM.createRoot(document.getElementById('root')!);
//const socket = socketIO.connect("http://localhost:5001")

const createStringPairClick = (var_string: string, chinese_string: string, english_string: string): Promise<any> => {
    const url = "http://localhost:5000/createStringPair?var_string=" + var_string + "&chinese_string=" + chinese_string + "&english_string=" + english_string
    return fetch(url);
}

const getStringPair = (): Promise<any> =>{
    const url = "http://localhost:5000/getStringPair"
    console.log(url)
    return fetch(url).then((r) => {
        console.log(r)
        return r.json()})
}

const deleteStringPairRequest = (id: any): Promise<any> => {
    const url = "http://localhost:5000/deleteStringPair?id=" + id
    return fetch(url);
}

const deleteStringPair = (): Promise<any> =>{
    const url = "http://localhost:5000/deleteStringPair"
    console.log(url)
    return fetch(url).then((r) => {
        console.log(r)
        return r.json()})
}

const collectPage = (collect_url: any): Promise<any> =>{
    const url = "http://localhost:5000/collectPage"
    console.log(url)
    return fetch(url).then((r) => {
        console.log(r)
        return r.json()})
}

 

const addTask = async (task: any): Promise<any> => {
    try {
        const url = "http://localhost:5000/WebCollectTaskManagementService/addTask"
 
        let jsonData = JSON.stringify(task);
        const response =  await fetch(url, {
            method: 'POST',
            body: jsonData,
            headers: {'Content-Type': 'application/json ; charset=UTF-8'} 
        });
            
        // let res = await fetch(url)
        // fetch(url).then(()=>{})
        // return res.data.data;
    }
    catch (err) {
        console.log("Error while fetching: " + err)
    }
}


let words = ['sky', 'blue', 'falcon', 'falcon', 'wood', 'cloud'];

interface TextListPropsAndState {
    words: string[];
}

class TextList extends React.Component<TextListPropsAndState, TextListPropsAndState> {    
    constructor(props: any) {
        super(props);
        const words = props.words
        console.log(`words: ${words}`)
    }

    render() {
        return (
            <>
                <div> 
                    <ul style={{listStyleType:'none'}}>
                        {this.props.words.map((word, idx) => <li key={idx} >{word}</li>)}
                    </ul>
                </div>
            </>
        )
    };
}

const dictionaryToPlainText = (data: any) => {
    let str = "";
    Object.keys(data).map((k) => {str += k.toString() + ": " + data[k].toString() + ' '})
    return str  
}

const Test = (props: any) => {
    /*useEffect(() => {
      //axios.get("http://localhost:5000/createStringPair")
      
    });*/

    const [stringState, setStringState] = useState({db_data: [], var_string: '', chinese_string: '', english_string: '', id: ''});
     
    /*
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleGetStringPairClick = this.handleGetStringPairClick.bind(this);
    this.handleDeleteStringPairClick = this.handleDeleteStringPairClick.bind(this);
    */
    const handleChange = (e: any) => {
        const {name, value} = e.target
        console.log(name, value)
        setStringState((stringState) => ({...stringState, [name]: value}));
    }

    const handleCreateClick = () => {
        console.log("handleClick")
        console.log(stringState)
        createStringPairClick(stringState.var_string, stringState.chinese_string, stringState.english_string)
        getStringPair().then((r) => {
            console.log(r)
            let dblist: any = []
            r['data'].map((data: any)=>{dblist.push(JSON.stringify(data))})
            setStringState((stringState) => ({...stringState, db_data: dblist}));
            console.log(stringState.db_data)
        })
    }

    const handleDeleteStringPairClick = () => {
        deleteStringPairRequest(stringState.id)
            .then(() => {
                getStringPair()
                    .then((r) => {
                        let dblist: any = []
                        r['data'].map((data: any)=>{dblist.push(JSON.stringify(data))})
                        setStringState((stringState: any) => ({...stringState, db_data: dblist}));
                        console.log(stringState.db_data)
                    })
                }
        )
    }

    const handleGetStringPairClick = () => {
        getStringPair().then((r) => {
            let dblist: any = []
            r['data'].map((data: any)=>{dblist.push(dictionaryToPlainText(data))})
            setStringState((stringState) => ({...stringState, db_data: dblist}));
            console.log(stringState.db_data);
        })
        console.log("dbdata: " + stringState.db_data);
        words.shift();
        words.push("a");
    }

    const handleCollectPage = () => {
        collectPage('abc')
            .then(() => {
                console.log("done")
            })
    }


    {
        /*const refreshPage = () => {
        this.setState(
          {reload: true},
          () => this.setState({reload: false})
        )
        }*/
    }
      
    return (
            <>
                <div className="dataPanel">
                    <div className='stringTextSection'>
                        <span>a: </span>
                        <input type="text" id='var' name="var_string" onChange={handleChange} />
                    </div>
                    <div className='stringTextSection'>
                        <span>a: </span>
                        <input type="text" id='chinese' name="chinese_string" onChange={handleChange} />
                    </div>
                    <div className='stringTextSection'>
                        <span>a: </span>
                        <input type="text" id='english' name="english_string" onChange={handleChange} />
                    </div>
                </div>
                <div>{stringState.var_string}</div>
                <button onClick={handleCreateClick}>create</button>
                <button onClick={handleGetStringPairClick}>get</button>
                <div className="dataPanel">
                    <div className='stringTextSection'>
                        <span>a: </span>
                        <input type="text" id='id' name="id" onChange={handleChange} />
                    </div>
                </div>
                <button onClick={handleDeleteStringPairClick}>delete</button>
                <TextList words={stringState.db_data}/>
                <button onClick={handleCollectPage}>collect</button>
            </>
    ); 
}

function ChangeTitle() {
    console.log("Change title.")
    useEffect(() => {
      document.title = 'Title';
    }, []);
    
    return <link rel="icon" href=""></link>
}

//<App />
root.render(
  <React.StrictMode>
    <>
        <ChangeTitle/>
        {/*<Test/>*/}
        <div style={{display:"flex", flexDirection:"row"}}>
            <DatabaseTable />
            <div className='task-section'>
                <TaskControl addTaskFunc={addTask}/>
                <TaskBoard/>
            </div>
        </div>
    </>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
