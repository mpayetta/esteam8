/**
 * Parameters:
 *  - room name
 *  - room id
 *  - room owner (scrum master)
 *  - deckType (optional): classic, tshirt, fibbo
 */
function Room(name, id, owner, deckType) {  
    this.name = name;
    this.id = id;
    this.owner = owner;
    if (deckType) {
        this.deckType = deckType;
    }
    else {
        this.deckType = 'classic';
    }
    this.people = [];
    this.status = "available";
};

Room.prototype.addPerson = function(personId) {  
    if (this.status === "available") {
        this.people.push(personId);
    }
};

module.exports = Room;  
