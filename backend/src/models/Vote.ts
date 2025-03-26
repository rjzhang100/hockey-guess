import mongoose, { Schema, Types } from "mongoose";

const VoteSchema = new Schema({
  gameHash: {
    type: String,
    required: true,
    unique: true,
  },
  userId: {
    type: Types.ObjectId,
    required: true,
  },
  votedFor: {
    type: String,
    required: true,
  },
});

export interface IVote {
  gameHash: string;
  userId: Types.ObjectId;
  votedFor: string;
}

const Vote = mongoose.model<IVote>("Vote", VoteSchema);

export default Vote;
