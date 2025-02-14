import { Logo,} from "@/icons/Logo";
import { Phone ,Mail} from "lucide-react";
export const Footer = () => {
  return (
    <div className="w-screen h-[280px] bg-[#4338CA] flex justify-start text-white">
      <div className="xl:max-w-[1250px] h-full p-5 lg:p-10 flex flex-col lg:flex-row sm:gap-3 lg:justify-between w-full">
        <div>
          <Logo color="white" />
          <p>© 2024 Movie Z. All Rights Reserved.</p>
        </div>
        <div className="flex gap-10">
          <div className="flex flex-col gap-2">
            <p>Contact Information</p>
            <div className="flex items-center gap-2">
              <Mail size={20} />
              <div>
                <p><b>Email</b></p>
                <p>support@movieZ.com</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={20} />
              <div>
                <p><b>Phone</b></p>
                <p>+976 (11) 123-4567</p>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <p>Follow us</p>
            <div className="flex flex-col gap-2 lg:flex-row">
              <p>Facebook</p>
              <p>Instagram</p>
              <p>Twitter</p>
              <p>YouTube</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
