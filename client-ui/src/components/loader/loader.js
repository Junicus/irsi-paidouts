import React from 'react';
import classNames from 'classnames';
import './loader.css';

const Loader = ({ spinning, fullScreen }) => {
    return (
        <div className={classNames('loader', { hidden: !spinning, fullScreen: fullScreen })}>
            <div className='loader-wrapper'>
                <div className='loader-inner' />
                <div className='loader-text'>Loading...</div>
            </div>
        </div>
    );
}

export default Loader;