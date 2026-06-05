import { Schema, model } from 'mongoose';
import { IDesign } from './design.interface';

const designSchema = new Schema<IDesign>(
    {
        key: { type: String, required: true, unique: true, index: true },
        contactContent: {
            type: Schema.Types.Mixed,
            default: {},
        },
        heroContent: {
            type: Schema.Types.Mixed,
            default: {},
        },
        provideContent: {
            type: Schema.Types.Mixed,
            default: {},
        },
    },
    {
        timestamps: true,
        minimize: false,
    }
);

export const Design = model<IDesign>('Design', designSchema);
