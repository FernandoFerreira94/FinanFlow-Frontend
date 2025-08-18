import { Link } from "react-router-dom";

interface FooterLinkProps {
  url?: string;
  link?: string;
  text?: string;
}

export function FooterLink({ url = "#", link, text }: FooterLinkProps) {
  return (
    <div className="w-7/10 mx-auto mt-12 text-sm">
      <div className="w-full flex items-center gap-2 text-gray-400 ">
        <hr className="flex-1 border-gray-400" />
        <span className="whitespace-nowrap px-2">{text} </span>
        <hr className="flex-1 border-gray-400" />
      </div>
      {link !== undefined && (
        <Link
          to={url}
          className="w-full flex items-center justify-center mt-10 text-gray-400 transition-colors hover:text-primary-green-6 text-[16px] tracking-wider"
        >
          <span className="whitespace-nowrap px-2">{link}</span>
        </Link>
      )}
    </div>
  );
}
