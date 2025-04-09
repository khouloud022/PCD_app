import React from 'react';
import './HomePage.css'; 

const HomePage = () => {
  

  const features = [
    {
      id: 1,
      title: 'Dashboard',
      icon: '📊',
      route: '/Main',
      color: '#4CAF50'
    },
    {
      id: 2,
      title: 'Search a tender',
      icon: '✉️',
      route: '/tender',
      color: '#2196F3'
    },
    {
      id: 3,
      title: 'Place a bid',
      icon: '📅',
      route: '/bid',
      color: '#FF9800'
    },
    {
      id: 4,
      title: 'Get remunerated',
      icon: '⚙️',
      route: '/award',
      color: '#9C27B0'
    },
    {
      id: 5,
      title: 'Profile',
      icon: '📈',
      route: '/profile',
      color: '#F44336'
    },
    {
      id: 6,
      title: 'Log Out',
      icon: '❓',
      route: '/Log Out',
      color: '#607D8B'
    }
  ];

  return (
    <div className="main">
    <div className="home-page">
      
        <h1 >Welcome back </h1>
     <br></br>

      <div className="features-grid">
        {features.map((feature) => (
          <div 
            key={feature.id}
            className="feature-card"
            style={{ backgroundColor: feature.color }}
            
          >
            <div className="feature-icon">{feature.icon}</div>
            <h3>{feature.title}</h3>
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default HomePage;