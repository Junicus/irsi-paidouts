import React from 'react'
import { createDevTools } from 'redux-devtools'
import LogMonitor from 'redux-devtools-log-monitor'
import DockMonitor from 'redux-devtools-dock-monitor'

// https://github.com/gaearon/redux-devtools-log-monitor/issues/12
export default createDevTools(
    <DockMonitor toggleVisibilityKey='ctrl-h'
        defaultPosition='bottom'
        changePositionKey='ctrl-q'
        defaultIsVisible={true}>
        <LogMonitor theme='solarized' preserveScrollTop={false} />
    </DockMonitor>
)
