import { Logo, Message, PhoneIcon } from "@/icons/index";
export const Footer = () => {
  return (
    <div className="w-screen h-[280px] bg-[#4338CA] flex justify-center text-white">
      <div className="w-[1250px] h-full p-10 flex justify-between">
        <div>
          <Logo color="white" />
          <p>© 2024 Movie Z. All Rights Reserved.</p>
        </div>
        <div className="flex gap-10">
          <div className="flex flex-col gap-2">
            <p>Contact Information</p>
            <div className="flex items-center gap-2">
              <Message />
              <div>
                <p>Email</p>
                <p>support@movieZ.com</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <PhoneIcon />
              <div>
                <p>Phone</p>
                <p>+976 (11) 123-4567</p>
              </div>
            </div>
          </div>
          <div>
            <p>Follow us</p>
            <p>Facebook Instagram Twitter YouTube</p>
          </div>
        </div>
      </div>
    </div>
  );
};
