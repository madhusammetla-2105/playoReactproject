const rawGroundsData = [
  {
    id: "1",
    name: "Hit Zone Box Cricket",
    city: "Hyderabad",
    location: "Uppal, Hyderabad",
    type: "Box Cricket",
    pricePerHour: 1200,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=1000",
    description: "Experience high-energy box cricket at Hit Zone in Uppal. Perfect for evening games with friends.",
    amenities: ["Floodlights", "Parking", "Washrooms", "Seating"]
  },
  {
    id: "2",
    name: "Gss Lords Big Box Cricket",
    city: "Hyderabad",
    location: "Madhapur, Hyderabad",
    type: "Box Cricket",
    pricePerHour: 1600,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&q=80&w=1000",
    description: "Premium turf and high-end lighting make Gss Lords the top choice in Madhapur for serious cricketers.",
    amenities: ["Premium Turf", "Floodlights", "Music System", "Parking"]
  },
  {
    id: "3",
    name: "Sports Turf",
    city: "Hyderabad",
    location: "Gachibowli, Hyderabad",
    type: "Multi-Sport",
    pricePerHour: 1500,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1587280501635-a19de238a81e?auto=format&fit=crop&q=80&w=1000",
    description: "Versatile arena in Gachibowli suitable for both Box Cricket and Football matches.",
    amenities: ["Changing Rooms", "Parking", "Floodlights"]
  },
  {
    id: "4",
    name: "NEX ARENA ABIDS",
    city: "Hyderabad",
    location: "Abids, Hyderabad",
    type: "Rooftop Turf",
    pricePerHour: 1300,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1551280857-2b9bbe52ccbd?auto=format&fit=crop&q=80&w=1000",
    description: "Unique rooftop playing experience in the heart of the city at Abids.",
    amenities: ["Rooftop Turf", "Lighting", "Washrooms"]
  },
  {
    id: "5",
    name: "ARENA Entertainment",
    city: "Hyderabad",
    location: "Madhapur, Hyderabad",
    type: "Multi-Sport",
    pricePerHour: 1400,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&q=80&w=1000",
    description: "24x7 open facility in Madhapur for non-stop cricket and football action.",
    amenities: ["24x7 Open", "Floodlights", "Parking"]
  },
  {
    id: "6",
    name: "Sports Turf Cricket Academy",
    city: "Hyderabad",
    location: "Manikonda, Hyderabad",
    type: "Academy",
    pricePerHour: 1200,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1524334228333-0f6db392f8a1?auto=format&fit=crop&q=80&w=1000",
    description: "Professional coaching environment and quality turf at Manikonda.",
    amenities: ["Coaching", "Floodlights", "Water Facility"]
  },
  {
    id: "7",
    name: "Hyderabad Sports Pride",
    city: "Hyderabad",
    location: "Shapur Nagar, Hyderabad",
    type: "Box Cricket",
    pricePerHour: 1100,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=1000",
    description: "Community favorite in Shapur Nagar offering a great box cricket atmosphere.",
    amenities: ["Parking", "Floodlights", "Seating"]
  },
  {
    id: "8",
    name: "HOTFUT @ Inorbit Mall",
    city: "Hyderabad",
    location: "Madhapur, Hyderabad",
    type: "Premium Arena",
    pricePerHour: 1800,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1431324155629-1a6eda1eed2d?auto=format&fit=crop&q=80&w=1000",
    description: "Play at the iconic Inorbit Mall rooftop. Perfect for combining sports with a mall visit.",
    amenities: ["Mall Parking", "Cafe", "Floodlights"]
  },
  {
    id: "9",
    name: "Sky Sports Arena",
    city: "Hyderabad",
    location: "Gundlapochampally, Hyderabad",
    type: "Multi-Sport",
    pricePerHour: 1000,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1595435063032-4299b99616c8?auto=format&fit=crop&q=80&w=1000",
    description: "Excellent night lighting and well-maintained turf at Gundlapochampally.",
    amenities: ["Night Lighting", "Parking", "Washrooms"]
  },
  {
    id: "10",
    name: "Meridian Madhapur Tightend Sports Arena",
    city: "Hyderabad",
    location: "Madhapur, Hyderabad",
    type: "Box Cricket",
    pricePerHour: 1700,
    rating: 3.8,
    image: "https://images.unsplash.com/photo-1562077772-3bd90403f7f0?auto=format&fit=crop&q=80&w=1000",
    description: "Premium turf located in the heart of Madhapur, perfect for corporate bookings.",
    amenities: ["Premium Turf", "Floodlights", "Seating"]
  },
  {
    id: "11",
    name: "MS Elite Box Cricket",
    city: "Hyderabad",
    location: "Madhapur, Hyderabad",
    type: "Box Cricket",
    pricePerHour: 900,
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1544641904-2066d790d931?auto=format&fit=crop&q=80&w=1000",
    description: "Affordable and accessible box cricket arena in Madhapur.",
    amenities: ["Parking", "Water Facility", "Lighting"]
  },
  {
    id: "12",
    name: "Kick And Hit Sports Arena",
    city: "Hyderabad",
    location: "Alwal, Hyderabad",
    type: "Multi-Sport",
    pricePerHour: 799,
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1510531704581-5b2870972060?auto=format&fit=crop&q=80&w=1000",
    description: "Great value arena in Alwal for both football and box cricket enthusiasts.",
    amenities: ["Floodlights", "Washrooms"]
  },
  {
    id: "13",
    name: "Battlefields Sports Arena",
    city: "Hyderabad",
    location: "Sultanpur, Hyderabad",
    type: "Professional Ground",
    pricePerHour: 2000,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1593341646782-e0b495cff86d?auto=format&fit=crop&q=80&w=1000",
    description: "Massive professional-grade turf in Sultanpur for large scale matches.",
    amenities: ["Large Turf", "Parking", "Lighting"]
  },
  {
    id: "14",
    name: "MSD Arena",
    city: "Hyderabad",
    location: "Sultanpur, Hyderabad",
    type: "Premium Arena",
    pricePerHour: 2200,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1552667466-07770ae110d0?auto=format&fit=crop&q=80&w=1000",
    description: "Named after the legend, offering premium facilities and a cafeteria for post-match snacks.",
    amenities: ["Premium Turf", "Cafeteria", "Parking"]
  },
  {
    id: "15",
    name: "Bend it 4.0",
    city: "Hyderabad",
    location: "Madhapur, Hyderabad",
    type: "Multi-Sport",
    pricePerHour: 1400,
    rating: 4.0,
    image: "https://images.unsplash.com/photo-1529900913132-ba0d703fee2a?auto=format&fit=crop&q=80&w=1000",
    description: "Play with music! A fun atmosphere in Madhapur for lively matches.",
    amenities: ["Music", "Floodlights", "Parking"]
  },
  {
    id: "16",
    name: "V Sportzz",
    city: "Hyderabad",
    location: "Madhapur, Hyderabad",
    type: "Indoor Arena",
    pricePerHour: 1300,
    rating: 3.5,
    image: "https://images.unsplash.com/photo-1536122221562-f2ed1b729148?auto=format&fit=crop&q=80&w=1000",
    description: "Quality indoor facility with dedicated cricket nets in Madhapur.",
    amenities: ["Indoor Arena", "Washrooms"]
  },
  {
    id: "17",
    name: "TURFEDGE by Retro Sports",
    city: "Hyderabad",
    location: "Madhapur, Hyderabad",
    type: "Multi-Sport",
    pricePerHour: 1500,
    rating: 3.9,
    image: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?auto=format&fit=crop&q=80&w=1000",
    description: "High-quality turf and great refreshments in the Madhapur area.",
    amenities: ["Floodlights", "Parking", "Refreshments"]
  },
  {
    id: "18",
    name: "Mohd Azharuddin Indoor Cricket",
    city: "Hyderabad",
    location: "Madhapur, Hyderabad",
    type: "Indoor Nets",
    pricePerHour: 1300,
    rating: 2.4,
    image: "https://images.unsplash.com/photo-1589487391730-58f20eb2c308?auto=format&fit=crop&q=80&w=1000",
    description: "Indoor practice nets and coaching facilities in Madhapur.",
    amenities: ["Indoor Nets", "Coaching", "Washrooms"]
  },
  {
    id: "19",
    name: "One Zone Cricket & PickleBall",
    city: "Hyderabad",
    location: "Hyderabad",
    type: "Multi-Sport",
    pricePerHour: 1400,
    rating: 4.0,
    image: "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?auto=format&fit=crop&q=80&w=1000",
    description: "A unique combination of cricket and pickleball in Hyderabad.",
    amenities: ["Parking", "Lighting"]
  },
  {
    id: "20",
    name: "Galaxy Box Cricket & Football",
    city: "Hyderabad",
    location: "Upperpally, Hyderabad",
    type: "Box Cricket",
    pricePerHour: 1200,
    rating: 5.0,
    image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&q=80&w=1000",
    description: "Top-rated box cricket and football facility in Upperpally.",
    amenities: ["Floodlights", "Parking", "Seating"]
  },
  {
    id: "21",
    name: "The Turf Cafe",
    city: "Hyderabad",
    location: "Kondapur, Hyderabad",
    type: "Multi-Sport",
    pricePerHour: 1600,
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1521017432531-fbd92d768814?auto=format&fit=crop&q=80&w=1000",
    description: "Combines high-quality sports arenas with a cozy cafe in Kondapur.",
    amenities: ["Cafe", "Parking", "Washrooms"]
  },
  {
    id: "22",
    name: "Gamers Den",
    city: "Hyderabad",
    location: "Hyderabad",
    type: "Indoor Box",
    pricePerHour: 1000,
    rating: 4.0,
    image: "https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=1000",
    description: "Great indoor setup for box cricket in Hyderabad.",
    amenities: ["Indoor Setup", "Lighting"]
  },
  {
    id: "23",
    name: "Inplay Sports Arena",
    city: "Hyderabad",
    location: "Hyderabad",
    type: "Multi-Sport",
    pricePerHour: 1300,
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=1000",
    description: "Modern multi-sport arena with excellent facilities in Hyderabad.",
    amenities: ["Parking", "Washrooms", "Floodlights"]
  },
  {
    id: "24",
    name: "Sportnspark Cricket Academy",
    city: "Hyderabad",
    location: "Hyderabad",
    type: "Academy",
    pricePerHour: 900,
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?auto=format&fit=crop&q=80&w=1000",
    description: "Dedicated cricket academy with focused practice nets and coaching.",
    amenities: ["Coaching", "Practice Nets"]
  },
  {
    id: "25",
    name: "Shivaji Cricket Academy & Box Cricket",
    city: "Hyderabad",
    location: "Hyderabad",
    type: "Academy",
    pricePerHour: 1100,
    rating: 4.0,
    image: "https://images.unsplash.com/photo-1587280501635-a19de238a81e?auto=format&fit=crop&q=80&w=1000",
    description: "Professional coaching and quality box cricket facilities in Hyderabad.",
    amenities: ["Floodlights", "Practice Nets"]
  },
  {
    id: "26",
    name: "HummingBird Cricket Stadium",
    city: "Hyderabad",
    location: "Shamshabad, Hyderabad",
    type: "Professional Stadium",
    pricePerHour: 4500,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=1000",
    description: "Full professional stadium in Shamshabad for large tournaments and matches.",
    amenities: ["Full Stadium", "Parking", "Pavilion", "Floodlights"]
  },
  {
    id: "27",
    name: "AM Cricket Ground",
    city: "Hyderabad",
    location: "Aziznagar, Hyderabad",
    type: "Cricket Ground",
    pricePerHour: 1800,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1531415074968-036ba1b575da?auto=format&fit=crop&q=80&w=1000",
    description: "Great natural ground in Aziznagar, equipped for night matches.",
    amenities: ["Night Matches", "Parking", "Washrooms"]
  },
  {
    id: "28",
    name: "MRR Cricket Ground",
    city: "Hyderabad",
    location: "Aziz Nagar, Hyderabad",
    type: "Cricket Ground",
    pricePerHour: 2000,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=1000",
    description: "Professional grade ground with floodlights and ample parking in Aziz Nagar.",
    amenities: ["Professional Ground", "Parking", "Floodlights"]
  },
  {
    id: "29",
    name: "MCG - Mailika Cricket Ground",
    city: "Hyderabad",
    location: "Thondapalli, Hyderabad",
    type: "Cricket Ground",
    pricePerHour: 1700,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1593341646782-e0b495cff86d?auto=format&fit=crop&q=80&w=1000",
    description: "Spacious cricket ground in Thondapalli with all essential facilities.",
    amenities: ["Large Ground", "Parking", "Water Facility"]
  },
  {
    id: "30",
    name: "Turf Box Cricket",
    city: "Hyderabad",
    location: "Amberpet, Hyderabad",
    type: "Box Cricket",
    pricePerHour: 1000,
    rating: 4.6,
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&q=80&w=1000",
    description: "Well-maintained box cricket arena in Amberpet with floodlights.",
    amenities: ["Floodlights", "Washrooms", "Seating"]
  },
  {
    id: "31",
    name: "Gachibowli Stadium Turf",
    city: "Hyderabad",
    location: "Gachibowli, Hyderabad",
    type: "Professional Ground",
    pricePerHour: 2500,
    rating: 4.8,
    image: "https://images.unsplash.com/photo-1593341646782-e0b495cff86d?auto=format&fit=crop&q=80&w=1000",
    description: "High-quality professional turf for football and cricket located near the stadium.",
    amenities: ["Professional Turf", "Parking", "Floodlights"]
  },
  {
    id: "32",
    name: "Kondapur Sports Hub",
    city: "Hyderabad",
    location: "Kondapur, Hyderabad",
    type: "Box Cricket",
    pricePerHour: 1300,
    rating: 4.5,
    image: "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&q=80&w=1000",
    description: "Centrally located in Kondapur, offering top-notch box cricket facilities.",
    amenities: ["Floodlights", "Parking", "Water Facility"]
  },
  {
    id: "33",
    name: "Uppal Cricket Nets",
    city: "Hyderabad",
    location: "Uppal, Hyderabad",
    type: "Indoor Nets",
    pricePerHour: 1100,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1589487391730-58f20eb2c308?auto=format&fit=crop&q=80&w=1000",
    description: "Quality indoor practice nets for cricketers in the Uppal area.",
    amenities: ["Indoor Nets", "Coaching", "Washrooms"]
  },
  {
    id: "34",
    name: "Banjara Hills Elite Turf",
    city: "Hyderabad",
    location: "Banjara Hills, Hyderabad",
    type: "Premium Arena",
    pricePerHour: 2000,
    rating: 4.9,
    image: "https://images.unsplash.com/photo-1552667466-07770ae110d0?auto=format&fit=crop&q=80&w=1000",
    description: "Luxury sports experience in the heart of Banjara Hills.",
    amenities: ["Valet Parking", "Premium Turf", "Lounge"]
  },
  {
    id: "35",
    name: "Banjara Sports Club",
    city: "Hyderabad",
    location: "Banjara Hills, Hyderabad",
    type: "Multi-Sport",
    pricePerHour: 1500,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&q=80&w=1000",
    description: "A versatile club in Banjara Hills for multiple sports activities.",
    amenities: ["Floodlights", "Changing Rooms", "Cafe"]
  },
  {
    id: "36",
    name: "Jubilee Hills Sports Arena",
    city: "Hyderabad",
    location: "Jubilee Hills, Hyderabad",
    type: "Premium Arena",
    pricePerHour: 2200,
    rating: 4.7,
    image: "https://images.unsplash.com/photo-1431324155629-1a6eda1eed2d?auto=format&fit=crop&q=80&w=1000",
    description: "State-of-the-art sports arena located in the upscale Jubilee Hills.",
    amenities: ["High-End Lighting", "Parking", "Refreshments"]
  },
  {
    id: "37",
    name: "Jubilee Box Cricket",
    city: "Hyderabad",
    location: "Jubilee Hills, Hyderabad",
    type: "Box Cricket",
    pricePerHour: 1600,
    rating: 4.4,
    image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&q=80&w=1000",
    description: "Exciting box cricket matches in the vibrant Jubilee Hills area.",
    amenities: ["Floodlights", "Seating", "Parking"]
  },
  {
    id: "38",
    name: "Kukatpally Smash Arena",
    city: "Hyderabad",
    location: "Kukatpally, Hyderabad",
    type: "Multi-Sport",
    pricePerHour: 1400,
    rating: 4.2,
    image: "https://images.unsplash.com/photo-1587280501635-a19de238a81e?auto=format&fit=crop&q=80&w=1000",
    description: "Popular multi-sport destination in the bustling Kukatpally area.",
    amenities: ["Parking", "Floodlights", "Washrooms"]
  },
  {
    id: "39",
    name: "Kukatpally Box Cricket",
    city: "Hyderabad",
    location: "Kukatpally, Hyderabad",
    type: "Box Cricket",
    pricePerHour: 1200,
    rating: 4.3,
    image: "https://images.unsplash.com/photo-1551958219-acbc608c6377?auto=format&fit=crop&q=80&w=1000",
    description: "Well-connected and affordable box cricket turf in Kukatpally.",
    amenities: ["Floodlights", "Water Facility"]
  },
  {
    id: "40",
    name: "Manikonda Multi-Sport Arena",
    city: "Hyderabad",
    location: "Manikonda, Hyderabad",
    type: "Multi-Sport",
    pricePerHour: 1450,
    rating: 4.1,
    image: "https://images.unsplash.com/photo-1560272564-c83b66b1ad12?auto=format&fit=crop&q=80&w=1000",
    description: "A great new arena in Manikonda for cricket and football lovers.",
    amenities: ["Floodlights", "Parking", "Cafe"]
  }
];

