import React from 'react';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import { DragDropContext } from 'react-beautiful-dnd'; 
// import '@atlaskit/css-reset';
import initialData from './initial-data';
import Column from './d-n-d-components/column.jsx';

const Container = styled.div`
  display: flex;
`;

class TaskBoard extends React.Component {
  constructor(props) {
    super(props)

    this.state = { initialData };
  }
  
  onDragEnd = result => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (destination.droppableId === source.droppableId && 
      destination.index === source.index
    ) {
      return;
    }

    const start = this.state.initialData.columns[source.droppableId];
    const finish = this.state.initialData.columns[destination.droppableId];

    if (start === finish) {
      const newTaskIds = Array.from(start.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newColumn = {
        ...start,
        taskIds: newTaskIds,
      };

      const newState = {
        ...this.state.initialData,
        columns: {
          ...this.state.columns,
          [newColumn.id]: newColumn,
        },
      };

      this.setState(newState);
      return;
    }

    // moving from one list to another
    const startTaskIds = Array.from(start.taskIds);
    startTaskIds.splice(source.index, 1);
    const newStart = {
      ...start,
      taskIds: startTaskIds,
    };

    const finishTaskIds = Array.from(finish.taskIds); 
    finishTaskIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finish,
      taskIds: finishTaskIds,
    };

    const newState = {
      ...this.state.initialData,
      columns: {
        ...this.state.columns,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    console.log(this.state)
    this.setState(newState);
  };

  render() {
    return(
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Container>
        {this.state.initialData.columnOrder.map(columnId => {
          const column = this.state.initialData.columns[columnId];
          const tasks = column.taskIds.map(taskId => this.state.initialData.tasks[taskId],);
      
          return <Column key= {column.id} column={column} tasks={tasks} />;
          })}
          </Container>
      </DragDropContext>
    ); 
  }
}

export default TaskBoard;