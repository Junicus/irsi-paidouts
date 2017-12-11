import React from 'react'
import PropTypes from 'prop-types'

const Resource = () => (
    <span>
        &lt;Resource&gt; elements are for configuration, should not be rendered
    </span>
);

Resource.propTypes = {
    name: PropTypes.string.isRequired
}

export default Resource;