"use client";
import { Suspense, useEffect, useState } from 'react';
import WOWInvitation from '../../components/WOWInvitation';

function InviteContent() {
  const [inviteData, setInviteData] = useState(null);

  useEffect(() => {
    // Read from URL params
    const params = new URLSearchParams(window.location.search);
    const name = params.get('name') || "Curious Explorer";
    const countryCode = params.get('country') || "IN";
    const countryName = params.get('cname') || "India";
    const countryFlag = params.get('flag') || "🇮🇳";
    const passportNumber = params.get('uid') || "WOW-2026-0000";

    setInviteData({
      name,
      countryCode,
      countryName,
      countryFlag,
      passportNumber
    });
  }, []);

  if (!inviteData) {
    return (
      <div style={{ height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', background: '#060e09', color: '#C9A052' }}>
        Loading invitation...
      </div>
    );
  }

  return (
    <WOWInvitation 
      name={inviteData.name} 
      countryCode={inviteData.countryCode} 
      countryName={inviteData.countryName} 
      countryFlag={inviteData.countryFlag} 
      passportNumber={inviteData.passportNumber} 
    />
  );
}

export default function InvitePage() {
  return (
    <Suspense fallback={<div style={{ height: '100vh', background: '#060e09' }} />}>
      <InviteContent />
    </Suspense>
  );
}
