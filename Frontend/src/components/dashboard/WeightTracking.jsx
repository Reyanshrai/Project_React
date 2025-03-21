import { useState } from 'react';
import { Weight } from 'lucide-react';

const WeightTracking = ({ weight, onUpdateWeight }) => {
    const [newWeight, setNewWeight] = useState(weight);
    const [isEditing, setIsEditing] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        onUpdateWeight(newWeight);
        setIsEditing(false);
    };

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-6">
                <Weight className="h-6 w-6 text-red-600" />
                <h2 className="text-xl font-bold ml-2">Weight Tracking</h2>
            </div>
            
            {isEditing ? (
                <form onSubmit={handleSubmit} className="bg-gray-50 p-6 rounded-xl">
                    <div className="mb-4">
                        <label htmlFor="weight" className="block text-sm font-medium text-gray-700 mb-1">
                            New Weight (kg)
                        </label>
                        <input
                            type="number"
                            id="weight"
                            value={newWeight}
                            onChange={(e) => setNewWeight(e.target.value)}
                            step="0.1"
                            min="20"
                            max="250"
                            className="w-full p-2 border border-gray-300 rounded-md focus:ring-red-500 focus:border-red-500"
                            required
                        />
                    </div>
                    <div className="flex space-x-3">
                        <button
                            type="submit"
                            className="flex-1 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                        >
                            Save
                        </button>
                        <button
                            type="button"
                            onClick={() => setIsEditing(false)}
                            className="flex-1 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            ) : (
                <div className="text-center bg-gray-50 p-6 rounded-xl">
                    <h3 className="text-4xl font-bold mb-2 text-gray-800">{weight} kg</h3>
                    <p className="text-gray-600">Last updated {new Date().toLocaleDateString()}</p>
                    <button 
                        onClick={() => setIsEditing(true)}
                        className="mt-4 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                        Update Weight
                    </button>
                </div>
            )}
        </div>
    );
};

export default WeightTracking;