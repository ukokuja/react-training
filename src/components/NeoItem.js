import React, {useState} from 'react';
import MethodLabel from "./MethodLabel";
import {Button, Checkbox} from "antd";
import PropTypes from "prop-types";
import {DeleteOutlined} from "@ant-design/icons";

function NeoItem({item, onReposition, index, onDeleteItem}) {
    const [checked, setChecked] = useState(false);
    const anchorElement = e => {
        e.preventDefault();
        setChecked(!checked)
        onReposition(index)
    }
    const deleteItem = e => {
        onDeleteItem(index)
    }
    return (
        <div className='neo-item'>
            <div onClick={anchorElement} className='content'>
                <Checkbox checked={checked}>
                    <MethodLabel msg={item.method}/>
                    <span className='endpoint'>{item.endpoint_path}</span>
                </Checkbox>
            </div>
            <Button type="primary" onClick={deleteItem} className='arrow-button' shape="round" icon={<DeleteOutlined />} size='small' />
        </div>
    );
}

NeoItem.defaultProps = {
    item: {
        method: 'GET',
        endpoint_path: '/api/v1'
    }
}
NeoItem.propTypes = {
    method: PropTypes.string,
    endpoint_path: PropTypes.string
}

export default NeoItem;