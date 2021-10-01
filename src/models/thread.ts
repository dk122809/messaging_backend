import mongoose, { Document, PopulatedDoc, Schema } from "mongoose";
import { UserDocument } from "./user";

export interface ThreadDocument extends Document {
  is_group: String;
  group_name: String;
  participants: PopulatedDoc<UserDocument & Document>;
}

const threadSchema: Schema = new Schema({
  is_group: {
    type: Boolean,
    default: false,
    required: true,
  },
  group_name: {
    type: String,
    default: null,
  },
  participants: [{ type: "ObjectId", ref: "User" }],
},{
  timestamps: true
});

const Thread = mongoose.model<ThreadDocument>("Thread", threadSchema);
export default Thread;
