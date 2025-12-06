import { Hero } from "../retail-channel/gsapcountries-main/app/components/hero/hero";
import CardAnimation from "../retail-channel/gsapcountries-main/app/components/card-animation";
import { Countries } from "../retail-channel/gsapcountries-main/app/components";
import BackButton from "../components/ui/BackButton";
// import Navbar from "../components/ui/Navbar";
import "../retail-channel/gsapcountries-main/app/app.css";
// import "./RetailChannelPage.css";

function RetailChannelPage() {
  return (
    <div className="retail-page-wrapper">
      <BackButton />
      {/* <Navbar isLoaded={true} /> */}
      <Hero />
      <CardAnimation />
      <Countries />
    </div>
  );
}

export default RetailChannelPage;
