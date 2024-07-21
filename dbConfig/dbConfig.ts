import mongoose from "mongoose";

export async function connectToDb() {
  try {
    await mongoose.connect(process.env.MONGO_URI ? process.env.MONGO_URI : "");
    const connection = mongoose.connection;

    connection.on("connected", () => console.log("MongoDB Connected!"));
    connection.on("error", (err) =>
      console.log("MongoDB Connection Error: ", err)
    );
  } catch (error: any) {
    console.log(
      "The following ERROR occurred while connection to MongoDB: ",
      error
    );
  }
}
