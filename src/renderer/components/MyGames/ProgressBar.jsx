import React from 'react';

const ProgressBar = ({ percent }) => {
    const intPercent = Math.round(percent * 100);
    return (
        <div className="progressbar__root">
            <div
                className="progressbar__filled"
                style={{ width: `${intPercent}%` }}
            >
                {intPercent}%
            </div>
        </div>
    );
};

export default ProgressBar;
