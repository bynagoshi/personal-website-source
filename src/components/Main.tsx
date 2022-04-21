import React from "react";

function Main() {
  return (
    <div className="min-h-screen bg-slate-100">
      <div className="flex flex-col flex-auto justify-center place-items-center h-screen">
        <header>
          <h1 className="font-mono text-4xl text-grey-600 font-bold h-10 ">
            Ben Nagoshi
          </h1>
          <p className="font-mono text-3x1 text-grey-600 w-60 -mb-1">
            Software Engineer
          </p>
        </header>
        <ul>
          <li className="text-rose-500 w-60  h-5">
            <a href="http://www.instagram.com/bynagoshi" target="_blank">
              Instagram
            </a>
          </li>
          <li className="text-emerald-600 w-60  h-5">
            <a href="https://github.com/bynagoshi" target="_blank">
              Github
            </a>
          </li>
          <li className="text-sky-600 w-60 ">
            <a
              href="https://www.linkedin.com/in/benjamin-nagoshi/"
              target="_blank"
            >
              Linkedin
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Main;
