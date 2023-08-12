import Image from "next/legacy/image";
export default function BlogItem({ post }) {
  const redirectToHashnode = () => {
    window.open("https://devbxtzz.hashnode.dev/" + post.slug, "_blank");
  };

  const getDateAdded = () => {
    let d = new Date(post.dateAdded);
    let ye = new Intl.DateTimeFormat("en", { year: "numeric" }).format(d);
    let mo = new Intl.DateTimeFormat("en", { month: "short" }).format(d);
    let da = new Intl.DateTimeFormat("en", { day: "2-digit" }).format(d);
    return `${mo} ${da}, ${ye}`;
  };

  const formattedDate = getDateAdded();

  return (
    <div
      className="flex flex-col rounded-sm bg-white dark:bg-mid p-3.5 gap-y-3.5 group border-2 dark:border-mid dark:hover:border-brand hover:border-brand border-transparent cursor-pointer transition-all duration-150 ease-in-out relative"
      onClick={redirectToHashnode}
    >
      <div className="w-auto">
        <Image
          src={post.coverImage}
          layout="responsive"
          width={1080}
          height={567}
        />
      </div>
      <div className="flex flex-col px-2 gap-y-1.5">
        <h3 className="mb-0 text-lg">{post.title}</h3>
        <h6 className="mb-0 text-sm font-semibold font-body">
          {formattedDate}
        </h6>
        <p className="mb-0">{post.brief.substr(0, 150)}...</p>
        <p className="btn-xs btn-brand self-start mt-3">Read more</p>
      </div>
      
    </div>
  );
}
