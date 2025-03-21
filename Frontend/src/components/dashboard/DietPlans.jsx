import { useState } from 'react';
import { Apple, PlusCircle } from 'lucide-react';

const DietPlans = ({ dietPlan, availablePlans, onUpdateDietPlan }) => {
    const [showPlans, setShowPlans] = useState(false);
    
    // Check if user has an active diet plan
    const isActive = dietPlan && dietPlan.status === 'active';

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-6">
                <Apple className="h-6 w-6 text-red-600" />
                <h2 className="text-xl font-bold ml-2">Diet Plans</h2>
            </div>
            
            {isActive && !showPlans ? (
                <div className="bg-gray-50 p-4 rounded-xl">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold text-lg">{dietPlan.planName}</h3>
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Active</span>
                    </div>
                    <p className="text-gray-600">{dietPlan.description}</p>
                    
                    <button 
                        onClick={() => {}} 
                        className="mt-4 w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                        View Meal Plan
                    </button>
                    
                    <button 
                        onClick={() => setShowPlans(true)}
                        className="mt-2 w-full py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                    >
                        Change Plan
                    </button>
                </div>
            ) : (
                <div>
                    {!isActive && !showPlans ? (
                        <div className="text-center py-8 bg-gray-50 rounded-xl">
                            <p className="text-gray-600 mb-4">You don't have an active diet plan</p>
                            <button 
                                onClick={() => setShowPlans(true)} 
                                className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center gap-2 mx-auto"
                            >
                                <PlusCircle size={18} />
                                Get a Diet Plan
                            </button>
                        </div>
                    ) : (
                        <>
                            {availablePlans.length === 0 ? (
                                <div className="text-center py-8 bg-gray-50 rounded-xl">
                                    <p className="text-gray-600">No diet plans available</p>
                                </div>
                            ) : (
                                <div className="space-y-4">
                                    {availablePlans.map(plan => (
                                        <div key={plan.id} className="border border-gray-200 rounded-xl p-4 hover:border-red-300 transition-colors">
                                            <div className="flex justify-between items-center mb-2">
                                                <h3 className="font-semibold text-lg">{plan.name}</h3>
                                                <span className="font-bold text-red-600">${plan.price}/mo</span>
                                            </div>
                                            <p className="text-sm text-gray-600 mb-4">{plan.description}</p>
                                            
                                            <button 
                                                onClick={() => {
                                                    onUpdateDietPlan(plan.id);
                                                    setShowPlans(false);
                                                }}
                                                disabled={isActive && dietPlan.planId === plan.id}
                                                className={`w-full py-2 rounded-lg transition-colors ${
                                                    isActive && dietPlan.planId === plan.id
                                                        ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                                                        : 'bg-red-600 text-white hover:bg-red-700'
                                                }`}
                                            >
                                                {isActive && dietPlan.planId === plan.id ? 'Current Plan' : 'Select Plan'}
                                            </button>
                                        </div>
                                    ))}
                                </div>
                            )}
                            
                            {isActive && (
                                <button 
                                    onClick={() => setShowPlans(false)}
                                    className="mt-4 w-full py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 transition-colors"
                                >
                                    Back to Current Plan
                                </button>
                            )}
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default DietPlans;