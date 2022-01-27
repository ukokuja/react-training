import NeoTimeline from './components/Timeline'
import NeoHeader from './components/Header'
import {Col, Row, Switch} from "antd";
import {useState} from "react";

function App() {
    const [eventId, setEventId] = useState(null);
    const runQuery = (value)=> {
        setEventId(value)
    };

    return (
        <Row>
            <Col span={12} offset={6}>
                <div className="App">
                    <NeoHeader onQuery={runQuery}></NeoHeader>
                    <NeoTimeline eventId={eventId}></NeoTimeline>
                </div>
            </Col>
        </Row>
    );
}

export default App;
