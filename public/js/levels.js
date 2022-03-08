let levels = {

    eMapNameForLevel: function(level) {

        switch (level) {

            case 1:
                return 'arid';
            case 2:
                return 'wood';
            case 3:
                return 'space';

        }
    
    },
    
    eMapFormatForLevel: function(level) {
    
        switch (level) {

            case 1:
                return 'png';
            case 2:
                return 'jpg';
            case 3:
                return 'png';
                
        }
    
    },

};

export {levels}