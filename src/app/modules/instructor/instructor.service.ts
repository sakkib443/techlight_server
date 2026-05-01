import { IInstructor } from './instructor.interface';
import { Instructor } from './instructor.model';

const createInstructor = async (payload: IInstructor): Promise<IInstructor> => {
    // Sanitize specialization if it comes as a string
    if (typeof payload.specialization === 'string') {
        payload.specialization = (payload.specialization as string).split(',').map(s => s.trim()).filter(s => s !== '');
    }

    // Sanitize user field to prevent Mongoose CastError if it's an empty string
    if ((payload.user as any) === '' || (payload.user as any) === 'none' || payload.user === undefined) {
        payload.user = null as any;
    }
    const result = await Instructor.create(payload);
    return result;
};

const getAllInstructors = async (filters: any): Promise<IInstructor[]> => {
    const { searchTerm, ...filterData } = filters;
    const query: any = { ...filterData, isDeleted: false };

    if (searchTerm) {
        query.$or = [
            { name: { $regex: searchTerm, $options: 'i' } },
            { designation: { $regex: searchTerm, $options: 'i' } },
            { specialization: { $elemMatch: { $regex: searchTerm, $options: 'i' } } },
        ];
    }

    const result = await Instructor.find(query).sort({ createdAt: -1 });
    return result;
};

const getSingleInstructor = async (id: string): Promise<IInstructor | null> => {
    const result = await Instructor.findById(id).populate('user');
    return result;
};

const updateInstructor = async (id: string, payload: Partial<IInstructor>): Promise<IInstructor | null> => {
    // Sanitize specialization if it comes as a string
    if (typeof payload.specialization === 'string') {
        payload.specialization = (payload.specialization as string).split(',').map(s => s.trim()).filter(s => s !== '');
    }

    // Sanitize user field
    if ((payload.user as any) === '' || (payload.user as any) === 'none' || payload.user === null || payload.user === undefined) {
        payload.user = null as any;
    }
    const result = await Instructor.findByIdAndUpdate(id, payload, {
        new: true,
        runValidators: true,
    });
    return result;
};

const deleteInstructor = async (id: string): Promise<IInstructor | null> => {
    const result = await Instructor.findByIdAndUpdate(
        id,
        { isDeleted: true },
        { new: true }
    );
    return result;
};

export const InstructorService = {
    createInstructor,
    getAllInstructors,
    getSingleInstructor,
    updateInstructor,
    deleteInstructor,
};
