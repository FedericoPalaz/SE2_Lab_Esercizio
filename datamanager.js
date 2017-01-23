//list of participants
var List = [
    ["Pippo", "Inzaghi"],
    ["Luca", "Gramola"],
];

function cerca(nome,cognome){
    
    //if it is already present increment number
    for (i=0; i < List.length; i++){
            if (List[i][0] == nome && List[i][1]==cognome)
                {
                    return 1;//stop here if found
                }
	
        }
	return 0;
}

//export functions
exports.cerca = cerca; 
