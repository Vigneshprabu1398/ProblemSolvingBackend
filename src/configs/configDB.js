const mongoose = require("mongoose")

let intialStringDB = " ";
const connectToDatabase = async (connectDB) => {
    let dbConnectionString = connectDB;
    if (intialStringDB == " " || intialStringDB !== connectDB) {
        intialStringDB = connectDB;
        try {
            await mongoose.disconnect();

            // Reuse existing connection if available
            if (mongoose.connection.readyState !== 0) {
                console.log("Reusing existing database connection");
                return;
            }

            // Connect to the database
            await mongoose.connect(dbConnectionString, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            });

            console.log(`Connected to ${dbConnectionString}`);
        } catch (error) {
            if (error instanceof mongoose.Error) {
                console.error("Mongoose error:", error.message);
            } else {
                console.error("Error connecting to the database:", error.message);
            }
            throw error;
        }
    }
};

module.exports = connectToDatabase;