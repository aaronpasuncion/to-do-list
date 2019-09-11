import React, { Component } from "react";
import "./Task.css";
import Button from "../Button/Button";

// &#10004;
// maybe you can use a ternary operator on the whole thing to see if
// the user clicked the update button or not and create a new state element
// called isUpdating

const Task = ({
  tasks,
  deleteTask,
  editTask,
  taskComplete,
  updateTask,
  saveTask,
  value,
  taskType,
  onTypeChange,
  taskTime,
  taskPeriod,
  durationType,
  taskDurationType,
  error,
  cancelEdit
}) => (
  <div className="tasks">
    {error ? (
      <div>
        <p className="error">{error}</p>
      </div>
    ) : (
      ""
    )}
    {tasks.map(item => (
      <div key={item.taskID} className="task-item">
        {!item.isUpdating ? (
          <Button
            className={`checkbox ${item.isComplete === true ? "complete" : ""}`}
            onClick={() => taskComplete(item)}
          ></Button>
        ) : (
          <div></div>
        )}
        {item.isUpdating ? (
          <input type="text" value={value} onChange={updateTask} />
        ) : (
          <h3 className={`${item.isComplete ? "task-complete" : ""}`}>
            {item.task}
          </h3>
        )}

        {item.isUpdating ? (
          <form>
            <input
              type="text"
              maxLength="3"
              onChange={taskTime}
              value={taskPeriod}
            />
            <select onChange={taskDurationType} value={durationType}>
              <option disable="true">-time-</option>
              <option value="min">min</option>
              <option value="hr">hr</option>
            </select>
          </form>
        ) : (
          <p className={`${item.isComplete ? "task-complete" : ""}`}>
            {item.duration}
          </p>
        )}

        {item.isUpdating ? (
          <select value={taskType} onChange={onTypeChange}>
            <option disable="true">-type-</option>
            <option value="personal">personal</option>
            <option value="work">work</option>
          </select>
        ) : (
          <p
            className={`task-type ${
              item.type === "work" ? "work-task" : "personal-task"
            }`}
          >
            {item.type}
          </p>
        )}

        {item.isUpdating ? (
          <Button
            // onClick={this.addTask}
            className={`task-type task-update`}
            onClick={() =>
              saveTask(item, value, taskType, durationType, taskPeriod)
            }
          >
            Save
          </Button>
        ) : item.isComplete ? (
          ""
        ) : (
          <Button
            // onClick={this.addTask}
            className={`task-type task-update`}
            onClick={() => editTask(item)}
          >
            Update
          </Button>
        )}
        {!item.isUpdating ? (
          <Button
            // onClick={this.addTask}
            className={`task-type task-delete`}
            onClick={() => deleteTask(item.taskID)}
          >
            Delete
          </Button>
        ) : (
          <Button
            // onClick={this.addTask}
            className={`task-type task-delete`}
            onClick={() => cancelEdit(item.taskID)}
          >
            Cancel
          </Button>
        )}
      </div>
    ))}
  </div>
);

export default Task;
