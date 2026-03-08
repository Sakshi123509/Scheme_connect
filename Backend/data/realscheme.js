export const realSchemes = [
    {
        name: "Pradhan Mantri Awas Yojana - Urban (PMAY-U)",
        category: "Housing",
        description: "Affordable housing scheme providing financial assistance for economically weaker sections to own a pucca house with basic amenities.",
        ministry: "Ministry of Housing and Urban Affairs",
        
        eligibility: [
            "Annual household income below ₹18 lakh",
            "Family should not own pucca house in India",
            "Woman ownership (alone or joint) mandatory",
            "First-time home buyer"
        ],
        
        benefits: [
            "Interest subsidy up to ₹2.67 lakh",
            "Reduced EMI burden",
            "Access to affordable housing",
            "Priority for SC/ST/OBC/Minorities"
        ],
        
        documents: [
            "Aadhaar Card",
            "Income Certificate",
            "Caste Certificate (if applicable)",
            "Bank Account Details",
            "Property/Land Documents",
            "Address Proof"
        ],
        
        applicationProcess: [
            "Visit PMAY-U official website",
            "Register with Aadhaar",
            "Fill online application form",
            "Upload documents",
            "Submit application",
            "Track status online"
        ],
        
        // OFFICIAL LINKS
        website: "https://pmaymis.gov.in/",
        applicationFormUrl: "https://pmaymis.gov.in/Open/Find_Prospect_Details_CLSS.aspx",
        youtubeLink: "https://youtu.be/ONAaObutRjk?si=e201NffVY51T7-Wm", // Replace with actual
        helpline: "1800-11-6163",
        
        image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800",
        
        status: "Active",
        budget: "₹2,00,000 Crore",
        beneficiaries: "10 Million+ families",
        deadline: "31st March 2025",
        
        eligibilityCriteria: {
            minIncome: 0,
            maxIncome: 1800000,
            categories: ['General', 'SC', 'ST', 'OBC', 'Minority'],
            gender: ['Male', 'Female', 'Other']
        }
    },
    
    {
        name: "PM-KISAN (Pradhan Mantri Kisan Samman Nidhi)",
        category: "Employment",
        description: "Direct income support of ₹6,000 per year to all farmer families having cultivable land, paid in three equal installments.",
        ministry: "Ministry of Agriculture and Farmers Welfare",
        
        eligibility: [
            "Small and marginal farmers",
            "Family owns cultivable land",
            "Land records updated",
            "Aadhaar-linked bank account"
        ],
        
        benefits: [
            "₹6,000 per year in 3 installments",
            "Direct Benefit Transfer to bank",
            "No caste or income restriction",
            "Support for agricultural activities"
        ],
        
        documents: [
            "Aadhaar Card",
            "Bank Account with IFSC code",
            "Land ownership documents",
            "Mobile number"
        ],
        
        applicationProcess: [
            "Visit PM-KISAN portal",
            "Click 'New Farmer Registration'",
            "Enter Aadhaar number",
            "Fill registration form",
            "Upload land records",
            "Submit and track status"
        ],
        
        website: "https://pmkisan.gov.in/",
        applicationFormUrl: "https://pmkisan.gov.in/RegistrationForm.aspx",
        youtubeLink: "https://youtu.be/Uq9ktF-QycY?si=aewoTTALRT3OHmlx",
        helpline: "011-23381092, 155261",
        
        image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800",
        
        status: "Active",
        deadline: "Ongoing",
        
        eligibilityCriteria: {
            occupation: ['Farmer', 'Agriculture']
        }
    },
    
    {
        name: "Ayushman Bharat PM-JAY",
        category: "Health",
        description: "World's largest health insurance scheme providing ₹5 lakh per family per year for secondary and tertiary hospitalization.",
        ministry: "Ministry of Health and Family Welfare",
        
        eligibility: [
            "Families in SECC 2011 database",
            "Rural: Deprivation criteria",
            "Urban: 11 occupational categories",
            "Economically vulnerable families"
        ],
        
        benefits: [
            "₹5 lakh health cover per family/year",
            "Cashless and paperless treatment",
            "Pre and post hospitalization covered",
            "1,393 procedures included"
        ],
        
        documents: [
            "Aadhaar Card",
            "Ration Card",
            "Mobile Number",
            "SECC/BPL Card (if available)"
        ],
        
        applicationProcess: [
            "Check eligibility online",
            "Visit nearest CSC/Hospital",
            "Provide Aadhaar and mobile",
            "Get eligibility verified",
            "Receive Ayushman Card",
            "Use at empanelled hospitals"
        ],
        
        website: "https://pmjay.gov.in/",
        applicationFormUrl: "https://pmjay.gov.in/search/beneficiary",
        youtubeLink: "https://youtu.be/_2npSEP17SM?si=cs60DciYGl66UICJ",
        helpline: "14555",
        
        image: "https://images.unsplash.com/photo-1631217868264-e5b90bb7e133?w=800",
        
        status: "Active",
        deadline: "Ongoing",
        
        eligibilityCriteria: {
            maxIncome: 300000,
            categories: ['General', 'SC', 'ST', 'OBC', 'Minority']
        }
    },
    
    {
        name: "Beti Bachao Beti Padhao",
        category: "Women",
        description: "National initiative addressing declining Child Sex Ratio and promoting education and welfare of girl children.",
        ministry: "Ministry of Women and Child Development",
        
        eligibility: [
            "Girl child from birth to 10 years",
            "Indian citizen",
            "Bank account required"
        ],
        
        benefits: [
            "Education support and scholarships",
            "Awareness campaigns",
            "Conditional cash transfers",
            "Girl child safety initiatives"
        ],
        
        documents: [
            "Birth Certificate of girl child",
            "Aadhaar Card of parents",
            "Bank account details",
            "Address Proof"
        ],
        
        applicationProcess: [
            "Visit WCD office or bank",
            "Submit application form",
            "Attach required documents",
            "Account opened in girl's name",
            "Regular deposits encouraged"
        ],
        
        website: "https://wcd.nic.in/bbbp-schemes",
        applicationFormUrl: "https://wcd.nic.in/schemes/beti-bachao-beti-padhao-scheme",
        youtubeLink: "https://youtu.be/zCtrnuSWtIM?si=C-SlqYHWbUEaV1Bw",
        helpline: "011-23388612",
        
        image: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?w=800",
        
        status: "Active",
        deadline: "Ongoing",
        
        eligibilityCriteria: {
            gender: ['Female'],
            minAge: 0,
            maxAge: 10
        }
    },
    
    {
        name: "Pradhan Mantri Mudra Yojana",
        category: "Employment",
        description: "Provides loans up to ₹10 lakh to non-corporate, non-farm small/micro enterprises for income generating activities.",
        ministry: "Ministry of Finance",
        
        eligibility: [
            "Small businesses/micro-enterprises",
            "Manufacturing, trading, services",
            "Non-corporate entities",
            "Income generating activities"
        ],
        
        benefits: [
            "Shishu: Up to ₹50,000",
            "Kishore: ₹50,001 to ₹5 lakh",
            "Tarun: ₹5 lakh to ₹10 lakh",
            "No collateral for loans up to ₹10 lakh"
        ],
        
        documents: [
            "Aadhaar Card",
            "Business plan/project report",
            "Bank statements (6 months)",
            "Address Proof",
            "Business registration"
        ],
        
        applicationProcess: [
            "Visit nearest bank/NBFC",
            "Fill MUDRA loan application",
            "Submit business plan",
            "Provide documents",
            "Bank verifies and sanctions"
        ],
        
        website: "https://www.mudra.org.in/",
        applicationFormUrl: "https://www.mudra.org.in/Application",
        youtubeLink: "https://youtu.be/LwMYQI7Rh0Y?si=uU2TBuJ7zMK-HqS_",
        helpline: "1800-180-1111",
        
        image: "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?w=800",
        
        status: "Active",
        deadline: "Ongoing",
        
        eligibilityCriteria: {
            occupation: ['Business', 'Self-employed', 'Entrepreneur']
        }
    },
    
    {
        name: "Sukanya Samriddhi Yojana",
        category: "Women",
        description: "Government savings scheme for girl child with high interest rate and tax benefits under Section 80C.",
        ministry: "Ministry of Finance",
        
        eligibility: [
            "Girl child below 10 years",
            "Parents/guardians can open",
            "Maximum 2 accounts per family"
        ],
        
        benefits: [
            "High interest rate (8.2% p.a.)",
            "Tax benefits under 80C",
            "Maturity after 21 years",
            "Partial withdrawal after age 18"
        ],
        
        documents: [
            "Birth Certificate",
            "Aadhaar of guardian",
            "Address Proof",
            "Passport size photos",
            "Initial deposit (min ₹250)"
        ],
        
        applicationProcess: [
            "Visit Post Office/authorized bank",
            "Fill SSY account form",
            "Submit documents",
            "Make initial deposit",
            "Receive passbook"
        ],
        
        website: "https://www.nsiindia.gov.in/",
        applicationFormUrl: "https://www.nsiindia.gov.in/InternalPage.aspx?Id_Pk=88",
        youtubeLink: "https://youtu.be/Y9wwQeMg2pI?si=gmB-iWVyZCVrcDW4",
        helpline: "1800-180-1111",
        
        image: "https://images.unsplash.com/photo-1544027993-37dbfe43562a?w=800",
        
        status: "Active",
        deadline: "Ongoing",
        
        eligibilityCriteria: {
            gender: ['Female'],
            minAge: 0,
            maxAge: 10
        }
    }
];