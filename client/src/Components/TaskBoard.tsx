import React, { useState, useEffect } from 'react';
import { TaskInfo, TaskState } from '../Typing/TaskType';
import { Grid, Button, TextField } from '@mui/material';
import { fetchTaskStatus } from './TaskBoardRequest';
import '../Style/TaskBox.css';
import '../Style/TaskControl.css';

// import { makeStyles } from '@material-ui/core/styles';

interface SubTaskBoardProps {
    tasks?: TaskInfo[],
}

const SubTaskBoard = (props: SubTaskBoardProps) => {
    const [tasks, setTasks] = useState<TaskState>({});
    return (
        <>
            {
                /*<Button onClick={async () => {
                    let info = await fetchTaskStatus(props.taskType);
                    console.log(info);
                    console.log(tasks);
                    setTasks(info);
                }}>Update</Button>*/
            }
            <div className="task-box-container card container">
                {
                props.tasks !== undefined ?
                    props.tasks.map((task) => (
                        <div className="task-box card">
                            <div className='button-panel'></div>
                                <div className='delete-button'></div>
                            <span>{`${task.taskName} ${task.taskID}`}</span>
                            <div className='dropdown-button'></div>
                        </div>
                        
                    )) : <div></div>
                }
            </div>
        </>
    );
}

 
export const TaskBoard = (props: any) => {
    const [tasks, setTasks] = useState<TaskState>({});
    /*
    useEffect(() => {
        fetch("http://localhost:5000/WebCollectTaskManagementService/getTasks")
            .then((res) => { 
                return res.json(); 
            })
            .then((data) => {
                setTasks(data);
            })
            .catch((err) => console.log("Error while fetching: " + err));
    }, [])
    */

    useEffect(() => {
        let i = 0;
        console.log("create board")
        let run = async () => {
            console.log(`count ${i}`)
            i++;
            let data = await fetchTaskStatus();
            await setTasks(data);
            setTimeout(run, 2000);
        }
        setTimeout(run, 1000);
 
    }, [])
    return (
        <div style={{display: "flex", flexDirection: "column"}}>
            <SubTaskBoard tasks={tasks["active"]}/>
            <SubTaskBoard tasks={tasks["pending"]}/>
            <SubTaskBoard tasks={tasks["inactive"]}/>
        </div>
    );
}
 

/* 
 * TODO create Task component which has =>
 * 1. A button to set trigger condition
 * 2. A button to delete the task
 */

 
export interface TaskControlProps {
    addTaskFunc: (task: any) => Promise<boolean>
}

const gridContainer = {
    /*
    display: "grid",
    width: "300px",
    height: "30px",
    gridTemplateColumns: "repeat(3, 1fr)",
    gridTemplateRows: "repeat(1, 1fr)",
    */
};

const gridItem = {
    display: "flex",
    height: "100%",
    width: "50%",
};


/*
const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
  }));
*/

export const TaskControl = (props: TaskControlProps) => {

    const [taskInfo, setTaskInfo] = useState<TaskInfo>({taskID: "", taskName: "", content: ""});
    const addTaskClick = (taskInfo: TaskInfo) => {
        props.addTaskFunc(taskInfo)
            .then(() => {})
    }   
    // const classes = useStyles();

    return (
        <div className='task-control-container'>
            <Grid sx={gridContainer} container={true} spacing={1}>
                <Grid item sx={gridItem} xs={4}>
                    <TextField 
                        id="TaskNameField" 
                        value={taskInfo.taskName}
                        label="Task Name" 
                        variant="standard" 
                        size="small"
                        onChange={e => setTaskInfo({...taskInfo, taskName: e.target.value})}
                    /> 
                </Grid>
                <Grid item sx={gridItem} xs={4}>
                    <TextField 
                        id="TaskContentField" 
                        value={taskInfo.content}
                        label="Task Content"
                        variant="standard" 
                        size="small"
                        onChange={e => setTaskInfo({...taskInfo, content: e.target.value})}
                    />  
                </Grid>
                <Grid item sx={gridItem} xs={4} alignItems="stretch" style={{"marginTop": 0}} >
                    <Button 
                        variant="contained"
                        onClick={() => addTaskClick(taskInfo)}
                    >
                        Add
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
}
 