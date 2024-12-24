import mongoose, { Mongoose } from "mongoose";

// Pastikan variabel lingkungan sudah diatur
const MONGODB_URL = process.env.MANGODB_URL;

if (!MONGODB_URL) {
  throw new Error("Missing MANGODB_URL");
}

// Definisikan tipe untuk cached koneksi
interface MongooseConnection {
  conn: Mongoose | null;
  promise: Promise<Mongoose> | null;
}

// Gunakan deklarasi tipe eksplisit untuk cached
declare global {
  // Menambahkan properti global untuk Node.js
  var mongoose: MongooseConnection | undefined;
}

// Cache untuk koneksi agar tidak membuat koneksi baru setiap kali
let cached: MongooseConnection = global.mongoose || {
  conn: null,
  promise: null,
};

global.mongoose = cached;

export const connectToDatabase = async (): Promise<Mongoose> => {
  if (cached.conn) {
    return cached.conn;
  }

  if (!cached.promise) {
    cached.promise = mongoose.connect(MONGODB_URL, {
      dbName: "Youngnakal",
      bufferCommands: false,
    });
  }

  cached.conn = await cached.promise;
  return cached.conn;
};
