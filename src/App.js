import React, { Component } from "react";
import "./App.css";
import Sort from "./components/Sort/Sort";
import Button from "./components/Button/Button";
import Task from "./components/Task/Task";

// default array of tasks
const tasks = [
  {
    task: "Shower",
    duration: "10 min",
    type: "personal",
    taskID: 0,
    isComplete: false,
    isUpdating: false
  },
  {
    task: "Breakfast",
    duration: "15 min",
    type: "personal",
    taskID: 1,
    isComplete: false,
    isUpdating: false
  },
  {
    task: "Work on Project",
    duration: "1 hr",
    type: "work",
    taskID: 2,
    isComplete: false,
    isUpdating: false
  }
];

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      tasks,
      updatedTask: "",
      taskType: "",
      taskPeriod: "",
      durationType: "",
      error: ""
    };

    this.deleteTask = this.deleteTask.bind(this);
    this.addTask = this.addTask.bind(this);
    this.editTask = this.editTask.bind(this);
    this.taskComplete = this.taskComplete.bind(this);
    this.updateTask = this.updateTask.bind(this);
    this.saveTask = this.saveTask.bind(this);
    this.onTypeChange = this.onTypeChange.bind(this);
    this.taskTime = this.taskTime.bind(this);
    this.taskDurationType = this.taskDurationType.bind(this);
    this.cancelEdit = this.cancelEdit.bind(this);
  }

  // locate the current task.id and remove the task from the tasks list accordingly
  deleteTask(id) {
    this.setState(() => {
      const filterTasks = item => item.taskID !== id;
      const updatedTasks = this.state.tasks.filter(filterTasks);

      return {
        tasks: updatedTasks
      };
    });
  }

  // initializes the updating state of a task
  editTask(task) {
    this.setState(prevState => {
      const { tasks, error } = prevState;
      const errorCheck = error !== "" ? error : "";
      if (errorCheck === "") {
        tasks.forEach(element => {
          element.isUpdating = false;
        });
        task.isUpdating = true;
      } else {
        alert("Please fix current issues before proceeding!");
      }
      const editedTask = tasks => (tasks.taskID === task.taskID ? task : tasks);
      const updatedTasks = this.state.tasks.filter(editedTask);
      console.log(updatedTasks.length);
      return {
        tasks: updatedTasks,
        error: errorCheck,
        updatedTask: "",
        taskType: "",
        taskPeriod: "",
        taskDuration: ""
      };
    });
  }

  // cancel edit of selected task item
  cancelEdit(id) {
    this.setState(prevState => {
      const { tasks } = prevState;
      tasks[id].isUpdating = false;
      console.log(tasks);
      return {
        tasks: tasks,
        error: "",
        updatedTask: "",
        taskType: "",
        taskPeriod: ""
      };
    });
  }

  // appends a new task to the current list of tasks with default task information
  addTask(curTasks) {
    // take tasks length and add 1 to the id
    this.setState(prevState => {
      const { tasks } = prevState;
      console.log(tasks);
      const newTask = {
        task: "---new task---",
        duration: "0 min",
        type: "personal",
        taskID: tasks.length,
        isComplete: false,
        isUpdating: false
      };

      const combineTasks = [...curTasks, newTask];
      console.log(newTask);
      return {
        tasks: combineTasks
      };
    });
  }

  // sets the tasks isComplete property to true to indicate completion of the task
  taskComplete(task) {
    this.setState(prevState => {
      const { tasks } = prevState;
      task.isComplete = tasks[task.taskID].isComplete ? false : true;
      const udpatedTask = item => (item.id === task.id ? task : item);
      const updatedList = this.state.tasks.filter(udpatedTask);
      console.log(updatedList);
      return {
        tasks: updatedList
      };
    });
  }

  // Editting methods

  // sets the task title
  updateTask(e) {
    console.log(e.target.value);
    this.setState({ updatedTask: e.target.value });
  }

  // listens for changes regarding the task type(personal/work)
  onTypeChange(e) {
    console.log(e.target.value);
    this.setState({ taskType: e.target.value });
  }

  //  sets the number for setting the task duration
  taskTime(e) {
    this.setState({ taskPeriod: e.target.value });
  }

  // sets the taskDurationType ("min/hr")
  taskDurationType(e) {
    console.log(e.target.value);
    this.setState({ durationType: e.target.value });
  }

  // saves the changes the user has made or reverts to original task information if no changes are made
  saveTask(task) {
    this.setState(prevState => {
      const {
        tasks,
        taskType,
        updatedTask,
        durationType,
        taskPeriod,
        error
      } = prevState;

      // setting the task title
      task.task = updatedTask === "" ? task.task : updatedTask;
      // setting the task duration

      // validation to see if the user entered a numeric time duration
      const errorCheck =
        taskPeriod === ""
          ? ""
          : !Number.isInteger(parseInt(taskPeriod))
          ? "Task Duration must be numeric!"
          : error !== ""
          ? error
          : "";
      // set the durationType to default "min" if nothing selected
      const typeCheck = durationType === "" ? "min" : durationType;
      task.duration =
        taskPeriod === ""
          ? task.duration
          : !Number.isInteger(parseInt(taskPeriod))
          ? task.duration
          : `${taskPeriod + " " + typeCheck}`;

      // setting the task type (work/personal)
      task.type = taskType === "" ? task.type : taskType;
      // filter through the tasks to locate the current task you are editting and filter it out with the editted version
      const filterTask = item => (item.id === task.id ? task : item);
      const updatedTasks = this.state.tasks.filter(filterTask);
      // if there were any errors found, the update state will remain for the user to fix
      task.isUpdating = errorCheck === "" ? false : true;
      return {
        tasks: updatedTasks,
        error: errorCheck
      };
    });
  }
  render() {
    const {
      tasks,
      updatedTask,
      taskType,
      taskDuration,
      durationType,
      taskPeriod,
      error
    } = this.state;
    return (
      <div className="App">
        <div className="task-wrapper">
          <div className="header">
            <h1 className="title">Today's Tasks</h1>
            <Button onClick={() => this.addTask(tasks)} className="add-task">
              Add Task
            </Button>
          </div>

          <Task
            tasks={tasks}
            deleteTask={this.deleteTask}
            editTask={this.editTask}
            taskComplete={this.taskComplete}
            updateTask={this.updateTask}
            saveTask={this.saveTask}
            value={updatedTask}
            onTypeChange={this.onTypeChange}
            select={taskType}
            taskDuration={taskDuration}
            taskDurationType={this.taskDurationType}
            taskTime={this.taskTime}
            durationType={durationType}
            taskPeriod={taskPeriod}
            error={error}
            cancelEdit={this.cancelEdit}
          />
        </div>
      </div>
    );
  }
}

export default App;
