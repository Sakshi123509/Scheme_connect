import mongoose from 'mongoose';
import dotenv from 'dotenv';
import Scheme from './models/scheme.js';
import { realSchemes } from './data/realscheme.js';

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Connected'))
    .catch(err => console.log('❌ Error:', err));

const schemes = [
    {
        name: "Pradhan Mantri Awas Yojana",
        category: "Housing",
        description: "Affordable housing for all citizens",
        ministry: "Ministry of Housing",
        eligibility: ["Income < 18 lakh", "First time buyer"],
        benefits: ["Subsidy up to 2.5 lakh", "Low interest rates"],
        documents: ["Aadhaar", "Income Certificate", "Bank Details"],
        website: "https://pmaymis.gov.in",
        helpline: "1800-11-6163",
        status: "Active",
        youtubeLink: "https://youtube.com/watch?v=example",
        applicationFormUrl: "https://pmaymis.gov.in/apply",
        deadline: new Date("2026-03-31")
    },
    {
        name: "PM Kisan Samman Nidhi",
        category: "Employment",
        description: "Direct income support to farmers",
        ministry: "Ministry of Agriculture",
        eligibility: ["Small farmers", "Land < 2 hectares"],
        benefits: ["₹6000 per year", "3 installments"],
        documents: ["Aadhaar", "Land records"],
        website: "https://pmkisan.gov.in",
        helpline: "011-23381092",
        status: "Active",
        youtubeLink: "https://youtube.com/watch?v=example",
        applicationFormUrl: "https://pmkisan.gov.in/apply",
        deadline: new Date("2025-12-31")
    },
    {
        name: "Ayushman Bharat",
        category: "Health",
        description: "Health insurance of ₹5 lakh per family",
        ministry: "Ministry of Health",
        eligibility: ["Economically vulnerable families"],
        benefits: ["₹5 lakh coverage", "Cashless treatment"],
        documents: ["Aadhaar", "Ration Card"],
        website: "https://pmjay.gov.in",
        helpline: "14555",
        status: "Active",
        youtubeLink: "https://youtube.com/watch?v=example",
        applicationFormUrl: "https://pmjay.gov.in/apply",
        deadline: new Date("2027-03-31")
    },
    {
        name: "Beti Bachao Beti Padhao",
        category: "Women",
        description: "Empowerment scheme for girl children",
        ministry: "Ministry of Women & Child Development",
        eligibility: ["Girl child", "Indian citizen"],
        benefits: ["Education support", "Financial benefits"],
        documents: ["Birth Certificate", "Aadhaar"],
        website: "https://wcd.nic.in/bbbp-schemes",
        helpline: "011-23388612",
        status: "Active",
        youtubeLink: "https://youtube.com/watch?v=example",
        applicationFormUrl: "https://wcd.nic.in/apply",
        deadline: new Date("2026-06-30")
    },
    {
        name: "Skill India Mission",
        category: "Education",
        description: "Skill training for youth",
        ministry: "Ministry of Skill Development",
        eligibility: ["Age 15-45", "Indian citizen"],
        benefits: ["Free training", "Certification"],
        documents: ["Aadhaar", "Educational certificates"],
        website: "https://skillindia.gov.in",
        helpline: "1800-123-9626",
        status: "Active",
        youtubeLink: "https://youtube.com/watch?v=example",
        applicationFormUrl: "https://skillindia.gov.in/apply",
        deadline: new Date("2026-12-31")
    },
    {
        name: "Mudra Yojana",
        category: "Employment",
        description: "Loan scheme for small businesses",
        ministry: "Ministry of Finance",
        eligibility: ["Small entrepreneurs", "Non-corporate businesses"],
        benefits: ["Loans up to ₹10 lakh", "Low interest"],
        documents: ["Aadhaar", "Business plan", "Bank statements"],
        website: "https://mudra.org.in",
        helpline: "1800-180-1111",
        status: "Active",
        youtubeLink: "https://youtube.com/watch?v=example",
        applicationFormUrl: "https://mudra.org.in/apply",
        deadline: new Date("2027-03-31")
    },
    {
        name: "Sukanya Samriddhi Yojana",
        category: "Women",
        description: "Savings scheme for girl child",
        ministry: "Ministry of Finance",
        eligibility: ["Girl child below 10 years"],
        benefits: ["High interest rate", "Tax benefits"],
        documents: ["Birth Certificate", "Aadhaar", "Parent ID"],
        website: "https://nsiindia.gov.in",
        helpline: "1800-180-1111",
        status: "Active",
        youtubeLink: "https://youtube.com/watch?v=example",
        applicationFormUrl: "https://nsiindia.gov.in/apply",
        deadline: new Date("2030-03-31")
    },
    {
        name: "National Apprenticeship Promotion Scheme",
        category: "Education",
        description: "Apprenticeship opportunities for youth",
        ministry: "Ministry of Skill Development",
        eligibility: ["Age 14-21", "Educational qualification varies"],
        benefits: ["Stipend", "Industry exposure", "Certificate"],
        documents: ["Aadhaar", "Educational certificates"],
        website: "https://apprenticeshipindia.gov.in",
        helpline: "1800-425-2526",
        status: "Active",
        youtubeLink: "https://youtube.com/watch?v=example",
        applicationFormUrl: "https://apprenticeshipindia.gov.in/apply",
        deadline: new Date("2026-08-31")
    }
];

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('✅ Connected'))
    .catch(err => console.log('❌ Error:', err));

const seed = async () => {
    try {
        await Scheme.deleteMany({});
        console.log('🗑️  Deleted old schemes');

        const inserted = await Scheme.insertMany(realSchemes);
        console.log(`✅ Inserted ${inserted.length} schemes`);

        inserted.forEach((s, i) => {
            console.log(`${i + 1}. ${s.name} (${s.category})`);
        });

        process.exit(0);
    } catch (error) {
        console.error('❌ Error:', error);
        process.exit(1);
    }
};

seed();
