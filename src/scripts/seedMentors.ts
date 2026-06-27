/**
 * Mentor (Instructor) Seed Script
 * Inserts 5 mentors with full information into the `instructors` collection.
 *
 * Usage: npx ts-node src/scripts/seedMentors.ts
 */

import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

import mongoose from 'mongoose';

const MONGO_URI = process.env.DATABASE_URL!;

const mentors = [
    {
        name: 'Sakib Hasan',
        designation: 'Senior Full-Stack Developer & Lead Mentor',
        subject: 'Full-Stack Web Development',
        bio: 'Sakib has 8+ years of experience building scalable web applications with the MERN stack.',
        details:
            'Sakib is a passionate full-stack engineer who has spent the last 8 years building and scaling web products. He has trained over 2000 students and specializes in turning absolute beginners into confident, job-ready developers. His teaching focuses on real-world projects, clean architecture, and the mindset needed to thrive in the industry.',
        lifeJourney:
            'Coming from a small town with limited resources, Sakib taught himself to code on a borrowed laptop. After landing his first remote job, he dedicated himself to helping others walk the same path — proving that with consistency and the right guidance, anyone can build a career in tech.',
        image: 'https://randomuser.me/api/portraits/men/32.jpg',
        email: 'sakib.hasan@techlight.com',
        phone: '+8801711000001',
        socialLinks: {
            facebook: 'https://facebook.com/sakibhasan.dev',
            twitter: 'https://twitter.com/sakibhasan_dev',
            linkedin: 'https://linkedin.com/in/sakibhasan-dev',
            github: 'https://github.com/sakibhasan',
        },
        specialization: ['React', 'Node.js', 'MongoDB', 'TypeScript', 'Next.js'],
        education: [
            'B.Sc in Computer Science & Engineering, BUET',
            'Professional Diploma in Cloud Architecture',
        ],
        workExperience: [
            'Lead Engineer at Pathao (2021 - Present)',
            'Senior Developer at Brain Station 23 (2018 - 2021)',
            'Full-Stack Developer at Cefalo (2016 - 2018)',
        ],
        trainingExperience: { years: '8', students: '2000' },
        isActive: true,
        isDeleted: false,
    },
    {
        name: 'Nusrat Jahan',
        designation: 'UI/UX Designer & Frontend Mentor',
        subject: 'UI/UX & Frontend Engineering',
        bio: 'Nusrat is a product designer passionate about user-centered design.',
        details:
            'With a strong background in Figma, design systems and accessibility, Nusrat helps students craft beautiful, usable interfaces. She bridges the gap between design and development, teaching how to translate ideas into pixel-perfect, accessible products that users love.',
        lifeJourney:
            'Nusrat started as a self-taught graphic designer and gradually fell in love with product thinking. Today she mentors the next generation of designers, encouraging them to design with empathy and ship with confidence.',
        image: 'https://randomuser.me/api/portraits/women/44.jpg',
        email: 'nusrat.jahan@techlight.com',
        phone: '+8801711000002',
        socialLinks: {
            facebook: 'https://facebook.com/nusrat.designs',
            twitter: 'https://twitter.com/nusrat_ux',
            linkedin: 'https://linkedin.com/in/nusrat-jahan-ux',
            github: 'https://github.com/nusratjahan',
        },
        specialization: ['UI/UX', 'Figma', 'Design Systems', 'Tailwind CSS', 'HTML/CSS'],
        education: [
            'BBA in Marketing, University of Dhaka',
            'Google UX Design Professional Certificate',
        ],
        workExperience: [
            'Lead Product Designer at Shohoz (2020 - Present)',
            'UI/UX Designer at Kona Software Lab (2017 - 2020)',
        ],
        trainingExperience: { years: '6', students: '1500' },
        isActive: true,
        isDeleted: false,
    },
    {
        name: 'Tanvir Ahmed',
        designation: 'Backend Engineer & DevOps Mentor',
        subject: 'Backend & Cloud Engineering',
        bio: 'Tanvir is a backend specialist who loves clean architecture and reliable systems.',
        details:
            'Tanvir mentors students on APIs, databases, Docker and cloud deployment from zero to production. He believes in building systems that are simple, observable and resilient, and he loves demystifying the "scary" backend topics for newcomers.',
        lifeJourney:
            'Tanvir began his career as a support engineer, fixing production fires at 3 AM. Those battle scars shaped him into a backend mentor who teaches not just how to build, but how to keep things running reliably at scale.',
        image: 'https://randomuser.me/api/portraits/men/65.jpg',
        email: 'tanvir.ahmed@techlight.com',
        phone: '+8801711000003',
        socialLinks: {
            facebook: 'https://facebook.com/tanvir.codes',
            twitter: 'https://twitter.com/tanvir_dev',
            linkedin: 'https://linkedin.com/in/tanvir-ahmed-backend',
            github: 'https://github.com/tanvirahmed',
        },
        specialization: ['Express.js', 'PostgreSQL', 'Docker', 'AWS', 'REST API'],
        education: [
            'B.Sc in Software Engineering, SUST',
            'AWS Certified Solutions Architect',
        ],
        workExperience: [
            'Senior Backend Engineer at Bkash (2019 - Present)',
            'DevOps Engineer at Dohatec (2016 - 2019)',
        ],
        trainingExperience: { years: '7', students: '1800' },
        isActive: true,
        isDeleted: false,
    },
    {
        name: 'Fatema Akter',
        designation: 'Data Scientist & Python Mentor',
        subject: 'Data Science & Machine Learning',
        bio: 'Fatema works at the intersection of data and decision-making.',
        details:
            'Fatema teaches Python, data analysis and the fundamentals of machine learning in a clear, practical, project-driven way. She helps students move beyond tutorials and build real data products that solve genuine problems.',
        lifeJourney:
            'Fatema discovered her love for data during her university research, where she realized numbers could tell powerful stories. She now mentors aspiring data scientists, helping them turn curiosity into careers.',
        image: 'https://randomuser.me/api/portraits/women/68.jpg',
        email: 'fatema.akter@techlight.com',
        phone: '+8801711000004',
        socialLinks: {
            facebook: 'https://facebook.com/fatema.data',
            twitter: 'https://twitter.com/fatema_ds',
            linkedin: 'https://linkedin.com/in/fatema-akter-ds',
            github: 'https://github.com/fatemaakter',
        },
        specialization: ['Python', 'Pandas', 'Machine Learning', 'Data Analysis', 'SQL'],
        education: [
            'M.Sc in Statistics, University of Dhaka',
            'DeepLearning.AI Machine Learning Specialization',
        ],
        workExperience: [
            'Data Scientist at Grameenphone (2020 - Present)',
            'Data Analyst at Robi Axiata (2017 - 2020)',
        ],
        trainingExperience: { years: '6', students: '1200' },
        isActive: true,
        isDeleted: false,
    },
    {
        name: 'Arif Mahmud',
        designation: 'Mobile App Developer & Flutter Mentor',
        subject: 'Cross-Platform Mobile Development',
        bio: 'Arif builds beautiful, high-performance mobile apps for millions of users.',
        details:
            'Arif specializes in Flutter and React Native, helping students ship cross-platform apps to both the Play Store and App Store. His sessions focus on real app architecture, state management and publishing — everything needed to launch a production-ready mobile product.',
        lifeJourney:
            'Arif built his first app to solve a problem in his own neighborhood. Watching strangers use something he created sparked a lifelong passion for mobile development — a spark he now passes on to every student he mentors.',
        image: 'https://randomuser.me/api/portraits/men/52.jpg',
        email: 'arif.mahmud@techlight.com',
        phone: '+8801711000005',
        socialLinks: {
            facebook: 'https://facebook.com/arif.flutter',
            twitter: 'https://twitter.com/arif_mobile',
            linkedin: 'https://linkedin.com/in/arif-mahmud-mobile',
            github: 'https://github.com/arifmahmud',
        },
        specialization: ['Flutter', 'Dart', 'React Native', 'Firebase', 'REST API'],
        education: [
            'B.Sc in Computer Science, AIUB',
            'Google Associate Android Developer Certification',
        ],
        workExperience: [
            'Lead Mobile Engineer at Chaldal (2021 - Present)',
            'Mobile Developer at Sheba.xyz (2018 - 2021)',
        ],
        trainingExperience: { years: '5', students: '1000' },
        isActive: true,
        isDeleted: false,
    },
];

const seedMentors = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('✅ Connected to MongoDB');

        const db = mongoose.connection.db;
        const instructors = db.collection('instructors');

        const now = new Date();
        let created = 0;
        let updated = 0;

        for (const m of mentors) {
            const exists = await instructors.findOne({ email: m.email });
            if (exists) {
                await instructors.updateOne(
                    { email: m.email },
                    { $set: { ...m, updatedAt: now } }
                );
                console.log(`🔄 Updated (already existed): ${m.name}`);
                updated++;
                continue;
            }
            await instructors.insertOne({ ...m, createdAt: now, updatedAt: now });
            console.log(`✅ Created mentor: ${m.name}`);
            created++;
        }

        console.log('');
        console.log(`🎉 Done. Created: ${created}, Updated: ${updated}`);

        await mongoose.disconnect();
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
};

seedMentors();
