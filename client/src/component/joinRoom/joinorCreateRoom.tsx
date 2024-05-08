import { useState } from "react";

const JoinOrCreateRoom = () => {

    const [roomID, setRoomID] = useState('');
    const [joinVisible, setJoinVisible] = useState("none");
    const [createVisible, setCreateVisible] = useState("none");
    const [roomno, setRoomno] = useState(0);
    const [View, setView] = useState("block");



    const handleJoin = () => {
        console.log('Join Room')
        setJoinVisible("block");
        setView("none");

    }
    const handleCreate = () => {
        console.log('Create Room');
        setCreateVisible("block");
        setRoomno(Math.floor(Math.random() * 1000000));
        setView("none");
    }
    return (
        <>
            <div style={{ display: View }}>
                <h1 style={{ textAlign: "center" }}>Join or Create Room</h1>
                <div className="Button">
                    <button onClick={handleJoin}>Join Room</button>
                    <button onClick={handleCreate}>Create Room</button>
                </div>
            </div>
            <div style={{ display: joinVisible }}>
                <h1>Join Rooms</h1>
                <input type="text" placeholder="Enter Room ID" value={roomID} onChange={(e) => setRoomID(e.target.value)} />
                <button>Join</button>
            </div>

            <div style={{ display: createVisible }}>
                <h1 style={{ textAlign: "center", width: "100vw" }}>{roomno}</h1>
            </div>
        </>
    )
}

export default JoinOrCreateRoom;