import { useEffect, useState } from "react";

export function PhotographyTemplate({ title }: { title: string }) {
  const url = '/api/photography';
  // Define a type for your state if it's not always a string
  const [photo, setPhoto] = useState<string>(""); 
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        const data = await response.json();
        setPhoto(data); // Assuming data is a single string or primitive
      } catch (err) {
        console.error("Error fetching photo data:", err);
        setError("Failed to load photo data.");
      }
    };

    fetchData();
  }, []); // Empty dependency array means it runs once on mount

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="wrapper">
        <div className="container">
          <div id="welcome">
            <h1>
              <span> Hello there, </span>
              Welcome {title} 👋
              photo: {photo}
            </h1>
          </div>
        </div>
      </div>
    </>
  );
}

export default PhotographyTemplate;
