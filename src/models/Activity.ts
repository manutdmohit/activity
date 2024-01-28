import mongoose, { Document, Schema } from 'mongoose';

interface IActivity extends Document {
  description: string;
  date: Date;
}

const activitySchema = new Schema<IActivity>(
  {
    description: {
      type: String,
      required: [true, 'Please provide description of the activity'],
    },
  },
  {
    timestamps: true,
  }
);

const Activity = mongoose.model<IActivity>('Activity', activitySchema);

export default Activity;
