import { FaLinkedin, FaGithub, FaUser } from "react-icons/fa";

export function Footer() {
  return (
    <footer className="w-full bg-emerald-950 h-30 flex justify-center flex-col gap-4 items-center text-white px-4">
      <span className="text-gray-300 tracking-wider text-sm text-center max-sm:w-8/10">
        © 2025 FinanFlow — Projeto desenvolvido por WebDev FF.
      </span>
      <div className="flex gap-6 ml-6 max-sm:ml-2 max-sm:mt-2">
        <a
          href="https://www.linkedin.com/in/fernando-ferreira-78927b203/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="hover:text-emerald-700 transition-colors"
        >
          <FaLinkedin size={30} />
        </a>
        <a
          href="https://github.com/FernandoFerreira94/FinanFlow-Frontend"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="hover:text-emerald-700 transition-colors"
        >
          <FaGithub size={30} />
        </a>
        <a
          href="https://fernandodev.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Portfólio"
          className="hover:text-emerald-700 transition-colors"
        >
          <FaUser size={30} />
        </a>
      </div>
    </footer>
  );
}
