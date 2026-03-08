import jwt from 'jsonwebtoken';

// Helper functions

export const checkEligibility = (user, scheme) => {
    const { eligibility } = scheme;
    return (
        (!eligibility.minAge || user.age >= eligibility.minAge) &&
        (!eligibility.maxAge || user.age <= eligibility.maxAge) &&
        (!eligibility.minIncome || user.income >= eligibility.minIncome) &&
        (!eligibility.maxIncome || user.income <= eligibility.maxIncome) &&
        (!eligibility.categories || eligibility.categories.length === 0 || eligibility.categories.includes(user.category)) &&
        (!eligibility.locations || eligibility.locations.length === 0 || eligibility.locations.includes(user.location)) &&
        (!eligibility.gender || eligibility.gender.length === 0 || eligibility.gender.includes(user.gender)) &&
        (!eligibility.occupation || eligibility.occupation.length === 0 || eligibility.occupation.includes(user.occupation))
    );
};

export const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET || 'your_jwt_secret', {
        expiresIn: '7d'
    });
};
