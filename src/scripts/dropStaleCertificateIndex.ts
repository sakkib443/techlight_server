import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

/**
 * One-off fix: the `certificates` collection carries stale indexes
 * (e.g. unique `student_1_course_1`) left over from a previous schema that
 * referenced registered users/courses. The current standalone certificate
 * has no `student`/`course` fields, so every doc is {student:null,course:null}
 * and the unique index rejects the 2nd certificate. Drop any index whose key
 * references fields not used by the current schema.
 */
const VALID_KEYS = new Set([
    '_id', 'certificateNumber', 'studentId', 'issueDate',
    'studentName', 'phone', // text index components
    '_fts', '_ftsx',         // mongo text index internals
]);

async function run() {
    await mongoose.connect(process.env.DATABASE_URL as string);
    const db = mongoose.connection.db;
    if (!db) throw new Error('no db');

    const collection = db.collection('certificates');
    const indexes = await collection.indexes();
    console.log('Current indexes:', indexes.map((i) => i.name));

    for (const idx of indexes) {
        if (idx.name === '_id_') continue;
        const keys = Object.keys(idx.key || {});
        const hasStaleKey = keys.some((k) => !VALID_KEYS.has(k));
        if (hasStaleKey) {
            try {
                await collection.dropIndex(idx.name as string);
                console.log(`✅ Dropped stale index: ${idx.name} (keys: ${keys.join(', ')})`);
            } catch (e: any) {
                console.log(`⚠️  Could not drop ${idx.name}: ${e.message}`);
            }
        }
    }

    const after = await collection.indexes();
    console.log('Indexes after cleanup:', after.map((i) => i.name));
    await mongoose.disconnect();
    console.log('Done.');
}

run().catch((e) => { console.error(e); process.exit(1); });
