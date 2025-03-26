import mongoose, { CallbackError, Schema } from "mongoose";
import { compare, hash } from "bcrypt";
const UserSchema = new Schema<IUser>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    gamesRight: {
      type: Number,
      required: false,
      default: 0,
    },
    gamesWrong: {
      type: Number,
      required: false,
      default: 0,
    },
    percentRight: {
      type: Number,
      required: false,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    return next();
  }
  try {
    const saltRounds = 8;
    const hashed = await hash(this.password, saltRounds);
    this.password = hashed;
    next();
  } catch (err) {
    next(err as CallbackError);
  }
});

UserSchema.methods.comparePassword = async function (
  candidatePassword: string
) {
  return compare(candidatePassword, this.password);
};

export interface IUser {
  name: string;
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
  comparePassword(candidatePassword: string): Promise<boolean>;
  gamesRight: number;
  gamesWrong: number;
  percentRight: number;
}

const User = mongoose.model<IUser>("User", UserSchema);

export default User;
