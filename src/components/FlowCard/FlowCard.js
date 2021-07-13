import React from 'react';
import { Card, CardContent, CardHeader, Typography, IconButton } from '@material-ui/core'; 
import DeleteIcon from '@material-ui/icons/Delete';

const FlowCard = ({ flow, index, deleteFlow }) => {
    const { className, methodSignature, statementSignature, leaking, reachable } = flow;
    return (
        <Card raised>
            <CardHeader
                title={`Flow ${index+1}`}
                action={<IconButton onClick={() => deleteFlow(index)}>
                            <DeleteIcon />
                        </IconButton>}
            />
            <CardContent>
                <Typography>{`CN: ${className}`}</Typography>
                <Typography>{`MS: ${methodSignature}`}</Typography>
                <Typography>{`SS: ${statementSignature}`}</Typography>
                <Typography>{`L: ${leaking}`}</Typography>
                <Typography>{`R: ${reachable}`}</Typography>
            </CardContent>
        </Card>
    );
};

export default FlowCard;
