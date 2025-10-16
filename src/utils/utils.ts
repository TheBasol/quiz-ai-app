export const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
        case 'Easy': return 'text-green-400 bg-green-900/30';
        case 'Medium': return 'text-yellow-400 bg-yellow-900/30';
        case 'Hard': return 'text-red-400 bg-red-900/30';
        default: return 'text-gray-400 bg-gray-700/50';
    }   
};