import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

/**
 * One-off fix: the `designs` collection carries a stale unique index
 * `section_1` left over from a previously-removed module. It rejects new
 * documents (e.g. the 'home' doc) because they all have section=null.
 * This script drops any leftover index that is NOT the ones we actually use.
 */
async function run() {
    const url = process.env.DATABASE_URL;
    if (!url) throw new Error('DATABASE_URL not found in .env');

    await mongoose.connect(url);
    const db = mongoose.connection.db;
    if (!db) throw new Error('No db handle');

    const collection = db.collection('designs');
    const indexes = await collection.indexes();
    console.log('Current indexes:', indexes.map((i) => i.name));

    // Keep only the default _id index and the key index. Drop everything else.
    const keep = new Set(['_id_', 'key_1']);
    for (const idx of indexes) {
        if (idx.name && !keep.has(idx.name)) {
            try {
                await collection.dropIndex(idx.name);
                console.log(`✅ Dropped stale index: ${idx.name}`);
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

run().catch((e) => {
    console.error(e);
    process.exit(1);
});
