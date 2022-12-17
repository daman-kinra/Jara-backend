import { Schema, model } from "mongoose";

const ticketsSchema = new Schema(
  {
    type: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    ticketID: {
      type: String,
      required: true,
    },
    projectID: {
      type: Schema.Types.ObjectId,
      ref: "projects",
      required: true,
    },
    creator: {
      type: Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    attachments: [
      {
        type: String,
      },
    ],
    status: {
      type: String,
      required: true,
    },
    assignedTo: [
      {
        type: Schema.Types.ObjectId,
        required: true,
        ref: "users",
      },
    ],
    priority: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
const Tickets = model("tickets", ticketsSchema);
export default Tickets;
