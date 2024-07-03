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

export const recommendantion = async (req, res) => {

    const { id } = req.params;
    try {
        const user = await User.find({ _id: id });
        if (!user) {
            return res.json({ error: 'User not found' });
        }

        const allUsers = await User.find({ _id: { $ne: id } });
        const allProducts = await Products.find();
        const userInteractions = new Set(user.interactions);

        const recommendations = {};

        allUsers.forEach(otherUser => {
            otherUser.interactions.forEach(itemId => {
                if (!userInteractions.has(itemId)) {
                    if (!recommendations[itemId]) {
                        recommendations[itemId] = 0;
                    }
                    recommendations[itemId]++;
                }
            });
        });

        // const sortedRecommendations = Object.keys(recommendations).sort((a, b) => recommendations[b] - recommendations[a]);
        // const recommendedItems = sortedRecommendations.map(itemId => allProducts.find(item => item._id.toString() === itemId));

        // res.json(recommendedItems);
        res.json(userInteractions);
    } catch (error) {
        res.json({ error: error.message });
    }
}