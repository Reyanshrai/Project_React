import React from 'react';
import { Calendar, Clock, User } from 'lucide-react';

const Timetable = () => {
  const timetable = [
    {
      day: "Sunday",
      sessions: [
        "Weight Loss\n10 am - 11 am\nWayne Ponce",
        "",
        "Yoga\n03 pm - 04 pm\nFrancisco Watt",
        "Boxing\n05 pm - 06 pm\nCharles King",
        "",
      ],
    },
    {
      day: "Monday",
      sessions: [
        "",
        "Cycling\n11 am - 12 pm\nTabitha Porter",
        "Karate\n03 pm - 05 pm\nLester Gray",
        "",
        "Crossfit\n07 pm - 08 pm\nCandi Vip",
      ],
    },
    {
      day: "Tuesday",
      sessions: [
        "Spinning\n10 am - 11 am\nMary Cass",
        "",
        "Dance\n03 pm - 05 pm\nBrian Ashworth",
        "",
        "Boxercise\n07 pm - 08 pm\nMarlene Bruce",
      ],
    },
    {
      day: "Wednesday",
      sessions: [
        "Body Building\n10 am - 12 pm\nBrenda Hester",
        "",
        "",
        "Bootcamp\n05 pm - 06 pm\nBrenda Mastrodicasio",
        "Health\n07 pm - 08 pm\nMark Croteau",
      ],
    },
    {
      day: "Thursday",
      sessions: [
        "",
        "Bootcamp\n11 am - 12 pm\nElisabeth Schreck",
        "",
        "Body Building\n05 pm - 06 pm\nEdward Garcia",
        "",
      ],
    },
    {
      day: "Friday",
      sessions: [
        "Racing\n10 am - 11 am\nJackie Potts",
        "",
        "Energy Blast\n03 pm - 05 pm\nTravis Brown",
        "",
        "Jumping\n07 pm - 08 pm\nBenjamin Barnett",
      ],
    },
    {
      day: "Saturday",
      sessions: [
        "",
        "",
        "Aerobics\n03 pm - 04 pm\nAndre Walls",
        "Cycling\n05 pm - 06 pm\nMargaret Thomas",
        "",
      ],
    },
  ];

  const formatSession = (session) => {
    if (!session) return null;
    const [title, time, trainer] = session.split('\n');
    return { title, time, trainer };
  };

  return (
    <div className="w-full max-w-7xl mx-auto bg-white rounded-lg shadow-xl p-8">
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-red-600 mt-20">
          Fitness Class Schedule
        </h1>
        <p className="text-lg text-gray-600">
          Transform your life with our expert-led fitness classes
        </p>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-red-600">
              <th className="p-4 text-white font-semibold text-left">
                <div className="flex items-center gap-2">
                  <Calendar className="w-5 h-5" />
                  <span>Day</span>
                </div>
              </th>
              {['10 AM', '11 AM', '3 PM', '5 PM', '7 PM'].map((time) => (
                <th key={time} className="p-4 text-white font-semibold">
                  <div className="flex items-center justify-center gap-2">
                    <Clock className="w-5 h-5" />
                    <span>{time}</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {timetable.map((row, index) => (
              <tr
                key={row.day}
                className={`
                  ${index % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
                  hover:bg-gray-100 transition-colors duration-200
                `}
              >
                <td className="p-4 font-semibold text-gray-700 border-b">
                  {row.day}
                </td>
                {row.sessions.map((session, i) => {
                  const formattedSession = formatSession(session);
                  return (
                    <td key={i} className="p-4 border-b">
                      {formattedSession ? (
                        <div className="bg-white rounded-lg shadow p-3 hover:shadow-md transition-shadow duration-200">
                          <div className="font-semibold text-red-600 mb-1">
                            {formattedSession.title}
                          </div>
                          <div className="text-sm text-gray-600 flex items-center gap-1 mb-1">
                            <Clock className="w-4 h-4" />
                            {formattedSession.time}
                          </div>
                          <div className="text-sm text-gray-600 flex items-center gap-1">
                            <User className="w-4 h-4" />
                            {formattedSession.trainer}
                          </div>
                        </div>
                      ) : (
                        <div className="text-gray-400 text-center">—</div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Timetable;