import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const societies = [
  {
    name: 'KIIT Robotics Society',
    description: 'A platform for robotics enthusiasts to learn and build innovative projects.',
    image: 'src/assets/IMG-20250318-WA0029.png',
    url: 'https://ksac.kiit.ac.in/societies/kiit-robotics-society/', // update manually later
  },
  {
    name: 'Korus',
    description: 'For students passionate about music, performing arts, and cultural activities.',
    image: 'src/assets/IMG-20250318-WA0030.png',
    url: 'https://ksac.kiit.ac.in/societies/korus/',
  },
  {
    name: 'Kalliope',
    description: 'While in ancient greek mythology calliope is the goddess of literature and art, we at KALLIOPE preside over eloquence and the ecstatic harmony of voices',
    image: 'src/assets/IMG-20250318-WA0019.png',
    url: 'https://ksac.kiit.ac.in/societies/kalliope/',
  },
  {
    name: 'Kzarshion',
    description: 'Kzarshion, the official “Fashion Society” of KIIT helps your dreams come true. It trains the students to become their own role model.',
    image: 'src/assets/IMG-20250318-WA0028.png',
    url: 'https://ksac.kiit.ac.in/societies/kzarshion/',
  },
  {
    name: 'KIIT Film Society',
    description: 'KFS (KIIT Film Society), the official “Film making Society” of KIIT helps the students of KIIT to get the real feeling of “Lights, Camera and Action”.',
    image: 'src/assets/IMG-20250318-WA0027.png',
    url: 'https://ksac.kiit.ac.in/societies/kiit-film-society/',
  },
  {
    name: 'Khwahishein',
    description:'In Odisha, most of the people know Hindi language and Khwahishein, the official “Hindi Society” makes the students of KIIT capable of reading, writing and expressing in Hindi.',
    image:'src/assets/IMG-20250318-WA0026.png',
    url:'https://ksac.kiit.ac.in/societies/khwahishein/',
  },
{
   name: 'Kreative Eye',
   description: 'Kreative Eye, the official society of KIIT works on these fields. They capture the beautiful moments in our life in KIIT and make them memorable for our entire life. ',
   image: 'src/assets/IMG-20250318-WA0025.png',
   url: 'https://ksac.kiit.ac.in/societies/kreative-eye/',
},
{
   name: 'KIIT Wordsmith Writing Society',
   description: 'No matter what, a pen is still mightier than a sword and KIIT Wordsmith, the official “Writing Society” helps the writers of KIIT to become experts to express what they feel. ',
   image: 'src/assets/IMG-20250318-WA0024.png',
   url: 'https://ksac.kiit.ac.in/societies/kiit-wordsmith/',
},
{
   name: 'Kalakaar',
   description: 'Kalakaar is the official “Dramatic Society” of KIIT. Kalakaar works with Theater and Nukkad in KIIT',
   image: 'src/assets/IMG-20250318-WA0023.png',
   url: 'https://ksac.kiit.ac.in/societies/kalakaar/',
},
{
   name: 'KIIT AEWS',
   description: 'The official KIIT Animal & Environment Welfare Society works hard to keep our environment safe for us as well as for the animals. ',
   image: 'src/assets/IMG-20250318-WA0022.png',
   url: 'https://ksac.kiit.ac.in/societies/kiit-animal-environment-welfare-society/',
},
{
   name: 'Khwaab',
   description: 'Khwaab is the official “Social Service Society” of KIIT. The philosophies of “Art of Giving”, “Kompassion” and “India against Negativity” of our Honorable Founder Dr. Achyutya Samanta Sir are the main inspiration of this society.',
   image: 'src/assets/IMG-20250318-WA0021.png',
   url: 'https://ksac.kiit.ac.in/societies/khwaab/',
},
{
   name: 'ENACTUS KISS-KIIT ',
   description: 'ENACTUS KISS-KIIT ',
   image: 'src/assets/IMG-20250318-WA0020.png',
   url: 'https://ksac.kiit.ac.in/societies/enactus/',
},



];

function StudentClubs() {
  return (
    <div className="min-h-screen bg-[#121212] text-white">
      <nav className="bg-[#1a1a1a] p-4">
        <div className="container mx-auto">
          <Link
            to="/"
            className="flex items-center space-x-2 text-[#17d059] hover:text-[#13b04f]"
          >
            <ArrowLeft size={20} />
            <span>Back to Home</span>
          </Link>
        </div>
      </nav>

      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-[#17d059]"> Student Clubs</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {societies.map((society, index) => (
            <div
              key={index}
              className="bg-[#1a1a1a] rounded-lg overflow-hidden shadow-lg"
            >
              {/* Card Header with background image */}
              <div
                className="w-full h-48 bg-cover bg-center"
                style={{ backgroundImage: `url(${society.image})` }}
              />
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2 text-[#17d059]">
                  {society.name}
                </h3>
                <p className="text-gray-300">{society.description}</p>
                <Link
                  to={society.url}
                  className="mt-4 inline-block bg-[#17d059] text-white py-2 px-4 rounded hover:bg-[#13b04f]"
                >
                  Join Club
                </Link>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default StudentClubs;
