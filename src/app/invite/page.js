"use client";
import { Suspense, useEffect, useState } from 'react';
import WOWInvitation from '../../components/WOWInvitation';
import { WOW_MEMBERS } from '../../data/members';

function InviteContent() {
  const [inviteData, setInviteData] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const uid = params.get('uid');

    if (!uid) {
      setNotFound(true);
      return;
    }

    // Look up member by passport number (uid)
    const member = WOW_MEMBERS.find(
      (m) => m.passport_number.toLowerCase() === uid.toLowerCase()
    );

    if (!member) {
      setNotFound(true);
      return;
    }

    setInviteData({
      name: member.member_name,
      countryCode: member.country_code,
      countryName: member.country,
      countryFlag: member.country_flag,
      passportNumber: member.passport_number,
    });
  }, []);

  if (notFound) {
    return (
      <div style={{
        height: '100vh', display: 'flex', flexDirection: 'column',
        justifyContent: 'center', alignItems: 'center',
        background: 'radial-gradient(ellipse at 35% 45%, #1a3828 0%, #0c1e12 55%, #060e09 100%)',
        color: '#C9A052', fontFamily: "'Jost', sans-serif", gap: 12,
      }}>
        <div style={{ fontSize: 36, opacity: 0.5 }}>🌐</div>
        <div style={{ fontSize: 13, letterSpacing: '0.3em', textTransform: 'uppercase', opacity: 0.6 }}>
          Invitation not found
        </div>
        <div style={{ fontSize: 11, letterSpacing: '0.15em', color: 'rgba(201,160,82,0.35)', marginTop: 4 }}>
          Please check your invitation link
        </div>
      </div>
    );
  }

  if (!inviteData) {
    return (
      <div style={{
        height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center',
        background: '#060e09', color: '#C9A052', fontFamily: "'Jost', sans-serif",
        letterSpacing: '0.2em', fontSize: 11,
      }}>
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
