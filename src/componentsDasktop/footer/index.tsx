import { FaLinkedin, FaGithub, FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

// Componente Footer
export function Footer() {
  return (
    <footer className="w-full bg-primary-green-6 h-30 flex justify-center flex-col gap-4 items-center text-white rounded-t-lg">
      <span className="text-gray-300 tracking-wider text-sm text-center">
        © 2025 FinanFlow — Projeto desenvolvido por WebCode FF.
      </span>
      <div className="flex gap-6 ml-6 items-center">
        <Link
          to="https://www.linkedin.com/in/fernando-ferreira-78927b203/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="hover:text-blue-400 p-1 transition-colors duration-500"
        >
          <FaLinkedin size={40} />
        </Link>
        <Link
          to="https://github.com/FernandoFerreira94/FinanFlow-Frontend"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="hover:text-gray-950 duration-500 transition-colors"
        >
          <FaGithub size={40} />
        </Link>
        <Link
          to="https://fernandodev.vercel.app/"
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Portfólio"
          className="hover:text-gray-500 duration-500 transition-colors"
        >
          <FaUser size={40} />
        </Link>
      </div>
    </footer>
  );
}