// Curated review pool for realistic mock user feedback
const reviewsPool = [
  { user: "Rahul Sharma", comment: "Absolutely loved the turf quality. The lighting is perfect for night matches!", date: "2026-05-12" },
  { user: "Vikram Reddy", comment: "Very good place for box cricket. The height of the nets is excellent.", date: "2026-05-10" },
  { user: "Priya Patel", comment: "Superb maintenance. Parking space is a bit limited but the court is top-class.", date: "2026-05-09" },
  { user: "Anil Kumar", comment: "Decent pricing and well-maintained. Washrooms are clean.", date: "2026-05-08" },
  { user: "Suresh Raina", comment: "Best box cricket arena in this area. Highly recommended!", date: "2026-05-05" },
  { user: "Karthik G", comment: "Good turf but slightly expensive during peak hours.", date: "2026-05-01" },
  { user: "Meera Naidu", comment: "Nice environment and friendly staff. Had a great time with family.", date: "2026-04-28" },
  { user: "Tarun K.", comment: "Excellent bounce on the turf. Had a great 2-hour game.", date: "2026-05-14" },
  { user: "Divya S.", comment: "Beautifully managed facility, super easy booking process.", date: "2026-05-13" },
  { user: "Sandeep V.", comment: "Excellent lighting. Playing under lights here is awesome.", date: "2026-05-11" }
];

