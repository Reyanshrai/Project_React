import { useState } from 'react';
import { CreditCard, Check } from 'lucide-react';

const SubscriptionPlans = ({ currentSubscription, availablePlans, onUpdateSubscription }) => {
    const [showPlans, setShowPlans] = useState(false);
    
    // Check if user has an active subscription
    const isActive = currentSubscription && currentSubscription.status === 'active';

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-6">
                <CreditCard className="h-6 w-6 text-red-600" />
                <h2 className="text-xl font-bold ml-2">Membership</h2>
            </div>
            
            {isActive && !showPlans ? (
                <div className="bg-gray-50 p-4 rounded-xl mb-4">
                    <div className="flex justify-between items-center mb-2">
                        <h3 className="font-semibold text-lg">{currentSubscription.planName}</h3>
                        <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">Active</span>
                    </div>
                    <p className="text-gray-600">
                        Expires: {new Date(currentSubscription.expiresAt).toLocaleDateString()}
                    </p>
                    
                    <div className="mt-3">
                        <p className="text-sm font-medium text-gray-700 mb-2">Included benefits:</p>
                        <ul className="space-y-1">
                            {currentSubscription.features.map((feature, index) => (
                                <li key={index} className="flex items-center text-sm text-gray-600">
                                    <Check className="h-4 w-4 text-green-500 mr-2" />
                                    {feature}
                                </li>
                            ))}
                        </ul>
                    </div>
                    
                    <button 
                        onClick={() => setShowPlans(true)}
                        className="mt-4 w-full py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                    >
                        Change Plan
                    </button>
                </div>
            ) : (
                <div>
                    {availablePlans.length === 0 ? (
                        <div className="text-center py-8 bg-gray-50 rounded-xl">
                            <p className="text-gray-600">No subscription plans available</p>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            {availablePlans.map(plan => (
                                <div key={plan.id} className="border border-gray-200 rounded-xl p-4 hover:border-red-300 transition-colors">
                                    <div className="flex justify-between items-center mb-2">
                                        <h3 className="font-semibold text-lg">{plan.name}</h3>
                                        <span className="font-bold text-red-600">${plan.price}/mo</span>
                                    </div>
                                    
                                    <ul className="space-y-1 mb-3">
                                        {plan.features.map((feature, index) => (
                                            <li key={index} className="flex items-center text-sm text-gray-600">
                                                <Check className="h-4 w-4 text-green-500 mr-2" />
                                                {feature}
                                            </li>
                                        ))}
                                    </ul>
                                    
                                    <button 
                                        onClick={() => {
                                            onUpdateSubscription(plan.id);
                                            setShowPlans(false);
                                        }}
                                        disabled={isActive && currentSubscription.planId === plan.id}
                                        className={`w-full py-2 rounded-lg transition-colors ${
                                            isActive && currentSubscription.planId === plan.id
                                                ? 'bg-gray-300 text-gray-600 cursor-not-allowed'
                                                : 'bg-red-600 text-white hover:bg-red-700'
                                        }`}
                                    >
                                        {isActive && currentSubscription.planId === plan.id ? 'Current Plan' : 'Select Plan'}
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
                </div>
            )}
        </div>
    );
};

export default SubscriptionPlans;