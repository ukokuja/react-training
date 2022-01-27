import React from 'react';
import PropTypes from "prop-types";
import {Tag} from "antd";

function MethodLabel({msg, colors}) {
    return (
        <><Tag className='neo-tag' color={colors[msg]}>{msg}</Tag></>
    );
}

MethodLabel.defaultProps  = {
    msg: 'GET',
    colors: {
        GET: 'blue',
        AUTH: 'purple',
        POST: 'green',
        DELETE: 'red',
        PUT: 'orange',
    }
}
MethodLabel.propTypes = {
    msg: PropTypes.string
}
export default MethodLabel;