import React from "react";
import ExternalLink from "./icons/ExternalLink";
import GitHub from "./icons/GitHub";
import Button from "./Button";

const ProjectCard = ({ project }) => {
  const { title, overview, stack, link, repo, isSiteLive } = project;

  return (
    <div className="flex flex-col w-full rounded-md bg-white dark:bg-mid px-7 py-7 shadow-md shadow-light/10 dark:shadow-dark">
      <svg
        width="50px"
        height="50px"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 4H6C4.89543 4 4 4.89543 4 6V14C4 15.1046 4.89543 16 6 16H18C19.1046 16 20 15.1046 20 14V12"
          stroke="#008080"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M15 4L13 6L15 8"
          stroke="#008080"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M19 4L21 6L19 8"
          stroke="#008080"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M12 16V20"
          stroke="#008080"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
        <path
          d="M8 20H16"
          stroke="#008080"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
      <p className="inline-block px-0 pb-5 mb-4 text-xl font-bold border-b-4 flex-start border-brand dark:text-white text-dark">
        {title}
      </p>
      <p>{overview}</p>
      {/* Stack icons inner container */}
      <div className="flex mt-auto">
        <ul className="flex flex-wrap list-none list-inside">
          {stack.map(function (stackItem, i) {
            return (
              <li
                className="flex items-center mr-3 opacity-50 text-brand"
                key={i}
              >
                <span className="small-text">{stackItem}</span>
              </li>
            );
          })}
        </ul>
      </div>
      {/* Live and GitHub container */}
      <div className={`flex ${link || repo ? "mt-4" : ""}`}>
        {link ? (
          <Button
            link={link}
            text={null}
            square={true}
            icon={<ExternalLink square={true} />}
          />
        ) : null}

        {repo ? (
          <Button
            link={repo}
            text={null}
            square={true}
            icon={<GitHub square={true} />}
          />
        ) : null}

        {!isSiteLive ? <p className="my-4 small-text">Coming soon</p> : null}
      </div>
    </div>
  );
};

export default ProjectCard;
