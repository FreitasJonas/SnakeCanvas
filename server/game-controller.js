module.exports = {
    getParans: function () {

        let columns = 30;
        let lines = 50;
        let cel_size = 12;
    
        return { 
            COLUMNS: columns,
            LINES: lines,
            CEL_SIZE: cel_size,
            WIDTH: cel_size * columns,
            HEIGHT: cel_size * lines,
        
            BG_COLOR: "#000000",
            CEL_COLOR: "#C0C0C0",
            APPLE_COLOR: "#d12300",
        
            DIFICULTY: 10
        }
    }    
  };