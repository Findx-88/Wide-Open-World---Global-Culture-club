import "../../app/globals.css";

export const metadata = {
  title: "You're Invited · Wide Open World",
  description: "You have received a personal invitation to join the WOW Global Culture Club.",
};

export default function InviteLayout({ children }) {
  return (
    <>
      <script
        dangerouslySetInnerHTML={{
          __html: `document.documentElement.setAttribute('data-theme','dark');`,
        }}
      />
      {children}
    </>
  );
}
