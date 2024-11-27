import React from 'react';
import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <header style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h1>Welcome to Our College Portal</h1>
        <p>
          Explore academic opportunities and collaboration. Access course materials, stay updated on events, and grow with us.
        </p>
        <Link to="/" style={{ textDecoration: 'none', color: '#007BFF' }}>Read More</Link>
      </header>

      <section style={{ display: 'flex', justifyContent: 'space-around', marginBottom: '30px' }}>
        <div style={{ textAlign: 'center' }}>
          <img src={require('./../../images/icon-1.png')} alt="Icon 1" style={{ width: '80px', marginBottom: '10px' }} />
          <h3>Discover Courses</h3>
          <p>Explore a range of courses tailored to your interests.</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <img src={require('./../../images/icon-2.png')} alt="Icon 2" style={{ width: '80px', marginBottom: '10px' }} />
          <h3>Expand Knowledge</h3>
          <p>Immerse yourself in meaningful learning opportunities.</p>
        </div>
        <div style={{ textAlign: 'center' }}>
          <img src={require('./../../images/icon-3.png')} alt="Icon 3" style={{ width: '80px', marginBottom: '10px' }} />
          <h3>Engage with Community</h3>
          <p>Join a vibrant learning community.</p>
        </div>
      </section>

      <section style={{ textAlign: 'center', marginBottom: '30px' }}>
        <h2>Explore the Campus Experience</h2>
        <p>Immerse yourself in a transformative academic journey.</p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          <img src={require('./../../images/img-4.jpg')} alt="Campus 1" style={{ width: '150px' }} />
          <img src={require('./../../images/img-5.jpg')} alt="Campus 2" style={{ width: '150px' }} />
          <img src={require('./../../images/img-6.jpg')} alt="Campus 3" style={{ width: '150px' }} />
        </div>
      </section>

      <aside style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '5px' }}>
        <h2>Search Our Portal</h2>
        <input
          type="text"
          placeholder="Search here..."
          style={{ padding: '10px', width: '80%', marginBottom: '10px', borderRadius: '5px', border: '1px solid #ccc' }}
        />
        <button style={{ padding: '10px 20px', backgroundColor: '#007BFF', color: 'white', border: 'none', borderRadius: '5px' }}>
          Search
        </button>
      </aside>
    </div>
  );
}

export default HomePage;
