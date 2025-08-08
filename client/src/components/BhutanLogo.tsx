interface BhutanLogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
  showText?: boolean;
}

export default function BhutanLogo({ className = "", size = 'md', showText = false }: BhutanLogoProps) {
  const sizeClasses = {
    sm: showText ? 'h-8' : 'w-8 h-8',
    md: showText ? 'h-10' : 'w-10 h-10',
    lg: showText ? 'h-12' : 'w-12 h-12'
  };

  return (
    <div className={`${sizeClasses[size]} ${className} flex items-center`}>
      <svg viewBox="0 0 120 100" className={showText ? 'h-full w-auto mr-3' : 'w-full h-full'}>
        {/* Himalayan mountain range */}
        <path
          d="M5 75 L15 50 L25 60 L35 40 L45 55 L55 30 L65 45 L75 35 L85 50 L95 40 L105 55 L115 75 Z"
          fill="url(#himalayanGradient)"
          className="drop-shadow-lg"
        />
        
        {/* Tiger's Nest Monastery on cliff */}
        <path
          d="M70 45 L85 45 L85 65 L82 65 L82 68 L75 68 L75 65 L70 65 Z"
          fill="url(#monasteryGradient)"
        />
        <rect x="72" y="40" width="11" height="8" rx="1" fill="#dc2626" />
        <rect x="74" y="35" width="7" height="6" rx="1" fill="#ef4444" />
        
        {/* Prayer flags */}
        <path d="M25 45 L30 40 L35 45 L40 40 L45 45 L50 40 L55 45" 
              stroke="#dc2626" strokeWidth="0.8" fill="none" />
        <rect x="27" y="40" width="3" height="4" fill="#dc2626" opacity="0.8" />
        <rect x="32" y="35" width="3" height="4" fill="#2563eb" opacity="0.8" />
        <rect x="37" y="40" width="3" height="4" fill="#16a34a" opacity="0.8" />
        <rect x="42" y="35" width="3" height="4" fill="#ca8a04" opacity="0.8" />
        <rect x="47" y="40" width="3" height="4" fill="#7c3aed" opacity="0.8" />
        
        {/* Dharma wheel */}
        <circle cx="25" cy="25" r="6" fill="none" stroke="#f59e0b" strokeWidth="1.5" />
        <circle cx="25" cy="25" r="2" fill="#f59e0b" />
        <path d="M25 19 L25 31 M19 25 L31 25 M21.5 21.5 L28.5 28.5 M28.5 21.5 L21.5 28.5" 
              stroke="#f59e0b" strokeWidth="1" />
        
        {/* Thunder Dragon silhouette */}
        <path d="M90 20 Q95 15 100 20 Q105 18 108 22 Q106 25 102 24 Q98 26 95 24 Q92 25 90 22 Z" 
              fill="url(#dragonGradient)" opacity="0.9" />
        
        {/* Lotus petals */}
        <path d="M50 85 Q45 80 50 75 Q55 80 50 85 M50 85 Q52 78 58 82 Q54 87 50 85 M50 85 Q48 78 42 82 Q46 87 50 85" 
              fill="url(#lotusGradient)" opacity="0.7" />
        
        <defs>
          <linearGradient id="himalayanGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#f8fafc" />
            <stop offset="30%" stopColor="#0f766e" />
            <stop offset="70%" stopColor="#134e4a" />
            <stop offset="100%" stopColor="#064e3b" />
          </linearGradient>
          
          <linearGradient id="monasteryGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#dc2626" />
            <stop offset="100%" stopColor="#991b1b" />
          </linearGradient>
          
          <linearGradient id="dragonGradient" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#f59e0b" />
            <stop offset="100%" stopColor="#d97706" />
          </linearGradient>
          
          <radialGradient id="lotusGradient" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fbbf24" />
            <stop offset="100%" stopColor="#f59e0b" />
          </radialGradient>
        </defs>
      </svg>
      
      {showText && (
        <div className="flex flex-col">
          <span className="font-bold text-teal-700 text-lg leading-tight">Bhutan</span>
          <span className="font-medium text-amber-600 text-sm leading-tight">Mind Break</span>
        </div>
      )}
    </div>
  );
}