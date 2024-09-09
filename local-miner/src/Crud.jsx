import React, { useEffect, useState } from 'react'
import './crud.css'

const Crud = () => {

    const [taskName, setTaskName] = useState("");
    const [taskDescription, setTaskDescription] = useState("");
    const [tasks, setTasks] = useState(JSON.parse(localStorage.getItem("tasks")) || []);
    const [editTaskId, setEditTaskId] = useState(null);


    useEffect(() => {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }, [tasks]);

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!taskName || !taskDescription) {
            alert("Please Fill The Feilds First");
            return;
        }

        const obj = {
            id: editTaskId ? editTaskId : Math.floor(Math.random() * 100000),
            name: taskName,
            description: taskDescription,
            date: new Date().toISOString().split("T")[0],
        };

        if (editTaskId) {
            setTasks(tasks.map((task) => (task.id === editTaskId ? obj : task)));
            setEditTaskId(null);
        } else {
            setTasks([...tasks, obj]);
        }

        setTaskName("");
        setTaskDescription("");
    };

    const handleEditTask = (task) => {
        setTaskName(task.name);
        setTaskDescription(task.description);
        setEditTaskId(task.id);
    };

    const handleDeleteTask = (id) => {
        const updatedTasks = tasks.filter((task) => task.id !== id);
        setTasks(updatedTasks);
    };

    return (
        <div className="container">
            <h2>TODO App</h2>
            <form onSubmit={handleSubmit}>
                <div className='todo-from'>
                    <input type="text" placeholder="Add New Task" value={taskName} onChange={(e) => setTaskName(e.target.value)} />
                    <input type="text" placeholder="Task Description" value={taskDescription} onChange={(e) => setTaskDescription(e.target.value)} />
                    <button type="submit" className="add-btn">
                        {editTaskId ? "Update Task" : "Add Task"}
                    </button>
                </div>
            </form>

            <h2>Task</h2>
            <div className="task-list">
                {
                    tasks.map((task) => {
                        return (
                            <div key={task.id} className="task">
                                <h3>{task.name}</h3>
                                <p>{task.date}</p>
                                <p>{task.description}</p>
                                <div className="task-action">
                                    <button className="edit-btn" onClick={() => handleEditTask(task)}>Edit</button>
                                    <button className="delete-btn" onClick={() => handleDeleteTask(task.id)}>Delete</button>
                                </div>


                            </div>
                        )
                    })
                }
            </div>


        </div>
    )
}

export default Crud
