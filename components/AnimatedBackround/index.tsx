import React from 'react';
import styles from './styles.module.scss'; 

const COLORS = {
    darkBlue: '#1E4A8D',
    gray: '#D9D9D9',
    darkGray: '#041A3E',
} as const;

const SIZE = {
    width: "100%",
    height: "100%",
    circleRadius: 802,
    rectWidth: 109,
    rectHeight: 110,
    strokeWidth: 0.6,
};

const AnimatedBackground = () => {
    return (
        <svg 
            className={styles.background}
            width={SIZE.width} 
            height={SIZE.height} 
            viewBox="0 0 1440 900" 
            fill="none" 
            xmlns="http://www.w3.org/2000/svg"
        >
            <mask id="mask0_2001_16" style={{ maskType: "alpha" }} maskUnits="userSpaceOnUse" x="-82" y="-352" width="1604" height="1604">
                <circle cx="720" cy="450" r={SIZE.circleRadius} fill="url(#paint0_radial_2001_16)" />
            </mask>
            <g mask="url(#mask0_2001_16)">
                {Array.from({ length: 8 }).map((_, index) => (
                    <line 
                        key={index} 
                        x1="2.62268e-08" 
                        y1={index * 112.5} 
                        x2={SIZE.width} 
                        y2={index * 112.5} 
                        stroke={COLORS.darkBlue} 
                        strokeWidth={SIZE.strokeWidth} 
                        strokeDasharray="3,5" 
                    />
                ))}
                {Array.from({ length: 15 }).map((_, index) => (
                    <line 
                        key={index} 
                        x1={index * 111.5} 
                        y1={SIZE.height} 
                        x2={index * 111.5} 
                        y2="-540" 
                        stroke={COLORS.darkBlue} 
                        strokeWidth={SIZE.strokeWidth} 
                        strokeDasharray="3,5" 
                    />
                ))}
                
                <g opacity="0.47">
                    <rect x="332.5" y="113.5" width={SIZE.rectWidth} height={SIZE.rectHeight} fill={COLORS.darkGray} />
                    <rect x="886.5" y="1.5" width={SIZE.rectWidth} height={SIZE.rectHeight} fill={COLORS.darkGray} />
                    <rect x="1218.5" y="225.5" width={SIZE.rectWidth} height={SIZE.rectHeight + 1} fill={COLORS.darkGray} />
                </g>
            </g>

            <defs>
                <radialGradient id="paint0_radial_2001_16" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse" gradientTransform="translate(720 294.5) rotate(90) scale(957.5)">
                    <stop stopColor={COLORS.gray} />
                    <stop offset="1" stopColor={COLORS.gray} stopOpacity="0" />
                </radialGradient>
            </defs>
        </svg>
    );
};

export default AnimatedBackground;
