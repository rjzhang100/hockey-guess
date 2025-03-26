import mongoose, { Schema, Types } from "mongoose";

const VoteSchema = new Schema({
  gameId: {
    type: String,
    required: true,
  },
  userId: {
    type: Types.ObjectId,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
  votedFor: {
    type: String,
    required: true,
  },
  voteCounted: {
    type: Boolean,
    required: true,
  },
  createdAt: {
    type: String,
    default: Date.now(),
    expires: 3 * 24 * 60 * 60,
  },
});

export interface IVote {
  gameId: string;
  userId: Types.ObjectId;
  userName: string;
  votedFor: string;
  voteCounted: boolean;
}

const Vote = mongoose.model<IVote>("Vote", VoteSchema);

export default Vote;
