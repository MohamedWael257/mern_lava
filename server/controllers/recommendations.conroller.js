const users = ['User1', 'User2', 'User3'];
const items = ['Item1', 'Item2', 'Item3'];

// Sample user-item interactions (replace with your actual data)
const userItemInteractions = {
    'User1': { 'Item1': 8, 'Item2': 4, 'Item3': 0 },
    'User2': { 'Item1': 0, 'Item2': 5, 'Item3': 4 },
    'User3': { 'Item1': 4, 'Item2': 0, 'Item3': 5 },
};

export const recommend = async (req, res) => {
    // const { userId } = req.body;

    // Implement collaborative filtering (simple average)
    const recommendations = items.map(item => {
        const numerator = users.reduce((acc, user) => acc + userItemInteractions[user][item], 0);
        const denominator = users.reduce((acc, user) => acc + (userItemInteractions[user][item] > 0 ? 1 : 0), 0);

        const predictedRating = denominator === 0 ? 0 : numerator / denominator;
        return { item, predictedRating };
    });

    // Sort recommendations by predicted rating
    recommendations.sort((a, b) => b.predictedRating - a.predictedRating);

    return res.json(recommendations);

    // res.json('result');
}

