import { Schema, model } from "mongoose";

const ReplySchema = new Schema(
  {
    id : {
      type : String,
      required : true,
    },
    author_id: {
      type: String,
      required: true,
    },
    author_name : {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
    parent_comment_id : {
      type : String,
      required : true,
    },
    depth : {
      type : Number,
      required : true,
      default : 1,
    }
  },
  {
    timestamps: true,
  }
);

const ReplyModel = model("Reply", ReplySchema);

export { ReplySchema, ReplyModel };
