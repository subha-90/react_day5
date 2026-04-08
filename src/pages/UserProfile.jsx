import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Mail, Phone, Globe, MapPin, Building, Briefcase } from 'lucide-react';
import Loader from '../components/Loader';
import './UserProfile.css';

export default function UserProfile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`);
        if (!response.ok) throw new Error('User not found');
        const data = await response.json();
        setUser(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [id]);

  if (loading) return <Loader />;
  if (error) {
    return (
      <div className="error-container">
        <h2>{error}</h2>
        <Link to="/" className="back-link mt-4">
          <ArrowLeft size={20} /> Back to Directory
        </Link>
      </div>
    );
  }
  if (!user) return null;

  return (
    <div className="profile-container">
      <Link to="/" className="back-link">
        <ArrowLeft size={20} />
        <span>Back to Directory</span>
      </Link>
      
      <div className="glass-card profile-card">
        <div className="profile-header">
          <div className="profile-avatar text-gradient">
            {user.name.charAt(0)}
          </div>
          <div className="profile-titles">
            <h2>{user.name}</h2>
            <p className="profile-username">@{user.username}</p>
          </div>
        </div>
        
        <div className="profile-body">
          <div className="info-group">
            <h3>Contact Info</h3>
            <div className="info-item">
              <Mail className="icon" />
              <span>{user.email}</span>
            </div>
            <div className="info-item">
              <Phone className="icon" />
              <span>{user.phone}</span>
            </div>
            <div className="info-item">
              <Globe className="icon" />
              <a href={`http://${user.website}`} target="_blank" rel="noreferrer" className="website-link">
                {user.website}
              </a>
            </div>
          </div>
          
          <div className="info-group">
            <h3>Address</h3>
            <div className="info-item">
              <MapPin className="icon" />
              <span>{user.address.suite}, {user.address.street}, {user.address.city}, {user.address.zipcode}</span>
            </div>
          </div>
          
          <div className="info-group">
            <h3>Company</h3>
            <div className="info-item">
              <Building className="icon" />
              <span className="font-semibold">{user.company.name}</span>
            </div>
            <div className="info-item">
              <Briefcase className="icon" />
              <span className="italic">"{user.company.catchPhrase}"</span>
            </div>
            <div className="info-item text-sm">
              <span className="bs-text">{user.company.bs}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
