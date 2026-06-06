// ===================================================================
// Techlight IT Institute LMS - Certificate Batch Service
// Business logic for the certificate-only batch.
// ===================================================================

import { ICertificateBatch, ICertificateBatchFilters } from './certificateBatch.interface';
import { CertificateBatch } from './certificateBatch.model';
import { Certificate } from '../certificate/certificate.model';
import AppError from '../../utils/AppError';

const createBatch = async (payload: Partial<ICertificateBatch>): Promise<ICertificateBatch> => {
    const batch = await CertificateBatch.create({
        ...payload,
        startDate: payload.startDate ? new Date(payload.startDate) : undefined,
        endDate: payload.endDate ? new Date(payload.endDate) : undefined,
    });
    return batch;
};

const getAllBatches = async (
    filters: ICertificateBatchFilters
): Promise<ICertificateBatch[]> => {
    const { isActive, searchTerm } = filters;
    const query: Record<string, unknown> = {};

    if (typeof isActive === 'boolean') query.isActive = isActive;

    if (searchTerm) {
        query.$or = [
            { batchName: { $regex: searchTerm, $options: 'i' } },
            { batchNumber: { $regex: searchTerm, $options: 'i' } },
            { mentorName: { $regex: searchTerm, $options: 'i' } },
            { courseName: { $regex: searchTerm, $options: 'i' } },
        ];
    }

    return CertificateBatch.find(query).sort({ createdAt: -1 });
};

const getBatchById = async (id: string): Promise<ICertificateBatch> => {
    const batch = await CertificateBatch.findById(id);
    if (!batch) {
        throw new AppError(404, 'Batch not found');
    }
    return batch;
};

const updateBatch = async (
    id: string,
    payload: Partial<ICertificateBatch>
): Promise<ICertificateBatch> => {
    const data: Record<string, unknown> = { ...payload };
    if (payload.startDate) data.startDate = new Date(payload.startDate);
    if (payload.endDate) data.endDate = new Date(payload.endDate);

    const batch = await CertificateBatch.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    });
    if (!batch) {
        throw new AppError(404, 'Batch not found');
    }
    return batch;
};

const deleteBatch = async (id: string): Promise<ICertificateBatch> => {
    // Block deletion if certificates are linked to this batch
    const linked = await Certificate.countDocuments({ certificateBatch: id });
    if (linked > 0) {
        throw new AppError(
            400,
            `Cannot delete this batch. ${linked} certificate(s) are linked to it.`
        );
    }

    const batch = await CertificateBatch.findByIdAndDelete(id);
    if (!batch) {
        throw new AppError(404, 'Batch not found');
    }
    return batch;
};

export const CertificateBatchService = {
    createBatch,
    getAllBatches,
    getBatchById,
    updateBatch,
    deleteBatch,
};
