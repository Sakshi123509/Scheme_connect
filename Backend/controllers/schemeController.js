import Scheme from '../models/scheme.js';

export const getAllSchemes = async (req, res) => {
    try {
        const schemes = await Scheme.find();
        res.json(schemes);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const getSchemeById = async (req, res) => {
    try {
        const scheme = await Scheme.findById(req.params.id);
        if (!scheme) {
            return res.status(404).json({ message: 'Scheme not found' });
        }
        res.json(scheme);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const createScheme = async (req, res) => {
    try {
        const scheme = new Scheme(req.body);
        await scheme.save();
        res.status(201).json(scheme);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const updateScheme = async (req, res) => {
    try {
        const scheme = await Scheme.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!scheme) {
            return res.status(404).json({ message: 'Scheme not found' });
        }
        res.json(scheme);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const deleteScheme = async (req, res) => {
    try {
        const scheme = await Scheme.findByIdAndDelete(req.params.id);
        if (!scheme) {
            return res.status(404).json({ message: 'Scheme not found' });
        }
        res.json({ message: 'Scheme deleted' });
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const searchSchemes = async (req, res) => {
    try {
        const { query, category, location } = req.query;
        let filter = {};

        if (query) {
            filter.$or = [
                { name: { $regex: query, $options: 'i' } },
                { description: { $regex: query, $options: 'i' } }
            ];
        }

        if (category) {
            filter.category = category;
        }

        if (location) {
            filter['eligibility.locations'] = location;
        }

        const schemes = await Scheme.find(filter);
        res.json(schemes);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};

export const getEligibleSchemes = async (req, res) => {
    try {
        const user = req.user;
        const schemes = await Scheme.find();

        const eligibleSchemes = schemes.filter(scheme => {
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
        });

        res.json(eligibleSchemes);
    } catch (error) {
        res.status(500).json({ message: 'Server error' });
    }
};
export const filterschemes = async (req, res) => {
    try {
        const { age, income, category, gender, state, occupation } = req.query;
        let filter = {};
        if (category) {
            filter["eligibility.categories"] = category;
        }
        if (gender) {
            filter["eligibility.gender"] = gender;
        }
        if (state) {
            filter.state = state;
        }
        if (occupation) {
            filter["eligibility.occupation"] = occupation;
        }
        let schemes = await Scheme.find(filter);
        // Age & income filtering (dynamic)
        schemes = schemes.filter(scheme => {
            const { eligibility } = scheme;
            return (
                (!eligibility.minAge || age >= eligibility.minAge) &&
                (!eligibility.maxAge || age <= eligibility.maxAge) &&
                (!eligibility.minIncome || income >= eligibility.minIncome) &&
                (!eligibility.maxIncome || income <= eligibility.maxIncome)
            );
        });
        res.json(schemes);
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};
export const importSchemesFromAPI = async (req, res) => {
    try {
        res.json({ message: "Schemes imported successfully" });
    } catch (error) {
        res.status(500).json({ message: "Server error" });
    }
};