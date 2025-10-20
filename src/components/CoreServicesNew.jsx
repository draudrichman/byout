import CircularGallery from "./CircularGallery";

const CoreServicesNew = () => {
  return (
    <div>
      <div style={{ height: "600px", position: "relative" }}>
        <CircularGallery
          bend={3}
          textColor="#A9A9A9"
          borderRadius={0.00}
          scrollEase={0.05}
        />
      </div>
    </div>
  );
};

export default CoreServicesNew;
