import { useRef } from "react";
import UploadForm from "../components/UploadForm";
import MyTransfers from "../components/MyTransfers";

function Home() {

  const targetRef = useRef(null); // Ref to the component to scroll to

  const handleScroll = () => {
    const target = targetRef.current;
    if (!target) return; // Handle missing target element

    const targetTop = target.offsetTop; // Get offset from top
    window.scrollTo({ top: targetTop, behavior: "smooth" }); // Smooth scroll
  };

 

  return (
    <>
      <div className="hero min-h-screen bg-base-200">
        <div className="hero-content flex-col lg:flex-row-reverse">
          <img
            src="https://images.pexels.com/photos/4792286/pexels-photo-4792286.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
            className="max-w-sm rounded-lg select-none shadow-2xl"
          />
          <div>
            <h1 className="text-5xl font-bold">ShareHUB!</h1>

            <p className="py-5 text-xl">
              Transfer and have your files travel for free <br />
              ShareHub is a simple and free way to safely share your data
            </p>

            <div className="py-5">
              <h1>Create Link and Share it directly using Create Link </h1>
              <h1>Create Link and Share it through Email using Send Files </h1>
            </div>

            <button onClick={handleScroll} className="btn btn-primary">
              Get Started
            </button>
          </div>
        </div>
      </div>
      <MyTransfers />
      <UploadForm reff={targetRef} />
    </>
  );
}

export default Home;
