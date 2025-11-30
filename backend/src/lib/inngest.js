import { Inngest } from "inngest";
import { connectDB } from "./db.js";
import User from "../models/User.js";

export const inngest = new Inngest({ id: "my-app" });

// Your new function:
const newUser = inngest.createFunction(
  {
    id: "sync-user",
  },
  { event: "clerk/user.created" },

  async ({ event }) => {
    await connectDB();
    const { user } = event.data;

    const { id, first_name, last_name, image_url, email_addresses } = user;

    await User.create({
      clearId: id,
      profilePic: image_url,
      name: `${first_name || ""} ${last_name || ""}`,
      email: email_addresses[0].email_addresses,
    });
  }
);

const deleteUser = inngest.createFunction(
  {
    id: "delete-user",
  },
  { event: "clerk/user.deleted" },

  async ({ event }) => {
    await connectDB();

    const { user } = event.data;

    const { id } = user;

    await User.deleteOne({
      clerkId: id,
    });
  }
);

// Add the function to the exported array:
export const functions = [newUser, deleteUser];
