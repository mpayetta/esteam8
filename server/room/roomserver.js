var io = require("socket.io");  
var socket = io.listen(4444);  
var Room = require('./room.js');  
var uuid = require('node-uuid');

socket.set("log level", 1);  
var people = {};  
var rooms = {};  
var clients = [];

Array.prototype.contains = function(k, callback) {  
    var self = this;
    return (function check(i) {
        if (i >= self.length) {
            return callback(false);
        }
        if (self[i] === k) {
            return callback(true);
        }
        return process.nextTick(check.bind(null, i+1));
    }(0));
};

socket.on("connection", function (client) {  
    
    client.on("join", function(user) {
        roomId = null;
        ownsRoomId = null;
        people[client.id] = {"name" : user.name, "inroom" : roomId, "owns" : ownsRoomId};
        client.emit("welcome", "You have connected to the server.");
        clients.push(client); //populate the clients array with the client object
    });
    
    client.on("create-room", function(name) {  
        if (people[client.id].room === null) {
            var id = uuid.v4();
            var room = new Room(name, id, client.id);
            rooms[id] = room;
            
            // add the person to the room object
            room.addPerson(client.id); 
            // update the room key with the ID of the created room
            people[client.id].room = id; 
            
            // name the socket.io room
            client.room = name; 
            // auto-join the creator to the room            
            client.join(client.room); 
        } else {
            client.emit("illegal-room-creation", "You have already created a room.");
        }
    });
    
    client.on("join-room", function(id) {  
        var room = rooms[id];
        if (client.id === room.owner) {
            client.emit("already-joined", "You are the owner of this room and you have already been joined.");
        } else {
            room.people.contains(client.id, function(found) {
                if (found) {
                    client.emit("already-joined", "You have already joined this room.");
                } else {
                    if (people[client.id].inroom !== null) { //make sure that one person joins one room at a time
                        client.emit("update", 
                                    "You are already in a room ("+rooms[people[client.id].inroom].name+"), please leave it                                                    first to join another room.");
                    } else {
                        room.addPerson(client.id);
                        people[client.id].inroom = id;
                        user = people[client.id];
                        
                        // name the socket.io room
                        client.room = name; 
                        // auto-join the creator to the room            
                        client.join(client.room); 
                        
                        socket.sockets.in(client.room).emit("update", user.name + " has connected to " + room.name + " room.");
                        client.emit("welcome-room", {id: id, name: room.name});
                    }
                }
            });
        }
    });
    
    client.on("send-estimate", function(msg) {  
        if (socket.sockets.manager.roomClients[client.id]['/'+client.room] !== undefined ) {
            // TODO: agregar aca logica para emitir al resto de la sala solo cuando todos los
            //       miembros hayan mostrado su carta
            socket.sockets.in(client.room).emit("chat", people[client.id], msg);
        } else {
            client.emit("not-in-room", "Please connect to a room.");
        }
    });
    
    client.on("leave-room", function(id) {  
        var room = rooms[id];
        if (client.id === room.owner) {
            var i = 0;
            while(i < clients.length) {
                if(clients[i].id == room.people[i]) {
                    people[clients[i].id].inroom = null;
                    clients[i].leave(room.name);
                }
                ++i;
            }
            delete rooms[id];
            people[room.owner].owns = null; //reset the owns object to null so new room can be added
            socket.sockets.in(client.room).emit("owner-left", "The owner (" +user.name + ") is leaving the room. The room removed.");
        } else {
            room.people.contains(client.id, function(found) {
                if (found) { //make sure that the client is in fact part of this room
                    var personIndex = room.people.indexOf(client.id);
                    room.people.splice(personIndex, 1);
                    socket.sockets.in(client.room).emit("member-left", people[client.id].name + " has left the room.");
                    client.leave(room.name);
                }
            });
        }
    });
    
    client.on("remove-room", function(id) {  
        var room = rooms[id];
        if (room) {
            if (client.id === room.owner) { //only the owner can remove the room
                var personCount = room.people.length;
                if (personCount > 2) {
                    console.log('there are still people in the room warning'); //This will be handled later
                }  else {
                    if (client.id === room.owner) {
                        socket.sockets.in(client.room).emit("owner-removed-room", "The owner (" +people[client.id].name + ") removed the room.");
                        var i = 0;
                        while(i < clients.length) {
                            if(clients[i].id === room.people[i]) {
                                people[clients[i].id].inroom = null;
                                clients[i].leave(room.name);
                            }
                            ++i;
                        }
                        delete rooms[id];
                        people[room.owner].owns = null;
                    }
                }
            } else {
                client.emit("not-room-owner", "Only the owner can remove a room.");
            }
        }
    });
    
    client.on("disconnect", function() {  
        if (people[client.id]) {
            if (people[client.id].inroom === null) {
                delete people[client.id];
            } else {
                if (people[client.id].owns !== null) {
                    var room = rooms[people[client.id].owns];
                    if (client.id === room.owner) {
                        var i = 0;
                        while(i < clients.length) {
                            if (clients[i].id === room.people[i]) {
                                people[clients[i].id].inroom = null;
                                clients[i].leave(room.name);
                            }
                            ++i;
                        }
                        delete rooms[people[client.id].owns];
                    }
                }
                delete people[client.id];
            }
            socket.sockets.emit("client-left", people[client.id].name + " has left the server.");
            socket.sockets.emit("update-people", people);
        }
    });
    
});