export const groundsData = rawGroundsData.map(ground => {
  // 1. Assign highly realistic generated local image based on the turf's category/name
  let assignedImage = "/images/football_turf_1.png"; // default
  
  const typeLower = ground.type.toLowerCase();
  const nameLower = ground.name.toLowerCase();

  if (nameLower.includes("rooftop") || nameLower.includes("inorbit") || typeLower.includes("rooftop")) {
    assignedImage = "/images/rooftop_turf_1.png";
  } else if (typeLower.includes("box cricket") || nameLower.includes("box cricket")) {
    assignedImage = "/images/box_cricket_1.png";
  } else if (typeLower.includes("indoor") || typeLower.includes("nets") || nameLower.includes("indoor") || nameLower.includes("nets")) {
    assignedImage = "/images/indoor_nets_1.png";
  } else if (typeLower.includes("professional") || typeLower.includes("stadium") || typeLower.includes("cricket ground") || nameLower.includes("ground") || nameLower.includes("stadium")) {
    assignedImage = "/images/premium_stadium_1.png";
  } else {
    assignedImage = "/images/football_turf_1.png";
  }

  // 2. Generate deterministic reviews based on ground's ID to populate the UI realistically
  const idNum = parseInt(ground.id) || 1;
  const reviewCount = (idNum % 3) + 2; // Each ground gets 2 to 4 reviews
  const reviews = [];

  for (let i = 0; i < reviewCount; i++) {
    const poolIndex = (idNum + i * 7) % reviewsPool.length;
    const baseReview = reviewsPool[poolIndex];
    
    // Assign a rating close to the ground's average rating (e.g., ground.rating - 0.5 to ground.rating + 0.5)
    let reviewRating = Math.round(ground.rating);
    if (i === 0) reviewRating = Math.ceil(ground.rating);
    if (i === 1) reviewRating = Math.floor(ground.rating);
    reviewRating = Math.max(1, Math.min(5, reviewRating));

    reviews.push({
      id: `${ground.id}-r-${i}`,
      user: baseReview.user,
      rating: reviewRating,
      comment: baseReview.comment,
      date: baseReview.date
    });
  }

  // Recalculate average rating of the reviews to be mathematically consistent
  const averageRating = parseFloat(
    (reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length).toFixed(1)
  );

  return {
    ...ground,
    image: assignedImage,
    reviews: reviews,
    rating: averageRating // Synchronize actual rating with review average
  };
});
