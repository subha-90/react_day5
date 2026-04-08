import React from 'react';
import { Mail, Briefcase, MapPin, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import './UserCard.css';

export default function UserCard({ user }) {
  return (
    <Link to={`/user/${user.id}`} className="glass-card user-card-link">
      <div className="user-card-content">
        <div className="user-avatar text-gradient">
          {user.name.charAt(0)}
        </div>
        <div className="user-info">
          <h3>{user.name}</h3>
          <p className="username">@{user.username}</p>
          
          <div className="user-detail-row">
            <Mail size={16} className="icon" />
            <span>{user.email}</span>
          </div>
          <div className="user-detail-row">
            <Briefcase size={16} className="icon" />
            <span>{user.company.name}</span>
          </div>
          <div className="user-detail-row">
            <MapPin size={16} className="icon" />
            <span>{user.address.city}</span>
          </div>
        </div>
        <div className="card-action">
          <ChevronRight size={24} className="action-icon" />
        </div>
      </div>
    </Link>
  );
}
