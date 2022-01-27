import React, {useState} from 'react';
import {Button, Divider, Input, PageHeader, Switch} from "antd";

function NeoHeader(props) {
    const [eventId, setEventId] = useState(null);
    const runQuery = e => {
        props.onQuery(eventId);
    };
    const onChange = e => {
        setEventId(e.target.value);
    };
    return (
        <div className='header'>
            <Input className='search-input' placeholder="Enter event id" onChange={ onChange }/>
            <PageHeader
                ghost={false}
                title="Timeline"
                extra={[
                    <Button key="1" type="primary" onClick={runQuery}>
                        Go To Query
                    </Button>,
                ]}
            >
            </PageHeader>
            <Divider />
            <div className='alerts-only-wrapper'>
                <Switch size="small" className='alerts-only-switch' onChange={onChange}/> <span>Alerts only</span>
            </div>
        </div>
    );
}

export default NeoHeader;