import mongoose, { Mongoose } from 'mongoose';

const MANGODB_URL =process.env.MANGODB_URL;

interface MongooseConnection{ 
conn: Mongoose | null;
promise: Promise<Mongoose> | null;

}

let cached: MongooseConnection = (global as any).mongoose
if (!cached){    
    cached = (global as any ).mongoose = {
        conn: null, promise: null 
    }
}

export const connectToDatabase = async () => {
    if (cached.conn) return cached.conn;
    
    if (!MANGODB_URL) throw new Error('Missing MANGODB_URL');

cached.promise =cached.promise || mongoose.connect (MANGODB_URL,{dbName:'Youngnakal',bufferCommands: false  })

cached.conn = await cached.promise;

return cached.conn 
}