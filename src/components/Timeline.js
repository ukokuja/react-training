import {useEffect, useState} from 'react';
import {Timeline, Radio, Button, Row} from 'antd';
import NeoItem from "./NeoItem";
import {DownOutlined, UpOutlined} from "@ant-design/icons";
import PropTypes from "prop-types";

function NeoTimeline({eventId}) {
    const [mode, setMode] = useState('left');
    const [currentId, setCurrentId] = useState(0);
    const [items, setItems] = useState([]);
    const [timestamp, setTimestamp] = useState(Date.now())
    const listSize = 5;
    useEffect(() => {
        const fetchData = async () => {
            let res
            if (eventId) {
                res = await fetch(`http://localhost:5050/body?_start=${currentId}&_end=${currentId+listSize}&id=${eventId}`)
            } else {
                res = await fetch(`http://localhost:5050/body?_start=${currentId}&_end=${currentId+listSize}`)
            }
            const data = await res.json()
            console.log(data)
            setItems(data)
        };
        fetchData()
    }, [currentId, eventId, timestamp]);
    
    const scrollUp = e => {
        setCurrentId(currentId-1);
    };
    const scrollDown = e => {
        setCurrentId(currentId+1);
    };
    const reposition = idx => {
        let centerItem = currentId + idx;
        const currentIdCandidate = centerItem - Math.floor(listSize/2);
        setCurrentId(currentIdCandidate > -1 ? currentIdCandidate : 0);
    }

    const deleteItem = async (idx) => {
        let candidate = items[idx].id;
        await fetch (`http://localhost:5050/body/${candidate}`,
            {
                method: "DELETE"
            })
        setTimestamp(Date.now())
    }

    return (
        <>
            <Button type="primary" disabled={currentId<1} onClick={scrollUp} className='arrow-button' shape="round" icon={<UpOutlined />} size='small' />
            <Timeline className='timeline-wrapper' mode={mode}>
                {
                    items.length > 0 ? items.map((item, index) => (
                        <Timeline.Item key={item.id} className='timeline-item'  label={item.timestamp}><NeoItem index={index} onReposition={reposition} onDeleteItem={deleteItem} item={item}/></Timeline.Item>
                    )) : <span>We could not find items with the eventId={eventId}</span>

                }
            </Timeline>
            <Button type="primary" disabled={currentId>100} onClick={scrollDown} className='arrow-button' shape="round" icon={<DownOutlined />} size='small' />
        </>
    );
}

NeoTimeline.defaultProps = {
    item: {
        eventId: null
    }
}
NeoTimeline.propTypes = {
    eventId: PropTypes.string
}
export default NeoTimeline