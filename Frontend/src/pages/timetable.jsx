import React from "react";
import { Navbar, Footer } from "../components";

const Timetable = () => {
  const timetable = [
    {
      day: "Sunday",
      sessions: [
        "Weight Loss\n10 am - 11 am\nWayne Ponce",
        "Yoga\n03 pm - 04 pm\nFrancisco Watt",
        "Boxing\n05 pm - 06 pm\nCharles King",
        "",
      ],
    },
    {
      day: "Monday",
      sessions: [
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
        "Boxercise\n07 pm - 08 pm\nMarlene Bruce",
      ],
    },
    {
      day: "Wednesday",
      sessions: [
        "Body Building\n10 am - 12 pm\nBrenda Hester",
        "",
        "Bootcamp\n05 pm - 06 pm\nBrenda Mastrodicasio",
        "Health\n07 pm - 08 pm\nMark Croteau",
      ],
    },
    {
      day: "Thursday",
      sessions: [
        "",
        "Bootcamp\n11 am - 12 pm\nElisabeth Schrecck",
        "Body Building\n05 pm - 06 pm\nEdward Garcia",
        "",
      ],
    },
    {
      day: "Friday",
      sessions: [
        "Racing\n10 am - 11 am\nJackie Potts",
        "Energy Blast\n03 pm - 05 pm\nTravis Brown",
        "",
        "Jumping\n07 pm - 08 pm\nBenjamin Barnett",
      ],
    },
    {
      day: "Saturday",
      sessions: [
        "",
        "Aerobics\n03 pm - 04 pm\nAndre Walls",
        "Cycling\n05 pm - 06 pm\nMargaret Thomas",
        "",
      ],
    },
  ];

  return (
    <>
      <Navbar />
      <div className="p-8 bg-gray-50">
        <h1 className="text-center text-2xl font-bold text-red-600 mb-4">
          #04 Timetable
        </h1>
        <h2 className="text-center text-xl font-semibold mb-6">
          Committed to fabulous and great{" "}
          <span className="text-red-500">#Timetable</span>
        </h2>
        <div className="overflow-x-auto">
          <table className="table-auto w-full border border-gray-300 text-left text-sm">
            <thead className="bg-red-500 text-white">
              <tr>
                <th className="p-2">Routine</th>
                <th className="p-2">10 am</th>
                <th className="p-2">11 am</th>
                <th className="p-2">03 pm</th>
                <th className="p-2">05 pm</th>
                <th className="p-2">07 pm</th>
              </tr>
            </thead>
            <tbody>
              {timetable.map((row, index) => (
                <tr key={index} className="odd:bg-white even:bg-gray-100">
                  <td className="border p-2 font-semibold text-gray-700">
                    {row.day}
                  </td>
                  {row.sessions.map((session, i) => (
                    <td key={i} className="border p-2 whitespace-pre-wrap">
                      {session}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      {/* <Footer /> */}
    </>
  );
};

export default Timetable;
