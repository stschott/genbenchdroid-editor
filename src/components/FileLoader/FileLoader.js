import React, { forwardRef } from 'react';

const FileLoader = forwardRef(({ cb }, ref) => {
    return (
        <input
            type="file"
            id="file"
            ref={ref}
            style={{ display: 'none' }}
            onChange={cb}
            onClick={e => { e.target.value = null }}
            accept="application/json"
        />
    );
});

export default FileLoader;
