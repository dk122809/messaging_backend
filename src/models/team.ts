import mongoose, { Document, PopulatedDoc, Schema } from "mongoose";
import { UserDocument } from "./user";

export interface TeamDocument extends Document {
  name: String;
  team_lead: PopulatedDoc<UserDocument & Document>;
  member: PopulatedDoc<UserDocument & Document>;
}

const teamSchema: Schema = new Schema(
  {
    name: {
      type: String,
      maxlength: 128,
      unique: true,
      index: true,
      trim: true,
      required: true,
    },
    image: {
      type: String,
    },
    team_lead: { type: "ObjectId", ref: "User" },
    member: [{ type: "ObjectId", ref: "User" }],
  },
  {
    timestamps: true,
  }
);

const Team = mongoose.model<TeamDocument>("Team", teamSchema);
export default Team;
