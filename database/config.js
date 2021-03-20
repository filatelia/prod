const mongoose = require('mongoose');


const dbConnection = async() => {
    DB_CNN=
    process.env.DB_CNN
    try {
        //console.log( 'mongodb+srv://'+process.env.US+':'+process.env.PS+'@cluster0.4io1z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
        
        //var dev="mongodb://127.0.0.1:27017/carte"

        await mongoose.connect( "mongodb://127.0.0.1:27017/subasta"  , {
            useNewUrlParser: true, 
            useUnifiedTopology: true,
            useCreateIndex: true,
           
            useFindAndModify: false

        });
        // await mongoose.connect( 'mongodb+srv://'+process.env.US+':'+process.env.PS+'@cluster0.4io1z.mongodb.net/myFirstDatabase?retryWrites=true&w=majority'  , {
        //     useNewUrlParser: true, 
        //     useUnifiedTopology: true,
        //     useCreateIndex: true,
           
        //     useFindAndModify: false

        // });

        console.log('DB Online');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error a la hora de iniciar la BD ver logs');
    }


}


module.exports = {
    dbConnection
}