import React from "react";
import ExternalLink from "./icons/ExternalLink";
import GitHub from "./icons/GitHub";
import Button from "./Button";

const ProjectCard = ({ project }) => {
  const { title, overview, stack, link, repo, isSiteLive } = project;

  return (
    <div className="flex flex-col w-full rounded-md bg-white dark:bg-mid px-7 py-7 shadow-md shadow-light/10 dark:shadow-dark">
      <svg
        id="abbe8588-8b21-44fd-a605-eb7de7f82941"
        data-name="Layer 1"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 93.13 75.2"
        width ="40"
        height="40"
      >
        <path
          className="dark:opacity-50 dark:fill-current dark:text-light fill-brand"
          d="M24.05,38.51,7.5,55.06a4.39,4.39,0,1,1-6.21-6.21L14.74,35.41,1.29,22A4.39,4.39,0,0,1,7.5,15.75L24.05,32.3A4.4,4.4,0,0,1,24.05,38.51Z"
        />
        <path
          className="dark:opacity-50 dark:fill-current dark:text-light fill-brand"
          d="M91.85,55.06a4.38,4.38,0,0,1-6.21,0L69.09,38.51a4.4,4.4,0,0,1,0-6.21L85.64,15.75A4.39,4.39,0,0,1,91.85,22L78.41,35.41,91.85,48.85A4.4,4.4,0,0,1,91.85,55.06Z"
        />
        <rect
          className="dark:opacity-50 dark:fill-current dark:text-light fill-brand"
          x="41.93"
          y="-1.17"
          width="8.78"
          height="77.54"
          rx="4.39"
          transform="translate(11.31 -10.71) rotate(15)"
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
