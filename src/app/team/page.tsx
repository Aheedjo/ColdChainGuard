'use client';

import Link from 'next/link';

const teamMembers = [
  {
    name: 'Kogi Hephzibah Beulah',
    regNumber: 'U17CO1026',
    phone: '0812 121 7926',
    email: 'beulahkogi18@gmail.com',
    role: 'Integration Engineer',
  },
  {
    name: 'Fatima Idris',
    regNumber: 'U17CO1031',
    phone: '0806 110 0314',
    email: 'idrisfatima@gmail.com',
    role: 'System Engineer',
  },
  {
    name: 'Maishanu Ahidjo',
    regNumber: 'U17CO1010',
    phone: '+24381 4341 0800',
    email: 'maishanu.ahijo@yahoo.com',
    role: 'Software Engineer',
  },
];

export default function TeamPage() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 text-gray-800">
      <header className="flex items-center justify-between bg-gray-700 text-white p-4 px-6 md:px-10 md:h-[72px]">
        <div className="flex flex-col md:flex-row items-center gap-5 md:gap-10 mx-auto w-full">
          <Link href="/">
            <h1 className="text-2xl font-bold mb-2 md:mb-0 cursor-pointer">ColdGuard</h1>
          </Link>
          <div className="flex items-center gap-10">
            <Link href="/">
              <p className="cursor-pointer hover:underline">Home</p>
            </Link>
            <Link href="/manual">
              <p className="cursor-pointer hover:underline">Manual</p>
            </Link>
            <Link href="/team">
              <p className="cursor-pointer hover:underline">Our Team</p>
            </Link>
          </div>
        </div>
      </header>


      <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 min-h-[calc(100vh-128px)] p-10">
        {teamMembers.map((member, index) => (
          <div key={index} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow h-max">
            <h2 className="text-2xl font-semibold mb-2">{member.name}</h2>
            <p className="text-lg font-medium text-gray-600 mb-2">Role: {member.role}</p>
            <p className="text-gray-700 mb-2">Reg. Number: {member.regNumber}</p>
            <p className="text-gray-700 mb-2">Phone: <a href={`tel:${member.phone}`} className="text-blue-600 underline">{member.phone}</a></p>
            <p className="text-gray-700 mb-2">Email: <a href={`mailto:${member.email}`} className="text-blue-600 underline">{member.email}</a></p>
          </div>
        ))}
      </section>

      <footer className="bg-gray-800 text-white text-center p-4">
        <p>&copy; 2024 Temperature Monitor</p>
      </footer>
    </div>
  );
}
