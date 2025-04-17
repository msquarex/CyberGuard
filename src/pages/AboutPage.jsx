import React from "react";
import "../styles/about.css"; // Create a CSS file for styling

const people = [
  {
    name: "Vishwesh Pal Saini",
    image: "/images/goru.jpeg", // Replace with actual image paths
    description: "AI/ML Expert with 2 years of experience."
  },
  {
    name: "Aryan Singh Sisodia",
    image: "/images/siso.jpg", // Replace with actual image paths
    description: "Web Development Enthusiast."
  },
  {
    name: "Madhav Mittal",
    image: "/images/mittal.jpeg", // Replace with actual image paths
    description: "Full stack developer."
  },
];

export default function AboutPage() {
  return (
    <div className="about-page">
      <h1>Meet Our Team</h1>
      <div className="team">
        {people.map((person, index) => (
          <div key={index} className="team-member">
            <img src={person.image} alt={person.name} className="team-image" />
            <h2>{person.name}</h2>
            <p>{person.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
} 