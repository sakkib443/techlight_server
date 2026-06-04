/**
 * Website-focused Blog Seed Script
 * Creates 5 high-quality blog posts about website design, development & optimization.
 *
 * Usage: npx ts-node src/scripts/seedWebsiteBlogs.ts
 */

import dotenv from 'dotenv';
import path from 'path';

dotenv.config({ path: path.join(__dirname, '../../.env') });

import mongoose from 'mongoose';

const MONGO_URI = process.env.DATABASE_URL!;

const seedWebsiteBlogs = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('✅ Connected to MongoDB');

        const db = mongoose.connection.db;
        const blogsCollection = db.collection('blogs');
        const usersCollection = db.collection('users');
        const categoriesCollection = db.collection('categories');

        // 1. Find admin user
        const adminUser = await usersCollection.findOne({ role: 'admin' });
        if (!adminUser) {
            console.error('❌ Admin user not found. Run seedAdmin first.');
            process.exit(1);
        }
        console.log(`📧 Admin found: ${adminUser.email}`);

        // 2. Get or create "Web Development" category
        let webCategory = await categoriesCollection.findOne({ slug: 'web-development' });
        if (!webCategory) {
            const result = await categoriesCollection.insertOne({
                name: 'Web Development',
                nameBn: 'ওয়েব ডেভেলপমেন্ট',
                slug: 'web-development',
                description: 'Website design, development and optimization articles',
                descriptionBn: 'ওয়েবসাইট ডিজাইন, ডেভেলপমেন্ট ও অপটিমাইজেশন আর্টিকেল',
                type: 'course',
                isActive: true,
                order: 1,
                createdAt: new Date(),
                updatedAt: new Date(),
            });
            webCategory = { _id: result.insertedId };
            console.log('📂 Created "Web Development" category');
        } else {
            console.log('📂 Using existing "Web Development" category');
        }

        // 3. Remove previous website-themed seed blogs (idempotent)
        const removed = await blogsCollection.deleteMany({
            slug: { $regex: /^website-blog-/ }
        });
        if (removed.deletedCount > 0) {
            console.log(`🗑️  Removed ${removed.deletedCount} old website blog(s)`);
        }

        // 4. Build 5 professional, website-focused blogs
        const now = new Date();
        const daysAgo = (n: number) => new Date(now.getTime() - n * 24 * 60 * 60 * 1000);

        const websiteBlogs = [
            {
                title: 'Modern Website Design Trends That Will Dominate 2026',
                titleBn: '২০২৬ সালের আধুনিক ওয়েবসাইট ডিজাইন ট্রেন্ড',
                slug: 'website-blog-modern-design-trends-2026',
                excerpt: 'From bento grids to AI-powered personalization — discover the website design trends that are reshaping the digital landscape in 2026.',
                excerptBn: 'বেন্টো গ্রিড থেকে শুরু করে AI-চালিত পার্সোনালাইজেশন — ২০২৬ সালে ডিজিটাল ল্যান্ডস্কেপ পাল্টে দেওয়া ওয়েবসাইট ডিজাইন ট্রেন্ডগুলো জানুন।',
                content: `
                    <h2>Why Design Trends Matter</h2>
                    <p>Your website is often the first interaction a customer has with your brand. Staying current with design trends ensures your site feels modern, trustworthy, and user-friendly. In 2026, websites are expected to be more interactive, personalized, and faster than ever before.</p>

                    <h2>1. Bento Grid Layouts</h2>
                    <p>Inspired by Japanese bento boxes, this layout style uses asymmetric grid boxes to organize content. It's visually striking and helps users scan information quickly. Apple, Microsoft, and Linear have all adopted this trend.</p>

                    <h2>2. Glassmorphism &amp; Frosted UI</h2>
                    <p>Frosted glass effects with subtle blur and transparency create depth without being heavy. Combined with vivid gradients, this style brings a futuristic feel to dashboards and landing pages.</p>

                    <h2>3. AI-Powered Personalization</h2>
                    <p>Modern websites adapt content based on user behavior, location, and preferences in real time. From dynamic hero sections to product recommendations, AI is making the web feel one-on-one.</p>

                    <h2>4. Bold Typography as Hero Elements</h2>
                    <p>Big, expressive typography is replacing traditional hero images. Variable fonts, animated text, and creative pairings turn copy itself into a design statement.</p>

                    <h2>5. Micro-Interactions &amp; Scroll Animations</h2>
                    <p>Subtle hover effects, scroll-triggered reveals, and smooth page transitions make websites feel alive. Tools like Framer Motion and GSAP make these animations easy to implement.</p>

                    <h2>6. Dark Mode by Default</h2>
                    <p>Dark mode is no longer an option — it's expected. Many sites are launching with dark-first designs and offering a light toggle, especially for developer-focused products.</p>

                    <h2>Conclusion</h2>
                    <p>Trends come and go, but the underlying principles — clarity, accessibility, and delight — never change. Pick the trends that align with your brand, and don't chase what doesn't serve your audience.</p>
                `,
                contentBn: `
                    <h2>ডিজাইন ট্রেন্ড কেন গুরুত্বপূর্ণ</h2>
                    <p>আপনার ওয়েবসাইট প্রায়ই গ্রাহকের সাথে আপনার ব্র্যান্ডের প্রথম পরিচয়। আধুনিক ডিজাইন ট্রেন্ড অনুসরণ করলে আপনার সাইট আধুনিক ও ব্যবহারকারী-বান্ধব মনে হবে।</p>

                    <h2>১. বেন্টো গ্রিড লেআউট</h2>
                    <p>জাপানি বেন্টো বক্স থেকে অনুপ্রাণিত এই লেআউট অসমমিতিক গ্রিড ব্যবহার করে কন্টেন্ট সাজায় — দ্রুত স্ক্যানযোগ্য ও দৃষ্টিনন্দন।</p>

                    <h2>২. গ্লাসমরফিজম</h2>
                    <p>স্বচ্ছ ব্লার ও গ্রেডিয়েন্টের সংমিশ্রণে তৈরি ভবিষ্যৎ-ভিত্তিক UI।</p>

                    <h2>৩. AI-চালিত পার্সোনালাইজেশন</h2>
                    <p>ইউজারের আচরণ অনুযায়ী রিয়েল-টাইমে কন্টেন্ট পাল্টে যাওয়া।</p>

                    <h2>৪. বোল্ড টাইপোগ্রাফি</h2>
                    <p>হিরো ইমেজের পরিবর্তে বড়, এক্সপ্রেসিভ টাইপোগ্রাফি ব্যবহার।</p>

                    <h2>৫. মাইক্রো-ইন্টারেকশন</h2>
                    <p>হোভার ইফেক্ট, স্ক্রল অ্যানিমেশন — সাইটকে জীবন্ত করে তোলে।</p>

                    <h2>উপসংহার</h2>
                    <p>ট্রেন্ড আসবে যাবে, কিন্তু পরিষ্কার ডিজাইন ও অ্যাক্সেসিবিলিটির গুরুত্ব চিরকাল থাকবে।</p>
                `,
                thumbnail: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=1200&h=800&fit=crop&q=80',
                category: webCategory._id,
                tags: ['website design', 'web design trends', 'ui design', 'frontend', '2026'],
                author: adminUser._id,
                authorRole: 'admin',
                status: 'published',
                isFeatured: true,
                isPopular: true,
                allowComments: true,
                totalViews: 2840,
                likeCount: 156,
                likedBy: [],
                commentCount: 18,
                shareCount: 67,
                readingTime: 7,
                wordCount: 620,
                metaTitle: 'Modern Website Design Trends 2026 | Techlight IT',
                metaDescription: 'Discover the top website design trends shaping 2026 — bento grids, AI personalization, glassmorphism and more.',
                metaKeywords: ['website design', 'design trends', '2026', 'ui ux'],
                publishedAt: daysAgo(2),
                createdAt: daysAgo(2),
                updatedAt: daysAgo(2),
            },

            {
                title: 'Build a Fast, SEO-Friendly Website: A Complete 2026 Playbook',
                titleBn: 'দ্রুতগতি ও SEO-বান্ধব ওয়েবসাইট তৈরির সম্পূর্ণ গাইড',
                slug: 'website-blog-fast-seo-friendly-website',
                excerpt: 'Speed and SEO are no longer optional — they decide whether visitors stay or bounce. Here is a complete playbook for building lightning-fast, search-friendly websites.',
                excerptBn: 'গতি ও SEO এখন অপশনাল না — এগুলোই ঠিক করে ভিজিটর থাকবে কি বাউন্স করবে। দ্রুত, সার্চ-বান্ধব ওয়েবসাইট তৈরির সম্পূর্ণ গাইড।',
                content: `
                    <h2>Why Speed &amp; SEO Go Hand in Hand</h2>
                    <p>Google's Core Web Vitals make page experience a direct ranking factor. A slow website doesn't just lose visitors — it loses search visibility too. The good news: most performance and SEO wins come from the same set of best practices.</p>

                    <h2>Step 1: Choose the Right Stack</h2>
                    <p>Static-first frameworks like <strong>Next.js, Astro, and SvelteKit</strong> render HTML on the server, ship minimal JavaScript, and dominate the Lighthouse score. If your project allows, prefer SSG (Static Site Generation) over heavy SPAs.</p>

                    <h2>Step 2: Optimize Images Aggressively</h2>
                    <ul>
                        <li>Use modern formats: <code>WebP</code> and <code>AVIF</code></li>
                        <li>Serve responsive sizes via <code>srcset</code></li>
                        <li>Lazy-load below-the-fold images</li>
                        <li>Compress with <code>tinypng</code> or build pipelines</li>
                    </ul>

                    <h2>Step 3: Master Core Web Vitals</h2>
                    <p>Three numbers Google watches:</p>
                    <ul>
                        <li><strong>LCP (Largest Contentful Paint):</strong> &lt; 2.5s</li>
                        <li><strong>INP (Interaction to Next Paint):</strong> &lt; 200ms</li>
                        <li><strong>CLS (Cumulative Layout Shift):</strong> &lt; 0.1</li>
                    </ul>

                    <h2>Step 4: Semantic HTML &amp; Structured Data</h2>
                    <p>Use proper heading hierarchy, alt text on every image, and <code>JSON-LD</code> schema for articles, products, and FAQs. Search engines reward sites they can understand.</p>

                    <h2>Step 5: Set Up Technical SEO</h2>
                    <ul>
                        <li>Generate <code>sitemap.xml</code> automatically</li>
                        <li>Configure <code>robots.txt</code> correctly</li>
                        <li>Add canonical URLs to avoid duplicate content</li>
                        <li>Submit your site to Google Search Console</li>
                    </ul>

                    <h2>Step 6: Use a CDN &amp; Edge Caching</h2>
                    <p>Vercel, Cloudflare, and Netlify automatically cache assets at the edge. This single step can shave seconds off your load times for global users.</p>

                    <h2>Conclusion</h2>
                    <p>Performance is a feature. Treat every kilobyte and every millisecond as money — because that is what it costs you in conversions and rankings.</p>
                `,
                contentBn: `
                    <h2>গতি ও SEO কেন একসাথে চলে</h2>
                    <p>Google-এর Core Web Vitals পেজ এক্সপেরিয়েন্সকে সরাসরি র‍্যাঙ্কিং ফ্যাক্টর বানিয়েছে। ধীর সাইট ভিজিটর হারায়, সার্চ ভিজিবিলিটিও হারায়।</p>

                    <h2>স্টেপ ১: সঠিক স্ট্যাক বেছে নিন</h2>
                    <p>Next.js, Astro, SvelteKit-এর মতো ফ্রেমওয়ার্ক সার্ভারে HTML রেন্ডার করে — সবচেয়ে দ্রুত।</p>

                    <h2>স্টেপ ২: ইমেজ অপটিমাইজ করুন</h2>
                    <p>WebP/AVIF ফরম্যাট, lazy loading, responsive srcset ব্যবহার করুন।</p>

                    <h2>স্টেপ ৩: Core Web Vitals মাস্টার করুন</h2>
                    <p>LCP &lt; ২.৫s, INP &lt; ২০০ms, CLS &lt; ০.১ — এই তিন স্কোর সবসময় চেক করুন।</p>

                    <h2>স্টেপ ৪: টেকনিক্যাল SEO</h2>
                    <p>sitemap.xml, robots.txt, canonical URL, JSON-LD schema — এগুলো বাদ দেওয়া যাবে না।</p>

                    <h2>স্টেপ ৫: CDN ব্যবহার করুন</h2>
                    <p>Vercel, Cloudflare, Netlify গ্লোবাল edge caching দেয় — সেকেন্ড লোড টাইম কমায়।</p>

                    <h2>উপসংহার</h2>
                    <p>পারফরম্যান্স একটা ফিচার। প্রতিটা কিলোবাইট ও মিলিসেকেন্ড টাকার মতো — কারণ ওগুলো কনভার্শন ও র‍্যাঙ্কিং কেড়ে নেয়।</p>
                `,
                thumbnail: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop&q=80',
                category: webCategory._id,
                tags: ['seo', 'website performance', 'core web vitals', 'next.js', 'optimization'],
                author: adminUser._id,
                authorRole: 'admin',
                status: 'published',
                isFeatured: true,
                isPopular: true,
                allowComments: true,
                totalViews: 3120,
                likeCount: 198,
                likedBy: [],
                commentCount: 22,
                shareCount: 89,
                readingTime: 9,
                wordCount: 780,
                metaTitle: 'Build Fast, SEO-Friendly Websites — 2026 Playbook',
                metaDescription: 'A complete guide to building websites that rank well and load instantly — covering Core Web Vitals, image optimization, and technical SEO.',
                metaKeywords: ['seo', 'website speed', 'core web vitals', 'lighthouse'],
                publishedAt: daysAgo(5),
                createdAt: daysAgo(5),
                updatedAt: daysAgo(5),
            },

            {
                title: 'Responsive Web Design: Mastering the Mobile-First Approach',
                titleBn: 'রেসপন্সিভ ওয়েব ডিজাইন: মোবাইল-ফার্স্ট অ্যাপ্রোচ',
                slug: 'website-blog-responsive-mobile-first',
                excerpt: 'Over 60% of web traffic comes from mobile devices. Designing mobile-first is not a preference — it is a necessity. Here is how to do it right.',
                excerptBn: 'ওয়েব ট্র্যাফিকের ৬০%-এর বেশি আসে মোবাইল থেকে। মোবাইল-ফার্স্ট ডিজাইন এখন পছন্দ নয় — প্রয়োজনীয়তা।',
                content: `
                    <h2>What is Mobile-First Design?</h2>
                    <p>Mobile-first means designing for the smallest screen first, then progressively enhancing the layout for tablets and desktops. It forces you to prioritize content and reduces clutter.</p>

                    <h2>Core Principles</h2>
                    <h3>1. Touch-Friendly Targets</h3>
                    <p>Buttons should be at least <strong>44 × 44 pixels</strong> — Apple's accessibility minimum. Avoid tiny links that are impossible to tap accurately.</p>

                    <h3>2. Fluid Layouts with CSS Grid &amp; Flexbox</h3>
                    <p>Use percentages, <code>fr</code> units, and <code>minmax()</code> instead of fixed pixel widths. Your layout should breathe with the viewport.</p>

                    <h3>3. Responsive Typography</h3>
                    <p>Use <code>clamp()</code> for fluid font sizing:</p>
                    <pre><code>font-size: clamp(1rem, 2.5vw, 1.5rem);</code></pre>

                    <h3>4. Smart Breakpoints</h3>
                    <p>Don't design for specific devices. Design for <em>content breakpoints</em> — when your design starts to look bad. Common ones:</p>
                    <ul>
                        <li>Mobile: 0 – 640px</li>
                        <li>Tablet: 640 – 1024px</li>
                        <li>Desktop: 1024px+</li>
                    </ul>

                    <h2>Testing on Real Devices</h2>
                    <p>Chrome DevTools is great for quick checks, but always test on real phones. Touch behavior, network speed, and rendering quirks differ from emulators.</p>

                    <h2>Common Pitfalls</h2>
                    <ul>
                        <li>Hiding important content on mobile (users came for that content)</li>
                        <li>Using <code>position: fixed</code> elements that block content</li>
                        <li>Forgetting to test landscape orientation</li>
                        <li>Ignoring the safe-area inset on iPhones with notches</li>
                    </ul>

                    <h2>Conclusion</h2>
                    <p>Mobile-first is a mindset shift. Once you design with constraints, your desktop layouts will be cleaner, faster, and more focused.</p>
                `,
                contentBn: `
                    <h2>মোবাইল-ফার্স্ট ডিজাইন কী?</h2>
                    <p>সবচেয়ে ছোট স্ক্রিনের জন্য আগে ডিজাইন করুন, তারপর ট্যাবলেট ও ডেস্কটপের জন্য বাড়ান।</p>

                    <h2>মূল নীতি</h2>
                    <h3>১. টাচ-ফ্রেন্ডলি বাটন</h3>
                    <p>বাটন কমপক্ষে ৪৪ × ৪৪ পিক্সেল হওয়া উচিত — Apple-এর accessibility মিনিমাম।</p>

                    <h3>২. ফ্লুইড লেআউট</h3>
                    <p>ফিক্সড পিক্সেল ব্যবহার না করে শতাংশ বা CSS Grid এর fr ইউনিট ব্যবহার করুন।</p>

                    <h3>৩. রেসপন্সিভ টাইপোগ্রাফি</h3>
                    <p>ফন্ট সাইজে clamp() ব্যবহার করে fluid scaling।</p>

                    <h2>সাধারণ ভুল</h2>
                    <ul>
                        <li>মোবাইলে গুরুত্বপূর্ণ কন্টেন্ট লুকানো</li>
                        <li>landscape orientation না টেস্ট করা</li>
                        <li>iPhone-এর notch safe-area ভুলে যাওয়া</li>
                    </ul>

                    <h2>উপসংহার</h2>
                    <p>মোবাইল-ফার্স্ট একটা মাইন্ডসেট। কনস্ট্রেইন্টে ডিজাইন করলে আপনার ডেস্কটপ লেআউটও clean হবে।</p>
                `,
                thumbnail: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=1200&h=800&fit=crop&q=80',
                category: webCategory._id,
                tags: ['responsive design', 'mobile first', 'css', 'web design', 'ux'],
                author: adminUser._id,
                authorRole: 'admin',
                status: 'published',
                isFeatured: false,
                isPopular: true,
                allowComments: true,
                totalViews: 1850,
                likeCount: 124,
                likedBy: [],
                commentCount: 14,
                shareCount: 41,
                readingTime: 6,
                wordCount: 540,
                metaTitle: 'Responsive Web Design — Mobile-First Approach',
                metaDescription: 'Master mobile-first responsive web design with these proven principles, breakpoints, and testing strategies.',
                metaKeywords: ['responsive design', 'mobile first', 'css'],
                publishedAt: daysAgo(8),
                createdAt: daysAgo(8),
                updatedAt: daysAgo(8),
            },

            {
                title: 'Top Tools &amp; Technologies for Modern Website Development',
                titleBn: 'আধুনিক ওয়েবসাইট ডেভেলপমেন্টের সেরা টুলস ও টেকনোলজি',
                slug: 'website-blog-top-tools-technologies',
                excerpt: 'The right tools save weeks of work. Here is the complete tech stack — from frameworks to hosting — used by top web developers in 2026.',
                excerptBn: 'সঠিক টুলস সপ্তাহের কাজ বাঁচায়। ২০২৬ সালের শীর্ষ ডেভেলপারদের ব্যবহৃত সম্পূর্ণ টেক স্ট্যাক — ফ্রেমওয়ার্ক থেকে হোস্টিং পর্যন্ত।</p>',
                content: `
                    <h2>Choosing the Right Tools</h2>
                    <p>The web ecosystem moves fast, but a handful of tools have proven themselves year after year. This is the modern, opinionated stack that lets one developer ship what used to take a team of five.</p>

                    <h2>1. Frontend Frameworks</h2>
                    <ul>
                        <li><strong>Next.js</strong> — The default choice for React projects. SSR, SSG, ISR, App Router, file-based routing, all built in.</li>
                        <li><strong>Astro</strong> — Best for content-heavy sites. Ships zero JavaScript by default.</li>
                        <li><strong>SvelteKit</strong> — Smallest bundles, fastest runtime. Great for performance-critical apps.</li>
                    </ul>

                    <h2>2. Styling</h2>
                    <ul>
                        <li><strong>Tailwind CSS</strong> — Utility-first, JIT-compiled, dark-mode ready. The fastest way to style a site without leaving your HTML.</li>
                        <li><strong>shadcn/ui</strong> — Beautiful, copy-paste accessible components built on Radix.</li>
                        <li><strong>Framer Motion</strong> — Production-ready animations with a simple API.</li>
                    </ul>

                    <h2>3. Backend &amp; Database</h2>
                    <ul>
                        <li><strong>Node.js + Express / Hono</strong> — Battle-tested for REST and GraphQL APIs.</li>
                        <li><strong>MongoDB Atlas</strong> — Managed NoSQL, free tier, global clusters.</li>
                        <li><strong>PostgreSQL via Supabase / Neon</strong> — Serverless Postgres with built-in auth.</li>
                        <li><strong>Prisma</strong> — Type-safe ORM, autocomplete that feels like magic.</li>
                    </ul>

                    <h2>4. Authentication</h2>
                    <ul>
                        <li><strong>Clerk</strong> &amp; <strong>Auth.js</strong> — Drop-in auth with social logins, magic links, MFA.</li>
                        <li><strong>Supabase Auth</strong> — Free, integrates seamlessly if you use Supabase DB.</li>
                    </ul>

                    <h2>5. Deployment &amp; Hosting</h2>
                    <ul>
                        <li><strong>Vercel</strong> — Zero-config Next.js hosting with global edge.</li>
                        <li><strong>Cloudflare Pages / Workers</strong> — Insanely fast, generous free tier.</li>
                        <li><strong>Railway / Render</strong> — Best for full-stack apps with databases.</li>
                    </ul>

                    <h2>6. DevOps &amp; Monitoring</h2>
                    <ul>
                        <li><strong>GitHub Actions</strong> — Free CI/CD for public &amp; private repos.</li>
                        <li><strong>Sentry</strong> — Real-time error tracking.</li>
                        <li><strong>PostHog</strong> — Product analytics &amp; session replay.</li>
                    </ul>

                    <h2>Conclusion</h2>
                    <p>You don't need every tool. Pick one from each category, build something, ship it. The best stack is the one you actually finish projects with.</p>
                `,
                contentBn: `
                    <h2>সঠিক টুলস বেছে নেওয়া</h2>
                    <p>ওয়েব ইকোসিস্টেম দ্রুত বদলায়, কিন্তু কিছু টুলস বছরের পর বছর প্রমাণিত। এক ডেভেলপার এগুলো দিয়ে যা শিপ করতে পারে আগে ৫ জনের টিম লাগত।</p>

                    <h2>১. ফ্রন্টএন্ড ফ্রেমওয়ার্ক</h2>
                    <p>Next.js (React), Astro (content-heavy), SvelteKit (smallest bundle) — যেকোনো একটা যথেষ্ট।</p>

                    <h2>২. স্টাইলিং</h2>
                    <p>Tailwind CSS + shadcn/ui + Framer Motion — দ্রুত, সুন্দর, accessible।</p>

                    <h2>৩. ব্যাকএন্ড ও ডাটাবেস</h2>
                    <p>Node.js, MongoDB Atlas বা Supabase, Prisma ORM।</p>

                    <h2>৪. অথেন্টিকেশন</h2>
                    <p>Clerk, Auth.js, বা Supabase Auth।</p>

                    <h2>৫. হোস্টিং</h2>
                    <p>Vercel (Next.js), Cloudflare Pages, Railway।</p>

                    <h2>উপসংহার</h2>
                    <p>সব টুলস দরকার নেই। প্রতিটা ক্যাটাগরি থেকে একটা বেছে কিছু একটা বানান, শিপ করুন।</p>
                `,
                thumbnail: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200&h=800&fit=crop&q=80',
                category: webCategory._id,
                tags: ['web tools', 'developer stack', 'next.js', 'tailwind', 'devops'],
                author: adminUser._id,
                authorRole: 'admin',
                status: 'published',
                isFeatured: true,
                isPopular: true,
                allowComments: true,
                totalViews: 2410,
                likeCount: 167,
                likedBy: [],
                commentCount: 19,
                shareCount: 73,
                readingTime: 8,
                wordCount: 690,
                metaTitle: 'Top Tools for Modern Web Development in 2026',
                metaDescription: 'A curated list of the best frameworks, libraries, hosting, and DevOps tools for building modern websites in 2026.',
                metaKeywords: ['web development', 'tools', 'next.js', 'tailwind'],
                publishedAt: daysAgo(12),
                createdAt: daysAgo(12),
                updatedAt: daysAgo(12),
            },

            {
                title: 'Website Performance Optimization: Cut Load Times by 70%',
                titleBn: 'ওয়েবসাইট পারফরম্যান্স অপটিমাইজেশন: ৭০% লোড টাইম কমান',
                slug: 'website-blog-performance-optimization-guide',
                excerpt: 'A 1-second delay in load time can cut conversions by 7%. Here are 10 proven techniques to make your website blazing fast.',
                excerptBn: '১ সেকেন্ড লোড টাইম দেরি ৭% কনভার্শন কমিয়ে দেয়। আপনার ওয়েবসাইট অসম্ভব দ্রুত করার ১০টা প্রমাণিত কৌশল।',
                content: `
                    <h2>Why Speed Matters (Real Numbers)</h2>
                    <p>Amazon found that every 100ms of latency cost them <strong>1% in sales</strong>. Walmart saw a <strong>2% conversion lift for every 1-second improvement</strong>. Performance isn't just nice-to-have — it's revenue.</p>

                    <h2>1. Audit First with Lighthouse</h2>
                    <p>Open Chrome DevTools → Lighthouse tab → Run audit. You'll get a score (0-100) and a prioritized list of improvements. Focus on items marked "Opportunity" first.</p>

                    <h2>2. Optimize Images (Biggest Win)</h2>
                    <p>Images often account for 60–70% of page weight. Quick wins:</p>
                    <ul>
                        <li>Convert to <strong>AVIF</strong> (best) or <strong>WebP</strong> (universal)</li>
                        <li>Use Next.js <code>&lt;Image&gt;</code> for automatic optimization</li>
                        <li>Set explicit <code>width</code> and <code>height</code> to prevent layout shift</li>
                        <li>Lazy load images outside the viewport</li>
                    </ul>

                    <h2>3. Code-Split JavaScript</h2>
                    <p>Don't ship code users don't need. Use dynamic imports:</p>
                    <pre><code>const Modal = dynamic(() => import('./Modal'), { ssr: false });</code></pre>

                    <h2>4. Self-Host Fonts</h2>
                    <p>Google Fonts via CDN adds 100–300ms. Self-host with <code>font-display: swap</code> for instant text rendering.</p>

                    <h2>5. Eliminate Render-Blocking Resources</h2>
                    <p>Move non-critical CSS to <code>&lt;link rel="preload" as="style"&gt;</code>. Defer JavaScript that doesn't need to run before paint.</p>

                    <h2>6. Use HTTP/3 &amp; Brotli Compression</h2>
                    <p>Most modern hosts (Vercel, Cloudflare, Netlify) enable these by default. Brotli compresses 20% better than Gzip.</p>

                    <h2>7. Implement Smart Caching</h2>
                    <p>Set long <code>Cache-Control</code> max-age for static assets (1 year). Use immutable hashes in filenames so changes invalidate automatically.</p>

                    <h2>8. Minify Everything</h2>
                    <p>Frameworks like Next.js do this automatically. If you're rolling your own, use <code>terser</code> for JS and <code>cssnano</code> for CSS.</p>

                    <h2>9. Reduce Third-Party Scripts</h2>
                    <p>Each analytics tag, chat widget, and tracker adds bytes and latency. Audit what you actually use, remove the rest.</p>

                    <h2>10. Monitor in Production</h2>
                    <p>Use <strong>Real User Monitoring (RUM)</strong> tools like Vercel Speed Insights or Cloudflare Web Analytics. Lighthouse is synthetic — RUM tells you what real users experience.</p>

                    <h2>Quick Wins Checklist</h2>
                    <ul>
                        <li>✅ Convert hero image to AVIF/WebP</li>
                        <li>✅ Enable Brotli on your server</li>
                        <li>✅ Self-host fonts</li>
                        <li>✅ Remove unused JavaScript libraries</li>
                        <li>✅ Add explicit image dimensions</li>
                        <li>✅ Defer non-critical scripts</li>
                    </ul>

                    <h2>Conclusion</h2>
                    <p>Performance compounds. Each optimization is small, but together they cut load times dramatically. Start with the audit, fix the top three issues, then iterate. Your users — and your bottom line — will thank you.</p>
                `,
                contentBn: `
                    <h2>গতি কেন গুরুত্বপূর্ণ</h2>
                    <p>Amazon দেখেছে প্রতি ১০০ms দেরি ১% সেলস কমায়। Walmart পেয়েছে প্রতি ১ সেকেন্ড উন্নতিতে ২% কনভার্শন বৃদ্ধি।</p>

                    <h2>১. Lighthouse দিয়ে অডিট করুন</h2>
                    <p>Chrome DevTools → Lighthouse — ০-১০০ স্কোর ও prioritized improvement list।</p>

                    <h2>২. ইমেজ অপটিমাইজ করুন</h2>
                    <p>৬০-৭০% page weight ইমেজ থেকে আসে। AVIF/WebP ফরম্যাট, lazy load, explicit width/height।</p>

                    <h2>৩. JavaScript কোড-স্প্লিট করুন</h2>
                    <p>Dynamic imports দিয়ে শুধু দরকারি কোড লোড করান।</p>

                    <h2>৪. সেলফ-হোস্ট ফন্ট</h2>
                    <p>Google Fonts CDN ১০০-৩০০ms যোগ করে। font-display: swap সহ সেলফ-হোস্ট দ্রুততর।</p>

                    <h2>৫. Brotli কম্প্রেশন</h2>
                    <p>Gzip থেকে ২০% ভালো — Vercel/Cloudflare automatic।</p>

                    <h2>৬. ক্যাশিং</h2>
                    <p>Static asset-এ ১ বছরের Cache-Control max-age, immutable hash filename।</p>

                    <h2>৭. থার্ড-পার্টি স্ক্রিপ্ট কমান</h2>
                    <p>প্রতিটা analytics/chat widget bytes ও latency যোগ করে। অডিট করে অপ্রয়োজনীয়গুলো সরান।</p>

                    <h2>উপসংহার</h2>
                    <p>পারফরম্যান্স compound হয়। প্রতিটা ছোট অপটিমাইজেশন মিলে অসাধারণ ফলাফল।</p>
                `,
                thumbnail: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop&q=80',
                category: webCategory._id,
                tags: ['performance', 'optimization', 'lighthouse', 'web vitals', 'speed'],
                author: adminUser._id,
                authorRole: 'admin',
                status: 'published',
                isFeatured: true,
                isPopular: true,
                allowComments: true,
                totalViews: 3580,
                likeCount: 234,
                likedBy: [],
                commentCount: 27,
                shareCount: 102,
                readingTime: 10,
                wordCount: 850,
                metaTitle: 'Website Performance Optimization Guide',
                metaDescription: '10 proven techniques to slash website load times by 70% — image optimization, code splitting, caching, and more.',
                metaKeywords: ['performance', 'optimization', 'web vitals'],
                publishedAt: daysAgo(15),
                createdAt: daysAgo(15),
                updatedAt: daysAgo(15),
            },
        ];

        // 5. Insert all blogs
        const insertResult = await blogsCollection.insertMany(websiteBlogs);

        console.log('');
        console.log('✅ Website blogs seeded successfully!');
        console.log(`📝 Inserted ${insertResult.insertedCount} blog posts`);
        console.log('');
        console.log('Blog URLs:');
        websiteBlogs.forEach((blog, i) => {
            console.log(`  ${i + 1}. /blog/${blog.slug}`);
        });
        console.log('');

        await mongoose.disconnect();
        console.log('✅ Disconnected from MongoDB');
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
};

seedWebsiteBlogs();
