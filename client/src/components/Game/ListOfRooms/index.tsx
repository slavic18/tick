import React from "react";

import "./_styles.css";

const ListOfRooms: React.FC<{
  rooms: any[];
  onClick: (roomId: string) => void;
}> = ({ rooms, onClick }) => {
  return (
    <div className="roomslist">
      <h3 className="text-center">List of gaming rooms</h3>
      {rooms.map(room => (
        <button
          key={room.id}
          type="button"
          className="btn btn-primary initialscreen__button"
          onClick={() => onClick(room.id)}
        >
          Join {room.id} room
        </button>
      ))}
    </div>
  );
};
export default ListOfRooms;
