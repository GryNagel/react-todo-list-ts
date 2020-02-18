import * as React from 'react'
import Button from './Button';

interface ITask {
    id: number, 
    value: string, 
    completed: boolean,
}

const App: React.FC = ():JSX.Element => {
    const [tasks, setTasks] = React.useState<Array<ITask>>([]);
    const [currentTask, setCurrentTask] = React.useState<string>('');

    function handleSubmit(e: React.FormEvent<HTMLFormElement>): void{
        e.preventDefault();
        setTasks([...tasks, { value: currentTask, id: getTimeInMilliseconds(), completed: false}])
        setCurrentTask('');
    }

    console.log(tasks)

    function onChange(e: React.ChangeEvent<HTMLInputElement>){
        setCurrentTask(e.target.value)
    }

    function deleteTask(id: number):void{
        const filteredTasks: Array<ITask> = tasks.filter((task: ITask) => task.id !== id);
        setTasks(filteredTasks);
    }

    function toggleDone(id: number):void{
        const mappedTasks: Array <ITask> = tasks.map((task: ITask) => ({
            ...task, 
            completed: task.id === id ? !task.completed : task.completed 
        }));
        // let task: ITask [] = tasks.splice(index, 1);
        // task [0].completed = !task[0].completed;
        // const currentTask: ITask[] = [...tasks, ...task];
        setTasks(mappedTasks);
    }

    function renderTasks(): JSX.Element[] {
        return(
            tasks.map((task: ITask) => (
                <div key={task.id} className="tdl-task">
                    <span className={task.completed ? "is-completed" : ""}>{task.value}</span>
                    <Button onClick={() => deleteTask(task.id)}>Delete</Button>
                    <Button onClick={() => toggleDone(task.id)}>{task.completed ? "Undo" : "Done" }</Button>
                </div>
            )
        ))      
    }
    
    function getTimeInMilliseconds():number{
        const date: Date = new Date();
        return date.getTime();
    }
 
    return (
        <>
            <h1>React Typescript Todo List</h1>
            <form onSubmit={e => handleSubmit(e)}>
                <input className="tdl-input" value={currentTask} type="text" placeholder="Add a task" onChange={e => onChange(e)}/>
                <Button type="submit">Add Task</Button>
            </form>
            <section>
                {renderTasks()}
            </section>
        </>
    )
}

export default App;
