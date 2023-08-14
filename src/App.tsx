import React, { useState, useEffect } from "react";
import { FaAngleDoubleRight } from "react-icons/fa";


interface JobType {
  id: string;
  order:number;
  title:string;
  dates:string;
  duties:string[];
  company:string;
}

const url = "https://course-api.com/react-tabs-project";

function App():JSX.Element {
  const [loading, setLoading] = useState<boolean>(true);
  const [jobs, setJobs] = useState<JobType[]>([]);
  const [value, setValue] = useState<number>(0);

  const fetchJobs = async () => {
    const response = await fetch(url);
    const newJobs:JobType[] = await response.json();
    setJobs(newJobs);
    setLoading(false);
  };

  useEffect(() => {
    fetchJobs();
  }, []);

  if (loading) {
    return (
      <section className="section text-center">
        <h1>Loading...</h1>
      </section>
    );
  }

  const { company, dates, duties, title } = jobs[value];
  return (

    <section className="w-[90vw] my-20 mx-auto max-w-6xl">
      <div className="mb-16 text-center">
        <h2 className="text-4xl ">Experience</h2>
        <div className="w-20 h-1 mb-5 bg-blue-600 mx-auto"></div>
      </div>
      <div className="w-[80vw] mx-auto max-w-5xl flex flex-row gap-8">
        <div className="flex flex-row justify-center mb-16 flex-wrap">
          {jobs.map((item, index) => {
            return (
              <button
                key={item.id}
                onClick={() => setValue(index)}
                className={`bg-transparent border-transparent capitalize text-base tracking-wider mx-2 transition-all duration-300 ease-linear cursor-pointer py-1 leading-4 outline-blue-600 hover:text-blue-300 hover:shadow-md ${index === value ? "text-blue-300 shadow-md":''}`}>
                {item.company}
              </button>
            );
          })}
        </div>

        <article className="font-normal">
          <h3 className="font-normal">{title}</h3>
          <h4 className="uppercase text-gray-600 bg-gray-900 inline-block py-2 px-3 rounded-md">{company}</h4>
          <p className="tracking-wider">{dates}</p>
          {duties.map((duty, index) => {
            return (
              <div key={index} className="flex flex-row justify-center gap-4">
                <FaAngleDoubleRight className="text-[#2caeba]"></FaAngleDoubleRight>
                <p className="mb-2 text-[#5e89b0]">{duty}</p>
              </div>
            );
          })}
        </article>
      </div>
      <button type="button" className="uppercase bg-blue-400 text-blue-800 tracking-widest font-bold transition-all ease-linear duration-300 shadow-md border-2 border-solid rounded-md w-[12rem] block text-center mx-auto mt-12 hover:text-blue-400 hover:bg-blue-800">
        more info
      </button>
    </section>
  );
}

export default App;
