import facebookIcon from "../../assets/icons/facebook.svg";
import whatsappIcon from "../../assets/icons/whatsapp.svg";
import instagramIcon from "../../assets/icons/instagram.svg";
import twitterIcon from "../../assets/icons/twitter.svg";

const Footer = () => {
  return (
    <footer className="w-full h-16 bg-[#16213d] flex items-center justify-between px-6 mt-auto">
      <p className="text-white text-sm sm:text-base flex-1 text-center m-0">
        © 2025 Ramanasoft. All Rights Reserved.
      </p>
      <div className="flex items-center gap-4 justify-end">
        <a href="https://www.facebook.com/" target="_blank" rel="noopener noreferrer">
          <img src={facebookIcon} alt="Facebook" className="w-6 h-6 hover:opacity-70 transition-opacity cursor-pointer" />
        </a>
        <a href="https://www.whatsapp.com/?lang=en" target="_blank" rel="noopener noreferrer">
          <img src={whatsappIcon} alt="WhatsApp" className="w-6 h-6 hover:opacity-70 transition-opacity cursor-pointer" />
        </a>
        <a href="https://www.instagram.com/" target="_blank" rel="noopener noreferrer">
          <img src={instagramIcon} alt="Instagram" className="w-6 h-6 hover:opacity-70 transition-opacity cursor-pointer" />
        </a>
        <a href="https://x.com/" target="_blank" rel="noopener noreferrer">
          <img src={twitterIcon} alt="Twitter" className="w-6 h-6 hover:opacity-70 transition-opacity cursor-pointer" />
        </a>
      </div>
    </footer>
  );
};

export default Footer;
