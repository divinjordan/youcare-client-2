import { FC, useState } from "react";
import { questions } from "@/data/questions";

const Faqs: FC = () => {
  const [activeQuestion, setActiveQuestion] = useState<number>(-1);

  function activate(index: number) {
    // close open panel
    // document.querySelectorAll(".response-panel").forEach( e => e.classList.add("hidden"));
    // Open the choose one.
    let responsePanel = document.getElementById("response" + index);
    if (responsePanel) {
      responsePanel.classList.remove("hidden");
      if (responsePanel.style.maxHeight) {
        responsePanel.style.maxHeight = "";
      } else {
        responsePanel.style.maxHeight = responsePanel.scrollHeight + "px";
      }
    }
  }

  return (
    <div className="max-w-4xl mx-auto py-20 px-4 md:px-0">
      <div className="flex flex-wrap items-center">
        {/* <div className="w-full md:w-2/5">
          <h2 className="text-3xl md:text-4xl text-darkprimary font-semibold md:pl-12">
            Réponse aux questions fréquentes
          </h2>
          <div className="hidden md:block w-48 h-[3px] bg-secondary ml-12 mt-4"></div>
          <div className="hidden md:flex items-center mt-8">
            <img className="md:w-3/4" src="/images/questions.png" />
          </div>
        </div> */}
        <div className="w-full  mt-6 md:mt-0">
          <div className="">
            {questions.map((item, index) => (
              <div key={`question${index}`} className="mb-4 pb-2">
                <h3
                  className="flex justify-between text-darkprimary font-semibold md:text-2xl cursor-pointer"
                  onClick={() => activate(index)}
                >
                  <span>{item.question}</span>
                  {/* <button onClick={() => activate(index)}>
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 9l-7 7-7-7"
                      />
                    </svg>
                  </button>
                  <button className="hidden" onClick={() => activate(index)}>
                    <svg
                      className="w-6 h-6"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M5 15l7-7 7 7"
                      />
                    </svg>
                  </button> */}
                </h3>
                <div id={`response${index}`} className="response-panel">
                  <p className="md:text-lg text-gray-700 py-4">
                    {item.response}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faqs;
