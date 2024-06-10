import mongoose from "mongoose";
import keys from "../config/keys.js";
import chalk from "chalk";
const { url } = keys.database

export async function ConnectToMongoDB() {
    try {
        // mongoose.set('useCreateIndex', true);
        await mongoose.connect(url)
        // console.log("Connected to MongoDB ");
        console.log(`${chalk.green('✓')} ${chalk.blue('Connected to MongoDB !')}`)

    } catch (error) {
        console.log(`${chalk.red('Error Connecting to MongoDB')}  ${chalk.redBright(error.message)}`)
    }
};

