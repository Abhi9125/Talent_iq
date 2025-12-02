import { Inngest } from "inngest";
import { connectDB } from "./db.js";
import User from "../models/User.js";

export const inngest = new Inngest({ id: "talent-iq" });

// Your new function:
const newUser = inngest.createFunction(
  { id: "user-created" },
  { event: "clerk/user.created" },
  async ({ event }) => {
    await connectDB();

    const { id, first_name, last_name, image_url, email_addresses } =
      event.data;

    console.log(
      `id - ${id} , first_name - ${first_name}, last_name - ${last_name}, image_url - ${image_url}, email_addresses - ${email_addresses}`
    );
    await User.create({
      clerkId: id,
      profilePic: image_url,
      name: `${first_name || ""} ${last_name || ""}`,
      email: email_addresses[0]?.email_address,
    });
  }
);

const deleteUser = inngest.createFunction(
  { id: "delete-user-from-mongodb" },
  { event: "clerk/user.deleted" },

  async ({ event }) => {
    await connectDB();

    const { id } = event.data;

    await User.deleteOne({
      clerkId: id,
    });
  }
);

// Add the function to the exported array:
export const functions = [newUser, deleteUser];
