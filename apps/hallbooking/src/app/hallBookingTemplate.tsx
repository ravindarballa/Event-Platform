import { useEffect, useState } from "react";

export function HallBookingTemplate({ title }: { title: string }) {
  const url = 'http://localhost:3000/api/hall-booking'; 
  // 1. Initialize as an array since findAll() returns multiple bookings
  const [bookings, setBookings] = useState<any[]>([]);

  useEffect(() => {
    const callAPI = async () => {
     
      try {
       
        const res = await fetch(url);
          console.log("res", res)
        const data = await res.json();
        console.log("data", data)
        // 2. data is an array [{}, {}], not an object with a message
        setBookings(Array.isArray(data) ? data : []); 
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    callAPI();
  }, []);

  return (
    <div className="wrapper">
      <h1>Welcome {title} 👋</h1>
      <h2>Bookings Count: {bookings.length}</h2>
      <ul>
        {/* 3. Map through the data instead of rendering an object */}
        {bookings.map((item:any, index:any) => (
          <li key={item._id || index}>{item.name} - {item.location}</li>
        ))}
      </ul>
    </div>
  );
}
export default HallBookingTemplate;