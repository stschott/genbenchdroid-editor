import React from 'react';
import FlowCard from '../FlowCard/FlowCard';
import useStyles from './FlowList.styles';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

const FlowList = ({ flows, deleteFlow, reorderFlow }) => {
    const classes = useStyles();

    const onDragEnd = (result) => {
        if (!result.destination) return;
        reorderFlow(result.source.index, result.destination.index);
    };

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Droppable droppableId="droppable" direction="horizontal">
                {(provided) => (
                    <ul 
                        className={classes.list}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {flows.map((flow, idx) => (
                            <Draggable key={idx} draggableId={flow.className + flow.methodName + flow.statementSignature + flow.leaking + idx} index={idx}>
                                {(provided) => (
                                    <li
                                        className={classes.listItem}
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                            <FlowCard 
                                                flow={flow} 
                                                index={idx}
                                                deleteFlow={deleteFlow}
                                            />
                                    </li>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </ul>
                )}
            </Droppable>
        </DragDropContext>
    );
};

export default FlowList;
