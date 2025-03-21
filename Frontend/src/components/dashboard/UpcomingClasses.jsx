import { useState } from 'react';
import { Calendar } from 'lucide-react';

const UpcomingClasses = ({ classes, onBookClass }) => {
    const [expanded, setExpanded] = useState(false);
    const displayClasses = expanded ? classes : classes.slice(0, 3);

    return (
        <div className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center mb-6">
                <Calendar className="h-6 w-6 text-red-600" />
                <h2 className="text-xl font-bold ml-2">Upcoming Classes</h2>
            </div>
            
            {classes.length === 0 ? (
                <div className="text-center py-8 bg-gray-50 rounded-xl">
                    <p className="text-gray-600">No upcoming classes available</p>
                </div>
            ) : (
                <>
                    <div className="space-y-4">
                        {displayClasses.map((classItem) => (
                            <div key={classItem.id} className="flex justify-between items-center p-4 bg-gray-50 rounded-xl">
                                <div>
                                    <h4 className="font-semibold text-lg">{classItem.name}</h4>
                                    <p className="text-gray-600">{new Date(classItem.startTime).toLocaleString()}</p>
                                    <p className="text-sm text-gray-500">
                                        {classItem.instructor} • {classItem.duration} min
                                    </p>
                                </div>
                                <button 
                                    onClick={() => onBookClass(classItem.id)}
                                    disabled={classItem.isBooked || classItem.isFull}
                                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                                        classItem.isBooked 
                                            ? 'bg-green-100 text-green-800' 
                                            : classItem.isFull
                                                ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                                                : 'text-blue-600 hover:bg-blue-50'
                                    }`}
                                >
                                    {classItem.isBooked ? 'Booked' : classItem.isFull ? 'Full' : 'Book'}
                                </button>
                            </div>
                        ))}
                    </div>
                    
                    {classes.length > 3 && (
                        <button 
                            onClick={() => setExpanded(!expanded)}
                            className="w-full mt-4 py-2 text-red-600 bg-white border border-red-600 rounded-lg hover:bg-red-50 transition-colors"
                        >
                            {expanded ? 'Show Less' : `View All Classes (${classes.length})`}
                        </button>
                    )}
                </>
            )}
        </div>
    );
};

export default UpcomingClasses;