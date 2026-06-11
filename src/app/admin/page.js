"use client";
import { useState, useEffect } from 'react';
import { WOW_MEMBERS as INITIAL_MEMBERS } from '../../data/members';
import { ALL_DISCOVERABLE_BOOKS, codeToFlag } from '../../data/books-data';

const UNIQUE_COUNTRIES = Array.from(
  new Map(ALL_DISCOVERABLE_BOOKS.map(b => [b.code, { code: b.code, name: b.country, flag: codeToFlag(b.code) }])).values()
).sort((a, b) => a.name.localeCompare(b.name));

export default function AdminPage() {
  const [members, setMembers] = useState(INITIAL_MEMBERS);
  const [newId, setNewId] = useState('');
  const [newName, setNewName] = useState('');
  const [newCountryCode, setNewCountryCode] = useState(UNIQUE_COUNTRIES[0]?.code || 'IN');

  const generateId = () => {
    return 'WOW-2026-' + String(Math.floor(Math.random() * 9999)).padStart(4, '0');
  };

  useEffect(() => {
    setNewId(generateId());
  }, []);

  const addMember = () => {
    if (!newName) {
      alert('Enter a name');
      return;
    }
    
    const date = new Date();
    const formattedDate = date.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' });
    
    setMembers([{
      passport_number: newId,
      member_name: newName,
      country_code: newCountryCode,
      visas: [],
      issue_date: formattedDate
    }, ...members]);
    
    setNewName('');
    setNewId(generateId());
  };

  const toggleVisa = (index, country) => {
    const updatedMembers = [...members];
    const m = updatedMembers[index];
    if (m.visas.includes(country)) {
      m.visas = m.visas.filter(v => v !== country);
    } else {
      m.visas.push(country);
    }
    setMembers(updatedMembers);
  };

  const copyLink = (member) => {
    const code = member.country_code || 'IN';
    const country = UNIQUE_COUNTRIES.find(c => c.code === code) || UNIQUE_COUNTRIES[0];
    const url = new URL(window.location.origin + '/invite');
    url.searchParams.set('name', member.member_name);
    url.searchParams.set('country', country.code);
    url.searchParams.set('cname', country.name);
    url.searchParams.set('flag', country.flag);
    url.searchParams.set('uid', member.passport_number);
    
    navigator.clipboard.writeText(url.toString());
    alert('Invitation link copied to clipboard!');
  };

  const generatedCode = `// This file acts as the secure database for your members' passports.
// When you use the Admin Dashboard to create passports, it will generate
// new code for you to paste into this array!

export const WOW_MEMBERS = ${JSON.stringify(members, null, 4)};
`;

  return (
    <main style={{ padding: '8rem 2rem 4rem' }}>
      <div style={{ maxWidth: '800px', margin: '0 auto', background: 'var(--card-bg)', padding: '3rem', border: '1px solid var(--divider)', borderRadius: '8px' }}>
        <h1 style={{ color: 'var(--amber)', marginBottom: '2rem', fontFamily: "'Jost', sans-serif" }}>WOW Admin Tool</h1>
        <p style={{ color: 'var(--parchment)', marginBottom: '2rem' }}>Since you are running a static server without a database, use this tool to manage your members. Copy the generated code at the bottom and paste it into your <code>src/data/members.js</code> file.</p>
        
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem', alignItems: 'flex-end', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 200px' }}>
            <label style={{ color: 'var(--parchment)', fontSize: '0.8rem', letterSpacing: '1px', display: 'block', marginBottom: '0.5rem' }}>Passport Number</label>
            <input 
              type="text" 
              value={newId} 
              readOnly
              style={{ width: '100%', padding: '0.8rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--divider)', color: 'var(--cream)' }} 
            />
          </div>
          <div style={{ flex: '2 1 300px' }}>
            <label style={{ color: 'var(--parchment)', fontSize: '0.8rem', letterSpacing: '1px', display: 'block', marginBottom: '0.5rem' }}>Member Name</label>
            <input 
              type="text" 
              placeholder="Full Name" 
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              style={{ width: '100%', padding: '0.8rem', background: 'transparent', border: '1px solid var(--divider)', color: 'var(--cream)', outline: 'none' }} 
            />
          </div>
          <div style={{ flex: '1 1 200px' }}>
            <label style={{ color: 'var(--parchment)', fontSize: '0.8rem', letterSpacing: '1px', display: 'block', marginBottom: '0.5rem' }}>Joining From</label>
            <select 
              value={newCountryCode}
              onChange={(e) => setNewCountryCode(e.target.value)}
              style={{ width: '100%', padding: '0.8rem', background: 'rgba(0,0,0,0.2)', border: '1px solid var(--divider)', color: 'var(--cream)', outline: 'none', cursor: 'pointer' }}
            >
              {UNIQUE_COUNTRIES.map(c => (
                <option key={c.code} value={c.code} style={{ background: '#1a2e1f' }}>{c.flag} {c.name}</option>
              ))}
            </select>
          </div>
          <div>
            <button 
              onClick={addMember} 
              className="btn-primary" 
              style={{ padding: '0.8rem 1.5rem', background: 'var(--amber)', color: 'var(--ink)', border: 'none', borderRadius: '20px', cursor: 'pointer', fontWeight: 600 }}
            >
              Add Member
            </button>
          </div>
        </div>

        <h2 style={{ color: 'var(--parchment)', marginBottom: '1rem', fontSize: '1.2rem' }}>Current Members</h2>
        <div style={{ marginBottom: '3rem' }}>
          {members.map((m, index) => {
            const hasIran = m.visas.includes('iran');
            return (
              <div key={m.passport_number} style={{ padding: '1rem', border: '1px solid var(--divider)', marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
                <div>
                  <strong style={{ color: 'var(--cream)', fontSize: '1.1rem', fontFamily: "'Jost', sans-serif" }}>{m.member_name}</strong>
                  <span style={{ color: 'var(--parchment)', opacity: 0.5, marginLeft: '1rem', fontFamily: 'monospace' }}>{m.passport_number}</span>
                </div>
                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button 
                    onClick={() => copyLink(m)}
                    style={{
                      padding: '0.5rem 1rem', 
                      background: 'rgba(201,160,82,0.1)', 
                      color: 'var(--amber)', 
                      border: '1px solid var(--amber)', 
                      cursor: 'pointer', 
                      borderRadius: '20px', 
                      fontWeight: 600 
                    }}
                  >
                    🔗 Copy Invite Link
                  </button>
                  <button 
                    onClick={() => toggleVisa(index, 'iran')} 
                  style={{ 
                    padding: '0.5rem 1rem', 
                    background: hasIran ? 'var(--amber)' : 'transparent', 
                    color: hasIran ? 'var(--ink)' : 'var(--amber)', 
                    border: '1px solid var(--amber)', 
                    cursor: 'pointer', 
                    borderRadius: '20px', 
                    fontWeight: 600 
                  }}
                >
                  🇮🇷 {hasIran ? 'Revoke Iran Visa' : 'Issue Iran Visa'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <h2 style={{ color: 'var(--amber)', marginBottom: '1rem', fontSize: '1.2rem' }}>Generated members.js Code</h2>
        <p style={{ color: 'var(--parchment)', marginBottom: '1rem', fontSize: '0.9rem', opacity: 0.8 }}>Copy this code and completely replace the contents of <code>src/data/members.js</code> inside your project folder.</p>
        <textarea 
          readOnly 
          value={generatedCode}
          style={{ width: '100%', height: '300px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--divider)', color: 'var(--cream)', fontFamily: 'monospace', padding: '1rem', outline: 'none' }}
        />
      </div>
    </main>
  );
}
